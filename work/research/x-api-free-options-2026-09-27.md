# X/Twitter postlarını pulsuz oxumaq yolları (2026-09-27)

Tapşırıq: gündəlik AI xəbər monitorinqi üçün təxminən 10 rəsmi hesabın son postlarını və son 24 saatda "Claude", "GPT-6" kimi açar sözlər üzrə axtarışı yalnız oxumaq rejimində almaq. Həcm gündə təxminən 100–300 post.

## 1. Rəsmi X API
- 2026-02-06-dan yeni developerlər üçün standart model pay-per-use (kredit) oldu. Köhnə Free tier işlək deyil. Pulsuz "scaled access" yalnız "Public Utility" kimi təsnif olunan tətbiqlərə verilir. Aktiv Free istifadəçilərinə bir dəfəlik $10 voucher verildi. Mənbə: https://x.com/XDevelopers/status/2019881225587167406, https://devcommunity.x.com/t/announcing-the-launch-of-x-api-pay-per-use-pricing/256476
- Rəsmi sənəddəki qiymət: post oxumaq **$0.005/resurs** (öz postlarını oxumaq $0.001), limit **ayda 3M post oxuma**, eyni resurs bir UTC günü (24 saat) ərzində yalnız bir dəfə hesablanır. Abunə yoxdur. Sənəddə search endpoint-lərinin ayrıca qiyməti göstərilməyib. Mənbə: https://docs.x.com/x-api/getting-started/pricing
- Legacy Basic 2026-06-01-dən, legacy Pro isə 2026-09-01-dən pay-per-use-a köçürülüb. Bu məlumat ikinci dərəcəli mənbədəndir, rəsmi sənəddə yoxlanmayıb: https://www.blotato.com/blog/twitter-api-pricing, https://roboin.io/article/en/2026/02/08/x-transitions-api-to-pay-per-use-model-ending-free-plan/
- **Bizim üçün hesablama (təxmini):** 300 post/gün × $0.005 = təxminən $1.5/gün, yəni ayda təxminən $45. Pulsuz deyil.

## 2. xAI Grok API: X Search aləti
- X postlarını axtara bilir. 2026-09-21-dən qiymət çağırış başına deyil, element başınadır: **$5 / 1000 post** (parent və quote postlar da sayılır), **$10 / 1000 profil**. Bunun üstünə model tokenləri də ödənir. Mənbə: https://docs.x.ai/developers/pricing. Tarix mənbəyi: https://runtimewire.com/article/xai-is-changing-the-economics-of-x-search-runtimewire-was-built-for-a-narrower-r
- Pulsuz kredit: yeni hesaba $25 promo kredit (30 gün etibarlıdır). Data-sharing proqramına qoşulanda ayda $150 verilir, amma şərtlər var: əvvəlcə ən azı $5 xərclənməlidir, API girişləri model təliminə gedir, proqramdan geri çıxmaq olmur. Bunlar üçüncü tərəf mənbələridir, rəsmi sənəd səhifəsində təsdiqini tapmadım: https://aitoolsrecap.com/Blog/how-to-get-free-grok-api-key-2026-step-by-step, https://aicredits.dev/submissions/74-xai-grok-api-150-month-data-sharing-credits
- **Təxmini hesab:** 300 post/gün, yəni ayda təxminən 9000 post, təxminən $45/ay (üstəgəl tokenlər). $150/ay data-sharing krediti bunu örtər, amma $5 minimum xərc, pul xərcləmək üçün isə sahibin icazəsi lazımdır.

## 3. Nitter / xcancel / RSS körpüləri
- 2026-08-24-də X Nitter-ə cease-and-desist göndərdi. 2026-09-11-də Nitter GitHub repo-su arxivləndi, 2026-09-15-də xcancel "until further notice" dayandırıldı. Mənbə: https://techcrunch.com/2026/09/15/nitter-and-xcancel-are-dead-again-after-xs-latest-legal-actions/
- Buna baxmayaraq status.d420.de (2026-09-27 07:48 UTC) 5 sağlam instansiya göstərir, hamısında RSS açıqdır, uptime 85–95%. Adları: nitter.miningtcup.me, nitter.meowing.monster, nitter.netbub.com, shitter.thepixora.com, nitter.jaydenha.uk. Sayt açıq şəkildə yazır: "do NOT use these instances for scraping, host nitter yourself". Mənbə: https://status.d420.de/
- Əvvəllər nitter.net-in RSS-i boş səhifə qaytarırdı, xcancel xüsusi User-Agent tələb edirdi, digər instansiyalar bot challenge ilə bloklanırdı. Mənbə: https://github.com/zedeus/nitter/issues/1353
- RSSHub twitter route-u X hesabının cookie-lərini (`auth_token`, `ct0`) tələb edir. Mənbə: https://github.com/DIYgod/RSSHub/discussions/14956
- rss.app ayrıca yoxlanmayıb.

## 4. Digər variantlar
- **Apify:** Free plan ayda $5 kredit verir (https://apify.com/pricing). Populyar "Tweet Scraper V2" (apidojo) $0.40/1000 tweet-dir, amma free istifadəçilər üçün ciddi məhdudiyyət var: ayda 5 run, hər run-da 10 element, API girişi yoxdur (https://apify.com/apidojo/tweet-scraper). Başqa actor-lar üçün $0.20/1000 iddiası üçüncü tərəf mənbəsindədir və yoxlanmayıb: https://use-apify.com/docs/best-apify-actors/best-twitter-scrapers
- **twscrape:** v0.20.1 (2026-08-25) açıq mənbəlidir, pulsuzdur, amma öz X hesablarının cookie-lərini (`auth_token`, `ct0`) tələb edir. Hesablar ban oluna bilər. Mənbə: https://github.com/vladkens/twscrape, https://pypi.org/project/twscrape/
- **Bluesky:** `app.bsky.feed.getAuthorFeed` `public.api.bsky.app` üzərindən autentifikasiyasız işləyir. `searchPosts` isə 2026-09-25-dən autentifikasiyasız sorğuya 403 qaytarır, pulsuz app-password ilə işləyir. Mənbə: https://docs.bsky.app/docs/api/app-bsky-feed-get-author-feed, https://github.com/cyanheads/bluesky-mcp-server/issues/32. AI laboratoriyalarının rəsmi Bluesky hesablarının olub-olmadığını və nə qədər aktiv olduğunu **yoxlamadım**.
- **Rəsmi blog RSS-ləri:** https://openai.com/news/rss.xml işləyir, son element 2026-09-25 tarixlidir. https://deepmind.google/blog/rss.xml cavab verir, amma alətin oxuduğu ən yeni element 2025-10 tarixli idi, buna görə köhnəlmiş ola bilər və yoxlanmalıdır. Anthropic, xAI, Qwen və DeepSeek bloqlarında RSS olub-olmadığı yoxlanmayıb.

## 5. ToS riskləri
- X ToS yazılı icazə olmadan "any form" crawling və scraping-i qadağan edir. Liquidated damages: 24 saatda 1,000,000 post üçün $15,000. 2026-01-15 yeniləməsində bu şərt saxlanıb. Mənbə: https://crypto.news/x-expands-content-to-ai-prompts-outputs-in-2026-terms-update/, https://techcrunch.com/2023/09/08/x-updates-its-terms-to-ban-crawling-and-scraping
- Nitter, twscrape, RSSHub cookie və Apify scraper-lərin hamısı scraping sayılır, yəni ToS-a ziddir. Cookie istifadə olunan hesablar ban oluna bilər. Rəsmi X API və xAI X Search isə ToS-a uyğundur.

## Müqayisə cədvəli
| Variant | Pulsuz? | Nə oxuya bilir | Limitlər | Etibarlılıq | ToS riski | Mənbə |
|---|---|---|---|---|---|---|
| X API pay-per-use | Xeyr (köhnə Free istifadəçisinə bir dəfəlik $10) | Timeline, search | $0.005/post, ayda 3M, gündəlik dedup | Yüksək | Yox | docs.x.com/x-api/getting-started/pricing |
| xAI X Search | $25 promo (30 gün), şərtli $150/ay data-sharing | X axtarışı (Grok vasitəsilə) | $5/1000 post + tokenlər | Yüksək, amma LLM filtrindən keçir | Yox | docs.x.ai/developers/pricing |
| Nitter RSS (qalan instansiyalar) | Bəli | Hesab timeline-ı, search | Instansiyadan asılıdır, uptime 85–95% | Aşağı (hüquqi təzyiq, repo arxivləşib) | Yüksək | status.d420.de, techcrunch |
| RSSHub (self-host) | Bəli | Timeline, search | Hesab rate limit-i | Orta | Yüksək (hesab cookie-si) | github.com/DIYgod/RSSHub |
| twscrape | Bəli | Timeline, search | Hesab başına rate limit | Orta | Yüksək (hesab ban) | github.com/vladkens/twscrape |
| Apify Free | $5/ay | Tweet, search | Tweet Scraper V2-də free: 5 run × 10 element, API yoxdur | Orta | Orta-yüksək (scraping) | apify.com/apidojo/tweet-scraper |
| Bluesky API | Bəli | Author feed (auth-suz), search (app-password ilə) | Səxavətli | Yüksək | Yox | docs.bsky.app |
| Rəsmi blog RSS | Bəli | Yalnız blog postları | Yoxdur | Yüksək | Yox | openai.com/news/rss.xml |

## Tövsiyə
Bizim həcmimiz üçün ToS-a uyğun **tam pulsuz** X yolu yoxdur. Rəsmi X API ayda təxminən $45 tutur (təxmini). xAI X Search də təxminən $45/ay (təxmini) üstəgəl tokenlərdir, onu ancaq şərtli data-sharing krediti örtə bilər. Hər iki variant sahibin pul icazəsini tələb edir. Pulsuz və təhlükəsiz əsas mənbə kimi rəsmi blog RSS-lərini (OpenAI RSS təsdiqlənib) və Reddit RSS-i (artıq istifadə olunur) götürmək, Bluesky-ni isə əlavə etmək məsləhətdir: getAuthorFeed auth-suz işləyir, search üçün pulsuz app-password lazımdır. X üçün mövcud "WebSearch `site:x.com`" yanaşmasını saxlamaq olar. Nitter, twscrape və RSSHub-cookie texniki cəhətdən pulsuzdur, amma ToS-a ziddir, hesab ban riski daşıyır və Nitter hüquqi təzyiq altındadır. Onları ancaq sahib riski açıq qəbul edərsə, tək və aşağı tezlikli (gündə 1 dəfə) fallback kimi işlətmək olar. Sahib gələcəkdə büdcə ayırsa, ən sadə və qanuni variant rəsmi X API pay-per-use-dur: yalnız 10 hesabın timeline-ını oxumaq, gündəlik dedup nəzərə alınsa, təxminən ayda $20–45 (təxmini).
