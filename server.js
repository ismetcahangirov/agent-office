// Agent Office server: receives Claude Code hook events, keeps office state,
// streams it to the browser over Server-Sent Events. No dependencies.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.AGENT_OFFICE_PORT || 4317);
const PUBLIC = path.join(__dirname, 'public');
const DATA = path.join(__dirname, 'data');
const LOG = path.join(DATA, 'events.jsonl');
const STALE_MS = 90_000; // working agent with no events for this long -> idle

fs.mkdirSync(DATA, { recursive: true });

// ---- roster ---------------------------------------------------------------
const ROLES = [
  { id: 'ceo', name: 'CEO', title: 'Baş agent' },
  { id: 'researcher', name: 'Kəşfiyyatçı', title: 'Araşdırma' },
  { id: 'builder', name: 'Qurucu', title: 'Kod və məhsul' },
  { id: 'qa', name: 'QA', title: 'Yoxlama' },
  { id: 'marketer', name: 'Marketoloq', title: 'Kontent və satış' },
  { id: 'intern', name: 'Stajor', title: 'Digər tapşırıqlar' },
];

const TYPE_TO_ROLE = {
  researcher: 'researcher', explore: 'researcher',
  builder: 'builder', 'general-purpose': 'builder',
  qa: 'qa', reviewer: 'qa', tester: 'qa',
  marketer: 'marketer', marketing: 'marketer',
  plan: 'ceo',
};

function roleOf(agentType) {
  if (!agentType) return 'ceo';
  const k = String(agentType).toLowerCase().split(':').pop();
  return TYPE_TO_ROLE[k] || 'intern';
}

function activityOf(tool) {
  switch (tool) {
    case 'Edit': case 'Write': case 'NotebookEdit': return 'type';
    case 'Read': case 'Grep': case 'Glob': case 'LSP': return 'read';
    case 'WebSearch': case 'WebFetch': return 'search';
    case 'Bash': case 'PowerShell': case 'Monitor': return 'run';
    case 'Agent': case 'Task': case 'SendMessage': return 'talk';
    default: return tool.startsWith('mcp__') ? 'search' : 'think';
  }
}


// ---- state ----------------------------------------------------------------
function freshAgents() {
  const a = {};
  for (const r of ROLES) {
    a[r.id] = { ...r, status: 'idle', activity: 'coffee', bubble: null, bubbleAt: 0, lastAt: 0, calls: 0 };
  }
  return a;
}

function freshStats() {
  return { toolCalls: 0, filesEdited: 0, searches: 0, tasksDone: 0, delegations: 0, errors: 0 };
}

const state = {
  agents: freshAgents(),
  stats: freshStats(),
  demoStats: freshStats(), // demo events are counted separately so real numbers stay honest
  feed: [],
  lastLiveAt: 0,
  lastDemoAt: 0,
  startedAt: Date.now(),
};
const editedFiles = { live: new Set(), demo: new Set() };

// Bubbles and feed entries are structured ({k, tool, detail, target}); the browser renders them
// in the viewer's language (?lang=en for English videos, Azerbaijani by default).
function say(agent, msg, t) {
  agent.bubble = msg;
  agent.bubbleAt = t;
}

function feed(role, msg, t, demo) {
  state.feed.unshift({ t, role, msg, demo: !!demo });
  if (state.feed.length > 120) state.feed.length = 120;
}

// Applies one event. `replay` = rebuilding stats from the log on startup.
function apply(ev, { replay = false } = {}) {
  const t = ev.t || Date.now();
  const demo = !!ev.demo;
  const st = demo ? state.demoStats : state.stats;
  const edited = demo ? editedFiles.demo : editedFiles.live;
  const role = roleOf(ev.agentType);
  const a = state.agents[role];
  const detail = ev.detail || '';
  if (!replay) {
    if (demo) state.lastDemoAt = Date.now(); else state.lastLiveAt = Date.now();
    a.lastAt = t;
  }

  switch (ev.event) {
    // sent by `demo.js --replay` first: demo counters and agents start clean,
    // so recorded footage shows only the replayed real events (no leftover scripted-demo numbers)
    case 'DemoReset':
      if (!replay && demo) {
        state.demoStats = freshStats();
        editedFiles.demo.clear();
        for (const x of Object.values(state.agents)) { x.status = 'idle'; x.activity = 'coffee'; x.bubble = null; }
        state.feed = state.feed.filter((f) => !f.demo);
      }
      break;

    case 'SessionStart':
      if (!replay) { a.status = 'idle'; a.activity = 'think'; say(a, { k: 'arrive' }, t); feed(role, { k: 'session' }, t, demo); }
      break;

    case 'UserPromptSubmit':
      if (!replay) {
        a.status = 'working'; a.activity = 'think';
        say(a, { k: 'prompt', detail }, t);
        feed(role, { k: 'prompt', detail }, t, demo);
      }
      break;

    case 'PreToolUse': {
      st.toolCalls++;
      if (ev.tool === 'Edit' || ev.tool === 'Write' || ev.tool === 'NotebookEdit') {
        if (detail && !edited.has(detail)) { edited.add(detail); st.filesEdited++; }
      }
      if (ev.tool === 'WebSearch' || ev.tool === 'WebFetch') st.searches++;
      if (ev.tool === 'Agent' || ev.tool === 'Task') {
        st.delegations++;
        const target = roleOf(ev.subagentType);
        if (!replay) {
          a.status = 'working'; a.activity = 'talk';
          say(a, { k: 'delegate', target, detail }, t);
          const b = state.agents[target];
          b.status = 'assigned'; b.activity = 'think'; b.lastAt = t;
          say(b, { k: 'assigned', detail }, t);
          feed(role, { k: 'delegate', target, detail }, t, demo);
        }
        break;
      }
      if (!replay) {
        a.status = 'working'; a.calls++;
        a.activity = activityOf(ev.tool);
        say(a, { k: 'tool', tool: ev.tool, detail }, t);
        feed(role, { k: 'tool', tool: ev.tool, detail }, t, demo);
      }
      break;
    }

    case 'PostToolUseFailure':
      st.errors++;
      if (!replay) { a.status = 'error'; say(a, { k: 'error', detail: detail || ev.tool }, t); feed(role, { k: 'error', detail: detail || ev.tool }, t, demo); }
      break;

    case 'SubagentStart':
      if (!replay) { a.status = 'working'; a.activity = 'think'; if (!a.bubble) say(a, { k: 'start' }, t); feed(role, { k: 'start' }, t, demo); }
      break;

    case 'SubagentStop':
      st.tasksDone++;
      if (!replay) { a.status = 'done'; a.activity = 'think'; say(a, { k: 'done', detail }, t); feed(role, { k: 'taskdone' }, t, demo); }
      break;

    case 'Stop':
      if (!replay) { a.status = 'done'; a.activity = 'think'; say(a, { k: 'done', detail }, t); feed(role, { k: 'delivered' }, t, demo); }
      break;
  }
}

// Rebuild cumulative stats from the persisted log (live events only).
if (fs.existsSync(LOG)) {
  for (const line of fs.readFileSync(LOG, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try { apply(JSON.parse(line), { replay: true }); } catch {}
  }
}

// Time-based transitions: done -> idle, stale working -> idle.
setInterval(() => {
  const now = Date.now();
  let changed = false;
  for (const a of Object.values(state.agents)) {
    if (a.status === 'done' && now - a.lastAt > 8_000) { a.status = 'idle'; a.activity = 'coffee'; changed = true; }
    else if ((a.status === 'working' || a.status === 'assigned' || a.status === 'error') && now - a.lastAt > STALE_MS) {
      a.status = 'idle'; a.activity = 'coffee'; changed = true;
    }
  }
  if (changed) broadcast();
}, 2_000);

// ---- http -----------------------------------------------------------------
const clients = new Set();

function snapshot() {
  return JSON.stringify({ ...state, now: Date.now(), feed: state.feed.slice(0, 40) });
}

function broadcast() {
  const msg = `data: ${snapshot()}\n\n`;
  for (const res of clients) res.write(msg);
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml' };

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');

  if (req.method === 'POST' && url.pathname === '/event') {
    let body = '';
    req.on('data', (d) => { body += d; if (body.length > 1e5) req.destroy(); });
    req.on('end', () => {
      try {
        const ev = JSON.parse(body);
        if (!ev.demo) fs.appendFile(LOG, JSON.stringify(ev) + '\n', () => {});
        apply(ev);
        broadcast();
        res.writeHead(204).end();
      } catch {
        res.writeHead(400).end();
      }
    });
    return;
  }

  if (url.pathname === '/stream') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(`data: ${snapshot()}\n\n`);
    clients.add(res);
    const ping = setInterval(() => res.write(': ping\n\n'), 20_000);
    req.on('close', () => { clearInterval(ping); clients.delete(res); });
    return;
  }

  if (url.pathname === '/state') {
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(snapshot());
    return;
  }

  const file = path.join(PUBLIC, url.pathname === '/' ? 'index.html' : path.normalize(url.pathname));
  if (!file.startsWith(PUBLIC)) return res.writeHead(403).end();
  fs.readFile(file, (err, buf) => {
    if (err) return res.writeHead(404).end('not found');
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' }).end(buf);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Agent Office: http://localhost:${PORT}`);
});
