// Agent Office — pixel office renderer. Canvas is 480x272 logical pixels, scaled by CSS.
(() => {
  const W = 480, H = 272;
  const WALL_H = 56;
  const CORRIDOR_Y = 150;
  const SPEED = 46; // px per second

  const canvas = document.getElementById('office');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const overlay = document.getElementById('overlay');

  const params = new URLSearchParams(location.search);
  if (params.has('clean')) document.body.classList.add('clean');

  // ---- language (?lang=en for English videos; Azerbaijani by default) -------
  const LANG = params.get('lang') === 'en' ? 'en' : 'az';
  const I18N = {
    az: {
      names: { ceo: 'CEO', researcher: 'Kəşfiyyatçı', builder: 'Qurucu', qa: 'QA', marketer: 'Marketoloq', intern: 'Stajor' },
      titles: { ceo: 'Baş agent', researcher: 'Araşdırma', builder: 'Kod və məhsul', qa: 'Yoxlama', marketer: 'Kontent və satış', intern: 'Digər tapşırıqlar' },
      status: { idle: 'boşdadır', working: 'işləyir', assigned: 'tapşırıq aldı', done: 'bitirdi', error: 'xəta' },
      verbs: { Read: 'oxuyur', Grep: 'axtarır', Glob: 'fayl axtarır', Edit: 'redaktə edir', Write: 'yazır', Bash: 'komanda işlədir',
        PowerShell: 'komanda işlədir', WebSearch: 'internetdə axtarır', WebFetch: 'sayta baxır', SendMessage: 'mesaj göndərir', TodoWrite: 'plan qurur' },
      stats: ['alət çağırışı', 'bitmiş tapşırıq', 'redaktə olunan fayl', 'web axtarış'],
      badge: { wait: 'GÖZLƏYİR', off: 'BAĞLANTI YOXDUR', live: '● CANLI', demo: 'DEMO' },
      ui: { sub: '0 kapitallı AI şirkəti · canlı', team: 'Komanda', feed: 'Canlı axın',
        empty: 'Hələ hadisə yoxdur. Bu qovluqda Claude Code sessiyası aç və ya <code>npm run demo</code> işlət.' },
      bubble: {
        arrive: () => 'Ofisə gəldim ☕', start: () => 'İşə başladım', prompt: (m) => '📥 ' + (m.detail || 'yeni tapşırıq'),
        delegate: (m, n) => `→ ${n(m.target)}: ${m.detail}`, assigned: (m) => '📋 ' + m.detail,
        done: (m) => '✅ ' + (m.detail || 'hazırdır'), error: (m) => '❌ ' + (m.detail || 'xəta'),
      },
      feed: {
        session: () => 'sessiyaya başladı', prompt: (m) => 'sahibdən tapşırıq aldı: ' + (m.detail || ''),
        delegate: (m, n) => `${n(m.target)}-a tapşırıq verdi: ${m.detail}`, start: () => 'işə başladı',
        taskdone: () => 'tapşırığı bitirdi', delivered: () => 'cavabı təhvil verdi', error: (m) => 'xəta: ' + m.detail,
      },
    },
    en: {
      names: { ceo: 'CEO', researcher: 'Researcher', builder: 'Builder', qa: 'QA', marketer: 'Marketer', intern: 'Intern' },
      titles: { ceo: 'Lead agent', researcher: 'Research', builder: 'Code & product', qa: 'Testing', marketer: 'Content & sales', intern: 'Everything else' },
      status: { idle: 'on break', working: 'working', assigned: 'got a task', done: 'done', error: 'error' },
      verbs: { Read: 'reading', Grep: 'searching', Glob: 'finding files', Edit: 'editing', Write: 'writing', Bash: 'running a command',
        PowerShell: 'running a command', WebSearch: 'searching the web', WebFetch: 'visiting', SendMessage: 'messaging', TodoWrite: 'planning' },
      stats: ['tool calls', 'tasks done', 'files edited', 'web searches'],
      badge: { wait: 'WAITING', off: 'OFFLINE', live: '● LIVE', demo: 'DEMO' },
      ui: { sub: 'a $0 AI company · live', team: 'Team', feed: 'Live feed',
        empty: 'No events yet. Start a Claude Code session in this folder or run <code>npm run demo</code>.' },
      bubble: {
        // English is the public/video mode: the owner's raw prompts are never shown
        arrive: () => 'Just got in ☕', start: () => 'On it', prompt: () => '📥 new task from the owner',
        delegate: (m, n) => `→ ${n(m.target)}: ${m.detail}`, assigned: (m) => '📋 ' + m.detail,
        done: (m) => '✅ ' + (m.detail || 'done'), error: (m) => '❌ ' + (m.detail || 'error'),
      },
      feed: {
        session: () => 'started a session', prompt: () => 'got a new task from the owner',
        delegate: (m, n) => `assigned ${n(m.target)}: ${m.detail}`, start: () => 'started working',
        taskdone: () => 'finished the task', delivered: () => 'delivered the answer', error: (m) => 'error: ' + m.detail,
      },
    },
  };
  const T = I18N[LANG];
  const nameOf = (id) => T.names[id] || id;
  function fmt(kind, m) {
    if (!m) return '';
    if (typeof m === 'string') return m; // entries written by an older server
    if (m.k === 'tool') {
      const verb = T.verbs[m.tool] || String(m.tool || '').replace(/^mcp__[^_]+__/, '');
      return m.detail ? (kind === 'feed' ? `${verb} — ${m.detail}` : `${verb}: ${m.detail}`) : verb;
    }
    const f = T[kind][m.k];
    return f ? f(m, nameOf) : '';
  }
  document.documentElement.lang = LANG;

  // ---- roles & layout ------------------------------------------------------
  const LOOK = {
    ceo:        { shirt: '#e6b450', dark: '#a87a22', hair: '#2b1d14', skin: '#f1c9a5', extra: 'tie' },
    researcher: { shirt: '#4fb3ff', dark: '#2474b5', hair: '#6b3f1f', skin: '#e8b48f', extra: 'glasses' },
    builder:    { shirt: '#ff7a45', dark: '#b8481c', hair: '#161616', skin: '#c98e68', extra: 'cap' },
    qa:         { shirt: '#7ee787', dark: '#3b9a45', hair: '#d9b25f', skin: '#f3d0b3', extra: 'glasses' },
    marketer:   { shirt: '#d58cff', dark: '#8e46bd', hair: '#b0352f', skin: '#e9bf9c', extra: 'headset' },
    intern:     { shirt: '#9aa4b2', dark: '#5d6675', hair: '#4a3222', skin: '#dcaa84', extra: '' },
  };
  const ORDER = ['ceo', 'researcher', 'builder', 'qa', 'marketer', 'intern'];

  const DESKS = {
    ceo:        { x: 72,  y: 106, w: 56 },
    researcher: { x: 168, y: 106, w: 44 },
    builder:    { x: 248, y: 106, w: 44 },
    qa:         { x: 328, y: 106, w: 44 },
    marketer:   { x: 168, y: 198, w: 44 },
    intern:     { x: 248, y: 198, w: 44 },
  };
  const LOUNGE = {
    ceo: { x: 356, y: 206 }, researcher: { x: 382, y: 214 }, builder: { x: 408, y: 206 },
    qa: { x: 434, y: 214 }, marketer: { x: 368, y: 234 }, intern: { x: 420, y: 236 },
  };
  const MEETING = {
    ceo: { x: 58, y: 206 }, researcher: { x: 86, y: 206 }, builder: { x: 58, y: 236 },
    qa: { x: 86, y: 236 }, marketer: { x: 44, y: 222 }, intern: { x: 100, y: 222 },
  };
  const RACK = { x: 452, y: 58 };

  // ---- state ---------------------------------------------------------------
  let snap = null;
  let clockSkew = 0;
  let connected = false;
  const chars = {};

  for (const id of ORDER) {
    const p = LOUNGE[id];
    chars[id] = { id, x: p.x, y: p.y, path: [], goal: 'lounge', pose: 'coffee', phase: Math.random() * 1000 };
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.style.setProperty('--c', LOOK[id].shirt);
    const bubble = document.createElement('div');
    bubble.className = 'bubble hidden';
    overlay.append(tag, bubble);
    chars[id].tag = tag;
    chars[id].bubble = bubble;
  }

  // ---- helpers -------------------------------------------------------------
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), w, h); };
  function hash(n) { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); }
  const agentOf = (id) => (snap && snap.agents[id]) || { status: 'idle', activity: 'coffee' };
  const now = () => Date.now() + clockSkew;
  // demo mode = recent demo events and no recent live ones
  const isDemo = () => !!snap && now() - snap.lastLiveAt > 60_000 && now() - snap.lastDemoAt < 60_000;

  function seatOf(id) { const d = DESKS[id]; return { x: d.x, y: d.y + 6 }; }
  function rackSpot(id) { const i = ORDER.indexOf(id); return { x: RACK.x - 20 - (i % 3) * 3, y: RACK.y + 50 + (i % 2) * 4 }; }

  function goalFor(id) {
    const a = agentOf(id);
    if (a.status === 'idle') return ['lounge', LOUNGE[id]];
    if (a.activity === 'run' && a.status === 'working') return ['rack', rackSpot(id)];
    if (a.activity === 'talk' && id !== 'ceo' && a.status === 'working') return ['meeting', MEETING[id]];
    return ['desk', seatOf(id)];
  }

  function routeTo(c, t) {
    if (Math.abs(c.x - t.x) < 1 && Math.abs(c.y - t.y) < 1) { c.path = []; return; }
    c.path = [{ x: c.x, y: CORRIDOR_Y }, { x: t.x, y: CORRIDOR_Y }, { x: t.x, y: t.y }];
  }

  // ---- scene ---------------------------------------------------------------
  function drawFloor() {
    for (let y = WALL_H; y < H; y += 8) {
      const row = (y - WALL_H) / 8;
      const off = (row % 2) * 24;
      R(0, y, W, 8, row % 2 ? '#7a5a40' : '#80603f');
      for (let x = -off; x < W; x += 48) {
        R(x, y, 1, 8, '#5e4430');
        if (hash(x * 3.1 + y) > 0.6) R(x + 10 + Math.floor(hash(x + y) * 20), y + 3, 6, 1, '#6d4f37');
      }
      R(0, y + 7, W, 1, '#664a34');
    }
  }

  function drawWall(t) {
    R(0, 0, W, WALL_H, '#2b3350');
    for (let x = 0; x < W; x += 16) R(x, 0, 1, WALL_H - 6, '#283049');
    R(0, WALL_H - 6, W, 6, '#1d2238');
    R(0, WALL_H - 7, W, 1, '#3c4670');

    // windows: sky follows the real clock
    const hr = new Date().getHours();
    const night = hr < 7 || hr >= 19;
    for (const wx of [196, 276]) {
      R(wx - 2, 8, 52, 34, '#c9d1e6');
      const g = ctx.createLinearGradient(0, 10, 0, 40);
      g.addColorStop(0, night ? '#0b1030' : '#6fb7ff');
      g.addColorStop(1, night ? '#243063' : '#bfe3ff');
      ctx.fillStyle = g;
      ctx.fillRect(wx, 10, 48, 30);
      if (night) {
        for (let i = 0; i < 6; i++) R(wx + 4 + hash(i + wx) * 40, 12 + hash(i * 7 + wx) * 16, 1, 1, '#fff');
      } else {
        const cx = wx + ((t / 400 + wx) % 70) - 10;
        R(cx, 17, 12, 3, '#fff'); R(cx + 3, 15, 6, 2, '#fff');
      }
      // skyline
      for (let i = 0; i < 8; i++) {
        const bh = 6 + Math.floor(hash(i * 13 + wx) * 12);
        R(wx + i * 6, 40 - bh, 5, bh, night ? '#141a3a' : '#7d95b8');
        if (night && hash(i + wx * 2) > 0.4) R(wx + i * 6 + 2, 40 - bh + 3, 1, 1, '#ffd86b');
      }
      R(wx + 23, 10, 2, 30, '#c9d1e6');
      R(wx - 3, 42, 54, 3, '#aab3cc');
    }

    // task board: one sticky note per finished task
    R(18, 8, 100, 38, '#8a6a47');
    R(20, 10, 96, 34, '#f4f1e8');
    const done = snap ? (isDemo() ? snap.demoStats : snap.stats).tasksDone : 0;
    const colors = ['#ffe066', '#8ce99a', '#74c0fc', '#ffa8a8', '#d0bfff'];
    for (let i = 0; i < Math.min(done, 30); i++) {
      const col = i % 10, row = Math.floor(i / 10);
      R(23 + col * 9, 13 + row * 10, 7, 7, colors[i % colors.length]);
      R(23 + col * 9, 13 + row * 10, 7, 1, '#0002');
    }
    R(20, 44, 96, 2, '#6b5236');

    // bookshelf
    R(128, 12, 28, 44, '#5c3d27');
    for (let s = 0; s < 3; s++) {
      R(130, 14 + s * 14, 24, 11, '#3e2818');
      for (let b = 0; b < 6; b++) {
        const bh = 7 + Math.floor(hash(s * 9 + b) * 4);
        R(131 + b * 4, 25 + s * 14 - bh, 3, bh, ['#c0392b', '#2e86de', '#27ae60', '#f1c40f', '#8e44ad', '#e67e22'][(s + b) % 6]);
      }
    }

    // wall clock with real time
    const d = new Date();
    const ccx = 372, ccy = 24;
    ctx.fillStyle = '#e9ecf5'; ctx.beginPath(); ctx.arc(ccx, ccy, 10, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1d2238'; ctx.lineWidth = 2; ctx.stroke();
    ctx.lineWidth = 1;
    const hand = (ang, len, col) => {
      ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(ccx, ccy);
      ctx.lineTo(ccx + Math.sin(ang) * len, ccy - Math.cos(ang) * len); ctx.stroke();
    };
    hand(((d.getHours() % 12) + d.getMinutes() / 60) / 12 * Math.PI * 2, 5, '#1d2238');
    hand(d.getMinutes() / 60 * Math.PI * 2, 8, '#1d2238');
    hand(d.getSeconds() / 60 * Math.PI * 2, 8, '#e74c3c');
  }

  function drawRack(t) {
    const busy = ORDER.some((id) => { const a = agentOf(id); return a.status === 'working' && a.activity === 'run'; });
    R(RACK.x - 16, RACK.y - 34, 30, 52, '#1b1e2b');
    R(RACK.x - 14, RACK.y - 32, 26, 48, '#2a2f44');
    for (let i = 0; i < 6; i++) {
      R(RACK.x - 12, RACK.y - 30 + i * 8, 22, 6, '#12141e');
      const rate = busy ? 90 : 700;
      const on = hash(i * 3 + Math.floor(t / rate)) > 0.45;
      R(RACK.x - 10, RACK.y - 28 + i * 8, 2, 2, on ? '#3ddc84' : '#1f4d33');
      R(RACK.x - 6, RACK.y - 28 + i * 8, 2, 2, busy && hash(i + Math.floor(t / 150)) > 0.5 ? '#f5b942' : '#4a3a14');
      R(RACK.x, RACK.y - 28 + i * 8, 8, 1, '#3a4060');
    }
    R(RACK.x - 16, RACK.y + 18, 30, 2, '#0006');
  }

  function drawMonitor(x, y, id, t) {
    const a = agentOf(id);
    const c = chars[id];
    const present = c.goal === 'desk' && c.path.length === 0;
    R(x + 5, y - 2, 4, 3, '#3a3f55');
    R(x - 1, y - 14, 16, 12, '#20243a');
    const sx = x + 1, sy = y - 12, sw = 12, sh = 8;
    if (!present) { R(sx, sy, sw, sh, '#0d0f19'); return; }
    const act = a.status === 'working' || a.status === 'assigned' ? a.activity : 'idle';
    if (act === 'type') {
      R(sx, sy, sw, sh, '#10162b');
      const scroll = Math.floor(t / 180);
      for (let i = 0; i < 4; i++) {
        const k = scroll + i;
        R(sx + 1 + (k % 3), sy + 1 + i * 2, 3 + Math.floor(hash(k) * 7), 1, ['#7ee787', '#79c0ff', '#ff7b72', '#d2a8ff'][k % 4]);
      }
    } else if (act === 'read') {
      R(sx, sy, sw, sh, '#e9edf5');
      for (let i = 0; i < 4; i++) R(sx + 2, sy + 1 + i * 2, 8 - (i % 2) * 3, 1, '#8a94ad');
    } else if (act === 'search') {
      R(sx, sy, sw, sh, '#1f6fd1');
      R(sx + 4, sy + 1, 4, 6, '#7fc4ff'); R(sx + 3, sy + 2, 6, 4, '#7fc4ff');
      R(sx + 5, sy + 2, 1, 4, '#3ddc84'); R(sx + 3, sy + 4, 6, 1, '#1f6fd1');
    } else if (act === 'talk') {
      R(sx, sy, sw, sh, '#e8f4ea');
      R(sx + 1, sy + 1, 6, 2, '#3ddc84'); R(sx + 5, sy + 4, 6, 2, '#79c0ff');
    } else if (a.status === 'error') {
      R(sx, sy, sw, sh, Math.floor(t / 300) % 2 ? '#7a1616' : '#b52020');
    } else {
      R(sx, sy, sw, sh, '#122033');
      if (Math.floor(t / 500) % 2) R(sx + 2, sy + 2, 1, 3, '#9fb3d9');
    }
  }

  function drawDesk(id, t) {
    const d = DESKS[id];
    const x0 = d.x - d.w / 2;
    R(x0, d.y, d.w, 7, id === 'ceo' ? '#7b4a2b' : '#9a6b43');
    R(x0, d.y + 7, d.w, 11, id === 'ceo' ? '#5e371e' : '#7a5232');
    R(x0, d.y, d.w, 1, id === 'ceo' ? '#9a643d' : '#b88657');
    R(x0 + 2, d.y + 18, 3, 3, '#3b2716'); R(x0 + d.w - 5, d.y + 18, 3, 3, '#3b2716');
    R(x0, d.y + 21, d.w, 2, '#0003');
    drawMonitor(x0 + 3, d.y + 3, id, t);
    // keyboard + mug
    R(d.x - 5, d.y + 2, 10, 3, '#2b2f40');
    R(x0 + d.w - 7, d.y + 1, 4, 4, '#f4f1e8'); R(x0 + d.w - 3, d.y + 2, 1, 2, '#f4f1e8');
    if (id === 'ceo') { R(x0 + d.w - 14, d.y + 2, 5, 3, '#e6b450'); }
    R(d.x - 5, d.y + 18, 10, 2, LOOK[id].dark); // colour strip on the desk front
  }

  function drawMeeting() {
    R(34, 196, 80, 52, '#3d5a80'); R(36, 198, 76, 48, '#4a6c96');
    for (let x = 38; x < 110; x += 6) R(x, 221, 3, 1, '#5d82b3');
    R(58, 214, 32, 12, '#8b5e3c'); R(58, 214, 32, 2, '#a8754d'); R(58, 226, 32, 2, '#5c3b24');
  }

  function drawLounge(t) {
    // sofa
    R(350, 248, 90, 16, '#7a3b5e'); R(350, 244, 90, 6, '#9b4f7a'); R(346, 246, 6, 18, '#6a3050'); R(438, 246, 6, 18, '#6a3050');
    R(352, 264, 88, 2, '#0004');
    // coffee counter
    R(452, 150, 24, 40, '#6b7280'); R(452, 150, 24, 3, '#9ca3af');
    R(456, 138, 14, 14, '#2d2f36'); R(458, 140, 10, 4, '#e74c3c'); R(461, 146, 4, 4, '#1a1a1a');
    const brewing = ORDER.some((id) => chars[id].goal === 'lounge' && chars[id].path.length === 0);
    if (brewing && Math.floor(t / 400) % 2) R(462, 134, 1, 3, '#ffffff88');
    // plants
    for (const [px, py] of [[8, 70], [470, 240], [8, 250]]) {
      R(px - 4, py, 9, 8, '#a0522d'); R(px - 3, py + 8, 7, 1, '#0004');
      R(px - 5, py - 7, 4, 7, '#2f9e44'); R(px, py - 10, 4, 10, '#40c057'); R(px + 3, py - 6, 4, 6, '#2b8a3e');
    }
  }

  // ---- characters ----------------------------------------------------------
  function drawChar(c, t) {
    const lk = LOOK[c.id];
    const a = agentOf(c.id);
    const x = Math.round(c.x), y = Math.round(c.y);
    const walking = c.path.length > 0;
    const step = walking ? Math.floor((t + c.phase) / 140) % 2 : 0;
    const bob = !walking && Math.floor((t + c.phase) / 900) % 2 ? 1 : 0;

    R(x - 5, y - 1, 10, 2, '#0005');
    // legs
    R(x - 3, y - 6 + (step ? 1 : 0), 2, 5 - (step ? 1 : 0), '#2d3142');
    R(x + 1, y - 6 + (step ? 0 : 1) * (walking ? 1 : 0), 2, walking && !step ? 4 : 5, '#2d3142');
    // torso
    const ty = y - 14 + bob;
    R(x - 4, ty, 8, 8, lk.shirt);
    R(x - 4, ty + 6, 8, 2, lk.dark);
    if (lk.extra === 'tie') { R(x, ty + 1, 1, 5, '#c0392b'); }
    // arms / hands by pose
    const typing = c.pose === 'desk' && a.status === 'working' && a.activity === 'type';
    const handY = typing ? ty + 5 + (Math.floor((t + c.phase) / 120) % 2) : ty + 5;
    R(x - 6, ty + 1, 2, 5, lk.shirt); R(x + 4, ty + 1, 2, 5, lk.shirt);
    R(x - 6, handY, 2, 2, lk.skin); R(x + 4, handY + (typing ? 1 - (Math.floor((t + c.phase) / 120) % 2) : 0), 2, 2, lk.skin);
    if (c.pose === 'coffee') { R(x + 5, ty + 3, 3, 3, '#f4f1e8'); R(x + 8, ty + 4, 1, 1, '#f4f1e8'); }
    if (c.pose === 'desk' && a.status === 'working' && a.activity === 'read') { R(x - 3, ty + 2, 6, 5, '#ffffff'); R(x - 2, ty + 3, 4, 1, '#9aa'); R(x - 2, ty + 5, 3, 1, '#9aa'); }
    if (c.pose === 'rack') { R(x - 6, ty - 2, 2, 3, lk.skin); R(x + 4, ty - 2, 2, 3, lk.skin); }
    // head
    const hy = ty - 7;
    R(x - 3, hy, 6, 7, lk.skin);
    R(x - 3, hy, 6, 2, lk.hair); R(x - 3, hy + 2, 1, 2, lk.hair); R(x + 2, hy + 2, 1, 2, lk.hair);
    if (lk.extra === 'cap') { R(x - 4, hy - 1, 8, 2, lk.dark); R(x + 3, hy, 3, 1, lk.dark); }
    if (lk.extra === 'headset') { R(x - 4, hy + 2, 1, 3, '#222'); R(x + 3, hy + 2, 1, 3, '#222'); R(x - 3, hy - 1, 6, 1, '#222'); }
    const blink = Math.floor((t + c.phase * 7) / 2600) % 12 === 0;
    if (!blink) { R(x - 2, hy + 3, 1, 1, '#1a1a1a'); R(x + 1, hy + 3, 1, 1, '#1a1a1a'); }
    if (lk.extra === 'glasses') { R(x - 3, hy + 3, 2, 1, '#44485c'); R(x + 1, hy + 3, 2, 1, '#44485c'); R(x - 1, hy + 3, 2, 1, '#44485c'); }
    R(x - 1, hy + 5, 2, 1, '#b5694c');

    // status marks above the head
    const my = hy - 7;
    if (a.status === 'error' && Math.floor(t / 250) % 2) { R(x - 1, my - 2, 2, 5, '#ff4d4d'); R(x - 1, my + 4, 2, 2, '#ff4d4d'); }
    else if (a.status === 'done') { R(x - 3, my + 2, 2, 2, '#3ddc84'); R(x - 1, my + 4, 2, 2, '#3ddc84'); R(x + 1, my + 2, 2, 2, '#3ddc84'); R(x + 3, my, 2, 2, '#3ddc84'); }
    else if (a.status === 'assigned') { R(x - 1, my - 2, 2, 5, '#f5b942'); R(x - 1, my + 4, 2, 2, '#f5b942'); }
    else if (a.status === 'working' && a.activity === 'think' && !walking) {
      for (let i = 0; i < 3; i++) R(x - 4 + i * 3, my + 3, 2, 2, Math.floor(t / 300) % 3 === i ? '#ffffff' : '#ffffff55');
    }
  }

  // ---- movement ------------------------------------------------------------
  function update(dt) {
    for (const id of ORDER) {
      const c = chars[id];
      const [goal, pos] = goalFor(id);
      if (goal !== c.goal || (c.path.length === 0 && (Math.abs(c.x - pos.x) > 1 || Math.abs(c.y - pos.y) > 1))) {
        c.goal = goal;
        routeTo(c, pos);
      }
      if (c.path.length) {
        const p = c.path[0];
        const dx = p.x - c.x, dy = p.y - c.y;
        const dist = Math.hypot(dx, dy);
        const mv = SPEED * dt;
        if (dist <= mv) { c.x = p.x; c.y = p.y; c.path.shift(); }
        else { c.x += (dx / dist) * mv; c.y += (dy / dist) * mv; }
        c.pose = 'walk';
      } else {
        c.pose = goal === 'lounge' ? 'coffee' : goal;
      }
    }
  }

  // ---- overlay (name tags + speech bubbles) ---------------------------------
  function placeOverlay() {
    const t = now();
    for (const id of ORDER) {
      const c = chars[id];
      const a = agentOf(id);
      c.tag.textContent = nameOf(id);
      c.tag.style.left = (c.x / W) * 100 + '%';
      c.tag.style.top = ((c.y + 2) / H) * 100 + '%';
      // sitting agents: tag goes below the desk
      if (c.pose === 'desk') c.tag.style.top = ((DESKS[id].y + 23) / H) * 100 + '%';

      const fresh = a.bubble && (t - a.bubbleAt < 9000 || a.status === 'working' || a.status === 'assigned');
      const show = fresh && a.status !== 'idle';
      const btext = fmt('bubble', a.bubble);
      if (c.bubble.textContent !== btext) c.bubble.textContent = btext;
      c.bubble.classList.toggle('hidden', !show);
      c.bubble.style.left = (c.x / W) * 100 + '%';
      c.bubble.style.top = ((c.y - 30) / H) * 100 + '%';
      c.bubble.style.zIndex = String(Math.round(c.y));
    }
  }

  // ---- frame ---------------------------------------------------------------
  let last = performance.now();
  function frame(ts) {
    const dt = Math.min(0.05, (ts - last) / 1000);
    last = ts;
    const t = Date.now();
    update(dt);

    drawFloor();
    drawWall(t);
    drawMeeting();
    drawLounge(t);

    // depth-sort desks, rack and characters by their base y
    const items = [];
    for (const id of ORDER) items.push({ y: DESKS[id].y + 18, draw: () => drawDesk(id, t) });
    items.push({ y: RACK.y + 18, draw: () => drawRack(t) });
    for (const id of ORDER) items.push({ y: chars[id].y, draw: () => drawChar(chars[id], t) });
    items.sort((p, q) => p.y - q.y);
    for (const it of items) it.draw();

    placeOverlay();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // ---- side panel ----------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const hhmmss = (t) => new Date(t).toLocaleTimeString('az-AZ', { hour12: false });

  function renderPanel() {
    if (!snap) return;
    const s = isDemo() ? snap.demoStats : snap.stats;
    $('stats').innerHTML = [
      [s.toolCalls, T.stats[0]], [s.tasksDone, T.stats[1]],
      [s.filesEdited, T.stats[2]], [s.searches, T.stats[3]],
    ].map(([v, l]) => `<div class="stat"><b>${v}</b><span>${l}</span></div>`).join('');

    $('team').innerHTML = ORDER.map((id) => {
      const a = snap.agents[id];
      return `<li style="--c:${LOOK[id].shirt}"><span class="dot"></span><span class="who">${esc(nameOf(id))} <small style="color:var(--muted)">· ${esc(T.titles[id])}</small></span><span class="st ${a.status}">${T.status[a.status] || a.status}</span></li>`;
    }).join('');

    $('feed').innerHTML = snap.feed.length
      ? snap.feed.map((f) => `<li style="--c:${LOOK[f.role].shirt}"><time>${hhmmss(f.t)}</time><span class="r">${esc(nameOf(f.role))}</span>${esc(fmt('feed', f.msg || f.text))}${f.demo ? '<span class="d">DEMO</span>' : ''}</li>`).join('')
      : `<li class="empty">${T.ui.empty}</li>`;
    renderBadge();
  }

  function renderBadge() {
    const b = $('badge');
    const t = now();
    let cls = 'wait';
    if (!connected) cls = 'off';
    else if (snap && t - snap.lastLiveAt < 60_000) cls = 'live';
    else if (snap && t - snap.lastDemoAt < 60_000) cls = 'demo';
    const txt = T.badge[cls];
    b.className = 'badge ' + cls;
    b.textContent = txt;
  }
  setInterval(renderBadge, 2000);
  for (const [id, key] of [['sub', 'sub'], ['h-team', 'team'], ['h-feed', 'feed']]) {
    const el = document.getElementById(id);
    if (el) el.textContent = T.ui[key];
  }

  // ---- live stream ---------------------------------------------------------
  function connect() {
    const es = new EventSource('/stream');
    es.onopen = () => { connected = true; renderBadge(); };
    es.onmessage = (m) => {
      snap = JSON.parse(m.data);
      clockSkew = snap.now - Date.now();
      renderPanel();
    };
    es.onerror = () => { connected = false; renderBadge(); };
  }
  connect();
})();
