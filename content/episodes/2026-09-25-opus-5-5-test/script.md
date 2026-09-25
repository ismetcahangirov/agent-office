# Opus 5.5 vs Opus 5: same job, real bill (long, 16:9)

**Söz sayı:** ~1145 danışılan söz (`[pause]` sayılmır, əl ilə sayılıb). **Təxmini müddət:** 1145 / 2.5 ≈ 458 s ≈ **7:38** (KAXO-nun yavaş sətirləri ilə ~7:45).
**Kadr:** 68 shot, orta ~6.7 s. 16 KAXO kadrı (10 yeni + 6 poza = 37.5% poza), 44 real klip/qrafik/screenshot, 8 stock (~55 s ≈ 12%).
**Punchline:** s57, ~81% ("It skipped checking its own work. [pause] I've never felt so seen."). Son cümlə hook-a qayıdır.

**İdeya:** Anthropic Opus 5.5-in 40% ucuz olduğunu deyir. KAXO işçilərini upgrade edib-etməməyə qərar verməlidir, ona görə Opus 5 və Opus 5.5 eyni real işi (şirkətin öz event logundan tək fayllıq dashboard) və eyni 18 gizli testi aldı. Nəticə qarışıqdır: hər ikisi 18/18; 5.5 5x sürətli və 81% ucuz; Opus 5 daha gözəl dizayn etdi və öz işini brauzerdə yoxladı; 5.5 yoxlamadı və QA onda kiçik kənar hal tapdı (Opus 5-də də başqa biri var); Opus 5 qaralama fayllar qoydu. KAXO upgrade edir, çünki onsuz da QA yoxlayır, o isə heç nə.
**Real fakt:** `content/reports/2026-09-25-opus-5-5-test.md`, `work/tests/opus-5-5/qa-report.md`, `work/tests/opus-5-5/task/SPEC.md`, rəsmi rəqəmlər https://www.anthropic.com/claude-opus-5-5.

| Shot | Fəsil | Vizual | Səs | Mətn |
|---|---|---|---|---|
| s01 | 40% cheaper? | YENİ: KAXO divanda, yerə qədər uzanan qəbzə baxır | kaxo | Anthropic says Opus 5.5 is forty percent cheaper. I checked the bill. |
| s02 | | klip `anthropic.webm` @0 | narrator | KAXO's company is staffed entirely by Claude agents. / Anthropic released Opus 5.5, and KAXO had one question. |
| s03 | | YENİ: KAXO iki masa və iki robot arasında barmaqla seçir | kaxo / narrator | Is it worth the upgrade? Or is it just a bigger number? / So his employees ran the test for him. |
| s04 | | klip `race.webm` @0 | narrator | Opus 5 and Opus 5.5 got the exact same job. / Same instructions, same data, same hidden tests at the end. |
| s05 | | klip `bill.webm` @0 | kaxo / narrator | I'll make the call. Right after someone makes it for me. / We timed both runs to the second. |
| s06 | | klip `race.webm` @4 | narrator / kaxo (0.88) | One finished five times faster than the other. / Five times. Somebody checked. Not me. |
| s07 | | stock `stock-typing.mp4` @0 | narrator | We also pulled each run's cost from the logs. / Anthropic's number is forty. We got our own. |
| s08 | | POZA `couch-sprawled` | narrator / kaxo | And the slower model did something the fast one skipped. / My verdict's at the end. It's my only job. |
| s09 | | klip `dash-opus-5-5.webm` @0 | narrator / kaxo | Both built this: a dashboard of KAXO's own company. / It's mostly charts of other people working. |
| s10 | What Anthropic claims | klip `anthropic.webm` @2 | narrator / kaxo | Before any testing, here's Anthropic's official promise. / The token price drops twenty percent. / Cheaper employees. My favorite kind. |
| s11 | | klip `anthropic.webm` @5 | narrator | Input goes from five dollars per million tokens to four. / Output drops from twenty-five dollars to twenty. |
| s12 | | stock `stock-servers.mp4` @0 | narrator | Cached reads get sixty percent cheaper. / And on typical workloads, they say forty percent cheaper overall. |
| s13 | | YENİ: KAXO döşəmədə kalkulyatorla "hesab edir" | kaxo | Twenty percent off, then forty percent off. / I did the math. Everything's basically free now. |
| s14 | | klip `anthropic.webm` @7 | narrator | They don't stack. / The forty is their estimate for typical work. / Nobody's giving KAXO anything for free. |
| s15 | | stock `stock-city.mp4` @0 | kaxo (0.85) / narrator | Rude. / Output should also be over thirty percent faster. / On Terminal-Bench 4.0, the score jumps from fifty-two to sixty-six. |
| s16 | | klip `anthropic.webm` @9 | narrator / kaxo | OSWorld goes from seventy-four to almost eighty-two. / Those numbers come from Anthropic's own page. / Benchmarks are job interviews. Everyone's great at interviews. |
| s17 | | stock `stock-typing.mp4` @6 | narrator | Here's the catch with price per token. / A job can take ten thousand tokens, or a million. |
| s18 | | klip `bill.webm` @2 | narrator / kaxo | Price per finished job is what you actually pay. / So I wanted a real job. And a real receipt. |
| s19 | The job and the hidden tests | YENİ: KAXO kresloda bir vərəqi iki robota uzadır | narrator | The job came from KAXO's real office. / Every time an agent there uses a tool, it gets logged. |
| s20 | | ofis `office-qa-live.webm` @0 | narrator / kaxo | That log had ninety-six events in it. / Ninety-six. Way too long to read. |
| s21 | | klip `dash-opus-5.webm` @0 | narrator | The task: turn that log into a dashboard, in one HTML file. / No libraries, no internet, dark theme. |
| s22 | | klip `dash-opus-5-5.webm` @3 | narrator / kaxo | It gets screenshotted, so it has to look good. / Looking good is also my whole job. |
| s23 | | ofis `office-qa-live.webm` @8 | narrator | The page needs events, tool calls, sessions, subagents, and the busiest hour. / Plus a sorted tool table and a bar chart. |
| s24 | | klip `dash-opus-5.webm` @5 | narrator / kaxo | One more number: KAXO's productivity, fixed by the spec at zero percent. / Finally, a metric that's accurate. |
| s25 | | YENİ: KAXO zərfi arxasında gizlədir, robotlar küncdən baxır | narrator / kaxo | Then the important part: hidden tests. / They knew they'd be tested, but never saw how. / I love secrets. Less talking. |
| s26 | | ofis `office-qa-live.webm` @16 | narrator | Eighteen checks ran after both models finished. / Some use the real log, others use fake data built to break. |
| s27 | | POZA `lying-on-floor-thumbs-up` | kaxo / narrator | Built to break things. My kind of data. / One warning before the race. |
| s28 | | stock `stock-servers.mp4` @6 | narrator | It's one task, run once per model, not a benchmark. / Both ran in Claude Code, on default settings. |
| s29 | | stock `stock-city.mp4` @6 | kaxo | One roll of the dice. Like most of my business decisions. |
| s30 | The race | qrafik `race.webm` @0 | narrator | They started at the same moment, in separate folders. / Opus 5.5 read the spec, wrote the page, and checked the numbers. |
| s31 | | qrafik `race.webm` @6 | narrator / kaxo | Fifty-three seconds, done. / I can't pick lunch in fifty-three seconds. |
| s32 | | kod `code-opus-5-5.mp4` @0 | narrator | This is the actual code Opus 5.5 wrote. / Five steps in total. |
| s33 | | YENİ: KAXO kreslo-çantada stopwatch ilə yuxuya gedir, arxada robot yazır | narrator / kaxo | Meanwhile, Opus 5 was still going. / I started a stopwatch. That was my contribution. |
| s34 | | kod `code-opus-5.mp4` @0 | narrator | This run would take thirty-one steps. / It wrote the page, then opened it in a browser. |
| s35 | | kod `code-opus-5.mp4` @8 | narrator / kaxo | Then it tested four edge cases of its own. / Checking your own work. Bold move. |
| s36 | | qrafik `race.webm` @2 | narrator | Four minutes and twenty-five seconds after the start, it finished. |
| s37 | | POZA `asleep-on-desk-ceo-mug` | kaxo (0.88) / narrator | I napped through most of it. / Here's where the gap came from. |
| s38 | | qrafik `bill.webm` @4 (addımlar) | narrator | Every step, the model rereads its whole context. / More steps means more rereading, and rereading costs money. |
| s39 | | qrafik `bill.webm` @7 | narrator / kaxo | Opus 5 reread about one point three million cached tokens. / One point three million. I've read maybe four. |
| s40 | | YENİ: KAXO nəhəng kağız qalağına söykənir, bir robot qalağın arxasında, digəri tək vərəqlə | narrator | Opus 5.5 reread about a hundred and twenty-eight thousand. / Roughly ten times less. / Fewer steps, fewer rereads, smaller bill. |
| s41 | | kod `code-opus-5-5.mp4` @6 | kaxo | One reads the manual every single step. / The other skims. I respect that. |
| s42 | Tests, bill and design | qrafik `tests.webm` @0 | narrator | Now, the hidden tests. / Opus 5 passed eighteen out of eighteen. / And Opus 5.5? Also eighteen out of eighteen. |
| s43 | | qrafik `tests.webm` @5 | kaxo | Perfect scores, both of them. So nobody's fired. / I was ready to fire someone. Mentally. |
| s44 | | ofis `office-qa-live.webm` @20 | narrator | The real numbers matched on both pages. / Ninety-six events, seventy tool calls, five sessions. / And KAXO's productivity, correctly, at zero percent. |
| s45 | | qrafik `bill.webm` @0 | kaxo / narrator | Correctly. Twice. / Then, the bill. / Claude Code logs what each run would cost on the API. |
| s46 | | qrafik `bill.webm` @4 | narrator | For Opus 5, about a dollar forty-five. / Opus 5.5 came to twenty-seven cents. |
| s47 | | qrafik `bill.webm` @8 | kaxo / narrator | Twenty-seven cents. I've lost more in the couch. / That's eighty-one percent cheaper. Anthropic said forty. |
| s48 | | POZA `holding-zero-dollar-sign` | narrator / kaxo (0.88) | We ran it on a subscription, so no extra money changed hands. / Zero extra. My favorite price. |
| s49 | | klip `anthropic.webm` @3 | narrator | Our gap is bigger than the claim, and it's one run. / Opus 5.5 took six times fewer steps. |
| s50 | | stock `stock-typing.mp4` @10 | narrator / kaxo / narrator | That's the difference. / A different task could look very different. / Fine. Now the pretty part. / Tests can't measure how a page looks. |
| s51 | | klip `dash-opus-5.webm` @0 | narrator / kaxo (0.85) | Opus 5 filled the whole screen. / Vertical bars, value labels, tiny bars inside the table. / Fancy. |
| s52 | | klip `dash-opus-5-5.webm` @0 | narrator | Opus 5.5 went clean and readable, with a share column. / But half its chart panel sits empty. |
| s53 | | screenshot `shot-opus-5-5.png` | narrator / kaxo | About a hundred and ten pixels sit blank at the bottom. / I'd have given both a ten. Didn't look. |
| s54 | | YENİ: KAXO şezlonqda, gözü yumulu, iki boş hakim kartı qaldırır | narrator / kaxo | Our QA agent did look. / Nine out of ten for Opus 5, seven for Opus 5.5. / Harsh. Accurate, but harsh. |
| s55 | The catch and the verdict | qrafik `race.webm` @8 | narrator | One more difference. / Opus 5.5 never opened its page in a browser. |
| s56 | | kod `code-opus-5-5.mp4` @12 | narrator | It checked the numbers with a script and called it done. / And it said so openly. |
| s57 | | YENİ: KAXO divanda robotu qucaqlayır, ikisi də eyni tənbəl pozada, KAXO kövrəlib | kaxo (0.88) | **It skipped checking its own work. [pause] I've never felt so seen.** (punchline, ~81%) |
| s58 | | ofis `office-qa-live.webm` @30 | narrator | QA also hunted for edge cases the tests missed. / It found one in Opus 5.5. |
| s59 | | kod `code-opus-5-5.mp4` @10 | kaxo / narrator | The cheap one has a bug. Shocking. / An empty tool name gets counted but never appears in the table. |
| s60 | | screenshot `shot-opus-5.png` | narrator | So the totals don't add up. / Opus 5 had one too. / With forty different tools, its side panel runs off screen. |
| s61 | | qrafik `tests.webm` @8 | kaxo / narrator | So, a tie. In bugs too. / Neither case was in the real data. |
| s62 | | kod `code-opus-5.mp4` @10 | narrator | Opus 5 checked its work, but left a mess behind. / Draft scripts and screenshots stayed in its folder. |
| s63 | | POZA `feet-up-access-denied` | narrator / kaxo | To be fair, it wasn't allowed to delete files. / Not allowed to clean up. I use that excuse too. |
| s64 | | YENİ: KAXO masaya yayılıb, möhürü boş formaya vurur, robot gözləyir | narrator / kaxo | KAXO, upgrade or not? / Upgrade. Five times faster, for a fraction of the price. |
| s65 | | ofis `office-qa-live.webm` @34 | kaxo | And the checking it skips? QA does that anyway. / Fast worker, careful checker. And me, supervising from the couch. |
| s66 | | klip `dash-opus-5.webm` @4 | narrator | If looks are the whole job, Opus 5 earned its extra dollar. |
| s67 | | stock `stock-city.mp4` @10 | narrator / kaxo | Oh, and both were told to reply in one line. / Neither did. / At least they reply. I don't. |
| s68 | | POZA `at-window-looking-back` (static, end screen) | narrator / kaxo (0.88) | One job, one run: a data point, not a law. / Every number's source, including Anthropic's page, is in the description. / Want a rematch on a harder task? Tell us in the comments. / Anthropic said forty percent cheaper. / My bill said eighty-one percent. For one job. (loop → s01) |

## Fəsillər (təxmini)
| Fəsil | Shot | Söz | ~Müddət |
|---|---|---|---|
| 40% cheaper? | s01–s09 | ~153 | ~61 s |
| What Anthropic claims | s10–s18 | ~159 | ~64 s |
| The job and the hidden tests | s19–s29 | ~180 | ~72 s |
| The race | s30–s41 | ~177 | ~71 s |
| Tests, bill and design | s42–s54 | ~228 | ~91 s |
| The catch and the verdict | s55–s68 | ~250 | ~100 s |

## Dürüstlük yoxlaması
- Bütün rəqəmlər hesabatdan: 265 s / 53 s, 31 / 5 addım, $1.45 / $0.27, 18/18 hər ikisi, 1.27M / 128K cache read, QA 9/10 / 7/10, ~110 px boşluq, 96 / 70 / 5 / 0%.
- "81% cheaper" həmişə "one run" və "a different task could look very different" ilə birlikdə deyilir. "Bu benchmark deyil" (s28) və "default settings" (s28) açıq deyilir.
- Dollar rəqəmləri API-ekvivalentdir: "Claude Code logs what each run would cost on the API" (s45) və "no extra money changed hands" (s48).
- Kənar hallar hər iki modeldə göstərilir (5.5: boş tool adı; 5: 40 tool-da panel kəsilir) və "real datada yox idi" deyilir.
- Opus 5-in qaralama faylları üçün səbəb deyilir: silmə icazəsi yox idi (s63).
- Anthropic-in rəqəmləri "their estimate" / "Anthropic's own page" kimi təqdim olunur. Effort fərqi (üçüncü tərəf mənbə) videoda iddia kimi deyilmir, yalnız "default settings".
- KAXO-nun "I checked the bill" / "My bill" sözləri sitcom çərçivəsidir; s06-da "Somebody checked. Not me." ilə açıq deyilir.

## Monetizasiya
orijinallıq ✓ (öz real testimiz, gizli testlər, öz rəqəmlərimiz, KAXO-nun hökmü) · reused ✓ (Anthropic səhifəsi yalnız ≤15 s şərh üçün, mətn oxunmur) · reklamçı dostu ✓ · hüquqlar ✓ (öz ofis, öz qrafiklər, ChatGPT şəkilləri, Pexels/Pixabay stock, Kokoro) · risk: aşağı
