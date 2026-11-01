"""Downloads a Wikimedia Commons file for on-screen archive use and records its license (RULES §5, §12.5).

Usage: tools/video/.venv/Scripts/python tools/video/commons_get.py content/episodes/<episode> <name> "File:<Commons title>" [--width 2000]

Saves images/<name>.jpg and appends {name, title, url, license, artist, credit} to clips/sources.json.
Only public domain, CC0 and CC BY are accepted (no share-alike, RULES §12.5); anything else stops.
"""
import argparse
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

UA = "KAXO-research/1.0 (agent-office; contact via channel)"
OK = re.compile(r"^(public domain|pd|cc0|cc by [0-9.]+$)", re.I)  # no share-alike: it could bind the whole video


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("episode")
    ap.add_argument("name")
    ap.add_argument("title")
    ap.add_argument("--width", type=int, default=2000)
    a = ap.parse_args()
    q = urllib.parse.urlencode({"action": "query", "titles": a.title, "prop": "imageinfo", "format": "json",
                                "iiprop": "url|extmetadata|size", "iiurlwidth": a.width})
    data = json.loads(get(f"https://commons.wikimedia.org/w/api.php?{q}"))
    page = next(iter(data["query"]["pages"].values()))
    if "imageinfo" not in page:
        raise SystemExit(f"not found: {a.title}")
    ii = page["imageinfo"][0]
    meta = ii["extmetadata"]
    lic = re.sub("<[^>]+>", "", meta.get("LicenseShortName", {}).get("value", "")).strip()
    artist = re.sub("<[^>]+>", "", meta.get("Artist", {}).get("value", "")).strip()
    credit = re.sub("<[^>]+>", "", meta.get("Credit", {}).get("value", "")).strip()
    if not OK.match(lic):
        raise SystemExit(f"license not allowed for on-screen use: {lic!r} ({a.title})")
    ep = Path(a.episode)
    (ep / "images").mkdir(parents=True, exist_ok=True)
    (ep / "images" / f"{a.name}.jpg").write_bytes(get(ii.get("thumburl") or ii["url"]))
    src = ep / "clips" / "sources.json"
    src.parent.mkdir(parents=True, exist_ok=True)
    items = json.loads(src.read_text(encoding="utf-8")) if src.exists() else []
    items = [i for i in items if i["name"] != a.name] + [{
        "name": a.name, "title": a.title, "url": ii["descriptionurl"], "license": lic, "artist": artist[:200], "credit": credit[:200]}]
    src.write_text(json.dumps(items, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"{a.name}.jpg  {ii.get('thumbwidth', ii['width'])}px  {lic}  {artist[:60]}")


if __name__ == "__main__":
    main()
