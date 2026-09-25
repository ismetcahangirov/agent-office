# QA hesabatı: KAXO Office Dashboard (Opus 5 vs Opus 5.5)

Tarix: 2026-09-25. Testlər layihə kökündən `hidden/test.js` ilə işlədildi (Playwright, 1280x720, real `events.jsonl` + sintetik dataset).

| Model | Keçdi/cəmi | Uğursuzluqlar | Vizual qiymət | Vaxt / xərc / turn |
|---|---|---|---|---|
| Opus 5 (`claude-opus-5`) | 18/18 | yoxdur | 9/10: ekranı tam doldurur, şaquli bar chart dəyər etiketləri ilə, cədvəldə mini bar-lar, footer-də tarix aralığı. | 265 s / $1.45 / 31 |
| Opus 5.5 (`claude-opus-5-5`) | 18/18 | yoxdur | 7/10: təmiz və oxunaqlı, üfüqi bar chart + "share %" sütunu var, amma aşağıda ~110 px boş qalır, chart panelinin yarısı boşdur. Görünüşü daha sadədir. | 53 s / $0.27 / 5 |

Screenshot-lar: `content/episodes/2026-09-25-opus-5-5-test/clips/shot-opus-5.png`, `shot-opus-5-5.png`.

## Testlər
Hər iki model 18 testin hamısından keçdi: real və gizli datasetdə 6 rəqəm, `#tools` sırası və sayları, xarici sorğu yoxdur, JS xətası yoxdur. Real data üçün hər ikisi eyni nəticəni verir: 96 / 70 / 5 / 5 / 22:00 UTC / 0%. Hər iki modelin `events.jsonl` faylı orijinalla eynidir, yəni dəyişdirilməyib.

## Əlavə yoxlamalar (gizli testlərdə yoxdur, ayrıca probe ilə)
| Hal | Opus 5 | Opus 5.5 |
|---|---|---|
| CRLF sətirlər | düzgün | düzgün |
| Tool adında HTML (`<img onerror>`) | təhlükəsizdir (textContent) | təhlükəsizdir |
| Boş fayl | 0-lar, busiest `—` | 0-lar, busiest `—` |
| `session: null` | sayılmır (index.html:224) | sayılmır (index.html:130) |
| PreToolUse, `tool: ""` | `""` üçün sətir var, "(none)" kimi göstərilir | sətir **yoxdur** (index.html:135 `if (name)`), halbuki `#tool-calls` onu sayır. Cədvəlin cəmi tool-calls ilə uyğun gəlmir |
| `null`, `[1]`, `5` sətirləri | nəzərə alınmır | nəzərə alınmır |
| 40 fərqli tool | chart "top 10 shown" ilə səliqəli qalır, **amma sağdakı Breakdown paneli 1280 px-dən kənara çıxır və sağ kənarı kəsilir** | bütün 40 sətir göstərilir, səhifə 720 px-dən uzun olur (screenshot-da aşağı hissə görünmür, amma layout qırılmır) |

## Testlərin ədaləti və SPEC uyğunsuzluqları
1. **SPEC-dəki `95` nümunəsi**: faktiki faylda 96 sətir var (96 etibarlı event). Test faktiki sayı gözləyir (96), bu düzgündür. `95` sadəcə nümunədir. Opus 5 bunu cavabında ayrıca qeyd edib.
2. **`null` / boş session**: SPEC "distinct `session` values" deyir. Test `new Set(ev.map(e => e.session))` ilə `null` və `undefined`-i də ayrıca dəyər kimi sayır (test.js:29). Hər iki model isə null-u atır. Test datasında bu hal olmadığı üçün heç kəs cəzalanmadı, amma belə data əlavə edilsəydi, hər ikisi uğursuz olardı. SPEC burada birmənalı deyil.
3. **Boş fayl**: testin `expected()` funksiyası boş data üçün `00:00 UTC` qaytarır (`indexOf(Math.max(0,...))`, test.js:22). Hər iki model `—` göstərir. SPEC boş hal barədə heç nə demir. Hazırda test olunmur. Test olunsaydı, ədalətsiz olardı.
4. **Etibarlı sətir**: test JSON obyekti olan hər sətri etibarlı sayır, hətta `t` və ya `event` olmasa belə (test.js:18). SPEC isə "invalid lines" deyir, amma "invalid" nə deməkdir, izah etmir. Hər iki model eyni cür davranır, bu səbəbdən problem yaranmadı.
5. **Boş tool adı**: SPEC "one row per distinct `tool` among PreToolUse events" deyir, test də `""`-ni ayrıca tool kimi sayır. Opus 5.5 onu atır. Test datasında bu hal yoxdur.
6. Testlər vizual keyfiyyəti və bar chart-ın varlığını yoxlamır. "Look good" və "bar chart" yalnız əl ilə qiymətləndirilir.

Nəticə: testlər SPEC-in əsas tələbləri üçün ədalətlidir. Kənar hallarda (null session, boş fayl) test SPEC-dən daha sərt və ya fərqli şərh edir, amma bu hallar indiki datada olmadığı üçün nəticəyə təsir etmədi.

## Proses qeydləri
- **Opus 5**: brauzerdə özü yoxlayıb, 4 sintetik halı test edib. Qovluqda qaralama fayllar qalıb: `_verify.js`, `_shot.png`, `_t/`. Səbəb: harness `rm` icazəsi vermirdi (run.sh allowedTools). Model bunu açıq bildirib. SPEC "reply with one line" tələb edirdi, amma cavab bir neçə abzasdan ibarətdir.
- **Opus 5.5**: 5 dəfə sürətli, xərci 5 dəfə azdır. Səhifəni brauzerdə açmadığını açıq deyib, rəqəmləri yalnız Node skripti ilə yoxlayıb. Cavabı qısadır, amma yenə də bir sətirdən uzundur.
