"""Upload-only captions (SRT) from audio/timeline.json. Nothing is burned into the video.

Usage: tools/video/.venv/Scripts/python tools/video/subs.py content/episodes/<episode>

The owner wants no captions on screen (2026-10-31): YouTube shows the uploaded tracks instead.
Writes subs/captions.en.srt. Cues follow the word timings, break at sentence ends and stay
within two lines of ~42 characters, which is what YouTube renders comfortably.
The translations (captions.<lang>.srt) are made from this file with the same cue count and timings.
"""
import json
import sys
from pathlib import Path

MAX_CHARS = 84  # two lines of ~42
LINE_CHARS = 42


def ts_srt(t):
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def cues(words):
    cur = []
    for w in words:
        if cur and len(" ".join(x["w"] for x in cur + [w])) > MAX_CHARS:
            yield cur
            cur = []
        cur.append(w)
        if w["w"][-1] in ".?!":
            yield cur
            cur = []
    if cur:
        yield cur


def wrap(text):
    if len(text) <= LINE_CHARS:
        return text
    # split at the space closest to the middle
    mid = len(text) // 2
    spaces = [i for i, c in enumerate(text) if c == " "]
    if not spaces:
        return text
    cut = min(spaces, key=lambda i: abs(i - mid))
    return text[:cut] + "\n" + text[cut + 1:]


def main(ep_dir):
    ep_dir = Path(ep_dir)
    tl = json.loads((ep_dir / "audio" / "timeline.json").read_text(encoding="utf-8"))
    out = []
    for shot in tl["shots"]:
        for line in shot["lines"]:
            for g in cues(line["words"]):
                out.append((g[0]["start"], g[-1]["end"], wrap(" ".join(x["w"] for x in g))))

    subs = ep_dir / "subs"
    subs.mkdir(exist_ok=True)
    (subs / "captions.en.srt").write_text(
        "\n".join(f"{i}\n{ts_srt(a)} --> {ts_srt(b)}\n{t}\n" for i, (a, b, t) in enumerate(out, 1)), encoding="utf-8")
    print(f"captions.en.srt: {len(out)} cues")


if __name__ == "__main__":
    main(sys.argv[1])
