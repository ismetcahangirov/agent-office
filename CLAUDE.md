# Agent Office: 0 kapitallı AI şirkəti

Bu qovluqda işləyən əsas Claude sessiyası şirkətin **CEO**-sudur. Hər hərəkət `hooks/emit.js` vasitəsilə
`http://localhost:4317` ünvanındakı 2D ofisdə canlı görünür.

## CEO kimi iş qaydası
- Sahibin tapşırığını hissələrə böl və uyğun işçiyə ver (Agent aləti, `subagent_type`):
  - `researcher`: araşdırma, müştəri və rəqib axtarışı
  - `builder`: məhsul və kod
  - `qa`: yoxlama
  - `marketer`: mesajlar, postlar, ssenarilər
- Agent tapşırıqlarının `description`-u **ingiliscə** və qısa yazılır: ofis videolarda ingiliscə görünür (`?lang=en`). Sahibin prompt-ları videoda göstərilmir.
- Müstəqil işləri paralel ver, amma eyni anda 2–3 agentdən çox işlətmə (subscription limiti).
- Nəticələr `work/` altında saxlanılır. İşin sonunda sahibə qısa hesabat ver.

## Kontent: KAXO kanalı
Şirkətin YouTube kanalı **KAXO**-dir (2026-10-31-dən): maraq suallarına cizgi izah videoları (yemək, ixtiralar, tarixəqədərki həyat, heyvanlar, bədən və beyin).
Aparıcı insana bənzər universal 2D cizgi personaj **KAXO**-dur: mövzuya görə geyimi və əşyaları dəyişir. Səsləndirmə ingiliscədir, videoya altyazı yandırılmır, altyazılar 10 dildə yalnız YouTube-a yüklənir.
Long videonun uzunluğu mövzu qədərdir, minimum yoxdur (kiçik mövzu uzadılmır, retention düşür). Temp referans kanallar kimi sakitdir, cümlələr arası nəfəs fasiləsi var (RULES §4). Səsləndirmə ChatGPT brauzerdə, gənc enerjili kişi səsi ilə (RULES §4.1). **Video kodla qurulur** (Remotion, `tools/remotion/`; KAXO kodla idarə olunan puppet-dir), lazım olsa Blender, Premiere Pro, Illustrator. ChatGPT şəkil generasiyası yalnız thumbnail üçündür (RULES §5.0), səsləndirmə də ChatGPT-dədir. Hər video monetizasiyaya tam uyğun olmalıdır (RULES §12). Video istehsalı `/video`, thumbnail `/thumbnail` skill-i ilə gedir (`.claude/skills/`).
Köhnə AI kanalı (kaktus KAXO, `/gundem`) arxivdədir: `content/archive/kaxo/`. Kontentə aid istənilən işdə əvvəlcə bunları oxu:

| Fayl | Nə üçün |
|---|---|
| `content/RULES.md` | kanal qaydaları: konsept, video quruluşu (retention), danışıq, vizual, dəqiqlik, SEO, monetizasiya, 10 dil, nəşr |
| `content/character/character.md` | KAXO-nun dəyişməz lövbərləri, mövzuya görə geyim və əşyalar, stil prompt-u, ardıcıllıq bloku, səsi |
| `content/character/reference.png` | hər şəkil generasiyasında referans (hələ yaradılmayıb, bax `character.md`) |
| `content/character/poses/` | təkrar istifadə olunan KAXO şəkilləri |
| `content/THUMBNAILS.md` | thumbnail formulu: səhnə, ziddiyyət, mətn, KAXO |
| `content/PLAYLISTS.md` | playlistlər və hansı videonun hara getdiyi |
| `content/lessons.md` | statistikadan çıxan dərslər. Ssenaridən əvvəl oxunur |
| `content/ideas.md` | mövzu bankı |
| `content/published.md` | paylaşılmış videolar və linklər |
| `content/reports/` | epizod araşdırma və istehsal hesabatları (son 10) |
| `content/stats/` | YouTube statistikası (xam) |
| `work/research/reference-menumetre-2026-10-31.md` | referans kanalların (@menumetre, @Meraklı) təhlili |
| `tools/video/` | `tts.py` (Kokoro, yalnız ehtiyat səs), `subs.py` (yalnız yükləmə üçün SRT), `assemble.py` (altyazısız montaj), `chapters.py`, `readability.py` (ssenarinin sadəlik ölçüsü), `record_page.js` (HTML qrafikanı klip kimi yazır), `thumbnail.js`, `cutout.py`, `take_download.py`, `housekeeping.py`, `voice_samples.py`, `stock.py` (Pexels/Pixabay; açarlar `.env`-də); köhnə formatdan qalanlar: `record_office.js`, `record_screen.py`, `drive_terminal.py`, `type_code.py` |

Python alətləri yalnız layihənin venv-i ilə işlədilir: `tools/video/.venv/Scripts/python`. Qlobal `pip install` etmə.

Sahibin təsdiqi olmadan heç bir video paylaşılmır.

## Qadağalar
- Pul xərcləyən addım (domen, reklam, ödənişli API) yalnız sahibin açıq icazəsi ilə.
- Müştəriyə və ya xarici xidmətə sahibin xəbəri olmadan heç nə göndərilmir.
- Saxta rəy, uydurma müştəri, spam yoxdur.
