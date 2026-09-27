# Focus Timer — Plan

## Context
`C:\kaxo-demo\focus-timer` is empty. You want a Pomodoro-style Focus Timer built with only HTML, CSS and JavaScript: no frameworks and no build step. It has a 25-minute focus timer and a 5-minute break timer with Start, Pause and Reset. It has a task list where you add tasks, pick the one you're working on, and see how many pomodoros each task has finished. Everything is saved in localStorage. The design is dark and modern and works on a phone. You open it by double-clicking `index.html`.

## Files
- `index.html`: the page structure, which links to the other two files.
- `styles.css`: the dark theme, layout and responsive rules.
- `app.js`: the state, timer logic, storage and rendering. It is one plain script, so it also works from `file://`.

## Data and storage (`app.js`)
One state object is saved under the localStorage key `focusTimer.v1`:
```js
{
  mode: 'focus' | 'break',
  status: 'idle' | 'running' | 'paused',
  remainingMs,          // valid when idle/paused
  endAt,                // timestamp, valid when running
  tasks: [{ id, title, pomodoros, createdAt }],
  activeTaskId: string | null
}
```
- `load()` and `save()` are wrapped in try/catch. If the data is missing or corrupt, the app falls back to the defaults.
- The app saves after every change to state. It does not save on every tick.

## Timer logic
- The timer stores the time it should end (`endAt`) instead of counting down second by second. Each tick works out `remaining = endAt - Date.now()`. This keeps the timer accurate when the tab is in the background, when the phone locks, and after a reload.
- A tick runs `setInterval` every 250 ms and updates the display only when the whole second changes.
- **Start**: sets `endAt = now + remainingMs` and `status = running`.
- **Pause**: saves `remainingMs` and sets `status = paused`.
- **Reset**: sets the current mode back to its full length and `status = idle`.
- **Focus/Break tabs**: switch modes manually. Switching resets the timer.
- **When a session finishes**:
  - After a focus session, the active task's `pomodoros` goes up by 1 (if a task is selected), and the app switches to Break.
  - After a break, the app switches back to Focus.
  - The next session does not start by itself. You press Start.
  - A short chime plays using the Web Audio API, so no audio file is needed.
- **Reload while running**: if `endAt` has already passed, the app finishes that session once (and counts the pomodoro) during load.
- The browser tab title shows the countdown, e.g. `18:42 · Focus`.
- **Testing shortcut**: `?fast` in the URL shortens the durations to 10 s and 5 s. It is only used for manual testing.

## UI (`index.html` + `styles.css`)
- **Layout**: a single centered column, `max-width: 480px`, with 16px padding on the sides and no horizontal scrolling.
- **Header**: the app name.
- **Mode tabs**: Focus and Break, shown as a segmented control.
- **Timer card**: an SVG progress ring with a large `MM:SS` display (tabular numbers). Below it is the name of the current task, or "No task selected". Then comes a large Start/Pause button and a Reset button.
- **Task list**:
  - An add form: a text input plus an Add button. Pressing Enter submits, and empty titles are ignored.
  - In each row, tapping selects the task as active. The row shows the title, a 🍅 count badge, and a delete (×) button.
  - The active task is highlighted with an accent border.
  - When the list is empty, a message says so.
- **Theme**:
  - Colors are CSS custom properties on `:root`: a near-black background, raised surface cards and soft text colors.
  - The accent color depends on the mode: coral/red for Focus and teal for Break. It is set with a `data-mode` attribute on `<body>`.
  - The font is a system font stack.
  - Tap targets are at least 44px, with visible `:focus-visible` rings.
- **Keyboard**: Space starts or pauses the timer, except when you are typing in the input.
- **Safety**: task titles are rendered with `textContent`, not `innerHTML`.

## Verification
1. Open `index.html?fast` in Chrome using the claude-in-chrome tools.
2. Add two tasks, select one, press Start, and let the 10 s focus session run to the end. Check that:
   - the count goes to 🍅 1,
   - the app switches to Break,
   - the chime plays.
3. Pause partway through, then reload. The time should stay paused at the same value.
4. Start, then reload while running. The countdown should keep going with the correct time.
5. Reset, switch tabs, and delete a task. Check that the active task is cleared when it is deleted.
6. Resize to 375px wide. There should be no horizontal scroll and the layout should still be usable.
7. Check the console for errors.
