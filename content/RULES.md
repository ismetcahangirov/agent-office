# Kontent qaydaları

`/video` skill-i və bütün agentlər bu fayla əməl edir. Qayda dəyişəndə əvvəlcə bu fayl yenilənir.

## 1. Kanal konsepti
**"KAXO runs a company. Every employee is an AI. He does nothing."**
Kaktus KAXO 0 kapitallı şirkətin sahibidir. İşçiləri Claude Code agentləridir: CEO, Kəşfiyyatçı, Qurucu, QA, Marketoloq. Onlar real iş görür, KAXO isə divanda uzanır.

Kontent üç qatdan ibarətdir:
1. **Sitcom qatı:** KAXO-nun cizgi səhnələri, zarafat, personaj.
2. **Gündəm qatı:** AI dünyasında son dəyişikliklər: yeni modellər, alətlər, buraxılışlar (§13). KAXO və işçiləri bunlara reaksiya verir, sınayır, izah edir.
3. **Real qat:** şirkətdə həqiqətən baş verənlər: agentlərin real tapşırıqları, testləri, səhvləri, rəqəmləri, ofis görüntüsü.

Hər video ən azı bir **real** faktdan çıxır: təsdiqlənmiş xəbər (`content/news/`), şirkət hadisəsi (`data/events.jsonl`, `work/`) və ya real test nəticəsi.

- **Auditoriya:** ingilisdilli, 18–35 yaş, texnologiya ilə maraqlanan, developer, solo sahibkar.
- **Dil:** ingilis dili. Qeydlər və hesabatlar Azərbaycan dilindədir.

Xarakterin təfərrüatları: [character/character.md](character/character.md).

## 2. Formatlar
| Format | Ölçü | Uzunluq | Tezlik | Növ |
|---|---|---|---|---|
| **Long** | 1920×1080 | 6–10 dəq | həftədə 1 | "KAXO's employees tested X", model izahı, həftənin AI xəbərləri |
| **Short: news flash** | 1080×1920 | 30–50 s | həftədə 1–2 | təzə xəbər + KAXO-nun reaksiyası (ilk 48 saat) |
| **Short: long-dan kəsik** | 1080×1920 | 30–55 s | hər long-dan 1–2 | long-un ən güclü anı, yeni hook ilə |
| **Short: ofis/sitcom** | 1080×1920 | 30–55 s | həftədə 0–1 | şirkət hekayəsi |

**Həftəlik plan:** 1 long + 3 short (cəmi 4 video). YPP üçün izlənmə saatını long videolar gətirir (§12), kəşfi və abunəçini short-lar.

## 3. Short-un quruluşu
1. **0–2 s, hook:** ilk kadr və ilk cümlə sualla, şokla və ya absurd vəziyyətlə tutur. Salamlaşma, loqo, "in this video" olmur.
2. **Setup (2–10 s):** vəziyyət. KAXO bir şey istəyir və ya agentlər bir iş görür.
3. **Eskalasiya (10–35 s):** real hadisə və ya rəqəm, agentlərin reaksiyası, gərginlik artır.
4. **Punchline (videonun ~80%-i):** gözlənilməz dönüş. Adətən KAXO-nun tənbəlliyi və ya agentlərin ondan ağıllı çıxması.
5. **Loop sonu:** son cümlə ilk kadra qayıdır, beləcə video dövrə vurur.

**Tanıtım videosu deyil (sahib, 2026-09-25):** "Bizim şirkət/KAXO belədir" tipli özünü təqdimat videosu çəkilmir. İlk epizod (day-one) məhz bu səbəbdən paylaşılmadı. Hər video bir **mövzu** haqqındadır: xəbər, alət testi, konkret hadisə, izləyiciyə faydalı nəticə. Şirkət və KAXO fon və bucaqdır, mövzunun özü deyil. Yoxlama: başlıqdan "KAXO" və "my company" sözlərini çıxaranda da video maraqlı qalırmı?

Əlavə qaydalar:
- 6–12 kadr olur. Kadr hər 2–4 saniyədə dəyişir.
- 1–2 kadr real ofis görüntüsüdür (B-roll).
- Hər videoda **bir ideya** olur. Diktor sənədli film ciddiliyi ilə danışır, KAXO tənbəl, quru tonla. Kontrast yumor yaradır.
- Cümlələr qısadır (≤ 12 söz), danışıq dilindədir. Hər cümlə ekranda altyazı olacaq.

## 3a. Danışıq tərzi: axıcı, insani, yumorlu

**Fasiləsiz axın (sahib iki dəfə "duraksama çoxdur" dedi):** səs demək olar ki, arasız axmalıdır.
- `[pause]` videoda ən çox 1 dəfə, yalnız əsas punchline-dan əvvəl işlədilir.
- Qısa cümlələri nöqtə ilə doğrama: "Day one. First task." əvəzinə "On day one, the first task was simple." Hər nöqtə kiçik fasilə deməkdir.
- `tts.py` sükutu özü idarə edir (cümlə-cümlə sintez, quyruq kəsmə). Montajdan sonra sükut payı 10%-dən çox olmamalıdır. Yoxlama skripti `/video` 7-ci addımındadır.
Məqsəd izləyicinin videonu tərk etməməsidir. Mətn "oxunan mətn" kimi yox, "danışılan söhbət" kimi yazılır.

- **Qısaltmalar həmişə:** "I'm", "don't", "it's", "we're", "gonna". "I am not going to" robot kimi səslənir.
- **Ritm dəyişir:** qısa zərbə cümləsi, sonra bir az uzun cümlə, sonra yenə qısa. Eyni uzunluqda üç cümlə ardıcıl gəlmir.
- **Komik fasilə:** punchline-dan əvvəl `[pause]` və ya `...` qoyulur. Məsələn: "They finished the whole website. [pause] I finished my nap."
- **Understatement və quru yumor:** KAXO heç vaxt bağırmır, hər şeyi azaldaraq deyir. Məsələn: "Productivity is up 400%. Mine is not."
- **Birbaşa müraciət:** izləyiciyə "you" ilə danışılır, ritorik sual verilir. Məsələn: "You ever hire someone smarter than you? Yeah. Five times."
- **Interjection-lar ölçülü:** "Honestly.", "Anyway.", "Look.", "Okay so" kimi sözlər videoda ən çox 2 dəfə.
- **Callback:** əvvəl deyilən zarafat sonda qayıdır. Loop-a da kömək edir.
- **Qadağandır:** siyahı kimi sadalamaq ("Firstly… Secondly…"), rəsmi sözlər ("utilize", "furthermore", "in conclusion"), "In this video", "Let's dive in", eyni sözlə başlayan ardıcıl cümlələr.
- **Rollar:**
  - **Diktor:** sənədli film ciddiliyi, bir az rəsmi. Yumor onun ciddiliyi ilə KAXO-nun tənbəlliyi arasındakı kontrastdan gəlir.
  - **KAXO:** yavaş, bezgin, rahat, özündən razı. Cümlələri qısadır, tez-tez yarımçıq qalır ("I was gonna help, but…").
- **Səs testi:** ssenari yazıldıqdan sonra hər cümlə sanki ucadan oxunur. Dil ilişirsə, cümlə dəyişdirilir.
- **Səs parametrləri:** `character.md` → "Səs". Per-line `speed` komik anlar üçündür, məsələn 0.85 ən bezgin cümlə üçün.

## 3b. Long videonun quruluşu (6–10 dəq)
1. **0–30 s, hook + vəd:** ən maraqlı nəticəni və ya sualı dərhal göstər ("We gave this new model our hardest task. It… did not go well."). Sonra izləyicinin sonda nə alacağını de. Uzun giriş, salam və "subscribe" olmur.
2. **Fəsillər:** 3–6 fəsil, hər biri ≥ 60 s. Hər shot-da `"chapter"` sahəsi olur, `tools/video/chapters.py` fəsil siyahısını çıxarır.
3. **Hər 30–60 saniyədə "pattern interrupt":** KAXO-nun zarafatı, ofis görüntüsü, ekran yazısı, rəqəm qrafiki. Eyni tip kadr 20 saniyədən çox davam etmir.
4. **Açıq döngülər:** "We'll see the score in a minute…" kimi vədlər verilir və mütləq yerinə yetirilir.
5. **Real test hissəsi:** agentlərin aləti real sınadığı yer: ofis görüntüsü, ekran yazısı (`tools/video/record_page.js`), nəticə cədvəli. Videonun ürəyi budur və monetizasiya üçün "orijinal dəyər" də budur (§12).
6. **Nəticə + KAXO-nun hökmü (son 60 s):** qısa, dürüst yekun. Sonra növbəti videoya körpü. Son 20 saniyədə end screen üçün sakit kadr olur.
7. **Danışıq:** §3a eynilə keçərlidir. Diktor aparıcıdır, KAXO şərh edir. Diktor 3–4 cümlədən çox fasiləsiz danışmır.

## 4. Vizual qaydalar
- **Stil:** `character.md`-dəki sahib prompt-u, dəyişmədən. Adult cartoon sitcom üslubu: kobud əl xətti, düz rənglər, qalın konturlar.
- **Şəkillər:** short üçün şaquli 2:3 (1024×1536), long üçün üfüqi 3:2 (1536×1024). Hər səhnə prompt-u **ardıcıllıq bloku** ilə bitir, blokdakı `{ASPECT}` formata görə doldurulur, referans şəkil həmişə əlavə olunur.
- **Poza kitabxanası:** `content/character/poses/`. Uğurlu KAXO şəkilləri təkrar istifadə üçün saxlanılır. Bir epizodda kitabxanadan ən çox 50% kadr götürülür (README-yə bax).
- **Ekran yazısı (long):** yeni alətin və ya modelin rəsmi səhifəsi, demo, nəticə. Hər klip ≤ 15 s, üstündə KAXO və ya diktorun şərhi olur (şərh və tənqid məqsədi, §13).
- **Kompüter ekranı:** VS Code-da agentin real kodunun yazılması (`tools/video/type_code.py`), terminal, proqram pəncərəsi (`tools/video/record_screen.py`). Yalnız real iş göstərilir. Kadrda şəxsi məlumat, sir və bildiriş olmur.
- **Stock video:** yalnız Pexels və Pixabay (pulsuz lisenziya, `tools/video/stock.py`), epizodun ≤ 20%-i. Müəllif `clips/stock.json`-da saxlanılır və təsvirdə göstərilir. Stock görüntü "bizim ofis" kimi təqdim olunmur. API açarları yalnız `.env`-dədir.
- **Fon:** sadədir: ofis, divan, server otağı, kafe. Detal az olur, çünki xarakter ön plandadır.
- **Mətn:** şəkillərdə mətn olmur, mətni altyazı verir. İstisna: səhnə üçün lazım olan ekran və ya lövhə.
- **Ofis B-roll:** yalnız real hadisələrdən çəkilir (`node demo.js --replay ... --speed N` + `tools/video/record_office.js`). Ssenarili demo görüntüsü videoya **düşmür**.
- **Altyazı:** böyük, qalın, BÖYÜK HƏRFLƏRLƏ. KAXO-nun sözləri yaşıl, diktorunku ağ (`tools/video/subs.py`).
- **Musiqi:** yalnız `content/music/` qovluğundan. Oradakı hər faylın lisenziyası `content/music/LICENSES.md`-də yazılmalıdır. Musiqi yoxdursa, video musiqisiz çıxır.

## 5. Dürüstlük
- Şirkət haqqında rəqəm, müştəri, gəlir və nəticə **yalnız real** ola bilər. Gəlir 0-dırsa, 0 deyilir.
- Sitcom səhnələri uydurma ola bilər (KAXO-nun yuxusu, fantaziyası), amma real fakt kimi təqdim olunmur.
- AI istifadəsi gizlədilmir. Kanalın ideyası elə budur.

## 6. Qadağalar
- Başqa brendlərin personajları, müəllif hüquqlu musiqisi, film parçaları.
- Loqolar yalnız mövzunu göstərmək üçündür: məsələn, video Claude haqqındadırsa, Claude loqosu. Loqo dəyişdirilmir, brendin KAXO-nu dəstəklədiyi təəssüratı yaradılmır.
- Real insanlar, siyasət, din, faciələr.
- Spirt, narkotik, siqaret. Kanal reklamçılar üçün təhlükəsiz qalmalıdır.
- Şablonla kütləvi istehsal. YouTube "inauthentic content" siyasətinə görə hər video yeni ideya, yeni ssenari, yeni kadrlar olmalıdır. Eyni ssenarini söz dəyişib təkrarlamaq olmaz.
- Clickbait yalanı: başlıq və thumbnail videoda olmayan şeyi vəd etmir.

## 7. Şəkil generasiyası (ChatGPT, brauzer)
- **Brauzer:** Claude in Chrome, `chatgpt.com`. Hesaba **sahib özü** daxil olur. Claude parol yazmır, hesab yaratmır.
- **Hər epizod üçün bir yeni söhbət:** birinci mesajda referans şəkil, stil prompt-u və xarakter təsviri gedir. Sonrakı mesajların hər biri bir kadrdır.
- **Yoxlama:** hər şəkil yoxlanılır: xarakter referansa uyğundurmu, artıq mətn və ya barmaq xətası varmı. Bir kadr ən çox 2 dəfə yenidən yaradılır.
- **Şəkillər harada:** `content/episodes/<epizod>/images/<kadr id>.png`. Başqa format gəlsə, PNG-yə çevrilir.
- **Limit bitəndə:** Claude dayanır və sahibə neçə kadrın qaldığını bildirir. Sahib özü başqa hesaba keçə və ya limitin yenilənməsini gözləyə bilər. Sonra `/video davam` yalnız çatışmayan kadrları yaradır. Claude hesablar arasında özü keçid etmir.
  - Qeyd: bir neçə pulsuz hesabla limiti keçmək OpenAI şərtlərinə ziddir və hesabların bloklanmasına səbəb ola bilər. Risk sahibin qərarıdır.

## 8. SEO (YouTube)
- **Başlıq:** ≤ 60 simvol, maraq oyadır. Əsas açar söz ilk 40 simvolda olur ("AI employees", "AI agents", "AI company" və s.). Emoji ən çox 1 olur. Bütün sözlər böyük hərflə yazılmır.
- **Açar söz araşdırması:** YouTube autocomplete (`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=<söz>`) və oxşar videoların başlıqları. Seçilən açar sözlər hesabata yazılır.
- **Təsvir:**
  - 1-ci sətir hook-dur və açar sözü daşıyır (axtarışda görünən hissə).
  - 2–3 cümlə kontekst verir: "KAXO's company is run entirely by AI agents…"
  - Real hissə üçün bir sətir: bu epizodda agentlərin real olaraq nə etdiyi.
  - Long videoda fəsillər (`00:00 …`) olur.
  - Hashtag-lardan əvvəl şəffaflıq sətri: "Made with AI tools; stories based on a real AI-agent company." (§12)
  - Sonda 3–5 hashtag: `#shorts` (short üçün), `#ai`, `#aiagents` və mövzuya uyğun 1–2 hashtag.
- **Tag-lar:** 8–15 ədəd: açar söz variantları və kanal adı.
- **Kateqoriya:** Comedy. Epizod daha çox izaha əsaslanırsa, Science & Technology.
- **Parametrlər:**
  - Dil: English.
  - "Made for kids": No.
  - Altyazı: `subs/captions.srt` yüklənir.
- **Altered/synthetic content:** cizgi filmi real görünmədiyi üçün "No". Real insana bənzər səs və ya görüntü olsa, "Yes".
- **Thumbnail:** [THUMBNAILS.md](THUMBNAILS.md) qaydaları, `/thumbnail` skill-i ilə hazırlanır.
- **Playlist:** "KAXO's AI Company".
- Hamısı `seo.json`-a yazılır.

## 9. Nəşr
- **Sahibin açıq təsdiqi olmadan heç nə paylaşılmır.** Claude videonu açır, sahib baxır və "təsdiq" deyir.
- Birinci platforma YouTube-dur (Studio, brauzer, sahibin hesabı). TikTok və Instagram sonra əl ilə və ya ayrıca razılaşma ilə.
- Paylaşılan hər video `content/published.md`-yə yazılır (tarix, başlıq, URL, epizod qovluğu).

## 10. Statistika və dərslər
- Paylaşılmasından ≥ 48 saat keçmiş videoların statistikası YouTube Studio-dan toplanır:
  - baxış;
  - orta baxış müddəti;
  - baxılma faizi (retention);
  - CTR (long üçün);
  - like, şərh, abunəçi artımı;
  - Shorts feed-də "viewed vs swiped away".
- Xam rəqəmlər `content/stats/YYYY-MM-DD.json`-a, nəticələr `content/lessons.md`-yə yazılır.
- **Dərs** ən azı 2 videonun müqayisəsindən çıxır. Bir video əsasında qayda yazılmır, yalnız "müşahidə" yazılır.
- Növbəti ssenari yazılmazdan əvvəl `lessons.md` oxunur.

## 11. Hesabatlar və təmizlik
- Hər epizodun araşdırma və istehsal hesabatı `content/reports/YYYY-MM-DD-<slug>.md`-dədir. Subagentlərin tapdıqları, mənbələr, açar sözlər, problemlər oraya yazılır.
- `content/reports/`-da **ən son 10 hesabat** qalır. Köhnəsi silinməzdən əvvəl oradakı faydalı nəticələrin `lessons.md`-də və ya `ideas.md`-də olduğu yoxlanılır.
- Paylaşılmış epizodlarda 30 gündən sonra ara fayllar (`audio/*.wav`, `clips/`, `video/_segments`) silinir. `final.mp4`, `episode.json`, `script.md`, `seo.json`, `images/` qalır.

## 12. YouTube monetizasiyasına uyğunluq (YPP)
Mənbələr (yoxlanıb 2026-09-25): [YPP tələbləri](https://support.google.com/youtube/answer/72851), [kanal monetizasiya siyasəti](https://support.google.com/youtube/answer/1311392), [reklamçı dostu qaydalar](https://support.google.com/youtube/answer/6162278), [ölkələr](https://support.google.com/youtube/answer/7101720). Qaydalar dəyişir, hər rübdə yenidən yoxlanılır.

**Qoşulma həddi (ikisindən biri):**
- 1 000 abunəçi + son 12 ayda 4 000 izlənmə saatı (long video);
- 1 000 abunəçi + son 90 gündə 10 milyon Shorts baxışı.

Shorts yolu çətindir, çünki 10M baxış lazımdır. Buna görə long video 10 short-u gözləmədən, **auditoriya yarananda** başlayır (§2). 4 000 saat long videolarla daha realdır.

**Digər şərtlər:**
- Google hesabında 2-Step Verification;
- aktiv Community Guidelines "strike" olmamalıdır;
- AdSense hesabı;
- yaşayış ölkəsi YPP siyahısında olmalıdır. Azərbaycan siyahıdadır, qoşulmazdan əvvəl yenidən yoxla.

**Ən böyük risk: "inauthentic content" (iyul 2025).** YouTube şablonla kütləvi istehsal olunan, "creator-un orijinal baxışı olmayan" AI kontentini monetizasiyadan çıxarır. Rəyçilər kanalın **əsas mövzusuna, ən çox baxılan, ən yeni və ən çox izlənmə saatı olan videolarına** baxır. Buna görə:
1. **Hər video orijinaldır:** yeni ideya, yeni ssenari, yeni səhnələr. Eyni skeleti söz dəyişib təkrarlamaq qadağandır. `/video` son 10 epizodla müqayisə edir.
2. **Orijinal baxış mütləqdir:** hər videoda real şirkət hadisəsi və ya KAXO-nun öz baxışı olur. Heç vaxt "AI səs + başqasının mətni" olmur. Başqa mənbəni oxumaq qadağandır (reused content).
3. **Yaradıcı iş görünür:** personaj, dialoq, komik fasilələr, hər epizoda xas vizual. Şəkil slayd-şousu + diktor formatı kifayət etmir. Hər videoda KAXO-nun ən azı 2 fərqli səhnəsi və real ofis görüntüsü olur.
4. **Sahib hər videoya baxıb təsdiqləyir** (§9). Bu, insan nəzarəti və keyfiyyət süzgəcidir.
5. **Tezlik keyfiyyətdən sonra gəlir:** həftədə 3 short maksimumdur. Gündə 10 video kimi "mass production" siqnalı verilmir.
6. **Kanalın mövzusu sabitdir:** KAXO + AI şirkəti. Mövzudan kənar videolar əsas mövzunu bulandırır.

**Hüquqlar (reused content və copyright):**
- **Şəkillər:** ChatGPT, sahibin hesabı. OpenAI şərtlərinə görə çıxış istifadəçiyə məxsusdur.
- **Səs:** Kokoro (Apache-2.0), kommersiya istifadəsinə açıqdır.
- **Şrift:** Anton (OFL).
- **Ofis görüntüsü:** öz proqramımızdır.
- **Musiqi:** yalnız lisenziyası `music/LICENSES.md`-də olanlar.
- **Başqasının videosu, filmi, mem şablonu yoxdur.**

**Reklamçı dostu məzmun (tam gəlir üçün):**
- Söyüş yoxdur, xüsusən ilk 7 saniyədə, başlıqda və thumbnail-də. Ümumiyyətlə yoxdur, "damn"-dan başqa.
- Spirt, narkotik, zorakılıq, qan, şok, cinsi eyham, siyasi və ya dini mübahisə yoxdur (§6).
- Başlıq və thumbnail aldatmır (metadata siyasəti). Tag-larda spam və ya başqa kanal adı olmur.
- Mövzu uşaqlar üçün deyil: "Made for kids: No", çünki cizgi film olsa da auditoriya 18+ yaşdır.

**AI açıqlaması:** YouTube "altered or synthetic content" etiketini real görünən insan, yer və ya hadisə üçün tələb edir. Cizgi KAXO üçün "No". Real insana bənzər səs və ya görüntü olsa, "Yes". Təsvirdə bir sətir şəffaflıq üçündür: "Made with AI tools; stories based on a real AI-agent company."

**Monetizasiya yoxlaması** (`/video`, 4-cü və 9-cu addımlar): hər epizod üçün hesabata yazılır:
`Monetizasiya: orijinallıq ✓/✗ · reused ✓/✗ · reklamçı dostu ✓/✗ · hüquqlar ✓/✗ · risk: yox/aşağı/yüksək`.
Risk **yüksək**dirsə, video paylaşılmır, əvvəl düzəldilir.

## 13. Gündəm: son dəyişiklikləri izləmək
- **Mənbə:** `/gundem` skill-i (`.claude/skills/gundem/SKILL.md`). `/video` işə düşəndə son gündəm faylı 24 saatdan köhnədirsə, əvvəlcə `/gundem` işlədilir.
- **Pəncərə:** hər gündəm yalnız son **24 saatı** əhatə edir (sahib 2026-09-26). Tarixə həm məqalənin, həm hadisənin ilk açıqlanma tarixi daxildir: köhnə hadisəyə dair yeni yazı gündəmə girmir.
- **Nə izlənir:** yeni modellər, alətlər, böyük yeniləmələr, AI şirkətlərinin buraxılışları, trend repolar. Mənbə siyahısı skill-dədir.
- **Təsdiq qaydası:** hər xəbərin birinci mənbəyi (rəsmi blog, sənəd, repo) olmalıdır. Şayiə, sızma və "insider" iddiaları kontentə girmir. Rəqəmlər yalnız rəsmi mənbədən götürülür və təsvirdə mənbə linki verilir.
- **Təzəlik:** news flash short xəbərdən sonra ilk 48 saatda çıxmalıdır. Gecikibsə, long videoda "həftənin xəbərləri" hissəsinə keçir.
- **Öz baxışımız mütləqdir:** xəbəri sadəcə təkrar demək reused və inauthentic riskidir (§12). Hər gündəm videosunda KAXO-nun şərhi, real test və ya müqayisə olur.
- **Başqasının materialı:** rəsmi səhifələrin qısa ekran yazısı (≤ 15 s) şərh üçün istifadə olunur. Başqasının videosu, reklam çarxı və musiqisi istifadə olunmur. Loqolar yalnız mövzunu göstərmək üçündür (§6).
- **Arxiv:** `content/news/YYYY-MM-DD.md`, son 14 gün saxlanılır.
- **Avtomatik işləmə:** Windows Task Scheduler-də "KAXO Gundem" tapşırığı hər gün 09:00-da `tools/gundem-daily.ps1`-i işlədir (headless `claude -p`, yalnız oxuma, web və `content/news/`, `ideas.md` yazısı; Bash, paylaşma və silmə yoxdur). Kompüter o vaxt yatmışdısa, oyananda işləyir. Eyni gün ikinci dəfə işləmir. Loglar `data/gundem-logs/`-dadır (son 30).
  - Vaxtı dəyişmək: `powershell -NoProfile -ExecutionPolicy Bypass -File tools
egister-gundem-task.ps1 -Time 08:00`
  - Söndürmək: `Unregister-ScheduledTask -TaskName 'KAXO Gundem' -Confirm:$false`

## 14. Playlistlər
Qaydalar və siyahı: [PLAYLISTS.md](PLAYLISTS.md). Hər video paylaşılanda ən azı bir playlistə qoyulur, short-lar əlavə olaraq "KAXO Shorts"-a.

## 15. Lokalizasiya: türkcə (sahib, 2026-09-25; bütün videolar və Short-lar)
Türk dilli ölkələrdən baxan izləyici videonu türkcə görməlidir:
- **Başlıq və təsvir:** hər videoya türkcə tərcümə (Studio → Languages → Turkish). `seo.json` → `tr.title`, `tr.description`.
- **Altyazı:** ingiliscə `subs/captions.srt` + türkcə `subs/captions.tr.srt` yüklənir.
- **Səs:** türkcə səs dorojkası `audio/voice_tr.wav`. İngiliscə ilə **eyni uzunluqda** olur (hər shot öz vaxtına sığdırılır), YouTube-a "multi-language audio" kimi yüklənir. **Vəziyyət (2026-09-25):** kanalda multi-language audio/auto-dubbing funksiyası hələ yoxdur (Studio → Subtitles-də yalnız altyazı və başlıq sütunları). Piper-in yeganə tr_TR səsi (dfki) CC BY-NC-SA-dır, kommersiya kanalında işlədilmir. Funksiya açılana qədər: TR başlıq + təsvir + altyazı. Açılanda: kommersiya lisenziyalı TTS (sahibin icazəsi) və ya YouTube auto-dubbing.
- Tərcümə hərfi deyil, danışıq türkcəsidir (§3a qaydaları türkcəyə də aiddir): KAXO-nun yumoru qorunur, rəqəmlər və mənbələr dəyişmir.
- Ödənişli TTS yalnız sahibin icazəsi ilə.
