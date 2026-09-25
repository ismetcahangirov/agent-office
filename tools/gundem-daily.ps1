# Daily AI news scan for the KAXO channel (runs the /gundem skill headless).
# Registered in Windows Task Scheduler as "KAXO Gundem" (tools/register-gundem-task.ps1).
# Only research + writing news/ideas files is allowed: no Bash, no publishing, no deleting.
$ErrorActionPreference = 'Continue'
# claude prints UTF-8; without this the log turns Azerbaijani letters into mojibake
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$project = Split-Path -Parent $PSScriptRoot
Set-Location $project

$today = Get-Date -Format 'yyyy-MM-dd'
$logDir = Join-Path $project 'data\gundem-logs'
New-Item -ItemType Directory -Force $logDir | Out-Null
$log = Join-Path $logDir "$today.log"

# already done today (the task may fire again after sleep/wake)
if (Test-Path (Join-Path $project "content\news\$today.md")) {
    "[$(Get-Date -Format s)] content/news/$today.md already exists, skipping" | Out-File -Append -Encoding utf8 $log
    exit 0
}

$prompt = @"
This is the unattended daily news run. Execute every step of .claude/skills/gundem/SKILL.md for the last 72 hours.
Headless rules: do not ask the owner anything and do not use AskUserQuestion; make reasonable choices yourself.
Write the digest to content/news/$today.md and update the Gundem section of content/ideas.md exactly as the skill says.
Do not publish, record, render or delete anything outside content/news/ and content/ideas.md.
Finish with a 5-line summary in Azerbaijani: top news and the recommended next video.
"@

"[$(Get-Date -Format s)] start" | Out-File -Append -Encoding utf8 $log
$claude = Join-Path $env:APPDATA 'npm\claude.cmd'
& $claude -p $prompt --allowedTools "Read,Glob,Grep,WebSearch,WebFetch,Write,Edit,Agent,Skill,TodoWrite" 2>&1 |
    Out-File -Append -Encoding utf8 $log
"[$(Get-Date -Format s)] exit $LASTEXITCODE" | Out-File -Append -Encoding utf8 $log
# exit code 0 does not mean a digest was written (e.g. web access denied): say so plainly
if (Test-Path (Join-Path $project "content\news\$today.md")) {
    "[$(Get-Date -Format s)] OK: content/news/$today.md written" | Out-File -Append -Encoding utf8 $log
} else {
    "[$(Get-Date -Format s)] FAILED: no digest written, read the output above" | Out-File -Append -Encoding utf8 $log
}

# keep the last 30 logs
Get-ChildItem $logDir -Filter *.log | Sort-Object Name -Descending | Select-Object -Skip 30 | Remove-Item -Force
