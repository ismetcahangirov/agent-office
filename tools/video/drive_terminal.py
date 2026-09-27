"""Drives a real Windows Terminal window for tutorial screen recordings (e.g. an interactive Claude Code session).

Usage:
  drive_terminal.py open  --title KAXO-DEMO --cwd <dir> [--config-dir <dir>] [--zoom 4]
  drive_terminal.py type  --title KAXO-DEMO "text" [--enter] [--cps 22]
  drive_terminal.py key   --title KAXO-DEMO enter|esc|tab|shift+tab|up|down|ctrl+c|<char> [--times N]
  drive_terminal.py shot  --title KAXO-DEMO out.png
  drive_terminal.py wait  --config-dir <dir> --cwd <dir> [--quiet 8] [--stall 30] [--timeout 900]

- open: new maximized Windows Terminal window with a fixed title, a short prompt (folder name only, no user path)
  and CLAUDE_CONFIG_DIR set, so `claude` runs with a clean profile (no personal hooks, plugins or CLAUDE.md).
- type/key: real keyboard input (SendInput), like type_code.py. Do not touch keyboard/mouse while it runs.
- wait: watches Claude Code's session transcript (<config-dir>/projects/<slug>/*.jsonl). Prints "idle" when the last
  entry is a finished assistant turn and nothing changed for --quiet s; "stalled" when nothing changed for --stall s
  (usually a permission prompt: take a shot and decide); "timeout" otherwise.
"""
import argparse
import json
import re
import subprocess
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from record_screen import find_window, foreground_title, raise_window, window_rect  # noqa: E402
from type_code import ctrl, key, send, type_char, user32, KEYUP  # noqa: E402

import imageio_ffmpeg  # noqa: E402

CLEAN_ENV = ("Get-ChildItem Env: | Where-Object { $_.Name -like 'CLAUDE*' -or $_.Name -like 'MCP*' } | "
             "ForEach-Object { Remove-Item ('Env:' + $_.Name) }")
VK = {"enter": 0x0D, "esc": 0x1B, "tab": 0x09, "up": 0x26, "down": 0x28, "left": 0x25, "right": 0x27,
      "backspace": 0x08, "space": 0x20}


def window(title):
    hwnd, _ = find_window(title)
    if title.lower() not in foreground_title().lower():
        raise_window(hwnd)
    if title.lower() not in foreground_title().lower():
        sys.exit(f"could not focus '{title}' (foreground: {foreground_title()!r})")
    return hwnd


def cmd_open(a):
    cwd = Path(a.cwd).resolve()
    cwd.mkdir(parents=True, exist_ok=True)
    setup = "function prompt { 'PS ' + (Split-Path -Leaf $PWD) + '> ' }; "
    # wt can inherit this Claude session's env (CLAUDECODE, CLAUDE_CODE_CHILD_SESSION...): the demo session would
    # then show a "transcript saving is off" warning and write no transcript for `wait`
    setup += CLEAN_ENV + "; "
    if a.config_dir:
        Path(a.config_dir).mkdir(parents=True, exist_ok=True)
        setup += f"$env:CLAUDE_CONFIG_DIR='{Path(a.config_dir).resolve()}'; "
    setup += "Clear-Host"
    subprocess.Popen(["wt.exe", "-w", "new", "new-tab", "--title", a.title, "--suppressApplicationTitle",
                      "-d", str(cwd), "powershell", "-NoLogo", "-NoExit", "-Command", setup.replace(";", "\;")])  # wt splits on ";"
    for _ in range(60):
        try:
            hwnd, _t = find_window(a.title)
            break
        except SystemExit:
            time.sleep(0.5)
    else:
        sys.exit("terminal window did not appear")
    user32.ShowWindow(hwnd, 3)  # maximize
    raise_window(hwnd)
    time.sleep(1.5)
    for _ in range(a.zoom):  # Ctrl+= : bigger font, readable on a phone
        ctrl(0xBB)
        time.sleep(0.15)
    print("opened", a.title)


def cmd_type(a):
    window(a.title)
    delay = 1 / a.cps
    text = a.text.replace("\\n", "\n")
    for c in text:
        if c == "\n":  # Shift+Enter = newline inside Claude Code's prompt
            send(vk=0x10)
            key(0x0D)
            send(vk=0x10, flags=KEYUP)
        else:
            type_char(c)
        time.sleep(delay * (0.6 + (hash(c) % 10) / 10))
        if a.title.lower() not in foreground_title().lower():
            sys.exit(f"focus lost while typing (foreground: {foreground_title()!r})")
    if a.enter:
        time.sleep(0.4)
        key(0x0D)
    print("typed", len(text), "chars")


def cmd_key(a):
    window(a.title)
    for _ in range(a.times):
        k = a.name.lower()
        if k == "shift+tab":
            send(vk=0x10)
            key(0x09)
            send(vk=0x10, flags=KEYUP)
        elif k.startswith("ctrl+"):
            ctrl(ord(k[5:].upper()))
        elif k in VK:
            key(VK[k])
        elif len(k) == 1:
            type_char(a.name)
        else:
            sys.exit(f"unknown key {a.name}")
        time.sleep(0.35)
    print("key", a.name, "x", a.times)


def cmd_shot(a):
    hwnd = window(a.title)
    time.sleep(0.3)
    x, y, w, h = window_rect(hwnd)
    w, h = w - w % 2, h - h % 2
    subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y", "-f", "gdigrab",
                    "-offset_x", str(x), "-offset_y", str(y), "-video_size", f"{w}x{h}", "-i", "desktop",
                    "-frames:v", "1", a.out], check=True)
    print(a.out)


def transcript(config_dir, cwd):
    slug = re.sub(r"[^A-Za-z0-9]", "-", str(Path(cwd).resolve()))
    d = Path(config_dir) / "projects" / slug
    files = sorted(d.glob("*.jsonl"), key=lambda p: p.stat().st_mtime) if d.exists() else []
    return files[-1] if files else None


def last_entry(path):
    lines = path.read_text(encoding="utf-8", errors="replace").strip().splitlines()
    for line in reversed(lines):
        try:
            e = json.loads(line)
        except ValueError:
            continue
        if e.get("type") in ("assistant", "user"):
            return e
    return {}


def cmd_wait(a):
    start, last_change, last_sig = time.time(), time.time(), None
    time.sleep(2)
    while time.time() - start < a.timeout:
        t = transcript(a.config_dir, a.cwd)
        sig = (t, t.stat().st_mtime, t.stat().st_size) if t else None
        if sig != last_sig:
            last_sig, last_change = sig, time.time()
        quiet = time.time() - last_change
        if t and quiet >= a.quiet:
            e = last_entry(t)
            msg = e.get("message", {})
            if e.get("type") == "assistant" and msg.get("stop_reason") == "end_turn":
                print(f"idle after {time.time() - start:.0f}s")
                return
        if quiet >= a.stall:
            print(f"stalled after {time.time() - start:.0f}s (no transcript change for {quiet:.0f}s)")
            return
        time.sleep(1)
    print("timeout")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    o = sub.add_parser("open")
    o.add_argument("--title", required=True)
    o.add_argument("--cwd", required=True)
    o.add_argument("--config-dir")
    o.add_argument("--zoom", type=int, default=4)
    t = sub.add_parser("type")
    t.add_argument("--title", required=True)
    t.add_argument("text")
    t.add_argument("--enter", action="store_true")
    t.add_argument("--cps", type=float, default=22)
    k = sub.add_parser("key")
    k.add_argument("--title", required=True)
    k.add_argument("name")
    k.add_argument("--times", type=int, default=1)
    s = sub.add_parser("shot")
    s.add_argument("--title", required=True)
    s.add_argument("out")
    w = sub.add_parser("wait")
    w.add_argument("--config-dir", required=True)
    w.add_argument("--cwd", required=True)
    w.add_argument("--quiet", type=float, default=8)
    w.add_argument("--stall", type=float, default=30)
    w.add_argument("--timeout", type=float, default=900)
    a = p.parse_args()
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    {"open": cmd_open, "type": cmd_type, "key": cmd_key, "shot": cmd_shot, "wait": cmd_wait}[a.cmd](a)


if __name__ == "__main__":
    main()
