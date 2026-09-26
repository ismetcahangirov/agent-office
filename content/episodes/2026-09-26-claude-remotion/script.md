# Claude + Remotion remade our video. A blind judge picked a winner (long, 16:9)

**Söz sayı:** ~1298 danışılan söz (`[pause]` sayılmır, əl ilə sayılıb). **Təxmini müddət:** 1298 / 2.9 ≈ 448 s ≈ **7:28** (KAXO-nun yavaş sətirləri ilə ~7:35).
**Kadr:** 72 shot, orta ~6.2 s. 20 KAXO kadrı (12 yeni + 8 poza = **40% poza**), 52 real klip/qrafik (ofis 11, v1 5, v2 10, ours 6, VS Code 5, HN 3, Remotion docs 3, g-time 3, g-rounds 3, g-score 3). Stock yoxdur.
**Punchline:** s61, ~81% ("So I'm firing my video editor. [pause] Which is also Claude."). Son cümlə ("That's what the judge is for.") hook-a qayıdır: "Our own video just lost to a Claude remake. A blind judge watched both..."

**İdeya:** "claude remotion" trenddədir, HN isə bunu "animated slides" adlandırır. KAXO-nun şirkəti videonu adətən uzun pipeline ilə yığır (10 addım, 14 skript, brauzerdə ChatGPT, Kokoro; epizod 2 ~3 saat). Test: Claude builder agenti artıq paylaşılmış 38 saniyəlik Opus short-unu eyni ssenari, səs və şəkillərlə Remotion-da kodla yenidən yığır. Raund 1 (bir prompt) işləyir, amma boş hook, KAXO-ya düşən etiket, boş kadr. Raund 2 (sahibin 6 qeydi) hamısını düzəldir, Claude öz bug-unu (ISUPERVISE) tapır. Kor QA Remotion-a 55, bizə 49 verir və bizim paylaşılmış short-da heç kimin görmədiyi ağ ekranı tapır. Bizimki yalnız real görüntüdə qalib gəlir. Hökm: KAXO heç kimi qovmur, ikisini saxlayır, çünki qovmaq zəhmətdir.
**Real fakt:** `content/reports/2026-09-26-claude-remotion.md`, `work/tests/claude-remotion/log.md`, `work/tests/claude-remotion/qa-blind.md`, `work/research/ep-claude-remotion-company.md`, `work/research/ep-claude-remotion-market.md`.

## Başlıq variantları (≤ 60 simvol, açar söz ilk 40 simvolda)
1. `Claude + Remotion Remade Our Video. Ours Lost.` (46)
2. `Claude Remotion vs Our AI Pipeline: Blind Test` (46)
3. `We Let Claude Remake Our Video With Remotion` (44)

Üçü də videoda olanı vəd edir (remake, kor test, bizimki uduzdu). "KAXO" və "my company" başlıqda yoxdur.

## Kadrlar

| Shot | Fəsil | Vizual | Səs | Mətn |
|---|---|---|---|---|
| s01 | Our video lost to a remake | YENİ: kiçik kinozal, iki köhnə TV, gözü bağlı robot-hakim, arxada KAXO şübhə ilə | narrator / kaxo (0.9) | Our own video just lost to a Claude remake. / Lost. To a remake. Of my own video. |
| s02 | ″ | klip `ours.mp4` @10 (blur) | narrator | A blind judge watched both, without knowing which was ours. / Ours came out of our usual AI pipeline, already published. |
| s03 | ″ | klip `v2.mp4` @1 (blur) | narrator | Claude rebuilt it in code, with Remotion, in about twenty minutes. |
| s04 | ″ | POZA `couch-sprawled` | narrator / kaxo (0.88) | And the judge found a flaw in ours that nobody had noticed. / A flaw. In my video. I'm shocked. Mildly. |
| s05 | ″ | ofis `office.webm` @0 | narrator / kaxo | You'll see the scores, the mistakes, and what Claude still can't do. / Also, somebody's getting fired. Probably. If it's not much effort. |
| s06 | ″ | YENİ: KAXO divanda arxası üstə, telefonun işığı üzündə | narrator / kaxo | Type claude into YouTube search this week. / The second suggestion is claude remotion. / I type naps. Different results. |
| s07 | ″ | ekran `hn.webm` @0 | narrator | On Hacker News, one post hit four hundred and twelve points. / Its title: Opus 5.5 is good at explainer videos. |
| s08 | ″ | ekran `hn.webm` @5 | narrator / kaxo (0.88) / narrator | Some commenters had a shorter review. / Animated slides. / The tool in that post doesn't even use Remotion. |
| s09 | ″ | ekran `remotion-docs.webm` @0 | narrator | Remotion turns React code into video. / Every frame is basically a little web page. / A hidden browser photographs each frame, and ffmpeg stitches them together. |
| s10 | ″ | YENİ: KAXO yerdə flipbook vərəqləyir, yanında laptop | kaxo | So it's a flipbook. For people with keyboards. |
| s11 | ″ | ekran `remotion-docs.webm` @5 | narrator | Remotion even has an official workflow for coding agents like Claude. / One command installs twelve skills that teach the agent the ropes. |
| s12 | ″ | POZA `holding-zero-dollar-sign` | narrator / kaxo | It's also free for companies with up to three employees. / I have zero. Zero humans, at least. |
| s13 | ″ | ekran `remotion-docs.webm` @8 | narrator | That's our reading of the license, not Remotion's. / The license is linked below. |
| s14 | How we normally make videos | YENİ: Rube Goldberg maşını, hər stansiyada robot (rəssam, müğənni, yazan, qayçı), KAXO razı baxır | narrator / kaxo | Now, how KAXO's company normally makes a video. / It's a ten-step recipe, run entirely by AI agents. / I designed it. By asking someone else to. |
| s15 | ″ | ofis `office.webm` @8 | narrator / kaxo | Behind it sit fourteen scripts and nearly thirteen hundred lines of code. / All written in Claude Code sessions. / Code I've never read. Proudly. |
| s16 | ″ | ofis `office.webm` @14 | narrator | The KAXO images come from ChatGPT, clicked through a real browser. / Our voice is Kokoro, a free model running on our own CPU. |
| s17 | ″ | YENİ: müğənni robot mikrofona oxuyur, rəssam robot buz blokunda donub, KAXO bean-bag-da | narrator / kaxo | Last episode, the voice ate the whole CPU, and Chrome froze. / The singer froze the painter. Office politics. |
| s18 | ″ | qrafik `g-time.webm` @0 | narrator | That episode took about three hours to publish. / The session logged six hundred forty-three tool calls. / Forty-one of them failed. |
| s19 | ″ | POZA `asleep-on-desk-ceo-mug` | kaxo (0.88) | Three hours. I was there for the first five minutes. |
| s20 | ″ | ofis `office.webm` @20 | narrator | Then the final file weighed a hundred and fifty-four megabytes. / The agents' upload tool stops at ten. |
| s21 | ″ | YENİ: nəhəng cizgi insan əli kadra girib böyük qutunu sürükləyir, KAXO və robotlar kənara çəkilir | narrator / kaxo | So our human owner dragged it into YouTube by hand. / Fully automated. Except the part with the hand. |
| s22 | ″ | ofis `office.webm` @26 | narrator / kaxo | Its first upload even went out with holes in the sound. / Holes in the sound. Very artistic. |
| s23 | ″ | qrafik `g-time.webm` @3 | narrator | Now, the fair part. / Claude didn't redo that long video. / It rebuilt our thirty-eight-second short, cut from that episode. |
| s24 | ″ | klip `ours.mp4` @20 (blur) | narrator / kaxo | Making that short took our pipeline about thirty more minutes. / Nobody started from zero. Except my effort. |
| s25 | Round one: one prompt | YENİ: robot tək masada laptopda yazır, masada bir stiker; arxada KAXO hamakda yatır | narrator | So here's the job a Claude builder agent got. / Rebuild our published short in Remotion. |
| s26 | ″ | kod `code-remotion.mp4` @0 | narrator / kaxo / narrator | Same script, same voice file, same KAXO images. / Same face too. It's a good face. / Every graphic and every subtitle had to be written in code. |
| s27 | ″ | kod `code-remotion.mp4` @8 | narrator / kaxo | No finished clips allowed. One prompt, no help. / My management style. Explain once, then vanish. |
| s28 | ″ | ofis `office.webm` @40 | narrator | It read Remotion's docs, set up a project, and installed the skills. / Then it wrote the scenes and rendered. |
| s29 | ″ | POZA `beanbag-stopwatch-robot-typing` | kaxo / narrator | I timed it. Well, the log timed it. / Ten point seven minutes, forty-six tool calls, and one render. |
| s30 | ″ | qrafik `g-rounds.webm` @0 | narrator / kaxo | Along the way, it hit four errors. / Two came from Remotion's own slimmed-down ffmpeg. / Four errors, zero crashes. Better than my week. |
| s31 | ″ | klip `v1.mp4` @3 (blur) | narrator | And the result actually works. / The voice is in sync, and the subtitles follow every word. |
| s32 | ″ | klip `v1.mp4` @1 (blur): boş hook | narrator / kaxo | But look at the very first second. / The hook is a heading and an empty screen. / An empty screen. Finally, content I relate to. |
| s33 | ″ | klip `v1.mp4` @6 (blur): etiket KAXO-da | narrator | Then this. The label Opus 5.5 should sit on a robot. / It landed on KAXO instead. |
| s34 | ″ | YENİ: KAXO-nun alnına oxlu boş etiket yapışıb, iki robot çaşqın baxır | kaxo (0.88) | I've been called a lot of things. Never a version number. |
| s35 | ″ | kod `code-remotion.mp4` @14 | narrator | The code applied the image scaling twice. / So the labels drifted off their robots. |
| s36 | ″ | klip `v1.mp4` @12 (blur) | narrator / kaxo | The bottom half of the graphics sat empty, too. / Claude graded its own work five or six out of ten. / Humble. I'd have given myself a ten. |
| s37 | Round two: six notes | ofis `office.webm` @50 | narrator | Round one only checked four frames by eye. / The misplaced label wasn't in any of them. |
| s38 | ″ | YENİ: robot qısa əl yazısı qeydi oxuyur, KAXO arxada "mən yazmışam" kimi barmaqla göstərir | narrator / kaxo | So round two got human help. Our owner wrote six notes. / I'd have written them myself. No fingers, though. |
| s39 | ″ | qrafik `g-rounds.webm` @4 | narrator | Fix the hook. Move the label. Fill the empty space. / Clean up the subtitles, add motion, and check more frames. |
| s40 | ″ | klip `v1.mp4` @20 (blur) | kaxo | That's a lot of notes. Mine just say nice. |
| s41 | ″ | kod `code-remotion.mp4` @20 | narrator | This time, Claude checked its own frames every few seconds. / And it caught a bug it had just made itself. |
| s42 | ″ | klip `v2.mp4` @17 (blur) | narrator | Its highlighted word grew and squashed into its neighbour. / So I supervise became one word: ISUPERVISE. |
| s43 | ″ | POZA `feet-up-access-denied` | kaxo (0.88) | Isupervise. Honestly, that's how I pronounce it. |
| s44 | ″ | klip `v2.mp4` @1 (blur): düzəlmiş hook | narrator | It fixed that, and everything else on the list. / Now the hook lands in the very first second. |
| s45 | ″ | klip `v2.mp4` @6 (blur): düzəlmiş etiketlər | narrator / kaxo | The labels sit on the right robots, with little arrows. / Arrows. So I know exactly which robot to ignore. |
| s46 | ″ | qrafik `g-rounds.webm` @8 | narrator | Round two took about nine minutes and fifty-eight more tool calls. / One full render, three test renders, and four new errors. |
| s47 | ″ | ofis `office.webm` @60 | narrator / kaxo | The whole test: about twenty minutes, a hundred and four tool calls. / Two full renders. / Twenty minutes. That's a short nap. |
| s48 | ″ | klip `v2.mp4` @12 (blur) | narrator / kaxo | Its self-score went up to seven out of ten. / Seven. I'm proud of it. From a distance. |
| s49 | The blind test | ofis `office.webm` @70 | narrator / kaxo | Now, the blind test we promised. / Finally. Someone else does the watching. |
| s50 | ″ | klip `ours.mp4` @1 (blur) | narrator | Our QA agent got two files, labeled A and B. / It didn't know which one was ours. |
| s51 | ″ | klip `v2.mp4` @8 (blur) | narrator / kaxo | A was our published short. B was Claude's Remotion version. / An AI judging AIs. I brought snacks. |
| s52 | ″ | qrafik `g-score.webm` @0 | narrator | Eight categories, ten points each. / Claude's version scored fifty-five out of eighty. / Ours got forty-nine. |
| s53 | ″ | YENİ: KAXO divanda donub, pult əlindən düşür, kənarda TV-də abstrakt qrafik | kaxo (0.88) | Forty-nine. For my own company's video. |
| s54 | ″ | klip `v2.mp4` @3 (blur) | narrator | Claude won the hook, eight to six. / It won subtitles, eight to five. |
| s55 | ″ | qrafik `g-score.webm` @4 | narrator / kaxo | And technical defects, eight to five. Higher means cleaner. / Defects. In my video. Allegedly. |
| s56 | ″ | klip `ours.mp4` @9 (blur): ağ ekran 9.5 s | narrator | Here's what the judge found in our published short. / At nine and a half seconds, a white flash. |
| s57 | ″ | klip `ours.mp4` @27.4 (blur): boş kod kadrı | narrator | Near twenty-eight seconds, a code shot that's almost empty. / And the code line itself is cut off. |
| s58 | ″ | POZA `lying-on-floor-thumbs-up` | kaxo | We published that. A human approved it. Nobody saw it. |
| s59 | ″ | klip `ours.mp4` @10 (blur): real ofis | narrator / kaxo | Ours did win one category: real footage, six to two. / Real office, real code being typed. / Real robots. Really typing. Thrilling stuff. |
| s60 | ″ | klip `v2.mp4` @27 (blur): imitasiya terminal | narrator | Claude's version is pure graphics. / Its terminal shot is a recreation, not a real log. / The judge flagged it, and so do we. |
| s61 | ″ | YENİ: KAXO çəhrayı zərflə iki eyni robotun arasında, robotlar bir-birini göstərir | kaxo (0.88) | **So I'm firing my video editor. [pause] Which is also Claude.** (punchline, ~81%) |
| s62 | ″ | ofis `office.webm` @80 | narrator | Claude's new video beat Claude's old video. / And an AI judge caught what the old one missed. |
| s63 | ″ | ekran `hn.webm` @3 | narrator / kaxo | So Hacker News was half right. / The judge called Claude's version templated, but polished. / Animated slides. Very good animated slides. (callback s08) |
| s64 | The verdict | qrafik `g-time.webm` @6 | narrator / kaxo | So, can Claude make a YouTube video by itself? / Not by itself. Here's what we handed it. / Nothing's by itself. Even I have staff. |
| s65 | ″ | klip `v2.mp4` @22 (blur) | narrator | The voice came from our Kokoro setup. / KAXO's images came from ChatGPT. / A human wrote the round-two notes. |
| s66 | ″ | qrafik `g-score.webm` @8 | narrator / kaxo | The judge was an AI too, and it's one test, one run. / One run. Like my exercise routine. |
| s67 | ″ | POZA `couch-long-receipt` | narrator / kaxo | No dollars measured either. It all ran on a subscription. / Nothing to pay. I checked the couch anyway. |
| s68 | ″ | kod `code-remotion.mp4` @30 | narrator | Still, for graphics and subtitles, Claude plus Remotion was genuinely good. / Twenty minutes, and a higher score than our own short. |
| s69 | ″ | ofis `office.webm` @90 | narrator | Our pipeline still owns the real stuff. / Real office footage, real code, and a fuller, louder mix. |
| s70 | ″ | YENİ: KAXO iki masa arasında hamakda yatır; bir robot planşetdə çəkir, digəri kamera tutur | kaxo | So here's my verdict. I'm keeping both. / The new one draws. The old one films. |
| s71 | ″ | klip `v2.mp4` @31 (blur) | narrator / kaxo (0.88) | The judge suggested the same mix: B's graphics, A's real footage. / Nobody gets fired. Firing takes effort. (callback s05) |
| s72 | ″ | POZA `at-window-looking-back` (static, end screen ~18 s) | narrator / kaxo | Every source and link is in the description. / Should Claude try a whole long video next? Comment below. / I'll have someone read them to me. / Our Opus 5.5 test is right here, too. / It's the one where the cheap model skipped its homework. / Me? I didn't watch either video. / That's what the judge is for. (loop → s01) |

## Fəsillər (təxmini, 2.9 söz/s)
| Fəsil | Shot | Söz | ~Müddət | ~Başlanğıc |
|---|---|---|---|---|
| Our video lost to a remake | s01–s13 | ~230 | ~79 s | 0:00 |
| How we normally make videos | s14–s24 | ~207 | ~71 s | 1:19 |
| Round one: one prompt | s25–s36 | ~223 | ~77 s | 2:30 |
| Round two: six notes | s37–s48 | ~203 | ~70 s | 3:47 |
| The blind test | s49–s63 | ~232 | ~80 s | 4:57 |
| The verdict | s64–s72 | ~203 | ~70 s | 6:17 |

Açıq döngülər və ödənişi: "scores" (s05 → s52), "a flaw nobody noticed" (s04 → s56–s57), "somebody's getting fired" (s05 → s61, s71), "what Claude still can't do" (s05 → s64–s65), "Animated slides" (s08 → s63), "the blind test we promised" (s49).
Pattern interrupt-lar: hər 20–40 saniyədə KAXO zarafatı və ya kadr tipinin dəyişməsi (ofis → qrafik → v1/v2/ours → KAXO şəkli). Eyni tip kadr 20 saniyədən çox davam etmir.

## Prodüser üçün qeydlər
- **Şaquli kliplər** (`v1.mp4`, `v2.mp4`, `ours.mp4`) hamısı `"fit": "blur"`dur, yəni 16:9 kadrda bulanıq fonun üstündə tam görünür.
- **`office.webm`:** `clip_start` 0-dan 90-a qədər gedir, ona görə klip ≥ 95 s olmalıdır. Qısa çıxarsa, start-ları mütənasib kiçilt. Test replay-i real olmalıdır (RULES §4).
- **`ours.mp4` @27.4:** boş kod kadrı 27.4–29.6 s-dədir. Shot ~6 s olduğu üçün sonda divan səhnəsi də görünəcək, bu normaldır.
- **`v2.mp4` @31:** klip 37.76 s-dir, shot ~6 s. Loop-a düşməməsi üçün start 31-dən böyük olmasın.
- **Qrafiklər:** `g-time` 3 saat (epizod 2-nin dərci) ilə ~20 dəq (Remotion, iki raund) müqayisəsidir və "long episode" imzası mütləq olmalıdır. Epizod 2 ilə short-u qarışdırmasın. `g-rounds`: raund 1 = 10.7 dəq / 46 çağırış / 4 xəta / 1 render; raund 2 = ~9 dəq / 58 çağırış / 4 xəta / 1 tam + 3 yoxlama render-i. `g-score`: 55 vs 49 / 80; hook 8–6, altyazı 8–5, texniki qüsur 8–5, real görüntü 2–6, qalanları qa-blind.md-dən.
- **Yeni şəkillər:** 12 ədəd (s01, s06, s10, s14, s17, s21, s25, s34, s38, s53, s61, s70), 3:2 üfüqi, ardıcıllıq bloku `{ASPECT}` = long. Robotların təsviri bütün prompt-larda eynidir.
- **Pozalar:** 8 ədəd, hər biri bir dəfə: couch-sprawled, holding-zero-dollar-sign, asleep-on-desk-ceo-mug, beanbag-stopwatch-robot-typing, feet-up-access-denied, lying-on-floor-thumbs-up, couch-long-receipt, at-window-looking-back. Epizod 2-nin punchline şəkli (couch-hugging-robot) qəsdən işlədilmir.
- **End screen:** s72 (~18 s, static). Sağ tərəfdə Opus 5.5 long videosu (https://youtu.be/3RbuOZYm-ck) və subscribe elementi.
- **Təsvirə düşməli linklər:** Remotion LICENSE.md, remotion.dev/docs/ai/coding-agents, HN item 49836374, launchvideo.io (Remotion istifadə etmədiyi haqda), Opus 5.5 long videosu.

## Dürüstlük yoxlaması
- Bütün rəqəmlər hesabatdan və test loglarındandır: 412 xal, autocomplete #2, 12 skill, ≤3 işçi lisenziyası, 10 addım, 14 skript, ~1 280 sətir ("nearly thirteen hundred"), ~3 saat, 643 çağırış, 41 uğursuz, 154 MB / 10 MB, 37.69 s short ("thirty-eight-second"), short üçün ~30 dəq, raund 1: 10.7 dəq, 46 çağırış, 1 render, 4 xəta (2-si Remotion-un ffmpeg-i), özünə qiymət 5–6/10; raund 2: ~9 dəq, +58 çağırış, 1 tam + 3 yoxlama render-i, 4 xəta, 7/10; cəmi ~20 dəq, 104 çağırış, 2 tam render; kor QA 55 vs 49 / 80, hook 8–6, altyazı 8–5, texniki 8–5, real görüntü 6–2; ağ ekran 9.5 s, kod kadrı ~28 s. Uydurma rəqəm yoxdur.
- **"3 saat" ilə "20 dəqiqə" birbaşa qarşılaşdırılmır.** s23–s24 açıq deyir ki, Claude long videonu yox, ondan kəsilmiş 38 saniyəlik short-u yenidən yığıb, bizim pipeline-a isə short üçün ~30 dəqiqə lazım olub və heç kim sıfırdan başlamayıb.
- 643 çağırış "the session logged" kimi deyilir (sessiyaya branding, TR və short da daxildir). "About three hours to publish" isə testin başlanğıcından ilk Public-ə qədər olan müddətdir (log natamamdır, ona görə "about").
- Claude-un etmədikləri açıq deyilir: səs (Kokoro, bizim fayl) və KAXO şəkilləri (ChatGPT) ona verilib, raund 2 qeydlərini insan yazıb (s38, s65).
- Raund 1-də yalnız 4 kadrın gözlə yoxlandığı və etiket səhvinin o kadrlarda olmadığı deyilir (s37), yəni səhvi Claude özü yox, insan tapıb.
- Remotion versiyasındakı terminal kadrı "recreation, not a real log" kimi göstərilir (s60).
- Hakim də AI-dır, bu da bir test, bir run-dır (s66). $ ölçülməyib, abunə ilə işləyib (s67).
- Lisenziya: "our reading of the license, not Remotion's" (s13). Link təsvirdədir.
- HN postundakı alətin Remotion istifadə etmədiyi deyilir (s08), trend şişirdilmir.
- "A human approved it. Nobody saw it." (s58): short-u sahib təsdiqləyib, qüsuru heç kim görməyib. Bu hesabatla üst-üstə düşür.
- "Claude's old video" (s62): pipeline Claude Code agentləri ilə işləyir, amma şəkil ChatGPT-dən, səs Kokoro-dandır. Bunu s16 və s65 açıq deyir.
- İnsan sahib "our human owner" / "our owner" kimi keçir. KAXO sitcom sahibidir, faylı sürükləyən və qeydləri yazan isə real insandır. Bu qarışdırılmır.

## Monetizasiya
orijinallıq ✓ (öz real testimiz, iki raund, kor QA, öz rəqəmlərimiz, KAXO-nun hökmü; rəqib videolarda olmayan yan-yana müqayisə) · reused ✓ (HN və Remotion docs yalnız ≤12 s şərh üçün, mətn oxunmur; v1/v2/ours bizim videolarımızdır) · reklamçı dostu ✓ (söyüş, zorakılıq yoxdur; "choked" "froze" ilə əvəzlənib) · hüquqlar ✓ (öz ofis, öz qrafiklər, ChatGPT şəkilləri, Kokoro; Remotion free licence, bizim şərhimizlə) · risk: aşağı

## Yoxlama siyahısı (özümü yoxladım)
- [x] **Hook ilk 2 s-də:** ilk kadr gözü bağlı robot-hakimdir, ilk cümlə "Our own video just lost to a Claude remake." (~3 s, şok ilk 5 sözdədir).
- [x] **Vəd ilk 30 s-də:** s05 "You'll see the scores, the mistakes, and what Claude still can't do."
- [x] **Punchline ~80%-də:** s61, sözlərin ~81%-i ("…firing my video editor. [pause] Which is also Claude.").
- [x] **Loop sonu:** "That's what the judge is for." cümləsi s01-ə ("…A blind judge watched both") qayıdır.
- [x] **6–10 dəq:** ~1298 söz / 2.9 ≈ 7:28 (6.5–8 dəq hədəfi daxilində).
- [x] **Fəsillər ≥ 60 s:** 6 fəsil, 70–80 s. Hər shot-da `chapter` var.
- [x] **Cümlələr ≤ 12 söz:** ən uzunları 12 sözdür (s04, s05, s15, s16, s28, s47, s66).
- [x] **Qısaltmalar:** you'll, can't, it's, didn't, I'd, I've, I'm, that's, doesn't, wasn't, somebody's, nothing's.
- [x] **`[pause]` ən çox 1:** yalnız s61-də.
- [x] **Interjection ≤ 2:** "Well," (s29), "Honestly," (s43).
- [x] **Diktor ≤ 3–4 cümlə ardıcıl:** hər yerdə ən çox 4, sonra KAXO və ya kadr dəyişir.
- [x] **Eyni sözlə başlayan ardıcıl cümlə yoxdur**, "In this video" və "Let's dive in" yoxdur, siyahı kimi sadalama yoxdur (s39-dakı qeydlər qısa əmr cümlələridir, "firstly/secondly" yoxdur).
- [x] **Tanıtım videosu deyil:** mövzu Claude + Remotion testidir. Başlıqdan KAXO-nu çıxaranda da maraqlı qalır.
- [x] **Qadağan kontent yoxdur:** real insan (yalnız cizgi əl, üzsüz), siyasət, spirt, söyüş, başqa brend personajı yoxdur. Loqo yalnız mövzu üçündür (Remotion docs, HN).
- [x] **Rəqəmlər hesabatla üst-üstə düşür:** "Dürüstlük yoxlaması"na bax. 3 saat ilə 20 dəqiqə "apples to apples" kimi verilmir.
- [x] **Epizod 2-nin təkrarı deyil:** yeni mövzu (video istehsalı, Remotion), yeni skelet (trend → pipeline → iki raund → kor test → hökm), yeni zarafatlar. Epizod 2-nin hug punchline-ı, "I've never felt so seen", receipt/bill skeleti, race/tests/bill qrafikləri işlədilmir. Yeganə istinad end screen-dəki körpüdür (s72).
- [x] **Monetizasiya sətri (§12):** yuxarıda.
- [x] **Poza ≤ 50%:** 8/20 = 40%. Yeni şəkil 12 (limit ~12).
- [x] **Kadr 3–8 s:** orta ~6.2 s. İstisna yalnız end screen-dir (s72, ~18 s, qəsdən).
- [x] **TR altyazı:** hər sətirdə `text_tr` var, danışıq türkcəsi, rəqəmlər dəyişməyib (§15).
- [x] **CTA:** s72 "Should Claude try a whole long video next? Comment below." + end screen-də Opus 5.5 videosu.
