# Jev (TypeSafe AI): SEO və auditoriya araşdırması, news flash Short üçün

Tarix: 2026-09-25 · Kəşfiyyatçı

## 0. Vacib düzəliş: tarix
- Blog səhifəsində göstərilən tarix **"Sep 15, 2026"**-dır (https://typesafe.ai/blog/introducing-system-one-models-and-jev). Elan bu gün (09-25) edilməyib.
- HN-dəki əsas post da 2026-09-15 19:25 UTC tarixlidir (https://news.ycombinator.com/item?id=49717558).
- Nəticə: "bu gün elan etdi" demək olmaz. Doğru çərçivə: "10 gün əvvəl çıxdı, hələ də müzakirə olunur" və ya "bu həftə Jev klonları çıxır" (aşağıdakı HN postlarına bax).
- Tapşırıqdakı "HN ~674" əsas elan deyil. Bu, **"Jev in 25 Lines of Python"** postudur (675 xal). Əsas elanın xalı **1979**-dur (519 şərh).

## 1. Blogda təsdiqlənən faktlar (mənbə: typesafe.ai blog)
- Jev TypeSafe AI-ın ilk "System One Model"-idir. Ad Kahneman-ın sürətli, intuitiv düşüncə (System 1) anlayışından gəlir.
- Mətn yazmır. Mümkün cavablar və struktur əvvəlcədən təyin olunur. Hərfi sitat: "The model never makes type errors. All answers are accompanied with calibrated probabilities and confidence scores."
- Şirkətin öz iddiaları (müstəqil yoxlanmayıb): 70–500 ms cavab müddəti, müqayisəli tapşırıqlarda frontier modellərdən 40x–200x sürətli; input $0.042 / MTok, output "FREE"; real avtomatlaşdırma tapşırıqlarında "193.6x faster, 444.6x cheaper".
- Demolar: **Doom** (bot oyunun strukturlaşdırılmış state-inə baxıb real vaxtda qərar verir) və **Wikiracing** (hər addımda yüzlərlə link arasından seçim edir).
- Early access / waitlist mərhələsindədir.
- Blogda Claude və ya Anthropic adı çəkilmir. "Claude Jev" bağlılığı iddia olunmamalıdır.

## 2. YouTube autocomplete (suggestqueries, ds=yt, 2026-09-25)
| Sorğu | Təkliflər |
|---|---|
| `jev` | jev and claude, jev use cases, jevuex, jevil fight, jevil theme, jeven brus kiss me perfume, jevin x black, jevil, jev, jeux |
| `jev ai` | java ai programming, jev ain't easier, jev aitd, java ai, java ai projects, java airport, java aiub course solution, java ai agent, java ai tutorial, java ai tools |
| `typesafe ai` | (boş, təklif yoxdur) |
| `claude jev` | claude jev, jevite claude |
| `ai that doesn't talk` | (boş) |
| `structured output ai` | ai structured output, generative fill ps, structured singular value, sap2000 local axes, serialize binary tree, sap2000 foundation design |
| `new ai model` | new ai model, new ai model trend, new ai model 2025, new ai model prompt, new ai model video, new ai model kaise banaen, new ai model photo, new ai model 2026, new ai model photo kaise banaen, train |

Şərh:
- "jev" yazanda ilk iki təklif **"jev and claude"** və **"jev use cases"**-dir. Deməli Jev ilə bağlı YouTube axtarışı artıq var və Claude ilə müqayisə maraqlıdır. Ümumi axtarış həcmi isə məlum deyil. "Jevil" (Deltarune oyunu) kimi başqa mövzularla qarışır.
- "jev ai" YouTube-da "java ai"-ya düzəldilir. Başlıqda "Jev AI" yazmaq axtarışa az kömək edir, amma başlığa kontekst verir.
- "typesafe ai" və "ai that doesn't talk" üzrə təklif yoxdur. Şirkət adı YouTube-da hələ axtarılmır.
- "new ai model 2026" geniş və aktiv sorğudur (təxmini: yüksək həcm, çünki hazır təklif kimi çıxır).

## 3. Hacker News: nəyi maraqlı, nəyi şübhəli sayırlar
Əsas post: https://news.ycombinator.com/item?id=49717558 (1979 xal, 519 şərh). Qeyd: Algolia API şərh xallarını vermir. Aşağıdakılar HN-in göstərdiyi sıra ilə yuxarıdakı şərhlərdir, "ən çox bəyənilən" dəqiq ölçülməyib.

1. **Doom demosu əsas diqqəti çəkdi.** İlk şərhlərin çoxu videonun linkidir. Bir neçə nəfər yazıb ki, demonu görməyincə elanı satira sanırdılar (dgellow, jakintosh). Bir istifadəçi zarafatla "cheaterlər üçün aimbot" deyib (baist0).
2. **Praktik fayda: LLM çağırışlarını ucuzlaşdırmaq.** Bir şərhçi (jrickert) Jev-in LLM çağırışlarının 40–70%-ni əvəz edə biləcəyini güman edir (bu, şərhçinin öz təxminidir). Başqası oyun QA-sı üçün istifadəni təklif edir (caspar).
3. **Şübhə: marketinq və sübut.** Bəziləri demo videolarından kənar sübut istəyir (pennomi). Bir şərhçi marketinqi "misleading" adlandırır (bigglebear). Başqası soruşur: LLM chain-of-thought ilə çox token yaradanda sürət və qiymət müqayisəsi ədalətlidirmi (initsecret)?
4. **"Bu, sadəcə structured output deyilmi?"** Bir şərhçi xatırladır ki, LLM provayderləri artıq JSON schema-ya uyğunluğu məcbur edir. Onun fikrincə bu, tipli cavaba tələbat olduğunu göstərir (yunwal).
5. **Kalibrasiya və klon dalğası.** "Jev in 25 Lines of Python" postunda (675 xal, https://news.ycombinator.com/item?id=49812769) şərhçilər deyir ki, confidence score-ları düzgün kalibrləmək çətindir (_davide_). Başqa fikir: Jev-dən əvvəl həm sürətli, həm dəqiq ümumi təyinatlı classifier yox idi (ramon156). "25 sətir" başlığını isə yanıltıcı sayırlar (ricardobeat, iLoveOncall). Ayrıca "Jev Can't Be Calibrated" adlı tənqidi post da var (65 xal, https://www.alexmolas.com/2026/09/23/jev-cant-be-calibrated.html).

Digər əlaqəli HN postları (https://hn.algolia.com/api/v1/search?query=jev&tags=story):
- Kev: Qwen3.5 üzərində kiçik, Jev-ə bənzər model: 460 xal
- "OpenAI is well positioned to fast-follow Jev": 324 xal
- Jev-Leftpad: 233 xal
- "I turned Jev into a (lousy) chatbot": 177 xal
- JevBench: 145 xal

## 4. Açar sözlər (populyarlıq əlaməti ilə)
| Açar söz | Əlamət |
|---|---|
| jev | YT autocomplete-də var, amma Jevil/Deltarune ilə qarışır. Orta |
| jev and claude | "jev" üçün 1-ci YT təklifi. Güclü niş siqnal |
| jev use cases | "jev" üçün 2-ci YT təklifi. Güclü niş siqnal |
| new ai model 2026 | YT təklifi, geniş sorğu. Yüksək (təxmini) |
| ai structured output | YT təklifi. Niş, texniki |
| system one model | YT məlumatı yoxlanmayıb. Blogun rəsmi termini |
| ai without text / ai that doesn't talk | YT təklifi yoxdur. Yalnız təsvir üçün, axtarış üçün zəif |
| typesafe ai | YT təklifi yoxdur. Zəif, amma brend kimi teqdə qalsın |

## 5. Hook nümunələri (≤10 söz, ilk 2 saniyə)
1. "This AI plays Doom but can't write a sentence."
2. "A new AI model that never writes text."
3. "Hacker News thought this was satire. It's real."

(3-cü hook HN şərhlərinə, 1-ci isə blogdakı Doom demosuna əsaslanır.)

## 6. Başlıq variantları (≤60 simvol, "Jev" ilk 40 simvolda)
1. `Jev: The New AI Model That Never Writes Text` (44)
2. `Jev AI Plays Doom Without Writing a Word` (40)
3. `Jev vs Claude: AI That Answers With Types, Not Text` (51)

3-cü variant "jev and claude" autocomplete təklifinə uyğundur. Amma videoda birbaşa müqayisə göstərilməsə, başlıq vədini yerinə yetirmir. O halda 1-ci və ya 2-ci variantı seç.

## 7. Dürüstlük xəbərdarlıqları (ssenari üçün)
- "Bu gün elan edildi" demə. Elan tarixi 2026-09-15-dir.
- 40x–200x, $0.042/MTok, "0% hallucination" və "193.6x faster" şirkətin öz iddialarıdır. Ssenaridə "they claim" kimi təqdim et.
- Jev ilə Claude arasında rəsmi əlaqə yoxdur.
