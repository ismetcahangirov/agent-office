"""Writes episode.json + script.md for the Claude Code tutorial (all facts from the real session, 2026-09-27)."""
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
EP = ROOT / "content" / "episodes" / "2026-09-27-claude-code-tutorial"
POSES = ROOT / "content" / "character" / "poses"


def N(en, tr):
    return {"speaker": "narrator", "text": en, "text_tr": tr}


def K(en, tr, speed=0.9):
    return {"speaker": "kaxo", "text": en, "text_tr": tr, "speed": speed}


def clip(sid, name, lines, start=0, chapter=None, **kw):
    s = {"id": sid, "clip": f"clips/{name}", "clip_start": start, "fit": "cover", "lines": lines, **kw}
    if chapter:
        s["chapter"] = chapter
    return s


def still(sid, lines, pose=None, motion="zoom_in", chapter=None):
    if pose:
        shutil.copy(POSES / pose, EP / "images" / f"{sid}.png")
    s = {"id": sid, "motion": motion, "lines": lines}
    if pose:
        s["pose"] = pose
    if chapter:
        s["chapter"] = chapter
    return s


shots = [
    clip("s01", "app-desktop.webm", [
        N("This focus timer took one paragraph and about six minutes of Claude's time.",
          "Bu odak zamanlayıcısı tek bir paragraf ve Claude'un yaklaşık altı dakikasını aldı."),
        N("No frameworks, no build step, and it works on a phone.",
          "Framework yok, derleme adımı yok, telefonda da çalışıyor."),
    ], start=7, chapter="What we're building"),
    still("s02", [
        K("I wrote the paragraph. That's the hard part.", "Paragrafı ben yazdım. Zor kısmı oydu."),
        N("It isn't. But you'll see every step, on Windows, starting from a fresh install.",
          "Değildi. Ama her adımı göreceksin, Windows'ta, sıfır kurulumdan başlayarak."),
    ], pose="couch-sprawled__messy-office__2x3.png"),
    clip("s03", "app-desktop.webm", [
        N("You'll install Claude Code, pick Opus 5.5, make it plan before it codes, add features, and fix a real bug.",
          "Claude Code'u kuracak, Opus 5.5'i seçecek, kodlamadan önce plan yaptıracak, özellik ekleyecek ve gerçek bir hata düzelteceksin."),
        N("We'll even commit it to git, which KAXO has never done in his life.",
          "Hatta git'e commit edeceğiz, KAXO'nun hayatında hiç yapmadığı bir şey."),
    ], start=19),
    still("s04", [
        N("Here's what you need first. A paid Claude plan, Pro or Max, or a Console account with API billing.",
          "Önce gerekenler. Ücretli bir Claude planı, Pro ya da Max, veya API faturalı bir Console hesabı."),
        N("The free Claude plan doesn't include Claude Code.",
          "Ücretsiz Claude planında Claude Code yok."),
        N("And on Windows, install Git for Windows too, so Claude can use its bash tools.",
          "Windows'ta ayrıca Git for Windows kur, böylece Claude bash araçlarını kullanabilir."),
    ], motion="static"),
    still("s05", [
        N("Installing is one line. On Windows, paste this into PowerShell.",
          "Kurulum tek satır. Windows'ta bunu PowerShell'e yapıştır."),
        N("On a Mac or Linux it's a curl command instead. Both are on the official setup page.",
          "Mac ya da Linux'ta onun yerine bir curl komutu var. İkisi de resmi kurulum sayfasında."),
    ], motion="static", chapter="Install and log in"),
    clip("s06", "c_launch.mp4", [
        N("Check it worked with claude dash dash version. Then open your project folder and type claude.",
          "claude tire tire version ile çalıştığını kontrol et. Sonra proje klasörünü aç ve claude yaz."),
        N("The first time, it asks if you trust this folder. Say yes only for code you actually know.",
          "İlk seferde bu klasöre güvenip güvenmediğini sorar. Sadece gerçekten tanıdığın kod için evet de."),
    ], start=1),
    clip("s07", "c_theme.mp4", [
        N("On a brand new install, it asks for a text style first. Dark mode, obviously.",
          "Yepyeni bir kurulumda önce yazı stilini sorar. Karanlık mod, tabii ki."),
        K("Everything's better in the dark. Especially naps.", "Karanlıkta her şey daha iyi. Özellikle şekerlemeler."),
    ]),
    clip("s08", "c_login.mp4", [
        N("Then the login method. Pick your Claude subscription, and a browser tab opens to sign in.",
          "Sonra giriş yöntemi. Claude aboneliğini seç, giriş için bir tarayıcı sekmesi açılır."),
        N("Approve it there, and you're back in the terminal, logged in.",
          "Orada onayla, terminale giriş yapmış olarak dönersin."),
    ], start=1),
    clip("s09", "c_model.mp4", [
        N("Type slash model to see the models. Opus 5.5 is the default here, and it's what we'll use.",
          "Modelleri görmek için eğik çizgi model yaz. Burada varsayılan Opus 5.5, biz de onu kullanacağız."),
        N("Sonnet is lighter and Haiku is the fastest. The arrow keys change the effort level.",
          "Sonnet daha hafif, Haiku en hızlısı. Ok tuşları efor seviyesini değiştirir."),
    ], start=0.5, chapter="Model and modes"),
    clip("s10", "c_modes.mp4", [
        N("Now the most useful key in Claude Code: Shift plus Tab. It cycles the permission modes.",
          "Şimdi Claude Code'un en faydalı tuşu: Shift artı Tab. İzin modları arasında geçiş yapar."),
        N("Auto mode runs safe actions on its own. Manual asks you before anything happens.",
          "Otomatik mod güvenli işleri kendisi yapar. Manuel mod her şeyden önce sana sorar."),
        N("Accept edits changes files without asking, and plan mode can read and think, but it can't touch a thing.",
          "Accept edits dosyaları sormadan değiştirir, plan modu ise okuyup düşünebilir ama hiçbir şeye dokunamaz."),
    ], start=8),
    still("s11", [
        K("Plan mode. It's basically me, except it actually writes the plan down.",
          "Plan modu. Temelde ben, tek farkı planı gerçekten yazıya dökmesi."),
    ], pose="pointing-at-robot-note-smug__office__3x2.png", motion="pan_right"),
    clip("s12", "c_prompt.mp4", [
        N("Here's the whole prompt. A Pomodoro timer with twenty-five minutes of focus and five of break, plus a task list.",
          "İşte tüm prompt. Yirmi beş dakika odak, beş dakika mola olan bir Pomodoro zamanlayıcı ve bir görev listesi."),
        N("Save it in localStorage, give it a dark design that works on a phone, and the key words at the end: plan it first.",
          "localStorage'a kaydet, telefonda da çalışan karanlık bir tasarım yap ve sondaki anahtar kelimeler: önce planla."),
    ], start=3, chapter="Plan first"),
    clip("s13", "c_think.mp4", [
        N("Opus 5.5 looks at the empty folder and thinks for about a minute. This part is sped up.",
          "Opus 5.5 boş klasöre bakıp yaklaşık bir dakika düşünüyor. Bu kısım hızlandırıldı."),
    ]),
    clip("s14", "c_plan.mp4", [
        N("Then you get an actual plan. Three files: index dot html, styles dot css and app dot js.",
          "Sonra gerçek bir plan geliyor. Üç dosya: index nokta html, styles nokta css ve app nokta js."),
        N("The timer works from the moment it should finish, so it stays right even in a background tab.",
          "Zamanlayıcı bitmesi gereken andan hesaplıyor, böylece arka plandaki sekmede bile doğru kalıyor."),
        N("It even adds a fast mode for testing, where a focus session lasts ten seconds.",
          "Test için bir hızlı mod bile ekliyor, orada bir odak seansı on saniye sürüyor."),
        N("At the end, it wrote its own test checklist: add tasks, start, pause, reload, and resize to phone width.",
          "Sonunda kendi test listesini yazdı: görev ekle, başlat, duraklat, yenile ve telefon genişliğine küçült."),
        N("Read it. If something's off, choose tell Claude what to change. We liked it, so: yes, and use auto mode.",
          "Oku. Bir şey yanlışsa Claude'a neyi değiştireceğini söyle seçeneğini seç. Biz beğendik, yani: evet, otomatik modla."),
    ], start=2),
    still("s15", [
        K("I approved a plan. Management is exhausting.", "Bir planı onayladım. Yöneticilik çok yorucu."),
    ], pose="beanbag-stopwatch-robot-typing__office__3x2.png", motion="zoom_out"),
    clip("s16", "c_write.mp4", [
        N("And now it builds. Every change shows up as a diff, right in the terminal.",
          "Ve şimdi inşa ediyor. Her değişiklik terminalde bir diff olarak görünüyor."),
        N("This is three times faster than real life. The whole build took about two minutes.",
          "Bu gerçek hızın üç katı. Tüm inşa yaklaşık iki dakika sürdü."),
    ], chapter="Claude builds it"),
    clip("s17", "c_skip.mp4", [
        N("Then a surprise. Claude asked to open Chrome and test the app by itself.",
          "Sonra bir sürpriz. Claude, Chrome'u açıp uygulamayı kendisi test etmek istedi."),
        N("That's a great habit, but we were recording, so we told it to skip, and it ran a syntax check instead.",
          "Harika bir alışkanlık, ama kayıttaydık, atlamasını söyledik, o da yerine sözdizimi kontrolü yaptı."),
    ]),
    clip("s18", "c_summary.mp4", [
        N("Then it wraps up with a summary: what each part does, and how to check it yourself.",
          "Sonra bir özetle bitiriyor: her parça ne yapıyor ve kendin nasıl kontrol edersin."),
    ], start=2),
    clip("s19", "app-desktop.webm", [
        N("So let's check. Add a few tasks, and pick the one you're working on.",
          "Hadi kontrol edelim. Birkaç görev ekle ve üzerinde çalıştığını seç."),
        N("Press start. In fast mode, the focus session ends in ten seconds.",
          "Başlat'a bas. Hızlı modda odak seansı on saniyede biter."),
    ], start=2),
    clip("s20", "app-desktop.webm", [
        N("The ring fills up, a chime plays, the task gets its tomato, and it switches to a break.",
          "Halka doluyor, bir zil çalıyor, görev domatesini alıyor ve molaya geçiyor."),
        N("Reload the page, and everything is still there.",
          "Sayfayı yenile, her şey hâlâ yerinde."),
    ], start=19),
    still("s21", [
        K("It wrote three files while I blinked. It was a long blink.", "Ben göz kırparken üç dosya yazdı. Uzun bir göz kırpmaydı."),
    ], pose="hammock-sleeping-robot-typing__office-night__3x2.png", motion="pan_left"),
    clip("r01", "v_timer.mp4", [
        N("Before adding anything, open the folder in your editor and look at what it wrote.",
          "Bir şey eklemeden önce klasörü editöründe aç ve ne yazdığına bak."),
        N("When you press start, it saves the exact moment the session should end. Time left is that moment minus now.",
          "Başlat'a bastığında seansın biteceği tam anı kaydediyor. Kalan süre, o an eksi şimdi."),
    ], chapter="Read the code"),
    clip("r02", "v_tick.mp4", [
        N("A tick every quarter of a second only redraws the screen and checks if time is up.",
          "Her çeyrek saniyedeki tık sadece ekranı yeniden çiziyor ve sürenin dolup dolmadığına bakıyor."),
        N("So if the browser slows the tab down, the clock is still right.",
          "Yani tarayıcı sekmeyi yavaşlatsa bile saat doğru kalıyor."),
    ]),
    clip("r03", "v_load.mp4", [
        N("Loading from localStorage checks every field, so broken saved data can't crash the app.",
          "localStorage'dan yükleme her alanı kontrol ediyor, böylece bozuk kayıtlı veri uygulamayı çökertemiyor."),
    ]),
    clip("r04", "v_claudemd.mp4", [
        N("You don't have to understand every line. But reading the main parts once is how you catch surprises early.",
          "Her satırı anlamak zorunda değilsin. Ama ana kısımları bir kez okumak sürprizleri erken yakalamanın yolu."),
    ]),
    clip("s22", "c_stats_prompt.mp4", [
        N("Now a second request, in plain English: a stats bar with pomodoros today and focus minutes today, reset at midnight.",
          "Şimdi ikinci istek, düz İngilizceyle: bugünkü pomodorolar ve bugünkü odak dakikaları olan, gece yarısı sıfırlanan bir istatistik çubuğu."),
    ], chapter="Add a feature"),
    clip("s23", "c_stats_work.mp4", [
        N("No plan mode this time, because it's a small change. Claude edits all three files.",
          "Bu sefer plan modu yok, çünkü küçük bir değişiklik. Claude üç dosyayı da düzenliyor."),
        N("This part is twice the real speed.", "Bu kısım gerçek hızın iki katı."),
    ]),
    clip("s24", "c_stats_done.mp4", [
        N("And it tells you straight what it didn't test: the midnight reset was never checked in a browser.",
          "Ve neyi test etmediğini açıkça söylüyor: gece yarısı sıfırlaması tarayıcıda hiç denenmedi."),
        N("That honesty is useful. Test the parts it says it didn't.",
          "Bu dürüstlük işe yarar. Test etmediğini söylediği kısımları sen test et."),
    ], start=1),
    clip("s25", "app-desktop.webm", [
        N("And there it is at the top: one pomodoro today.", "İşte en üstte: bugün bir pomodoro."),
    ], start=24),
    clip("s26", "c_init.mp4", [
        N("Next, slash init. Claude reads the project and writes a CLAUDE dot md file.",
          "Sırada eğik çizgi init var. Claude projeyi okuyup bir CLAUDE nokta md dosyası yazıyor."),
        N("It's a short guide: how to run the app, what not to break, and how the code fits together.",
          "Kısa bir rehber: uygulama nasıl çalıştırılır, neyi bozmamalı ve kod nasıl bir araya geliyor."),
        N("Every new Claude Code session in this folder reads it first.",
          "Bu klasördeki her yeni Claude Code oturumu önce onu okur."),
    ], chapter="CLAUDE.md and git"),
    clip("s27", "c_git.mp4", [
        N("The last request: initialize git and commit everything with a clear message.",
          "Son istek: git'i başlat ve her şeyi açık bir mesajla commit et."),
        N("One commit, four files, and nothing pushed anywhere without asking.",
          "Bir commit, dört dosya ve sormadan hiçbir yere push yok."),
    ], start=2),
    clip("t01", "d_ask.mp4", [
        N("Now close it and come back later. A new session starts fresh, but it reads CLAUDE dot md first.",
          "Şimdi kapat ve sonra geri dön. Yeni oturum sıfırdan başlar ama önce CLAUDE nokta md'yi okur."),
        N("Type the at sign to point at a file. We asked how the timer stays accurate in a background tab.",
          "Bir dosyayı göstermek için et işaretini yaz. Zamanlayıcının arka plan sekmesinde nasıl doğru kaldığını sorduk."),
        N("It answers with line numbers, and it even admits one limit: the chime can come late while the tab is hidden.",
          "Satır numaralarıyla cevap veriyor, hatta bir sınırı da kabul ediyor: sekme gizliyken zil geç çalabilir."),
    ], start=1, chapter="Session two: ask, fix, undo"),
    clip("t02", "d_review.mp4", [
        N("Next, the most useful prompt for beginners: review the code for real bugs, and fix the most important one.",
          "Sırada yeni başlayanlar için en faydalı prompt: kodu gerçek hatalar için incele ve en önemlisini düzelt."),
    ]),
    clip("t03", "d_review_done.mp4", [
        N("And it found one. With the app open in two tabs, the older tab's next save wiped out changes from the newer one.",
          "Ve bir tane buldu. Uygulama iki sekmede açıkken, eski sekmenin bir sonraki kaydı yeni sekmedeki değişiklikleri siliyordu."),
        N("The fix listens for storage changes from other tabs. Seven lines. And again, it tells you it hasn't tried two tabs yet.",
          "Düzeltme diğer sekmelerden gelen depolama değişikliklerini dinliyor. Yedi satır. Ve yine, iki sekmeyi henüz denemediğini söylüyor."),
    ], start=1),
    still("t04", [
        K("A bug I didn't know about, fixed before I knew about it. That's my kind of bug.",
          "Varlığından haberim olmayan bir hata, haberim olmadan düzeldi. Tam benim tarzım bir hata."),
    ], pose="pointing-at-robot-note-smug__office__3x2.png", motion="zoom_out"),
    clip("t05", "d_esc.mp4", [
        N("Now a mistake on purpose. We asked for a whole settings panel: lengths, themes, sounds.",
          "Şimdi bilerek bir hata. Koca bir ayarlar paneli istedik: süreler, temalar, sesler."),
        N("Too much. Press Escape, and it stops right away and asks what to do instead.",
          "Fazla. Escape'e bas, hemen duruyor ve onun yerine ne yapacağını soruyor."),
    ], start=3),
    clip("t06", "d_simple.mp4", [
        N("So we narrowed it down: just a fifty ten preset button next to the tabs.",
          "Biz de daralttık: sekmelerin yanına sadece elli on hazır ayar düğmesi."),
        N("It changes the code, updates CLAUDE dot md, and says what it didn't test.",
          "Kodu değiştiriyor, CLAUDE nokta md'yi güncelliyor ve neyi test etmediğini söylüyor."),
    ]),
    clip("t07", "app-preset.webm", [
        N("We checked it in the browser. One click, and the focus session is fifty minutes.",
          "Tarayıcıda kontrol ettik. Bir tık ve odak seansı elli dakika."),
    ], start=4),
    clip("t08", "d_rewind.mp4", [
        N("And if you don't like a change, press Escape twice. That opens Rewind.",
          "Bir değişikliği beğenmezsen, iki kez Escape'e bas. Bu Rewind'ı açar."),
        N("Pick an earlier message, and it restores the code, the conversation, or both. We kept the current version.",
          "Daha önceki bir mesajı seç, kodu, konuşmayı ya da ikisini geri yükler. Biz mevcut sürümü tuttuk."),
    ], start=2),
    clip("t09", "d_commit2.mp4", [
        N("One more commit. It split the work into two: the bug fix, and the preset button.",
          "Bir commit daha. İşi ikiye böldü: hata düzeltmesi ve hazır ayar düğmesi."),
    ], start=1),
    still("s28", [
        N("Five tips from the official best practices. One, give Claude a way to check its own work.",
          "Resmi en iyi uygulamalardan beş ipucu. Bir, Claude'a kendi işini kontrol etmenin bir yolunu ver."),
        N("Here that was the fast mode and a syntax check. In a bigger project, it's tests.",
          "Burada bu hızlı mod ve sözdizimi kontrolüydü. Daha büyük bir projede testler."),
        N("Two, plan first, then code. The plan is where you catch a wrong idea for free.",
          "İki, önce planla, sonra kodla. Yanlış bir fikri bedavaya yakaladığın yer plan."),
        N("Three, be specific, and point at files with the at sign. Small, clear requests beat one giant wish.",
          "Üç, net ol ve dosyaları et işaretiyle göster. Küçük, net istekler tek bir dev dilekten iyidir."),
        N("Four, keep CLAUDE dot md short. And five, Escape stops it anytime, while Escape twice rewinds.",
          "Dört, CLAUDE nokta md'yi kısa tut. Ve beş, Escape onu her an durdurur, iki kez Escape geri sarar."),
    ], motion="static", chapter="Five tips and the verdict"),
    still("s29", [
        K("My verdict? It planned, built, tested what it could, and committed.",
          "Kararım mı? Planladı, inşa etti, yapabildiğini test etti ve commit etti."),
        K("I pressed Enter. [pause] Ten out of ten, for me.", "Ben Enter'a bastım. [pause] Benim için on üzerinden on."),
        N("Next time, Opus 5.5 gets a much bigger project.", "Bir dahaki sefere Opus 5.5 çok daha büyük bir proje alacak."),
    ], pose="lying-on-floor-thumbs-up__office-floor__2x3.png"),
    clip("s30", "app-desktop.webm", [], start=9, min_duration=20),
]

# s04, s05, s28 are info cards from make_cards.py (run it after this script)

ep = json.loads((EP / "episode.json").read_text(encoding="utf-8"))
ep.update({
    "status": "images",
    "real_fact": "Real Claude Code 2.1.283 session on Windows, 2026-09-27: Opus 5.5 planned (~80 s) and built a 3-file Focus Timer "
                 "(~130 s), added daily stats (~70 s), /init wrote CLAUDE.md, git commit c51582b (C:/kaxo-demo/focus-timer, "
                 "work/tests/claude-code-tutorial/plan.md)",
    "shots": shots,
})
(EP / "episode.json").write_text(json.dumps(ep, ensure_ascii=False, indent=2), encoding="utf-8")

md = ["# Claude Code + Opus 5.5 from zero (tutorial)", "", "| Shot | Visual | Who | Line |", "|---|---|---|---|"]
for s in shots:
    vis = s.get("clip") or s.get("pose") or f"images/{s['id']}.png"
    if s.get("chapter"):
        md.append(f"| **{s['chapter']}** | | | |")
    for ln in s["lines"] or [{"speaker": "-", "text": "(end screen, quiet)"}]:
        md.append(f"| {s['id']} | {vis} | {ln['speaker']} | {ln['text']} |")
(EP / "script.md").write_text("\n".join(md) + "\n", encoding="utf-8")
words = sum(len(ln["text"].split()) for s in shots for ln in s["lines"])
print(len(shots), "shots,", words, "words, ~", round(words / 2.5 / 60, 1), "min")
