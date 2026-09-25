# Thumbnail qaydaları

`/thumbnail` skill-i (və `/video`-nun SEO addımı) bu fayla əməl edir. Referans üslub: [@Avenoxai](https://www.youtube.com/@Avenoxai/videos). Onların formulunu götürürük, amma maskotumuz, rənglərimiz və mətnlərimiz özümüzündür, heç nə kopyalanmır.

## Formul (sahibin qaydaları)
| Element | Qayda |
|---|---|
| **Mətn** | Solda iri, qalın, dar şrift (Anton). Adətən 2 sətir: yuxarıda **ağ**, aşağıda **sarı** (`#FFD21F`). Qısa, maraq oyadan, hər sətir 1–3 söz. |
| **Rənglər** | Qara fon, sarı və ağ mətn. Kontrast güclüdür. Arxada mövzuya uyğun rəngli parıltı ola bilər, ya da mövzuya aid qaraldılmış fon şəkli. |
| **Maskot** | Hər thumbnail-da KAXO var: bezgin, yarıyumulu gözlü. Mövzuya görə pozası dəyişir (düşünür, arxayın dayanır, əlində loqo tutur). Kənarında **rəngli parıltı** (rim light) olur. |
| **Kontekst elementi** | Mövzuya aid kiçik loqo və ya əşya. Çox vaxt KAXO onu əlində tutur və ya yanında olur. |
| **Kompozisiya** | Mətn solda, KAXO sağda. KAXO beldən yuxarı, iri, başı yuxarı kənara yaxın görünür. Sadə və səliqəlidir, kiçik ölçüdə də rahat oxunur. |

## Referans kanaldan müşahidələr
- KAXO kadrın hündürlüyünü tamamilə doldurur, eni ~35–40% tutur, üzü thumbnail-in ən parlaq yeridir.
- Mətn sol yarını doldurur. Hər sətir öz eninə görə böyüdülür, sətirlər arası çox sıxdır.
- Parıltı rəngi mövzuya görə dəyişir: mavi (texnologiya, AI alətləri), narıncı (Claude, enerji, problem), bənövşəyi (yeni, sirli), yaşıl (pul, uğur).
- Kontekst elementinin də öz parıltısı var, beləcə qara fonda seçilir.
- Mətndə ən çox 2 əsas rəng olur (ağ və sarı). Başqa rəng yalnız loqolardan gəlir.

## Mətn yazmaq
- Başlığı təkrarlamır, onu tamamlayır: başlıq izah edir, thumbnail maraq oyadır.
- Formullar:
  - ziddiyyət: "5 EMPLOYEES / ZERO HUMANS";
  - sual: "WHO'S THE BOSS?";
  - qısa hökm: "IT WORKED / SOMEHOW";
  - rəqəm + şok: "$0 / FOR 30 DAYS".
- Ən çox 5 söz, 2 sətir. 2-ci sətir (sarı) zərbə sətridir.
- Yalan vəd olmur. Videoda olmayan şey thumbnail-də də olmur.

## Maskot pozası (ChatGPT ilə)
- Hər thumbnail üçün yeni poza yaradılır, amma xarakter referansdakı kimi qalır.
- Poza prompt-u `character.md`-dəki stil prompt-u ilə yanaşı işlədilir. **Poza prompt-una mətn yazılmır.**
```
KAXO from the reference image, waist-up portrait, body turned slightly to the LEFT (towards empty space for text), <POZA>, <ƏLİNDƏ NƏ VAR>. Same droopy half-closed eyes and bored expression. Plain solid black background, strong <RƏNG> rim light on the edges of the character, no text, no logo unless described, vertical 2:3.
```
- Pozalar: `thinking, hand on chin` · `arms crossed, smug and relaxed` · `holding a small object up next to his face` · `pointing left at the text, unimpressed` · `shrugging` · `sipping from a mug, eyes half closed` · `peeking from the right edge`.
- Real brend loqosunu AI çəkmir (əyri çıxır). KAXO boş kartoçka və ya əşya tutur, əsl loqo `elements` ilə üstünə qoyulur.
- Şəkil `tools/video/cutout.py --keep-top 0.62` ilə fonsuz edilir və beldən kəsilir.

## Loqolar
- Mənbə: `https://cdn.simpleicons.org/<slug>/<hex>` (SVG, rəng ilə). Saxlanılır: `content/assets/logos/<slug>.svg`.
- Simpleicons-da olmayan loqo: brendin rəsmi press-kit səhifəsindən.
- Loqo dəyişdirilmir, üstünə mətn yazılmır. Ölçüsü kadr eninin 10–14%-i olur.

## Texniki
- Ölçü: 1280×720 (16:9). Shorts, TikTok və Instagram cover üçün 1080×1920 (`"format": "9x16"`): mətn yuxarıda, KAXO aşağıda.
- Render: `node tools/video/thumbnail.js <spec.json> [out.png]`. Mətn real şriftlə yazılır, AI mətni işlədilmir.
- Yoxlama: `*-small.png` (320 px) açılıb baxılır. Mətn oxunmursa, sözlər qısaldılır.
- Fayl ölçüsü < 2 MB (YouTube limiti).
