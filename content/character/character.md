# Xarakter: KAXO

> KAXO həm personajın, həm də YouTube kanalının adıdır.

![reference](reference.jpg)

**Referans şəkil:** `content/character/reference.png`. Hər şəkil generasiyasına **mütləq** əlavə olunur.

## Kimdir

- Kaktus. Şirkətin sahibidir, bütün işçiləri AI agentləridir.
- Özü heç nə etmir: divanda uzanır, "nəzarət edir", ideya atır, sonra yatır.
- Tənbəl, sakit, quru yumorlu, özünə ironiya ilə baxan. Heç vaxt əsəbləşmir, sadəcə yorulur.
- Bilmədən düz deyir: agentlər həqiqətən bütün işi görür, o isə bunu açıq etiraf edir.

## Görünüş (dəyişməz)

- Uzun, açıq-yaşıl kaktus bədəni, şaquli zolaqlar, seyrək qara tikanlar.
- Başının üstündə bir neçə qısa tük kimi tikan.
- Qalın qara qaşlar, ağır, yarıyumulu göz qapaqları, tənbəl təbəssüm, seyrək, əyri dişlər, kiçik burun.
- Yalnız tünd-boz şort geyinir, bağı ağ rəngdədir. Ayaqyalın, köynəksiz, bir az qarınlı.
- Əyilmiş, rahat duruş, əlləri çox vaxt ciblərində olur.

## Stil prompt-u (sahibin prompt-u, dəyişmədən)

```
Create an animated scene in the style of a contemporary adult cartoon sitcom. The animation style should use rough, expressive hand-drawn linework, simple flat color fills, and intentionally exaggerated features such as droopy eyelids, uneven teeth, and slouched posture. The overall mood should feel humorous yet mundane, with minimal shading and bold outlines.
```

## Ardıcıllıq bloku (hər səhnə prompt-unun sonuna)
`{ASPECT}`: short üçün `Vertical 2:3`, long üçün `Horizontal 3:2 (landscape, leave some space around the character)`.

```
Keep the character EXACTLY as in the attached reference image: same cactus body shape, same light-green colour and vertical ridges, same sparse black spines and spiky hair tuft, same heavy eyebrows, droopy eyelids, uneven teeth, dark-grey shorts with white drawstring, barefoot, slouched posture. Do not add clothes, accessories or text unless the scene asks for it. {ASPECT} image, no captions, no watermark.
```

## Səs

| Rol        | Default                  | Tərz                                                    |
| ---------- | ------------------------ | ------------------------------------------------------- |
| `kaxo`     | `am_puck`, speed 0.92    | tənbəl, yavaş, quru; cümlə sonunda sanki əsnəyir        |
| `narrator` | `bm_fable`, speed 1.02, `lang: en-us` (sahib seçib, 2026-09-25) | britaniya səsi amerikan tələffüzü ilə, sənədli film diktoru kimi ciddi; kontrast yumor yaradır |

- **Eyni səs, iki rol:** KAXO da, diktor da `bm_fable`-dır. Onları temp (KAXO 0.9, diktor 1.02), altyazı rəngi (KAXO yaşıl) və yazı tərzi (KAXO qısa, bezgin; diktor ciddi) ayırır. Ssenaridə kimin danışdığı ilk sözlərdən aydın olmalıdır.
- **Səs seçmək:** `content/voice-samples/` qovluğunda eyni cümlələr fərqli səslərlə oxunub (`kaxo__*.wav`, `narrator__*.wav`). Sahib qulaqla seçir, seçim bu cədvələ və `tools/video/tts.py`-dəki `DEFAULT_VOICES`-ə yazılır.
- **Qarışıq səs:** `"am_puck:0.6+am_fenrir:0.4"` kimi iki səs qarışdırıla bilər. Nəticə KAXO-ya xas unikal səs olur.
- **Təbiilik:** fasilələr durğu işarələrindən gəlir, `[pause]`/`[pause 0.6]` komik fasilə verir, hər cümlənin tempi bir az dəyişir (`tts.py`). Danışıq qaydaları: RULES §3a.

## Thumbnail pozaları

Pozanın şablonu və siyahısı [../THUMBNAILS.md](../THUMBNAILS.md)-dədir. Hər pozada xarakter dəyişmir, yalnız bədən və əldəki əşya dəyişir.

## Etməz

- Spirtli içki, siqaret, narkotik göstərmir. Reklamçılar üçün təhlükəsiz qalır.
- Başqa brendlərin personajlarına (Rick and Morty və s.) bənzədilmir və onlara istinad etmir.
- Real insanları, siyasəti ələ salmır.
