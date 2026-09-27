# Claude Code + Opus 5.5 from zero (tutorial)

| Shot | Visual | Who | Line |
|---|---|---|---|
| **What we're building** | | | |
| s01 | clips/app-desktop.webm | narrator | This focus timer took one paragraph and about six minutes of Claude's time. |
| s01 | clips/app-desktop.webm | narrator | No frameworks, no build step, and it works on a phone. |
| s02 | couch-sprawled__messy-office__2x3.png | kaxo | I wrote the paragraph. That's the hard part. |
| s02 | couch-sprawled__messy-office__2x3.png | narrator | It isn't. But you'll see every step, on Windows, starting from a fresh install. |
| s03 | clips/app-desktop.webm | narrator | You'll install Claude Code, pick Opus 5.5, make it plan before it codes, add features, and fix a real bug. |
| s03 | clips/app-desktop.webm | narrator | We'll even commit it to git, which KAXO has never done in his life. |
| s04 | images/s04.png | narrator | Here's what you need first. A paid Claude plan, Pro or Max, or a Console account with API billing. |
| s04 | images/s04.png | narrator | The free Claude plan doesn't include Claude Code. |
| s04 | images/s04.png | narrator | And on Windows, install Git for Windows too, so Claude can use its bash tools. |
| **Install and log in** | | | |
| s05 | images/s05.png | narrator | Installing is one line. On Windows, paste this into PowerShell. |
| s05 | images/s05.png | narrator | On a Mac or Linux it's a curl command instead. Both are on the official setup page. |
| s06 | clips/c_launch.mp4 | narrator | Check it worked with claude dash dash version. Then open your project folder and type claude. |
| s06 | clips/c_launch.mp4 | narrator | The first time, it asks if you trust this folder. Say yes only for code you actually know. |
| s07 | clips/c_theme.mp4 | narrator | On a brand new install, it asks for a text style first. Dark mode, obviously. |
| s07 | clips/c_theme.mp4 | kaxo | Everything's better in the dark. Especially naps. |
| s08 | clips/c_login.mp4 | narrator | Then the login method. Pick your Claude subscription, and a browser tab opens to sign in. |
| s08 | clips/c_login.mp4 | narrator | Approve it there, and you're back in the terminal, logged in. |
| **Model and modes** | | | |
| s09 | clips/c_model.mp4 | narrator | Type slash model to see the models. Opus 5.5 is the default here, and it's what we'll use. |
| s09 | clips/c_model.mp4 | narrator | Sonnet is lighter and Haiku is the fastest. The arrow keys change the effort level. |
| s10 | clips/c_modes.mp4 | narrator | Now the most useful key in Claude Code: Shift plus Tab. It cycles the permission modes. |
| s10 | clips/c_modes.mp4 | narrator | Auto mode runs safe actions on its own. Manual asks you before anything happens. |
| s10 | clips/c_modes.mp4 | narrator | Accept edits changes files without asking, and plan mode can read and think, but it can't touch a thing. |
| s11 | pointing-at-robot-note-smug__office__3x2.png | kaxo | Plan mode. It's basically me, except it actually writes the plan down. |
| **Plan first** | | | |
| s12 | clips/c_prompt.mp4 | narrator | Here's the whole prompt. A Pomodoro timer with twenty-five minutes of focus and five of break, plus a task list. |
| s12 | clips/c_prompt.mp4 | narrator | Save it in localStorage, give it a dark design that works on a phone, and the key words at the end: plan it first. |
| s13 | clips/c_think.mp4 | narrator | Opus 5.5 looks at the empty folder and thinks for about a minute. This part is sped up. |
| s14 | clips/c_plan.mp4 | narrator | Then you get an actual plan. Three files: index dot html, styles dot css and app dot js. |
| s14 | clips/c_plan.mp4 | narrator | The timer works from the moment it should finish, so it stays right even in a background tab. |
| s14 | clips/c_plan.mp4 | narrator | It even adds a fast mode for testing, where a focus session lasts ten seconds. |
| s14 | clips/c_plan.mp4 | narrator | At the end, it wrote its own test checklist: add tasks, start, pause, reload, and resize to phone width. |
| s14 | clips/c_plan.mp4 | narrator | Read it. If something's off, choose tell Claude what to change. We liked it, so: yes, and use auto mode. |
| s15 | beanbag-stopwatch-robot-typing__office__3x2.png | kaxo | I approved a plan. Management is exhausting. |
| **Claude builds it** | | | |
| s16 | clips/c_write.mp4 | narrator | And now it builds. Every change shows up as a diff, right in the terminal. |
| s16 | clips/c_write.mp4 | narrator | This is three times faster than real life. The whole build took about two minutes. |
| s17 | clips/c_skip.mp4 | narrator | Then a surprise. Claude asked to open Chrome and test the app by itself. |
| s17 | clips/c_skip.mp4 | narrator | That's a great habit, but we were recording, so we told it to skip, and it ran a syntax check instead. |
| s18 | clips/c_summary.mp4 | narrator | Then it wraps up with a summary: what each part does, and how to check it yourself. |
| s19 | clips/app-desktop.webm | narrator | So let's check. Add a few tasks, and pick the one you're working on. |
| s19 | clips/app-desktop.webm | narrator | Press start. In fast mode, the focus session ends in ten seconds. |
| s20 | clips/app-desktop.webm | narrator | The ring fills up, a chime plays, the task gets its tomato, and it switches to a break. |
| s20 | clips/app-desktop.webm | narrator | Reload the page, and everything is still there. |
| s21 | hammock-sleeping-robot-typing__office-night__3x2.png | kaxo | It wrote three files while I blinked. It was a long blink. |
| **Read the code** | | | |
| r01 | clips/v_timer.mp4 | narrator | Before adding anything, open the folder in your editor and look at what it wrote. |
| r01 | clips/v_timer.mp4 | narrator | When you press start, it saves the exact moment the session should end. Time left is that moment minus now. |
| r02 | clips/v_tick.mp4 | narrator | A tick every quarter of a second only redraws the screen and checks if time is up. |
| r02 | clips/v_tick.mp4 | narrator | So if the browser slows the tab down, the clock is still right. |
| r03 | clips/v_load.mp4 | narrator | Loading from localStorage checks every field, so broken saved data can't crash the app. |
| r04 | clips/v_claudemd.mp4 | narrator | You don't have to understand every line. But reading the main parts once is how you catch surprises early. |
| **Add a feature** | | | |
| s22 | clips/c_stats_prompt.mp4 | narrator | Now a second request, in plain English: a stats bar with pomodoros today and focus minutes today, reset at midnight. |
| s23 | clips/c_stats_work.mp4 | narrator | No plan mode this time, because it's a small change. Claude edits all three files. |
| s23 | clips/c_stats_work.mp4 | narrator | This part is twice the real speed. |
| s24 | clips/c_stats_done.mp4 | narrator | And it tells you straight what it didn't test: the midnight reset was never checked in a browser. |
| s24 | clips/c_stats_done.mp4 | narrator | That honesty is useful. Test the parts it says it didn't. |
| s25 | clips/app-desktop.webm | narrator | And there it is at the top: one pomodoro today. |
| **CLAUDE.md and git** | | | |
| s26 | clips/c_init.mp4 | narrator | Next, slash init. Claude reads the project and writes a CLAUDE dot md file. |
| s26 | clips/c_init.mp4 | narrator | It's a short guide: how to run the app, what not to break, and how the code fits together. |
| s26 | clips/c_init.mp4 | narrator | Every new Claude Code session in this folder reads it first. |
| s27 | clips/c_git.mp4 | narrator | The last request: initialize git and commit everything with a clear message. |
| s27 | clips/c_git.mp4 | narrator | One commit, four files, and nothing pushed anywhere without asking. |
| **Session two: ask, fix, undo** | | | |
| t01 | clips/d_ask.mp4 | narrator | Now close it and come back later. A new session starts fresh, but it reads CLAUDE dot md first. |
| t01 | clips/d_ask.mp4 | narrator | Type the at sign to point at a file. We asked how the timer stays accurate in a background tab. |
| t01 | clips/d_ask.mp4 | narrator | It answers with line numbers, and it even admits one limit: the chime can come late while the tab is hidden. |
| t02 | clips/d_review.mp4 | narrator | Next, the most useful prompt for beginners: review the code for real bugs, and fix the most important one. |
| t03 | clips/d_review_done.mp4 | narrator | And it found one. With the app open in two tabs, the older tab's next save wiped out changes from the newer one. |
| t03 | clips/d_review_done.mp4 | narrator | The fix listens for storage changes from other tabs. Seven lines. And again, it tells you it hasn't tried two tabs yet. |
| t04 | pointing-at-robot-note-smug__office__3x2.png | kaxo | A bug I didn't know about, fixed before I knew about it. That's my kind of bug. |
| t05 | clips/d_esc.mp4 | narrator | Now a mistake on purpose. We asked for a whole settings panel: lengths, themes, sounds. |
| t05 | clips/d_esc.mp4 | narrator | Too much. Press Escape, and it stops right away and asks what to do instead. |
| t06 | clips/d_simple.mp4 | narrator | So we narrowed it down: just a fifty ten preset button next to the tabs. |
| t06 | clips/d_simple.mp4 | narrator | It changes the code, updates CLAUDE dot md, and says what it didn't test. |
| t07 | clips/app-preset.webm | narrator | We checked it in the browser. One click, and the focus session is fifty minutes. |
| t08 | clips/d_rewind.mp4 | narrator | And if you don't like a change, press Escape twice. That opens Rewind. |
| t08 | clips/d_rewind.mp4 | narrator | Pick an earlier message, and it restores the code, the conversation, or both. We kept the current version. |
| t09 | clips/d_commit2.mp4 | narrator | One more commit. It split the work into two: the bug fix, and the preset button. |
| **Five tips and the verdict** | | | |
| s28 | images/s28.png | narrator | Five tips from the official best practices. One, give Claude a way to check its own work. |
| s28 | images/s28.png | narrator | Here that was the fast mode and a syntax check. In a bigger project, it's tests. |
| s28 | images/s28.png | narrator | Two, plan first, then code. The plan is where you catch a wrong idea for free. |
| s28 | images/s28.png | narrator | Three, be specific, and point at files with the at sign. Small, clear requests beat one giant wish. |
| s28 | images/s28.png | narrator | Four, keep CLAUDE dot md short. And five, Escape stops it anytime, while Escape twice rewinds. |
| s29 | lying-on-floor-thumbs-up__office-floor__2x3.png | kaxo | My verdict? It planned, built, tested what it could, and committed. |
| s29 | lying-on-floor-thumbs-up__office-floor__2x3.png | kaxo | I pressed Enter. [pause] Ten out of ten, for me. |
| s29 | lying-on-floor-thumbs-up__office-floor__2x3.png | narrator | Next time, Opus 5.5 gets a much bigger project. |
| s30 | clips/app-desktop.webm | - | (end screen, quiet) |
