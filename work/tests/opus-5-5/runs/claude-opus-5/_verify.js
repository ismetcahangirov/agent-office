const { chromium } = require('C:/Users/cahan/projects/agent-office/node_modules/playwright');

const CASES = {
  // ties: hour 22 and hour 21 both have 3 events -> earliest (21) must win.
  // tool counts: Alpha=2, then tie 1-1 between "" and "Zebra" -> "" first (ascending).
  tie: [
    '{"t":1790200800000,"event":"PreToolUse","session":"s1","tool":"Zebra","detail":""}',
    '',
    'not json at all',
    '{"t":1790200800001,"event":"PreToolUse","session":"s1","tool":"Alpha","detail":""}',
    '{"broken":',
    '{"t":1790197200000,"event":"PreToolUse","session":"s2","tool":"Alpha","detail":""}',
    '{"t":1790197200001,"event":"SubagentStart","session":"s2","agentType":"qa","tool":"","detail":""}',
    '{"t":1790197200002,"event":"Stop","session":"s2","tool":"","detail":""}',
    '{"t":1790200800002,"event":"PreToolUse","session":"s1","tool":"","detail":""}',
    '   ',
  ].join('\n'),
  empty: '',
  onlyJunk: 'hello\n[1,2,3]\nnull\n{oops}\n',
  crlf: '{"t":1790200800000,"event":"PreToolUse","session":"s1","tool":"Read","detail":""}\r\n\r\n{"t":1790200800001,"event":"Stop","session":"s1","tool":"","detail":""}\r\n',
};

const EXPECT = {
  tie:      { total: '6', calls: '4', sessions: '2', subagents: '1', hour: '21:00 UTC',
              rows: [['Alpha','2'],['','1'],['Zebra','1']] },
  empty:    { total: '0', calls: '0', sessions: '0', subagents: '0', hour: '—', rows: [] },
  onlyJunk: { total: '0', calls: '0', sessions: '0', subagents: '0', hour: '—', rows: [] },
  crlf:     { total: '2', calls: '1', sessions: '1', subagents: '0', hour: '22:00 UTC',
              rows: [['Read','1']] },
};

const read = page => page.evaluate(() => {
  const t = id => document.getElementById(id).textContent;
  return {
    total: t('total-events'), calls: t('tool-calls'), sessions: t('sessions'),
    subagents: t('subagents'), hour: t('busiest-hour'), kaxo: t('kaxo-productivity'),
    rows: [...document.querySelectorAll('#tools tbody tr')].map(tr =>
      [tr.getAttribute('data-tool'), tr.querySelector('td.count').textContent]),
    overflowY: document.body.scrollHeight > 720,
    overflowX: document.body.scrollWidth > 1280,
  };
});

(async () => {
  const browser = await chromium.launch();
  let pass = 0, fail = 0;

  // --- real data ---
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => m.type() === 'error' && errs.push(m.text()));
    await page.goto('http://127.0.0.1:8731/index.html', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.getElementById('total-events').textContent !== '–');
    const got = await read(page);
    console.log('[real]', JSON.stringify(got));
    console.log('[real] js errors:', errs.length ? errs : 'none');
    if (errs.length) fail++;
    await page.screenshot({ path: '_shot.png' });
    await page.close();
  }

  // --- synthetic cases (fetch intercepted) ---
  for (const [name, body] of Object.entries(CASES)) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.route('**/events.jsonl', r =>
      r.fulfill({ status: 200, contentType: 'application/x-ndjson', body }));
    await page.goto('http://127.0.0.1:8731/index.html', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.getElementById('total-events').textContent !== '–');
    const got = await read(page);
    const exp = EXPECT[name];
    const ok = ['total','calls','sessions','subagents','hour'].every(k => got[k] === exp[k])
      && JSON.stringify(got.rows) === JSON.stringify(exp.rows)
      && got.kaxo === '0%' && !got.overflowX && !got.overflowY && errs.length === 0;
    ok ? pass++ : fail++;
    console.log((ok ? 'PASS' : 'FAIL') + ' [' + name + ']', JSON.stringify(got),
      ok ? '' : '\n   expected ' + JSON.stringify(exp) + (errs.length ? '\n   errors ' + errs : ''));
    await page.close();
  }

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  await browser.close();
  process.exit(fail ? 1 : 0);
})();
