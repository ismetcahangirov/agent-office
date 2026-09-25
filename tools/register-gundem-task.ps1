# Registers (or updates) the daily "KAXO Gundem" task for the current user. No admin needed.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File tools\register-gundem-task.ps1 [-Time 09:00]
# Remove: Unregister-ScheduledTask -TaskName 'KAXO Gundem' -Confirm:$false
param([string]$Time = '09:00')

$script = Join-Path $PSScriptRoot 'gundem-daily.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$script`"" `
    -WorkingDirectory (Split-Path -Parent $PSScriptRoot)
$trigger = New-ScheduledTaskTrigger -Daily -At $Time
# StartWhenAvailable: if the laptop was asleep/off at $Time, run as soon as it is back
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Hours 1) `
    -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -RunOnlyIfNetworkAvailable -MultipleInstances IgnoreNew
Register-ScheduledTask -TaskName 'KAXO Gundem' -Description 'Daily AI news scan for the KAXO channel (agent-office /gundem)' `
    -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null
Get-ScheduledTask -TaskName 'KAXO Gundem' | Get-ScheduledTaskInfo | Select-Object TaskName, NextRunTime
