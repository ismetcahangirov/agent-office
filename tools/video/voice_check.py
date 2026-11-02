"""Listens to the finished voice and checks it against the script and the timeline (Claude cannot hear the audio).

Usage: tools/video/.venv/Scripts/python tools/video/voice_check.py content/episodes/<episode> [--model base.en]

Transcribes <episode>/audio/voice.wav with faster-whisper (word timestamps), then for every line in
audio/timeline.json takes the words heard between its start and end and compares them with the script text.
Prints the lines that do not match (missing, extra or misread words, or a line that drifted into the next shot)
and a summary. Exit code 1 when a line scores below --min (default 0.8).

--fix: ChatGPT sometimes breathes inside a sentence ("Piece four: SODA."), and align_voice.py can then put the
sentence boundary at that breath, so the last word lands on the next shot. With --fix every line start is moved
to the heard start of its first word when they differ by more than 0.3 s; shots are re-joined like align_voice.py
and timeline.json is rewritten (old copy: timeline.before-fix.json). Then re-run remotion_props.py.
"""
import argparse
import difflib
import json
import re
import sys
from pathlib import Path

NUM = {"0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine"}


def norm(text):
    text = re.sub(r"\[pause[^\]]*\]", " ", text.lower())
    text = text.replace("’", "'").replace(",", "")
    return [w for w in re.sub(r"[^a-z0-9' ]+", " ", text).split() if w]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("episode")
    ap.add_argument("--model", default="base.en")
    ap.add_argument("--min", type=float, default=0.8)
    ap.add_argument("--fix", action="store_true")
    a = ap.parse_args()
    ep = Path(a.episode)
    tl = json.loads((ep / "audio" / "timeline.json").read_text(encoding="utf-8"))

    import subprocess
    import imageio_ffmpeg
    import numpy as np
    from faster_whisper import WhisperModel
    # decode with our own ffmpeg (16 kHz mono float): faster-whisper's own decoder breaks with newer PyAV
    pcm = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-i", str(ep / "audio" / "voice.wav"),
                          "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
    model = WhisperModel(a.model, device="cpu", compute_type="int8")
    segs, _ = model.transcribe(np.frombuffer(pcm, np.float32), word_timestamps=True, language="en", vad_filter=False)
    heard = [(w.start, w.end, w.word) for s in segs for w in (s.words or [])]

    if a.fix:
        fix_boundaries(ep, tl, heard)

    bad, scores = [], []
    for shot in tl["shots"]:
        for ln in shot["lines"]:
            # a word belongs to the line when its middle falls inside the line (small margin for breaths)
            got = " ".join(w for s, e, w in heard if ln["start"] - 0.15 <= (s + e) / 2 <= ln["end"] + 0.15)
            want, have = norm(ln["text"]), norm(got)
            r = difflib.SequenceMatcher(None, want, have).ratio() if want else 1.0
            scores.append(r)
            if r < a.min:
                bad.append((shot["id"], round(ln["start"], 1), round(r, 2), ln["text"], got.strip()))
    for sid, t, r, want, got in bad:
        print(f"{sid} @{t}s score {r}\n  script: {want}\n  heard:  {got}")
    print(f"lines {len(scores)}, below {a.min}: {len(bad)}, mean score {sum(scores) / len(scores):.3f}")
    sys.exit(1 if bad else 0)


def fix_boundaries(ep, tl, heard):
    lines = [ln for sh in tl["shots"] for ln in sh["lines"]]
    moved = []
    for prev, ln in zip(lines, lines[1:]):
        first = norm(ln["text"])[:1]
        if not first:
            continue
        near = [(s, e) for s, e, w in heard if norm(w)[:1] == first and abs(s - ln["start"]) <= 1.5]
        if not near:
            continue
        s, _ = min(near, key=lambda x: abs(x[0] - ln["start"]))
        new = round(s - 0.08, 3)
        if abs(new - ln["start"]) > 0.3 and new > prev["start"] + 0.3:
            moved.append((ln["text"][:40], ln["start"], new))
            shift = new - ln["start"]
            for w in ln["words"]:
                w["start"], w["end"] = round(w["start"] + shift, 3), round(w["end"] + shift, 3)
            ln["start"] = new
            prev["end"] = round(min(max(prev["end"], new - 0.1), new - 0.02), 3)
            ln["end"] = round(max(ln["end"], new + 0.2), 3)
    shots = tl["shots"]
    last_end = shots[-1]["end"]
    for i, sh in enumerate(shots):
        sh["start"] = round(shots[i - 1]["end"], 3) if i else 0.0
        nxt = next((x["lines"][0]["start"] for x in shots[i + 1:] if x["lines"]), None)
        sh["end"] = round(nxt, 3) if nxt is not None else last_end
    for text, old, new in moved:
        print(f"moved {old:.2f} -> {new:.2f}  {text}")
    (ep / "audio" / "timeline.before-fix.json").write_text((ep / "audio" / "timeline.json").read_text(encoding="utf-8"), encoding="utf-8")
    (ep / "audio" / "timeline.json").write_text(json.dumps(tl, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"--fix: {len(moved)} line starts moved, timeline.json rewritten")


if __name__ == "__main__":
    main()
