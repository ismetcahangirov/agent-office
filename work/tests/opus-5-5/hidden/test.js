// Hidden tests for the KAXO Office Dashboard task (the models never see this file).
// Usage: node work/tests/opus-5-5/hidden/test.js <run dir> [--shot out.png]
// Serves the run dir, loads index.html with the real events.jsonl and with a synthetic dataset
// (invalid lines, ties, other tools), compares every required element with the expected value.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../../../../node_modules/playwright'));

const dir = path.resolve(process.argv[2]);
const shotIdx = process.argv.indexOf('--shot');
const shot = shotIdx > 0 ? path.resolve(process.argv[shotIdx + 1]) : null;

function expected(text) {
  const ev = [];
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    try { const o = JSON.parse(line); if (o && typeof o === 'object' && !Array.isArray(o)) ev.push(o); } catch {}
  }
  const hours = new Array(24).fill(0);
  ev.forEach((e) => { hours[new Date(e.t).getUTCHours()]++; });
  const bh = hours.indexOf(Math.max(...hours));
  const tools = {};
  ev.filter((e) => e.event === 'PreToolUse').forEach((e) => { tools[e.tool] = (tools[e.tool] || 0) + 1; });
  const rows = Object.entries(tools).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  return {
    'total-events': String(ev.length),
    'tool-calls': String(ev.filter((e) => e.event === 'PreToolUse').length),
    sessions: String(new Set(ev.map((e) => e.session)).size),
    subagents: String(ev.filter((e) => e.event === 'SubagentStart').length),
    'busiest-hour': `${String(bh).padStart(2, '0')}:00 UTC`,
    'kaxo-productivity': '0%',
    rows,
  };
}

function synthetic() {
  // deterministic pseudo-random data with invalid lines and a tie on the busiest hour
  let s = 42;
  const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
  const tools = ['Read', 'Bash', 'Grep', 'WebFetch', 'Edit', 'Write', 'Agent'];
  const lines = [];
  const base = Date.UTC(2026, 8, 20, 0, 0, 0);
  for (let i = 0; i < 60; i++) {
    const hour = i < 20 ? 3 : i < 40 ? 14 : 3 + Math.floor(rnd() * 20);
    const kind = rnd();
    const event = kind < 0.6 ? 'PreToolUse' : kind < 0.7 ? 'SubagentStart' : kind < 0.85 ? 'Stop' : 'UserPromptSubmit';
    lines.push(JSON.stringify({ t: base + hour * 3600e3 + i * 1000, event, session: `s${i % 4}`, agentId: null, agentType: null,
      tool: event === 'PreToolUse' ? tools[Math.floor(rnd() * tools.length)] : '', detail: 'x' }));
  }
  lines.splice(10, 0, '{not json');
  lines.splice(30, 0, '');
  lines.push('   ');
  return lines.join('\n') + '\n';
}

function serve(root, data) {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const u = decodeURIComponent(req.url.split('?')[0]);
      if (u === '/events.jsonl') { res.writeHead(200, { 'content-type': 'application/x-ndjson' }); return res.end(data); }
      const f = path.join(root, u === '/' ? 'index.html' : u);
      if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'content-type': f.endsWith('.html') ? 'text/html' : 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    }).listen(0, () => resolve(srv));
  });
}

async function check(browser, data, label, shotPath) {
  const srv = await serve(dir, data);
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const external = [];
  const errors = [];
  page.on('request', (r) => { if (!r.url().startsWith(`http://localhost:${srv.address().port}`) && !r.url().startsWith('data:')) external.push(r.url()); });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`http://localhost:${srv.address().port}/`, { waitUntil: 'networkidle' }).catch((e) => errors.push(e.message));
  await page.waitForTimeout(800);
  const exp = expected(data);
  const results = [];
  for (const id of ['total-events', 'tool-calls', 'sessions', 'subagents', 'busiest-hour', 'kaxo-productivity']) {
    const got = await page.$eval(`#${id}`, (e) => e.textContent.trim()).catch(() => null);
    results.push({ name: `${label}: #${id}`, ok: got === exp[id], got, want: exp[id] });
  }
  const rows = await page.$$eval('#tools tbody tr', (trs) => trs.map((tr) => [tr.getAttribute('data-tool'), (tr.querySelector('td.count') || {}).textContent?.trim()])).catch(() => []);
  const want = exp.rows.map(([t, c]) => [t, String(c)]);
  results.push({ name: `${label}: #tools rows (order + counts)`, ok: JSON.stringify(rows) === JSON.stringify(want), got: rows, want });
  results.push({ name: `${label}: no external requests`, ok: external.length === 0, got: external });
  results.push({ name: `${label}: no JS errors`, ok: errors.length === 0, got: errors });
  if (shotPath) await page.screenshot({ path: shotPath });
  await page.close();
  srv.close();
  return results;
}

(async () => {
  if (!fs.existsSync(path.join(dir, 'index.html'))) {
    console.log(JSON.stringify({ passed: 0, total: 18, error: 'index.html missing' }));
    return;
  }
  const browser = await chromium.launch();
  const real = fs.readFileSync(path.join(__dirname, '../task/events.jsonl'), 'utf8');
  const results = [...await check(browser, real, 'real', shot), ...await check(browser, synthetic(), 'hidden')];
  await browser.close();
  const passed = results.filter((r) => r.ok).length;
  console.log(JSON.stringify({ passed, total: results.length, failed: results.filter((r) => !r.ok) }, null, 2));
})();
