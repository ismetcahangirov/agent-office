"""Voiceover for an episode with Kokoro (local, free, CPU via onnxruntime).

Usage: tools/video/.venv/Scripts/python tools/video/tts.py content/episodes/<episode>

Reads  <episode>/episode.json  (shots -> lines -> {speaker, text})
Writes <episode>/audio/voice.wav      full voice track
       <episode>/audio/timeline.json  shot and line timings + approximate word timings

Making it sound human rather than robotic:
- "voices" in episode.json: speaker -> "am_puck" or {"voice": "am_puck:0.7+am_fenrir:0.3", "speed": 0.92}
  ("a:0.7+b:0.3" blends two Kokoro voices).
- Pauses follow punctuation: longer after "?", "!" and "...", shorter after ",".
- "[pause]" or "[pause 0.6]" inside a line inserts a breath/beat for comic timing.
- Each line's speed varies by a few percent so the rhythm is not metronomic.
- "lang" in a voice config forces pronunciation ("en-us" / "en-gb"); default follows the voice prefix.
- Per line "speed" overrides everything (e.g. 0.85 for a slow, bored delivery).
"""
import hashlib
import json
import re
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

MODELS = Path(__file__).parent / "models"
SR = 24000
DEFAULT_VOICES = {
    "kaxo": {"voice": "bm_fable", "speed": 0.98, "lang": "en-us"},  # owner picked bm_fable/en-us for KAXO too
    "narrator": {"voice": "bm_fable", "speed": 1.08, "lang": "en-us"},  # owner picked the en-us rendering
}
# The owner wants fluent, near-continuous speech (two rounds of "too many pauses").
# Kokoro adds ~0.3 s between sentences and a ~0.5 s breath tail that its own pause settings
# do not control, so every sentence is synthesised separately, trimmed by loudness and
# re-joined with the short gaps below.
SHOT_TAIL = 0.05
SENTENCE_GAP = {"...": 0.16, "?": 0.1, "!": 0.08, ".": 0.06, "": 0.03}
LINE_GAP_EXTRA = 0.02          # added between lines of the same speaker
SPEAKER_CHANGE_GAP = 0.08      # added when the speaker changes
DEFAULT_PAUSE = 0.2            # "[pause]" without a number
SENTENCE_RE = re.compile(r"(?<=[.!?…])\s+")
PAUSE_RE = re.compile(r"\[pause(?:\s+([\d.]+))?\]", re.I)


def voice_cfg(voices, speaker):
    v = voices.get(speaker) or voices.get("narrator")
    return {"voice": v, "speed": 1.0} if isinstance(v, str) else {"speed": 1.0, **v}


def resolve_voice(kokoro, spec, cache={}):
    """"am_puck" -> name; "am_puck:0.7+am_fenrir:0.3" -> blended style vector."""
    if "+" not in spec and ":" not in spec:
        return spec
    if spec not in cache:
        parts = [p.split(":") for p in spec.split("+")]
        total = sum(float(p[1]) if len(p) > 1 else 1.0 for p in parts)
        style = None
        for p in parts:
            w = (float(p[1]) if len(p) > 1 else 1.0) / total
            s = kokoro.get_voice_style(p[0]) * w
            style = s if style is None else style + s
        cache[spec] = style
    return cache[spec]


def lang_of(spec):
    """British Kokoro voices (bf_*, bm_*) need British pronunciation."""
    return "en-gb" if spec.split(":")[0].split("+")[0].startswith("b") else "en-us"


def jitter(text, amount=0.03):
    """Deterministic +-3% speed variation per line."""
    h = int(hashlib.md5(text.encode()).hexdigest()[:8], 16) / 0xFFFFFFFF
    return 1 + (h * 2 - 1) * amount


def trim(audio, rel=0.15, lead_pad=0.01, tail_pad=0.05):
    """Cut leading silence and the trailing breath by loudness (10 ms RMS frames, smoothed).
    Kokoro leaves a ~0.6 s noise tail at ~5-8% of speech level; a fixed amplitude threshold
    or a lower relative one kept it (measured on episode 1)."""
    fr = int(0.01 * SR)
    n = len(audio) // fr
    if n == 0:
        return audio
    rms = np.sqrt(np.mean(audio[: n * fr].reshape(n, fr) ** 2, axis=1))
    rms = np.convolve(rms, np.ones(3) / 3, mode="same")
    loud = np.where(rms > max(0.004, rel * np.percentile(rms, 95)))[0]
    if not len(loud):
        return audio
    a = max(0, loud[0] * fr - int(lead_pad * SR))
    b = min(len(audio), (loud[-1] + 1) * fr + int(tail_pad * SR))
    return audio[a:b]


def ending(text):
    t = text.rstrip()
    if t.endswith("...") or t.endswith("…"):
        return "..."
    return t[-1:] if t[-1:] in "?!." else ""


def gap_after(text, next_speaker, speaker):
    g = SENTENCE_GAP[ending(text)]
    return g + (SPEAKER_CHANGE_GAP if next_speaker and next_speaker != speaker else LINE_GAP_EXTRA)


def word_times(text, start, dur):
    words = text.split()
    weights = [len(re.sub(r"\W", "", w)) + 2 for w in words]
    total = sum(weights) or 1
    t, out = start, []
    for w, k in zip(words, weights):
        d = dur * k / total
        out.append({"w": w, "start": round(t, 3), "end": round(t + d, 3)})
        t += d
    return out


def main(ep_dir):
    ep_dir = Path(ep_dir)
    ep = json.loads((ep_dir / "episode.json").read_text(encoding="utf-8"))
    voices = {**DEFAULT_VOICES, **ep.get("voices", {})}
    kokoro = Kokoro(str(MODELS / "kokoro-v1.0.int8.onnx"), str(MODELS / "voices-v1.0.bin"))

    chunks, timeline, t = [], {"shots": []}, 0.0
    all_lines = [(s, l) for s in ep["shots"] for l in s.get("lines", [])]
    flat_i = 0
    for shot in ep["shots"]:
        s_start, lines = t, []
        for line in shot.get("lines", []):
            flat_i += 1
            speaker = line.get("speaker", "narrator")
            cfg = voice_cfg(voices, speaker)
            voice = resolve_voice(kokoro, cfg["voice"])
            speed = float(line.get("speed", cfg["speed"] * jitter(line["text"])))

            # split on [pause] tokens; each piece is synthesised separately
            pieces, pos = [], 0
            for m in PAUSE_RE.finditer(line["text"]):
                pieces.append((line["text"][pos:m.start()].strip(), float(m.group(1) or DEFAULT_PAUSE)))
                pos = m.end()
            pieces.append((line["text"][pos:].strip(), 0.0))

            l_start, words, clean = t, [], []
            for text, pause in pieces:
                sentences = [x for x in SENTENCE_RE.split(text) if x.strip()] if text else []
                for si, sent in enumerate(sentences):
                    audio, sr = kokoro.create(sent, voice=voice, speed=speed, lang=cfg.get("lang") or lang_of(cfg["voice"]))
                    assert sr == SR, sr
                    audio = trim(audio.astype(np.float32))
                    dur = len(audio) / SR
                    words += word_times(sent, t, dur)
                    chunks.append(audio)
                    t += dur
                    if si < len(sentences) - 1:
                        g = SENTENCE_GAP[ending(sent)]
                        chunks.append(np.zeros(int(g * SR), np.float32))
                        t += g
                if text:
                    clean.append(text)
                if pause:
                    chunks.append(np.zeros(int(pause * SR), np.float32))
                    t += pause
            clean_text = " ".join(clean)
            lines.append({"speaker": speaker, "text": clean_text, "start": round(l_start, 3), "end": round(t, 3), "words": words})

            nxt = all_lines[flat_i][1].get("speaker", "narrator") if flat_i < len(all_lines) else None
            g = gap_after(clean_text, nxt, speaker) if nxt else 0.0
            chunks.append(np.zeros(int(g * SR), np.float32))
            t += g

        min_dur = float(shot.get("min_duration", 0 if lines else 2.0))
        if t - s_start < min_dur:
            pad = min_dur - (t - s_start)
            chunks.append(np.zeros(int(pad * SR), np.float32))
            t += pad
        chunks.append(np.zeros(int(SHOT_TAIL * SR), np.float32))
        t += SHOT_TAIL
        timeline["shots"].append({"id": shot["id"], "start": round(s_start, 3), "end": round(t, 3), "lines": lines})

    out = ep_dir / "audio"
    out.mkdir(exist_ok=True)
    voice_track = np.concatenate(chunks)
    sf.write(out / "voice.wav", voice_track, SR)
    timeline["duration"] = round(len(voice_track) / SR, 3)
    (out / "timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"voice.wav {timeline['duration']:.1f}s, {len(timeline['shots'])} shots")


if __name__ == "__main__":
    main(sys.argv[1])
