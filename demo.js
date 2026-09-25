// Demo mode: plays a scripted workday so the office can be seen without running agents.
// Demo events are marked `demo: true`: they are not persisted and do not count in stats.
//
//   node demo.js                 scripted day, looping
//   node demo.js --once          scripted day, once
//   node demo.js --replay [file] [--speed N] [--from ISO] [--to ISO]
//                                replays REAL events from data/events.jsonl (for honest video footage)
const http = require('http');

const PORT = Number(process.env.AGENT_OFFICE_PORT || 4317);
const argv = process.argv.slice(2);
const opt = (name, dflt) => { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : dflt; };
const LOOP = !argv.includes('--once') && !argv.includes('--replay');

const S = (agentType, event, tool, detail, extra = {}) => ({ agentType, event, tool, detail, ...extra });

const SCRIPT = [
  [0, S(null, 'SessionStart')],
  [1.5, S(null, 'UserPromptSubmit', '', 'Bakıdakı kurs mərkəzləri üçün landing səhifə təklifi hazırla')],
  [2.5, S(null, 'PreToolUse', 'TodoWrite', '')],
  [2, S(null, 'PreToolUse', 'Agent', 'Kurs mərkəzləri bazarını araşdır', { subagentType: 'researcher' })],
  [1.5, S('researcher', 'SubagentStart')],
  [2, S('researcher', 'PreToolUse', 'WebSearch', 'Baku training centers website')],
  [3, S('researcher', 'PreToolUse', 'WebFetch', 'google.com/maps')],
  [3, S('researcher', 'PreToolUse', 'Read', 'leads.md')],
  [2.5, S('researcher', 'PreToolUse', 'Write', 'market-research.md')],
  [2.5, S('researcher', 'SubagentStop', '', '14 kurs mərkəzi tapıldı, 9-nun saytı yoxdur')],
  [2, S(null, 'PreToolUse', 'Agent', 'Demo landing səhifəni qur', { subagentType: 'builder' })],
  [0.5, S(null, 'PreToolUse', 'Agent', 'Təklif mesajını yaz', { subagentType: 'marketer' })],
  [1.5, S('builder', 'SubagentStart')],
  [0.5, S('marketer', 'SubagentStart')],
  [1.5, S('builder', 'PreToolUse', 'Read', 'market-research.md')],
  [1, S('marketer', 'PreToolUse', 'Read', 'market-research.md')],
  [2, S('builder', 'PreToolUse', 'Write', 'index.html')],
  [2, S('marketer', 'PreToolUse', 'Write', 'outreach-message.md')],
  [2, S('builder', 'PreToolUse', 'Edit', 'style.css')],
  [2.5, S('builder', 'PreToolUse', 'Bash', 'npm run build')],
  [4, S('marketer', 'PreToolUse', 'Edit', 'outreach-message.md')],
  [1.5, S('builder', 'PreToolUse', 'Edit', 'index.html')],
  [2, S('marketer', 'SubagentStop', '', 'WhatsApp və Instagram üçün 3 variant hazırdır')],
  [2, S('builder', 'SubagentStop', '', 'Landing hazırdır, mobil versiya daxil')],
  [2, S(null, 'PreToolUse', 'Agent', 'Landing səhifəni yoxla', { subagentType: 'qa' })],
  [1.5, S('qa', 'SubagentStart')],
  [2, S('qa', 'PreToolUse', 'Bash', 'Playwright ilə mobil ekran testi')],
  [4, S('qa', 'PostToolUseFailure', 'Bash', 'Mobil menyu 375px-də daşır')],
  [3, S('qa', 'PreToolUse', 'Edit', 'style.css')],
  [2, S('qa', 'PreToolUse', 'Bash', 'Testi təkrar işlət')],
  [4, S('qa', 'SubagentStop', '', 'Bütün yoxlamalar keçdi ✓')],
  [2, S(null, 'Stop', '', 'Təklif paketi hazırdır: araşdırma, demo sayt, mesaj mətnləri')],
  [12, null],
];

function post(ev) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ ...ev, t: Date.now(), demo: true, session: 'demo' });
    const req = http.request({ host: '127.0.0.1', port: PORT, path: '/event', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
      (res) => { res.resume(); resolve(true); });
    req.on('error', () => resolve(false));
    req.end(body);
  });
}

const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));

// Real events, original pacing divided by --speed; long idle gaps are capped at 3 s.
async function replay() {
  const fs = require('fs');
  const path = require('path');
  const file = opt('--replay', path.join(__dirname, 'data', 'events.jsonl'));
  const speed = Number(opt('--speed', 3));
  const from = Date.parse(opt('--from', '1970-01-01'));
  const to = Date.parse(opt('--to', '2999-01-01'));
  const events = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map((l) => JSON.parse(l))
    .filter((e) => e.t >= from && e.t <= to);
  console.log(`Replay: ${events.length} real events x${speed} -> http://localhost:${PORT}`);
  if (!(await post({ event: 'DemoReset' }))) { console.error('Server cavab vermir.'); process.exit(1); }
  await sleep(1.5);
  let prev = events.length ? events[0].t : 0;
  for (const e of events) {
    await sleep(Math.min((e.t - prev) / 1000 / speed, 3));
    prev = e.t;
    const { t, demo, session, ...rest } = e;
    if (!(await post(rest))) { console.error('Server cavab vermir.'); process.exit(1); }
  }
}

(async () => {
  if (argv.includes('--replay')) return replay();
  console.log(`Demo -> http://localhost:${PORT}  (Ctrl+C ilə dayandır)`);
  do {
    for (const [wait, ev] of SCRIPT) {
      await sleep(wait);
      if (!ev) continue;
      if (!(await post(ev))) {
        console.error('Server cavab vermir. Əvvəlcə `npm start` işlət.');
        process.exit(1);
      }
      console.log(`${ev.agentType || 'ceo'} · ${ev.event} ${ev.tool || ''} ${ev.detail || ''}`);
    }
  } while (LOOP);
})();
