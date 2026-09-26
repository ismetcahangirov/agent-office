# Referans kanallar: sürət, format, başlıq (2026-09-26)

Kəşfiyyatçı · Toplandı: 2026-09-26 (UTC). KAXO (@kaxocompany) pivotu üçün: tutorial, review, "new release" review/tutorial.

## 0. Metod və etibarlılıq
- Rəqəmlər YouTube Data API v3-dən götürülüb (`channels?forHandle=`, `playlistItems` (uploads), `videos?part=statistics,contentDetails,snippet`, `search?order=viewCount&publishedAfter=2026-06-28`). Baxış sayı 2026-09-26-da, fetch anındakıdır.
- API cavabları WebFetch vasitəsilə oxunub (arada kiçik model var). Bir videoda iki fetch fərqli rəqəm verdi (Poyraz `v1MbbzH3LvM`: 7,243 / 21:08 və 9,329 / 21:39). Ona görə **bütün rəqəmləri ±5% təxmini say**. Kiçik batch-lərlə alınan (ikinci) rəqəmlər əsas götürülüb.
- "Son 90 gündə top-5" `search order=viewCount` ilə tapılıb. YouTube search tam siyahı zəmanəti vermir: **təxmini top-5**.
- Canlı yayınlarda `publishedAt` yayının başlama vaxtıdır (təxmini). Saatlar UTC-dir. Türkiyə = UTC+3, Bakı = UTC+4.
- Thumbnail təsvirləri `i.ytimg.com/vi/<id>/maxresdefault.jpg` şəkillərinə birbaşa baxaraq yazılıb.
- KAXO kanalı özü (API, 2026-09-26): 0 abunəçi, 3 video, 0 baxış görünür (API gecikməsi ola bilər).

## 1. Türk referans kanalları: xülasə

| Kanal | Dil | Abunəçi | Video (cəmi) | Açılış | Son 30 gündə upload | Long / Shorts | Tipik uzunluq | Median baxış (son 30 gün, long) |
|---|---|---|---|---|---|---|---|---|
| [Avenox @Avenoxai](https://www.youtube.com/@Avenoxai) | TR | 16,800 | 67 | 2025-09-03 | ≥25 (09-03→09-25 arası 25; 08-27→09-02 yoxlanmadı) | 22 long + 3 canlı yayın (2.5–4.5 saat), 0 Short | 8–26 dəq (əksəriyyəti 10–18) | ~16.8K (views/sub ≈ 1.0) |
| [Poyraz Avsever @poyrazavsever](https://www.youtube.com/@poyrazavsever) | TR | 9,940 | 197 | 2025-06-04 | 19 (08-28→09-25) | 9 long + 10 Short (~1 dəq) | long 12–29 dəq | AI long 7.6–12.7K; qeyri-AI long 2.2–3.6K; Short 1.8–8.6K |
| [Forn AI @FornYapayZeka](https://www.youtube.com/@FornYapayZeka) | TR | 1,610 | 22 | 2026-08-05 | 12 + 1 planlaşdırılmış canlı | hamısı long, 0 Short | 8–18 dəq (bir dəfə 36) | ~4.7K (views/sub ≈ 3; kanal 7 həftəlikdir) |

Qeydlər:
- **Avenox** gündə ~1 video çıxarır, adətən ~17:00 UTC (20:00 TR). Release günü gecə "SIKICI KODLAMA YAYINI" canlı yayını açır (22:16–23:23 UTC). Sponsor/əməkdaşlıq: Kimi (`s5z8ec_nJow`), Higgsfield (`Ge0KN2VlgkY`), çəkilişlər (giveaway).
- **Poyraz** sabit cədvəl: hər gün 08:00 UTC (11:00 TR). Əsasən developer/web mövzuları (Docker, CDN, VPS), AI yalnız 19-dan 3 videoda. Uzun videoların çoxu sponsorludur (#işbirliği: Hostinger, hostingdunyam, TestSprite, Watchmantower). Release-ə reaksiya sürəti aşağıdır.
- **Forn AI** yeni və sürətlə böyüyən kanaldır. Hər videoda 10–25 chapter var. Açıq, təcrübə əsaslı ("Kurs değil") üslub.

## 2. Son videolar (başlıq, UTC vaxt, baxış, uzunluq)

### 2.1 Avenox (son 25)
| Tarix (UTC) | Başlıq | Baxış | Uzunluq |
|---|---|---|---|
| 09-25 15:41 | Bu Gizli Model Ücretsiz, Peki Kimin? | 11,150 | 8:17 |
| 09-24 12:21 | Kimi'yi Zorladım: Açık Kaynak Bir Model Neler Yapabiliyor? | 14,311 | 18:28 |
| 09-23 16:44 | Opus 5.5 ile GPT-6 Sol'a Aynı Simülasyonları Yaptırdım. Sonuçlar Çok Farklı. | 22,281 | 16:34 |
| 09-22 23:23 | CLAUDE OPUS 5.5 ve GPT 6 SOL GELDİ - SIKICI KODLAMA YAYINI (canlı) | 28,462 | 4:31:28 |
| 09-22 17:16 | Bugün Claude Code'a Sıfırdan Başlasam Böyle Başlardım | 32,856 | 25:23 |
| 09-21 16:59 | Jev ile İkinci Beynimi Güncelledim | 13,098 | 10:49 |
| 09-20 17:47 | Slop Olmadan da Oluyor: GPT Astra ile Sunum Yapmak | 12,847 | 9:25 |
| 09-19 11:16 | Bu Yeni Yapay Zeka Neden Bu Kadar Farklı? \| JEV | 57,662 | 15:56 |
| 09-18 17:11 | Fable ve Astra'yı Aynı Projede Birlikte Çalıştırdım | 15,101 | 37:43 |
| 09-17 18:09 | Yapay Zekayla Influencer Yapmak Mümkün mü? GPT Astra ve Seedance ile Denedim | 9,345 | 11:31 |
| 09-17 10:32 | Bu Yapay Zeka Her Sohbete Sıfırdan Başlamıyor. | 17,369 | 12:49 |
| 09-15 16:02 | Bugün Codex'e Sıfırdan Başlasam Böyle Başlardım | 22,085 | 18:47 |
| 09-14 17:00 | GPT Astra Oyun da Yapabiliyor mu? Kendim Denedim | 13,669 | 6:52 |
| 09-13 17:33 | Yapay Zeka Bizi Yok Edecek mi, Bizi mi Kandırıyorlar? | 18,095 | 12:30 |
| 09-11 17:47 | Yapay Zekaları Yeniden Sıraladım. Zirve Değişti. | 20,046 | 20:36 |
| 09-10 16:39 | GPT Astra'yı Böyle Kullanıyorum: Kendi Skill'ini Oluştur | 16,223 | 13:45 |
| 09-08 17:58 | Bu Videoyu Ben Çekmedim. Ama İçindeki Karakter Benim. | 7,591 | 8:19 |
| 09-08 11:26 | AGI Çağına Giriyoruz. Bence Çoğumuz Hazır Değiliz | 45,042 | 12:39 |
| 09-07 17:51 | Ben Tarif Ettim, GPT Astra Blender'da Yaptı | 27,026 | 8:29 |
| 09-06 19:04 | GPT Astra'dan Daha İyisi Var: Astra Pro | 21,274 | 10:01 |
| 09-05 19:39 | GPT Astra'yı Yönetmen Yaptım. Sonuçları İzleyin | 15,551 | 6:54 |
| 09-05 17:01 | GPT Astra Gerçekten AGI mı? 6 Test Sonra Cevabım Net | 38,368 | 10:44 |
| 09-04 23:10 | GPT ASTRA GELDİ, AGI MI? - SIKICI KODLAMA YAYINI (canlı) | 13,461 | 3:22:31 |
| 09-03 22:16 | GPT ASTRA? - SIKICI KODLAMA YAYINI (canlı) | 10,297 | 2:37:26 |
| 09-03 14:57 | Yapay Zekama Kendi Bilgisayarını Verdim Artık 7/24 Çalışıyor (Hermes + VPS) | 10,692 | 9:01 |

**Top-5, son 90 gün (təxmini):** Yapay Zekaya Bugün Başlasaydım Böyle Başlardım (08-19, 96,274, 26:49) · Bu Yapay Zeka 130 Gündür Kendi Hafızasını Kendisi Yazıyor (Claude + Obsidian) (08-25, 86,447, 20:54) · Bu Yeni Yapay Zeka Neden Bu Kadar Farklı? | JEV (09-19, 57,662) · AGI Çağına Giriyoruz (09-08, 45,042) · GPT Astra Gerçekten AGI mı? 6 Test Sonra Cevabım Net (09-05, 38,368).

### 2.2 Poyraz Avsever (son 25)
| Tarix (UTC) | Başlıq | Baxış | Uzunluq |
|---|---|---|---|
| 09-25 09:00 | Graph Engineering ama yeni başlayanlara | 2,384 | 25:49 |
| 09-23 08:00 | Google Drive Kullanmadan Dosyalarımı Senkronize Ettim | 3,620 | 28:43 |
| 09-18 08:00 | RSS interneti kullanmanın çok daha iyi bir yolu | 2,972 | 14:24 |
| 09-17 10:08 | Beraber Javascript Öğreniyoruz Bölüm 15 (Short) | 1,769 | 1:30 |
| 09-16 08:00 | GPT-6 Astra ile Kendime İkinci Bir Beyin Kurdum | 12,279 | 17:10 |
| 09-15 08:01 | Domain Nedir (Short) | 2,797 | 1:19 |
| 09-14 08:00 | Yapay Zeka Çağında Full Stack Developer Nasıl Olunur | 10,048 | 12:53 |
| 09-13 08:01 | Docker Nedir? (Short) | 3,026 | 1:22 |
| 09-12 08:59 | Monitoring Nedir (Short) | 2,301 | 1:21 |
| 09-11 08:00 | GPT-6 Astra'ya Kendi Yazılımımın Reklamını Yaptırdım | 7,588 | 13:18 |
| 09-10 08:02 | Beraber JavaScript öğreniyoruz ... Bölüm 14 (Short) | 2,473 | 0:51 |
| 09-09 08:00 | Production Monitoring Başlangıç Rehberi | 2,218 | 18:56 |
| 09-08 08:02 | Cache Nedir? (Short) | 3,135 | 0:58 |
| 09-07 08:00 | GPT-6 Astra Geldi: Neler Değişti | 12,663 | 18:25 |
| 09-04 08:00 | İmleç Takibi Nasıl Yapılır? (Short) | 2,379 | 1:04 |
| 09-02 08:00 | Neden Gitea Kurmalıyız? (Short) | 6,910 | 1:05 |
| 09-02 08:00 | GitHub Hesabım Suspend Edildi, Kendi GitHub'ımı Kurdum | ~9,329 (fetch-lər fərqli) | ~21:39 |
| 08-31 08:00 | CDN Nedir? (Short) | 7,620 | 1:24 |
| 08-28 08:00 | Yazılım İçin Matematik Şart Mı? (Short) | 5,254 | 1:25 |
| 08-26 08:00 | Yapay Zekaya 5000+ API Verin! (Short) | 2,485 | 1:07 |
| 08-26 08:00 | AIsa ile AI Agent'a İnternetten Fazlasını Verdik | 1,799 | 12:57 |
| 08-24 08:00 | RESTful API Nedir? (Short) | 8,604 | 1:20 |
| 08-19 08:00 | Kendi Sunucuma Yapay Zekâ Ajanı Kurdum \| Hermes Agent | 5,022 | 21:58 |
| 08-19 08:00 | Sunucuma Hermes Kurdum! (Short) | 2,981 | 0:49 |
| 08-17 08:00 | Sunucu Ne Demek? (Short) | 3,522 | 1:06 |

**Top-5, son 90 gün (təxmini):** MiniMax Code Nedir, Nasıl Kullanılır? (08-10, 82,140, 13:08; cəmi 65 like, like/view 0.08%. **Ehtimal: reklamla təşviq olunmuş baxış, bu mənim fərziyyəmdir**) · GPT-6 Astra Geldi: Neler Değişti (12,663) · GPT-6 Astra ile Kendime İkinci Bir Beyin Kurdum (12,279) · Yapay Zeka Çağında Full Stack Developer Nasıl Olunur (10,048) · GitHub Hesabım Suspend Edildi (~9.3K).

### 2.3 Forn AI (bütün 23)
| Tarix (UTC) | Başlıq | Baxış | Uzunluq |
|---|---|---|---|
| 09-25 19:20 | Opus 5.5 Jev'i Tanımıyordu, Tanıştırdım | 3,055 | 14:58 |
| 09-23 18:37 | Claude Opus 5.5'e İmkansız Görevler Verdim | 12,101 | 9:21 |
| 09-20 17:16 | Jev ile Kendime İkinci Bir Beyin Kurdum | 14,463 | 11:07 |
| 09-18 16:39 | Herkes Bu Yeni Yapay Zeka Modelini Konuşuyor (Jev) | 12,310 | 8:12 |
| 09-17 11:47 | Yapay Zekayla İlk Projene Sıfırdan Başla | 1,574 | 13:55 |
| 09-14 17:10 | Bir Ay Boyunca Yapay Zekayla Çalışınca Ne Öğrendim? | 4,465 | 17:09 |
| 09-11 19:56 | Forn AI Canlı Yayını (planlaşdırılıb) | 0 | — |
| 09-10 17:47 | GPT Astra Oyunu Yeniden Kurdu, Sonucu Test Ettim | 1,484 | 7:45 |
| 09-09 14:41 | Yapay Zekayla Oyun Yapıyoruz: Bu Kez Ciddileşti | 4,867 | 35:39 |
| 09-08 10:24 | Yapay Zekâyı Oyunum İçin İşe Aldım | 3,552 | 18:49 |
| 09-06 14:17 | Artık Bilmek Değil, Ne İstediğin Önemli (GPT-6 Astra) | 8,761 | 9:07 |
| 09-03 17:34 | Bu Modele AGI Diyorum, Linç Edin (Fable 5.1) | 4,091 | 9:55 |
| 09-01 10:14 | Opus 5 Kullanıyorsan Bu Videoyu İzle | 9,789 | 9:06 |
| 08-29 17:42 | Yapay Zekayla Hafıza Nasıl Takılır? | 7,883 | 11:24 |
| 08-23 14:16 | 10 Saatte Sıfırdan AI Influencer Kurdum | 1,528 | 13:33 |
| 08-20 12:00 | Context'i Bir de Benden Dinleyin | 1,956 | 8:56 |
| 08-17 14:51 | Aylardır Yapay Zekayı Yanlış Kullanıyormuşum | 5,392 | 10:40 |
| 08-16 10:54 | Fable ve Claude Ajanlarını Projemde Çalıştırdım | 567 | 11:51 |
| 08-13 16:00 | Tek Prompt vs 20 Ajan: Hangisi Daha İyi Video Editörü Yaptı? | 846 | 8:12 |
| 08-10 09:38 | Yapay Zekaya STRATEJİ OYUNUMU Yaptırdım! (Olabilecek En Kötüsü) | 725 | 5:12 |
| 08-09 09:39 | Kod Bilmeden Oyun Yaptım, Kendi Oyunumda Kaybettim | 622 | 8:35 |
| 08-07 13:09 | Claude'u Rezil Etmek İçin 4 Tuzak Kurdum, Ben Rezil Oldum | 862 | 6:41 |
| 08-05 17:05 | Yapay Zekayla Dijital Kopyamı Oluşturdum! | 1,678 | 11:34 |

**Top-5 (kanalın bütün ömrü = son 90 gün):** Jev ile Kendime İkinci Bir Beyin Kurdum (14,463) · Herkes Bu Yeni Yapay Zeka Modelini Konuşuyor (12,310) · Claude Opus 5.5'e İmkansız Görevler Verdim (12,101) · Opus 5 Kullanıyorsan Bu Videoyu İzle (9,789) · Artık Bilmek Değil, Ne İstediğin Önemli (8,761).

## 3. Başlıq, thumbnail, hook, quruluş

### Avenox
- **Başlıq formulları:** birinci şəxs təcrübə ("X'i Zorladım", "Aynı Simülasyonları Yaptırdım. Sonuçlar Çok Farklı.", "Kendim Denedim"); seriya "Bugün X'e Sıfırdan Başlasam Böyle Başlardım" (Claude Code 32.9K, Codex 22.1K, ümumi versiya 96.3K, kanalın 1 nömrəsi); sual + hökm ("Gerçekten AGI mı? 6 Test Sonra Cevabım Net"); sirr/maraq ("Bu Gizli Model Ücretsiz, Peki Kimin?").
- **Thumbnail:** qara fon, halftone üslubunda çəkilmiş bezgin, yarıyumulu gözlü **limon maskotu**, maskotun kənarında rəngli parıltı. Solda 2 sətir, çox qalın condensed mətn: üst sətir ağ, alt sətir sarı ("BEKLEDİĞİM / BU DEĞİLDİ", "AYNI LİGDE / DEĞİLLER", "BUGÜN / BAŞLASAYDIM"). Mətndə model adı çox vaxt yoxdur, adı loqo verir (məs. Claude ulduzu, JEV loqosu). Qeyd: `content/THUMBNAILS.md` bu formula əsaslanır.
- **Hook və quruluş (chapter-lərə görə):** ilk chapter 0:16–0:50 saniyədə bitir, dərhal konkret rəqəm və ya iddia gəlir ("1M bağlam, 525 bin token çıktı", "Benchmark ve fiyatlar"). Sponsorlu videolarda sponsor/çəkiliş 0:16–0:24-də gəlir. Tutorial quruluşu: "neyi seçmək" (Terminal mi, uygulama mı) → kurulum → model seçimi → iş axını.

### Poyraz Avsever
- **Başlıq formulları:** "X Nedir?" (Shorts), "X Geldi: Neler Değişti", "X ile Kendime ... Kurdum", "X Kullanmadan Y Yaptım".
- **Thumbnail:** ağ fon, üz (qırmızı polo), ovucunda loqo, nəhəng qara və qırmızı mətn ("GPT-6 / ASTRA / GELDİ!"). Sponsor videolarında pastel 3D kompozisiya.
- **Quruluş:** 00:00 Giriş (0:33–1:26 çəkir) → sponsor/VPS alışı → mövzu. Hook zəifdir, giriş uzundur.

### Forn AI
- **Başlıq formulları:** təxribat + təcrübə ("Claude Opus 5.5'e İmkansız Görevler Verdim", "Bu Modele AGI Diyorum, Linç Edin", "Herkes Bu Yeni Yapay Zeka Modelini Konuşuyor", "Opus 5 Kullanıyorsan Bu Videoyu İzle").
- **Thumbnail:** Avenox ilə eyni janr. Qara fon, narıncı/sarı parıltı, halftone üslubunda **tək gözlü mavi top maskotu**, 2 sətir mətn (ağ + sarı), model adı mətndə ("OPUS 5.5 / TEK PROMPT").
- **Hook və quruluş:** 0:00–0:15 "ilk izlenim" → 0:15 qiymət və benchmark → sonra 10–20 qısa demo chapter-i (hər biri 20–40 san). Sonda "testlərdə nə qədər limit xərclədim" və "son yorum". Release review-lar üçün ən yaxşı nümunədir.

## 4. SÜRƏT: rəsmi elandan video çıxana qədər (saat)

### Rəsmi elan vaxtları (T0)
| Release | T0 (UTC) | Mənbə |
|---|---|---|
| Claude Opus 5.5 | 2026-09-22 ~16:27 | HN-də ilk anthropic.com postu 16:27:30 UTC ([HN Algolia](https://hn.algolia.com/api/v1/search?query=Claude%20Opus%205.5&tags=story)); 9to5Mac 09:38 PT = 16:38 UTC ([9to5Mac](https://9to5mac.com/2026/09/22/anthropic-upgrades-claude-with-new-opus-5-5-model-details-here/)); rəsmi səhifə [anthropic.com/claude-opus-5-5](https://www.anthropic.com/claude-opus-5-5). Bir axtarış xülasəsində "16:31 UTC" deyilir, mənbəsi tapılmadı |
| GPT-6 Sol və Luna | 2026-09-22 18:00 | OpenAI RSS `Tue, 22 Sep 2026 18:00:00 GMT` ([RSS](https://openai.com/news/rss.xml)); HN 18:00:34 |
| GPT-6 Astra | 2026-09-03, 11:00 və ya ~18:18 | RSS `Thu, 03 Sep 2026 11:00:00 GMT` ([RSS](https://openai.com/news/rss.xml)), amma HN-də ilk xəbər (CNBC) 18:18 UTC, rəsmi səhifə 18:41 UTC. Hesabda **18:18** götürülüb (fərqləri kiçildir, yəni rəqiblərə qarşı ehtiyatlıdır) |
| Claude Fable 5.1 | 2026-09-01 ~17:53 | HN-də anthropic.com postu 17:53:53 UTC ([HN](https://hn.algolia.com/api/v1/search?query=Fable%205.1&tags=story)); rəsmi səhifənin öz tarixi yoxlanmayıb |
| Jev (TypeSafe AI) | 2026-09-15 ~19:25 | blog "Sep 15, 2026" ([typesafe.ai](https://typesafe.ai/blog/introducing-system-one-models-and-jev)), HN 19:25 UTC ([HN](https://news.ycombinator.com/item?id=49717558)); bax `work/research/jev-seo.md` |
| Claude Marketplace | 2026-09-23 | [claude.com/blog/claude-marketplace](https://claude.com/blog/claude-marketplace) (saat yoxdur) |
| Gemini 3.8 Flash TTS / Live Avatar | 2026-09-23 / 09-24 | [blog.google TTS](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/), [Live Avatar](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/) |
| Space Bunny Alpha (stealth, OpenRouter) | 2026-09-23 (saat yoxdur) | [OpenRouter](https://openrouter.ai/stealth/space-bunny-alpha) |

### Gecikmə cədvəli (T0-dan video `publishedAt`-ə qədər, saat)
| Kanal | Opus 5.5 | GPT-6 Sol | GPT-6 Astra (T0=18:18) | Fable 5.1 | Jev |
|---|---|---|---|---|---|
| **Avenox** | canlı yayın **+6.9**; review **+24.3** (22.3K) | canlı **+5.4**; müqayisə **+22.7** | canlı **+4.0**; ikinci canlı +28.9; review **+46.7** (38.4K) | pəncərədən kənar (yoxlanmayıb) | **+87.9** (57.7K, kanalın son 30 gündə ən yaxşısı) |
| **Forn AI** | **+26.2** (12.1K) | yoxdur | **+68.0** (8.8K) | **+47.7** (4.1K) | **+69.2** (12.3K) |
| **Poyraz** | yoxdur (09-26-ya qədər) | yoxdur | **+85.7** (12.7K) | yoxdur | yoxdur |
| WorldofAI (EN) | **+2.7** (84.8K) | xəbər toplusu +12.3 | ≥+60 (yalnız 09-06-dan sonrası yoxlandı) | — | — |
| Matthew Berman (EN) | +11.2 (167.5K) | **+0.6** (95.3K, 2 saatlıq yayın formatı); ikinci video +26.3 (59K) | pəncərədən kənar | — | Short +24.3 ("Doom in Real Time", 90.5K, Jev demosu olduğu fərziyyədir); long **+68.1 (391K)** |
| AICodeKing (EN) | +18.8 (Sol vs Opus, 19K) | +17.2 | +11.0 (24.7K) | +18.7 (17.9K) | +38.3 (37.9K) |
| Wes Roth (EN) | yoxdur | yoxdur | +3.7 ("AGI IS HERE", 173.7K; mövzunun Astra olduğu fərziyyədir) | +5.0 (74.4K) | — |
| AI Explained (EN) | +54.4 (218.6K) | — | +17.3 (**850.8K**) | — | — |

Astra üçün T0 11:00 UTC götürülsə, bütün Astra rəqəmlərinə +7.3 saat əlavə olunur.

**Ümumi nəticə:**
- Türk kanallarında **ilk redaktə olunmuş review release-dən ~22–26 saat sonra** çıxır (Avenox, Forn). Avenox-un canlı yayını 4–7 saatda başlayır, amma bu 2.5–4.5 saatlıq redaktəsiz yayındır.
- Poyraz release-ləri 3–4 gün gecikmə ilə və ya heç əhatə etmir.
- Claude Marketplace, Gemini 3.8 TTS/Live Avatar, Claude plugin portalı: **üç türk kanalının heç biri başlıqda əhatə etməyib**.
- İngilis kanallarında ən sürətlisi 0.6–3 saatdır (Berman, WorldofAI, Wes Roth).
- Sürət yeganə amil deyil: AI Explained +17 saatda 851K, Berman-ın Jev izahı +68 saatda 391K aldı. Avenox-un Jev videosu +88 saatda 57.7K ilə kanalın son ayda ən yaxşısıdır. Yeni **anlayış** (Jev kimi) üçün dərin izah gec çıxsa da qazanır. Yeni **model versiyası** üçün isə sürət daha vacibdir.

## 5. Oxşar ingilis kanalları

| Kanal | Ölkə | Abunəçi | Son 30 gün ritmi | Format / uzunluq | Son videolarda baxış | Sürət |
|---|---|---|---|---|---|---|
| [WorldofAI @intheworldofai](https://www.youtube.com/@intheworldofai) | CA | 239K | ~gündə 1, 06:15 UTC (21 gündə 18) | gündəlik "HUGE ... LEAKS ... AI NEWS" topluları + "(FULLY TESTED)" review-lar, 9–22 dəq | 45K–157K | Opus 5.5 +2.7s |
| [AICodeKing @AICodeKing](https://www.youtube.com/@AICodeKing) | US | 132K | gündə 1, ~09:15 UTC (25 gündə 25) | "X (Fully Tested): <hökm>!", 5–16 dəq, öz benchmark-ı (KingBench) | 1K–39K | 11–19s |
| [Matthew Berman @matthew_berman](https://www.youtube.com/@matthew_berman) | US | 637K | 14 gündə 25 (~1.8/gün), çoxu Short | Short (23–73 san) + long (7–47 dəq) + canlı reaksiya | Short 3K–98K; long 59K–391K | Sol +0.6s, Opus +11s |
| [Wes Roth @WesRoth](https://www.youtube.com/@WesRoth) | US | 328K | ~16 / 30 gün | xəbər şərhi, 8–38 dəq, maraq başlıqları ("OpenAI JUST got HACKED...") | 64K–261K | Astra +3.7s, Fable +5s |
| [AI Explained @aiexplained-official](https://www.youtube.com/@aiexplained-official) | GB | 451K | 3 / 30 gün | dərin analiz, 25–33 dəq, minimal thumbnail (ağ fonda "GPT-6") | 213K–851K | 17–54s |

Başlıq və thumbnail müşahidələri (EN):
- WorldofAI: "X IS THE Greatest AI Model EVER! Cheaper, Fast, & Powerful! (FULLY TESTED)". Thumbnail rəsmi elan üslubundadır (loqo + "INTRODUCING OPUS 5.5"). Chapter-lər: Intro → müqayisə → benchmark → qiymət → "How To Use".
- AICodeKing: ekran görüntüsü + benchmark bar chart + 2 blok mətn ("SOL VS OPUS / INTERESTING!").
- Berman: üz + bir söz ("Jev"). Başlıq qısa və emosionaldır ("We need to talk about Jev...", "Anthropic went CRAZY (Opus 5.5)").
- Çoxunda sponsor/affiliate var (Zapier, Scrimba, Bambooed, Skool, Patreon).

## 6. Tövsiyələr

### 6.1 Hansı format və mövzu daha çox baxış alır (məlumata görə)
1. **"Sıfırdan başlasaydım" tipli başlanğıc tutorial-ları** (evergreen): Avenox-un 1-ci (96K) və 5-ci (32.9K) videoları. Release günü bu formatı yeni alətə bağlamaq ən güclü kombinasiyadır. Avenox bunu Opus 5.5 çıxdığı gün, +0.8 saatda "Claude Code'a sıfırdan başlasam" ilə etdi.
2. **İkinci beyin / yaddaş** mövzusu hər üç TR kanalda top-5-dədir (86K, 14.5K, 12.3K). Bizim `brain` sistemi real nümunədir.
3. **Yeni anlayışın izahı** (Jev): gec olsa da ən yüksək nəticə (Berman 391K, Avenox 57.7K).
4. **Release review "N test / imkansız tapşırıq / eyni prompt iki model"**: TR-də 12–38K. Sürət burada həlledicidir.
5. Uzunluq: TR-də qalib videolar 9–27 dəq. Release review üçün **8–12 dəq**, tutorial üçün **15–25 dəq**. 2+ saatlıq canlı yayınlar baxışı saxlayır (10–28K), amma bizim format deyil.
6. Release Shorts: TR AI kanalları release-lərdə Short çıxarmır. Berman-ın Short-ları 25–98K alır. Bu, boş yerdir.

### 6.2 "İlk çıxan" iş axını: hədəf saatlar
| Pillə | Hədəf (T0-dan) | Kimi qabaqlayır | Məzmun |
|---|---|---|---|
| **T+2–3 saat** | EN + TR **Short/news flash** (≤60 san, rəsmi rəqəmlər, 1 real test) | hamını: TR-də rəqib Short yoxdur, Avenox canlısı +4–7s | "Nə çıxdı, qiymət, 1 demo" |
| **T+8–12 saat** | EN + TR **redaktə olunmuş review 8–12 dəq** ("X test etdim") | Avenox (+22–24s) və Forn (+26s) ~12 saat fərqlə. EN-də Berman (+11s) və AICodeKing (+17–19s) səviyyəsi | Forn quruluşu: 0:00 hökm → 0:15 qiymət/benchmark → 6–10 demo chapter → limit/xərc → hökm |
| **T+24–72 saat** | **tutorial** ("X-ə sıfırdan başlamaq", "X ilə ikinci beyin") | Avenox-un evergreen formatı | 15–25 dəq, chapter-li |

Praktik qeyd: böyük release-lər 16:00–18:30 UTC-də gəlir (Bakı 20:00–22:30). T+12 hədəfi = növbəti gün ~06:00 UTC (Bakı 10:00, TR 09:00), yəni TR auditoriyası oyananda bizim video artıq hazır olur. Bunun üçün lazımdır: (a) release siqnalı üçün monitorinq (RSS + HN), (b) hazır test paketi (eyni 6–8 prompt hər model üçün, nəticələr müqayisə edilə bilsin), (c) hazır thumbnail şablonu, (d) Piper TR səsi və altyazı eyni pipeline-da.

### 6.3 Başlıq və thumbnail naxışları (kopyalamadan)
- Başlıq: **birinci şəxs + konkret test sayı + hökm** ("I Gave Opus 5.5 8 Impossible Tasks" / "Opus 5.5'e 8 İmkansız Görev Verdim"). Model adı ilk 40 simvolda. Sual + cavab vədi ("… Worth It? 6 Tests") işləyir.
- "Sıfırdan başlasaydım" seriyası üçün öz adımız lazımdır (məs. "Lazy Start: X in 20 min" / "Tembel Başlangıç"). Formatı götürürük, ifadəni yox.
- **Diqqət (vacib):** `content/THUMBNAILS.md` Avenox formulunu referans götürür (qara fon, bezgin maskot, ağ + sarı 2 sətir, rim light). Forn AI da artıq eyni janrdadır (bezgin mavi maskot, qara fon). TR lentində üç kanal eyni görünəcək. Tövsiyə: bir **fərqləndirici imza** əlavə etmək, məsələn sabit künc nişanı "TESTED · Xh after release" / "Xs sonra test", yaşıl kaktus rəngini aparıcı aksent etmək və ya fonda KAXO-nun ofisi. Bu, sahibin və marketer-in qərarıdır.

### 6.4 Tuta biləcəyimiz boşluq
1. **EN + TR eyni gün**: TR kanalları yalnız türkcədir, EN kanalları yalnız ingiliscədir. Biz eyni videonu iki dildə T+12 saatda verə bilərik.
2. **Model olmayan release-lər**: Claude Marketplace, plugin portalı, Gemini 3.8 TTS, Flow alətləri, ElevenLabs API-ləri. TR kanalları bunları əhatə etmir.
3. **Release Shorts** (T+2–3 saat): TR-də rəqibsiz.
4. **Dürüst, mənbəli test**: sponsorsuz, "şirkət iddia edir" ilə "biz yoxladıq" ayrılır. Poyraz və Avenox-da sponsorlar çoxdur.
5. **AI şirkəti hekayəsi**: bütün işçiləri agent olan şirkət hər aləti öz işində sınayır. Bu, "Bir ay AI ilə çalışdım" (Forn) tipli təcrübə formatının daha güclü versiyasıdır.

## 7. Mənbələr
- YouTube Data API v3: `https://www.googleapis.com/youtube/v3/{channels,playlistItems,videos,search}` (açar `.env`-də, burada yazılmır)
- Kanallar: https://www.youtube.com/@Avenoxai , https://www.youtube.com/@poyrazavsever , https://www.youtube.com/@FornYapayZeka , https://www.youtube.com/@intheworldofai , https://www.youtube.com/@AICodeKing , https://www.youtube.com/@matthew_berman , https://www.youtube.com/@WesRoth , https://www.youtube.com/@aiexplained-official
- OpenAI RSS: https://openai.com/news/rss.xml
- HN Algolia: https://hn.algolia.com/api/v1/search?query=Claude%20Opus%205.5&tags=story , https://hn.algolia.com/api/v1/search?query=GPT-6%20Sol&tags=story , https://hn.algolia.com/api/v1/search?query=GPT-6%20Astra&tags=story , https://hn.algolia.com/api/v1/search?query=Fable%205.1&tags=story
- 9to5Mac Opus 5.5: https://9to5mac.com/2026/09/22/anthropic-upgrades-claude-with-new-opus-5-5-model-details-here/
- Space Bunny Alpha: https://openrouter.ai/stealth/space-bunny-alpha
- Kimi K3 (Avenox-un 09-24 videosu release reaksiyası deyil, K3 2026-07-16-da elan olunub): https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems
- Daxili: `work/research/gundem-2026-09-25-official.md`, `work/research/gundem-2026-09-26-official.md`, `work/research/jev-seo.md`, `content/THUMBNAILS.md`
