---
name: thumbnail
description: KAXO kanalı üçün thumbnail hazırlayır - ziddiyyət ideyası və mətn variantları, ChatGPT-də KAXO ilə parlaq cizgi səhnə (brauzer), HTML render (ağ + tomat-qırmızı mətn, qalın kontur), kiçik ölçüdə oxunaqlıq yoxlaması. İstifadəçi "/thumbnail", "thumbnail hazırla" yazanda və ya /video-nun SEO addımında işə sal.
---

# /thumbnail: KAXO thumbnail-i

Arqumentlər:
- `/thumbnail`: ən son epizod üçün.
- `/thumbnail <epizod qovluğu>`: həmin epizod üçün.
- `/thumbnail <mövzu>`: epizodsuz, `content/thumbnails/<tarix>-<slug>/` qovluğunda.

**Əvvəlcə oxu:** `content/THUMBNAILS.md` (bütün qaydalar), `content/character/character.md`, `content/lessons.md` (thumbnail və CTR dərsləri varsa).

Python həmişə layihənin venv-i ilə işlədilir: `tools/video/.venv/Scripts/python`.

## Fayllar (epizod qovluğunda `thumb/`)
```
thumb/scene-raw.png   ChatGPT-dən gələn mətnsiz səhnə (KAXO daxil)
thumb/spec.json       render spesifikasiyası
thumb/thumbnail.png   1280x720 nəticə (+ thumbnail-small.png)
thumb/cover.png       9:16 variant (short cover, lazım olsa)
```

## 1. Ziddiyyət və mətn
1. `episode.json`, `seo.json` və `script.md`-dən sualı və ən təəccüblü faktı götür.
2. **3 konsepsiya** yaz. Hər birində: vizual ziddiyyət (nə dolu, nə boş, nə yerində deyil), KAXO-nun ifadəsi, 2–4 sözlük mətn (bir açar söz qırmızı). Hər variantı başlıqla birlikdə oxu: başlığı təkrar etməməli, tamamlamalıdır.
3. Ən güclüsünü seç. Qalan ikisini `seo.json` → `thumbnail_alternatives`-ə yaz (A/B test üçün, YouTube "Test & compare").

## 2. Səhnə: ChatGPT (Claude in Chrome)
`/video` → "Əlavə: ChatGPT brauzer qaydaları" burada keçərlidir (ChatGPT yalnız thumbnail üçündür, RULES §5.0): hesaba sahib daxil olur, limit bitəndə dayanırsan, hesablar arasında özün keçid etmirsən.
1. Epizodun ChatGPT söhbəti açıqdırsa, orada davam et. Yoxdursa, yeni söhbət: referans (`content/character/reference.png`) + stil prompt-u + ardıcıllıq bloku.
2. THUMBNAILS.md-dəki səhnə şablonunu doldurub göndər (16:9, yuxarı 25% sakit, mətn yoxdur).
3. Endir (`/video` → Əlavə bölməsindəki JS, fayl adı `thumbscene.png`) → `take_download.py <qovluq> thumbscene` → `thumb/scene-raw.png`.
4. `Read` ilə yoxla: ziddiyyət bir baxışda görünür; KAXO referansa uyğundur, ifadəsi şişirdilmişdir; şəkildə hərf yoxdur; yuxarı hissə mətn üçün boşdur. Uyğun deyilsə, ən çox 2 dəfə yenidən istə.

## 3. Render
`thumbnail.js` → `"mode": "scene"` (spec sahələri alətin başındakı şərhdədir): `{ "mode": "scene", "background": "scene-raw.png", "title": "BANNED FOR 1,200 YEARS?", "accent": "BANNED", "align": "left", "width": 0.6 }`. Başlıq yuxarıda, səhnənin boş tərəfinə (`align`) qoyulur.
```bash
node tools/video/thumbnail.js <qovluq>/thumb/spec.json
```

## 4. Yoxlama (məcburi)
1. `thumbnail.png`: mətn KAXO-nun üzünə düşmür, ziddiyyət kəsilməyib, mətn kontrastlıdır.
2. `thumbnail-small.png` (320 px): mətn və ziddiyyət bir baxışda oxunur. Oxunmursa, sözləri qısalt və ya səhnəni sadələşdir. Ən çox 3 iterasiya.
3. Short üçün eyni səhnədən `"format": "9x16"` ilə `thumb/cover.png`.

## 5. Təhvil
- `seo.json` → `"thumbnail": "thumb/thumbnail.png"` (short: `"cover"`).
- Sahibə thumbnail-i və 2 alternativi göstər. Son söz sahibindir.
