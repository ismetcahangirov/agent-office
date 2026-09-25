"""Burned-in captions (ASS) from audio/timeline.json.

Usage: tools/video/.venv/Scripts/python tools/video/subs.py content/episodes/<episode>

Short: 1-3 words per caption, big bold UPPERCASE text with a thick outline and a pop-in.
Long: calm phrase captions (up to ~7 words) at the bottom, normal case, no animation.
KAXO's lines are tinted with the brand green in both. Also writes an .srt for platforms
that accept uploaded captions.
"""
import json
import sys
from pathlib import Path

MAX_WORDS = 3
MAX_CHARS = 16
GREEN = "&H0048D98A&"  # ASS colours are &HAABBGGRR


def ts_ass(t):
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


def ts_srt(t):
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def groups(words, max_words=MAX_WORDS, max_chars=MAX_CHARS, breaks=".?!,"):
    cur = []
    for w in words:
        if cur and (len(cur) >= max_words or len(" ".join(x["w"] for x in cur + [w])) > max_chars):
            yield cur
            cur = []
        cur.append(w)
        if w["w"][-1] in breaks:
            yield cur
            cur = []
    if cur:
        yield cur


def main(ep_dir):
    ep_dir = Path(ep_dir)
    ep = json.loads((ep_dir / "episode.json").read_text(encoding="utf-8"))
    tl = json.loads((ep_dir / "audio" / "timeline.json").read_text(encoding="utf-8"))
    vertical = ep.get("format", "short") == "short"
    w, h = (1080, 1920) if vertical else (1920, 1080)
    size = 96 if vertical else 56
    margin_v = 520 if vertical else 70
    outline = 7 if vertical else 4
    font = "Arial Black" if vertical else "Arial"
    split = dict() if vertical else dict(max_words=7, max_chars=42, breaks=".?!")

    head = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {w}
PlayResY: {h}
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,{font},{size},&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,1,0,0,0,100,100,1,0,1,{outline},2,2,80,80,{margin_v},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    events, srt = [], []
    for shot in tl["shots"]:
        for line in shot["lines"]:
            colour = GREEN if line["speaker"] != "narrator" else "&H00FFFFFF&"
            for g in groups(line["words"], **split):
                text = " ".join(x["w"] for x in g)
                if vertical:
                    # small pop-in: scale 80% -> 100% over 80 ms
                    text = text.upper()
                    fx = r"{\fscx80\fscy80\t(0,80,\fscx100\fscy100)\c" + colour + "}"
                else:
                    fx = r"{\c" + colour + "}"
                events.append(f"Dialogue: 0,{ts_ass(g[0]['start'])},{ts_ass(g[-1]['end'])},Cap,,0,0,0,,{fx}{text}")
            srt.append((line["start"], line["end"], line["text"]))

    subs = ep_dir / "subs"
    subs.mkdir(exist_ok=True)
    (subs / "captions.ass").write_text(head + "\n".join(events) + "\n", encoding="utf-8")
    (subs / "captions.srt").write_text(
        "\n".join(f"{i}\n{ts_srt(a)} --> {ts_srt(b)}\n{t}\n" for i, (a, b, t) in enumerate(srt, 1)), encoding="utf-8")
    print(f"captions: {len(events)} events")


if __name__ == "__main__":
    main(sys.argv[1])
