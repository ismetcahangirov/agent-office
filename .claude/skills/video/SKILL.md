---
name: video
description: KAXO kanalı (maraq sualları: yemək, ixtiralar, tarixəqədərki həyat, heyvanlar, bədən; aparıcı KAXO) üçün yeni video epizodu (uzunluq mövzu qədər) hazırlayır - statistika və dərslər, mövzu araşdırması və mənbələr, retention quruluşlu ssenari, fakt yoxlaması, kodla qurulan cizgi səhnələri (Remotion, KAXO puppet; lazım olsa Blender, Premiere), xəritə/qrafik/Answer Puzzle, ChatGPT brauzerdə ingiliscə səsləndirmə (gənc enerjili kişi səsi), altyazısız montaj, 10 dildə SRT altyazı, SEO və thumbnail, sahibin təsdiqi, YouTube-a paylaşma, hesabat. İstifadəçi "/video", "/video davam", "yeni video", "yeni epizod" yazanda işə sal.
---

# /video: KAXO epizodu, başdan sona

Arqumentlər:
- `/video`: yeni long epizod (mövzu `ideas.md`-dən).
- `/video <mövzu>`: mövzu sahibdən gəlir.
- `/video davam`: ən son yarımçıq epizodu davam etdirir.
- `/video short-from <long epizod>`: long videonun ən güclü faktından 30–55 s short (9:16).

**Əvvəlcə oxu və bütün addımlarda əməl et:** `content/RULES.md` (xüsusən §3 quruluş, §4 danışıq, §6 dəqiqlik, §15 dillər), `content/character/character.md`, `content/lessons.md`, `content/ideas.md`, `content/published.md`, `content/PLAYLISTS.md`.

İş qaydası:
- Addımlar ardıcıl gedir. Hər addımdan sonra `episode.json`-da `status` yenilənir, beləcə `/video davam` qaldığı yerdən başlayır.
- Sahibə hər addımın əvvəlində bir sətir yaz: "4/10: şəkillər…"
- Paylaşmadan əvvəl sahibin açıq təsdiqi **mütləqdir**.
- **Videoya heç bir altyazı yandırılmır** (RULES §5, §15). Altyazı yalnız `.srt` faylıdır və YouTube-a yüklənir.

## Epizod qovluğu
`content/episodes/YYYY-MM-DD-<slug>/`:
```
episode.json   ssenari + kadrlar + status (tək həqiqət mənbəyi)
script.md      oxunaqlı ssenari (sahib üçün)
images/        arxiv şəkilləri (ictimai mülkiyyət)
graphics/      xəritə, qrafik, viktorina, Answer Puzzle HTML-ləri
clips/         graphics/-dən yazılmış kliplər, arxiv sənədləri, sources.json
audio/         voice.wav, timeline.json
subs/          captions.en.srt + 9 tərcümə (RULES §15)
video/         final.mp4, chapters.txt
thumb/         thumbnail.png (+ small)
seo.json       başlıq, təsvir, tag-lar, lokalizasiyalar
```

`episode.json` sxemi:
```json
{
  "slug": "japan-beef",
  "format": "long",
  "area": "food",
  "outfit": "his usual mustard cardigan, white tee and olive trousers, plus a short tomato-red apron",
  "props": "a wooden spoon he uses as a pointer",
  "status": "script",
  "question": "Why did Japan refuse beef for 1,200 years?",
  "reasons": ["LAW", "FAITH", "RICE", "SEA", "EMPEROR"],
  "sources": ["<report-dakı mənbə siyahısına istinad>"],
  "shots": [
    { "id": "s01", "camera": "zoom_in", "scene": "tokyo-street-1872",
      "kaxo": { "pose": "point", "expr": "surprised", "x": 0.75 },
      "lines": [ { "speaker": "kaxo", "text": "Tokyo, 1872. The newspaper says the Emperor ate beef. On purpose." } ] },
    { "id": "s05", "chapter": "1. The Ban", "scene": "paper", "kaxo": null,
      "graphic": { "type": "map", "focus": "japan", "label": "675 AD" },
      "lines": [ { "speaker": "kaxo", "text": "To see why that's shocking, we need to go back to the year 675." } ] }
  ]
}
```
- `status` dəyərləri ardıcıllıqla: `research` → `script` → `factcheck` → `images` → `graphics` → `audio` → `video` → `subs` → `seo` → `review` → `approved` → `published` → `done`.
- `camera`: `zoom_in | zoom_out | pan_left | pan_right | static`. `scene`, `kaxo`, `graphic` sahələri 5/10-dadır. Hazır klip (Blender, arxiv video) üçün `"clip"`. Səssiz kadr üçün `"min_duration": 2`.
- `chapter` yalnız fəslin **ilk** shot-unda olur.

---

## 1/10 Hazırlıq
1. Alətlər: `tools/video/.venv/Scripts/python -c "import kokoro_onnx, soundfile, PIL, imageio_ffmpeg, rembg"` və `tools/video/models/` altında `kokoro-v1.0.int8.onnx`, `voices-v1.0.bin`. Python paketləri **yalnız bu venv-ə** quraşdırılır.
2. `content/character/reference.png` var? Yoxdursa, dayan: əvvəlcə `character.md` → "Referansın yaradılması" (sahibin təsdiqi ilə). KAXO-nun səsi: `bm_fable`, en-us (sahib seçib, 2026-10-31).
3. `/video davam`: `content/episodes/` içində `status` dəyəri `done` olmayan ən yeni epizodu tap və o addımdan davam et.

## 2/10 Statistika və dərslər (paylaşılmış video varsa)
`published.md` → "KAXO" cədvəlində ≥ 48 saat əvvəl paylaşılmış və son 3 gündə statistikası yığılmamış video varsa:
1. Claude in Chrome ilə `https://studio.youtube.com` aç. Hesaba daxil olunmayıbsa, sahibdən daxil olmasını xahiş et.
2. RULES §10-dakı rəqəmləri oxu. **Retention əyrisi:** 0:30 və 1:00-da qalan faizi, kəskin düşüş anlarını yaz. Düşüş anını `timeline.json` ilə tutuşdur: o an hansı cümlə və kadr idi.
3. Xam rəqəmlər `content/stats/YYYY-MM-DD.json`-a: `[{ "id", "title", "published", "views", "avg_view_s", "retention_30s", "retention_60s", "drops": [{"t", "pct", "line"}], "ctr", "likes", "comments", "subs", "caption_langs" }]`.
4. `lessons.md`-ni yenilə (qayda yalnız ≥ 2 videonun sübutu ilə). `published.md`-də "Son statistika"nı yenilə.

## 3/10 Araşdırma (subagentlər, paralel)
Mövzunu seç: `/video <mövzu>` verilibsə o, yoxsa `ideas.md` → "Prioritet" növbəsi. Son 10 epizodla eyni mövzu və ya eyni əsas səbəb olmamalıdır, ardıcıl 3 video eyni sahədən olmur. **Monetizasiya süzgəci (RULES §12.3) mövzu seçiləndə tətbiq olunur:** mövzu siyahıdakı sahələrə yaxındırsa, başqa mövzu seç.
Epizodun `area`, `outfit` və `props` sahələrini `character.md` → "Geyim və əşyalar" cədvəlindən seç.

İki `researcher` agentini **eyni mesajda** işə sal:
- **A. Mövzunun faktları:** sual üzrə **ən azı 6 səbəb namizədi**, hər biri üçün konkret hekayə (insan, yer, tarix), rəqəmlər və birinci mənbə. Ən azı 5 mənbə, onlardan 2-si rəsmi/akademik (RULES §6). Soyuq açılış üçün 3 güclü səhnə namizədi (zaman + məkan + hiss detalı + təəccüblü fakt). Viktorina üçün 2 sual (cavabı təəccüblü rəqəm). Mənbələr razılaşmayan yerlər. İctimai mülkiyyətdə olan arxiv şəkilləri və sənədlər (URL + lisenziya).
- **B. Bazar və SEO:** YouTube autocomplete (RULES §8) ilə mövzunun axtarış ifadələri. Eyni mövzuda mövcud videolar (ingiliscə və digər dillərdə): başlıq, uzunluq, baxış, hansı bucaqdan danışılıb. Bizim fərqli bucağımız nə ola bilər? Nəticə: 5–10 açar söz, 3 başlıq namizədi, 3 thumbnail ziddiyyət ideyası.

Nəticəni `content/reports/YYYY-MM-DD-<slug>.md`-yə yaz:
```
# <tarix> · <slug>
## Sual və bucaq
## Səbəblər (mənbələrlə, hər iddia sətir-sətir)
## Soyuq açılış namizədləri
## Açar sözlər və rəqib videolar (B)
## Fakt yoxlaması            (4-cü addımda doldurulur)
## İstehsal qeydləri         (sonrakı addımlarda: problemlər, vaxt, limitlər)
```
`status: "script"`.

## 4/10 Ssenari və fakt yoxlaması
1. 4–6 səbəb seç. **Ən güclü səbəb ortaya və ya sona** qoyulur, ilk fəsil sürətli və vizual olur (RULES §3.2).
2. `marketer` agentinə ssenari yazdır (brifin ilk sətri: "Plain, simple, flowing English: everyday words, one idea per sentence, ~12 words on average, never over 18, explain any term right away"). Ona RULES §3, §4, §7, xarakter faylını, hesabatı, açar sözləri və `lessons.md`-ni ver. Nəticə: `episode.json` (sxem yuxarıda) və `script.md` (kadr, mətn, vizual, fəsil cədvəli).
3. **Fakt yoxlaması:** `qa` agentinə ssenari + hesabatı ver: hər iddianı mənbə ilə tutuşdursun, mənbəsiz və ya şişirdilmiş iddiaları çıxarsın. Nəticəni hesabata `Fakt yoxlaması: N iddia, N təsdiq, N düzəliş` sətri ilə yaz və düzəlişləri ssenariyə tətbiq et. `status: "factcheck"` → yoxlama bitəndə növbəti siyahıya keç.
4. CEO kimi yoxla. Bu siyahıdan biri pozulursa, düzəlt:
   - [ ] **uzunluq mövzu qədər (RULES §2):** minimum yoxdur; doldurma, təkrar, uzadılmış giriş yoxdur. Hər fəsil yeni fakt verir. Söz sayından müddət: ~155 söz/dəq;
   - [ ] **0–15 s:** zaman + məkan möhürü olan ikinci şəxs səhnəsi və 15-ci saniyəyə qədər təəccüblü fakt; salam, təqdimat, loqo, "in this video" yoxdur;
   - [ ] **≤ 45 s:** əsas sual başlıqdakı kimi deyilib;
   - [ ] **45–90 s:** "N reasons" vədi + 2–3 açıq döngü teaser-i; hamısı videoda yerinə yetirilir;
   - [ ] birinci fəsil ən gec 1:45-də başlayır;
   - [ ] 4–6 fəsil, hər biri 60–150 s, hər birində mini-hook → hekayə (insan/yer/il) → rəqəm → nəticə → Answer Puzzle hissəsi → körpü cümləsi;
   - [ ] ~30%, ~50%, ~70%-də yenidən hook var;
   - [ ] hər 30–60 s-də pattern interrupt var (viktorina 1–2, "imagine you're…", danışan heyvan ≤ 2, xəritə, sənəd, qrafik); eyni tip ardıcıl deyil;
   - [ ] orta abunə çağırışı bir dəfə, ~50–60%-də, bir cümlə;
   - [ ] final: cavab + soyuq açılışa callback + stinger + növbəti videoya körpü; son 20 s sakit kadr;
   - [ ] **sadə və axıcı dil (RULES §4, sahib 2026-10-31):** gündəlik sözlər, termin olarsa dərhal sadə izah, bir cümlə bir fikir, aktiv dil, cümlədə ən çox bir rəqəm, keçidlər axıcı. Məcburi ölçü (boş "FIX" olmamalıdır):
     `tools/video/.venv/Scripts/python tools/video/readability.py content/episodes/<epizod>` → orta ≤ 13 söz, 18 sözdən uzun cümlə yoxdur, Flesch ≥ 70, rəsmi söz yoxdur. Keçmirsə, göstərilən cümlələri böl və sözləri sadələşdir, yenidən ölç;
   - [ ] danışıq (RULES §4): "you" ilə müraciət, qısaltmalar, ritm dəyişir, `[pause]` ≤ 2, siyahı və rəsmi söz yoxdur, hər cümləni ucadan oxu;
   - [ ] qlobal bucaq: "biz" bir millət deyil, yer adı açıq deyilir (RULES §1);
   - [ ] yetkin auditoriya üçündür: uşaq tonu, "kids" müraciəti, nağıl dili yoxdur (RULES §12.4);
   - [ ] reklam uyğunluğu (RULES §12.3): başlıqda, thumbnail-də və ilk 30 s-də cinsəllik, narkotik, silah, xəstəlik, faciə, şok, söyüş yoxdur;
   - [ ] həssas mövzular (RULES §7): heç bir mədəniyyət ələ salınmır, qan və kəsim yoxdur;
   - [ ] kadr hər 3–7 s-də dəyişir, KAXO kadrların ~35–50%-ində;
   - [ ] əvvəlki epizodların təkrarı deyil (son 10 epizodun `script.md`-si ilə: eyni soyuq açılış tipi, eyni zarafat, eyni viktorina yoxdur);
   - [ ] **monetizasiya (RULES §12.6):** hesabata `Monetizasiya: …` sətri; hər hansı ✗ varsa düzəlt, sonra davam et.
5. `ideas.md`-də ideyanı `✓ <epizod>` ilə işarələ. `status: "images"`.

## 5/10 Vizual: kodla səhnələr (Remotion)
Video səhnələri **kodla** qurulur (RULES §5.0). ChatGPT burada işlədilmir.
Mühərrik: `tools/remotion/` (Remotion, React). İlk epizodda layihə qurulur, sonrakı epizodlar onun komponentlərini təkrar işlədir:
```
tools/remotion/src/
  Root.tsx              kompozisiya: <Episode> 1920x1080 30fps, props = episode.json + timeline.json
  Episode.tsx           shot-ları timeline-a görə ardıcıl düzür (Sequence), keçidlər
  kaxo/Kaxo.tsx         KAXO puppet: qatlar (baş, gözlər, ağız, qollar, bədən, kostyum), qırpma, səslə ağız, jestlər
  scenes/*.tsx          fonlar və tarixi səhnələr (SVG), parallax kamera
  graphics/*.tsx        Chapter, Quiz, AnswerPuzzle, Label, Chart, Map, Archive (arxiv şəkli + Ken Burns)
public/                 epizodun audio/voice.wav, arxiv şəkilləri, kaxo-rig SVG-ləri (render zamanı kopyalanır)
```
1. **KAXO rig-i** (`content/assets/kaxo-rig/`) yoxdursa, əvvəl onu qur: dizayn vərəqlərini (`reference.png`, `expressions.png`, `outfits.png`) Illustrator Image Trace (ExtendScript ilə) və ya `vtracer` ilə vektora çevir, hissələrə böl (baş, saç, eynək, gözlər açıq/yumulu, 4–6 ağız forması, qollar: yanda/göstərir/yumruq, bədən hər kostyum üçün), SVG kimi saxla. Nəticəni kadr-kadr yoxla: KAXO referansa uyğundur, kontur və rənglər düzdür.
2. Hər shot üçün `episode.json`-da vizual sahəsi: `"scene"` (fon/tarixi səhnə komponenti), `"kaxo"` (`{"pose": "point|idle|think|shrug", "expr": "smile|surprised|laugh|think", "x": 0.75}` və ya `null`), `"graphic"` (`{"type": "quiz|puzzle|chapter|label|chart|map|archive", ...}`), `"camera"` (`zoom_in|pan_left|static`). Tarixi səhnəyə "giriş"də shot-un öz `outfit` sahəsi ola bilər.
3. Yeni fon və ya tarixi səhnə lazımdırsa, `scenes/`-də SVG komponenti kimi yaz (düz rənglər, qalın kontur, palitra) və ya Illustrator-da çəkib `content/assets/scenes/`-ə SVG kimi saxla. Bir səhnə bir neçə shot-da kamera bucağı dəyişərək işlədilir.
4. **Blender** yalnız kod/2D ilə alınmayan şey üçün: 3D obyekt, mürəkkəb kamera uçuşu, Grease Pencil animasiyası. Python skripti `work/blender/<epizod>/`-də saxlanılır, render `clips/`-ə gedir və shot-da `"clip"` kimi işlədilir.
5. **İzləyici baxışı (məcburi, render-dən sonra):** `final.mp4`-dən hər 4 saniyədə bir kadr çıxar (`fps=1/4`), 24 kadrlıq vərəqlərə yığ və mətnlə birlikdə izləyici kimi bax. RULES §5.0 "Vizual keyfiyyət" siyahısını yoxla: boş kadr, hadisənin göstərilməməsi, studiya > 15%, ağ yazı kartları, təkrar. Pozuntu varsa, səhnəni düzəlt və yenidən render et; sahibə yalnız bundan sonra göstər.
6. Ara yoxlama: `npx remotion still` ilə hər fəsildən 1–2 kadr çıxar və `Read` ilə bax (KAXO düzdür, mətn kəsilmir, ekranda altyazı yoxdur).
7. `status: "graphics"`.

## 6/10 Qrafika: xəritə, qrafik, viktorina, Answer Puzzle, arxiv
Bütün ekran mətnləri burada kodla yazılır, AI şəklinə yox (RULES §5). Əsas yol Remotion komponentləridir (`tools/remotion/src/graphics/`); aşağıdakı HTML şablonu (`tools/video/graphics/kaxo.html` + `record_page.js`) ehtiyat yoldur.
1. `graphics/<ad>.html` faylları: 1920×1080, kanalın palitrası (krem fon `#FFF6E5`, tünd kontur `#2B2118`, tomat `#FF4D2E`, xardal `#F2B33D`, zeytun `#6B7A3A`), qalın yuvarlaq şrift, CSS animasiyası (2–6 s). Nümunə şablon `work/tests/opus-5-5/graphics.html`-dədir; yeni kanal üçün ilk epizodda `tools/video/graphics/` altında təkrar istifadə olunan şablonlar yaradılır:
   - **map:** ölkə/marşrut xəritəsi (SVG, ictimai mülkiyyət: Natural Earth), oxla hərəkət;
   - **chart:** sadə sütun və ya xətt qrafiki, mənbə küncdə;
   - **quiz:** sual + 3 variant, 3 s geri sayım, sonra düzgün variant işıqlanır;
   - **puzzle:** Answer Puzzle: N hissəli jigsaw çərçivəsi, `?step=k` ilə k hissə yerində (hər hissədə səbəbin 1–2 sözlük adı), yeni hissə animasiya ilə oturur; `?step=N` tam şəkli (mövzunun ikonası) göstərir;
   - **chapter:** fəsil kartı ("1. The Ban");
   - **label:** tarix/yer etiketi (şəklin üstünə ayrıca klip kimi deyil, `assemble.py` overlay dəstəyi yoxdursa, kart kimi).
2. Klip kimi yaz:
   ```bash
   node tools/video/record_page.js "file:///<tam yol>/graphics/puzzle.html?step=2" content/episodes/<epizod>/clips/puzzle-2.webm 5
   ```
   Çıxışdakı "content from Xs" = `clip_start`.
3. **Arxiv sənədləri və köhnə xəritələr:** yalnız ictimai mülkiyyət və ya açıq lisenziya (Wikimedia Commons-da lisenziya sətri, Library of Congress, Europeana, muzey açıq kolleksiyaları). Fayl `images/<id>.png`-ə, mənbə və lisenziya `clips/sources.json`-a yazılır.
4. Stock video yalnız zərurət olanda (≤ 5%, `tools/video/stock.py`, müəllif `clips/stock.json`-a).
5. `status: "audio"`.

## 7/10 Səs və montaj
```bash
# səs: ChatGPT (aşağıda); ehtiyat: tools/video/.venv/Scripts/python tools/video/tts.py content/episodes/<epizod>
# video: Remotion (əsas yol)
cd tools/remotion && npx remotion render Episode ../../content/episodes/<epizod>/video/final.mp4 --props=../../content/episodes/<epizod>/episode.json
tools/video/.venv/Scripts/python tools/video/chapters.py content/episodes/<epizod>
```
- **Səs: ChatGPT, Chrome-da (RULES §4.1, sahib 2026-11-01).** Gənc enerjili kişi səsi (ad `character.md` → "Səs"). Ssenarini fəsil-fəsil ver. Hər hissə üçün tapşırıq: "Read this exactly as written, in English. Young, energetic, curious male narrator. Calm pace, not rushed: a short breath after every sentence, about a second at the end of the paragraph." Sonra abzaslar üçün rejissor qeydləri ("surprised", "light laugh", "serious, slower") ayrıca sətirdə, oxunan mətndən kənarda. Hər hissəni dinlə: səhv və ya buraxılmış söz varsa, yenidən istə. Hissələri `audio/parts/NN.*` kimi saxla və `audio/voice.wav`-a birləşdir.
- **Vaxtlama:** Remotion `audio/timeline.json`-dakı cümlə vaxtlarına bağlıdır. ChatGPT səsində bu vaxtlar səsdən çıxarılır: cümlə sonundakı fasilələrlə bölünür və ssenarinin cümlələri ilə tutuşdurulur, sözlər cümlə içində proporsional paylanır (`tts.py` → `word_times` kimi). Cümlə sayı fasilə sayına uyğun gəlmirsə, həmin hissə əl ilə yoxlanır. **İlk ChatGPT epizodunda** bu addım üçün skript yazılır, səs adı, tapşırıq mətni və audionun saxlanma üsulu bu skill-ə əlavə olunur.
- Remotion render altyazısızdır. Səs axınını yoxla (ffprobe: audio müddəti video müddətinə bərabərdir). `assemble.py` (şəkil + səs, altyazısız) yalnız ehtiyat yoldur. Son montaj, səs miksi və ya rəng düzəlişi lazım olsa **Premiere Pro** işlədilir və nə edildiyi hesabata yazılır.
- **Temp yoxlaması (məcburi, RULES §4):** ümumi sürət 150–165 söz/dəq, sükut payı 10–17%, cümlə sonu fasiləsinin medianı 0.4–0.8 s, heç bir fasilə > 1.5 s deyil:
  `tools/video/.venv/Scripts/python -c "import json,statistics as st,sys;t=json.load(open(sys.argv[1]+'/audio/timeline.json'));L=[l for s in t['shots'] for l in s['lines']];D=t['duration'];W=sum(len(l['words']) for l in L);g=[b['start']-a['end'] for a,b in zip(L,L[1:])];print('wpm',round(W/D*60),'silence',round(1-sum(l['end']-l['start'] for l in L)/D,3),'gap median',round(st.median(g),2),'max',round(max(g),2))" content/episodes/<epizod>`
  Sürət yüksəkdirsə və fasilə azdırsa: ChatGPT-dən həmin hissəni daha sakit istə. Cümlə ortasında > 0.35 s boşluq olmamalıdır.
- **Ağ/qara kadr yoxlaması (məcburi):** klipin 0-cı kadrı çox vaxt yüklənmə ekranıdır. `clip_start` ən az `record_page`-in "content from" dəyəri olmalıdır. Montajdan sonra:
  `"$F" -hide_banner -i <epizod>/video/final.mp4 -vf "fps=8,scale=64:36,signalstats,metadata=print:key=lavfi.signalstats.YAVG" -an -f null - 2>&1 | tr '\r' '\n' | grep -oE "pts_time:[0-9.]+|YAVG=[0-9.]+" | paste -d' ' - - | sed 's/pts_time://; s/YAVG=//' | tools/video/.venv/Scripts/python -c "import sys;[print(l,end='') for l in sys.stdin if not 6<=float(l.split()[1])<=235]"` (`$F` = imageio-ffmpeg; krem fonlu qrafika ~230 verir, normaldır).
- **Fəsillər:** `chapters.py` ≥ 3 fəsil və hər biri ≥ 10 s verməlidir (YouTube şərti). İlk fəsil `00:00 Intro`-dur.
- Yoxlama: `final.mp4`-dən 0:05, 0:40, 1:30 və ortadan kadr çıxar (`-ss <s> -frames:v 1`) və `Read` ilə bax: ekranda altyazı yoxdur, kadr boş deyil, Answer Puzzle düzgün addımdadır.
- `status: "subs"`.

## 8/10 Altyazılar (10 dil) və SEO
**Altyazılar:**
```bash
tools/video/.venv/Scripts/python tools/video/subs.py content/episodes/<epizod>    # -> subs/captions.en.srt
```
1. `marketer` agentinə `captions.en.srt` + RULES §15-i ver: 9 tərcümə yazsın: `captions.es.srt`, `captions.pt.srt`, `captions.ru.srt`, `captions.tr.srt`, `captions.zh-Hans.srt`, `captions.ja.srt`, `captions.ko.srt`, `captions.ar.srt`, `captions.fa.srt`. Cue nömrələri və vaxt kodları **eynən** qalır, yalnız mətn tərcümə olunur. Agent bir dəfəyə 3 dildən çox etməsin (uzun fayl, keyfiyyət).
2. Yoxla (boş çıxış = təmiz):
   ```bash
   tools/video/.venv/Scripts/python -c "import re,glob,sys;d=sys.argv[1];f=lambda p:re.findall(r'(\d+)\n(\d\d:\d\d:\d\d,\d{3} --> \d\d:\d\d:\d\d,\d{3})\n(.+?)(?:\n\n|\Z)',open(p,encoding='utf-8').read().strip()+'\n\n',re.S);en=f(d+'/subs/captions.en.srt');[print(p,len(c),'vs',len(en)) for p in glob.glob(d+'/subs/captions.*.srt') for c in [f(p)] if [x[:2] for x in c]!=[x[:2] for x in en] or any(not x[2].strip() for x in c)]" content/episodes/<epizod>
   ```
3. Bir-iki dildə (məsələn, tr və ru) 5 təsadüfi cue-nu oxu: təbiidir, rəqəm və adlar dəyişməyib.

**SEO:** RULES §8-ə əsasən `seo.json`:
```json
{ "title": "…", "title_alternatives": ["…", "…"], "description": "…", "tags": ["…"],
  "hashtags": ["#<sahə: foodhistory|prehistory|animalbehavior|humanbody|inventions>", "#kaxo", "#…"],
  "category": "Education", "language": "en", "made_for_kids": false, "altered_content": false,
  "playlists": ["Why Don't We Eat It?"], "chapters": "video/chapters.txt",
  "captions": { "en": "subs/captions.en.srt", "es": "subs/captions.es.srt", "pt": "subs/captions.pt.srt",
                "ru": "subs/captions.ru.srt", "tr": "subs/captions.tr.srt", "zh-Hans": "subs/captions.zh-Hans.srt",
                "ja": "subs/captions.ja.srt", "ko": "subs/captions.ko.srt", "ar": "subs/captions.ar.srt", "fa": "subs/captions.fa.srt" },
  "localizations": { "es": { "title": "…", "description": "…" }, "…": {} },
  "sources": ["<təsvirdəki nömrələnmiş mənbələr>"],
  "ai_note": "Narration and illustrations made with AI tools; script researched and fact-checked from the sources above.",
  "thumbnail": "thumb/thumbnail.png", "keywords_used": ["…"] }
```
- Başlığın və təsvirin 9 dilə tərcüməsi də `marketer`-dən gəlir (`localizations`). Təsvirin tərcüməsində fəsil vaxtları və mənbə adları dəyişmir, fəsil adları tərcümə olunur.

**Thumbnail:** `.claude/skills/thumbnail/SKILL.md` (`content/THUMBNAILS.md` qaydaları). `status: "review"`.

## 9/10 Sahibin baxışı və təsdiqi
1. Videonu aç: `Start-Process "<tam yol>\video\final.mp4"` (PowerShell).
2. Sahibə qısa xülasə göstər: sual və səbəblər; müddət və temp (söz/dəq, sükut payı); ilk 30 saniyənin mətni; başlıq və 2 alternativ; thumbnail (`Start-Process`); fakt yoxlaması sətri; monetizasiya yoxlaması (RULES §12.6; risk aşağı deyilsə, təsdiq variantını göstərmə); altyazı dilləri (10/10).
3. `AskUserQuestion`: **Təsdiq, paylaş** / **Düzəliş lazımdır** / **Ləğv et**.
   - **Düzəliş:** nəyin dəyişəcəyini soruş, uyğun addıma qayıt, sonra yenidən bu addıma gəl.
   - **Ləğv:** `status: "done"` + hesabata səbəb. Paylaşma.
   - **Təsdiq:** `status: "approved"`.

## 10/10 Paylaşma, qeyd, hesabat, təmizlik
**Yalnız `status: "approved"` olanda.**
1. Claude in Chrome ilə `https://studio.youtube.com/channel/<ID>/videos/upload?d=ud` aç. **`file_upload` limiti 10 MB-dır**, `final.mp4` ondan böyükdür: sahibdən faylı yükləmə pəncərəsinə sürükləməsini xahiş et (`explorer /select,<yol>`), sonra formu sən doldur.
   - Yükləmə pəncərəsində **`Esc` basma** (dialoq bağlanır, video Draft qalır).
   - Kanal telefonla təsdiqlənməyibsə, xüsusi thumbnail səssizcə rədd olunur və təsvirdəki linklər kliklənmir: sahibdən `youtube.com/verify` istə.
   - Dropdown-lar (dil, kateqoriya): variantı JS ilə `innerText` üzrə tap və `.click()` et.
2. `seo.json`-dan doldur: başlıq, təsvir (fəsillər, mənbələr, AI sətri, hashtag-lar), tag-lar, playlist(lər) (yoxdursa PLAYLISTS.md-dəki ad və təsvirlə yarat, `published.md`-yə yaz), "No, it's not made for kids", kateqoriya Education, dil English, altered content "No", thumbnail.
3. **Bəyanlar sahibindir:** "Made for kids", "Paid promotion" və "AI use" sualları hüquqi bəyandır; auto mode klassifikatoru Claude-a seçməyə icazə vermir. Sahibə hər birinin düzgün cavabını izah et (adətən No / No / No: cizgi, real insan və real görünən səhnə yoxdur), seçimi sahib edir.
4. **Altyazılar və lokalizasiya (dərcdən sonra, Studio → video → Languages; 2026-10-31-də işləyən üsul):**
   - **İngiliscə:** "Edit subtitles" → editorun ⋮ menyusu → **Upload file** → "With timing" dialoqu açıq ikən gizli `input[type=file]` (valideyni `YTVE-CAPTIONS-EDITOR-UPLOAD-DIALOG`) → `file_upload` → editorda ilk cue bizim mətndirsə **Publish**. ("Upload manual" düyməsi ilə birbaşa yükləmə qəbul olunmadı; "Continue" basma: Windows fayl pəncərəsi açılır.)
   - **Digər 9 dil:** "Add language" → dil seçilir → dialoqda Title + Description doldurulur (`#textbox`, `execCommand('insertText')`) → "Manual subtitles" **Add** → "Save changes" (başlıq/təsvir dərc olunur) → editorda "Upload file" sətrinə kliklə → editor-upload input-a `file_upload` → ilk cue yoxlanır → Publish. Menyudan bir neçə dili ardıcıl seçmə: hər seçim dialoq açır və növbəti klik onu bağlayır.
   - Yoxlama: YouTube Data API `videos?part=status,localizations,contentDetails` → `caption: true`, `localizations` 10 dil, `madeForKids: false`.
5. Görünürlük **Public** (sahib başqa vaxt deyibsə, **Schedule**). "Publish"-dən əvvəl formanı `read_page` ilə yoxla. Dərcdən sonra YouTube Data API ilə (`.env`-dəki açar, dəyəri çap etmə) `localizations` və `captions` siyahısında 10 dili yoxla.
6. `published.md` → "KAXO" cədvəlinə sətir (playlist, altyazı dilləri), `status: "published"`. Sonradan kəsiləcək short üçün `ideas.md`-yə `[short-from] <epizod>` yaz.
7. Yeni keyfiyyətli KAXO şəkillərini `content/character/poses/`-a köçür və README cədvəlinə əlavə et.
8. Hesabatın "İstehsal qeydləri"ni tamamla. Təmizlik: `tools/video/.venv/Scripts/python tools/video/housekeeping.py` (dry run) → faydalı nəticələri `lessons.md`/`ideas.md`-yə köçür → `--apply`.
9. `status: "done"`. Sahibə yekun: link, müddət, növbəti tövsiyə olunan mövzu.

## Short-from (long-dan kəsik)
1. Long-un `script.md` + `timeline.json`-undan 30–55 saniyəlik ən güclü parçanı seç (ən təəccüblü fakt və ya viktorina).
2. Yeni hook yaz (ilk 2 s-də sual və ya şok faktı), sonda long-a çağırış: "The full story is on the channel."
3. Kadrlar 9:16: long şəkilləri blur-fit, açar kadr üçün yeni 2:3 şəkil, qrafika `record_page.js --vertical`.
4. Səs → montaj (altyazısız) → `subs.py` + 9 tərcümə → SEO (`#shorts`, təsvirdə long-un linki) → sahibin təsdiqi → paylaşma. Short-u 10 MB-dan aşağı sıxıb (`-c:v h264_nvenc -b:v 1.8M -maxrate 2.2M -c:a copy video/upload.mp4`) özün `file_upload` et.

## Səhv hallar
| Hal | Nə etməli |
|---|---|
| Kokoro import xətası | `tools/video/.venv/Scripts/python -m pip install kokoro-onnx soundfile`. Modellər: `github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0` → `tools/video/models/` |
| ffmpeg xətası | `assemble.py` stderr-i göstərir. Ən çox rast gəlinən səbəb çatışmayan şəkildir (`missing image`) |
| `ModuleNotFoundError` | Paketi venv-ə qur: `tools/video/.venv/Scripts/python -m pip install <paket>`. Qlobal `pip install` etmə |
| Temp sürətlidir (> 165 söz/dəq və ya sükut < 10%) | ChatGPT-dən həmin hissəni "calmer, with a breath after every sentence" ilə yenidən istə. Mətni dəyişmə |
| Tərcümədə cue sayı fərqlidir | Agentə həmin dili yenidən yazdır, cue-ları birləşdirmək və bölmək qadağandır |
| ChatGPT selektoru dəyişib | `find` / `read_page` ilə tap, JS nümunəsini yenilə və bu skill-də düzəlt |
| YouTube Studio forması dəyişib | `read_page` ilə sahələri tap. Əmin deyilsənsə, sahibdən soruş, təxmini klik etmə |
| `stock.py`: 401/403 | Açar səhvdir və ya limit dolub. O biri mənbəyə keç (`--source`) |
| Brauzer icazəsi yoxdur | Sahibə yaz: Claude in Chrome-da `chatgpt.com` və `studio.youtube.com` üçün icazə lazımdır |

## Əlavə: ChatGPT brauzer qaydaları (yalnız thumbnail və personaj vərəqləri)
Video səhnələri ChatGPT ilə yaradılmır (RULES §5.0). Bu qaydalar `/thumbnail` və personaj vərəqləri üçündür.

Brauzer alətlərini **bir** ToolSearch çağırışı ilə yüklə: `tabs_context_mcp`, `tabs_create_mcp`, `navigate`, `computer`, `find`, `read_page`, `file_upload`, `javascript_tool`.

**Əvvəlcədən bil (əvvəlki epizodların təcrübəsi):**
- Chrome-da `chatgpt.com` üçün **Automatic downloads = Allow** olmalıdır, yoxsa 4–5 şəkildən sonra endirmələr səssizcə bloklanır.
- `file_upload` yalnız layihə yolundakı faylı qəbul edir (scratchpad nüsxəsi rədd olunur). Rədd olunarsa, sahibdən faylı ChatGPT pəncərəsinə sürükləməsini xahiş et.
- **Brauzer donursa:** səbəb çox vaxt CPU-dur. `tts.py` bütün nüvələri tutur. Şəkilləri **TTS-dən əvvəl** bitir.
- Uzun prompt-u `computer type` ilə yazma. JS ilə daxil et: `const e=document.querySelector('#prompt-textarea'); e.focus(); document.execCommand('insertText', false, "<prompt>")`, sonra `Return`. Gözləmə: `computer wait` (4×10 s) + screenshot.
- Endirəndə son şəkli **`alt` başlığı ilə** seç. Donma zamanı göndərilən mesaj ikiqat generasiya verə bilər, əvvəlcə ekrana bax.
- Söhbət 7–8 böyük şəkildən sonra ağırlaşır. Yeni söhbət aç: referans + artıq alınmış bir səhnə şəklini (üslub üçün) birlikdə yüklə. Long epizod ~60–100 kadrdır, ona görə bir neçə söhbət və bir neçə gün (limit) normaldır.
- `javascript_tool` 45 s-də timeout olur. Gözləmə dövrünü ≤ 32 s saxla.
- Yeni şəkil `img[alt^="Generated image"]` ilə tapılır. ChatGPT-nin CSP-si `localhost`-a sorğunu bloklayır, yalnız endirmə yolu işləyir.

**Geyim:** KAXO olan hər prompt-da ardıcıllıq blokunun `{OUTFIT}` və `{PROPS}` yeri `episode.json`-dakı dəyərlə doldurulur. Tarixi səhnəyə "giriş" kadrında shot-un öz `outfit` sahəsi ola bilər.

**Kadr qənaəti:** hər kadr yeni şəkil olmamalıdır. Bir şəkil `motion` + `crop` ilə 2 kadra bölünə bilər (geniş plan → yaxın plan). Xəritə, qrafik, sənəd və viktorina kadrları ChatGPT-dən deyil, 6-cı addımdan gəlir. KAXO-nun uyğun pozası `content/character/poses/`-da varsa, kopyala (epizodun ≤ 30%-i).

1. `tabs_context_mcp` → yeni tab → `https://chatgpt.com`. Giriş ekranı görünürsə, sahibə yaz: **"ChatGPT hesabına daxil ol, hazır olanda de."** Parol yazma, hesab yaratma.
2. Yeni söhbət. Birinci mesaj: `content/character/reference.png` (`file_upload`) + `character.md`-dəki **stil prompt-u** + "This is KAXO, the host of an animated explainer show for adults. His outfit changes with each topic, but his face, glasses, curly hair with the pencil behind his ear and small bag never change. I will ask for many scenes. Keep him exactly like this reference whenever he appears." + **ardıcıllıq bloku**.
3. Hər kadr üçün (yalnız `images/<id>.png` hələ **olmayanlar**):
   - KAXO olan kadr: `shot.prompt` + ardıcıllıq bloku (`{ASPECT}` = `Horizontal 3:2 …`);
   - KAXO olmayan tarixi səhnə: `shot.prompt` + "Same art style as before. No text, no captions, no watermark. Horizontal 3:2.";
   - generasiyanın bitməsini gözlə, sonra endir:
     ```js
     (async () => {
       const imgs = [...document.querySelectorAll('img')].filter(i => i.naturalWidth >= 512 && /generated|image/i.test(i.alt || ''));
       const img = imgs[imgs.length - 1];
       const blob = await (await fetch(img.src)).blob();
       const a = document.createElement('a');
       a.href = URL.createObjectURL(blob); a.download = 'SHOT_ID.png'; a.click();
       return img.naturalWidth + 'x' + img.naturalHeight;
     })()
     ```
   - köçür: `tools/video/.venv/Scripts/python tools/video/take_download.py content/episodes/<epizod> <id>`;
   - yoxla (`Read`): KAXO referansa uyğundurmu (üz, qırmızı eynək, buruq saç və qulağın arxasında karandaş, çanta) və epizodun `outfit`/`props`-u düzgündürmü, şəkildə mətn, qüsurlu əl, ikinci KAXO, qan və ya stereotip varmı? Uyğun deyilsə, səbəbi yazıb yenidən istə (ən çox 2 dəfə).
4. **Limit mesajı** gəlsə: dayan, hesabata limit vaxtını və qalan kadrları yaz, sahibə yaz: "ChatGPT limiti doldu, N kadr qalıb. İstəsən başqa hesaba özün keç, sonra 'davam' yaz, ya da limitin yenilənməsini gözləyək (saat HH:MM)." Hesablar arasında özün keçid etmə.
