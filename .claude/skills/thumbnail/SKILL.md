---
name: thumbnail
description: KAXO kanalı üçün thumbnail hazırlayır - mətn ideyaları, ChatGPT-də KAXO pozası (brauzer), fonun silinməsi, loqo, HTML render (Anton şrifti, qara fon, ağ+sarı mətn, rəngli parıltı), kiçik ölçüdə oxunaqlıq yoxlaması. İstifadəçi "/thumbnail", "thumbnail hazırla" yazanda və ya /video-nun SEO addımında işə sal.
---

# /thumbnail: KAXO thumbnail-i

Arqumentlər:
- `/thumbnail`: ən son epizod üçün.
- `/thumbnail <epizod qovluğu>`: həmin epizod üçün.
- `/thumbnail <mövzu>`: epizodsuz, `content/thumbnails/<tarix>-<slug>/` qovluğunda.

**Əvvəlcə oxu:** `content/THUMBNAILS.md` (bütün qaydalar), `content/character/character.md`, `content/lessons.md` (thumbnail dərsləri varsa).

Python həmişə layihənin venv-i ilə işlədilir: `tools/video/.venv/Scripts/python`.

## Fayllar (epizod qovluğunda `thumb/`)
```
thumb/pose-raw.png    ChatGPT-dən gələn poza
thumb/mascot.png      fonsuz, beldən yuxarı KAXO
thumb/<logo>.svg      kontekst elementi (lazım olsa)
thumb/spec.json       render spesifikasiyası
thumb/thumbnail.png   1280x720 nəticə (+ thumbnail-small.png)
thumb/cover.png       9:16 variant (Shorts/TikTok/IG cover, lazım olsa)
```

## 1. Mətn və konsepsiya
1. Epizodun `episode.json`, `seo.json` və `script.md` fayllarından əsas ideyanı və punchline-ı götür.
2. THUMBNAILS.md-dəki formullara görə **3 mətn variantı** yaz. Hər biri 2 sətirdir: ağ və sarı, ən çox 5 söz. Hər variantı başlıqla birlikdə oxu: başlığı təkrar etməməli, tamamlamalıdır.
3. Hər variant üçün seç:
   - poza;
   - əldəki əşya və ya loqo;
   - parıltı rəngi (mövzuya görə);
   - fon: qara, yoxsa mövzu şəkli.
4. Ən güclüsünü seç. Qalan ikisini `seo.json`-da `thumbnail_alternatives`-ə yaz, gələcək A/B test üçün lazımdır.

## 2. KAXO-nun pozası: ChatGPT (Claude in Chrome)
`/video`-nun 5-ci addımındakı brauzer qaydaları burada da keçərlidir:
- hesaba sahib özü daxil olur;
- limit bitəndə dayanırsan və sahibə bildirirsən;
- hesablar arasında özün keçid etmirsən.

1. Epizodun ChatGPT söhbəti açıqdırsa, orada davam et. Yoxdursa, yeni söhbət aç və birinci mesajda referans şəkli (`content/character/reference.jpg`) və stil prompt-unu göndər.
2. THUMBNAILS.md-dəki poza şablonunu doldurub göndər. Parıltı rəngi seçilmiş rəngdir, fon **tünd qara**dır.
3. Endir: `/video` 5-ci addımdakı JS ilə, fayl adı `thumbpose.png`. Sonra `tools/video/.venv/Scripts/python tools/video/take_download.py <qovluq> thumbpose` və nəticəni `thumb/pose-raw.png`-ə köçür.
4. `Read` ilə yoxla:
   - gözlər yarıyumulu, bezgindir;
   - xarakter referansa uyğundur;
   - şəkildə mətn yoxdur;
   - bədən sola dönüb.

   Uyğun deyilsə, ən çox 2 dəfə yenidən istə.

## 3. Fonu silmək
```bash
tools/video/.venv/Scripts/python tools/video/cutout.py thumb/pose-raw.png thumb/mascot.png --keep-top 0.62
```
- `--keep-top` belin hündürlüyünə görə 0.55–0.7 arasında seçilir. Şəkil artıq beldən yuxarıdırsa, `1.0` qoy.
- Nəticəni `Read` ilə yoxla: kənarlarda qara fon qalıbmı, tikanlar kəsilibmi? Pisdirsə, `--model u2net` ilə təkrarla.

## 4. Loqo (kontekst elementi)
- `content/assets/logos/<slug>.svg` varsa, onu istifadə et. Yoxdursa: `curl -s -o content/assets/logos/<slug>.svg "https://cdn.simpleicons.org/<slug>/<hex>"` (HTTP 200 olmalıdır).
- Faylı `thumb/`-a köçür.
- KAXO əşyanı özü tutursa, ayrıca loqo lazım deyil. Əlində boş kartoçka varsa, loqonun `x/y` koordinatını əlin üstünə qoy.

## 5. Render
`thumb/spec.json` (tam sahələr `tools/video/thumbnail.js`-in başındadır):
```json
{ "format": "16x9", "line1": "5 EMPLOYEES", "line2": "ZERO HUMANS", "mascot": "mascot.png",
  "glow": "#19d3ff", "background": null,
  "elements": [ { "src": "claude.svg", "x": 0.70, "y": 0.78, "w": 0.12, "rotate": -8, "glow": "#ff7a45" } ],
  "mascot_scale": 1.12, "mascot_x": 0.0, "mascot_y": 0.08 }
```
```bash
node tools/video/thumbnail.js <qovluq>/thumb/spec.json
```

## 6. Yoxlama (məcburi)
1. `thumbnail.png`-ə `Read` ilə bax:
   - mətn KAXO-nun üstünə düşmür;
   - KAXO-nun üzü tam görünür;
   - loqo əlin yanındadır;
   - ağ və sarı mətn qara fonda kəskin görünür.
2. `thumbnail-small.png`-ə bax (320 px, feed ölçüsü). Mətn bir baxışda oxunmalıdır. Oxunmursa, sözləri qısalt və ya `mascot_scale`-i azalt.
3. Düzəliş lazım olsa, `spec.json`-u dəyiş və yenidən render et. `mascot_x`, `mascot_y`, `mascot_scale`, element `x/y/w` ilə tənzimlənir. Ən çox 3 iterasiya.
4. Shorts üçün eyni spec-i `"format": "9x16"` ilə `thumb/cover.png`-ə render et.

## 7. Təhvil
- Long video: `seo.json` → `"thumbnail": "thumb/thumbnail.png"`.
- Short: `seo.json` → `"cover": "thumb/cover.png"`. YouTube Shorts-da cover veb Studio-dan dəyişdirilə bilmirsə, bunu hesabata yaz və TikTok/IG üçün saxla.
- Sahibə thumbnail-i və 2 alternativ mətni göstər. Son söz sahibindir.
