---
name: gundem
description: AI gündəmini izləyir - yeni modellər, alətlər, buraxılışlar, şirkət xəbərləri. Mənbələri yoxlayır, təsdiqlənmiş xəbərlərdən KAXO üçün kontent ideyaları (long və short) çıxarır, content/news/ və ideas.md-yə yazır. İstifadəçi "/gundem", "gündəm", "xəbərlərə bax" yazanda və ya /video araşdırma addımında (gündəm 24 saatdan köhnədirsə) işə sal.
---

# /gundem: AI gündəmi → KAXO ideyaları

**Əvvəlcə oxu:** `content/RULES.md` §13 (gündəm qaydaları), `content/ideas.md`, ən son `content/news/*.md` (təkrar yazmamaq üçün), `content/published.md`.

## 1. Toplama (2 `researcher` agenti, eyni mesajda)
Hər ikisi son **72 saata** baxır (sahib başqa aralıq deyibsə, o aralığa). Hər xəbər üçün: başlıq, tarix, **birinci mənbə URL-i**, 1 cümləlik "nə dəyişdi".

- **A. Rəsmi mənbələr (birinci mənbə):**
  - Anthropic news, OpenAI blog, Google DeepMind / Google AI blog, Meta AI, Mistral, xAI, DeepSeek, Qwen, Microsoft AI, Apple ML, NVIDIA;
  - Hugging Face trending modellər;
  - GitHub trending (AI repoları);
  - Product Hunt (AI kateqoriyası).
- **B. Gündəm siqnalları (nə müzakirə olunur):**
  - Hacker News ön səhifəsi (`https://hn.algolia.com/api/v1/search?tags=front_page`);
  - YouTube autocomplete (`suggestqueries…&ds=yt&q=` ilə "new ai", "claude", "gpt", "gemini", "ai agent" və s.);
  - "AI news this week" axtarışı.

  Nəticə: A-dakı xəbərlərdən hansıları həqiqətən çox danışılır, bir də A-da olmayan, amma çox müzakirə olunan mövzular.

## 2. Yoxlama (CEO)
- Hər xəbərin **birinci mənbəyi** olmalıdır: rəsmi blog, sənəd, repo. Yalnız sosial media və ya şayiə varsa, xəbər "təsdiqlənməyib" kimi işarələnir və kontentə **girmir**.
- Tarix yoxlanılır: köhnə xəbər yeni kimi təqdim olunmur. **Tarixi WebFetch xülasəsindən götürmə** (Framer/Next saytlarında `page-optimized-at`, `released-at` kimi texniki vaxtları dərc tarixi kimi oxuyur; Jev 2026-09-15 idi, 09-25 kimi yazılmışdı). Səhifədə görünən tarixə və ya mənbə kodundakı `datePublished`/`"date"` sahəsinə bax: `curl -sL <url> | grep -oE '(datePublished|"date")[^,]{0,40}'`.
- Rəqəmlər (benchmark, qiymət, kontekst uzunluğu) yalnız rəsmi mənbədən götürülür və mənbə ilə birlikdə yazılır.

## 3. Qiymətləndirmə və ideyalar
Hər təsdiqlənmiş xəbərə 1–5 bal ver:
- **Maraq:** (B) siqnalı nə qədər güclüdür;
- **KAXO uyğunluğu:** komik bucaq varmı, şirkət bunu real sınaya bilərmi;
- **Təzəlik:** Shorts üçün ilk 48 saat vacibdir.

Ən yaxşı 3–5 xəbər üçün ideya yaz:
- **Short (news flash, 30–50 s):** "X çıxdı, KAXO-nun reaksiyası" və bir real fakt. Təzəlik vacibdir, ona görə növbəyə birinci düşür.
- **Long (6–10 dəq):** "KAXO's employees tested X". Agentlər aləti real tapşırıqda sınayır, nəticə, müqayisə. Mümkünsə, test Agent Office-də real işlədilir (`work/tests/<slug>/`), beləcə real ofis görüntüsü alınır.
- Hər ideyaya playlist yaz (`content/PLAYLISTS.md`).

## 4. Yazmaq
1. `content/news/YYYY-MM-DD.md`:
   ```
   # AI gündəmi · YYYY-MM-DD (son 72 saat)
   ## Təsdiqlənmiş xəbərlər
   | # | Xəbər | Tarix | Mənbə | Maraq | KAXO | Təzəlik | Qeyd |
   ## Təsdiqlənməmiş (kontentə girmir)
   ## Kontent ideyaları
   - [short] <başlıq ideyası> · xəbər #N · playlist · son tarix YYYY-MM-DD
   - [long]  <başlıq ideyası> · xəbər #N · test planı: … · playlist
   ```
2. Ən yaxşı ideyaları `content/ideas.md`-nin "Gündəm" bölməsinə əlavə et. Format: `- [ ] [short|long] … (news YYYY-MM-DD #N, son tarix …)`. Vaxtı keçmiş gündəm ideyalarını sil və ya "evergreen" bölməsinə köçür.
3. `content/news/`-da son 14 gündəm faylı saxlanılır, köhnələr silinir.
4. Sahibə qısa xülasə ver: 3–5 əsas xəbər və tövsiyə olunan növbəti video (short və ya long).
