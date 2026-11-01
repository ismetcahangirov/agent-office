"""Builds KAXO's puppet poses for the code-rendered videos (RULES §5.0) from the design sheets.

Usage: tools/video/.venv/Scripts/python tools/video/make_rig.py

Cuts every figure out of content/character/{reference,expressions,outfits}.png with rembg, keeps only
the largest connected shape (drops bits of the neighbouring figure on the sheet) and writes transparent
PNGs plus rig.json to content/assets/kaxo-rig/. Remotion copies them into public/kaxo-rig/.
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[2]
CHAR = ROOT / "content" / "character"
OUT = ROOT / "content" / "assets" / "kaxo-rig"

# name: (sheet, crop box on the sheet, framing). Boxes are generous; the largest shape wins.
POSES = {
    "idle": ("reference.png", (0, 0, 1024, 1536), "full"),
    "surprised": ("expressions.png", (0, 60, 430, 1024), "waist"),
    "laugh": ("expressions.png", (390, 60, 765, 1024), "waist"),
    "think": ("expressions.png", (730, 60, 1140, 1024), "waist"),
    "point": ("expressions.png", (1040, 60, 1536, 1024), "waist"),
    "outfit-food": ("outfits.png", (0, 0, 420, 1024), "full"),
    "outfit-prehistory": ("outfits.png", (380, 0, 790, 1024), "full"),
    "outfit-nature": ("outfits.png", (760, 0, 1170, 1024), "full"),
    "outfit-lab": ("outfits.png", (1130, 0, 1536, 1024), "full"),
}


def largest_shape(rgba):
    a = np.array(rgba.getchannel("A"))
    mask = a > 24
    labels, n = ndimage.label(mask)
    if n == 0:
        return rgba
    sizes = ndimage.sum(mask, labels, range(1, n + 1))
    keep = labels == (int(np.argmax(sizes)) + 1)
    # keep small pieces that sit inside the main shape's box (pencil tip, hair curls)
    ys, xs = np.where(keep)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    for i, s in enumerate(sizes, 1):
        if s > 40 and i != int(np.argmax(sizes)) + 1:
            py, px = np.where(labels == i)
            if py.min() >= y0 - 10 and px.min() >= x0 - 10 and px.max() <= x1 + 10:
                keep |= labels == i
    a = np.where(keep, a, 0).astype(np.uint8)
    out = rgba.copy()
    out.putalpha(Image.fromarray(a))
    return out.crop(out.getbbox())


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    session = new_session("isnet-anime")
    rig = {}
    for name, (sheet, box, framing) in POSES.items():
        with Image.open(CHAR / sheet) as im:
            part = im.convert("RGBA").crop(box)
        cut = remove(part, session=session, post_process_mask=True)
        cut = largest_shape(cut)
        cut.save(OUT / f"{name}.png")
        rig[name] = {"file": f"{name}.png", "w": cut.width, "h": cut.height, "framing": framing}
        print(f"{name:18s} {cut.width}x{cut.height}")
    (OUT / "rig.json").write_text(json.dumps(rig, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
