"""Moves an image downloaded from the browser into the episode as images/<shot>.png.

Usage: tools/video/.venv/Scripts/python tools/video/take_download.py content/episodes/<episode> <shot id> [--max-age 300]

Looks in ~/Downloads for the newest file named "<shot id>*" (png/webp/jpg) that is at most
--max-age seconds old, converts it to PNG and removes the download.
"""
import argparse
import time
from pathlib import Path

from PIL import Image

EXTS = {".png", ".webp", ".jpg", ".jpeg"}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("episode")
    ap.add_argument("shot")
    ap.add_argument("--max-age", type=int, default=300)
    a = ap.parse_args()

    dirs = [Path.home() / "Downloads"]
    now = time.time()
    cands = [p for d in dirs if d.exists() for p in d.glob(f"{a.shot}*")
             if p.suffix.lower() in EXTS and now - p.stat().st_mtime <= a.max_age]
    if not cands:
        raise SystemExit(f"no fresh image named {a.shot}* in {', '.join(map(str, dirs))}")
    src = max(cands, key=lambda p: p.stat().st_mtime)

    out = Path(a.episode) / "images" / f"{a.shot}.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        im.convert("RGB").save(out)
        size = im.size
    src.unlink()
    print(f"{out}  {size[0]}x{size[1]}  (from {src.name})")


if __name__ == "__main__":
    main()
