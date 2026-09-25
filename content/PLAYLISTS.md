# Playlistlər

`/video` paylaşanda hər videonu buradakı qaydalara görə playlistə qoyur. Playlist YouTube Studio-da yoxdursa, eyni addımda yaradılır (başlıq və təsvir aşağıdakı kimi, görünürlük Public).

## Siyahı
| Playlist (YouTube adı) | Nə girir | Format | Sıra |
|---|---|---|---|
| **KAXO Reacts: AI News** | yeni model, alət, şirkət xəbəri (gündəmdən) | long + short | yenidən köhnəyə |
| **KAXO Tests AI Tools** | agentlərin yeni aləti real sınadığı videolar | long + short | yenidən köhnəyə |
| **KAXO's AI Company** | şirkətin öz hekayəsi: agentlər, tapşırıqlar, həftəlik rəqəmlər | long + short | köhnədən yeniyə (seriya) |
| **AI Models Explained** | yeni modelləri müqayisə və izah edən long videolar | long | yenidən köhnəyə |
| **KAXO Shorts** | bütün short-lar | short | yenidən köhnəyə |

## Qaydalar
- Hər video **bir əsas playlistə** girir (`seo.json` → `playlists[0]`). Uyğundursa, bir əlavə playlistə də girə bilər (ən çox 2).
- Hər short əlavə olaraq **KAXO Shorts**-a girir.
- Long-dan kəsilmiş short-un təsvirində orijinal long videonun linki olur. YouTube "Related video" imkanı varsa, o da qurulur.
- Seriya playlistlərində (**KAXO's AI Company**) sıra xronolojidir. Yeni izləyici 1-ci epizoddan başlayır.
- Playlist təsvirləri (SEO):
  - **KAXO Reacts: AI News:** "The latest AI models and tools, explained by a lazy cactus who owns an AI company. New episodes every week."
  - **KAXO Tests AI Tools:** "KAXO's AI employees try the newest AI tools on real tasks. Honest results, no hype."
  - **KAXO's AI Company:** "A $0 company run entirely by AI agents. KAXO is the boss. He does nothing. Watch in order."
  - **AI Models Explained:** "New AI models compared and explained in plain English, with real tests."
  - **KAXO Shorts:** "Quick AI news and office chaos from KAXO's all-AI company."
- Playlist yeni yaradılanda `content/published.md`-nin sonundakı "Playlistlər" cədvəlinə adı və URL-i yazılır.
- Yeni playlist ideyası (məsələn, eyni mövzuda 3+ video) sahibin təsdiqi ilə bu fayla əlavə olunur.
