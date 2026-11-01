"""Checks that a script is plain and easy to follow (RULES §4, "Sadə və axıcı dil").

Usage: tools/video/.venv/Scripts/python tools/video/readability.py content/episodes/<episode>

Reads every spoken line from episode.json and prints: average sentence length, sentences over
18 words, Flesch Reading Ease, and long words to replace. Exits with 1 when a limit is broken:
average > 13 words, any sentence > 18 words, or Flesch < 70.
"""
import json
import re
import sys
from pathlib import Path

MAX_AVG = 13
MAX_WORDS = 18
MIN_FLESCH = 70
# Words the owner would call "complex" when a simpler one exists (RULES §4).
FORMAL = {"utilize", "commence", "approximately", "furthermore", "consequently", "nevertheless",
          "subsequently", "facilitate", "demonstrate", "numerous", "additionally", "therefore",
          "regarding", "individuals", "obtain", "sufficient", "prior", "endeavor", "moreover"}


def syllables(word):
    w = re.sub(r"[^a-z]", "", word.lower())
    if not w:
        return 0
    groups = re.findall(r"[aeiouy]+", w)
    n = len(groups)
    if w.endswith("e") and not w.endswith(("le", "ee")) and n > 1:
        n -= 1
    return max(n, 1)


def main(ep_dir):
    # Windows consoles default to cp1252, which cannot print "≤"; without this the script crashes.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    ep = json.loads((Path(ep_dir) / "episode.json").read_text(encoding="utf-8"))
    text = " ".join(l["text"] for s in ep["shots"] for l in s.get("lines", []))
    text = re.sub(r"\[pause[^\]]*\]", " ", text)
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if re.search(r"[A-Za-z]", s)]
    words = re.findall(r"[A-Za-z']+", text)
    if not sentences or not words:
        raise SystemExit("no spoken text found")

    avg = len(words) / len(sentences)
    syl = sum(syllables(w) for w in words)
    flesch = 206.835 - 1.015 * avg - 84.6 * syl / len(words)
    long_sent = [s for s in sentences if len(re.findall(r"[A-Za-z']+", s)) > MAX_WORDS]
    formal = sorted({w.lower() for w in words if w.lower() in FORMAL})
    hard = sorted({w.lower() for w in words if syllables(w) >= 4})

    print(f"words {len(words)}, sentences {len(sentences)}, avg {avg:.1f} words/sentence (≤ {MAX_AVG})")
    print(f"Flesch Reading Ease {flesch:.0f} (≥ {MIN_FLESCH})")
    print(f"sentences over {MAX_WORDS} words: {len(long_sent)}")
    for s in long_sent:
        print("  -", s)
    if formal:
        print("formal words to replace:", ", ".join(formal))
    if hard:
        print("long words (check each is needed or explained):", ", ".join(hard))

    ok = avg <= MAX_AVG and not long_sent and flesch >= MIN_FLESCH and not formal
    print("OK" if ok else "FIX: simplify the script (RULES §4)")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main(sys.argv[1])
