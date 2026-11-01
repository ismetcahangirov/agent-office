# Playlistlər: KAXO

`/video` paylaşanda hər videonu buradakı qaydalara görə playlistə qoyur. Playlist YouTube Studio-da yoxdursa, eyni addımda yaradılır (başlıq və təsvir aşağıdakı kimi, görünürlük Public). **KAXO Shorts** playlisti artıq var (`published.md`), yenidən istifadə olunur. Köhnə AI playlistləri (KAXO Tests AI Tools, AI Models Explained, KAXO Reacts: AI News) 2026-10-31-də Private edilib; silmək sahibindir. KAXO Shorts-un təsviri yenilənib.

## Siyahı (RULES §1-in 4 mövzu sahəsi)
| Playlist (YouTube adı) | Nə girir | Sıra |
|---|---|---|
| **Why Don't We Eat It?** | bir xalqın yediyi, digərinin yemədiyi yeməklər; yeməyin tarixi | yenidən köhnəyə |
| **How Did Humans Invent It?** | gündəlik əşya və texnologiyanın yaranışı (sabun, kərpic, kompüter) | yenidən köhnəyə |
| **Life Before History** | tarixəqədərki insanlar necə yaşayırdı, yatırdı, sağ qalırdı | yenidən köhnəyə |
| **Why Do Animals Do That?** | heyvan davranışı, insanla heyvan münasibəti | yenidən köhnəyə |
| **Inside Your Head** | insan bədəni və beyni haqqında suallar | yenidən köhnəyə |
| **KAXO Shorts** | bütün short-lar | yenidən köhnəyə |

## Qaydalar
- Hər video **bir əsas playlistə** girir (`seo.json` → `playlists[0]`). Uyğundursa, bir əlavə playlistə də girə bilər (ən çox 2).
- Seriya videoları əlavə olaraq öz seriya playlistinə girir (sahibin təsdiqi ilə yaradılır), sıra xronolojidir.
- Hər short əlavə olaraq **KAXO Shorts**-a girir və təsvirində orijinal long videonun linki olur.
- Playlist təsvirləri (SEO):
  - **Why Don't We Eat It?:** "Half the world eats it, the other half never does. History, geography and a few surprising laws explain why."
  - **How Did Humans Invent It?:** "The surprising stories behind everyday things, from soap to bricks to computers."
  - **Life Before History:** "How did our ancestors sleep, stay clean and survive without anything we have today?"
  - **Why Do Animals Do That?:** "Strange animal behavior, and the science and history that explain it."
  - **Inside Your Head:** "Everyday questions about your body and brain, answered with real research."
  - **KAXO Shorts:** "One surprising fact at a time."
- Playlist yeni yaradılanda `content/published.md`-nin "Playlistlər" cədvəlinə adı və URL-i yazılır.
