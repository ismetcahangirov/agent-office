"""Gündəm siqnalları: YouTube (son N saatın ən çox baxılan AI videoları) + Reddit (günün top postları).

İşlətmə: tools/video/.venv/Scripts/python tools/gundem/social.py [--hours 24] [--out work/research/gundem-YYYY-MM-DD-social.md]
YOUTUBE_API_KEY .env-dən oxunur və heç yerə çap olunmur.
"""
import argparse
import datetime as dt
import json
import re
import xml.etree.ElementTree as ET
import os
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UA = "Mozilla/5.0 (KAXO gundem; research)"
UA_BROWSER = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"

YT_QUERIES = ["AI news", "artificial intelligence", "new AI model", "AI tool", "Claude", "ChatGPT", "GPT", "Gemini", "AI agent", "Claude Code", "yapay zeka"]
# Qruplar SKILL.md-dəki qayda ilə eynidir: şirkət sub-ları, texniki icma, geniş gündəm, vizual (video/şəkil).
SUBREDDITS = ["ClaudeAI", "ClaudeCode", "Anthropic", "OpenAI", "ChatGPT", "GeminiAI", "Bard",
              "LocalLLaMA", "MachineLearning", "singularity", "artificial", "StableDiffusion", "aivideo"]


def env_key(name):
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            if line.strip().startswith(name + "="):
                return line.split("=", 1)[1].strip().strip('"')
    return None


def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def youtube(hours):
    key = env_key("YOUTUBE_API_KEY")
    if not key:
        return None, "YOUTUBE_API_KEY yoxdur"
    since = (dt.datetime.now(dt.timezone.utc) - dt.timedelta(hours=hours)).strftime("%Y-%m-%dT%H:%M:%SZ")
    ids = {}
    for q in YT_QUERIES:
        params = {"part": "snippet", "type": "video", "order": "viewCount", "publishedAfter": since,
                  "q": q, "maxResults": 15, "relevanceLanguage": "en" if q != "yapay zeka" else "tr",
                  "key": key}
        try:
            data = get_json("https://www.googleapis.com/youtube/v3/search?" + urllib.parse.urlencode(params))
        except Exception as e:  # açar URL-də olduğu üçün xətanın mətni çap olunmur
            return None, f"YouTube search xətası ({type(e).__name__})"
        for it in data.get("items", []):
            ids.setdefault(it["id"]["videoId"], q)
    rows = []
    id_list = list(ids)
    for i in range(0, len(id_list), 50):
        params = {"part": "snippet,statistics", "id": ",".join(id_list[i:i + 50]), "key": key}
        try:
            data = get_json("https://www.googleapis.com/youtube/v3/videos?" + urllib.parse.urlencode(params))
        except Exception as e:
            return None, f"YouTube videos xətası ({type(e).__name__})"
        for it in data.get("items", []):
            s, st = it["snippet"], it.get("statistics", {})
            rows.append({
                "views": int(st.get("viewCount", 0)),
                "title": s["title"].replace("|", "/"),
                "channel": s["channelTitle"].replace("|", "/"),
                "published": s["publishedAt"][:16].replace("T", " "),
                "url": "https://youtu.be/" + it["id"],
                "q": ids[it["id"]],
            })
    rows.sort(key=lambda r: r["views"], reverse=True)
    return rows[:40], None


def reddit(hours):
    """Reddit JSON API 403 verir; top/.rss işləyir (sıra xala görədir, amma xal göstərilmir)."""
    t = "day" if hours <= 24 else "week"
    ns = {"a": "http://www.w3.org/2005/Atom"}
    out, errors = [], []
    for sub in SUBREDDITS:
        root = None
        for attempt in range(3):  # Reddit ardıcıl sorğularda 429 verir
            time.sleep(8 + attempt * 20)
            try:
                req = urllib.request.Request(f"https://www.reddit.com/r/{sub}/top/.rss?t={t}&limit=10",
                                             headers={"User-Agent": UA_BROWSER})
                with urllib.request.urlopen(req, timeout=30) as r:
                    root = ET.fromstring(r.read())
                break
            except Exception as e:
                err = e
        if root is None:
            errors.append(f"r/{sub}: {err}")
            continue
        for rank, e in enumerate(root.findall("a:entry", ns), 1):
            content = e.findtext("a:content", "", ns)
            m = re.search(r'<a href="([^"]+)">\[link\]', content)
            link = m.group(1) if m else ""
            out.append({
                "sub": sub, "rank": rank,
                "title": (e.findtext("a:title", "", ns) or "").replace("|", "/"),
                "author": (e.findtext("a:author/a:name", "", ns) or "").replace("/u/", "u/"),
                "created": (e.findtext("a:published", "", ns) or "")[:16].replace("T", " "),
                "link": "" if "reddit.com" in link else link,
                "permalink": e.find("a:link", ns).get("href"),
            })
    return out, errors


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--hours", type=int, default=24)
    ap.add_argument("--out")
    a = ap.parse_args()
    today = dt.date.today().isoformat()
    out = a.out or os.path.join(ROOT, "work", "research", f"gundem-{today}-social.md")

    lines = [f"# Gündəm sosial siqnalları · {today} (son {a.hours} saat)", "",
             "> Bu fayl yalnız **siqnaldır**: nə danışılır. Heç bir sətir təkbaşına xəbər mənbəyi deyil (RULES §13).", ""]

    yt, err = youtube(a.hours)
    lines += [f"## YouTube: son {a.hours} saatın ən çox baxılan videoları", ""]
    if err:
        lines.append(f"_Xəta: {err}_")
    else:
        lines += ["| Baxış | Başlıq | Kanal | Dərc (UTC) | Sorğu | Link |", "|---|---|---|---|---|---|"]
        lines += [f"| {r['views']:,} | {r['title']} | {r['channel']} | {r['published']} | {r['q']} | {r['url']} |" for r in yt]
    lines.append("")

    rd, errs = reddit(a.hours)
    lines += ["## Reddit: günün top postları (hər sub-da xala görə sıra)", "",
              "| Sub | Yer | Başlıq | Müəllif | Yaradılıb (UTC) | Xarici link | Post |", "|---|---|---|---|---|---|---|"]
    lines += [f"| r/{r['sub']} | {r['rank']} | {r['title']} | {r['author']} | {r['created']} | {r['link']} | {r['permalink']} |" for r in rd]
    if errs:
        lines += ["", "_Açılmayan: " + "; ".join(errs) + "_"]
    lines.append("")

    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8", newline="") as f:
        f.write("\n".join(lines))
    print(f"{out}: YouTube {0 if err else len(yt)} video, Reddit {len(rd)} post" + (f", YouTube xətası: {err}" if err else ""))


if __name__ == "__main__":
    sys.exit(main())
