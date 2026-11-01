# Kontent qaydaları: KAXO

`/video` skill-i və bütün agentlər bu fayla əməl edir. Qayda dəyişəndə əvvəlcə bu fayl yenilənir.
Konsept 2026-10-31-də dəyişdi (sahib): AI kanalı KAXO arxivdədir (`content/archive/kaxo/`).

## 1. Kanal konsepti
**KAXO: "KAXO wonders why, so you don't have to."**
Hər video bir maraq sualına cavab verir: "Why don't we eat goat?", "How did humans invent soap?", "Why do predators ignore sleeping humans?", "Why can't you remember being a baby?". Cavab tarixdə, biologiyada, coğrafiyada, iqtisadiyyatda, psixologiyada və ya bir təsadüfdə gizlənir. Hər videoda bir neçə səbəb və ya mərhələ olur və onlar bir-bir açılır.

- **Mövzu sahələri (sabit, kanal bunlardan kənara çıxmır):**
  1. **Yemək və gündəlik şeylər:** niyə bunu yeyirik və ya yemirik, gündəlik əşya necə yaranıb (sabun, kərpic, tualet).
  2. **İnsan tarixi və tarixəqədərki həyat:** əcdadlar necə yaşayırdı, yatırdı, təmiz qalırdı, sağ qalırdı.
  3. **Heyvanlar və təbiət:** heyvanların davranışı, insanla heyvan arasındakı qəribə münasibətlər.
  4. **İnsan bədəni və beyni:** niyə yatırıq, niyə unuduruq, niyə darıxırıq (sağlamlıq məsləhəti verilmir, §7).
- **Referanslar:** [@menumetre](https://www.youtube.com/@menumetre) (yemək sualları, 9 dəq, Plate tipli ölçü cihazı) və [@Meraklı](https://www.youtube.com/@Merakl%C4%B1-f6k) (tarixəqədərki həyat, ixtiralar, heyvanlar, 15–37 dəq). Analiz: `work/research/reference-menumetre-2026-10-31.md`. Onların janrını və tutma texnikalarını götürürük. Personaj, ad, mətn, vizual və araşdırma bizimdir, heç nə kopyalanmır, tərcümə olunmur.
- **Qlobal bucaq:** auditoriya bütün dünyadır (10 dildə altyazı, §15). Ona görə "biz" bir millət deyil, "we" bütün insanlıqdır və ya yer adı açıq deyilir: "in Japan", "in most of Europe".
- **Aparıcı:** KAXO, insana bənzər **universal** 2D cizgi personaj ([character/character.md](character/character.md)). Mövzuya görə geyimi və əlindəki əşya dəyişir, siması dəyişmir.
- **Auditoriya:** 18–45 yaş, maraqlı yetkin izləyici. Uşaq kanalı deyil (§12.4).
- **Dil:** səsləndirmə **ingiliscədir**. Qeydlər və hesabatlar Azərbaycan dilindədir.

## 2. Formatlar
| Format | Ölçü | Uzunluq | Tezlik | Növ |
|---|---|---|---|---|
| **Long (əsas)** | 1920×1080 | **minimum 8:00**, hədəf 10–14 dəq | həftədə 1–2 | bir sual, 4–7 səbəb və ya mərhələ, cizgi + xəritə + sənəd + qrafik |
| **Deep dive** | 1920×1080 | 15–25 dəq | ayda ən çox 1, kanal böyüyəndən sonra | böyük sual ("How did humans invent the computer?"), xronoloji mərhələlərlə |
| **Seriya** | 1920×1080 | hər hissə ≥ 8:00 | mövzu genişdirsə | eyni mövzunun 2–3 hissəsi |
| **Short: long-dan kəsik** | 1080×1920 | 30–55 s | hər long-dan 1–2 | long-un ən güclü faktı, yeni hook ilə; təsvirdə long-un linki |

- **8 dəqiqə sərt həddir:** `final.mp4` 8:00-dan qısadırsa, video paylaşılmır. 8+ dəqiqə videonun ortasında reklam (mid-roll) qoymağa imkan verir. Uzunluq doldurma ilə yox, əlavə səbəb, hekayə və ya müqayisə ilə qazanılır.
- Short-lar yalnız long-dan kəsilir. Əsas iş long videodur (izlənmə saatı, §12).
- **Mövzu seçimi:** sual izləyicidə "hə, doğrudan, niyə?" reaksiyası yaratmalıdır. Yaxşı mövzuda (a) gündəlik həyatda görünən ziddiyyət və ya sirr, (b) ən azı 4 müstəqil səbəb və ya mərhələ, (c) gözlənilməz bir dönüş, (d) etibarlı mənbələr və (e) **tam reklam uyğunluğu** (§12.3) olur. Ziddiyyətli sual ("X yeyir, Y yemir") ziddiyyətsiz sualdan yaxşı gedir (referans statistikası).
- **Mövzu bankı:** `content/ideas.md`. Mövzu sahələri növbə ilə gəlir: ardıcıl 3 video eyni sahədən olmur.

## 3. Video quruluşu: izləyicini girişdən saxlamaq
Məqsəd: izləyici ilk 30 saniyədə getməsin və sona qədər qalsın. Hər hissə bir sual açır və növbəti hissəyə körpü salır.

### 3.1 Giriş (0:00 → ən gec 1:45)
1. **0–15 s, soyuq açılış (cold open):** ikinci şəxsdə səhnə, izləyici ortasına salınır. Ya zaman və məkan möhürü ilə ("Tokyo, 1965. You're nine. The lunch lady drops a tray in front of you. It's not chicken. It's whale."), ya da indiki an ilə ("You're asleep. Drooling on your pillow. Biologically, you're defenceless."). 2–3 hiss detalı olur, 15-ci saniyəyə qədər **təəccüblü fakt və ya ziddiyyət** gəlir.
2. **15–45 s, ziddiyyəti böyütmək:** absurdluğu artıran 2–3 konkret fakt və rəqəm.
3. **Əsas sual:** başlıqdakı sual sözbəsöz və ya çox yaxın formada deyilir. İzləyici başlığa görə gəlib, sualı ilk 45 saniyədə eşitməlidir.
4. **45–90 s, vəd və yol xəritəsi (açıq döngülər):** "It isn't one reason. It's five." Sonra 2–3 səbəbin adını vermədən maraq oyadan teaser: "Number two starts inside a 19th-century street lamp. Number four is about you, right now." Bu vədlərin hamısı videoda mütləq yerinə yetirilir.
5. **Answer Puzzle təqdim olunur** (§3.4).
6. **Qadağandır:** salam, "welcome back", kanalın və ya aparıcının təqdimatı, loqo zərbəsi, "in this video", "before we start, subscribe", girişdə sponsor. İlk cümlə birbaşa səhnədir.

### 3.2 Fəsillər (səbəblər və ya mərhələlər)
- 4–7 fəsil, hər biri 60–150 s. Fəsil adı nömrə ilə başlayır: "1. The Empty Sea". `chapter` sahəsi fəslin yalnız ilk shot-unda olur.
- **Hər fəslin daxili quruluşu:** mini-hook (sual və ya qəribə fakt) → konkret insan, yer, tarix və ya tədqiqatla hekayə → bir rəqəm və ya sənəd → nəticə ("so that's why…") → Answer Puzzle-a bir hissə əlavə olunur → növbəti fəsli açan körpü cümləsi ("But oil was only the beginning.").
- **Ən güclü səbəb ortaya və ya sona** qoyulur, ən zəifi ilk yerə qoyulmur. İlk fəsil sürətli və vizual olmalıdır: 2-ci dəqiqədə izləyici itkisi ən çox olur.
- **Gərginlik nöqtələri:** videonun ~30%, ~50% və ~70%-ində yenidən hook ("And the strangest part is still ahead."). Vəd mütləq yerinə yetirilir.

### 3.3 Diqqəti təzələmək (pattern interrupt)
Hər 30–60 saniyədə bunlardan biri olur, eyni tip ardıcıl iki dəfə işlədilmir:
- **Viktorina:** "Quick guess: in 1960, how many goats lived here? Five million, twelve, or over twenty?" Variantlar ekranda görünür, cavab 2–3 saniyəlik kadrdan sonra gəlir. Səs kəsilmir: "Take a guess" deyilir, musiqi davam edir. Hər videoda 1–2 viktorina.
- **"Imagine you're…" anı:** izləyici başqa insanın, dövrün və ya heyvanın yerinə qoyulur.
- **Danışan heyvan və ya əşya:** bir sətirlik yumor ("I only wanted one leaf."). Hər videoda ən çox 2 dəfə.
- **Müasir həyatla müqayisə:** "Today we have locked bathrooms and do-not-disturb mode. They had one cave and thirty roommates."
- **Vizual dəyişiklik:** xəritə animasiyası, real arxiv sənədi, sadə qrafik, "əvvəl və sonra" kadrı.
- Eyni tip kadr 20 saniyədən çox davam etmir. Kadr hər 3–7 saniyədə dəyişir.

### 3.4 Answer Puzzle (kanalın imza elementi)
- Ekranın küncündə səbəb sayı qədər hissəyə bölünmüş tapmaca (jigsaw) çərçivəsi var. Hər fəslin sonunda bir hissə yerinə oturur, üstündə səbəbin 1–2 sözlük adı yazılır ("OIL", "LAW", "FIRE").
- Final fəslində tapmaca tamamlanır, tam şəkil (mövzunun ikonası) görünür və əsas sualın cavabı bir cümlə ilə deyilir.
- Məqsəd: izləyici neçə səbəbin qaldığını görür və tamamlanmamış tapmacanı yarımçıq qoymaq istəmir.
- Qrafika kodla render olunur (HTML → `record_page.js`), AI şəklinə yazılmır.

### 3.5 Final (son 60–90 s)
1. Tapmaca tamamlanır: cavab bir-iki cümlədə, soyuq açılışdakı səhnəyə callback ilə deyilir ("So that tray in Tokyo…").
2. **Stinger:** son təəccüblü fakt və ya bugünkü vəziyyət.
3. **Abunə çağırışı** bir cümlədir, növbəti videoya bağlıdır ("Next week: how humans invented soap. Subscribe so it finds you.").
4. Son 20 saniyə end screen üçün sakit kadrdır. Səs növbəti videoya işarə edir, fon musiqisi qalır.

**Videonun ortasında abunə çağırışı** bir dəfə olur, ~50–60% nöqtəsində, bir cümlə ilə, seriyaya və ya növbəti videoya bağlı. Real izləyici şərhi mövzunun mənbəyidirsə, bu deyilə bilər. Uydurma şərh olmur.

## 4. Danışıq tərzi
KAXO izləyici ilə yan-yana oturub hekayə danışan dost kimi danışır: maraqlı, isti, hazırcavab. Mühazirə oxumur.

**Sadə və axıcı dil (sahib, 2026-10-31; bu bölmənin əsas qaydasıdır):** mətn hər kəsin bir dəfə eşidib başa düşəcəyi sadə dildə yazılır. Mürəkkəblik olmur, söhbət axıcıdır. İzləyicilərin çoxu ingiliscəni ana dili kimi bilmir və ya altyazı ilə baxır (§15), ona görə sadəlik həm də tərcümənin keyfiyyəti deməkdir.
- **Gündəlik sözlər:** "use" (utilize yox), "start" (commence yox), "because" (due to the fact that yox), "about" (approximately yox).
- **Termin olmur, olarsa dərhal açılır:** elmi və ya tarixi söz lazımdırsa, eyni cümlədə və ya növbəti cümlədə sadə sözlə izah olunur: "It's called domestication. Basically, taming wild animals so they live with us."
- **Bir cümlə, bir fikir:** cümlə orta hesabla ~12 söz, ən çox 18 söz olur. İçində iki "which", "that" və ya vergüllü əlavə olan uzun cümlə ikiyə bölünür.
- **Aktiv dil:** "Farmers banned goats" ("Goats were banned by farmers" yox). Kim nə edir, aydın olur.
- **Rəqəmlər yüngül:** bir cümlədə ən çox bir rəqəm. Böyük rəqəm müqayisə ilə yuvarlaqlaşdırılır: "about 20 million, that's more than all the people in Romania". Eyni anda bir neçə il və faiz sadalanmır.
- **Axıcı keçid:** cümlələr bir-birinə bağlanır ("So…", "But here's the thing…", "And that's where…"), mövzu qəfil dəyişmir. Hər fəsil əvvəlkinin son fikrindən başlayır.
- **Yoxlama:** ssenaridə orta cümlə uzunluğu ≤ 13 söz, 18 sözdən uzun cümlə yoxdur, oxunaqlılıq Flesch Reading Ease ≥ 70 (`/video` 4-cü addım). Bu, ilk dəfə eşidən izləyicinin yorulmaması üçündür.
- **İkinci şəxs:** izləyiciyə "you" ilə müraciət olunur: "picture this", "look at the map".
- **Konkretlik:** hər iddiada ad, yer, il, tədqiqat və ya rəqəm olur. "A long time ago" yox, "around 400 BC, on the Black Sea coast"; "studies show" yox, "a 2019 study from UC Santa Cruz".
- **Cümlələr qısadır** (yuxarıdakı sadə dil qaydası) və ritm dəyişir: qısa zərbə, orta cümlə, yenə qısa. Eyni uzunluqda üç cümlə ardıcıl gəlmir.
- **Qısaltmalar həmişə:** "it's", "didn't", "we'll".
- **Yumor ədviyyatdır:** dəqiqədə ən çox bir yüngül zarafat, çox vaxt müasir həyatla müqayisə. Əsas ton maraqdır.
- **Dürüstlük:** mənbələr razılaşmırsa, bu deyilir: "Researchers still argue about this." Əfsanə əfsanə kimi təqdim olunur. Tarixəqədərki həyat haqqında fərziyyə fərziyyə kimi deyilir: "We can't know for sure, but the bones suggest…".
- **Qadağandır:** siyahı kimi sadalamaq ("Firstly… Secondly…"), rəsmi sözlər ("utilize", "furthermore", "in conclusion"), "In this video", "Let's dive in", "Did you know?" ilə başlamaq, eyni sözlə başlayan ardıcıl cümlələr, ensiklopediya tonu.
- **Fasiləsiz axın** (sahib iki dəfə "duraksama çoxdur" dedi): `[pause]` videoda ən çox 1 dəfədir (stinger-dən əvvəl). Montajdan sonra sükut payı ≤ 10%, ən uzun sükut ≤ 0.35 s (`/video` 7-ci addım). Qısa cümlələri nöqtə ilə doğrama.
- **Səs testi:** ssenari ucadan oxunur. Dil ilişirsə, cümlə dəyişdirilir.
- **Uzunluq hesabı:** ~150 söz/dəq. 8 dəqiqə üçün ən azı **1 250 söz**, hədəf (10–14 dəq) 1 500–2 100 söz.

## 5. Vizual qaydalar
### 5.0 İstehsal üsulu: video kodla qurulur (sahib, 2026-10-31)
- **Videonun bütün vizualı kodla hazırlanır.** Əsas mühərrik **Remotion** (React ilə video, `tools/remotion/`): səhnələr, KAXO-nun animasiyası, xəritələr, qrafiklər, viktorina, Answer Puzzle, keçidlər və kamera hərəkəti kodla yazılır və `audio/timeline.json`-a (səsin vaxtına) bağlanır. Render: `npx remotion render`, 1920×1080, 30 fps, altyazısız.
- **ChatGPT (şəkil generasiyası) yalnız thumbnail (qapaq) şəkilləri üçündür.** Video səhnələri ChatGPT ilə yaradılmır. İstisna: personajın dizayn vərəqləri (`content/character/reference.png`, `expressions.png`, `outfits.png`). Onlar artıq hazırdır və yalnız personajın görünüşü dəyişəndə yenilənir.
- **KAXO videoda kodla idarə olunan kuklakimi (puppet) personajdır.** Dizayn vərəqlərindən hazırlanmış qatlardan qurulur (şəffaf PNG kəsiklər və ya Illustrator Image Trace ilə vektora çevrilmiş SVG): baş, gözlər (qırpma), ağız formaları (səslə sinxron), qollar, bədən, mövzu kostyumları ayrıca qatlardır. Aktivlər `content/assets/kaxo-rig/`-dədir. Hər yeni poza və ifadə kodla (qat dəyişmə, fırlanma, hərəkət) alınır, yeni şəkil generasiyası ilə yox.
- **Fonlar və tarixi səhnələr** düz vektor üslubunda kodla (SVG/React) çəkilir və ya Illustrator-da hazırlanıb `content/assets/scenes/`-də təkrar istifadə olunur. İctimai mülkiyyətdə olan arxiv təsvirləri (ukiyo-e, köhnə xəritələr, qəzetlər) səhnə kimi işlədilə bilər (§5, arxiv qaydası).
- **Lazım olsa proqramlar:** **Blender** (5.2; 3D və ya Grease Pencil səhnəsi, kamera hərəkəti, obyekt animasiyası, Python ilə avtomatlaşdırılır), **Adobe Premiere Pro** (son montaj, səs miksi, rəng düzəlişi), **Illustrator** (vektor personaj və fon), **Photoshop** (şəkil təmizləmə). Mümkün olan hər şey skriptlə və təkrarlana bilən şəkildə edilir. Proqramda əl ilə görülən iş hesabata yazılır.
- **Stil:** `character.md`-dəki stil təsviri əsasdır: 2D cizgi, qalın tünd konturlar (`#2B2118`), düz parlaq rənglər, kanal palitrası (krem `#FFF6E5`, tomat `#FF4D2E`, xardal `#F2B33D`, zeytun `#6B7A3A`), sadə amma rəngli fonlar.
- **Vizual keyfiyyət (ilk epizodun izləyici baxışından, 2026-10-31):**
  - **Boş kadr yoxdur:** fon tək başına (boş kağız, boş studiya) heç vaxt kadrın məzmunu olmur. Sənəddən danışılanda sənəd yazılır, möhür vurulur.
  - **Hadisəni göstər:** fərman, məktub, etiraz, yemək kimi hekayə anları səhnə kimi çəkilir (kim, harada, nə edir). Boş məkan üzərindən danışmaq olmaz.
  - **Studiya ≤ 15%:** KAXO-nun boş studiya fonunda dayandığı kadrlar videonun ən çox 15%-idir. KAXO mövzunun səhnəsinin içində olur.
  - **Yazı kartı səhnənin üstündədir:** qısa yazı (termin, rəqəm) kart kimi səhnənin üstünə çıxır, ağ tam ekran yazı kartı olmur.
  - **Təkrar həddi:** eyni səhnə ardıcıl ən çox 3 kadr, eyni səhnə + eyni KAXO pozası ən çox 2 kadr.
- **Hərəkət:** statik slayd-şou yoxdur. Hər kadrda hərəkət olur: KAXO danışır (ağız, qaş, jest), fonda kamera yavaş hərəkət edir (parallax), elementlər girib çıxır. Kadr hər 3–7 saniyədə dəyişir.
- **KAXO-nun geyimi mövzuya görədir** (`character.md` → "Geyim və əşyalar"): epizodun `episode.json` → `outfit` sahəsində bir dəfə seçilir və bütün epizod boyu eyni qalır. Tarixi səhnəyə "girəndə" həmin dövrün geyiminə keçə bilər, sonra əsas epizod geyiminə qayıdır.
- **KAXO kadrda:** long videonun kadrlarının ~35–50%-ində KAXO görünür (izah edir, reaksiya verir, səhnəyə "girir"). Qalan kadrlar hekayə səhnələri, xəritə, sənəd və qrafikdir.
- **Başqa insanlar** (tarixi və tarixəqədərki insanlar): eyni cizgi stilində, sadələşdirilmiş və hörmətlə. Karikatura, irqi və milli stereotip olmur.
- **Heyvanlar:** sevimli və ya neytral. Ov, kəsim, qan, yara və ölü bədən göstərilmir: təhlükə ifadə ilə, kölgə ilə və ya kadrdan kənarda verilir.
- **Bədən və çılpaqlıq:** tarixəqədərki insanlar həmişə geyimlidir (dəri, parça). Çılpaqlıq, intim səhnə, tualet və gigiyena detalı göstərilmir: mövzu bunlara toxunursa, simvolik əşya ilə verilir (qapı, pərdə, sabun).
- **Xəritələr və qrafiklər:** Remotion komponentləri ilə (və ya `tools/video/graphics/kaxo.html` + `record_page.js`), rəqəmlər mənbədən, mənbə kadrın küncündə kiçik.
- **Arxiv sənədləri:** yalnız ictimai mülkiyyətdə olan və ya lisenziyası aydın olan sənədlər. Mənbə `clips/sources.json`-a və təsvirə yazılır.
- **Ekranda mətn:** videoya **altyazı yandırılmır**: nə ingiliscə, nə başqa dildə (sahib, 2026-10-31). Altyazılar yalnız YouTube-a fayl kimi yüklənir (§15). Ekranda yalnız qısa etiketlər olur: tarix, yer adı, rəqəm, fəsil kartı, viktorina variantları, Answer Puzzle. Bu mətnlər kodla yazılır, AI şəklinə yazdırılmır.
- **Stock video:** cizgi stilinə uyğun gəlmir, ən çox epizodun 5%-i (Pexels/Pixabay, `tools/video/stock.py`). Müəllif təsvirdə göstərilir.
- **Musiqi:** yalnız `content/music/` qovluğundan, lisenziyası `content/music/LICENSES.md`-də olan fayllar (§12.5). Səsdən 18–22 dB aşağı.

## 6. Araşdırma və dəqiqlik
- Hər videoda **ən azı 5 mənbə**, onlardan ən azı 2-si rəsmi və ya akademik: rəyçili məqalələr, universitet və muzey nəşrləri, FAO/WHO/UNESCO, milli statistika, qanun mətnləri.
- Hər rəqəmin, tarixin və tədqiqatın mənbəyi `content/reports/<epizod>.md`-də sətir-sətir göstərilir. Mənbəsiz iddia ssenaridən çıxarılır.
- Viki və bloq yalnız istiqamət üçündür, son mənbə sayılmır.
- Mənbələr razılaşmırsa, ssenaridə bu deyilir. Rəqəmlər dürüst yuvarlaqlaşdırılır.
- **Fakt yoxlaması:** ssenari bitəndən sonra `qa` agenti hər iddianı mənbə ilə tutuşdurur. Nəticə hesabata `Fakt yoxlaması: N iddia, N təsdiq, N düzəliş` sətri ilə yazılır.
- **Başqa videonun mətni oxunmur, tərcümə olunmur, yenidən danışılmır** (§12.2). Ssenari öz araşdırmamızdan yazılır.

## 7. Həssas mövzular
- **Din və mədəniyyət:** yemək qadağaları, adətlər hörmətlə, fakt kimi danışılır. Heç bir xalq ələ salınmır, "iyrənc", "geridə qalmış" kimi qiymət verilmir.
- **Siyasət və irq:** mübahisəli ərazi, müharibə, irq siyasəti mövzu olmur. Tarixi hadisə fakt kimi qısa deyilir.
- **Sağlamlıq:** bədən və beyin mövzuları elmi izahdır. Diaqnoz, müalicə və pəhriz məsləhəti verilmir ("try this to sleep better" yoxdur). Xəstəlik mövzusu seçilmir (§12.3).
- **Ölüm və təhlükə:** tarixəqədərki həyatın təhlükələri (yırtıcı, soyuq, aclıq) qan və şoksuz, maraq tonu ilə danışılır.

## 8. SEO (YouTube)
- **Başlıq:** ≤ 60 simvol, sual formasında və ya ziddiyyətlə. Açar söz ilk 40 simvolda. Məsələn: "Why Don't We Eat Goat? (Half the World Does)", "How Did Humans Invent Soap?". Bütün sözlər böyük hərflə yazılmır, emoji olmur.
- **Açar söz araşdırması:** YouTube autocomplete (`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=<söz>`): "why don't we …", "how did humans …", "why do animals …", "prehistoric humans …". Seçilən açar sözlər hesabata yazılır.
- **Təsvir:**
  - 1-ci sətir hook-dur və açar sözü daşıyır;
  - 2–3 cümlədə videonun nədən danışdığı, səbəblərin adı açılmadan;
  - fəsillər (`00:00 Intro`, `01:32 1. The Empty Sea` …);
  - **Sources & further reading:** nömrələnmiş mənbə siyahısı;
  - şəffaflıq sətri: "Narration and illustrations made with AI tools; script researched and fact-checked from the sources above.";
  - kanal sətri: "KAXO wonders why, so you don't have to.";
  - 3 hashtag: mövzu sahəsi (`#foodhistory`, `#prehistory`, `#animalbehavior`, `#humanbody`), `#kaxo` və mövzu.
- **Tag-lar:** 10–20: açar söz variantları, mövzu sözləri, "history explained", "kaxo". Başqa kanal adı yazılmır.
- **Kateqoriya:** Education. **Dil:** English. **Made for kids:** No (§12.4).
- **Altered/synthetic content:** cizgi real görünmür, ona görə "No". Real insanın səsi və ya görüntüsü təqlid olunsa, "Yes".
- **Thumbnail:** [THUMBNAILS.md](THUMBNAILS.md), `/thumbnail` skill-i.
- **Playlist:** [PLAYLISTS.md](PLAYLISTS.md).
- Hamısı `seo.json`-a yazılır.

## 9. Nəşr
- **Sahibin açıq təsdiqi olmadan heç nə paylaşılmır.** Claude videonu açır, sahib baxır və "təsdiq" deyir.
- Platforma YouTube-dur (Studio, brauzer, sahibin hesabı).
- Paylaşılan hər video `content/published.md`-yə yazılır (tarix, başlıq, URL, epizod qovluğu, dillər).

## 10. Statistika və dərslər
- Paylaşılmasından ≥ 48 saat keçmiş videoların statistikası YouTube Studio-dan toplanır: baxış, orta baxış müddəti, **retention əyrisi (xüsusən 0:30 və 1:00 nöqtəsində qalan faiz)**, CTR, like, şərh, abunəçi, trafik mənbəyi, altyazı dillərinə görə baxış, **monetizasiya ikonası** (yaşıl/sarı).
- Retention əyrisində kəskin düşüş varsa, həmin anın ssenari parçası hesabata yazılır.
- Sarı ikona (limited ads) olarsa, səbəbi və mövzu `lessons.md`-yə dərhal yazılır (bir videodan da qayda çıxır, §12.3).
- Xam rəqəmlər `content/stats/YYYY-MM-DD.json`-a, nəticələr `content/lessons.md`-yə.
- **Dərs** ən azı 2 videonun müqayisəsindən çıxır. Bir video əsasında yalnız "müşahidə" yazılır.

## 11. Hesabatlar və təmizlik
- Hər epizodun araşdırma və istehsal hesabatı `content/reports/YYYY-MM-DD-<slug>.md`-dədir: mənbələr, fakt yoxlaması, açar sözlər, monetizasiya yoxlaması, problemlər.
- `content/reports/`-da **ən son 10 hesabat** qalır. Köhnəsi silinməzdən əvvəl faydalı nəticələr `lessons.md`-yə və ya `ideas.md`-yə köçürülür.
- Paylaşılmış epizodlarda 30 gündən sonra ara fayllar (`audio/*.wav`, `clips/`, `video/_segments`) silinir. `final.mp4`, `episode.json`, `script.md`, `seo.json`, `subs/`, `images/` qalır.

## 12. Monetizasiya: gələcəkdə məhdudiyyət olmasın (sahib, 2026-10-31)
**Məqsəd:** kanal YPP-yə qəbul olunsun, sonra heç bir video sarı ikona (limited ads) almasın, kanal "reused" və ya "inauthentic" kimi monetizasiyadan çıxarılmasın. Bu bölmə digər bütün qaydalardan üstündür: şübhə olanda video dəyişdirilir və ya çəkilmir.

Mənbələr (yoxlanıb 2026-09-25, hər rübdə yenidən yoxlanılır): [YPP tələbləri](https://support.google.com/youtube/answer/72851), [kanal monetizasiya siyasəti](https://support.google.com/youtube/answer/1311392), [reklamçı dostu qaydalar](https://support.google.com/youtube/answer/6162278), [made for kids](https://support.google.com/youtube/answer/9528076).

**Qoşulma həddi:** 1 000 abunəçi + son 12 ayda 4 000 izlənmə saatı (long yolu, əsas yolumuz) və ya 1 000 abunəçi + 90 gündə 10M Shorts baxışı. Digər şərtlər: 2-Step Verification, aktiv strike yoxdur, AdSense, ölkə siyahıdadır. Qəbul zamanı rəyçi kanalın **əsas mövzusuna, ən çox baxılan, ən yeni və ən çox izlənən videolarına** baxır.

### 12.1 Orijinallıq (inauthentic / mass-produced content)
AI səsli izah kanalları xüsusi diqqətdədir. Hər video "insanın yaradıcı işi" kimi görünməlidir:
1. **Öz araşdırmamız və öz ssenarimiz:** sual quruluşu, səbəb seçimi, soyuq açılış, zarafat, müqayisə bizimdir.
2. **Şablon təkrarı yoxdur:** quruluş (§3) çərçivədir, amma hər videonun soyuq açılışı, viktorinası, zarafatları, səhnələri və KAXO-nun geyimi yenidir. `/video` son 10 epizodla müqayisə edir.
3. **Yaradıcı iş görünür:** personaj, səhnələr, xəritə və qrafiklər, Answer Puzzle. Slayd-şou + diktor formatı kifayət etmir.
4. **İnsan nəzarəti:** sahib hər videoya baxıb təsdiqləyir (§9).
5. **Tezlik keyfiyyətdən sonra gəlir:** həftədə ən çox 2 long. Gündə bir neçə video kimi "mass production" siqnalı verilmir.
6. **Kanalın mövzusu sabitdir:** §1-dəki 4 sahə. Köhnə AI videoları qəbul öncəsi Private edilir (sahib, `published.md`).

### 12.2 Reused content
- Başqa kanalın videosunu, ssenarisini və ya kadrlarını **tərcümə edib səsləndirmək, yenidən danışmaq, kəsib yığmaq qadağandır** (bəzi referans kanalların etdiyi kimi). Bu, kanal səviyyəsində monetizasiyadan çıxarılmanın ən çox rast gəlinən səbəbidir.
- Kitab, məqalə və Vikipediya mətni sözbəsöz oxunmur. Mənbədən fakt götürülür, mətn öz sözlərimizlədir. Sitat qısadır (1–2 cümlə) və mənbəsi deyilir.

### 12.3 Reklamçı dostu məzmun (sarı ikona olmasın)
Mövzu seçimində, başlıqda, thumbnail-də və **ilk 30 saniyədə** bunlar **olmur**:
- **Cinsəllik:** cinsi həyat, intim münasibət, regl, doğuş detalı, çılpaqlıq. ("Tarixəqədərki insanların özəl həyatı" tipli mövzu çəkilmir.) Sevgi və ailə yalnız sosial tərəfdən.
- **Narkotik və spirt:** "when did humans start using drugs", sərxoşluq. Yemək tarixində şərab və pivə bir cümlə ilə, təbliğsiz.
- **Silah və zorakılıq:** silah, top, arbalet ixtirası, döyüş, işgəncə, ölüm səhnəsi. Silah ixtirası mövzu kimi seçilmir.
- **Faciə və xəstəlik:** fəlakət, epidemiya, xərçəng, ruhi xəstəlik, intihar, ölüm statistikası mövzu kimi seçilmir.
- **Mübahisəli mövzular:** irq, siyasət, din mübahisəsi, cinsi kimlik.
- **Şok və iyrənclik:** qan, yara, tualet və bədən ifrazatı detalı, böcək yemək kadrı yaxın planda.
- **Söyüş:** heç vaxt, "damn" da yox.
- **Aldadıcı başlıq və thumbnail:** videoda olmayan şey vəd edilmir (metadata siyasəti).
Mövzu bu siyahıya yaxındırsa (məsələn, tualetin ixtirası), yalnız mühəndislik və tarix tərəfi danışılır, başlıq və thumbnail neytral olur. Əmin olmayanda mövzu dəyişdirilir.

### 12.4 Uşaq üçün kontent deyil (Made for kids: No)
Cizgi kanalları YouTube-un sistemində "made for kids" kimi qeyd oluna bilər. O zaman fərdi reklam, şərhlər və bildirişlər söndürülür və gəlir kəskin düşür. Buna görə:
- Hər yükləmədə və kanal ayarlarında "No, it's not made for kids" seçilir.
- Mövzular, lüğət və yumor yetkin izləyici üçündür (iqtisadiyyat, qanun, tədqiqat, müasir iş həyatı ilə müqayisə). Uşaq mahnısı, oyuncaq, nağıl tonu, "kids, let's learn" kimi müraciət yoxdur.
- Thumbnail-də uşaq personajı əsas fiqur olmur.

### 12.5 Hüquqlar
- **Vizual:** video kodla qurulur (Remotion, öz kodumuz). Remotion lisenziyası: fərdi şəxslər və ≤ 3 işçili şirkətlər üçün pulsuzdur (remotion.pro/license, hər rübdə yoxla; komanda böyüyərsə Company License lazımdır). Thumbnail və personaj vərəqləri: ChatGPT, sahibin hesabı (OpenAI şərtlərinə görə çıxış istifadəçiyə məxsusdur). Blender (GPL; render çıxışı bizimdir), Adobe proqramları sahibin lisenziyası ilə. Başqa brendin personajına bənzədilmir.
- **Səs:** Kokoro (Apache-2.0), kommersiya istifadəsinə açıqdır. Başqa TTS yalnız kommersiya lisenziyası ilə və sahibin icazəsi ilə.
- **Musiqi:** yalnız lisenziyası `music/LICENSES.md`-də yazılan, kommersiya istifadəsinə açıq, **Content ID qeydiyyatı olmayan** fayllar (YouTube Audio Library və s.). Content ID iddiası gəlirin başqasına getməsi deməkdir.
- **Arxiv:** ictimai mülkiyyət və ya açıq lisenziya, mənbə ilə.
- **Şrift:** OFL lisenziyalı.
- Başqasının videosu, filmi, mem şablonu, personajı yoxdur.

### 12.6 Monetizasiya yoxlaması (`/video` 4-cü və 9-cu addımlar)
Hesabata yazılır:
`Monetizasiya: orijinallıq ✓/✗ · reused ✓/✗ · reklamçı dostu (mövzu, başlıq, thumbnail, ilk 30 s) ✓/✗ · made for kids: No ✓/✗ · hüquqlar (şəkil, səs, musiqi, arxiv) ✓/✗ · fakt yoxlaması ✓/✗ · risk: yox/aşağı/yüksək`.
Risk **aşağı** deyilsə (yəni "yüksək" və ya hər hansı ✗ varsa), video paylaşılmır, əvvəl düzəldilir.

## 13. Qadağalar
- Başqa brendlərin personajları, müəllif hüquqlu musiqi, film parçaları, başqa kanalın kadrları.
- Real insanları ələ salmaq, siyasət, dini mübahisə.
- §12.3-dəki mövzular.
- Clickbait yalanı.
- Şablonla kütləvi istehsal (§12.1).

## 14. Playlistlər
Qaydalar və siyahı: [PLAYLISTS.md](PLAYLISTS.md). Hər video paylaşılanda ən azı bir playlistə qoyulur.

## 15. Lokalizasiya: 10 dildə altyazı (sahib, 2026-10-31)
- **Səs yalnız ingiliscədir.** Videoda heç bir dildə altyazı görünmür (§5).
- **Altyazılar YouTube-a fayl kimi yüklənir** (Studio → Subtitles → Upload file → With timing), 10 dildə:

| Dil | YouTube | Fayl |
|---|---|---|
| English (əsas) | English | `subs/captions.en.srt` |
| Spanish | Spanish | `subs/captions.es.srt` |
| Portuguese | Portuguese (Brazil) | `subs/captions.pt.srt` |
| Russian | Russian | `subs/captions.ru.srt` |
| Turkish | Turkish | `subs/captions.tr.srt` |
| Chinese | Chinese (Simplified) | `subs/captions.zh-Hans.srt` |
| Japanese | Japanese | `subs/captions.ja.srt` |
| Korean | Korean | `subs/captions.ko.srt` |
| Arabic | Arabic | `subs/captions.ar.srt` |
| Persian | Persian | `subs/captions.fa.srt` |

- **Başlıq və təsvir də eyni 9 dilə tərcümə olunur** (Studio → Languages → Add language): xarici izləyici başlığı öz dilində görür, bu da CTR və axtarış üçün vacibdir. `seo.json` → `localizations.<dil>.title/description`.
- **Tərcümə qaydası:** hərfi tərcümə olmur, təbii danışıq dilində yazılır. Vaxt kodları və cue sayı ingiliscə faylla eyni qalır. Rəqəmlər, il, xüsusi adlar və mənbə adları dəyişmir. Ərəb və fars dilində sağdan sola yazılış və durğu işarələri yoxlanılır. Hər cue ən çox 2 sətirdir: Çin, Yapon və Koreya dilində sətir başına ≤ 20 simvol, digər dillərdə sətir başına ≤ 42 simvol.
- **Yoxlama:** hər faylda cue sayı ingiliscə ilə eynidir, boş cue yoxdur, kodlaşma UTF-8-dir (`/video` 8-ci addım).
- Ödənişli tərcümə və ya TTS xidməti yalnız sahibin icazəsi ilə.
