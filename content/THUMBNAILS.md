# Thumbnail qaydaları: KAXO

`/thumbnail` skill-i (və `/video`-nun SEO addımı) bu fayla əməl edir. Referans janr: [@menumetre](https://www.youtube.com/@menumetre/videos) və [@Meraklı](https://www.youtube.com/@Merakl%C4%B1-f6k/videos) (parlaq cizgi səhnə + iri sual mətni + ifadəli personaj). Janrın dilini götürürük, amma personaj, rənglər, şrift və kompozisiya bizimdir.

## Formul
| Element | Qayda |
|---|---|
| **Səhnə** | Bütün kadr bir parlaq cizgi səhnədir (bazar, mağara, gecə düşərgəsi, laboratoriya, liman). Fon qaranlıqlaşdırılmır, rənglər doyğundur, mavi səma və ya isti işıq olur. |
| **Ziddiyyət** | Thumbnail-in mərkəzində bir vizual ziddiyyət və ya gərgin an olur: boş vitrin qabı, yatan insanı iyləyən canavar, pərdə arxasında gizlənən mağara adamı, "?" ilə işarələnmiş yer. Bir baxışda "nəsə düz deyil" hissi yaradır. |
| **KAXO** | Kadrın sağ və ya sol 35–45%-ində, beldən yuxarı, epizodun geyimində, şişirdilmiş ifadə ilə (təəccüb, şübhə, "wait, what?"). Əlindəki əşya ilə ziddiyyətə işarə edir. Səhnənin özü hekayədirsə (məsələn, tarixəqədərki insanlar), KAXO kiçik ola və ya kənardan baxa bilər. |
| **Mətn** | Yuxarıda, kadrın enində, 2–4 söz, ən çox 22 simvol. Qalın yuvarlaq şrift, **ağ** doldurma və qalın tünd kontur. Bir açar söz **tomat-qırmızı** (`#FF4D2E`) olur. Mətn həmişə sualdır və ya ziddiyyətdir. |
| **Seriya nişanı** | Seriya videosunda aşağı sol küncdə kiçik nişan: "BUTCHER'S WINDOW · 1/2". |
| **Kanal işarəsi** | Thumbnail-də loqo olmur. |

**Fərqləndirmə:** referans kanalların sarı mətni, yaşıl kapüşonlu oğlanı və çöp adamları işlədilmir. Bizim mətnimiz ağ + tomat-qırmızı, aparıcı KAXO-dur.

**Reklam uyğunluğu (RULES §12.3):** thumbnail-də qan, yara, çılpaqlıq, silah, iyrənc detal, qorxu üzü yaxın planda olmur. Təhlükə yumorla verilir (canavarın çaşqın baxışı).

## Mətn yazmaq
- Başlığı təkrarlamır, onu tamamlayır. Başlıq sualı verir, thumbnail ziddiyyəti göstərir.
- Formullar:
  - ziddiyyət: "SHEEP YES, GOAT NO?";
  - "əgər": "WHAT IF YOU ATE WHALE?";
  - sual: "WHY NO ATTACK?", "ZERO PRIVACY?";
  - rəqəm: "ONLY 1 IN 30 LEFT";
  - qəribə fakt: "IT'S NAMED AFTER A COUNTRY".
- Yalan vəd olmur. Videoda olmayan şey thumbnail-də də olmur.
- Mətn 10 dilə tərcümə olunmur: thumbnail ingiliscədir, sadə sözlərlə yazılır.

## Şəkil (ChatGPT ilə)
- Səhnə **mətnsiz** generasiya olunur. Mətn sonradan kodla yazılır (`tools/video/thumbnail.js`), AI mətni işlədilmir.
- Prompt şablonu (stil prompt-u + ardıcıllıq bloku ilə birlikdə):
```
Thumbnail scene, horizontal 16:9. <SƏHNƏ: məsələn, a butcher's shop window with lamb and beef on trays and one empty tray marked with a goat flag>. KAXO from the reference image on the <RIGHT/LEFT>, wearing <OUTFIT>, waist-up and large (about 40% of the frame width), <İFADƏ: wide-eyed surprised / suspicious squint / jaw dropped>, pointing at <ZİDDİYYƏT> with <PROP>. Bright saturated colors, clear blue sky or warm light, simple background, strong contrast. Leave the top 25% of the image calm and uncluttered for a title. No text, no letters, no logos.
```
- İfadələr: `wide-eyed surprised, mouth open` · `suspicious squint, one eyebrow raised` · `hand on chin, thinking hard` · `jaw dropped, glasses slipping` · `grinning, holding up the food item` · `shrugging with the prop`.
- Real brend loqosu çəkilmir.

## Texniki
- Ölçü: 1280×720 (16:9). Short cover: 1080×1920 (`"format": "9x16"`): mətn yuxarıda, KAXO aşağıda.
- Render: `node tools/video/thumbnail.js <spec.json> [out.png]`, `"mode": "scene"` (2026-10-31): fon qaraldılmadan tam kadr, başlıq yuxarıda ağ Lilita One + qalın tünd kontur, `accent` sözü tomat-qırmızı, istəyə görə `badge`. Nümunə: `content/episodes/2026-10-31-japan-beef/thumb/spec.json`.
- Yoxlama: `*-small.png` (320 px) açılıb baxılır. Mətn və ziddiyyət bir baxışda oxunmursa, sözlər qısaldılır və ya səhnə sadələşdirilir.
- Fayl ölçüsü < 2 MB (YouTube limiti).
