# Gündəm 2026-09-27: rəsmi mənbələr (pəncərə 2026-09-26 ~10:00 → 2026-09-27 ~11:00 GMT+4)

Metod: rəsmi siyahı səhifələri + RSS `pubDate` (OpenAI, Google) + məqalə byline tarixi. Qeyd: bu sessiyada shell (curl) mövcud deyildi. Tarixlər RSS pubDate və görünən byline-dan götürülüb, WebFetch xülasəsindən yox.

## Nəticə: pəncərədə YENİ rəsmi AI elanı tapılmadı
Pəncərə şənbə-bazar (09-26/09-27) günlərinə düşür. Yoxlanan heç bir birinci tərəf mənbədə 2026-09-26 06:00 UTC-dən sonra dərc olunmuş yazı yoxdur.

| Mənbə | Ən son yazı (tarix) | URL |
|---|---|---|
| Anthropic news | 2026-09-23 "Claude discovers a novel enzyme system with CRISPR-like repeats" | https://www.anthropic.com/news/claude-discovers-novel-enzyme-system |
| claude.com/blog | 2026-09-25 "Build plugins for Claude" (artıq işlənib) | https://claude.com/blog/build-plugins-for-claude |
| OpenAI (RSS) | Fri, 25 Sep 2026 19:00 GMT "Proaction boosts sales 60%... with Codex" (müştəri hekayəsi, pəncərədən ~11 saat əvvəl) | https://openai.com/index/proaction |
| OpenAI | DevDay 2026, 29 sentyabr, San Francisco (elan tarixi yoxlanmadı, 403) | https://openai.com/index/devday-2026/ |
| Google blog (RSS) | Thu, 24 Sep 2026 17:00 +0000 | https://blog.google/rss/ |
| Google: Gemini 3.8 Live with Live Avatar | 2026-09-24 15:30 UTC | https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/ |
| DeepMind blog | ən son: Gemini 3.8 Live Avatar (09-24) | https://deepmind.google/discover/blog/ |
| Meta AI blog | 2026-07-27 | https://ai.meta.com/blog/ |
| Mistral | 2026-09-16 Mistral x Mozilla | https://mistral.ai/news/mistral-x-mozilla/ |
| xAI | x.ai/news 403; docs release notes: "September" Grok 4.7 (500k context) | https://docs.x.ai/developers/release-notes |
| DeepSeek | 2026-09-10 DeepSeek-V4.1-Flash | https://api-docs.deepseek.com/news/news260910 |
| Qwen | qwen.ai JS-render, oxunmadı; məlum son: Qwen-Image-2.1 (09-20, üçüncü tərəf mənbəsi, təsdiqlənməyib) | https://qwen.ai/research |
| Microsoft AI | 2026-09-14 MAI Code of Conduct | https://microsoft.ai/news/mai-code-of-conduct/ |
| Apple ML | 2026-09-02 ECCV 2026 | https://machinelearning.apple.com/ |
| NVIDIA blog | 2026-09-22 Isaac ROS 5.0 / AI Day Singapore | https://blogs.nvidia.com/ |
| HF blog | 2026-09-25 "Bringing Humanoids to LeRobot" (500+ saat Unitree G1 teleop datası) | https://huggingface.co/blog/nepyope/bringing-humanoids-to-lerobot |
| Product Hunt AI | topic səhifəsi köhnə məhsulları göstərir; gündəlik siyahı oxunmadı | https://www.producthunt.com/topics/artificial-intelligence |

## HF trending (sort=trendingScore), createdAt
Heç biri pəncərədə yaradılmayıb. Ən yeni: Contrastive-LM/CLM-v0.1-8B (2026-09-21), XiaomiMiMo/MiMo-V2.6-* (2026-09-21), Edge0/Audio8-ASR-Infinite (2026-09-21), abenzerps/Qwen-Image-2.1-Uncensored-GGUF (2026-09-20), convaiinnovations/laya (2026-09-18, #1 trending). Mənbə: https://huggingface.co/api/models?sort=trendingScore&limit=20

## GitHub trending (daily, 2026-09-27)
URL: https://github.com/trending?since=daily
- paperclipai/paperclip +2,608 və vectorize-io/hindsight +2,147: artıq işlənib.
- dream-num/univer +849 ("The Office Harness for AI Agents"); son release v1.0.2 (24 sentyabr, patch). Hadisə yeni deyil.
- rohitg00/ai-engineering-from-scratch +827 (kurs repo).
- NVIDIA/Model-Optimizer +357; son release ModelOpt 0.47.0 (release səhifəsində tarix "September 23" kimi oxundu, il şübhəli). https://github.com/NVIDIA/Model-Optimizer/releases
- zhaoxuya520/reverse-skill +361 (reverse engineering üçün AI routing skill).
- mobile-next/mobile-mcp +168.
Bunlar trenddir, rəsmi elan deyil.

## Pəncərədən kənar (xatırlatma üçün)
Gemini 3.8 Live Avatar (09-24), Gemini 3.8 TTS (09-23), Gemini Connected Apps (09-23), GPT-6 Sol/Luna (09-22), OpenAI prompt caching (09-22), ChatGPT Ads SEA (09-23), Grok 4.7 (sentyabr), DeepSeek V4.1-Flash (09-10), Gemini 3.8 Flash (09-02), Gemini Windows app (09-10), LeRobot humanoids (09-25), OpenAI DevDay (tədbir 09-29, gələcək).

## Recheck 14:00
Pəncərə: 2026-09-26 14:00 → 2026-09-27 14:00 GMT+4 (= 09-26 10:00 → 09-27 10:00 UTC). Tarixlər RSS pubDate, GitHub API `published_at`/`created_at` və HF API `createdAt`-dan götürülüb.

### Nəticə: pəncərədə yenə YENİ rəsmi AI elanı yoxdur
11:00 yoxlamasından sonra heç bir rəsmi mənbədə yeni yazı çıxmayıb. Reddit-də görünən iki hadisə təsdiqləndi, amma hər ikisi pəncərənin başlanğıcından **bir az əvvəldir** (11:00 yoxlaması onları qaçırıb):

| Hadisə | Tarix (mənbə sahəsi) | Birinci mənbə | Nə dəyişdi | Pəncərə |
|---|---|---|---|---|
| internlm Intern-Decision (0.8B / 2B / 4B) | HF createdAt 2026-09-26T05:35:57Z–05:36:37Z (= 09:36 GMT+4); lastModified 07:57Z; GitHub repo created 2026-09-24T23:37:44Z | https://huggingface.co/internlm/Intern-Decision-4B · https://github.com/internlm/Intern-Decision | Qwen3.5-4B üzərində Apache-2.0 multimodal "structured decision" modeli: bir forward pass-da sxemdəki bütün suallara cavab paylanması verir; model kartı: 4B orta skor 90.02, RTX 4090-da 44.16 ms orta gecikmə. | ~4.5 saat əvvəl (kənarda, amma ən təzə açıq model) |
| KoboldCpp v1.122.1 | GitHub published_at 2026-09-26T09:05:10Z (= 13:05 GMT+4) | https://github.com/LostRuins/koboldcpp/releases/tag/v1.122.1 | "NEW: Added an integrated KoboldCpp Agent" (agentic alətlər), ubatchsize ayrıca, --autoswapthreshold, tool-calling parser düzəlişləri. Ayrıca "v1.122" tag-ı yoxdur, yalnız v1.122.1. | ~1 saat əvvəl (sərhəddə) |
| Qwen3.8-Flash-Next | HF createdAt 2026-08-24T08:24:59Z | https://huggingface.co/Qwen/Qwen3.8-Flash-Next | Yeni deyil. | outside window |
| Qwen 4 (Max/Plus/Flash/27B) | 2026-09-22 Apsara konfransında elan (yalnız üçüncü tərəf mənbələri; rəsmi Qwen səhifəsi tapılmadı, HF/GitHub-da çəki yoxdur) | üçüncü tərəf: https://www.versely.studio/blog/qwen-4-announced-at-apsara-2026 | Buraxılış tarixi, qiymət, benchmark yoxdur; HF Qwen org-da Qwen4 repo yoxdur. | outside window, təsdiqlənməyib |
| Qwen-Image-2.1 (düzəliş) | HF createdAt 2026-09-14T03:47:26Z; PE-T2I/PE-I2I 2026-09-20T08:45Z | https://huggingface.co/Qwen/Qwen-Image-2.1 | Əvvəlki qeyddə "09-20 üçüncü tərəf" yazılıb; rəsmi HF tarixi 09-14 (əsas), 09-20 (PE variantları). | outside window |
| Qwen Code v0.24.6 | GitHub published_at 2026-09-26T00:42:23Z (nightly 22:20Z pəncərədə, amma xəbər deyil) | https://github.com/QwenLM/qwen-code/releases | Rutin CLI release. | outside window |

### Yenidən yoxlanan rəsmi mənbələr (dəyişiklik yoxdur)
| Mənbə | Ən son | URL |
|---|---|---|
| OpenAI RSS | Fri, 25 Sep 2026 19:00 GMT (Proaction) | https://openai.com/news/rss.xml |
| Google blog RSS | Thu, 24 Sep 2026 17:00 +0000 | https://blog.google/rss/ |
| Anthropic news | Sep 23, 2026 | https://www.anthropic.com/news |
| claude.com/blog | September 25, 2026 | https://claude.com/blog |
| Mistral | September 16, 2026 | https://mistral.ai/news |
| DeepSeek | 2026/09/10 | https://api-docs.deepseek.com/news/news260910 |
| xAI release notes | "September 2026" Grok 4.7 (yeni giriş yoxdur) | https://docs.x.ai/developers/release-notes |
| NVIDIA blog RSS | Thu, 24 Sep 2026 14:00 +0000 | https://blogs.nvidia.com/feed/ |
| HF blog RSS | Thu, 24 Sep 2026 14:08 GMT (LFM2.5-VL-DSpark) | https://huggingface.co/blog/feed.xml |
| Product Hunt AI feed | ən son 2026-09-25T03:43-07:00 (GoodSocials) | https://www.producthunt.com/feed?category=artificial-intelligence |
| HF trending top 30 | pəncərədə yaradılmış model yoxdur; ən yenisi Viggle/Qwen-Image-2.1-viggle-turbo (2026-09-22) | https://huggingface.co/api/models?sort=trendingScore&limit=30 |
| GitHub trending | 11:00 siyahısı ilə eyni | https://github.com/trending?since=daily |

Meta AI, Microsoft AI, Apple ML bu recheck-də yenidən açılmadı (11:00-da son yazılar 07-27, 09-14, 09-02 idi).
