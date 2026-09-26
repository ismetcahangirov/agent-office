# Faktlar: 40 s-lik Short "Claude nine loops" (news flash)

Kəşfiyyatçı, 2026-09-26. Mənbə: WebFetch ilə 4 dəfə oxunan səhifə. Bu sessiyada curl/Bash yox idi, ona görə sitatlar WebFetch-in "verbatim" çıxışındandır. Dərcdən əvvəl açar sitatları brauzerdə bir dəfə gözlə yoxlamaq tövsiyə olunur.

## A. Rəsmi faktlar

### A1. Anthropic: "Yes, Claude can do Nine Loops"
URL: https://www.anthropic.com/research/yes-claude-can-do-nine-loops

| Fakt | Sitat / qeyd |
|---|---|
| Tarix | **September 25, 2026** (səhifədə görünür) |
| Müəllif | **Matt von Hippel**: keçmiş nəzəri fizik, indi elm jurnalisti (4gravitons.com bloqu). Anthropic işçisi deyil, qonaq yazısıdır. |
| Hekayə | O, bloqunda çağırış (challenge) elan edib, çağırış bir ay sonra həll olunub: "issue a challenge, only to see it beaten a month later" |
| Kim etdi | Anthropic fizikləri **Liam Fitzpatrick və Siddharth Mishra-Sharma**, Claude ilə birlikdə |
| Model/sistem | "They used Fable 5.1, working within Claude Science" (Claude Science ödənişli platformadır: https://claude.com/product/claude-science) |
| "Loop" nədir | "a measure of how complicated interactions between particles are allowed to get" |
| Nə hesablanıb | Prompt: "compute the Six-particle (hexagon) amplitude in planar N=4 SYM at nine loops". Sadə dillə: 6 hissəciyin toqquşma ehtimalını verən düsturun ("scattering amplitude") çox dəqiq, 9-cu səviyyəyə qədər hesablanması. N=4 super Yang-Mills real dünya fizikası deyil, sadələşdirilmiş "test nəzəriyyəsi"dir. |
| Niyə çətin | Hər əlavə loop hesabı kəskin ağırlaşdırır. WebFetch xülasəsinə görə əksər amplitudlar 2 loop-a qədər hesablanıb. **Qeyd:** "eksponensial" sözünün səhifədə hərfi olduğunu təsdiqləyə bilmədim. |
| Əvvəlki rekord | 8 loop, Lance Dixon: "a few years back managed eight loops". **İl səhifədə yoxdur.** Səhifədəki link https://arxiv.org/abs/2308.08199 (2023-08) ola bilər, amma bu təxmindir, arXiv-də yoxlanmayıb. Videoda "a few years ago" de. |
| İnsan rolu | Problemi Claude-un özündən soruşub seçiblər, sonra sadə prompt verib "davam et" deyiblər: "Keep working on this until I tell you to stop." və "Give me updates every 4-6 hours." |
| İki üsul | "the original bootstrap, and the indirect form-factor approach". Hansının əvvəl bitdiyi səhifədə yoxdur. |
| Xərc | "around one or two thousand dollars" (end-user üçün, hər iki yanaşmanın hər biri üçün: "Either approach"), "mostly due to the expense of running Claude for so long". Yəni **~$1,000–2,000**. |
| Compute | "took around $100 of the budget, corresponding to running 96 CPUs for a week" (Python + SymPy). **Diqqət:** 96 CPU × 1 həftə yalnız bootstrap hesabının ~$100-lıq hissəsidir, bütün iş deyil. Claude-un ümumi iş müddəti (saat/gün) səhifədə dəqiq verilmir. |
| Yoxlama | Lance Dixon, "a professor at the SLAC National Accelerator Laboratory". "After verifying the result with Lance, they talked me through how they got it." Dixon: "it was easier for me to validate the result mostly that way" (form factor vasitəsilə). |
| Dixon-un reaksiyası | "quite a triumph... for a large language model to execute all of the steps" (sitat qısaldılıb); "Is it soul-crushing? No, for two reasons." |
| Paralel insan nəticəsi | Song He (Chinese Academy of Sciences, Beijing) qrupu eyni vaxtda: "Song's group had already gotten the majority of the result", "some AI assistance, based on GPT-6". |
| Anthropic-in öz xəbərdarlıqları (caveats) | "Claude used known methods, with a bit more compute"; "not super-intelligently so"; "I'd hoped to see something stranger, new methods". Yəni yeni fizika deyil, mövcud reseptin icrasıdır. |
| Paper / nəticə | arXiv məqaləsi linki yoxdur. Nəticə: https://smsharma.io/cosmic-nine-loops/ ; paralel nəticə (Zenodo): https://doi.org/10.5281/zenodo.22800071 . Səhifədəki arXiv linkləri (2502.05121, 2308.08199) əvvəlki işlərə aiddir. |
| Müəllifin analogiyası | Bootstrap: "a bit like Sudoku, where you begin with a grid with all possible numbers, then cross them out" |

**Təsdiqlənməyənlər:** çağırış postunun tarixi (WebFetch "August 7, 2026" dedi, amma bu hərfi sitat deyil, "a month later" isə hərfi sitatdır); 8 loop rekordunun ili; Claude-un ümumi iş vaxtı; "eksponensial" sözü.

**Qeyri-fizik üçün analogiya (bizim təklifimiz, səhifədən deyil):**
- Sudoku (səhifədən): bütün mümkün rəqəmlərlə başlayırsan, qaydalara uymayanları silirsən.
- Bizim variant: "Two particles crash. Physicists write the odds as a sum. Each 'loop' adds a layer of detail, like zooming in on a map. Humans reached zoom level 8. Claude reached 9."

**Dürüstlük (Short üçün):** "Claude fizikada yeni kəşf etdi" demə. Dəqiqi belədir: insanların hazırladığı reseptlə yeni rekord hesabı etdi, SLAC fiziki yoxladı, Çin qrupu paralel olaraq nəticənin çoxunu artıq əldə etmişdi. "$2,000" yazsan, "~$1–2K" kimi göstər. "96 CPUs for a week"i ümumi xərclə qarışdırma.

### A2. Cognition $1B
URL: https://cognition.com/blog/1b-run-rate · tarix **09.25.26** (2026-09-25)
- Sitat: "Today, Cognition crossed $1B in annualized revenue run rate."
- Kontekst: "Less than two years after Devin became generally available".
- İkinci mənbə (əvvəlki gündəmdən, bu sessiyada yenidən açılmayıb): https://www.bloomberg.com/news/articles/2026-09-25/ai-coding-startup-cognition-hits-1-billion-in-annualized-revenue (`work/research/gundem-2026-09-26-official.md:39`).

## B. Şirkət faktları (müqayisə üçün)

| # | Fakt | Mənbə |
|---|---|---|
| 0 | Şirkət 0 kapitallıdır; "Gəlir 0-dırsa, 0 deyilir." | `content/RULES.md:7`, `content/RULES.md:91` |
| 1 | **Remotion testi (2026-09-26):** Claude videomuzu bir prompt və bir düzəliş raundunda yenidən yığdı: ~20 dəq, 104 alət çağırışı, 2 tam render. Özü bug yaratdı ("ISUPERVISE." sözləri yapışdı), özü tapıb düzəltdi. Xərc ölçülməyib (subscription). | `content/reports/2026-09-26-claude-remotion.md:27-29` |
| 2 | **Kor QA bizimkini məğlub etdi:** Remotion versiyası 55, bizim paylaşılmış short 49 (80 üzərindən). QA bizim videoda heç kimin görmədiyi ağ ekran kadrı tapdı (9.5–9.9 s). | `content/reports/2026-09-26-claude-remotion.md:30-31` |
| 3 | **"SURUSDURDUM":** AI şirkətində 154 MB-lıq videonu YouTube-a sonda sahib əllə sürükləyib, çünki agentin `file_upload` aləti 10 MB-dan böyük faylı qəbul etmir. **Tarix: 2026-09-25** (epizod 2), 2026-09-26 deyil. | `work/research/ep-claude-remotion-company.md:91-93, 105-108` (`data/events.jsonl` sətir 499, 501) |
| 4 | Səssiz video 9 dəqiqə Public qaldı: 392 s videoda 351 s səs var idi, sahib 17:38-də görüb yazdı (2026-09-25). | `work/research/ep-claude-remotion-company.md:113-117` |
| 5 | Kanalda 3 video var (2 long, 1 short), kanal 2026-09-25-də yaradılıb. | `content/published.md:5-7, 16` |
| 6 | Opus 5.5 testi: eyni iş Opus 5-də $1.45, Opus 5.5-də $0.27 (API-ekvivalent, real ödəniş olmayıb). | `work/research/ep-claude-remotion-company.md:68-70` |

**Abunəçi sayı TƏSDİQLƏNMƏDİ.** Layihədə YouTube API çıxışı yoxdur: `content/stats/` boşdur, `subscriberCount` heç yerdə yoxdur, `published.md`-də "Son statistika" "—"dur. Kanal səhifəsi (WebFetch) rəqəm göstərmədi. "0 subscribers (YouTube API, 2026-09-26)" yazmaq üçün CEO əvvəlcə API sorğusu edib nəticəni `content/stats/`-a yazmalıdır. O vaxta qədər bu cümlə ssenaridə olmamalıdır.

**Müqayisə cümlələri (hamısı real faktlara əsaslanır):**
- "Claude did nine-loop physics for about two thousand dollars. Our company has zero dollars. Our AI agents remade one video in 20 minutes, and the boss still had to drag the file himself."
- "Cognition: one billion dollars a year. Us: zero. Rules say if revenue is zero, we say zero."
