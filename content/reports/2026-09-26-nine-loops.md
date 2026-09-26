# 2026-09-26 · nine-loops (news flash short)

## Şirkətdən real faktlar (A, mənbələrlə)
Tam: `work/research/ep-nine-loops-facts.md`. CEO curl ilə sitatları yoxladı (2026-09-26).
- **Xəbər (birinci mənbə, 2026-09-25):** https://www.anthropic.com/research/yes-claude-can-do-nine-loops, qonaq yazı, müəllif fizik Matt von Hippel (Anthropic dəvət edib, "Disclosure"). Onun çağırışı "beaten a month later". Anthropic fizikləri Fable 5.1 + Claude Science ilə 6 hissəcikli (hexagon) amplitudu 9 loop-da hesablatdılar. Əvvəlki rekord 8 loop, Lance Dixon (SLAC) "a few years back" (2023). Dixon yoxladı: "quite a triumph".
- Prompt: "I'm going to sleep and won't be available for another several hours. Keep working on this until I tell you to stop."
- Xərc: "around one or two thousand dollars" (hər yanaşma üçün). 96 CPU × 1 həftə yalnız ~$100-luq bootstrap hissəsidir, ümumi müddət deyil.
- Qeydlər: "Claude used known methods"; Song He qrupu (Çin EA) eyni vaxtda böyük hissəni GPT-6 köməyi ilə hesablayıb → "ilk", "tək", "yeni fizika" demək olmaz.
- Cognition 2026-09-25: "crossed $1B in annualized revenue run rate" (https://cognition.com/blog/1b-run-rate).
- **Şirkət:** kapital 0, gəlir 0 (RULES §1, §5). Kanal: 3 video, 0 abunəçi (YouTube API, 2026-09-26 16:40, `content/stats/2026-09-26-api.json`). Bu gün Remotion testi: kor QA bizim dərc etdiyimiz short-da ağ ekran tapdı (`content/reports/2026-09-26-claude-remotion.md`).

## Açar sözlər və trendlər (B)
Tam: `work/research/ep-nine-loops-seo.md`. ai physics (#1), anthropic claude (#2), ai scientist (#2), ai breaks record (#3), ai scientific discovery. "claude loops" Claude Code tutoriallarına aparır → "physics" sözü ilə. HN 103/60 (tənqid: PR, milyardlıq təlim gizlənir). Rəqib Short yoxdur (ay ferment xəbərini müzakirə edir).

## Seçilən ideya və niyə
News flash (≤ 48 s, son tarix 2026-09-27): alim Claude-a "I'm going to sleep, keep working" deyib, səhər fizika rekordu gəlib, $1–2k. KAXO eyni cümləni hər gün işçilərinə deyir, qarşılığında... bu gün öz videosundakı səhvi aldı. Real fakt: prompt sitatı + bizim 0/0 rəqəmlərimiz.

## İstehsal qeydləri
- **Dərc:** https://youtube.com/shorts/WQogx1oam2g (0:36, Public, KAXO Reacts: AI News (yeni playlist) + KAXO Shorts), EN altyazı, TR başlıq/təsvir/altyazı. Cover `thumb/cover.png` (Studio vebdən Shorts cover dəyişilmir; TikTok/IG üçün saxlanılır).
- **Sahibin iki qaydası istehsal zamanı gəldi:** öz keçmiş videolarımızdan və şirkətin hadisələrindən danışılmır → ssenari iki dəfə dəyişdi (ağ ekran → səhər gündəm uğursuzluğu → yalnız mövzu + KAXO sitcomu). RULES §1, §3 yeniləndi.
- **Vaxt:** araşdırma ~5 dəq (2 agent), ssenari ~10 dəq, 4 ChatGPT şəkli ~5 dəq (limit dolmadı), TTS ~1 dəq, montaj + yoxlama ~5 dəq. Ofis crop-u əvvəl boş masalara, sonra "Remotion packages" balonuna düşdü → agentlərə endirildi (şirkət işi görünməsin).
- **Studio:** Shorts formasında başlıq sahəsi yüklənmədən yazılmırdı (fokus səhvi bütün səhifəni seçdi) → sahəyə klik + `document.activeElement` ilə yazmaq işlədi. İki dropdown eyni anda açıq qaldı → JS ilə seçim.
