# Şirkət faktları: epizod 2026-09-26-claude-remotion ("Can Claude make a YouTube video by itself?")

Kəşfiyyatçı, 2026-09-26. Bütün faktlar layihə fayllarındandır, mənbə hər sətirdə göstərilib.
Vaxtlar Asia/Baku (UTC+4). Epoch → yerli vaxt çevirməsi `data/events.jsonl` sətir 1-in (1790279589 = 2026-09-24 23:53:09, `content/reports/2026-09-25-day-one.md`) əsasında hesablanıb.
"~" ilə işarələnənlər əl ilə sayılmış və ya təxmini rəqəmlərdir.

## 1. Boru xətti (pipeline) nədir və neçə addımdır

| Fakt | Mənbə |
|---|---|
| `/video` skill-i **10 addımdır**: hazırlıq → statistika → araşdırma → ssenari → şəkillər (ChatGPT) → B-roll → səs/altyazı/montaj → SEO+thumbnail → sahibin təsdiqi → paylaşma+hesabat+təmizlik | `.claude/skills/video/SKILL.md` (başlıqlar "## 1/10" … "## 10/10") |
| Epizodun statusu **11 mərhələdən** keçir: research → script → images → broll → audio → video → seo → review → approved → published → done | `.claude/skills/video/SKILL.md` sətir 55 |
| Skill-in "Səhv hallar" cədvəlində **11 məlum xəta** və həlli var (Kokoro import, ffmpeg, ChatGPT selektoru, YouTube forması, VS Code fokus və s.) | `.claude/skills/video/SKILL.md`, "Səhv hallar" |
| `tools/video/` altında **14 skript** (Python + Node), cəmi **~1 280 boş olmayan sətir** kod | `tools/video/*.py`, `*.js` (Grep count) |
| Ən böyükləri: `tts.py` 193, `assemble.py` 161, `record_screen.py` 149, `type_code.py` 138, `stock.py` 136 sətir | eyni |
| Alətlər: Kokoro (lokal TTS, CPU, pulsuz), ffmpeg montaj, headless Chromium ilə səhifə/ofis yazısı, VS Code-a hərf-hərf kod yazan robot, Pexels/Pixabay stock, rembg ilə fon silmə, HTML ilə thumbnail | skriptlərin docstring-ləri (`tts.py:1`, `assemble.py:1`, `record_page.js:1`, `type_code.py:1`, `stock.py:1`, `cutout.py:1`, `thumbnail.js:1`) |
| Şəkillər API ilə yox, **ChatGPT saytında brauzerlə** (Claude in Chrome) çəkilir: prompt JS ilə yazılır, şəkil endirilir, `take_download.py` ilə epizoda köçürülür | `SKILL.md` "5/10" |
| KAXO-nun səsi: Kokoro `bm_fable`, KAXO speed 0.98, diktor 1.08; sahib "çox fasilə var" deyə **iki dəfə** narazı qaldığı üçün hər cümlə ayrıca sintez edilib kəsilir | `tools/video/tts.py:31-37` |
| Thumbnail-də mətn heç vaxt AI ilə çəkilmir: "text is real type, never AI-drawn" | `tools/video/thumbnail.js:1` |
| Sahibin təsdiqi olmadan paylaşma yoxdur; YouTube-a yükləmə də brauzerlə olur | `SKILL.md` "9/10", "10/10"; `CLAUDE.md` |

Ssenari üçün: *"Our pipeline is 10 steps, 14 scripts, about 1,300 lines of code. All written by the agents. No human editor."* (son cümlə üçün qeyd: kodu agentlər yazıb, amma sahib hər videonu təsdiqləyir, faylı sürükləyir, hesablara daxil olur. Bax §5.)

## 2. Keçmiş epizodlar: rəqəmlər

| Epizod | Format | Səs müddəti | Shot sayı | Söz | Yeni AI şəkil | Fayl sayı | Status | Mənbə |
|---|---|---|---|---|---|---|---|---|
| 2026-09-25-day-one | short | 36.45 s (ilk variant 45.8 s) | 8 | 103 | 6 (ChatGPT) | 23 | **paylaşılmadı** | `audio/timeline.json` "duration"; `episode.json`; hesabat |
| 2026-09-25-opus-5-5-test | long | 392.31 s (6:32) | 68 | 1 154 | 10 (ChatGPT) + 6 poza | 61 | dərc olundu, sonra yenidən yükləndi | `audio/timeline.json:7442`; `episode.json`; hesabat |
| 2026-09-25-opus-short | short (9:16) | 37.69 s | 10 | 112 (hesabatda ~117) | 1 (s09, 2:3) | 20 | dərc olundu | `audio/timeline.json:754`; hesabat |

Opus long-un 68 kadrının tərkibi (`content/episodes/2026-09-25-opus-5-5-test/episode.json`, Grep):
- **44 kadr video klipdir**: ofis, ekran yazısı, VS Code, qrafiklər, stock;
- **10 kadr ChatGPT-də yaradılan yeni şəkildir** (`"prompt"`);
- **14 kadr hazır asset-dir**: poza kitabxanası və Anthropic səhifəsinin screenshot-ları.
- Klip faylları: `race.webm`, `bill.webm`, `tests.webm` (qrafiklər), `dash-opus-5*.webm` (dashboard-lar), `code-opus-5*.mp4` (VS Code-da kodun yazılışı), `office-qa-live.webm` (canlı ofis), 3 Pexels stock klip (~12%).

Mənbə: `content/reports/2026-09-25-opus-5-5-test.md` "İstehsal qeydləri".

Opus long-un səsi: **TTS ~35 dəqiqə** çəkib (int8, CPU). Sükut 8.0%, ən uzun fasilə 0.57 s olub, limit isə 0.35 s idi. Yenidən sintez 30+ dəqiqə aparacağı üçün bu nəticə qəbul edilib. Mənbə: eyni hesabat. Log da bunu təsdiqləyir: TTS 15:17:14-də başlayıb (`events.jsonl` sətir 340), "voiceover finished" yoxlaması 15:56 civarındadır (sətir 409–411), yəni **~39 dəqiqə**.

## 3. Epizod 2-nin (Opus 5.5) istehsalı: `data/events.jsonl` əsasında

Sessiya `1a08fb01`, sətirlər 93–869. Qeyd: bu sessiyanın `SessionStart` hadisəsi logda yoxdur. Log 2026-09-25 14:31:49-da (sətir 93) başlayır, ona görə ondan əvvəlki hissə sayılmayıb.

| Fakt | Rəqəm | Mənbə |
|---|---|---|
| Sessiyadakı hadisə sayı | **778** | Grep count `1a08fb01` |
| Alət çağırışı (PreToolUse), long + kanal brendinqi + TR lokalizasiya + short | **643** | Grep count |
| Bunlardan brauzer (Claude in Chrome) çağırışı | **331 (51%)** | Grep count `mcp__claude-in-chrome__` |
| Uğursuz alət çağırışı (PostToolUseFailure) | **41**, bunların **29**-u brauzerdədir | Grep count |
| "Timed out" xətası (səhifə cavab vermir, CDP timeout) | **10** | Grep count `timed out` |
| Subagent alət çağırışları | **85**: Kəşfiyyatçı 15 (SEO) + 15 (Jev), QA 15, Marketoloq 16 (long ssenari) + 10 (TR altyazı) + 14 (short ssenari) | sətir 105–769, əl ilə sayılıb |
| CEO-nun öz alət çağırışları | **~557** (643 − 85 − 1) | hesablama |
| Sahibin sessiyada yazdığı mesaj | **14** ("browserde yeniden yoxla", "SURUSDURDUM", "davam" və s.) | UserPromptSubmit sətirləri 343–866 |
| Real test başladı | 14:31:49 | sətir 93 |
| ChatGPT-də şəkillər | 14:54:47 → ~15:43 (≈ 50 dəq, 10 şəkil) | sətir 233 → 369 |
| Sahibə ilk baxış (AskUserQuestion) | 16:31:28 | sətir 458 |
| İlk Public dərc | ~17:29 | sətir 562 ("Video Public dərc olundu") |
| Sahib səs itkisini gördü | 17:38:41, yəni **dərcdən ~9 dəq sonra** | sətir 606: "ve bele bir problem var videonda bezi hisselerde ses itir" |
| Düzəldilmiş video yenidən dərc olundu | ~18:29 | sətir 737 (https://youtu.be/3RbuOZYm-ck) |
| Short: "davam" → dərc | 18:36:48 → 19:06:35 (**~30 dəq**, ~111 alət çağırışı) | sətir 739 → 864 |
| Long: testin başlanğıcından ilk dərcə qədər | **~3 saat**; yenidən yükləməyə qədər ~4 saat | sətir 93 → 562 → 737 |

Ssenari üçün: *"Episode 2 took about 3 hours and 643 tool calls. Half of them were just clicking around a browser. 41 failed."*

### Test özü (videonun mövzusu idi)
- Opus 5: 265 s, 31 addım, $1.45 API-ekvivalent.
- Opus 5.5: 53 s, 5 addım, $0.27.
- Hər ikisi gizli testlərdən 18/18 keçib.
- Mənbə: `content/reports/2026-09-25-opus-5-5-test.md`.

## 4. Nə qırıldı (real istehsal problemləri)

1. **Səs boşluqları.**
   - Nə oldu: 392 s-lik videoda AAC səs axını cəmi 351 s idi. Log belə yazır: `len final 351.15 voice 392.31` (`events.jsonl` sətir 615).
   - Səbəb: `assemble.py` səsi altyazı filtri ilə eyni `filter_complex`-də emal edirdi.
   - Düzəliş: səs ayrıca addımda emal olunur və uzunluq yoxlanılır. `assemble.py:140-146` indi `audio ok: X of Y` çap edir, səs qısadırsa `audio stream too short` xətası verir.
   - Nəticə: ilk yükləmə (youtu.be/kehg3FSoxAY) Private edildi, video yenidən yükləndi.
   - Mənbə: `content/reports/2026-09-25-opus-5-5-test.md`, `content/published.md`.
2. **Chrome dondu, çünki "səs aktyoru" bütün CPU-nu tutmuşdu.**
   - Kokoro TTS paralel işləyirdi, ChatGPT tab-ı isə "Script injection timed out… the page is busy" xətası verirdi.
   - Bu xəta logda bir neçə dəfə təkrarlanır: sətirlər 276, 310, 320, 327, 336, 339.
   - Donma zamanı s13 promptu iki dəfə göndərildi, 1 generasiya boşa getdi.
   - Mənbə: hesabat; `SKILL.md` "5/10"; memory `lesson-cpu-contention-browser.md`.
3. **Anthropic saytı scroll-u "oğurlayırdı" (scroll-jacking).**
   - Scroll klipi ilişmiş görünürdü, bunu sahib gördü (sətir 610).
   - Klip sabit bölmə screenshot-ları ilə əvəz olundu.
   - Mənbə: hesabat; `record_page.js:7` (`--wheel`).
4. **Dashboard yazısında DSF səhvi** oldu: kadrın bir hissəsi boz qaldı. VS Code yazısında da köhnə bufer səhvi çıxdı (sətir 212: `Exit code 1`, ardınca "Retry typing with focus diagnostics"). Mənbə: hesabat, `events.jsonl` 212–216.
5. **Fayl yükləmə limiti.**
   - Agentin `file_upload` aləti 10 MB-dan böyük faylı qəbul etmir, `final.mp4` isə 154 MB idi.
   - CEO: "Limit təsdiqləndi, 154 MB-lıq fayl alətdən keçmir. Bu addımı yalnız siz edə bilərsiniz" (sətir 499).
   - Mənbə: `SKILL.md` "10/10".
6. **ChatGPT limitləri (epizod 1 və 2).**
   - Free hesabdır. 4–5 endirmədən sonra Chrome endirmələri bloklayır.
   - 7–8 böyük şəkildən sonra söhbət ağırlaşır, yeni söhbət açmaq lazım gəlir.
   - `javascript_tool` 45 s-də timeout olur (logda 2 dəfə: sətir 305, 307).
   - Mənbə: `SKILL.md` "5/10", hesabatlar.
7. **Short-da:** EN altyazı "empty" xətası verdi, çünki redaktor tam yüklənmədən Done basılmışdı. `Esc` yükləmə dialoqunu bağladı. Mənbə: `content/reports/2026-09-25-opus-short.md`.
8. **Epizod 1-in səsi:** 45.8 s-in 14 s-i sükut idi. Kokoro hər cümlədən sonra ~0.6 s küy quyruğu buraxırdı. Düzəlişdən sonra eyni mətn 36.5 s oldu, sükut 3.15 s-ə düşdü. Mənbə: `content/reports/2026-09-25-day-one.md`.

## 5. Absurd və gülməli real anlar (ssenari üçün)

1. **"SURUSDURDUM" ("sürüşdürdüm").**
   - Tam avtomatik AI video şirkətində videonu YouTube-a sonda insan əli ilə sürükləyib.
   - 154 MB fayl agentin 10 MB-lıq yükləmə alətindən keçmədi, sahib faylı özü sürüklədi və sonra bir sözlə xəbər verdi.
   - Mənbə: `events.jsonl` sətir 499 (CEO: "Bu addımı yalnız siz edə bilərsiniz"), sətir 501 (sahib: "SURUSDURDUM").
2. **Səs aktyoru rəssamı boğdu.**
   - Şirkətin öz TTS-i bütün CPU-nu yedi, ChatGPT tab-ı dondu və "page is busy" xətası verdi.
   - Donma zamanı eyni şəkil iki dəfə sifariş edildi.
   - Mənbə: hesabat, `events.jsonl` 271–339.
3. **Səssiz video 9 dəqiqə yaşadı.**
   - Agentlər videonu Public dərc etdi (~17:29).
   - Sahib 17:38-də yazdı: "bezi hisselerde ses itir" ("bəzi hissələrdə səs itir").
   - Səbəb: 392 saniyəlik videonun cəmi 351 saniyəlik səsi var idi.
   - Mənbə: `events.jsonl` 562, 606, 615.
4. **İlk işçi şirkətin nə etdiyini öz vəzifə təsvirini oxuyaraq öyrəndi.**
   - Kəşfiyyatçı `researcher.md` faylını oxudu (2026-09-24 23:53:29).
   - Mənbə: `events.jsonl` sətir 10; `content/reports/2026-09-25-day-one.md`.
5. **Xəbər komandası 13 dəfə internetə çıxmağa cəhd etdi və 13 dəfə bloklandı.**
   - CEO xəbər uydurmaqdan imtina etdi: "anything … would be invented".
   - Mənbə: `events.jsonl` 17–92; `content/reports/2026-09-25-day-one.md`.
6. **Olmayan faylı yükləmə cəhdi.**
   - Agent `reference.jpg`-ni yükləməyə çalışdı, fayl əslində `.png` idi və sənədlərdə köhnə ad qalmışdı.
   - Sonra faylı kopyalamağa cəhd etdi: `cp: cannot stat`.
   - Scratchpad-dakı nüsxəni də brauzer rədd etdi.
   - Üç uğursuzluq cəmi 13 saniyə ərzində baş verdi.
   - Mənbə: `events.jsonl` 239, 241, 243 və 452 ("Fix stale reference.jpg paths in docs").
7. **Opus 5 arxasını yığışdıra bilmədi.** Qovluqda `_verify.js`, `_shot.png`, `_t/` qaralamaları qaldı, çünki silmə icazəsi yox idi. Mənbə: `content/reports/2026-09-25-opus-5-5-test.md`.
8. **Sahib kanalın ilk videosunu rədd etdi:** "tanıtım videosu kimi olub". Mənbə: `content/reports/2026-09-25-day-one.md`.
9. **"Təzə xəbər" 10 gün köhnə çıxdı.** Jev news flash ləğv edildi: Jev 2026-09-15-də çıxıbmış, gündəmdə isə tarix səhvi var idi. Mənbə: `content/reports/2026-09-25-opus-short.md`; `events.jsonl` 598.
10. **Limit.** 16:52-də sessiyaya "Your claude.ai usage limit has reset. Continue the task…" mesajı gəldi. Bu, işin subscription limitinə dirəndiyini göstərir. Limitin nə vaxt dolduğu logda görünmür. Mənbə: `events.jsonl` 493.

## 6. Paylaşılanlar (`content/published.md`)
- 2026-09-25, long 6:33: "Claude Opus 5.5 vs Opus 5: Same Job, Real Bill".
  - Link: https://youtu.be/3RbuOZYm-ck.
  - İlk yükləmə (https://youtu.be/kehg3FSoxAY) səs boşluqlarına görə Private edildi.
  - Türkcə başlıq və altyazı var.
- 2026-09-25, short 0:38: "Opus 5.5 Did the Same Job for 27 Cents #shorts".
  - Link: https://youtube.com/shorts/voAHRbTb1zw.
  - Dillər: EN + TR.
- Kanal: @kaxocompany, 2026-09-25-də yaradılıb. 3 playlist var.
- Statistika hələ yığılmayıb, "Son statistika" sütunu "—"dur.

## 7. Dürüstlük qeydləri (ssenaridə iddia etməmək)
- "Tam özü etdi" demək olmaz. İnsan bu işləri görüb:
  - ChatGPT və YouTube hesablarına daxil oldu;
  - telefonla kanal təsdiqini (verify) keçdi;
  - 154 MB faylı sürüklədi;
  - hər videonu təsdiqlədi;
  - səs itkisini tapdı.
  - Mənbələr: `events.jsonl` 501, 563, 606; `SKILL.md` "9/10", "10/10".
- 643 alət çağırışı logun 14:31-dən sonrakı hissəsidir. Sessiyanın əvvəli logda yoxdur.
- $ xərci: test API-ekvivalentdir, subscription ilə işləyib, real ödəniş olmayıb (hesabat). ChatGPT Free hesabdır, Kokoro, Pexels və Pixabay pulsuzdur. İstehsalın ümumi $ xərci heç yerdə ölçülməyib, ona görə rəqəm demə.
- Kodu "agentlər yazıb" iddiası: `tools/video/` skriptlərinin müəllifini git log ilə yoxlamadım. Commit müəllifi `ismatjahangirov`-dur (repo git user), amma iş Claude sessiyalarında görülüb. Ssenaridə "written in Claude Code sessions" demək daha dəqiqdir.
