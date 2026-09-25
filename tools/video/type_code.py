"""Types a real source file into VS Code, key by key, optionally recording the window: "the agent writes code" B-roll.

Usage:
  type_code.py <source file> [--name demo.py] [--cps 28] [--record <out.mp4>] [--hold 1.5]

- Opens work/screen/<name> (default: the source's file name) in a new VS Code window. work/screen/.vscode/settings.json
  turns off auto-closing brackets, auto-indent, suggestions and Copilot, so typed text lands exactly as the source.
- Types with real keyboard input (SendInput, unicode), so VS Code scrolls, highlights and shows the cursor naturally.
  The typed code must be real: the builder's actual file from work/ (RULES §5), never invented output.
- Stops if the VS Code window loses focus (someone clicked elsewhere). Do not touch the keyboard/mouse while it runs.
- --record starts record_screen.py on that window and stops it --hold seconds after typing ends.
- At the end saves (Ctrl+S) and checks the saved file equals the source.
"""
import argparse
import ctypes
import ctypes.wintypes as wt
import json
import random
import shutil
import subprocess
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from record_screen import find_window, foreground_title, raise_window  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
SCREEN = ROOT / "work" / "screen"
DEMO_SETTINGS = {
    "editor.autoClosingBrackets": "never", "editor.autoClosingQuotes": "never", "editor.autoClosingComments": "never",
    "editor.autoSurround": "never", "editor.autoIndent": "none", "editor.formatOnType": False,
    "editor.formatOnSave": False, "editor.quickSuggestions": {"other": False, "comments": False, "strings": False},
    "editor.suggestOnTriggerCharacters": False, "editor.acceptSuggestionOnEnter": "off",
    "editor.parameterHints.enabled": False, "editor.inlineSuggest.enabled": False, "editor.linkedEditing": False,
    "html.autoClosingTags": False, "javascript.autoClosingTags": False, "typescript.autoClosingTags": False,
    "github.copilot.enable": {"*": False}, "editor.fontSize": 20, "editor.minimap.enabled": False,
    "extensions.ignoreRecommendations": True, "workbench.tips.enabled": False, "files.insertFinalNewline": False, "files.trimTrailingWhitespace": False, "workbench.startupEditor": "none",
    "workbench.secondarySideBar.defaultVisibility": "hidden", "workbench.auxiliaryBar.visible": False,
    "editor.cursorBlinking": "solid",
}

user32 = ctypes.windll.user32
ULONG_PTR = ctypes.c_size_t


class KEYBDINPUT(ctypes.Structure):
    _fields_ = [("wVk", wt.WORD), ("wScan", wt.WORD), ("dwFlags", wt.DWORD), ("time", wt.DWORD), ("dwExtraInfo", ULONG_PTR)]


class _U(ctypes.Union):
    _fields_ = [("ki", KEYBDINPUT), ("pad", ctypes.c_byte * 32)]


class INPUT(ctypes.Structure):
    _fields_ = [("type", wt.DWORD), ("u", _U)]


KEYUP, UNICODE = 0x2, 0x4


def send(vk=0, scan=0, flags=0):
    i = INPUT(type=1)
    i.u.ki = KEYBDINPUT(vk, scan, flags, 0, 0)
    user32.SendInput(1, ctypes.byref(i), ctypes.sizeof(i))


def key(vk):
    send(vk=vk)
    send(vk=vk, flags=KEYUP)


def type_char(c):
    # surrogate pairs (emoji) are sent as two UTF-16 units
    data = c.encode("utf-16-le")
    for k in range(0, len(data), 2):
        unit = int.from_bytes(data[k:k + 2], "little")
        send(scan=unit, flags=UNICODE)
        send(scan=unit, flags=UNICODE | KEYUP)


def ctrl(vk):
    send(vk=0x11)
    key(vk)
    send(vk=0x11, flags=KEYUP)


def focus_editor():
    # the Alt tap in raise_window can arm the menu bar, and a restored Find widget may hold focus
    key(0x1B)
    key(0x1B)
    ctrl(0x31)  # Ctrl+1: focus the first editor group
    time.sleep(0.3)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("source")
    p.add_argument("--name")
    p.add_argument("--cps", type=float, default=28, help="characters per second")
    p.add_argument("--record")
    p.add_argument("--hold", type=float, default=1.5)
    a = p.parse_args()

    src = Path(a.source).read_text(encoding="utf-8").replace("\r\n", "\n").replace("\t", "    ")
    (SCREEN / ".vscode").mkdir(parents=True, exist_ok=True)
    (SCREEN / ".vscode" / "settings.json").write_text(json.dumps(DEMO_SETTINGS, indent=2), encoding="utf-8")
    target = SCREEN / (a.name or Path(a.source).name)
    target.write_text("", encoding="utf-8")

    code = shutil.which("code") or shutil.which("code.cmd")
    if not code:
        sys.exit("VS Code 'code' command not found in PATH")
    subprocess.run([code, "-n", str(SCREEN), str(target)], check=True)
    title_key = target.name
    for _ in range(60):  # wait for the window with the file open
        try:
            hwnd, _t = find_window(title_key)
            break
        except SystemExit:
            time.sleep(0.5)
    else:
        sys.exit(f"VS Code window with '{title_key}' did not appear")
    user32.ShowWindow(hwnd, 3)  # maximize: bigger code, cleaner frame
    raise_window(hwnd)
    time.sleep(1.5)
    focus_editor()

    rec, stop = None, SCREEN / ".stop-recording"
    if a.record:
        rec = subprocess.Popen([sys.executable, str(Path(__file__).parent / "record_screen.py"), a.record,
                                "--window", title_key, "--stop-file", str(stop), "--seconds", "900", "--no-mouse"])
        time.sleep(1.5)
        focus_editor()  # the recorder raised the window again

    delay = 1 / a.cps
    try:
        for n, line in enumerate(src.split("\n")):
            if title_key.lower() not in foreground_title().lower():
                raise_window(hwnd)
                focus_editor()
                if title_key.lower() not in foreground_title().lower():
                    sys.exit(f"focus lost at line {n + 1}: stopped typing")
            if n:
                key(0x0D)  # Enter (auto-indent is off, indentation is typed below)
                time.sleep(delay * 3)
            indent = len(line) - len(line.lstrip(" "))
            for c in line[:indent]:  # indentation goes fast, like an editor would
                type_char(c)
            time.sleep(delay)
            for c in line[indent:]:
                type_char(c)
                time.sleep(delay * random.uniform(0.5, 1.6))
        ctrl(0x53)  # Ctrl+S
        time.sleep(a.hold)
    finally:
        if rec:
            stop.touch()
            rec.wait(timeout=60)

    typed = target.read_text(encoding="utf-8").replace("\r\n", "\n")
    print("typed OK" if typed == src else f"WARNING: saved file differs from source ({len(typed)} vs {len(src)} chars)")


if __name__ == "__main__":
    main()
