"""Prepares an episode for the Remotion render (RULES §5.0).

Usage: tools/video/.venv/Scripts/python tools/video/remotion_props.py content/episodes/<episode>

Merges episode.json (what each shot shows) with audio/timeline.json (when each shot starts and ends),
copies the voice, the archive images, KAXO's rig and the font into tools/remotion/public/ and writes
tools/remotion/props/<slug>.json. Then:
  cd tools/remotion && npx remotion render Episode ../../content/episodes/<episode>/video/final.mp4 --props=props/<slug>.json
"""
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REM = ROOT / "tools" / "remotion"
VISUAL_KEYS = ("scene", "kaxo", "graphic", "camera", "chapter", "outfit", "image", "focus", "clip", "clip_start")


def copy_tree(src, dst):
    dst.mkdir(parents=True, exist_ok=True)
    for f in src.iterdir():
        if f.is_file() and (not (dst / f.name).exists() or (dst / f.name).stat().st_mtime < f.stat().st_mtime):
            shutil.copy2(f, dst / f.name)


def main(ep_dir):
    ep_dir = Path(ep_dir).resolve()
    ep = json.loads((ep_dir / "episode.json").read_text(encoding="utf-8"))
    tl = json.loads((ep_dir / "audio" / "timeline.json").read_text(encoding="utf-8"))
    slug = ep["slug"]
    pub = REM / "public" / "ep" / slug
    pub.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ep_dir / "audio" / "voice.wav", pub / "voice.wav")
    for sub in ("images", "clips"):
        if (ep_dir / sub).exists():
            copy_tree(ep_dir / sub, pub / sub)
    copy_tree(ROOT / "content" / "assets" / "kaxo-rig", REM / "public" / "kaxo-rig")
    copy_tree(ROOT / "tools" / "video" / "fonts", REM / "public" / "fonts")
    if (ROOT / "content" / "music").exists():
        music = sorted((ROOT / "content" / "music").glob("*.mp3"))
        if music:
            shutil.copy2(music[0], REM / "public" / "music.mp3")

    timing = {s["id"]: s for s in tl["shots"]}
    shots = []
    for s in ep["shots"]:
        t = timing[s["id"]]
        shots.append({"id": s["id"], "start": t["start"], "end": t["end"],
                      "lines": [{"text": l["text"], "start": l["start"], "end": l["end"]} for l in t["lines"]],
                      **{k: s[k] for k in VISUAL_KEYS if k in s}})
    props = {"slug": slug, "base": f"ep/{slug}", "outfit": ep.get("outfit_key", "base"),
             "duration": tl["duration"], "music": (REM / "public" / "music.mp3").exists(), "shots": shots}
    (REM / "props").mkdir(exist_ok=True)
    out = REM / "props" / f"{slug}.json"
    out.write_text(json.dumps(props, indent=1), encoding="utf-8")
    print(f"{out}  {len(shots)} shots, {tl['duration']:.1f}s")


if __name__ == "__main__":
    main(sys.argv[1])
