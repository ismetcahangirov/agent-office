"""Info cards (1920x1080 PNG) for the Claude Code tutorial: dark, terminal-like, one idea per card."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[3] / "content" / "episodes" / "2026-09-27-claude-code-tutorial" / "images"
F = "C:/Windows/Fonts/"
BG, FG, DIM, ACC, BOX = (13, 15, 19), (236, 238, 242), (140, 146, 158), (232, 122, 90), (28, 32, 40)


def font(name, size):
    return ImageFont.truetype(F + name, size)


def card(name, title, rows):
    im = Image.new("RGB", (1920, 1080), BG)
    d = ImageDraw.Draw(im)
    d.text((140, 120), title, font=font("segoeuib.ttf", 76), fill=FG)
    d.rectangle((140, 230, 260, 238), fill=ACC)
    y = 320
    for kind, text in rows:
        if kind == "code":
            f = font("CascadiaMono.ttf", 46)
            w = d.textlength(text, font=f)
            d.rounded_rectangle((140, y - 22, 140 + w + 80, y + 78), 18, fill=BOX)
            d.text((180, y), text, font=f, fill=ACC)
            y += 140
        elif kind == "label":
            d.text((140, y), text, font=font("segoeui.ttf", 38), fill=DIM)
            y += 70
        else:
            d.text((140, y), text, font=font("segoeui.ttf", 50), fill=FG)
            y += 92
    d.text((140, 990), "Source: code.claude.com/docs", font=font("segoeui.ttf", 30), fill=DIM)
    OUT.mkdir(parents=True, exist_ok=True)
    im.save(OUT / f"{name}.png")
    print(name)


card("s04", "What you need", [
    ("text", "✓  A paid Claude plan: Pro or Max  (or Team / Enterprise)"),
    ("text", "✓  or a Claude Console account with API billing"),
    ("text", "✗  The free Claude plan doesn't include Claude Code"),
    ("text", "✓  Windows: install Git for Windows"),
])
card("s05", "Install Claude Code", [
    ("label", "Windows (PowerShell)"),
    ("code", "irm https://claude.ai/install.ps1 | iex"),
    ("label", "macOS / Linux"),
    ("code", "curl -fsSL https://claude.ai/install.sh | bash"),
    ("label", "Check it worked"),
    ("code", "claude --version"),
])
card("s28", "5 tips from the official best practices", [
    ("text", "1   Give Claude a way to check its work"),
    ("text", "2   Plan first (Shift+Tab), then code"),
    ("text", "3   Be specific. Point at files with  @file"),
    ("text", "4   Keep CLAUDE.md short  (/init writes the first one)"),
    ("text", "5   Esc stops it.  Esc Esc rewinds."),
])
