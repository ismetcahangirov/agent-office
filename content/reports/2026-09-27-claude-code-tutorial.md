# 2026-09-27 · claude-code-tutorial

## Mövzunun faktları
- Faktlar: `content/reports/2026-09-27-claude-code-tutorial-facts.md` (code.claude.com sənədləri; quraşdırma linkləri curl ilə 200).
- Real test: Claude Code 2.1.283, Opus 5.5, Claude Max, Windows. `C:\kaxo-demo\focus-timer`: plan (~80 s) → 3 fayllı Focus Timer (~130 s) → stats bar (~70 s) → /init → commit c51582b. 2-ci sessiya: @app.js sualı, iki tab bug-ı (storage event, 7 sətir) → 77ec550, Esc ilə böyük istəyin dayandırılması, 50/10 düyməsi → de0f41d, Esc Esc Rewind menyusu. Plan: `work/tests/claude-code-tutorial/plan.md`.

## Açar sözlər
claude code tutorial for beginners, claude code windows (install / tutorial / terminal), how to use claude code, claude code for absolute beginners, opus 5.5; TR: claude code kullanımı, claude code nasıl kurulur. Agentlərlə dərin SEO/rəqib araşdırması API xətalarına görə alınmadı (3 dəfə düşdü), autocomplete CEO tərəfindən yığıldı.

## Seçilən ideya və niyə
Gündəm 09-27 siqnal #2 (Opus 5.5 Reddit-də 1-ci, "claude code" türkcə sorğular). Rəqiblərdə test var, Windows-da addım-addım tutorial azdır.

## İstehsal qeydləri
- Yeni alət: `tools/video/drive_terminal.py` (terminalı SendInput ilə idarə, transcript-dən `wait`), `work/tests/claude-code-tutorial/{cut_clips,make_cards,build_episode,make_tr_srt,record_app}.py|js`.
- Problemlər: 1) home altındakı layihə `~/.claude/CLAUDE.md`-ni oxudu (beyin qaydaları kadra düşdü, handoff faylına yazdı) → demo `C:\kaxo-demo`-ya köçürüldü, 1-ci take silindi. 2) wt env miras aldı ("transcript saving is off"). 3) Git Bash `/model` → yol; `MSYS_NO_PATHCONV=1`. 4) Girişdən sonrakı Enter-i auto-mode bloklayıb, sahib basdı; OAuth kodunu sahib verdi. 5) Ekran yazısı üstdəki pəncərəni çəkir: bir skrinşota sahibin Google Meet görüşü düşdü, dərhal silindi. 6) `/model` kadrındakı "94% weekly limit" banneri drawbox ilə örtüldü.
- Onboarding klipi 0–35 s-ə kəsildi (brauzer girişi, e-poçt, OAuth URL kadrdan çıxarıldı).
- KAXO kadrları poza kitabxanasındandır (6/6), yeni şəkil generasiyası edilmədi: tutorial ekran əsaslıdır.
- Müddət 6:22 (RULES tutorial 12–25 dəq-dən qısa; sahib ~10 dəq razılaşdı, real görüntü 6:22-yə çatdı).
- Monetizasiya: orijinal real test və ekran yazısı, KAXO 6 səhnə, başqa mənbə oxunmur, risk aşağı.
- Dərc: https://youtu.be/Cai17CW1GPA (2026-09-27, Public, 6:23), playlist KAXO Tests AI Tools + AI Models Explained; EN altyazı yükləmə ilə, TR başlıq/təsvir/altyazı Languages səhifəsindən; API: localizations en, tr.
- Yükləmə: fayl 50 MB, sahib sürüklədi; qalan hər şey JS/find ilə. Languages dialoqunda TR başlıq+təsvir və altyazı bir pəncərədədir ("Save changes" → Manual subtitles → gizli input).
