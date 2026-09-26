---
name: video
description: KAXO kanalı üçün yeni video epizodu hazırlayır - statistika və dərslər, araşdırma, ssenari, ChatGPT-də şəkillər (brauzer), ekran yazısı (VS Code-da kod, terminal), stock video (Pexels/Pixabay), Kokoro səsləndirmə, altyazı, montaj, SEO və thumbnail, sahibin təsdiqi, YouTube-a paylaşma, hesabat və təmizlik. İstifadəçi "/video", "/video davam", "yeni video", "yeni epizod" yazanda işə sal.
---

# /video: KAXO epizodu, başdan sona

Arqumentlər:
- `/video`: yeni epizod.
- `/video davam`: ən son yarımçıq epizodu davam etdirir.
- `/video <mövzu>`: mövzu sahibdən gəlir.
- `/video long`: uzun format (RULES §2, §3b).
- `/video short-from <long epizod>`: long videonun ən güclü anından short (yeni hook, 9:16).

Format seçimi (sahib deməyibsə): bu həftə long hələ çıxmayıbsa, **long**. Təzə (≤ 48 saat) gündəm xəbəri varsa, **news flash short**. Son long-dan kəsik hələ yoxdursa, **short-from**. Həftəlik plan: 1 long + 3 short (RULES §2).

**Əvvəlcə oxu və bütün addımlarda əməl et:** `content/RULES.md`, `content/character/character.md`, `content/lessons.md`, `content/ideas.md`, `content/published.md`, `content/PLAYLISTS.md`, ən son `content/news/*.md`.

İş qaydası:
- Addımlar ardıcıl gedir. Hər addımdan sonra `episode.json`-da `status` yenilənir, beləcə `/video davam` qaldığı yerdən başlayır.
- Sahibə hər addımın əvvəlində bir sətir yaz: "3/10: şəkillər…"
- Paylaşmadan əvvəl sahibin açıq təsdiqi **mütləqdir**.

## Epizod qovluğu
`content/episodes/YYYY-MM-DD-<slug>/`:
```
episode.json   ssenari + kadrlar + status (tək həqiqət mənbəyi)
script.md      oxunaqlı ssenari (sahib üçün)
images/        s01.png ... (+ thumbnail.png long üçün)
clips/         real ofis görüntüsü (webm)
audio/         voice.wav, timeline.json
subs/          captions.ass, captions.srt
video/         final.mp4 (+ thumbnail.jpg)
seo.json       başlıq, təsvir, tag-lar, parametrlər
```

`episode.json` sxemi:
```json
{
  "slug": "first-employee",
  "format": "short",
  "status": "script",
  "idea": "…",
  "real_fact": "Kəşfiyyatçı 2026-09-24-də 8 fayl oxuyub layihəni təsvir etdi (data/events.jsonl)",
  "shots": [
    { "id": "s01", "motion": "zoom_in",
      "prompt": "KAXO lying on a worn office couch, one eye open, looking at the camera…",
      "lines": [ { "speaker": "narrator", "text": "This is KAXO. He owns a company." },
                 { "speaker": "kaxo", "text": "Technically. [pause] I own a couch.", "speed": 0.88 } ] },
    { "id": "s02", "clip": "clips/office.webm", "clip_start": 1, "crop": [0.25, 0.15, 0.5, 0.8],
      "lines": [ { "speaker": "narrator", "text": "Every employee here is an AI." } ] }
  ]
}
```
- `status` dəyərləri ardıcıllıqla: `research` → `script` → `images` → `broll` → `audio` → `video` → `seo` → `review` → `approved` → `published` → `done`.
- `motion` dəyərləri: `zoom_in | zoom_out | pan_left | pan_right | static`.
- Ofisi yaxından göstərmək üçün `crop` istifadə olunur: `[x, y, w, h]`, mənbənin payı kimi.
- Səssiz kadr üçün `"min_duration": 2`.

---

## 1/10 Hazırlıq
1. Server işləyirmi: `curl -s -o /dev/null -w "%{http_code}" localhost:4317/`. İşləmirsə, `npm start` fonda işə sal (`run_in_background`).
2. Alətlər yerindədirmi: `tools/video/.venv/Scripts/python -c "import kokoro_onnx, soundfile, PIL, imageio_ffmpeg, rembg"` və `tools/video/models/` altında `kokoro-v1.0.int8.onnx`, `voices-v1.0.bin`. Python paketləri **yalnız bu venv-ə** quraşdırılır, qlobal Python-a toxunulmur.
3. Ekran və stock alətləri: `.env`-də `PEXELS_API_KEY` və `PIXABAY_API_KEY` var (dəyərləri çap etmə), `code --version` işləyir.
4. `/video davam`: `content/episodes/` içində `status` dəyəri `done` olmayan ən yeni epizodu tap və o addımdan davam et.

## 2/10 Statistika və dərslər (paylaşılmış video varsa)
`published.md`-də ≥ 48 saat əvvəl paylaşılmış və son 3 gündə statistikası yığılmamış video varsa:
1. Claude in Chrome ilə `https://studio.youtube.com` aç. Hesaba daxil olunmayıbsa, sahibdən daxil olmasını xahiş et və gözlə.
2. Hər video üçün Analytics səhifəsindən RULES §10-dakı rəqəmləri oxu (`get_page_text` / `read_page`).
3. Xam rəqəmləri `content/stats/YYYY-MM-DD.json`-a yaz: `[{ "id", "title", "published", "views", "avg_view_s", "retention_pct", "viewed_vs_swiped", "ctr", "likes", "comments", "subs" }]`.
4. Videoları müqayisə et, `lessons.md`-ni yenilə: müşahidə, qayda, təkzib. Yeni qayda yalnız ≥ 2 videonun sübutu ilə yazılır.
5. `published.md`-də "Son statistika" sütununu yenilə.

## 3/10 Araşdırma (subagentlər, paralel)
**Gündəm:** ən son `content/news/*.md` 24 saatdan köhnədirsə və ya yoxdursa, əvvəlcə `.claude/skills/gundem/SKILL.md`-ni icra et. Gündəm ideyası seçiləndə aşağıdakı A agenti şirkət faktı ilə yanaşı xəbərin rəsmi mənbəsini də yoxlayır.
İki `researcher` agentini **eyni mesajda** işə sal:
- **A. Şirkətdə nə baş verib:** `data/events.jsonl` (son epizoddan bəri), `work/`, son hesabatlar. Nəticə: real faktlar, rəqəmlər və maraqlı anlar (xəta, uğur, absurd vəziyyət), hər biri mənbəsi ilə.
- **B. Bazar və SEO:** YouTube autocomplete (`suggestqueries…&ds=yt&q=`, RULES §8) ilə "ai agents", "ai employees", "ai company", "ai startup" və mövzuya aid sözlərə bax. Son ayın oxşar Shorts-larını və nəyin işlədiyini araşdır. Nəticə: 5–10 açar söz (populyarlıq əlaməti ilə) və 3 hook nümunəsi.

Hər ikisinin nəticəsini `content/reports/YYYY-MM-DD-<slug>.md`-yə yaz:
```
# <tarix> · <slug>
## Şirkətdən real faktlar   (A, mənbələrlə)
## Açar sözlər və trendlər  (B)
## Seçilən ideya və niyə
## İstehsal qeydləri        (sonrakı addımlarda doldurulur: problemlər, vaxt, limitlər)
```
Sonra `status: "script"` et.

## 4/10 İdeya və ssenari
1. İdeyanı seç: `/video <mövzu>` verilibsə o, yoxsa `ideas.md` (əvvəlcə "Gündəm" bölməsi, vaxtı keçməyənlər) + A-nın real faktları + `lessons.md`. İdeyada **ən azı bir real fakt** olmalıdır (RULES §5, §13).
   - **Long "tested X":** əvvəlcə real test: CEO kimi `builder`/`researcher` agentlərinə aləti real tapşırıqda sınamağı tapşır (`work/tests/<slug>/`). Nəticəni (nə alındı, nə alınmadı, vaxt, rəqəmlər) hesabata yaz. Ssenari bu nəticəyə əsaslanır, uydurma nəticə olmur.
   - **Short-from:** qrafikləri şaquli yaz (`graphics.html?v=1` + `record_page --vertical`, məzmun yuxarı 60%-də, altyazıya dəyməsin). Long-un `script.md` + `timeline.json`-undan 30–55 saniyəlik ən güclü parçanı seç, yeni hook yaz, 9:16 kadrlar hazırla (long şəkilləri blur-fit ilə, açar kadr üçün yeni 2:3 şəkil).
2. `marketer` agentinə ssenari yazdır. Ona RULES §3-ü, **§3a-nı (danışıq tərzi)**, xarakter faylını, seçilmiş faktı, açar sözləri və `lessons.md`-ni ver. Nəticə `episode.json` (sxem yuxarıda) və `script.md` olur: kadr, səs, mətn və vizual cədvəl şəklində.
3. CEO kimi yoxla. Bu siyahıdan biri pozulursa, düzəlt:
   - [ ] ilk 2 saniyədə hook var;
   - [ ] punchline videonun ~80%-indədir;
   - [ ] son cümlə dövrə vurur;
   - [ ] short 30–55 saniyədir (~2.5 söz/s ilə yoxla); long 6–10 dəqiqədir, RULES §3b quruluşu var, hər shot-da `chapter` var, fəsillər ≥ 60 s;
   - [ ] short: 6–12 kadr, 1–2-si ofis B-roll; long: kadr hər 3–8 saniyədə dəyişir, ofis və ekran yazısı var, poza kitabxanasından ≤ 50%;
   - [ ] cümlələr ≤ 12 sözdür;
   - [ ] danışıq dilidir (§3a): qısaltmalar var, cümlələr axır, `[pause]` ən çox 1 dəfədir (yalnız əsas punchline-dan əvvəl), qırıq-qırıq nöqtəli cümlələr, rəsmi söz və siyahı yoxdur;
   - [ ] **tanıtım videosu deyil** (§3): video bir mövzu haqqındadır, özünü təqdimat deyil;
   - [ ] hər cümləni ucadan oxu: robot kimi səslənən cümləni yenidən yaz;
   - [ ] qadağalar yoxdur (§6);
   - [ ] real fakt düzgündür;
   - [ ] əvvəlki epizodların təkrarı deyil (`published.md` və son 10 epizodun `script.md`-si ilə müqayisə et: eyni skelet və ya zarafat olmamalıdır);
   - [ ] **monetizasiya (RULES §12):** orijinal baxış və ya real fakt var; başqa mənbə oxunmur; KAXO-nun ən azı 2 fərqli səhnəsi var; söyüş, spirt, zorakılıq, sensasiya yoxdur. Nəticəni hesabata `Monetizasiya: …` sətri ilə yaz.
4. `ideas.md`-də ideyanı `✓ <epizod>` ilə işarələ. `status: "images"`.

## 5/10 Şəkillər: ChatGPT (Claude in Chrome)
Brauzer alətlərini **bir** ToolSearch çağırışı ilə yüklə: `tabs_context_mcp`, `tabs_create_mcp`, `navigate`, `computer`, `find`, `read_page`, `file_upload`, `javascript_tool`.

**Əvvəlcədən bil (epizod 1 təcrübəsi):**
- Chrome-da `chatgpt.com` üçün **Automatic downloads = Allow** olmalıdır, yoxsa 4–5 şəkildən sonra endirmələr səssizcə bloklanır. Bloklanıbsa, sahibdən icazə istə. Blok açılanda gecikmiş endirmələr bir neçə nüsxə ilə gəlir, artıq nüsxələri sil.
- `file_upload` yalnız sessiya ilə paylaşılmış faylları qəbul edir. `reference.png` rədd olunarsa, sahibdən faylı ChatGPT pəncərəsinə sürükləməsini xahiş et.
- **Brauzer donursa (epizod 2):** səbəb çox vaxt CPU-dur. `tts.py` (Kokoro) bütün nüvələri tutur və Chrome renderer cavab vermir. Şəkilləri **TTS-dən əvvəl** bitir, ya da TTS işləyərkən brauzerə toxunma.
- Uzun prompt-u `computer type` ilə hərf-hərf yazma (donur). Mətni JS ilə daxil et: `const e=document.querySelector('#prompt-textarea'); e.focus(); document.execCommand('insertText', false, "<prompt>")`, sonra `Return`. Gözləməni JS dövrü ilə yox, `computer wait` (4×10 s) + screenshot ilə et.
- Endirəndə son şəkli sayla yox, **başlığı (`alt`) ilə** seç: eyni şəklin səhifədə bir neçə `src` nüsxəsi olur, say səhv nəticə verir. Donma zamanı göndərilən mesaj sonradan gedə bilər (ikiqat generasiya), əvvəlcə ekrana bax.
- Söhbət 7–8 böyük şəkildən sonra ağırlaşır. Yeni söhbət aç: referans + artıq alınmış bir səhnə şəklini (üslub və robotlar üçün) birlikdə yüklə.
- `javascript_tool` 45 saniyədə timeout olur. Gözləmə dövrünü ≤ 32 s saxla və lazım olsa təkrar çağır.
- Yeni şəkil `img[alt^="Generated image"]` ilə tapılır. ChatGPT-nin CSP qaydası `localhost`-a sorğunu bloklayır, ona görə yalnız endirmə yolu işləyir.

1. `tabs_context_mcp` → yeni tab → `https://chatgpt.com`. Giriş ekranı görünürsə, sahibə yaz: **"ChatGPT hesabına daxil ol, hazır olanda de."** Sonra gözlə. Parol yazma, hesab yaratma.
2. Yeni söhbət aç. Birinci mesaj:
   - `content/character/reference.png` faylını `file_upload` ilə yüklə (layihə yolundan birbaşa işləyir; scratchpad-dakı nüsxə rədd olunur);
   - mətn: `character.md`-dəki **stil prompt-u** + "This is KAXO, the main character. I will ask for several scenes of him. Always keep him exactly like this reference." + **ardıcıllıq bloku**.
3. Hər kadr üçün (yalnız `images/<id>.png` hələ **olmayanlar**):
   - əvvəlcə `content/character/poses/`-a bax: uyğun poza varsa, kopyala (`images/<id>.png`), yeni generasiya etmə (limit qənaəti, epizodun ≤ 50%-i);
   - mesaj: `shot.prompt` + ardıcıllıq bloku (`{ASPECT}` formata görə: short `Vertical 2:3`, long `Horizontal 3:2 …`);
   - generasiyanın bitməsini gözlə (şəkil elementi görünənə və "stop" düyməsi itənə qədər);
   - yüklə: `javascript_tool` ilə son generasiya olunmuş şəkli götür və adlandırılmış fayl kimi endir:
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
     (`SHOT_ID` əvəzinə kadr id-si. Selektor tapmırsa, `find` ilə "last generated image"-i tap və şəklin öz "Download" düyməsini istifadə et.)
   - köçür: `tools/video/.venv/Scripts/python tools/video/take_download.py content/episodes/<epizod> <id>`;
   - yoxla: şəkli `Read` ilə aç. Xarakter referansa uyğundurmu, artıq mətn, qüsurlu əl və ya ikinci KAXO varmı? Uyğun deyilsə, səbəbini yazıb yenidən istə (ən çox 2 dəfə). Yenə alınmırsa, qeyd et və davam et.
4. **Limit mesajı** gəlsə ("You've reached…", "limit", "try again after…"):
   - dayan;
   - hesabata limit vaxtını və qalan kadrları yaz;
   - sahibə yaz: "ChatGPT limiti doldu, N kadr qalıb. İstəsən başqa hesaba özün keç, sonra 'davam' yaz. Ya da limitin yenilənməsini gözləyək (saat HH:MM)."
   - Hesablar arasında özün keçid etmə. Sahib "davam" deyəndə 3-cü addımdan davam et (çatışmayan kadrlar).
5. Long format üçün `thumbnail` kadrı da yaradılır: KAXO-nun böyük emosional üzü, sağda mətn üçün boş yer. `status: "broll"`.

## 6/10 B-roll: ofis və ekran yazısı (real görüntü)
**Ekran yazısı (xəbər və ya alət səhifəsi, long və news flash üçün):**
```bash
node tools/video/record_page.js <rəsmi URL> content/episodes/<epizod>/clips/<ad>.webm 12 --scroll          # long (16:9); intro animasiyası varsa --wait=5, kiçik ekran üçün qurulmuş səhifə --zoom=1.5
# çıxışdakı "content from Xs" = episode.json-da clip_start (yükləmə qara ekranını keçmək üçün)
node tools/video/record_page.js <rəsmi URL> content/episodes/<epizod>/clips/<ad>.webm 10 --scroll --mobile # short
```
Kliplər ≤ 15 s olur, yalnız rəsmi və ictimai səhifələrdən (RULES §13).

**Ofis:**
B-roll kadrları üçün real hadisələri ofisdə oynat və yaz. Hər ikisi eyni anda işləməlidir:
```bash
node demo.js --replay --speed 4 --from <ISO> --to <ISO>      # fonda
node tools/video/record_office.js content/episodes/<epizod>/clips/office.webm <saniyə>
```
- `--from/--to` epizodun real faktının vaxt aralığıdır, `events.jsonl`-dan götürülür. Replay əvvəlcə `DemoReset` göndərir: lövhə və sayğaclar yalnız təkrar oynanan real hadisələri göstərir.
- **Short-da ofis:** blur-fit ofisi çox kiçik göstərir. Masalara şaquli crop et: `"fit": "cover", "sharp": true, "crop": [x, 0.01, 0.31, 0.97]`. CEO+Kəşfiyyatçı üçün x≈0.095, Kəşfiyyatçı mərkəzdə x≈0.2. Bubble-ların kəsilmədiyini kadrdan yoxla.
- Ssenarili demo (`node demo.js` arqumentsiz) videoya **düşmür**.

**Kompüter ekranı (sahib icazə verib: ekranı yazmaq, VS Code-da kod yazmaq, terminal, istənilən proqram):**
Yaxşı video üçün lazım olan real görüntünü özün çək. Görüntü real iş olmalıdır (RULES §5): agentin yazdığı həqiqi fayl, həqiqi terminal çıxışı, həqiqi sayt.
```bash
# kod yazılır + yazılır (VS Code, hərf-hərf, klaviatura ilə); mənbə builder-in real faylıdır
tools/video/.venv/Scripts/python tools/video/type_code.py work/<layihə>/<fayl> --cps 28 --record content/episodes/<epizod>/clips/code.mp4
# istənilən pəncərə (terminal, brauzer, sayt); fonda başlat, işi gör, sonra stop faylı yarat
tools/video/.venv/Scripts/python tools/video/record_screen.py content/episodes/<epizod>/clips/term.mp4 --window "<başlıq hissəsi>" --seconds 60 --stop-file work/screen/.stop
tools/video/.venv/Scripts/python tools/video/record_screen.py --list      # açıq pəncərə başlıqları
```
- `type_code.py` `work/screen/`-də ayrıca VS Code pəncərəsi açır. Orada avtomatik mötərizə, girinti və təkliflər söndürülür, kod mənbə ilə eyni yazılır, sonda yoxlanır (`typed OK`). Uzun fayldan ~15–40 sətirlik maraqlı hissəni ayrıca fayla çıxar. Tam fayl videoda darıxdırıcıdır.
- Yazı zamanı sahib klaviatura və siçana toxunmamalıdır. Fokus itəndə alət özü dayanır. Başlamazdan əvvəl sahibə bir sətir yaz: "N saniyə ekranı yazıram, toxunma".
- **Məxfilik:** yazmazdan əvvəl kadrda şəxsi heç nə olmamalıdır: poçt, çat, `.env`, token, brauzer tabları, bildirişlər. Yalnız lazım olan pəncərəni `--window` ilə yaz, tam ekranı yox. Yazıdan sonra 2–3 kadrı `Read` ilə yoxla. Sirr görünürsə, klipi sil.
- Kadrda artıq panel görünürsə (yan panel, extension reklamı), `episode.json`-da `crop` ilə kəs.
- Short üçün kod kadrı: `"fit": "cover"` + mətnin olduğu sol hissəyə `crop` (məsələn `[0.1, 0.05, 0.45, 0.9]`). Kod oxunaqlı qalmalıdır (şrift 20, kadrdan yoxla).

**Stock video (Pexels, Pixabay: pulsuz lisenziya):**
Real görüntü və KAXO şəkli olmayan yerdə (ümumi plan: şəhər, server otağı, klaviatura, insanlar ofisdə) istifadə olunur. Əsas vizual deyil, epizodun ≤ 20%-i. Açarlar `.env`-dədir (`PEXELS_API_KEY`, `PIXABAY_API_KEY`). Repoya, skill-ə və hesabata **yazılmır**.
```bash
tools/video/.venv/Scripts/python tools/video/stock.py search "server room blue lights" --orientation landscape --thumbs work/screen/thumbs   # long; short üçün portrait
tools/video/.venv/Scripts/python tools/video/stock.py get pexels:31155915 content/episodes/<epizod> city     # -> clips/city.mp4 + clips/stock.json
```
- Seçmədən əvvəl `--thumbs` ilə endirilən posterlərə `Read` ilə bax. Loqosu, tanınan brendi və ya aydın üzü (əsas plan) olan klipi götürmə.
- `clips/stock.json` müəllif qeydidir. SEO addımında təsvirə "Stock footage: Pexels / Pixabay (<müəlliflər>)" sətri əlavə olunur.
- Stock klip real fakt kimi təqdim olunmur: "bizim ofis", "bizim server" demə (RULES §5).

- `status: "audio"`.

## 7/10 Səs, altyazı, montaj
```bash
tools/video/.venv/Scripts/python tools/video/tts.py      content/episodes/<epizod>
tools/video/.venv/Scripts/python tools/video/subs.py     content/episodes/<epizod>
tools/video/.venv/Scripts/python tools/video/assemble.py content/episodes/<epizod>
```
- Səs robot kimi çıxırsa: cümləni danışıq dilində yenidən yaz, `[pause]` və durğu işarələrini düzəlt, per-line `speed` ver (0.85–1.1). Səs seçimi `character.md` → "Səs".
- Long üçün: `tools/video/.venv/Scripts/python tools/video/chapters.py content/episodes/<epizod>`. Problem çıxırsa (< 3 fəsil, < 10 s), `chapter` sahələrini düzəlt. `video/chapters.txt` təsvirə gedir.
- **Sükut yoxlaması (məcburi):** `voice.wav`-da ≥ 120 ms sükutların cəmi ümumi müddətin 10%-dən az, ən uzunu ≤ 0.35 s olmalıdır:
  `tools/video/.venv/Scripts/python -c "import soundfile as sf,numpy as np;a,sr=sf.read('<epizod>/audio/voice.wav');fr=int(.01*sr);q=np.array([np.abs(a[i:i+fr]).max()<.02 for i in range(0,len(a)-fr,fr)]);import itertools;g=[len(list(x))/100 for k,x in itertools.groupby(q) if k];g=[x for x in g if x>=.12];print(round(sum(g),2),'/',round(len(a)/sr,1),'max',max(g,default=0))"`
  Keçmirsə: ssenaridəki `[pause]` və qısa nöqtəli cümlələri azalt, yenidən səsləndir.
- `assemble.py` sonda `audio ok: X of Y` çap edir; səs axını qısadırsa xəta verir (epizod 2-də səs boşluqları oldu). Bu sətri mütləq yoxla.
- **Scroll-jacking saytlar** (anthropic.com və s.) `record_page --scroll`-da ilişmiş görünür: kadrlara bax, ilişibsə sabit bölmə screenshot-ları (`work/screen/shot_text.js`) + `motion` istifadə et.
- `timeline.json`-da müddətə bax. Short 55 saniyədən uzundursa, ssenarini qısalt və bu addımı təkrarla.
- Yoxlama: `final.mp4`-dən 3–4 kadr çıxar (imageio-ffmpeg: `-ss <s> -frames:v 1`) və `Read` ilə bax: altyazı oxunurmu, kadr boş deyilmi, crop düzgündürmü.
- `status: "seo"`.

## 8/10 SEO
RULES §8-ə əsasən `seo.json` yaz:
```json
{ "title": "…", "description": "…", "tags": ["…"], "hashtags": ["#shorts", "#ai", "#aiagents"],
  "category": "Comedy", "language": "en", "made_for_kids": false, "altered_content": false,
  "playlists": ["KAXO Reacts: AI News", "KAXO Shorts"], "captions": "subs/captions.srt", "thumbnail": null,
  "sources": ["<rəsmi xəbər/alət linkləri, təsvirə gedir>"], "chapters": "video/chapters.txt (long)",
  "related_long": "<short-from üçün long videonun URL-i>",
  "ai_note": "Made with AI tools; stories based on a real AI-agent company.",
  "keywords_used": ["…"], "title_alternatives": ["…", "…"] }
```
Başlıq üçün 3 variant yaz, ən yaxşısını `title`-a qoy, digərlərini `title_alternatives`-ə.

**Thumbnail:** `.claude/skills/thumbnail/SKILL.md`-dəki addımları bu epizod üçün icra et (`content/THUMBNAILS.md` qaydaları). Long üçün `thumb/thumbnail.png`, short üçün `thumb/cover.png` hazırlanır. `status: "review"`.

## 9/10 Sahibin baxışı və təsdiqi
1. Videonu aç: `Start-Process "<tam yol>\video\final.mp4"` (PowerShell).
2. Sahibə qısa xülasə göstər:
   - ideya və real fakt;
   - müddət;
   - başlıq və 2 alternativ;
   - thumbnail və ya cover (şəkli aç: `Start-Process`);
   - monetizasiya yoxlaması (RULES §12). Risk "yüksək"dirsə, təsdiq variantını göstərmə, əvvəl düzəlt;
   - təsvirin ilk 2 sətri;
   - tag-lar.
3. `AskUserQuestion` ilə soruş: **Təsdiq, paylaş** / **Düzəliş lazımdır** / **Ləğv et**.
   - **Düzəliş:** nəyin dəyişəcəyini soruş, uyğun addıma qayıt (ssenari, şəkil, səs, SEO), sonra yenidən bu addıma gəl.
   - **Ləğv:** `status: "done"` + hesabata səbəbi yaz. Paylaşma.
   - **Təsdiq:** `status: "approved"`.

## 10/10 Paylaşma, qeyd, hesabat, təmizlik
**Yalnız `status: "approved"` olanda.**
1. Claude in Chrome ilə `https://studio.youtube.com/channel/<ID>/videos/upload?d=ud` aç (menyudakı "Upload videos" bəzən klikə cavab vermir). **`file_upload` limiti 10 MB-dır**, `final.mp4` ondan böyükdür: sahibdən faylı yükləmə pəncərəsinə sürükləməsini xahiş et (Explorer-də `explorer /select,<yol>` ilə aç), sonra formu sən doldur.
   - **Short-lar (≤ 60 s):** yükləmə nüsxəsini 10 MB-dan aşağı sıx (`-c:v h264_nvenc -b:v 1.8M -maxrate 2.2M -c:a copy video/upload.mp4`), sonra özün `file_upload` et; sahibə ehtiyac yoxdur.
   - Yükləmə pəncərəsində **`Esc` basma**: dialoq bağlanır (video Draft qalır, Content → Shorts → Edit draft ilə davam et).
   - Short-un "Related video" bağlantısı və təsvirdəki kliklənən linklər "advanced features" təsdiqi tələb edir (sahib: Studio → Settings → Channel → Feature eligibility).
   - Kanal telefonla təsdiqlənməyibsə, **xüsusi thumbnail yüklənmir** (səssizcə rədd olunur) və təsvirdəki linklər kliklənmir. Sahibdən `youtube.com/verify` etməsini xahiş et, thumbnail-i sonra Studio → Content → video → Thumbnail ilə əlavə et.
   - Altyazı: Subtitles → Add → Upload file → "With timing". "Continue" basma (Windows fayl pəncərəsi açılır): gizli `input[type=file]`-ə birbaşa `file_upload` et.
   - Dropdown-lar (dil, kateqoriya): variantı JS ilə `innerText` üzrə tap və `.click()` et, iki siyahını eyni anda açıq qoyma.
2. `seo.json`-dan doldur:
   - başlıq, təsvir (sonunda hashtag-lar ilə), tag-lar ("Show more" altında);
   - playlist(lər): `seo.json` → `playlists` (PLAYLISTS.md). Playlist yoxdursa, Studio-da **Create playlist** ilə PLAYLISTS.md-dəki ad və təsvirlə yarat və `published.md`-nin "Playlistlər" cədvəlinə yaz;
   - "No, it's not made for kids";
   - kateqoriya, dil;
   - altered content;
   - Subtitles → Upload file → `subs/captions.srt`;
   - long üçün thumbnail.
3. Görünürlük **Public**-dir, sahib başqa vaxt deyibsə, **Schedule**. "Publish"-dən əvvəl formanı `read_page` ilə yoxla.
3a. **Türkcə lokalizasiya (RULES §15):** `marketer` → `subs/captions.tr.srt` (vaxt kodları eyni) + `seo.json` → `tr.title/description`. Dərcdən sonra Studio → video → Subtitles → Add language → Turkish: qələm (Title & description) ilə TR başlıq/təsvir → Publish; altyazı sütununda qələm → Upload file → gizli `input[type=file]`-ə `captions.tr.srt` → Publish. API ilə yoxla: `localizations` içində `tr`. Yeni yükləmədə **Reuse details** köhnə videodan başlıq/təsvir/tag/playlist köçürür (kids və AI sualını yenə yoxla).
4. Video linkini götür. `published.md`-yə sətir əlavə et (playlist sütunu ilə), `status: "published"`. Short-from-dursa, təsvirə long-un linkini əlavə et. Long-dursa, sonradan kəsilən short-lar üçün `ideas.md`-yə `[short-from] <epizod>` yaz.
5. Yeni, keyfiyyətli KAXO şəkillərini `content/character/poses/`-a köçür və README cədvəlinə əlavə et.
6. Hesabatın "İstehsal qeydləri" bölməsini tamamla: nə alındı, nə alınmadı, limitlər, vaxt.
7. Təmizlik: `tools/video/.venv/Scripts/python tools/video/housekeeping.py` (dry run) → siləcəyi hesabatlardakı faydalı nəticələr `lessons.md`-də və ya `ideas.md`-də varmı, bax, yoxdursa köçür → `tools/video/.venv/Scripts/python tools/video/housekeeping.py --apply`.
8. `status: "done"`. Sahibə yekun: link, müddət, növbəti tövsiyə olunan ideya.

## Səhv hallar
| Hal | Nə etməli |
|---|---|
| Kokoro import xətası | `tools/video/.venv/Scripts/python -m pip install kokoro-onnx soundfile`. Modellər: `github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0` → `tools/video/models/` |
| ffmpeg xətası | `assemble.py` stderr-i göstərir. Ən çox rast gəlinən səbəb çatışmayan şəkildir (`missing image`) |
| `ModuleNotFoundError` | Paketi venv-ə qur: `tools/video/.venv/Scripts/python -m pip install <paket>`. Qlobal `pip install` etmə (aider-chat asılılıqlarını pozur) |
| ChatGPT selektoru dəyişib | `find` / `read_page` ilə tap, JS nümunəsini yenilə və bu skill-də düzəlt |
| YouTube Studio forması dəyişib | `read_page` ilə sahələri tap. Əmin deyilsənsə, sahibdən soruş, təxmini klik etmə |
| `type_code.py`: "focus lost" | Kimsə başqa pəncərəyə klikləyib. Sahibdən toxunmamağı xahiş et, təkrar işlət |
| `type_code.py` ortasında Kilo Code paneli açılır, qalan kod çat qutusuna yazılır ("saved file differs") | Genişlənmə ~17 s sonra paneli özü açır (2026-09-26). Qısa hissə (≤ 15 sətir) yaz və ya klipin panelə qədərki hissəsini işlət; ayrı `--user-data-dir` profili pəncərə açmadı. Sahibdən Kilo Code-u `work/screen` workspace-i üçün söndürməsini xahiş et |
| Mətn VS Code-da Find qutusuna və ya menyuya düşür | `focus_editor()` (Esc, Esc, Ctrl+1) yetmir: VS Code pəncərəsini bağla, təkrar işlət |
| `stock.py`: 401/403 | Açar səhvdir və ya limit dolub (Pexels 200/saat, Pixabay 100/dəq). O biri mənbəyə keç (`--source`) |
| Brauzer icazəsi yoxdur | Sahibə yaz: Claude in Chrome genişlənməsində `chatgpt.com` və `studio.youtube.com` üçün icazə lazımdır |
