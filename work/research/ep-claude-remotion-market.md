# Bazar araşdırması: "Can Claude make a YouTube video by itself?" (Claude Code + Remotion)

Toplanıb: 2026-09-26. Kəşfiyyatçı. Əvvəlki kontekst: `work/research/gundem-2026-09-26-signals.md`.
Qayda: hər iddianın yanında URL var. (T) = təxmini, (S) = yalnız sosial/ikinci əl, (V) = birinci əl mənbə ilə təsdiqlənib.

---

## 1. Remotion: təsdiqlənmiş faktlar (V)

| Fakt | Mənbə |
|---|---|
| Remotion React ilə proqramlı video yaratmaq üçün framework-dür. Rəsmi izah: "The idea of Remotion is to give you a frame number and a blank canvas, to which you can render anything you want using React." Həmçinin: "A video is a function of images over time." | https://www.remotion.dev/docs/the-fundamentals |
| Son versiya **v4.0.529**, GitHub-da 2026-09-25T08:00:18Z tarixində dərc olunub (HTML-in-canvas motion blur, path interpolation). Əvvəlki versiyalar: v4.0.528 (2026-09-24), v4.0.527 (2026-09-22). npm `latest` = 4.0.529. | https://api.github.com/repos/remotion-dev/remotion/releases?per_page=3, https://registry.npmjs.org/remotion/latest |
| Render prosesi headless Chrome ilə gedir: "Remotion is automatically installing 'Chrome Headless Shell' into your `node_modules` in order to render videos." Əl ilə yükləmək üçün `npx remotion browser ensure` istifadə olunur. | https://www.remotion.dev/docs/miscellaneous/chrome-headless-shell |
| FFmpeg paketin içindədir: "Since Remotion v4.0, Remotion comes bundled with a lightweight version of FFmpeg." və "An installation of FFmpeg is no longer needed." | https://www.remotion.dev/docs/ffmpeg |
| Server tərəfində render `@remotion/renderer` paketi ilə aparılır. CLI və Remotion Lambda da bu paketdən istifadə edir. | https://www.remotion.dev/docs/renderer |

Sadə dillə (video üçün): hər kadr bir React səhifəsidir. Remotion Chrome-u görünməz rejimdə açır, hər kadrın şəklini çəkir, sonra daxili FFmpeg bu şəkilləri MP4-ə yığır.

### 1a. Lisenziya (V), verbatim
Mənbə: https://github.com/remotion-dev/remotion/blob/main/LICENSE.md (raw: https://raw.githubusercontent.com/remotion-dev/remotion/main/LICENSE.md)

> ### Eligibility
> You are eligible to use Remotion for free if you are:
> - an individual
> - a for-profit organization with up to 3 employees
> - a non-profit or not-for-profit organization
> - evaluating whether Remotion is a good fit, and are not yet using it in a commercial way

> "Permission is hereby granted, free of charge, to any person eligible for the "Free License", to use the software non-commercially or commercially for the purpose of creating videos and images and to modify the software to their own liking, ..."

> "It is not allowed to copy or modify Remotion code for the purpose of selling, renting, licensing, relicensing, or sublicensing your own derivate of Remotion."

> "You are required to obtain a Company License to use Remotion if you are not within the group of entities eligible for a Free License."

**Hökm:** KAXO fiziki şəxsdir (sahib), işçi sayı 0-dır. Beləliklə "an individual" və "for-profit organization with up to 3 employees" şərtlərinin ikisinə də düşür. **Pulsuzdur, kommersiya istifadəsi də daxil olmaqla** (monetizasiya olunan YouTube videosu "creating videos" sayılır). Qadağan olan yeganə şey Remotion-un özünü dəyişdirib satmaqdır. Qeyd: AI agentləri lisenziyada "employee" kimi göstərilmir. İşçi sayı insanlara aid şərtdir, bu isə bizim şərhimizdir, Remotion-un rəsmi mövqeyi deyil. Suallar üçün FAQ: https://www.remotion.pro/faq. Şirkət 3 nəfərdən böyüyərsə Company License lazım olacaq: https://www.remotion.pro/license.

### 1b. Remotion-un rəsmi AI / Claude dəstəyi (V)
| Nə | URL | Tarix |
|---|---|---|
| **Agent Skills** rəsmi səhifəsi. Claude Code, Codex, Kimi Code, Cursor adları çəkilir. Quraşdırma: `npx skills add remotion-dev/skills` | https://www.remotion.dev/docs/ai/skills | səhifədə tarix yoxdur |
| **"Prompting videos with coding agents"** rəsmi workflow: `npx create-video --yes --blank my-video` → `npm install` → `npx remotion skills add` → `npm run dev` → ayrı terminalda `claude`. Sitat: "You can create videos just from prompting." | https://www.remotion.dev/docs/ai/coding-agents | tarix yoxdur |
| CLI əmri `npx remotion skills` | https://www.remotion.dev/docs/cli/skills | — |
| Skills repo | https://github.com/remotion-dev/skills | — |
| AI bölməsi (Copy as Markdown, `.md` URL-lər, `Accept: text/markdown`) | https://www.remotion.dev/docs/ai/ | — |
| **llms.txt** mövcuddur. AI bölməsi: `docs/ai/index.md`, `docs/ai/coding-agents.md` | https://www.remotion.dev/llms.txt | — |
| Remotion-un X elanı: "Remotion now has Agent Skills - make videos just with Claude Code! $ npx skills add remotion-dev/skills". X 403 qaytardı, mətn axtarış nəticəsindən götürülüb. Tarix tweet ID-dən hesablanıb: **~2026-01-20 (T)** | https://x.com/Remotion/status/2013626968386765291 | ~2026-01-20 (T) |

Ayrıca "Claude Code" docs səhifəsi və ya MCP server tapılmadı. Dəstək skills + coding-agents səhifəsi + llms.txt vasitəsilə verilir. İkinci əl mənbə skill-in "28 modular rule files"dan ibarət olduğunu yazır (S, yoxlanmadı): https://aividpipeline.com/blog/remotion-agent-skills-guide-2026

---

## 2. "claude remotion" niyə trenddir

### Təsdiqlənmiş (V)
- **Claude Opus 5.5 2026-09-22-də çıxıb.** Anthropic-in elan səhifəsində video, animasiya və ya Remotion haqqında **heç nə yoxdur**, yəni Anthropic-in bu trendlə bağlı rəsmi materialı yoxdur. https://www.anthropic.com/news/claude-opus-5-5
- **HN: "Opus 5.5 is good at explainer videos"**: 412 xal, 217 şərh, müəllif `iacguy`, 2026-09-24 20:28 UTC, objectID 49836374. Link https://launchvideo.io-ya aparır. HN: https://news.ycombinator.com/item?id=49836374 (API: https://hn.algolia.com/api/v1/items/49836374)
  - **Vacib nüans:** LaunchVideo **Remotion istifadə etmir**. Repo (diggerhq/shipvideo, ~148 ulduz) belə işləyir: Opus 5.5 bir HTML sənədi yazır, sonra Playwright headless shell virtual saatla hər kadrı çəkir və ffmpeg ilə kodlayır. Saytın öz iddiaları: "About four minutes and roughly 100k tokens per video", "a URL or a prompt in, an MP4 out. No edits." https://launchvideo.io, https://github.com/diggerhq/shipvideo
  - HN şərhlərinin əsas mövzuları: heyranlıq, "slop" / "animasiyalı slayd" tənqidi, AI videolarının hamısının eyni görünəcəyi, "one-shot, yoxsa cherry-pick?" sualı. Remotion və Motion Canvas "worth less" kontekstində xatırlanır.
- **Danny Stuart, "Agentic video production with Claude Code and Opus"** (2026-09-25): Claude Code + Opus 5.5 + Remotion. Müəllifin sözlərinə görə ilk video ~10 dəqiqəyə hazır olub. Səs effektləri və musiqi əl ilə əlavə edilib. Əsas darboğaz render vaxtıdır (draft render, yarım rezolyusiya, AWS Lambda). https://dannystuart.substack.com/p/claude-code-opus-remotion-agentic-promo-video
- **JohnHeibel/PDoomVideo**: Opus 5.5 musiqi videosu yaradıb. Remotion deyil, p5.js + Chrome + ffmpeg istifadə olunub. Repo iddia edir: "Everything in this repository was generated by the model". https://github.com/JohnHeibel/PDoomVideo
- **Remotion Agent Skills** 2026-01-dən mövcuddur (bax 1b). Opus 5.5 çıxandan sonra "claude remotion" sorğusu bu hazır infrastruktur üzərində partladı.

### Yalnız sosial / ikinci əl (S)
- X trending: "Claude Opus 5.5 Video Captivates with Whimsical AI Animation" (Anthropic-in buraxılış videosu haqqında deyilir). Videonun Remotion ilə edildiyi **təsdiqlənməyib**. https://x.com/i/trending/2102623732250325233
- David Ch (X): "Opus 5.5 one-shots motion videos. Generated this video in 19 minutes, only did 2 changes." https://x.com/chhddavid/status/2102666619029999989
- Opus 5.5-in qiyməti və "Fable 5.1 səviyyəsində, 40% ucuz" iddiası: yalnız axtarış xülasələrində var, Anthropic səhifəsində yoxlanmadı.

**Nəticə:** trend real siqnaldır (HN 412, autocomplete, onlarla YT videosu). Amma "Opus 5.5 videoları" dediyimiz şeylərin bir hissəsi Remotion deyil, xam HTML/JS + headless Chrome + ffmpeg-dir. Videoda bunu dürüst demək olar: "Remotion də, LaunchVideo da eyni fikirdir: brauzerdə kadr çək, ffmpeg-ə ver."

---

## 3. YouTube autocomplete (2026-09-26, `suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=...`)

| Sorğu | Təkliflər (sıra ilə) |
|---|---|
| claude remotion | claude remotion, claude promotion skill, claude remotion video, claude remotion tutorial, claude remotion skills, claude code remote, remotion claude code setup, claude code x remotion, claude x remotion, remotion claude code español |
| remotion | remotion, **remotion ai**, remotion tutorial video, remotion dev, remotion nedir, **remotion claude code**, remotion captions, remotion video, remotion animation, remotion tutorial |
| remotion claude (əlavə) | remotion claude code, remotion claude, remotion claude skill, remotion claude code tutorial, remotion claude code video, remotion claude code skill, remotion claude video, remotion claude tutorial, remotion claude code setup, remotion |
| claude video | claude video, claude video generation, claude video editing, claude video editor, claude video game, claude video ai, video claude monet, video claude code, claude code video editing, claude code video game |
| ai video editor | ai video editor, ai video editor for youtube, ai video editor tutorial, ai video editor app, ai video editor free, ai video editor shotcut ai, ai video editor app free, ai video editor tamil, ai video editor shortcut, ai video editor vidma ai cut |
| claude code video | claude code video generation, claude code video editing, claude code video, claude code video game, claude code video editor, claude code video creation, claude code video resolution, claude code video animation |
| ai makes youtube video | ai making youtube videos, ai makes video, ai create video, ai channels (cəmi 4, zəif sorğu) |
| opus 5.5 | opus 5.5, opus 5.5 test, opus 5.5 roblox, **opus 5.5 motion**, **opus 5.5 video** (dünən "motion" yox idi, yenidir) |
| ai agents | ai agents, ai agents tutorial, ai agents full course, ai agents nedir, ai agents for business, ai agents from scratch, ai agents make money, ai agents and automation course, ai agents a-z, ai agents vizuara |
| claude made (əlavə) | alakəsiz (anime, musiqi). "claude made a video" hələ sorğu deyil |

Dünənki siqnal: `claude` sorğusunda "claude remotion" 2-ci yerdə idi (`gundem-2026-09-26-signals.md`).
Xəbərdarlıq: autocomplete axtarış həcmini göstərmir. Sıra yalnız nisbi populyarlığın proksisidir.

---

## 4. Rəqib videolar: son 1–4 ay (başlıq, kanal)

Opus 5.5 dalğası (2026-09-22-dən sonra, dəqiq tarix/baxış sayı alınmadı, YouTube səhifəsi fetch olunmur):
- "Claude Opus 5.5 Killed Video Editing (For Real This Time)", g russ: https://www.youtube.com/watch?v=EIgXfrdsaew
- "Opus 5.5 Just Changed Video Editing Forever (free skills)", Nate Herk | AI Automation: https://www.youtube.com/watch?v=7jHXoPGnA4c
- "Opus 5.5 Creates Killer Animated Videos & Programatic Video Edits! 🔥", Adrian Viral AI Marketing: https://www.youtube.com/watch?v=YdZh4Y3g3bI
- "Claude Opus 5.5 crée des Vidéos et du Motion Design avec CE PROMPT": https://www.youtube.com/watch?v=O0_7y1w7-bk

Remotion + Claude Code (daha əvvəl, tarixlər axtarış xülasəsindən (T)):
- "Claude + Remotion Just Replaced Video Editing (FREE Download)", ambITious | AI, ~2026-08-23 (T): https://www.youtube.com/watch?v=kSCiz3F5JlA
- "100+ Ways To NEVER EDIT AGAIN With Claude Code (Ultimate Remotion Tutorial)", ~2026-07-22 (T): https://www.youtube.com/watch?v=56lCqhE1uAo
- "Everything Claude Code + Remotion Can Do in 2026 (Full Animation Breakdown)", ~2026-05-30 (T): https://www.youtube.com/watch?v=OX80FZjHJ7o
- "Claude + Remotion Just RETIRED video editors...": https://www.youtube.com/watch?v=oWkUwno6b0E
- "Claude Code + Remotion Just Changed Content Creation Forever": https://www.youtube.com/watch?v=L5zMizSVyNI
- İspan dilində: https://www.youtube.com/watch?v=MdDf3M-YjZk, https://www.youtube.com/watch?v=FWMtuy7IeRM

**Tipik başlıq formulu:** "[Model/alət] Just KILLED/REPLACED/RETIRED video editing" + "(FREE skills/Download)" + "Forever/For Real This Time". Əsas vədlər "redaktor lazım deyil" və "pulsuz"dur. Bu videolar tutorial və ya demo formatındadır.

**Nə çatışmır (bizim boşluğumuz):**
1. **Rəqəm yoxdur.** Heç bir başlıqda və tapılan təsvirdə vaxt, token, prompt sayı, əl ilə edilən düzəliş sayı müqayisə edilmir. Danny Stuart "~10 dəq" deyir, LaunchVideo "~4 dəq, ~100k token" deyir, amma real YouTube kanal pipeline-ı ilə yan-yana test yoxdur.
2. **Tam video yoxdur.** Nümunələr 20–60 saniyəlik promo və ya explainer-dir. "Tam YouTube videosunu (səs, altyazı, thumbnail, upload) özü edə bilərmi?" sualı cavabsızdır.
3. **Dürüst uğursuzluq yoxdur.** HN tənqidi ("slop", "animasiyalı slayd", "hamısı eyni görünür") YT-də demək olar ki, səslənmir.
4. **Real kanal konteksti yoxdur.** Heç kim "bizim adi pipeline-ımız X saat çəkir, Claude+Remotion Y saat" demir. KAXO-nun artıq işləyən pipeline-ı var (`tools/video/`), deməli müqayisəni ancaq biz edə bilərik.

---

## 5. Açar sözlər (5–10) və populyarlıq siqnalları
| # | Açar söz | Siqnal |
|---|---|---|
| 1 | claude remotion | `claude` autocomplete-də #2 (2026-09-26); öz sorğusunda 10 təklif |
| 2 | remotion claude code | `remotion claude`-da #1, `remotion`-da #6 |
| 3 | claude code video editing / claude video editing | `claude video`-da #3 və #9, `claude code video`-da #2 |
| 4 | claude video generation / claude code video generation | `claude video`-da #2, `claude code video`-da #1 |
| 5 | opus 5.5 video / opus 5.5 motion | `opus 5.5`-də #4–5 ("motion" yenidir) |
| 6 | claude remotion tutorial / skills | `claude remotion`-da #4–5 |
| 7 | remotion ai | `remotion`-da #2 |
| 8 | ai video editor for youtube | `ai video editor`-da #2 (geniş, rəqabətli) |
| 9 | ai making youtube videos | tək təklif, zəif, amma başlıq dilinə uyğundur |
| 10 | ai agents (make money / for business) | geniş, KAXO-nun "AI şirkəti" konsepti üçün təsvir və teq |

---

## 6. Hook nümunələri (3)
1. **Rəqəm hook:** "Our normal video took X hours. Today, Claude builds one alone with Remotion. Same topic, same channel. Let's count every minute and every token." (X faktiki ölçüləcək, uydurulmayacaq)
2. **Dürüst skeptik hook:** "Everyone says Claude just killed video editing. Hacker News calls it animated slides. I gave it one prompt and zero help. Here's what actually came out."
3. **KAXO hook:** "I'm a cactus. I own a company with zero employees. Today my AI workers try to make this entire video without me. If it's bad, you'll see it."

---

## 7. Qısa tövsiyə (başlıq istiqaməti, qərar CEO/sahibindir)
- EN: "Can Claude Make a YouTube Video by Itself? (Remotion Real Test)" / "Claude + Remotion vs Our Real Pipeline: Honest Numbers"
- Başlığa və ya təsvirə "claude remotion" və "claude code" mütləq daxil olsun.
- Rəqiblərdən fərq: "killed editing" yox, **"ölçdük"**.
