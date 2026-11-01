"""Renders the same host lines with several Kokoro voices so the owner can compare voices by ear.
KAXO's voice is chosen (bm_fable, en-us, 2026-10-31); keep this for future side characters.

Usage: tools/video/.venv/Scripts/python tools/video/voice_samples.py [out_dir=content/voice-samples]
Then set the chosen voice in content/character/character.md (and DEFAULT_VOICES["kaxo"] in tts.py).
"""
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

sys.path.insert(0, str(Path(__file__).parent))
from tts import MODELS, SR, lang_of, resolve_voice, trim  # noqa: E402

JUNO = ["Tokyo, 1965. You're nine, and the lunch lady just dropped a tray in front of you.",
        "Rice, miso soup, and something fried. It's not chicken. It's whale.",
        "Quick guess: how many goats lived here in 1960? Five million, twelve, or over twenty?",
        "Wait, what? Over twenty million. And fifty years later, only five were left."]

JUNO_VOICES = [("af_heart", 1.0), ("af_bella", 1.0), ("af_nicole", 1.0), ("bf_emma", 1.0), ("bf_isabella", 1.0),
               ("af_heart:0.7+bf_emma:0.3", 1.0)]


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
    for v, s in JUNO_VOICES:
        render(kokoro, v, s, JUNO, out / f"juno__{v.replace(':', '-').replace('+', '_')}.wav")
    print(f"{len(JUNO_VOICES)} samples -> {out}")

if __name__ == "__main__":
    main()
