"""Cuts the raw terminal recordings into shot clips (optionally sped up) for the tutorial episode."""
import subprocess
from pathlib import Path

import imageio_ffmpeg

EP = Path(__file__).resolve().parents[3] / "content" / "episodes" / "2026-09-27-claude-code-tutorial" / "clips"
FF = imageio_ffmpeg.get_ffmpeg_exe()

# name, source, start s, end s, speed
CUTS = [
    ("c_launch", "cc-session.mp4", 2, 26, 1),
    ("c_theme", "cc-onboarding.mp4", 14, 22, 1),
    ("c_login", "cc-onboarding.mp4", 19, 33, 1),
    ("c_model", "cc-session.mp4", 80, 88.5, 1),  # first picker: Opus 5.5 checked (limit banner masked below)
    ("c_modes", "cc-session.mp4", 132, 160, 1),
    ("c_prompt", "cc-session.mp4", 156, 182, 1),
    ("c_think", "cc-session.mp4", 182, 212, 2),
    ("c_plan", "cc-session.mp4", 208, 262, 1),
    ("c_write", "cc-session.mp4", 262, 345, 3),
    ("c_skip", "cc-session.mp4", 422, 450, 1.5),
    ("c_summary", "cc-session.mp4", 450, 482, 1),
    ("c_stats_prompt", "cc-session.mp4", 482, 500, 1),
    ("c_stats_work", "cc-session.mp4", 500, 540, 2),
    ("c_stats_done", "cc-session.mp4", 540, 568, 1),
    ("c_init", "cc-session.mp4", 568, 625, 1.5),
    ("c_git", "cc-session.mp4", 623, 661, 1),
    # session 2 (new session in the same folder, 2026-09-27 20:27)
    ("d_ask", "cc-session2.mp4", 18, 44, 1),
    ("d_review", "cc-session2.mp4", 52, 100, 2),
    ("d_review_done", "cc-session2.mp4", 97, 127, 1),
    ("d_esc", "cc-session2.mp4", 128, 162, 1),
    ("d_simple", "cc-session2.mp4", 158, 222, 2.5),
    ("d_simple_done", "cc-session2.mp4", 218, 232, 1),
    ("d_rewind", "cc-session2.mp4", 226, 264, 1),
    ("d_commit2", "cc-session2.mp4", 264, 302, 1.5),
    ("v_timer", "vs-code.mp4", 5, 19, 1),
    ("v_tick", "vs-code.mp4", 17, 31, 1),
    ("v_load", "vs-code.mp4", 29, 41, 1),
    ("v_claudemd", "vs-code.mp4", 39, 49.5, 1),
]

# the 1920x1020 terminal is letterboxed to 16:9 (no side crop); the weekly-limit banner in the picker is painted over
EXTRA = {"c_model": "drawbox=x=856:y=476:w=1064:h=46:color=0x0c0c0c:t=fill,tpad=stop_mode=clone:stop_duration=6"}

import sys
ONLY = sys.argv[1:]
for name, src, a, b, speed in CUTS:
    if ONLY and not any(name.startswith(o) for o in ONLY):
        continue
    vf = f"setpts=PTS/{speed},fps=30" if speed != 1 else "fps=30"
    if name in EXTRA:
        vf += "," + EXTRA[name]
    vf += ",pad=1920:1080:0:30:color=0x0c0c0c"
    subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", "-ss", str(a), "-t", str(b - a), "-i", str(EP / src),
                    "-an", "-vf", vf, "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p",
                    str(EP / f"{name}.mp4")], check=True)
    print(f"{name}: {(b - a) / speed:.1f}s")
