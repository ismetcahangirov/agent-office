# Agent Office

Claude Code agentlərini 2D piksel ofisdə canlı göstərir. Agentlər real iş görür, ofis isə bu işin görüntüsüdür:
hər alət çağırışı personajın hərəkətinə çevrilir.

Asılılıq yoxdur, yalnız Node 18+ lazımdır.

## İşə salmaq

```bash
npm start          # server: http://localhost:4317
npm run demo       # (istəyə görə) ssenarili iş günü, agent işlətmədən baxmaq üçün
```

Sonra bu qovluqda Claude Code aç (`claude`) və tapşırıq ver. Əsas sessiya **CEO**-dur və işi
`researcher`, `builder`, `qa`, `marketer` agentlərinə paylayır (`CLAUDE.md`, `.claude/agents/`).

- `http://localhost:4317/?clean=1`: yalnız ofis, paneli olmayan rejim. Ekran yazısı və video üçündür.
- Nişan: **● CANLI** son 60 saniyədə real hadisə olub, **DEMO** demo işləyir, **GÖZLƏYİR** hadisə yoxdur.

## Necə işləyir

```
Claude Code hook-ları  →  hooks/emit.js  →  POST /event  →  server.js  →  SSE /stream  →  public/office.js (canvas)
```

| Agentin hərəkəti | Ofisdə |
|---|---|
| `Edit` / `Write` | masada yazır, ekranda kod axır |
| `Read` / `Grep` / `Glob` | sənəd oxuyur |
| `WebSearch` / `WebFetch` / MCP | ekranda internet |
| `Bash` / `PowerShell` | server otağına gedir |
| `Agent` (tapşırıq vermək) | CEO danışır, işçinin başında sarı `!` görünür |
| `SendMessage` | görüş masasına gedir |
| xəta (`PostToolUseFailure`) | qırmızı `!` |
| bitirib (`SubagentStop`) | yaşıl ✓, lövhəyə stiker, sonra qəhvəyə gedir |

Subagent rolu hook payload-dakı `agent_type`-dan təyin olunur. Tanınmayan tiplər (`Explore` → Kəşfiyyatçı,
`general-purpose` → Qurucu, qalanları → Stajor) `server.js`-dəki `TYPE_TO_ROLE` cədvəlindədir.

## Data

- Real hadisələr `data/events.jsonl`-a yazılır və server yenidən başlayanda statistika buradan bərpa olunur.
- Demo hadisələri yazılmır və ayrıca sayılır, ona görə real rəqəmlər təmiz qalır.
- `data/` lokal qalır (`.gitignore`). İçində prompt və komanda mətnləri var, paylaşmadan əvvəl bax.

## Hook-ların təsiri

Hook-lar yalnız bu qovluqda açılan sessiyalarda işləyir (`.claude/settings.json`). Server işləmirsə,
`emit.js` dərhal çıxır və Claude sessiyasını ləngitmir.
