# Gundem 2026-09-28: official / first-party sources

Window: **2026-09-27 13:00 UTC -> 2026-09-28 13:00 UTC** (Sunday afternoon -> Monday midday UTC).
Method: RSS `pubDate`, GitHub API `published_at`, HF API `createdAt`/`lastModified`, and the visible byline date on the page. No shell/curl in this session (WebFetch only), so dates marked "WebFetch summary" are one step removed; RSS/API fields are the most reliable.
Previous day's file checked: `content/news/2026-09-27.md` (nothing repeated below unless there is a new official development).

## Verdict: quiet day for the big labs; one real open-model launch (H Company Holo4)
None of Anthropic, OpenAI, Google/DeepMind, Meta, Mistral, xAI, DeepSeek, Qwen, Microsoft AI, Apple ML or NVIDIA published a new post/model in the window. The only substantive first-party AI launch found is **H Company's Holo4** (computer-use agent models, open weights).

## Confirmed in-window items

| # | Item | Date/time (UTC) | First-party source | What changed | How date was verified |
|---|---|---|---|---|---|
| 1 | **H Company: Holo4 (computer-use agent models, open weights)** | 2026-09-28 09:44:05 GMT | https://huggingface.co/blog/Hcompany/holo4 · https://www.hcompany.ai/newsroom/holo4 | H Company released Holo4-27B (dense) and Holo4-35B-A3B (MoE, 3B active), 262K context, for GUI/code/MCP/API computer use; available on the H Models API and as open weights on HF (BF16, FP8, NVFP4, 4-bit GGUF); training trajectories open-sourced. A third model, Holotron4 (30B-A3B), is in the same HF collection. | HF blog RSS `pubDate: Mon, 28 Sep 2026 09:44:05 GMT` (https://huggingface.co/blog/feed.xml); hcompany.ai newsroom visible date "September 28, 2026". Note: HF model repos have `createdAt` 2026-09-24/25 and `lastModified` 2026-09-25 14:51Z, with very low downloads (<=65) at check time. Most likely created privately before the announcement; the public launch date is 09-28. |
| 2 | OpenAI Codex CLI 0.158.0 | 2026-09-28 05:07:23Z | https://github.com/openai/codex/releases/tag/rust-v0.158.0 | Routine CLI release: copy-on-select/right-click paste in fullscreen TUI, OAuth client secrets for MCP servers, bearer-token auth for WebSocket connections, transparent backgrounds for image gen/edit, Windows/Linux sandbox fixes. | GitHub API `published_at` (https://api.github.com/repos/openai/codex/releases). The WebFetch summary of the release page said "September 28, 2025", which is a summarizer error; the API says 2026. Not yet in the official changelog (https://learn.chatgpt.com/docs/changelog, latest entry 2026-09-26 Codex CLI 0.157.1). |
| 3 | Product Hunt AI launches (small makers, not labs) | Arc 2026-09-27 17:11 UTC; PIP 16:48 UTC; Sayble 19:46 UTC | https://www.producthunt.com/feed?category=artificial-intelligence | Arc "Your mobile AI assistant on any screen"; PIP "AI buddy on your computer"; Sayble "AI copilot for calls that tells you what to say next". Nothing notable. | PH Atom feed `published` (-07:00 converted to UTC). Harness Router (09-27 07:03 UTC) is just before the window. |

### Holo4 numbers (official only, verbatim from the source)
From https://www.hcompany.ai/newsroom/holo4 (via WebFetch, so these are one step removed; re-check on the page before using them on screen):
- OSWorld: Holo4 27B **85.2%** at **$0.08/task**; Holo4 35B-A3B **80.8%** at **$0.05/task**
- OSWorld 2.0 (long workflows): 27B **61.7% score / 41.5% success / $1.22** per task; 35B-A3B **30.9% / 12.3% / $0.61**
- AndroidWorld: 27B **85.1%** ($0.08); 35B-A3B **77.6%** ($0.07)
- AutomationBench: 27B **45.4%** ($0.05); 35B-A3B **34.5%** ($0.02)
- HF blog: on OSWorld 2.0, Opus 5.5 is shown at **81.8%** vs Holo4 27B at 61.7%. This is H Company's own comparison, not Anthropic's. Training: "127B tokens" of SFT with "two RL experts"; Agentic Task Factory of "about 10,000 tasks".
- **License conflict:** HF API tags show `Holo4-27B` = **cc-by-nc-4.0** (non-commercial) and `Holo4-35B-A3B` = **apache-2.0** (https://huggingface.co/api/models/Hcompany/Holo4-27B, .../Holo4-35B-A3B). The WebFetch summary of the hcompany page said "27B Apache 2.0", which is probably a summarizer error. Treat the HF tags as authoritative and say "27B is non-commercial" only after checking the model card.

## OpenAI DevDay (2026-09-29): pre-announcements
- Official page https://devday.openai.com/: Tuesday 2026-09-29, Fort Mason, San Francisco; opening keynote with Sam Altman at **10:00 a.m. PT (= 17:00 UTC, 21:00 Baku)**, livestreamed; breakouts 11:15 a.m.–3:30 p.m. No product teasers on the page ("We'll be sharing more details in coming weeks").
- No new DevDay post in the OpenAI RSS in the window (latest item is still 25 Sep 19:00 GMT, Proaction). No new entry in the developer changelog after 09-25.
- X (@OpenAIDevs) could not be read with WebFetch. The "72 hours" teaser (~09-26 19:28 UTC) is already in yesterday's file. A "24 hours" post is likely but **not verified**.
- DevDay Exchange cities (Bengaluru 10-16 ... Mexico City 11-10) come from a third-party roundup (https://www.aiagentslibrary.com/blog/openai-devday-2026/), not verified on openai.com.

## Quiet sources (checked, nothing new in window)
| Source | Latest item (date) | URL |
|---|---|---|
| Anthropic news | 2026-09-23 "Claude discovers a novel enzyme system..." | https://www.anthropic.com/news |
| Anthropic research | 2026-09-25 "Yes, Claude can do Nine Loops" | https://www.anthropic.com/research |
| Anthropic sitemap | `research/riemann-zeta` has lastmod 2026-09-26 16:02Z, but the page date is **Aug 10, 2026** (technical update, NOT news) | https://www.anthropic.com/sitemap.xml |
| claude.com/blog | 2026-09-25 "Build plugins for Claude" | https://claude.com/blog |
| Claude API release notes | 2026-09-24 | https://platform.claude.com/docs/en/release-notes/overview |
| Claude Code releases | v2.1.283, 2026-09-25 21:50Z | https://github.com/anthropics/claude-code/releases |
| OpenAI RSS | Fri 25 Sep 2026 19:00 GMT (Proaction) | https://openai.com/news/rss.xml |
| OpenAI API changelog | 2026-09-25 (GPT-6 Sol/Luna image encoding fix) | https://developers.openai.com/changelog |
| Google blog RSS | Thu 24 Sep 2026 17:00 +0000 | https://blog.google/rss/ |
| Google DeepMind blog | newest dated post 2026-09-24 (Gemini 3.8 Live Avatar); Private AI Compute memory 2026-09-23 | https://deepmind.google/discover/blog/ |
| Gemini app release notes | 2026.09.10 | https://gemini.google/release-notes/ |
| Gemini API changelog | 2026-09-22 | https://ai.google.dev/gemini-api/docs/changelog |
| Meta AI blog | 2026-07-27 | https://ai.meta.com/blog/ |
| Mistral news | 2026-09-16 | https://mistral.ai/news |
| xAI API release notes | "September" Grok 4.7 (no new entry) | https://docs.x.ai/developers/release-notes |
| DeepSeek API news | 2026-09-10 V4.1-Flash | https://api-docs.deepseek.com/updates |
| Qwen (HF org, newest createdAt) | Qwen-Image-2.1-PE-I2I 2026-09-20 | https://huggingface.co/Qwen |
| Microsoft AI | no dates on the page; same top post as 09-27 (MAI Code of Conduct, 09-14) | https://microsoft.ai/news/ |
| Apple ML research | 2026-09-02 ECCV | https://machinelearning.apple.com/ |
| NVIDIA blog RSS | Thu 24 Sep 2026 14:00 +0000 | https://blogs.nvidia.com/feed/ |
| Third-party trackers (cross-check only) | llm-stats: nothing after 09-22; llmgateway: nothing after 09-25 | https://llm-stats.com/llm-updates · https://llmgateway.io/timeline |

## Hugging Face trending (top 30, sort=trendingScore)
None of the top 30 were created in the window. The newest are SupersonicLabs/Julia-1 (2026-09-23 15:29Z) and fastino/GLiNER2.5-Decide (2026-09-23 14:56Z). #1 is still convaiinnovations/laya (2026-09-18). Holo4 is not in the top 30 yet. Source: https://huggingface.co/api/models?sort=trendingScore&limit=30

## GitHub trending (daily, checked 2026-09-28)
https://github.com/trending?since=daily
- **debpalash/VoiceStudio** +3,086 today (41.9k stars, AGPL-3.0): "open-source, fully-local ElevenLabs alternative ... in 646 languages". **No new release in the window.** Latest release v0.5.6 was 2026-09-23 08:53Z; the repo was created 2026-04-09 and last pushed 2026-09-28 11:46Z (https://api.github.com/repos/debpalash/VoiceStudio/releases). This is a trend, not news, but it's a possible tutorial/review topic.
- vectorize-io/hindsight +4,520 and paperclipai/paperclip +2,401: already covered on previous days.
- dream-num/univer +895: covered 09-27.
- mvschwarz/openrig +114 ("Multi-agent harness that runs Claude Code and Codex together", Apache-2.0): v0.5.17 released 2026-09-27 (exact time not captured, so in-window is unverified), a minor packaging fix (Bun install).
- Others (PLFM_RADAR, cs341 coursebook, byoungd/up) are not AI news.

## Outside window (one line each)
- Holo4 HF repos created: 2026-09-24/25 (private pre-upload; public launch 09-28, see above)
- Codex CLI 0.157.1: 2026-09-26
- Anthropic "Nine Loops" research: 2026-09-25
- OpenAI Proaction customer story: 2026-09-25
- Gemini 3.8 Live Avatar: 2026-09-24
- Claude Code v2.1.283: 2026-09-25
- VoiceStudio v0.5.6: 2026-09-23
- Grok 4.7: September 2026 (trackers say 09-21)
- DeepSeek V4.1-Flash: 2026-09-10
- Anthropic Riemann-zeta research: 2026-08-10 (sitemap lastmod 09-26 is technical only)
