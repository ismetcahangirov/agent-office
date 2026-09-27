"""Turkish captions: each line's text_tr (episode.json) on the English line's timing (timeline.json), split in two when long."""
import json
from pathlib import Path

EP = Path(__file__).resolve().parents[3] / "content" / "episodes" / "2026-09-27-claude-code-tutorial"
ep = json.loads((EP / "episode.json").read_text(encoding="utf-8"))
tl = json.loads((EP / "audio" / "timeline.json").read_text(encoding="utf-8"))
tr = {s["id"]: [ln.get("text_tr", "") for ln in s["lines"]] for s in ep["shots"]}


def ts(t):
    ms = int(round(t * 1000))
    return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}"


cues = []
for shot in tl["shots"]:
    for i, ln in enumerate(shot.get("lines", [])):
        text = tr[shot["id"]][i].replace("[pause]", "").replace("  ", " ").strip()
        a, b = ln["start"], ln["end"]  # timeline times are absolute
        words = text.split()
        if len(words) > 12:  # two cues, split by time in proportion to words
            half = len(words) // 2
            mid = a + (b - a) * half / len(words)
            cues += [(a, mid, " ".join(words[:half])), (mid, b, " ".join(words[half:]))]
        else:
            cues.append((a, b, text))

out = "\n".join(f"{n}\n{ts(a)} --> {ts(b)}\n{t}\n" for n, (a, b, t) in enumerate(cues, 1))
(EP / "subs" / "captions.tr.srt").write_text(out, encoding="utf-8")
print(len(cues), "cues")
