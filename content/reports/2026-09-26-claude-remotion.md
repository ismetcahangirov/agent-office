# 2026-09-26 · claude-remotion

## Şirkətdən real faktlar (A)
Tam siyahı: `work/research/ep-claude-remotion-company.md` (fayl yolları, `events.jsonl` sətirləri).
- `/video` skill-i 10 addımdır, status 11 mərhələdən keçir. `tools/video/` altında 14 skript, ~1 280 sətir.
- Epizod 2 (Opus 5.5): 392.31 s səs, 68 kadr (44 klip, 10 yeni ChatGPT şəkli, 14 poza/screenshot), 1 154 söz, 61 fayl. TTS ~35–39 dəq.
- Sessiya `1a08fb01`: 778 hadisə, 643 alət çağırışı (331 brauzer, 41 uğursuz). Subagentlər 85, CEO ~557. Sahib 14 mesaj. 14:31 → ilk Public ~17:29 (~3 saat; log natamamdır).
- Qırılanlar: video 392 s, səs 351 s idi (ilk yükləmə Private); TTS CPU-nu tutdu, Chrome dondu; anthropic.com scroll-jacking; `file_upload` 10 MB, final.mp4 154 MB → sahib sürüklədi ("SURUSDURDUM").
- Opus short (müqayisə üçün): 37.69 s, 10 kadr, "davam"dan dərcə ~30 dəq.
- Dürüstlük: "Claude tam özü etdi" demək olmaz (giriş, verify, sürükləmə, təsdiq, səs itkisini tapmaq insanın işidir). $ xərci ölçülməyib.

## Açar sözlər və trendlər (B)
Tam siyahı: `work/research/ep-claude-remotion-market.md`.
- Autocomplete: "claude remotion" (`claude` sorğusunda 2-ci), "remotion claude code" (`remotion claude` 1-ci, `remotion` 6-cı), "claude code video editing/generation", "opus 5.5 video", "opus 5.5 motion", "remotion ai", "ai video editor for youtube". "ai makes youtube video" zəifdir.
- Remotion v4.0.529 (2026-09-25). Rəsmi agent dəstəyi: `npx skills add remotion-dev/skills`, https://www.remotion.dev/docs/ai/coding-agents, llms.txt.
- Lisenziya: "You are eligible to use Remotion for free if you are: an individual / a for-profit organization with up to 3 employees" (https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) → KAXO (0 insan işçi) pulsuzdur.
- Trend: HN "Opus 5.5 is good at explainer videos" 412/217, 2026-09-24 (https://news.ycombinator.com/item?id=49836374); link launchvideo.io-ya gedir və o, Remotion yox, HTML + Playwright + ffmpeg istifadə edir. HN-də "animasiyalı slayd / slop" tənqidi.
- Rəqiblər: "Claude + Remotion Just KILLED Video Editing" şablonu; heç birində vaxt, token, düzəliş rəqəmi və real pipeline ilə müqayisə yoxdur → bizim boşluq.
- Hook-lar: (1) rəqəm: "Our normal video took three hours. Claude got one prompt."; (2) skeptik: "Hacker News calls it animated slides. We tested it."; (3) KAXO: "I fired my video editor. It was also an AI."

## Seçilən ideya və niyə
Long: "Can Claude make a YouTube video by itself?". Test ədalətli olsun deyə eyni tapşırıq verilir: artıq paylaşılmış Opus short-unun (37.69 s) ssenarisi, səsi və şəkilləri Remotion ilə **bir prompt**la yenidən yığılır (Remotion-un rəsmi agent iş axını). Sonra bir düzəliş raundu. Vaxt, alət çağırışı, token, render sayı, xətalar ölçülür, QA iki versiyanı eyni meyarlarla qiymətləndirir. Trend var, rəqiblərdə rəqəm yoxdur, test real ofisdə gedir.

## İstehsal qeydləri
### Real test nəticəsi (work/tests/claude-remotion/: log.md, qa-blind.md, out/v1.mp4, out/v2.mp4)
- Tapşırıq: artıq paylaşılmış Opus short-u (37.7 s) eyni ssenari, eyni səs (voice.wav) və eyni şəkillərlə Remotion-da yenidən yığmaq. `clips/` və hazır video qadağan idi: bütün qrafik və altyazı Remotion-da yazılmalı idi. Rəsmi iş axını: `npx create-video --yes --blank`, `npx remotion skills add` (12 skill).
- **Raund 1 (bir prompt, kömək yox):** 13:44:36 → 13:55:16 = 10.7 dəq, 46 alət çağırışı, 1 render (1131 kadr, ~1.5 dəq), TypeScript 0 xəta, 4 xəta (1 öz bash heredoc-u, 1 npm xəbərdarlığı, 2 Remotion-un ffmpeg-ində filtr yoxdur). Nəticə: işləyir, səs sinxron, amma: 1-ci saniyədə hook boşdur ("SAME JOB. THE BILL:" + boş ekran), "OPUS 5.5" etiketi robotun yox, KAXO-nun üstündədir (kodda miqyas iki dəfə tətbiq olunub), kadrların aşağı yarısı boşdur, altyazıda boz "hələ deyilməyən" sözlər. Özünə qiymət 5–6/10.
- **Raund 2 (sahibin 6 qeydi):** 13:56:28 → 14:05:41 ≈ 9 dəq, +58 alət çağırışı, 1 tam render + 3 yoxlama render-i, 4 xəta (Remotion CLI yol xətası, ffmpeg tile filtri yoxdur, öz shell səhvi, öz bug-u: sözlər yapışdı "ISUPERVISE."). Hamısını kadrlardan özü tapıb düzəldib. Özünə qiymət 7/10.
- **Cəmi:** ~20 dəq, 104 alət çağırışı, 2 tam render. $ ölçülməyib (subscription).
- **Kor QA (A = bizim paylaşılmış short, B = Remotion v2; QA bilmirdi):** B 55, A 49 (80 üzərindən). B: hook 8 vs 6, altyazı 8 vs 5, texniki qüsur 8 vs 5. A yalnız "real görüntü"də qalib (6 vs 2): real ofis və VS Code yazısı. Audio: A −15.6 LUFS (normal), B −18.3 (sakit).
- **QA bizim paylaşılmış short-da qüsur tapdı (CEO kadrla təsdiqlədi):** 9.5–9.9 s ağ ekran (ofis klipinin yüklənmə kadrı), 27.4–29.6 s kod kadrı demək olar boşdur və kəsilib, 1.5–3 s altyazı qrafik etiketinin üstünə düşür. Yəni ~30 dəq və 1 insan baxışından keçən videomuzda heç kim görməyib.
- **Dürüstlük riski B-də:** terminal kadrı imitasiyadır (real log deyil), QA bunu "real kimi göstərilir" deyə qeyd etdi. Epizodda "recreation" deyilməlidir.
- Claude-un edə bilmədikləri: KAXO şəkilləri (ChatGPT-dən bizdə idi), səs (bizim Kokoro faylı verildi), real görüntü, qeydlər insandan gəldi (raund 2), hesaba giriş, dərc.

### İstehsal (2026-09-26)
- **Dərc:** https://youtu.be/qbxkwvXUzMk, 7:09, Public, KAXO Tests AI Tools. EN altyazı, TR başlıq/təsvir/altyazı (158 sətir, `text_tr`-dən). Thumbnail "BLIND TEST / 55 VS 49" (alternativlər seo.json-da).
- **Vaxt:** araşdırma 13:30 → test 13:44–14:05 → QA 14:10 → ssenari ~14:30 → B-roll, qrafiklər → 12 ChatGPT şəkli (limit dolmadı, 8 şəkildən sonra yeni söhbət) → TTS ~35 dəq (7:09 səs, sükut 6.7%, max 0.27 s) → montaj → dərc ~15:45.
- **Alındı:** kor QA real və dürüst hekayə verdi; ssenari 72 kadr, 6 fəsil (1:18, 2:27, 3:39, 4:43, 6:03); 8 poza təkrar istifadə (40%).
- **Problemlər və həllər:**
  - `type_code.py` zamanı Kilo Code paneli ~17 s-də açılıb fokusu aldı, kodun yarısı çat qutusuna yazıldı (model seçilməmişdi, heç nə göndərilmədi). Klipin ilk 16 s-i işlədildi; ayrı `--user-data-dir` profili pəncərə açmadı, geri qaytarıldı. Skill-də səhv halı kimi yazıldı.
  - Marketer `chapter`-i hər kadra yazmışdı → chapters.py 70 "fəsil" gördü; yalnız fəslin ilk kadrında saxlanıldı.
  - `asset: pose:...` sahəsini assemble.py oxumur → pozalar `images/<id>.png` kimi kopyalandı.
  - Klip başlanğıcları: record_page/graphics "content from" 2.5–6.9 s; ofis kliplərinin 0-cı kadrı ağdır (bizim short-dakı ağ ekranın səbəbi eyni idi!) → hamısı düzəldildi, son montaj YAVG ilə ağ/qara kadra yoxlanıldı (0 tapıldı).
  - "ISUPERVISE" bug kadrı saxlanmamışdı (yoxlama kadrları üzərinə yazılıb) → imitasiya əvəzinə g-rounds qrafiki ("found its own bug").
  - HN klipi scroll ilə oxunmurdu → statik, zoom 2.2.
  - "Animated slides" HN-də hərfi yoxdur ("flashy slide decks", "simple slides"); ekranda dırnaqsız xülasə kimi saxlanıldı (yenidən TTS ~35 dəq olardı).
  - YouTube Studio əvvəl başqa kanal/hesabda açıldı ("izniniz yok"), sahib keçid etdi.
- **Dərs (bizim pipeline üçün):** klip başlanğıcında yüklənmə kadrı → montajdan sonra avtomatik parlaqlıq yoxlaması (ağ/qara kadr) lazımdır. `/video` 7-ci addıma əlavə olunmalıdır.
