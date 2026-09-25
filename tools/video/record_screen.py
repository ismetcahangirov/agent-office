"""Records the real Windows screen as B-roll: VS Code while code is typed, a terminal running agents, any app window.

Usage:
  record_screen.py <out.mp4> [--seconds 20] [--window "<title substring>"] [--region x,y,w,h] [--stop-file PATH] [--fps 30]

  --window     finds the first visible window whose title contains the text (case-insensitive), restores/raises it
               and records only its rectangle. Without --window/--region the whole primary screen is recorded.
  --region     explicit rectangle in physical pixels.
  --stop-file  stops early as soon as this file exists (start recording in the background, do the work, then create
               the file). --seconds is still the upper limit.
  --no-mouse   hides the mouse pointer (typing shots).
  --list       prints visible window titles and exits.

Uses imageio-ffmpeg's ffmpeg (gdigrab). Output: H.264 yuv420p, even dimensions, no audio.
Close or hide anything private (mail, chats, tokens) before recording: the screen is recorded as is.
"""
import argparse
import ctypes
import ctypes.wintypes as wt
import subprocess
import sys
import time
from pathlib import Path

import imageio_ffmpeg

user32 = ctypes.windll.user32
try:  # physical pixels, so window rects match what gdigrab captures on scaled displays
    ctypes.windll.shcore.SetProcessDpiAwareness(2)
except Exception:
    user32.SetProcessDPIAware()


def windows():
    found = []

    @ctypes.WINFUNCTYPE(ctypes.c_bool, wt.HWND, wt.LPARAM)
    def cb(hwnd, _):
        if user32.IsWindowVisible(hwnd):
            n = user32.GetWindowTextLengthW(hwnd)
            if n:
                buf = ctypes.create_unicode_buffer(n + 1)
                user32.GetWindowTextW(hwnd, buf, n + 1)
                found.append((hwnd, buf.value))
        return True

    user32.EnumWindows(cb, 0)
    return found


def find_window(text):
    text = text.lower()
    for hwnd, title in windows():
        if text in title.lower():
            return hwnd, title
    raise SystemExit(f"no visible window with '{text}' in its title (use --list)")


def raise_window(hwnd):
    SW_RESTORE = 9
    if user32.IsIconic(hwnd):
        user32.ShowWindow(hwnd, SW_RESTORE)
    # Alt tap lets a background process take the foreground (SetForegroundWindow rule)
    user32.keybd_event(0x12, 0, 0, 0)
    user32.keybd_event(0x12, 0, 2, 0)
    user32.SetForegroundWindow(hwnd)
    time.sleep(0.4)


def foreground_title():
    hwnd = user32.GetForegroundWindow()
    n = user32.GetWindowTextLengthW(hwnd)
    buf = ctypes.create_unicode_buffer(n + 1)
    user32.GetWindowTextW(hwnd, buf, n + 1)
    return buf.value


def window_rect(hwnd):
    # DWM extended frame bounds exclude the invisible resize border that GetWindowRect includes
    r = wt.RECT()
    if ctypes.windll.dwmapi.DwmGetWindowAttribute(hwnd, 9, ctypes.byref(r), ctypes.sizeof(r)) != 0:
        user32.GetWindowRect(hwnd, ctypes.byref(r))
    x, y = max(0, r.left), max(0, r.top)
    return x, y, r.right - x, r.bottom - y


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("out", nargs="?")
    p.add_argument("--seconds", type=float, default=20)
    p.add_argument("--window")
    p.add_argument("--region")
    p.add_argument("--stop-file")
    p.add_argument("--fps", type=int, default=30)
    p.add_argument("--no-mouse", action="store_true")
    p.add_argument("--list", action="store_true")
    a = p.parse_args()

    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if a.list:
        for _, t in windows():
            print(t)
        return
    if not a.out:
        p.error("out is required")

    grab = ["-f", "gdigrab", "-framerate", str(a.fps), "-draw_mouse", "0" if a.no_mouse else "1"]
    if a.window:
        hwnd, title = find_window(a.window)
        raise_window(hwnd)
        x, y, w, h = window_rect(hwnd)
        print(f"window: {title}  {w}x{h} at {x},{y}")
    elif a.region:
        x, y, w, h = map(int, a.region.split(","))
    else:
        x, y, w, h = 0, 0, user32.GetSystemMetrics(0), user32.GetSystemMetrics(1)
    w, h = w - w % 2, h - h % 2
    grab += ["-offset_x", str(x), "-offset_y", str(y), "-video_size", f"{w}x{h}", "-i", "desktop"]

    out = Path(a.out).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    stop = Path(a.stop_file) if a.stop_file else None
    if stop and stop.exists():
        stop.unlink()

    cmd = [imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y", *grab,
           "-t", str(a.seconds), "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", str(out)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    start = time.time()
    try:
        while proc.poll() is None:
            if stop and stop.exists():
                proc.stdin.write(b"q")  # graceful stop: ffmpeg finalizes the file
                proc.stdin.flush()
                break
            time.sleep(0.2)
    except KeyboardInterrupt:
        proc.stdin.write(b"q")
        proc.stdin.flush()
    proc.wait(timeout=30)
    if stop and stop.exists():
        stop.unlink()
    if proc.returncode not in (0, None) or not out.exists():
        sys.exit(f"ffmpeg failed ({proc.returncode})")
    print(f"{out}  {w}x{h}  {time.time() - start:.1f}s")


if __name__ == "__main__":
    main()
