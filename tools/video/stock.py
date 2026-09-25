"""Royalty-free stock B-roll from Pexels and Pixabay (free licenses, no attribution required, credit given anyway).

Usage:
  stock.py search "<query>" [--source pexels|pixabay|all] [--orientation portrait|landscape] [--min 4] [--max 30] [--n 6] [--thumbs DIR]
  stock.py get <pexels|pixabay>:<id> <episode dir> <name> [--orientation portrait|landscape]

search: prints candidates (id, duration, size, author, page) and, with --thumbs, saves poster images to look at before choosing.
get:    downloads the best file (<= 1920 on the long side) to <episode>/clips/<name>.mp4 and records the credit in
        <episode>/clips/stock.json (source, id, page, author, license, query). seo.json "sources" / the description credit it.

Keys come from .env at the project root (PEXELS_API_KEY, PIXABAY_API_KEY) or the environment. Never commit them.
Only the standard library is used.
"""
import argparse
import json
import os
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
UA = "agent-office-kaxo/1.0"
LICENSES = {"pexels": "Pexels License (https://www.pexels.com/license/)",
            "pixabay": "Pixabay Content License (https://pixabay.com/service/license-summary/)"}


def load_env():
    env = ROOT / ".env"
    if env.exists():
        for line in env.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())


def key(name):
    v = os.environ.get(name)
    if not v:
        raise SystemExit(f"{name} is not set (put it in {ROOT / '.env'})")
    return v


def fetch_json(url, headers=None):
    req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def download(url, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest, "wb") as f:
        while chunk := r.read(1 << 16):
            f.write(chunk)


def pick(files, orientation):
    """Largest file whose long side is <= 1920 (4K is wasted on a 1080p edit); falls back to the smallest."""
    files = [f for f in files if f.get("url") and f.get("width")]
    ok = [f for f in files if max(f["width"], f["height"]) <= 1920]
    return max(ok, key=lambda f: f["width"] * f["height"]) if ok else min(files, key=lambda f: f["width"] * f["height"])


def pexels(query=None, vid=None, orientation=None, n=6):
    h = {"Authorization": key("PEXELS_API_KEY")}
    if vid:
        items = [fetch_json(f"https://api.pexels.com/videos/videos/{vid}", h)]
    else:
        q = {"query": query, "per_page": n, "size": "medium"}
        if orientation:
            q["orientation"] = orientation
        items = fetch_json("https://api.pexels.com/videos/search?" + urllib.parse.urlencode(q), h)["videos"]
    return [{"source": "pexels", "id": v["id"], "duration": v["duration"], "page": v["url"],
             "author": v["user"]["name"], "thumb": v.get("image"),
             "files": [{"url": f["link"], "width": f["width"] or 0, "height": f["height"] or 0}
                       for f in v["video_files"] if f.get("file_type") == "video/mp4"]} for v in items]


def pixabay(query=None, vid=None, orientation=None, n=6):
    q = {"key": key("PIXABAY_API_KEY"), "per_page": max(3, n), "safesearch": "true"}
    q.update({"id": vid} if vid else {"q": query})
    items = fetch_json("https://pixabay.com/api/videos/?" + urllib.parse.urlencode(q))["hits"]
    out = []
    for v in items:
        files = [{"url": f["url"], "width": f["width"], "height": f["height"]} for f in v["videos"].values() if f.get("url")]
        w, h = max(((f["width"], f["height"]) for f in files), default=(0, 0))
        if not vid and orientation and (h > w) != (orientation == "portrait"):
            continue
        out.append({"source": "pixabay", "id": v["id"], "duration": v["duration"], "page": v["pageURL"],
                    "author": v["user"], "thumb": v["videos"].get("medium", {}).get("thumbnail"), "files": files})
    return out


PROVIDERS = {"pexels": pexels, "pixabay": pixabay}


def cmd_search(a):
    sources = PROVIDERS if a.source == "all" else {a.source: PROVIDERS[a.source]}
    found = []
    for name, fn in sources.items():
        try:
            found += fn(query=a.query, orientation=a.orientation, n=a.n)
        except Exception as e:  # one provider down should not hide the other
            print(f"[{name}] error: {e}", file=sys.stderr)
    found = [v for v in found if a.min <= v["duration"] <= a.max]
    for v in found:
        best = pick(v["files"], a.orientation) if v["files"] else {"width": 0, "height": 0}
        print(f"{v['source']}:{v['id']}  {v['duration']:>3}s  {best['width']}x{best['height']}  {v['author']}  {v['page']}")
        if a.thumbs and v.get("thumb"):
            try:
                download(v["thumb"], Path(a.thumbs) / f"{v['source']}-{v['id']}.jpg")
            except Exception as e:
                print(f"  thumb failed: {e}", file=sys.stderr)
    if a.thumbs:
        print(f"thumbs -> {Path(a.thumbs).resolve()}")
    if not found:
        print("no results")


def cmd_get(a):
    source, vid = a.ref.split(":", 1)
    items = PROVIDERS[source](vid=vid)
    if not items:
        raise SystemExit(f"not found: {a.ref}")
    v = items[0]
    f = pick(v["files"], a.orientation)
    ep = Path(a.episode)
    dest = ep / "clips" / f"{a.name}.mp4"
    download(f["url"], dest)
    credits_path = ep / "clips" / "stock.json"
    credits = json.loads(credits_path.read_text(encoding="utf-8")) if credits_path.exists() else []
    credits = [c for c in credits if c["file"] != f"clips/{a.name}.mp4"]
    credits.append({"file": f"clips/{a.name}.mp4", "source": source, "id": v["id"], "page": v["page"],
                    "author": v["author"], "license": LICENSES[source], "size": f"{f['width']}x{f['height']}",
                    "duration": v["duration"]})
    credits_path.write_text(json.dumps(credits, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"{dest}  {f['width']}x{f['height']}  {v['duration']}s  by {v['author']} ({source})")


def main():
    load_env()
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("search")
    s.add_argument("query")
    s.add_argument("--source", default="all", choices=["all", *PROVIDERS])
    s.add_argument("--orientation", choices=["portrait", "landscape"])
    s.add_argument("--min", type=int, default=3)
    s.add_argument("--max", type=int, default=60)
    s.add_argument("--n", type=int, default=6)
    s.add_argument("--thumbs")
    g = sub.add_parser("get")
    g.add_argument("ref")
    g.add_argument("episode")
    g.add_argument("name")
    g.add_argument("--orientation", choices=["portrait", "landscape"])
    a = p.parse_args()
    (cmd_search if a.cmd == "search" else cmd_get)(a)


if __name__ == "__main__":
    main()
