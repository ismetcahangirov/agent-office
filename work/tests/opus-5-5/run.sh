#!/usr/bin/env bash
# Runs the same task on one model, headless, in its own folder. Usage: bash run.sh <model id>
# Output: runs/<model>/ (the model's work), runs/<model>.json (claude result: time, turns, tokens, cost), runs/<model>.wall
set -u
here="$(cd "$(dirname "$0")" && pwd)"
m="$1"
out="$here/runs/$m"
rm -rf "$out" && mkdir -p "$out" && cp "$here/task/SPEC.md" "$here/task/events.jsonl" "$out/"
cd "$out"
start=$(date +%s)
claude -p "Read SPEC.md in this folder and complete the task. Work only inside this folder." --model "$m" --output-format json --setting-sources project,local \
  --allowedTools "Read,Write,Edit,Glob,Grep,Bash(node:*),Bash(python:*),Bash(ls:*),Bash(cat:*)" \
  < /dev/null > "$here/runs/$m.json" 2> "$here/runs/$m.err"
echo $(( $(date +%s) - start )) > "$here/runs/$m.wall"
echo "done $m in $(cat "$here/runs/$m.wall")s"
