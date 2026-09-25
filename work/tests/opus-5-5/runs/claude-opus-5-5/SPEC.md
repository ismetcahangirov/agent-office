# Task: KAXO Office Dashboard

You are a developer at KAXO's company. Every employee is an AI agent. Their activity is logged in `events.jsonl`
(one JSON object per line). Build a dashboard page for it.

## Deliverable
A single file `index.html` in this folder. Plain HTML/CSS/JS, **no external libraries, fonts or network requests**.
When served over HTTP from this folder, it must `fetch('events.jsonl')`, parse it and render the stats below.
It must work with any file in the same format (it will be tested with other data too). Ignore blank or invalid lines.

## Event format
`{"t": <epoch ms>, "event": "<SessionStart|UserPromptSubmit|PreToolUse|SubagentStart|SubagentStop|Stop|...>", "session": "<id>", "agentId": <string|null>, "agentType": <string|null>, "tool": "<tool name or empty>", "detail": "<text>"}`

## Required elements (exact ids, text content only, tests read them)
| Selector | Content |
|---|---|
| `#total-events` | number of valid events, e.g. `95` |
| `#tool-calls` | number of events with `event == "PreToolUse"` |
| `#sessions` | number of distinct `session` values |
| `#subagents` | number of events with `event == "SubagentStart"` |
| `#busiest-hour` | the UTC hour with the most events, formatted `HH:00 UTC` (e.g. `07:00 UTC`); on a tie, the earliest hour |
| `#kaxo-productivity` | always `0%` (KAXO is the owner. He does nothing.) |
| `#tools tbody tr` | one row per distinct `tool` among PreToolUse events, with attribute `data-tool="<name>"`, a cell `td.count` containing the count; rows sorted by count descending, ties by tool name ascending |

## Also
- A bar chart of tool usage (canvas or SVG or divs, your choice).
- It will be screenshotted at 1280×720, so make it look good. Dark theme.
- Do not modify `events.jsonl`.
- When you are done, reply with one line: what you built.
