# Claude Code + Opus 5.5 tutorial: facts (2026-09-27)

Status: IN PROGRESS. Local installed version: Claude Code 2.1.280.

## 3. Opus 5.5 (partial, from search snippets; to verify)
- Released 2026-09-22 (system card date). Source: https://www.anthropic.com/claude-opus-5-5 , https://www-cdn.anthropic.com/fc1b44717c85dc068bc6ba5024219938094694bd/Claude%20Opus%205.5%20System%20Card.pdf
- API: $4 / MTok input, $20 / MTok output; cache reads $0.20 / MTok (60% less than Opus 5). Source: https://www.anthropic.com/claude-opus-5-5 (search snippet, VERIFY)
- "Costs 40% less to run than Opus 5 on typical workloads." Same source.

Notes: WebFetch to claude.com / code.claude.com returned ECONNREFUSED at 2026-09-27.

## Claude Code faktları (claude-code-guide agenti, code.claude.com sənədləri, 2026-09-27)
- Quraşdırma: Windows PowerShell `irm https://claude.ai/install.ps1 | iex`; macOS/Linux `curl -fsSL https://claude.ai/install.sh | bash`; yoxlama `claude --version`. Windows-da Git for Windows tövsiyə olunur (yoxsa PowerShell-ə düşür). https://code.claude.com/docs/en/setup.md
- Giriş: ilk işə salmada brauzerlə; Pro/Max/Team/Enterprise və ya Console (API) hesabı lazımdır, pulsuz claude.ai planında Claude Code yoxdur. https://code.claude.com/docs/en/authentication.md
- Əsaslar: `/init` (CLAUDE.md), Shift+Tab rejimlər (default → auto → plan), Esc dayandırır, Esc Esc və ya `/rewind` checkpoint, `@fayl`, `/clear`, `/compact`, `/usage`, `/help`, `!` bash rejimi, `/memory`. https://code.claude.com/docs/en/commands.md , permission-modes.md
- Best practices: işi yoxlamaq üçün yol ver (test, skrinşot); əvvəl araşdır → plan → kod; konkret kontekst; CLAUDE.md qısa; böyük işdə əvvəlcə spec. https://code.claude.com/docs/en/best-practices.md
- **Diqqət:** agentin model hissəsi köhnə məlumat verdi ("Claude 3.5 Sonnet default", "opus = Opus 3"): işlədilmir. Model adı və default dəyər real `/model` ekranından götürülür (çəkiliş).
