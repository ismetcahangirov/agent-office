"""Renders the same KAXO and narrator lines with several Kokoro voices so the owner can pick by ear.

Usage: tools/video/.venv/Scripts/python tools/video/voice_samples.py [out_dir=content/voice-samples]
Then set the chosen voices in content/character/character.md (and the defaults in tts.py).
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

sys.path.insert(0, str(Path(__file__).parent))
from tts import MODELS, SR, lang_of, resolve_voice, trim  # noqa: E402

KAXO = ["So... I run a company.", "Five employees. Zero humans. Honestly? Best team I've ever had.",
        "They work. I supervise. From the couch."]
NARRATOR = ["This is KAXO. He owns a company with no human employees.",
            "Today, his AI builder shipped a website. KAXO shipped a nap."]

KAXO_VOICES = [("am_puck", 0.92), ("am_fenrir", 0.92), ("am_echo", 0.92), ("am_liam", 0.94),
               ("am_puck:0.6+am_fenrir:0.4", 0.9), ("bm_lewis", 0.94)]
NARRATOR_VOICES = [("am_michael", 1.03), ("am_onyx", 1.0), ("bm_george", 1.02), ("am_eric", 1.02), ("bm_fable", 1.02)]


def render(kokoro, voice, speed, lines, path):
    parts = []
    for line in lines:
        audio, _ = kokoro.create(line, voice=resolve_voice(kokoro, voice), speed=speed, lang=lang_of(voice))
        parts += [trim(audio.astype(np.float32)), np.zeros(int(0.35 * SR), np.float32)]
    sf.write(path, np.concatenate(parts), SR)


def main():
    out = Path(sys.argv[1] if len(sys.argv) > 1 else "content/voice-samples")
    out.mkdir(parents=True, exist_ok=True)
    kokoro = Kokoro(str(MODELS / "kokoro-v1.0.int8.onnx"), str(MODELS / "voices-v1.0.bin"))
    for v, s in KAXO_VOICES:
        render(kokoro, v, s, KAXO, out / f"kaxo__{v.replace(':', '-').replace('+', '_')}.wav")
    for v, s in NARRATOR_VOICES:
        render(kokoro, v, s, NARRATOR, out / f"narrator__{v}.wav")
    print(f"{len(KAXO_VOICES) + len(NARRATOR_VOICES)} samples -> {out}")


if __name__ == "__main__":
    main()
