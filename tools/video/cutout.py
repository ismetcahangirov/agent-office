"""Removes the background from a mascot image (local, free) and crops to the character.

Usage: tools/video/.venv/Scripts/python tools/video/cutout.py <in.png> <out.png> [--model isnet-anime] [--keep-top 0.6]

--keep-top keeps only the upper part of the character (waist-up framing for thumbnails).

isnet-anime works best for flat cartoon art; u2net is the general fallback.
The model downloads once to ~/.rembg/models on first use (~176 MB).
"""
import argparse

from PIL import Image
from rembg import new_session, remove


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("--model", default="isnet-anime")
    ap.add_argument("--keep-top", type=float, default=1.0)
    a = ap.parse_args()
    with Image.open(a.src) as im:
        cut = remove(im.convert("RGBA"), session=new_session(a.model), post_process_mask=True)
    bbox = cut.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
    if bbox:
        cut = cut.crop(bbox)
    if a.keep_top < 1.0:
        cut = cut.crop((0, 0, cut.width, round(cut.height * a.keep_top)))
    cut.save(a.out)
    print(f"{a.out}  {cut.size[0]}x{cut.size[1]}")


if __name__ == "__main__":
    main()
