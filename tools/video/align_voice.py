"""Timeline for a voice recorded outside tts.py (ChatGPT "Read aloud", voice Ember).

Usage: tools/video/.venv/Scripts/python tools/video/align_voice.py content/episodes/<episode>

Every part is slowed by TEMPO first (see below), then aligned.

Reads  <episode>/episode.json      shots -> lines -> {speaker, text}
       <episode>/audio/parts/NN.*  one recording per part, in order (aac/mp3/wav)
Writes <episode>/audio/voice.wav      all parts joined
       <episode>/audio/timeline.json  same format as tts.py (shots, lines, approximate words)

Parts follow chapters: part 00 is every shot before the first "chapter", then one part per chapter.
Inside a part the script knows the sentences but not where they start. ChatGPT breathes at
sentence ends, so the silent gaps are the candidates; a dynamic programme picks one gap per
sentence boundary so that each sentence's length fits its character count, preferring long gaps.
Words are spread over their sentence by length, like tts.py.
"""
import json
import math
import re
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
import numpy as np
import soundfile as sf

SR = 24000
# ChatGPT's Ember speaks ~238 wpm inside sentences (184 wpm overall). The owner picked a 0.88 slow-down
# by ear (2026-11-01, ~167 wpm); rubberband keeps the pitch and voice character.
TEMPO = 0.88
FRAME = 0.01
MIN_GAP = 0.08          # shorter silences are not sentence boundaries
BRIDGE = 0.06           # a breath or click shorter than this does not split a silence
QUIET_DB = 30           # frames this far below the loud frames count as silence
EDGE_KEEP = 0.12        # silence kept at the start and end of each part
PART_GAP = 0.9          # pause between parts (chapter change)
QUIZ_PAUSE = 2.2        # quiet time to guess after a quiz question (RULES §3.3); the answer comes after it
MAX_GAPS_PER_SENTENCE = 25
SENTENCE_RE = re.compile(r"(?<=[.!?…])\s+")
PAUSE_RE = re.compile(r"\[pause(?:\s+[\d.]+)?\]", re.I)


def load(path, tempo=1.0):
    af = ["-af", f"rubberband=tempo={tempo}:formant=preserved:pitchq=quality:transients=smooth"] if tempo != 1.0 else []
    out = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-i", str(path), *af,
                          "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(out, np.float32).copy()


def silent_runs(a):
    """[(start_s, end_s)] of silent stretches, threshold relative to the loud frames."""
    n = int(FRAME * SR)
    rms = np.sqrt(np.mean(a[: len(a) // n * n].reshape(-1, n) ** 2, axis=1) + 1e-12)
    db = 20 * np.log10(rms)
    quiet = db < np.percentile(db, 95) - QUIET_DB
    runs, start = [], None
    for i, q in enumerate(np.append(quiet, False)):
        if q and start is None:
            start = i
        elif not q and start is not None:
            if runs and start * FRAME - runs[-1][1] < BRIDGE:
                runs[-1] = (runs[-1][0], i * FRAME)
            else:
                runs.append((start * FRAME, i * FRAME))
            start = None
    return runs


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


def spoken_len(text):
    """Characters as spoken: "1746" is read "seventeen forty-six", so digits count for more."""
    text = re.sub(r"\d{4}s?", "x" * 18, text)
    return len(re.sub(r"\d", "x" * 5, text))


def align(audio, sentences):
    """Start/end (s) of each sentence inside one part's audio."""
    runs = silent_runs(audio)
    total = len(audio) / SR
    lead = runs[0][1] if runs and runs[0][0] == 0 else 0.0
    tail = runs[-1][0] if runs and runs[-1][1] >= total - FRAME else total
    gaps = [r for r in runs if r[0] > lead and r[1] < tail and r[1] - r[0] >= MIN_GAP]
    n = len(sentences)
    if n == 1:
        return [(lead, tail)], 0
    if len(gaps) < n - 1:
        raise SystemExit(f"only {len(gaps)} pauses for {n} sentences; re-record this part with a breath after every sentence")
    chars = [max(spoken_len(s), 4) for s in sentences]
    rate = (tail - lead - sum(g[1] - g[0] for g in gaps)) / sum(chars)
    # bounds[k] = gap index used after sentence k; position -1 = start, len(gaps) = end
    starts = [lead] + [g[1] for g in gaps]
    ends = [g[0] for g in gaps] + [tail]
    m = len(gaps)
    INF = float("inf")
    cost = [[INF] * (m + 1) for _ in range(n)]
    back = [[-1] * (m + 1) for _ in range(n)]

    def seg_cost(i, a, b):  # sentence i spans from starts[a] to ends[b]
        d = ends[b] - starts[a]
        if d <= 0:
            return INF
        c = math.log(d / (chars[i] * rate)) ** 2
        if b < m:  # reward ending on a long pause
            c -= 1.5 * min(gaps[b][1] - gaps[b][0], 1.2)
        return c

    for b in range(min(m, MAX_GAPS_PER_SENTENCE) + 1):
        cost[0][b] = seg_cost(0, 0, b)
    for i in range(1, n):
        for b in range(i, m + 1):
            if i < n - 1 and b == m:
                continue
            best, arg = INF, -1
            for a in range(max(i - 1, b - MAX_GAPS_PER_SENTENCE), b):
                if cost[i - 1][a] == INF:
                    continue
                c = cost[i - 1][a] + seg_cost(i, a + 1, b)
                if c < best:
                    best, arg = c, a
            cost[i][b], back[i][b] = best, arg
    if cost[n - 1][m] == INF:
        raise SystemExit("could not align part; check that the recording matches the script")
    cuts, b = [], m
    for i in range(n - 1, -1, -1):
        cuts.append(b)
        b = back[i][b]
    cuts.reverse()
    spans, a = [], 0
    for b in cuts:
        spans.append((starts[a], ends[b]))
        a = b + 1
    worst = max(abs(math.log((e - s) / (c * rate))) for (s, e), c in zip(spans, chars))
    return spans, worst


def main(ep_dir):
    ep_dir = Path(ep_dir)
    ep = json.loads((ep_dir / "episode.json").read_text(encoding="utf-8"))
    parts_dir = ep_dir / "audio" / "parts"
    files = sorted(p for p in parts_dir.iterdir() if p.suffix.lower() in (".aac", ".mp3", ".wav", ".m4a"))

    groups, cur = [], []
    for shot in ep["shots"]:
        if shot.get("chapter") and cur:
            groups.append(cur)
            cur = []
        cur.append(shot)
    groups.append(cur)
    if len(files) != len(groups):
        raise SystemExit(f"{len(files)} recordings in audio/parts, but the script has {len(groups)} parts (intro + chapters)")

    track, timeline, t = [], {"shots": []}, 0.0
    for gi, (shots, f) in enumerate(zip(groups, files)):
        audio = load(f, TEMPO)
        sents = []  # (shot_idx, line_idx, text)
        for si, shot in enumerate(shots):
            for li, line in enumerate(shot.get("lines", [])):
                clean = PAUSE_RE.sub(" ", line["text"]).strip()
                sents += [(si, li, s.strip()) for s in SENTENCE_RE.split(clean) if s.strip()]
        spans, worst = align(audio, [s[2] for s in sents])
        cut_a = max(0, int((spans[0][0] - EDGE_KEEP) * SR))
        cut_b = min(len(audio), int((spans[-1][1] + EDGE_KEEP) * SR))
        offset = t - cut_a / SR
        track.append(audio[cut_a:cut_b])
        t += (cut_b - cut_a) / SR
        print(f"part {gi:02d} {f.name}: {len(sents)} sentences, {(cut_b - cut_a) / SR:.1f}s, worst length misfit x{math.exp(worst):.2f}")

        lines_by_shot = {}
        for (si, li, text), (s, e) in zip(sents, spans):
            ln = lines_by_shot.setdefault(si, {}).setdefault(li, {"texts": [], "start": s + offset, "end": e + offset, "words": []})
            ln["texts"].append(text)
            ln["end"] = e + offset
            ln["words"] += word_times(text, s + offset, e - s)
        for si, shot in enumerate(shots):
            lines = []
            for li, line in enumerate(shot.get("lines", [])):
                ln = lines_by_shot[si][li]
                lines.append({"speaker": line.get("speaker", "kaxo"), "text": " ".join(ln["texts"]),
                              "start": round(ln["start"], 3), "end": round(ln["end"], 3), "words": ln["words"]})
            timeline["shots"].append({"id": shot["id"], "lines": lines, "min": float(shot.get("min_duration", 0))})
        if gi < len(groups) - 1:
            track.append(np.zeros(int(PART_GAP * SR), np.float32))
            t += PART_GAP

    # a quiz shot gets a quiet moment after its last line, so the viewer can guess; everything later moves on
    voice = np.concatenate(track)
    quiz = {s["id"] for s in ep["shots"] if (s.get("graphic") or {}).get("type") == "quiz"}
    for qs in [s for s in timeline["shots"] if s["id"] in quiz and s["lines"]]:
        at = qs["lines"][-1]["end"] + 0.1
        cut = int(at * SR)
        voice = np.concatenate([voice[:cut], np.zeros(int(QUIZ_PAUSE * SR), np.float32), voice[cut:]])
        t += QUIZ_PAUSE
        for s in timeline["shots"]:
            for ln in s["lines"]:
                if ln["start"] > at:
                    ln["start"], ln["end"] = round(ln["start"] + QUIZ_PAUSE, 3), round(ln["end"] + QUIZ_PAUSE, 3)
                    for w in ln["words"]:
                        w["start"], w["end"] = round(w["start"] + QUIZ_PAUSE, 3), round(w["end"] + QUIZ_PAUSE, 3)
    track = [voice]

    # shots are contiguous: each starts where the previous ended and ends where the next one speaks
    shots = timeline["shots"]
    for i, s in enumerate(shots):
        s["start"] = round(shots[i - 1]["end"], 3) if i else 0.0
        nxt = next((x["lines"][0]["start"] for x in shots[i + 1:] if x["lines"]), t)
        s["end"] = round(max(nxt, s["start"] + s.pop("min")), 3)

    # a quiet tail (end screen) when the last shot asks for more time than the voice gives
    if shots and shots[-1]["end"] > t:
        track.append(np.zeros(int((shots[-1]["end"] - t) * SR), np.float32))

    out = ep_dir / "audio"
    voice = np.concatenate(track)
    sf.write(out / "voice.wav", voice, SR)
    timeline["duration"] = round(len(voice) / SR, 3)
    (out / "timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"voice.wav {timeline['duration']:.1f}s, {len(shots)} shots")


if __name__ == "__main__":
    main(sys.argv[1])
