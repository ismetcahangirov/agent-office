---
name: gundem
description: AI gündəmini izləyir - yeni modellər, alətlər, buraxılışlar, şirkət xəbərləri. Mənbələri yoxlayır, təsdiqlənmiş xəbərlərdən KAXO üçün kontent ideyaları (long və short) çıxarır, content/news/ və ideas.md-yə yazır. İstifadəçi "/gundem", "gündəm", "xəbərlərə bax" yazanda və ya /video araşdırma addımında (gündəm 24 saatdan köhnədirsə) işə sal.
---

# /gundem: AI gündəmi → KAXO ideyaları

**Əvvəlcə oxu:** `content/RULES.md` §13 (gündəm qaydaları), `content/ideas.md`, ən son `content/news/*.md` (təkrar yazmamaq üçün), `content/published.md`.

## 1. Toplama (2 `researcher` agenti, eyni mesajda)
Hər ikisi yalnız son **24 saata** baxır (sahib başqa aralıq deyibsə, o aralığa). Pəncərədən kənar xəbər cədvələ girmir; ən çox "pəncərədən kənar" sətrində bir sözlə qeyd olunur. Dünənki gündəmdə olan xəbər yalnız yeni rəsmi inkişaf varsa təkrarlanır. Hər xəbər üçün: başlıq, tarix, **birinci mənbə URL-i**, 1 cümləlik "nə dəyişdi".

- **A. Rəsmi mənbələr (birinci mənbə):**
  - Anthropic news, OpenAI blog, Google DeepMind / Google AI blog, Meta AI, Mistral, xAI, DeepSeek, Qwen, Microsoft AI, Apple ML, NVIDIA;
  - Hugging Face trending modellər;
  - GitHub trending (AI repoları);
  - Product Hunt (AI kateqoriyası).
- **B. Gündəm siqnalları (nə müzakirə olunur):**
  - Hacker News ön səhifəsi (`https://hn.algolia.com/api/v1/search?tags=front_page`);
  - **YouTube trend videoları və Reddit:** agentləri çağırmazdan **əvvəl** CEO arxa planda işlədir (`run_in_background`, Reddit limitinə görə 5–12 dəq; researcher-in Bash-ı yoxdur), A agenti bu arada işləyir:
    `tools/video/.venv/Scripts/python tools/gundem/social.py [--hours 24]` → `work/research/gundem-YYYY-MM-DD-social.md`.
    - YouTube: son 24 saatda dərc olunmuş, ən çox baxılan AI videoları (Data API, `YOUTUBE_API_KEY` `.env`-dən, çap olunmur). Hansı mövzu baxılır, rəqib kanallar nə çəkib.
    - Reddit: aşağıdakı sub-ların günün top postları, müəlliflə birlikdə (JSON API 403 verir, `top/.rss` işlədilir; 429-a qarşı fasilə var). X ilə eyni qayda:
      - **Rəsmi (birinci mənbə sayılır):** şirkətin təsdiqlənmiş hesabı və ya işçisinin (flair "Anthropic"/"OpenAI" və s.) öz şirkəti haqqında postu, rəsmi AMA-lar. Müəllifi yoxla, adına görə güvənmə.
      - **Şirkət sub-ları (siqnal):** r/ClaudeAI, r/ClaudeCode, r/Anthropic, r/OpenAI, r/ChatGPT, r/GeminiAI, r/Bard.
      - **Texniki icma (siqnal, tez-tez ilk görür):** r/LocalLLaMA (açıq modellər, HF buraxılışları), r/MachineLearning (paper-lər).
      - **Geniş gündəm (siqnal):** r/singularity, r/artificial; vizual alətlər: r/StableDiffusion, r/aivideo.
      - **Sızma/şayiə postları** ("rumored", "leak", skrinşot, "insider"): həmişə "təsdiqlənməyib".
    B agentinə bu faylın yolu verilir: o, meme/qeyri-AI səs-küyü süzür, mövzuları qruplaşdırır.
  - **X/Twitter:** API yoxdur (pulsuz qanuni yol yoxdur, scraper X ToS-a ziddir: `work/research/x-api-free-options-2026-09-27.md`). B agenti WebSearch ilə axtarır (`site:x.com <mövzu>`, `site:x.com/<hesab>`, `"<model adı>" x.com`). Tarix postun özündən götürülür. Baxılan hesablar:
    - **Rəsmi (birinci mənbə sayılır):** @AnthropicAI, @claudeai, @OpenAI, @OpenAIDevs, @GoogleDeepMind, @GeminiApp, @GoogleAI, @MetaAI, @MistralAI, @xai, @deepseek_ai, @Alibaba_Qwen, @MicrosoftAI, @nvidia, @huggingface.
    - **Rəhbərlər və komanda üzvləri (öz şirkətinin elanı birinci mənbədir):** @sama, @gdb, @DarioAmodei, @alexalbert__, @bcherny, @demishassabis, @OfficialLoganK, @sundarpichai, @satyanadella, @mustafasuleyman, @elonmusk, @ClementDelangue.
    - **Gündəm yaradanlar (yalnız siqnal):** @karpathy, @ylecun, @AndrewYNg, @emollick, @simonw, @swyx, @_akhaliq, @rowancheung, @kimmonismus.
    - **Sızma/şayiə hesabları (həmişə "təsdiqlənməyib"):** @testingcatalog, @btibor91, @legit_api. Onların iddiası yalnız rəsmi təsdiq gəlincə xəbərə çevrilir, amma "bu gün nə gözlənilir" üçün faydalıdır.
  - YouTube autocomplete (`suggestqueries…&ds=yt&q=` ilə "new ai", "claude", "gpt", "gemini", "ai agent" və s.);
  - "AI news this week" axtarışı.

  Reddit, X və YouTube **yalnız siqnaldır**: oradakı iddia rəsmi mənbə (A) tapılmadan "təsdiqlənməyib" bölməsinə düşür. Rəsmi hesabın öz X postu isə birinci mənbə sayılır.

  Nəticə: A-dakı xəbərlərdən hansıları həqiqətən çox danışılır, bir də A-da olmayan, amma çox müzakirə olunan mövzular.

## 2. Yoxlama (CEO)
- Hər xəbərin **birinci mənbəyi** olmalıdır: rəsmi blog, sənəd, repo. Yalnız sosial media və ya şayiə varsa, xəbər "təsdiqlənməyib" kimi işarələnir və kontentə **girmir**.
- Tarix yoxlanılır: köhnə xəbər yeni kimi təqdim olunmur. **Tarixi WebFetch xülasəsindən götürmə** (Framer/Next saytlarında `page-optimized-at`, `released-at` kimi texniki vaxtları dərc tarixi kimi oxuyur; Jev 2026-09-15 idi, 09-25 kimi yazılmışdı). Səhifədə görünən tarixə və ya mənbə kodundakı `datePublished`/`"date"` sahəsinə bax: `curl -sL <url> | grep -oE '(datePublished|"date")[^,]{0,40}'`.
- **Hadisənin tarixi ≠ məqalənin tarixi.** Hesabat, analiz, "revealing the details" tipli yazılarda hadisənin özünün ilk nə vaxt açıqlandığını ayrıca axtar (`WebSearch "<hadisə> <ay il>"`, Wikipedia). Köhnə hadisəyə dair yeni detal news flash deyil, evergreen olur (2026-09-26: swarmtraces 09-25 hesabatı iyuldakı OpenAI–HF hadisəsinə aid idi, OpenAI onu 07-21-də açıqlamışdı).
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
   # AI gündəmi · YYYY-MM-DD (son 24 saat)
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
