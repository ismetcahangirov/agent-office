"""Content housekeeping (RULES §11). Dry run by default; --apply deletes.

Usage: tools/video/.venv/Scripts/python tools/video/housekeeping.py [--apply] [--keep-reports 10] [--episode-days 30]

1. content/reports: keeps the newest N reports (README.md is never touched).
   Before --apply, make sure anything useful in the old reports is in lessons.md / ideas.md.
2. content/episodes: for episodes listed in published.md and older than N days, removes
   intermediates (audio/*.wav, clips/, video/_segments/). Keeps final.mp4, json, md, images.
"""
import argparse
import re
import shutil
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTENT = ROOT / "content"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--keep-reports", type=int, default=10)
    ap.add_argument("--episode-days", type=int, default=30)
    a = ap.parse_args()
    verb = "delete" if a.apply else "would delete"

    reports = sorted((p for p in (CONTENT / "reports").glob("*.md") if p.name != "README.md"), key=lambda p: p.name, reverse=True)
    for old in reports[a.keep_reports:]:
        print(f"{verb}: {old.relative_to(ROOT)}")
        if a.apply:
            old.unlink()

    published = (CONTENT / "published.md").read_text(encoding="utf-8") if (CONTENT / "published.md").exists() else ""
    cutoff = time.time() - a.episode_days * 86400
    for ep in sorted((CONTENT / "episodes").glob("*/")):
        if not re.search(re.escape(ep.name), published) or ep.stat().st_mtime > cutoff:
            continue
        for target in [*ep.glob("audio/*.wav"), ep / "clips", ep / "video" / "_segments"]:
            if target.exists():
                print(f"{verb}: {target.relative_to(ROOT)}")
                if a.apply:
                    shutil.rmtree(target) if target.is_dir() else target.unlink()

    if not a.apply:
        print("(dry run - add --apply to delete)")


if __name__ == "__main__":
    main()
