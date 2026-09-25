# AI gündəmi: rəsmi mənbələr, 2026-09-22 — 2026-09-25

Toplanma tarixi: 2026-09-25. Qayda: yalnız açılıb oxunan səhifələr. Rəqəmlər rəsmi səhifədən götürülüb. Açılmayan mənbələr ayrıca qeyd olunub.

## A. 72 saat pəncərəsində olan xəbərlər (vaciblik sırası ilə)

### 1. Anthropic: Claude Opus 5.5
- Tarix: 2026-09-22
- Mənbə: https://www.anthropic.com/claude-opus-5-5
- Nə dəyişdi: Fable 5.1 səviyyəsində işləyən, Opus 5-dən 40% ucuz və 30% sürətli yeni Opus modeli çıxdı.
- Rəqəmlər (rəsmi səhifə): qiymət $4 input / $20 output per 1M token; cache read $0.20, cache write $5; fast mode $8 / $40. Terminal-Bench 4.0: 66.4%, FrontierCode v1.1: 54.4%, CursorBench 4.0: 57.8%, GDPval-AA v2.1: 1846 Elo, OSWorld 2.0: 81.8%, Chartography: 89.0% (alətlərlə). Kontekst pəncərəsi səhifədə göstərilməyib.
- Platformalar: Claude Platform, AWS, Google Cloud, Microsoft Azure.

### 2. OpenAI: GPT-6 Sol və GPT-6 Luna
- Tarix: 2026-09-22 (OpenAI RSS)
- Mənbə: https://openai.com/index/introducing-gpt-6-sol-and-luna (403 ilə açılmadı; tarix RSS-dən: https://openai.com/news/rss.xml)
- Nə dəyişdi: gündəlik iş üçün iki yeni model, fərqli qabiliyyət/qiymət balansı ilə.
- Rəqəmlər (OpenAI developer docs: https://developers.openai.com/api/docs/models): Sol $2 / $10, Luna $0.10 / $0.50 per 1M token; hər ikisi 1.05M kontekst, 128K maks. output. Müqayisə üçün Astra $10 / $50.
- Qeyd: "GPT-5.6-dan təxminən 2 dəfə ucuz" iddiası yalnız üçüncü tərəf bloglarındadır (məs. https://felloai.com/gpt-6-sol-luna/), rəsmi səhifədə yoxlanmayıb.

### 3. OpenAI: Better prompt caching for GPT-6
- Tarix: 2026-09-22
- Mənbə: https://openai.com/index/better-prompt-caching-for-gpt-6 (403; başlıq və təsvir RSS-dən)
- Nə dəyişdi: GPT-6 üçün prompt caching təkmilləşdirildi, gecikmə və xərc azalır. Rəqəmlər açılmadığı üçün yoxdur.

### 4. Google: Gemini 3.8 Live with Live Avatar
- Tarix: 2026-09-24
- Mənbə: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/
- Nə dəyişdi: Gemini 3.8 Live real vaxta yaxın video avatarla birləşdi: dodaq sinxronu olan, eşidən, görən və danışan avatar.
- Rəqəmlər: 97 dil. Mövcudluq Gemini Enterprise; xüsusi avatar yalnız enterprise allowlist. SynthID watermark. Qiymət göstərilməyib.

### 5. Google: Gemini 3.8 Flash TTS və Flash-Lite TTS
- Tarix: 2026-09-23
- Mənbə: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/
- Nə dəyişdi: iki yeni TTS modeli; prompt ilə səs yaratma, 30 saniyəlik nümunədən səs klonlama, sətir-sətir emosiya idarəsi.
- Rəqəmlər: 100+ dil, 2,000+ hazır səs. Hume AI Overall Quality Index-də #1 və #2. Gemini API və AI Studio-da indi mövcuddur. Qiymət açıqlanmayıb.

### 6. Anthropic: Claude yeni CRISPR-bənzər ferment sistemi tapdı
- Tarix: 2026-09-23
- Mənbə: https://www.anthropic.com/news/claude-discovers-novel-enzyme-system
- Nə dəyişdi: Anthropic-in life sciences laboratoriyasında Claude agentləri əvvəl təsvir olunmamış ART (array-associated reverse transcriptases) sistemini avtonom tapdı.
- Rəqəmlər: 950 agent, 21 saat, 210M token, 200,000+ reverse transcriptase, 3,500 yeni namizəd, 20-si üçün ətraflı hesabat.

### 7. Google DeepMind: Private AI Compute üçün təhlükəsiz server yaddaşı
- Tarix: 2026-09-23
- Mənbə: https://deepmind.google/blog/advancing-private-ai-compute-with-secure-server-side-memory/
- Nə dəyişdi: şifrələnmiş, açarları istifadəçinin cihazında qalan davamlı server yaddaşı (hardware secure enclave). Müstəqil təhlükəsizlik auditi keçirilib, Technical Brief yenilənib.

### 8. Google: Gemini-yə yeni Connected Apps
- Tarix: 2026-09-23
- Mənbə: https://blog.google/innovation-and-ai/products/gemini-app/new-connected-apps-gemini/
- Nə dəyişdi: Gemini-də Adobe, Airtable, Linear, monday.com, PandaDoc, Wispr AI, Zoho, Picsart, Squarespace, Webflow, apartments.com, Experian, Peloton, SeatGeek inteqrasiyası (14 app), @ ilə çağırılır.

### 9. Google Flow: kreativlərin qurduğu 6 yeni alət
- Tarix: 2026-09-23
- Mənbə: https://blog.google/innovation-and-ai/models-and-research/google-labs/six-new-tools-built-by-creatives/
- Nə dəyişdi: Flow-da 6 yeni alət: Mondo Sónico (səs/foley), CaptionCast (altyazı), ThumbnailForge (thumbnail), Surface (3D tekstura), CollageMotion Pro, SwissFlow Studio. Remix etmək və öz alətini qurmaq mümkündür.
- KAXO üçün qeyd: CaptionCast və ThumbnailForge bizim video/thumbnail pipeline-a birbaşa aiddir.

### 10. Google: Project Suncatcher (kosmosda AI)
- Tarix: 2026-09-24
- Mənbə: https://blog.google/innovation-and-ai/models-and-research/google-research/google-project-suncatcher-facts/
- Nə dəyişdi: TPU-ları orbitdə sınamaq üçün prototip peyk (Planet ilə, SpaceX Transporter-18).
- Rəqəmlər: orbitdə 8 dəfəyə qədər çox günəş enerjisi; buraxılışda 50–100 g; növbəti mərhələ 2027-də iki peyk arasında lazer əlaqəsi.

### 11. OpenAI: MentalHealthBench
- Tarix: 2026-09-23 (RSS)
- Mənbə: https://openai.com/index/introducing-mentalhealthbench (403; RSS təsviri)
- Nə dəyişdi: psixi sağlamlıq mövzusunda faydalı və təhlükəsiz cavabları qiymətləndirən ekspert əsaslı benchmark. Rəqəmlər əlçatan deyil.

### 12. OpenAI: digər 2026-09-23 xəbərləri (RSS)
- Ukrayna üçün kiber müdafiə girişi (Daybreak proqramı): https://openai.com/index/openai-extends-cyber-access-to-ukraine-for-civilian-defense
- Sam Altman-ın BMT Təhlükəsizlik Şurasında çıxışı: https://openai.com/index/sam-altman-un-security-council-remarks
- ChatGPT Ads Cənub-Şərqi Asiya və Tayvana genişlənir ("60-dan çox ölkə", RSS): https://openai.com/index/chatgpt-ads-expands-southeast-asia-taiwan
- Müştəri hekayələri (Harvey, invideo "rəng korreksiyasında 3x", Airbnb, Ringg "zənglərin 65%-ə qədəri", Grab): RSS, https://openai.com/news/rss.xml
- 2026-09-25: "Two years of OpenAI Academy": https://openai.com/index/two-years-of-openai-academy (qeyd: RSS-də gün adı "Wed" yazılıb, 2026-09-25 isə cümə gününə düşür; tarix RSS-dəki kimi verilir)

### 13. NVIDIA: Isaac ROS 5.0
- Tarix: 2026-09-22
- Mənbə: https://blogs.nvidia.com/blog/isaac-ros-5-0-agentic-open-source-robotics/
- Nə dəyişdi: ROSCon-da agentic workflow-lar, ROS Lyrical və Ubuntu 24.04 dəstəyi, açıq mənbə.
- Rəqəmlər: FoundationPose ilə obyekt pozası təyini 5.5x sürətli; Jetson Orin Nano-dan Jetson Thor-a qədər.

### 14. Google + Gates Foundation: 200 milyon fermerə AI
- Tarix: 2026-09-22
- Mənbə: https://blog.google/company-news/outreach-and-initiatives/google-org/partnering-with-the-gates-foundation-to-bring-ai-resources-to-200-million-farmers-across-the-global-south/
- Rəqəmlər: $100M birgə maliyyə; hədəf 50M-dən 200M kiçik fermerə qaldırılıb (Sub-Sahara Afrika, Cənubi Asiya).

### 15. NVIDIA: AI Day Singapore
- Tarix: 2026-09-22 (tədbir 22–23 sentyabr)
- Mənbə: https://blogs.nvidia.com/blog/ai-day-singapore/
- Nə dəyişdi: Sea Limited ASEAN-da NVIDIA Vera Rubin platformasını qəbul edən ilk şirkət oldu; regional Nemotron fine-tune-ları (Viettel AI, iApp).

Digər (qısa): OpenAI "Priorities and principles for effective third party assessments" (2026-09-22, https://openai.com/index/priorities-principles-third-party-assessments); Google Beam genişlənməsi və MedGemma (2026-09-23, RSS: https://blog.google/rss/). Bu ikisinin məzmunu ayrıca açılmayıb.

## B. Trend siqnalları (pəncərədə yaradılmayıb, amma indi trenddədir)

### Hugging Face trending (https://huggingface.co/api/models?sort=trendingScore&limit=20, 2026-09-25 baxış)
- Siyahıda 2026-09-22-dən sonra yaradılmış model yoxdur.
- Ən təzələr: XiaomiMiMo/MiMo-V2.6-Pro-RL, Flash-RL, Distill-Qwen-9B (createdAt 2026-09-21T15:39Z, pəncərədən bir az köhnə). Model kartı (https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL): 1.02T total / 42B aktiv MoE, 1M kontekst, omnimodal, MIT lisenziya, DeepSWE v1.1: 71.9, Terminal Bench 2.1: 89.9, CyberGym: 94.0.
- Digər: Qwen/Qwen-Image-2.1 (2026-09-14), prism-ml/Ternary-Bonsai-2-27B-gguf (2026-09-16), deepseek-ai/DeepSeek-V4.1-Flash (2026-09-10).

### GitHub trending, daily (https://github.com/trending?since=daily)
- vectorize-io/hindsight (agent yaddaşı): +1,668 bu gün, 28,426 ulduz
- google/ax (Google-un açıq agent orkestrasiya runtime-ı, Apache 2.0, Kubernetes üzərində): +1,373, 10,964 ulduz. https://github.com/google/ax
- dream-num/univer ("Office Harness for AI Agents"): +1,082
- anthropics/financial-services: +509, 37,459 ulduz
- strands-agents/harness-sdk: +455; superdesigndev/treg ("OpenRouter for agent tools"): +468
- Qeyd: repoların yaradılma tarixi yoxlanmayıb, yalnız günlük ulduz artımı.

### Product Hunt AI (https://www.producthunt.com/topics/artificial-intelligence)
- Səhifə yalnız ümumi reytinqli məhsulları göstərdi (Claude, Cursor, OpenAI və s.), tarixli günlük launch siyahısı alınmadı. Faydalı xəbər yoxdur.

## C. Köhnə (72 saatdan əvvəl), kontekst üçün
- xAI Grok 4.7: 2026-09-20/21 (model kartı revision 2026-09-21: https://media.x.ai/v1/website/4p7card-5eccc980.pdf). Docs (https://docs.x.ai/developers/release-notes): 500k kontekst, $2 / $0.50 / $6 per 1M (<200k), $4 / $1 / $12 (>200k).
- Anthropic "The Situation Report" (Ebola, Claude): səhifədə 2026-09-19, xəbər siyahısında 2026-09-22 görünür. Tarix uyğunsuzdur. https://www.anthropic.com/features/ebola-response
- Anthropic Accenture tərəfdaşlığı (2026-09-18), Life Sciences Verification Program (2026-09-17).
- Gemini 3.8 Live + Extended Thinking (2026-09-15), Gemini 3.8 Flash / Flash Cyber (2026-09-02, $0.75 / $3.75 promo 2026-12-31-ə qədər), AlphaGenome Atlas (2026-09-08), WeatherNext 3 (2026-09-03).
- DeepSeek-V4.1-Flash (2026-09-10): https://api-docs.deepseek.com/news/news260910, 552B MoE.
- Mistral: son xəbər Mozilla tərəfdaşlığı (2026-09-16), https://mistral.ai/news
- Microsoft AI: MAI code of conduct konsultasiyası (2026-09-14), MAI-Image-2.6 (2026-09-04), https://microsoft.ai/news/
- NVIDIA newsroom: son press release Palantir ilə (2026-09-10).
- OpenAI GPT-6 Astra: sentyabrın əvvəli (CNBC 2026-09-03), https://openai.com/index/gpt-6-astra/

## D. Açılmayan / boş mənbələr
- openai.com/news, openai.com məqalə səhifələri, help.openai.com: HTTP 403. Tarix və başlıqlar https://openai.com/news/rss.xml-dən götürülüb.
- x.ai/news: HTTP 403. Pəncərədə xAI xəbəri tapılmadı (axtarış və docs ilə).
- Meta AI blog (https://ai.meta.com/blog/): ən yeni post 2026-07-27. Pəncərədə yoxdur.
- Qwen blog (qwenlm.github.io/blog): 2025-ci ildən yenilənmir; qwen.ai/research boş qaytardı. Qwen xəbərlərini yoxlamaq alınmadı.
- Apple ML (https://machinelearning.apple.com/): ən yeni highlight 2026-06-08. Pəncərədə yoxdur.
- Microsoft Source AI (https://news.microsoft.com/source/topics/ai/): tarix göstərmir.
- Mistral, DeepSeek: pəncərədə yeni xəbər yoxdur.

## E. Yoxlanmamış iddia (istifadə etmə)
- "Google, OpenAI və Anthropic 2026-09-24-də 'Frontier AI Standards Agency' yaratdı": yalnız axtarış xülasəsində, üçüncü tərəf mənbəsindən (aiweekly.co) çıxdı. Anthropic xəbər siyahısında və OpenAI RSS-də belə başlıq görmədim. Rəsmi təsdiq yoxdur.
- "GPT-5.6 Sol təlimində compaction summaries" iddiası: yalnız üçüncü tərəf xülasəsi. Rəsmi səhifə tapılmayıb.
