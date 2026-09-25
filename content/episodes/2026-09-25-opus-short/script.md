# Opus 5.5 vs Opus 5: the 27-cent job (short, 9:16, long-dan kəsik)

**Söz sayı:** ~117 danışılan söz ("Opus 5.5" = 4 söz kimi sayılıb, `[pause]` sayılmır). **Təxmini müddət:** 117 / 2.5 ≈ 47 s, KAXO-nun yavaş sətirləri və 1 `[pause]` ilə **~48–50 s**.
**Kadr:** 10 shot, hər biri ~3–6.5 s. 1 yeni şəkil (s09), 4 long şəkli (s03, s33, s40, s64, hər biri 1 dəfə), 3 qrafik klip, 1 VS Code klipi, 1 ofis B-roll.
**Punchline:** s09, danışılan sözlərin 93–104-cü sözü (~80–89%). Son cümlə ("So yes, I'm upgrading, because...") hook-un ilk cümləsinə qayıdır.
**Əlaqəli long:** https://youtu.be/3RbuOZYm-ck (təsvirdə link).

**İdeya:** hook birbaşa hesabla açılır ($1.45 vs 27 sent), sonra eyni real iş, sürət, eyni test nəticəsi, fərqin səbəbi (5 vs 31 addım). Dönüş: ucuz model öz işini brauzerdə yoxlamayıb, KAXO bunda özünü görür.
**Real fakt:** `content/reports/2026-09-25-opus-5-5-test.md`.

| Shot | Vizual | Səs | Mətn (EN) | Mətn (TR altyazı) |
|---|---|---|---|---|
| s01 | klip `clips/bill-v.webm` @3 | narrator | One AI charged a dollar forty-five for this job. / The other charged twenty-seven cents. | Bir yapay zekâ bu iş için bir dolar kırk beş aldı. / Öbürü yirmi yedi sent aldı. |
| s02 | long `s03.png` (iki robot arası) | narrator / kaxo | Meet Opus 5 and Opus 5.5. / They work, and I supervise. | Karşınızda Opus 5 ve Opus 5.5. / Onlar çalışıyor, ben denetliyorum. |
| s03 | ofis `clips/office.webm` (crop, sharp) | narrator | Each got one try at the same real dashboard job. | İkisi de aynı gerçek dashboard işini birer kez denedi. |
| s04 | klip `clips/race-v.webm` @3 | narrator | Opus 5.5 was done in fifty-three seconds. / The older model took two hundred and sixty-five. | Opus 5.5 elli üç saniyede bitirdi. / Eski model iki yüz altmış beş saniye sürdü. |
| s05 | long `s33.png` (stopwatch) | kaxo | I can't find my remote that fast. | Ben o sürede kumandamı bile bulamam. |
| s06 | klip `clips/tests-v.webm` @3 | narrator | Yet both passed all eighteen hidden tests. | Yine de ikisi de on sekiz gizli testin hepsini geçti. |
| s07 | long `s40.png` (kağız qalağı) | narrator | The new one took five steps, not thirty-one. / Fewer steps mean a smaller API bill. | Yenisi otuz bir değil, beş adımda bitirdi. / Daha az adım, daha küçük API faturası demek. |
| s08 | klip `clips/code-opus-5-5.mp4` (crop) | narrator | But it never checked its page in a browser. | Ama sayfasını tarayıcıda hiç kontrol etmedi. |
| s09 | YENİ 2:3: KAXO divanda robotu qucaqlayır, kövrəlib | kaxo (0.88) | **It skipped checking its own work. [pause] I've never felt so seen.** | Kendi işini kontrol etmeyi atladı. [pause] Kendimi hiç bu kadar anlaşılmış hissetmemiştim. |
| s10 | long `s64.png` (möhür) | narrator / kaxo (0.9) | The full test is in the long video. / So yes, I'm upgrading, because... (loop → s01) | Testin tamamı uzun videoda. / Yani evet, yükseltiyorum, çünkü... |

## Yoxlama
- **§3 quruluş:** hook 0–2 s şok rəqəmlə ($1.45), salam və loqo yoxdur · setup s02–s03 · eskalasiya s04–s08 (53 s vs 265 s, 18/18, 5 vs 31 addım) · punchline s09 (~80%) · loop: "because..." → "One AI charged a dollar forty-five..." ✓. Ofis B-roll 1 kadr (s03) ✓. KAXO-nun 5 fərqli səhnəsi (s02, s05, s09, s10 + s07 fonu) ✓. Tanıtım deyil, mövzu model müqayisəsidir ✓.
- **§3a danışıq:** `[pause]` 1 dəfə, yalnız punchline-dan əvvəl ✓ · ən uzun cümlə 10 söz (≤ 12) ✓ · nöqtə ilə doğranmış fraqment yoxdur ✓ · qısaltmalar (can't, I've, I'm) ✓ · ardıcıl cümlələr eyni sözlə başlamır ✓ · interjection 1 ("So yes") ✓ · long-dan köçürülmüş cümlə yoxdur, yalnız punchline eynidir ✓.
- **§5 dürüstlük:** bütün rəqəmlər hesabatdan (265/53 s, 31/5 addım, $1.45/$0.27, 18/18). Dollar rəqəmləri API-ekvivalentdir: "smaller API bill" deyilir, subscription qeydi təsvirdə olmalıdır. "One try" = hər modelə 1 run.
- **§12 monetizasiya:** orijinallıq ✓ (yeni hook, yeni cümlələr, yeni punchline kadrı) · reused ✓ (başqasının materialı yoxdur) · reklamçı dostu ✓ · hüquqlar ✓ (öz qrafiklər, öz ofis, ChatGPT şəkilləri, Kokoro) · risk: aşağı.
- **§15 türkcə:** hər line-da `text_tr`, rəqəmlər eyni, danışıq dili.

**Təsvir üçün (SEO mərhələsinə):** long-un linki + "Costs are API-equivalent from Claude Code logs; we ran it on a subscription. One run per model." sətri.
