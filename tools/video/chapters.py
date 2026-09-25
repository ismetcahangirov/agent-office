"""YouTube chapters for long videos from shot timings.

Usage: tools/video/.venv/Scripts/python tools/video/chapters.py content/episodes/<episode>

A shot with "chapter": "Title" starts a new chapter. YouTube rules: first chapter at 0:00,
at least 3 chapters, each at least 10 seconds. Writes video/chapters.txt (paste into the description)
and exits non-zero if the rules are not met.
"""
import json
import sys
from pathlib import Path


def ts(t):
    t = int(t)
    h, m, s = t // 3600, t % 3600 // 60, t % 60
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def main(ep_dir):
    ep_dir = Path(ep_dir)
    ep = json.loads((ep_dir / "episode.json").read_text(encoding="utf-8"))
    tl = json.loads((ep_dir / "audio" / "timeline.json").read_text(encoding="utf-8"))
    titles = {s["id"]: s["chapter"] for s in ep["shots"] if s.get("chapter")}
    marks = [(seg["start"], titles[seg["id"]]) for seg in tl["shots"] if seg["id"] in titles]
    if not marks or marks[0][0] > 0.5:
        marks.insert(0, (0.0, "Intro"))
    marks[0] = (0.0, marks[0][1])

    problems = []
    if len(marks) < 3:
        problems.append(f"only {len(marks)} chapters (need >= 3)")
    ends = [m[0] for m in marks[1:]] + [tl["duration"]]
    for (start, title), end in zip(marks, ends):
        if end - start < 10:
            problems.append(f"'{title}' is {end - start:.1f}s (need >= 10s)")

    text = "\n".join(f"{ts(s)} {t}" for s, t in marks)
    (ep_dir / "video").mkdir(exist_ok=True)
    (ep_dir / "video" / "chapters.txt").write_text(text + "\n", encoding="utf-8")
    print(text)
    if problems:
        print("\nPROBLEMS: " + "; ".join(problems))
        sys.exit(1)


if __name__ == "__main__":
    main(sys.argv[1])
