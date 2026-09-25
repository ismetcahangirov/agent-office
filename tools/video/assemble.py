"""Assembles the final video from shot images/clips, voice track and captions.

Usage: tools/video/.venv/Scripts/python tools/video/assemble.py content/episodes/<episode>

Needs: episode.json, audio/voice.wav, audio/timeline.json, subs/captions.ass,
       images/<shot id>.png (or shot["clip"]: a video file, e.g. office footage).
Writes: video/final.mp4 (+ video/thumbnail.jpg when images/thumbnail.png exists).

Clips ("clip") can be cropped first ("crop": [x, y, w, h] fractions; "sharp": true keeps pixel art crisp), then fill the frame ("fit": "cover") or sit on a blurred copy ("fit": "blur", default for shorts).
Stills whose aspect ratio is far from the output are shown whole on a blurred copy ("fit": "cover" forces a crop).
Each still gets slow camera motion ("motion": zoom_in | zoom_out | pan_left | pan_right | static).
Background music: the first file in content/music/ (if any) is mixed quietly under the voice.
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

FF = imageio_ffmpeg.get_ffmpeg_exe()
FPS = 30
ROOT = Path(__file__).resolve().parents[2]


def run(args, cwd):
    r = subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", *args], cwd=cwd, capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit(f"ffmpeg failed: {' '.join(args[:6])}...\n{r.stderr[-2000:]}")


def encoder():
    """NVENC when it works on this machine, libx264 otherwise."""
    r = subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "color=s=256x256:d=0.1",
                        "-c:v", "h264_nvenc", "-f", "null", "-"], capture_output=True)
    if r.returncode == 0:
        return ["-c:v", "h264_nvenc", "-preset", "p5", "-cq", "21", "-pix_fmt", "yuv420p"]
    return ["-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p"]


def motion_filter(motion, w, h, frames):
    big = f"scale={w * 2}:{h * 2}:force_original_aspect_ratio=increase,crop={w * 2}:{h * 2}"
    center = "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
    step = 0.12 / max(frames, 1)
    z = {
        "zoom_in": f"z='min(1+{step}*on,1.12)':{center}",
        "zoom_out": f"z='max(1.12-{step}*on,1)':{center}",
        "pan_left": f"z=1.12:x='(iw-iw/zoom)*(1-on/{frames})':y='ih/2-(ih/zoom/2)'",
        "pan_right": f"z=1.12:x='(iw-iw/zoom)*on/{frames}':y='ih/2-(ih/zoom/2)'",
        "static": f"z=1:{center}",
    }.get(motion, f"z='min(1+{step}*on,1.12)':{center}")
    return f"{big},zoompan={z}:d=1:s={w}x{h}:fps={FPS},setsar=1"


def fit_still(img, w, h, work, idx):
    """Still with a very different aspect ratio (portrait art in a 16:9 video, or the reverse):
    show it whole on a blurred, darkened copy of itself instead of cropping the character's head off."""
    from PIL import ImageFilter, ImageEnhance
    im = Image.open(img).convert("RGB")
    if abs((im.width / im.height) / (w / h) - 1) < 0.25:
        return img
    W, H = w * 2, h * 2  # zoompan works on a 2x canvas
    bg_scale = max(W / im.width, H / im.height)
    bg = im.resize((round(im.width * bg_scale), round(im.height * bg_scale)))
    bg = bg.crop(((bg.width - W) // 2, (bg.height - H) // 2, (bg.width - W) // 2 + W, (bg.height - H) // 2 + H))
    bg = ImageEnhance.Brightness(bg.filter(ImageFilter.GaussianBlur(40))).enhance(0.45)
    fg_scale = min(W / im.width, H / im.height)
    fg = im.resize((round(im.width * fg_scale), round(im.height * fg_scale)), Image.LANCZOS)
    bg.paste(fg, ((W - fg.width) // 2, (H - fg.height) // 2))
    out = work / f"still_{idx:03d}.png"
    bg.save(out)
    return out


def main(ep_dir):
    ep_dir = Path(ep_dir).resolve()
    ep = json.loads((ep_dir / "episode.json").read_text(encoding="utf-8"))
    tl = json.loads((ep_dir / "audio" / "timeline.json").read_text(encoding="utf-8"))
    vertical = ep.get("format", "short") == "short"
    w, h = (1080, 1920) if vertical else (1920, 1080)
    enc = encoder()
    shots = {s["id"]: s for s in ep["shots"]}

    work = ep_dir / "video" / "_segments"
    if work.exists():
        shutil.rmtree(work)
    work.mkdir(parents=True)

    listing = []
    for i, seg in enumerate(tl["shots"]):
        shot = shots[seg["id"]]
        dur = seg["end"] - seg["start"]
        frames = max(1, round(dur * FPS))
        out = work / f"{i:03d}.mp4"
        if shot.get("clip"):
            clip = (ep_dir / shot["clip"]) if (ep_dir / shot["clip"]).exists() else (ROOT / shot["clip"])
            # optional "crop": [x, y, w, h] as fractions of the source, e.g. zoom into part of the office
            pre = ""
            if shot.get("crop"):
                cx, cy, cw, ch = shot["crop"]
                pre = f"crop=iw*{cw}:ih*{ch}:iw*{cx}:ih*{cy},"
            if shot.get("fit", "blur" if vertical else "cover") == "blur":
                # whole frame visible, blurred copy of itself fills the rest
                vf = (f"{pre}split[a][b];[a]scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h},boxblur=30:2,eq=brightness=-0.15[bg];"
                      f"[b]scale={w}:{h}:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps={FPS},setsar=1")
            else:
                # "sharp": nearest-neighbour scaling keeps pixel art crisp when a small crop is blown up
                flags = ":flags=neighbor" if shot.get("sharp") else ""
                vf = f"{pre}scale={w}:{h}:force_original_aspect_ratio=increase{flags},crop={w}:{h},fps={FPS},setsar=1"
            run(["-stream_loop", "-1", "-ss", str(shot.get("clip_start", 0)), "-i", str(clip), "-t", f"{dur:.3f}",
                 "-an", "-vf", vf, "-frames:v", str(frames), *enc, str(out)], ep_dir)
        else:
            img = ep_dir / "images" / f"{seg['id']}.png"
            if not img.exists():
                raise SystemExit(f"missing image: {img}")
            img = fit_still(img, w, h, work, i) if shot.get("fit", "auto") != "cover" else img
            run(["-loop", "1", "-i", str(img), "-vf", motion_filter(shot.get("motion", "zoom_in"), w, h, frames),
                 "-frames:v", str(frames), *enc, str(out)], ep_dir)
        listing.append(f"file '{out.as_posix()}'")
    (work / "list.txt").write_text("\n".join(listing) + "\n", encoding="utf-8")
    run(["-f", "concat", "-safe", "0", "-i", "video/_segments/list.txt", "-c", "copy", "video/_segments/joined.mp4"], ep_dir)

    # Audio is mixed and loudness-normalised in its own pass. Doing it in the same filter graph as the subtitle
    # burn-in left gaps in the AAC stream (episode 2: 351 s of samples in a 392 s video, heard as dropouts).
    music = sorted((ROOT / "content" / "music").glob("*.mp3")) if (ROOT / "content" / "music").exists() else []
    norm = "loudnorm=I=-14:TP=-1.5,aresample=48000"
    if music:
        run(["-i", "audio/voice.wav", "-stream_loop", "-1", "-i", str(music[0]), "-filter_complex",
             f"[0:a]volume=1.0[v];[1:a]volume=0.07[m];[v][m]amix=inputs=2:duration=first:dropout_transition=0,{norm}",
             "-ar", "48000", "-ac", "1", "video/_segments/mix.wav"], ep_dir)
    else:
        run(["-i", "audio/voice.wav", "-af", norm, "-ar", "48000", "-ac", "1", "video/_segments/mix.wav"], ep_dir)
    run(["-i", "video/_segments/joined.mp4", "-i", "video/_segments/mix.wav", "-vf", "ass=subs/captions.ass",
         "-map", "0:v", "-map", "1:a", *enc, "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
         "-t", f"{tl['duration']:.3f}", "-movflags", "+faststart", "video/final.mp4"], ep_dir)
    shutil.rmtree(work)

    # guard: the audio stream must cover the whole video (a short stream plays back as silent gaps)
    probe = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-i", str(ep_dir / "video" / "final.mp4"),
                            "-map", "0:a", "-af", "astats=metadata=1", "-f", "null", "-"], capture_output=True, text=True)
    samples = [int(l.rsplit(":", 1)[1]) for l in probe.stderr.splitlines() if "Number of samples" in l]
    if not samples or samples[-1] < 48000 * (tl["duration"] - 0.5):
        raise SystemExit(f"audio stream too short: {samples[-1] / 48000 if samples else 0:.1f}s of {tl['duration']:.1f}s")
    print(f"audio ok: {samples[-1] / 48000:.1f}s of {tl['duration']:.1f}s")

    thumb = ep_dir / "images" / "thumbnail.png"
    if thumb.exists():
        im = Image.open(thumb).convert("RGB")
        tw, th = (1080, 1920) if vertical else (1280, 720)
        scale = max(tw / im.width, th / im.height)
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
        left, top = (im.width - tw) // 2, (im.height - th) // 2
        im.crop((left, top, left + tw, top + th)).save(ep_dir / "video" / "thumbnail.jpg", quality=92)

    print(f"video/final.mp4  {tl['duration']:.1f}s  {w}x{h}  ({enc[1]})")


if __name__ == "__main__":
    main(sys.argv[1])
