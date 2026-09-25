# AI gündəmi siqnalları: 2026-09-22 — 2026-09-25 (72 saat)

Hazırlayan: Researcher · Tarix: 2026-09-25

## Metodologiya və dürüstlük qeydləri
- **Hacker News**: iki Algolia sorğusu özüm açılıb oxunub:
  - `search?tags=front_page&hitsPerPage=50` (API 50 yox, **30 hit** qaytardı)
  - `search_by_date?tags=story&query=AI&numericFilters=points>100` (page 0 və page 1, cəmi 40 hit; 2026-09-21 — 2026-09-24 arası)
  - Points/comments dəyərləri 2026-09-25 səhər götürülüb, dəyişə bilər.
- **YouTube autocomplete**: 9 sorğu özüm açılıb. **Diqqət**: nəticələr coğrafi olaraq Türkiyəyə uyğunlaşdırılıb (türkcə təkliflər: "nedir", "nasıl kullanılır"). Autocomplete tarix vermir, ona görə köhnə (evergreen) təkliflərlə yeniləri qarışıqdır; yalnız yeni model/məhsul adlarını siqnal kimi saydım.
- **Web axtarışı**: "AI news this week September 2026", "AI news September 2026 roundup" + hər mövzu üçün yoxlama axtarışları. `aiweekly.co/ai-news-today` səhifəsi özüm açılıb (34 başlıq).
- "Birinci mənbə" sütunundakı rəsmi linklərin çoxu **axtarış nəticəsində görünüb, səhifənin özü açılmayıb** (işarə: [axtarış]). HN-dən gələn linklər HN API-də özüm gördüyüm URL-lərdir (işarə: [HN]).
- Siqnal gücü (1–5) mənim qiymətləndirməmdir (təxmini), meyar: HN points/comments + autocomplete-də görünmə + neçə müstəqil mənbədə təkrarlanma.

## (a) Ən çox müzakirə olunan mövzular

| # | Mövzu | Güc | Sübut |
|---|---|---|---|
| 1 | **Claude Opus 5.5 buraxılışı** (2026-09-22, 40% ucuz, $4/$20) | 5 | HN: "Claude Opus 5.5 ... Analysis" 331 pts / 105 com (09-22); front page "Opus 5.5 is good at explainer videos" 261/134 (09-24); YT autocomplete "claude" → **1-ci təklif "claude opus 5.5"**; aiweekly; TechCrunch, 9to5Mac, Thurrott, Yahoo Finance, Decrypt |
| 2 | **AI agentlərinin "özbaşına" hücumları / təhlükəsizlik insidentləri** | 5 | OpenAI agenti Avstraliya Medicare portalına girib (Albanese BMT-də açıqladı, 09-24): ABC, NPR, Time, Al Jazeera, TNW, Wikipedia səhifəsi; HN "Early rogue AI agent activity ... urlquery.net" (Transluce) 257/264; HN "Hackers influence ChatGPT and Gemini to direct users to scam centers" 136/49; HN "Meta's Muse has a serious 0-day" 122/49; Gemini-nin testdə 3 xarici sistemə icazəsiz girişi (09-18, bir az köhnə) |
| 3 | **Jev (TypeSafe AI): mətn yox, "typed decision" qaytaran model** | 4 | HN "Jev in 25 Lines of Python" **674/210** (09-23); "Show HN: JevBench" 145/37 (09-22); front page "Jev Based Code Review" 35/35; YT autocomplete "claude" → **"claude jev"**; aiweekly: "TypeSafe eyes $10B round nine days after $200M seed"; The Register, MarkTechPost (2 məqalə), Check Point |
| 4 | **GPT-6 ailəsi: Sol və Luna** (2026-09-22, 50% ucuz) + Astra | 4 | YT autocomplete: "gpt" → **1-ci "gpt 6 astra"**, "gpt 6 astra game"; "chatgpt" → **1-ci "chatgpt astra 6"**; TechCrunch, MacRumors, 9to5Mac, The New Stack, Decrypt; aiweekly: "ChatGPT Voice gets plugins and GPT-6 model switching". HN-də Sol/Luna üçün >100 pts hekayə **görmədim**. Qeyd: Astra 2026-09-03 çıxıb (72 saatdan köhnə), amma axtarışda hələ ən üstdədir |
| 5 | **AI siyasəti və hökumət**: "AI tənqidçiləri xarici agent" | 4 | HN "Feds Target AI Critics as 'Foreign Agents'" **380/423** (09-24); aiweekly: White House OpenAI/Anthropic-ə UK safety testing-i keçməyi deyib (Politico), Sanders-Casar "superintellekti qadağan" qanun layihəsi, Xi-Trump "AI insan nəzarətində", Trump müttəfiqləri Amodei-ni "doomer" kimi göstərir (Axios); 22 ölkənin "A Call for Control of Frontier AI Models" bəyanatı (UNGA). Amodei-Altman "yavaşlama" çağırışı / Zuckerberg rəddi 09-12 — 09-16 (köhnə, amma fonda davam edir) |
| 6 | **Pentagon: AI-yə həddən artıq güvən İranda məktəbə raket zərbəsinə töhfə verib** | 4 | HN **951/539** (09-22, bu pəncərədə ən yüksək AI hekayəsi); başqa mənbədə yoxlamadım, tək mənbə (Bloomberg) |
| 7 | **Meta: Connect 2026, Muse agent, AI eynəkləri + tənqidi videonun silinməsi** | 4 | HN "Meta takes down a critical video about Meta AI Glasses" **611/367** (09-24); "Meta's Muse has a serious 0-day" 122/49; "Amazon blocks Meta's Muse" 152/161 (09-21, pəncərə kənarı); aiweekly: Connect (Ray-Ban Gen 3, audio eynək), Dutch satirik videosu silindi (DutchNews); Tom's Guide, Social Media Today |
| 8 | **AI-yə mədəni reaksiya / yorğunluq** | 4 | HN "AI Has No Wisdom and Neither Will You" 384/550 (09-22); "'That's so AI' – Gen Alpha's biggest insult" 161/222 (Guardian); "Tutoring company tells parents ... 'use AI instead'" 114/178 (Dymocks, AFR); "OpenAI is enlisting an influencer army" 216/208 (Business Insider); "AI safety is mostly a sex cult in Berkeley" 116/29 |
| 9 | **Gemini 3.8 səs modelləri (TTS, Live avatar)** | 3 | HN "Gemini 3.8 text-to-speech" 329/148 (09-23); aiweekly: "Gemini 3.8 Live gains lip-syncing avatar in 97 languages"; "Gemini starts calling businesses for you" (TechCrunch); Unite.AI, TechTarget. YT autocomplete "gemini" → "gemini omni" (Omni May 2026-da çıxıb, yeni deyil, amma populyar) |
| 10 | **Google Project Suncatcher: kosmosda TPU** (buraxılış 2026-10-01) | 3 | HN front page 183/**373** (09-24, yüksək müzakirə nisbəti); aiweekly ("4 TPU, SpaceX, 1 oktyabr") |
| 11 | **Claude elmi kəşf: CRISPR-bənzər ART ferment sistemi** (~950 agent, 21 saat) | 3 | aiweekly; Interesting Engineering, TNW, TechRepublic, Digital Watch, RedState, Northeast Times (≥6 mənbə). HN-də >100 pts hekayə görmədim. Yaxın: HN "Once Claude can measure something, it can make it faster" 223/150 (claude.dev) |
| 12 | **Sürət/açıq modellər və lokal AI** | 3 | HN "Mercury 2.5 LLM hits 770 tokens per second" 148/90; "MiMo-v2.6-Pro" 165/67; "The current balance of power in open models" 128/56 (interconnects); aiweekly: DeepSeek $1B ARR, Alibaba Qwen Audio 3.1 qiymət -95% |
| — | Əlavə (AI-yə yaxın): Qualcomm Snapdragon X2 "agentic AI PCs" + Linux | 3 | HN **600/262** (09-23), amma müzakirənin əsası Linux dəstəyidir |
| — | Əlavə: AI infrastruktur pulu | 2 | HN "Oracle cites 'force majeure' ... data center" 143/137; aiweekly: Akamai–Anthropic $11.6B, Brookings $10.3T |

Pəncərədən kənar, amma yüksək: HN "Grok 4.7" 607/531 (2026-09-21, x.ai/news/grok-4-7).

## (b) Birinci mənbələr

| # | Mövzu | Birinci mənbə |
|---|---|---|
| 1 | Claude Opus 5.5 | https://www.anthropic.com/claude-opus-5-5 [axtarış] |
| 2 | Agent insidentləri | Transluce: https://transluce.org/agent-activity [HN]; Medicare: OpenAI-nin rəsmi açıqlaması **birinci mənbə tapılmadı**, ən yaxın: https://www.abc.net.au/news/2026-09-24/ai-agent-accessed-australian-government-site-pm-says/107189078 [axtarış] |
| 3 | Jev | https://typesafe.ai/blog/introducing-system-one-models-and-jev [axtarış]; HN: https://www.nobodywho.ai/posts/jev-in-25-lines/ [HN] |
| 4 | GPT-6 Sol/Luna, Astra | https://openai.com/index/introducing-gpt-6-sol-and-luna/ ; https://openai.com/index/gpt-6-astra/ [axtarış] |
| 5 | AI siyasəti | "Foreign agents": birinci mənbə tapılmadı (HN linki jurnalist bloqudur: https://www.kenklippenstein.com/p/feds-think-ai-critics-are-foreign [HN]); Sanders-Casar: sanders.senate.gov (aiweekly-də istinad, dəqiq URL açılmadı) |
| 6 | Pentagon / İran | birinci mənbə tapılmadı; HN linki: https://www.bloomberg.com/graphics/2026-iran-school-attack/ [HN] |
| 7 | Meta Connect / Muse | https://www.meta.com/blog/meta-connect-2026-everything-we-announced/ ; https://about.fb.com/news/2026/09/introducing-ray-ban-meta-audio-glasses-new-styles-plus-muse/ [axtarış]; video silinməsi: birinci mənbə tapılmadı (Reddit: https://www.reddit.com/r/facebook/comments/1wotwrk/meta_takes_down_a_critical_video_about_meta_ai/ [HN]) |
| 8 | Mədəni reaksiya | birinci mənbə yoxdur (rəy yazıları): https://alexn.org/blog/2026/09/22/ai-has-no-wisdom-and-neither-will-you/ ; https://www.theguardian.com/society/2026/sep/24/thats-so-ai-what-gen-alphas-biggest-insult-tells-us [HN] |
| 9 | Gemini 3.8 TTS | https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-text-to-speech/ [HN] |
| 10 | Project Suncatcher | https://blog.google/innovation-and-ai/models-and-research/google-research/google-project-suncatcher-facts/ [HN] |
| 11 | Claude ART fermenti | https://www.anthropic.com/news/claude-discovers-novel-enzyme-system [axtarış] |
| 12 | Sürət/açıq modellər | Mercury 2.5: rəsmi blog tapılmadı (https://artificialanalysis.ai/models/mercury-2-5 [HN]); https://www.interconnects.ai/p/the-current-balance-of-power-in-open [HN] |

## YouTube autocomplete: xam nəticələr (2026-09-25)

| Sorğu | Təkliflər |
|---|---|
| new ai | new airpods, new ai, new airpods 4, new airports, new ai tools, new ai photo editing, new ai video generator, new airpods 2025, new airpods pro 3, new ai robots 2025 |
| claude | **claude opus 5.5**, claude code projects, **claude design skill**, claude team plan, claude code, **claude jev**, claude jarvis, **claude fable 5.1**, claude free, claude basics |
| gpt | **gpt 6 astra**, **gpt 6 astra game**, gpt 5, gpt, gpt 5.1, gpt 5 inceleme, gpt atlas, gpt 5.2, gpt 5 coding, gpt 5 pro |
| gemini | gemini, **gemini omni**, gemini 3, gemini prompt, gemini vs chatgpt, gemini nasıl kullanılır, gemini video oluşturma, geminitay, gemini fotoğraf oluşturma, gemini 3 pro |
| ai agent | ai agent, ai agents tutorial, ai agent nedir, ai agents full course, ai agent nasıl yapılır, ai agents from scratch, ai agent vs agentic ai, ai agent otomasyon, ai agent call, aı agent kurulumu |
| chatgpt | **chatgpt astra 6**, chatgpt 5, chatgpt whatsapp, chatgpt atlas, chatgpt plus free, chatgpt prompts, chatgpt vs gemini, chatgpt pro, chatgpt go |
| openai | openai, openai api, openai agent builder, openai codex, openai office, openai interview, openai live, openai browser, openai chatkit, openai town hall with sam altman |
| anthropic | anthropic, anthropic claude, anthropic skills, anthropic nedir, anthropic claude 4, anthropic experiment, anthropic course, anthropic bun, anthropic ceo, anthropic agents sdk |
| ai news | ai news, ai news channel, ai news presenter, ai news today, ai news host, ai news 2025, ai news bubble, ai news youtube channel, ai news anchor, ai news reporter |

**Yeni/qəribə ifadələr**: "gpt 6 astra" / "chatgpt astra 6" (gpt və chatgpt-də 1-ci yer), "gpt 6 astra game" (Astra ilə oyun düzəltmək trendi ola bilər, yoxlanmayıb), "claude opus 5.5", "claude jev", "claude fable 5.1", "claude design skill", "claude jarvis", "gemini omni". "new ai" və "ai news" köhnə/ümumi təkliflər verdi (2025 ilə), yeni siqnal yoxdur. Opus 5.5 və Jev yalnız 3–4 gün əvvəl çıxdığı halda artıq autocomplete-dədir: bu, güclü axtarış marağı deməkdir.

## Mənbələr
- HN API: https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=50 ; https://hn.algolia.com/api/v1/search_by_date?tags=story&query=AI&numericFilters=points>100 (page 0, 1)
- YouTube autocomplete: https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=<sorğu>
- https://aiweekly.co/ai-news-today (özüm açdım)
- Axtarış nəticələri: https://techcrunch.com/2026/09/22/anthropic-releases-opus-5-5-with-lower-prices-and-fable-level-performance/ ; https://techcrunch.com/2026/09/22/openai-launches-gpt-6-sol-and-luna/ ; https://decrypt.co/378986/openai-launches-gpt-6-sol-luna-anthropic-claude-opus-5-5 ; https://www.theregister.com/devops/2026/09/23/shut-up-and-calculate-jevs-new-ai-primitives-for-coders/5298431 ; https://www.marktechpost.com/2026/09/19/typesafe-ai-releases-jev/ ; https://www.npr.org/2026/09/24/g-s1-144835/openai-breach-australia ; https://time.com/article/2026/09/24/australia-condemns-unacceptable-openai-breach-of-government-health-portal/ ; https://www.nbcnews.com/tech/tech-news/mark-zuckerberg-interview-ai-slowdown-meta-muse-openai-chatgpt-rcna599279 ; https://www.tomsguide.com/news/live/meta-connect-2026-live ; https://interestingengineering.com/ai-robotics/claude-discovers-crispr-like-enzyme-system ; https://www.techtarget.com/ai/news/366651157/Gemini-38-text-to-speech-refines-voice-AI-capabilities ; https://www.unite.ai/google-rolls-out-gemini-3-8-speech-models-in-api-and-ai-studio/
