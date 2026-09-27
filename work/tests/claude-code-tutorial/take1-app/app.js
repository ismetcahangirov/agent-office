(() => {
  'use strict';

  const FOCUS = 25 * 60;
  const BREAK = 5 * 60;
  const STORAGE_KEY = 'focusTimer.v1';
  const RING_CIRC = 2 * Math.PI * 54;

  const $ = (id) => document.getElementById(id);
  const els = {
    pill: $('modePill'),
    time: $('time'),
    ring: $('ringProgress'),
    currentTask: $('currentTask'),
    start: $('startBtn'),
    reset: $('resetBtn'),
    skip: $('skipBtn'),
    form: $('addForm'),
    input: $('taskInput'),
    list: $('taskList'),
    empty: $('emptyMsg'),
  };

  const duration = (mode) => (mode === 'focus' ? FOCUS : BREAK);

  // ---------- State ----------
  const defaults = () => ({
    mode: 'focus',
    remaining: FOCUS,
    endsAt: null,
    tasks: [],
    activeTaskId: null,
  });

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults();
      const s = { ...defaults(), ...JSON.parse(raw) };
      if (s.mode !== 'focus' && s.mode !== 'break') s.mode = 'focus';
      if (!Array.isArray(s.tasks)) s.tasks = [];
      s.tasks = s.tasks.filter((t) => t && typeof t.title === 'string' && t.id);
      if (typeof s.remaining !== 'number' || s.remaining < 0) s.remaining = duration(s.mode);
      if (typeof s.endsAt !== 'number') s.endsAt = null;
      if (!s.tasks.some((t) => t.id === s.activeTaskId)) s.activeTaskId = null;
      return s;
    } catch {
      return defaults();
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked; keep running in memory */
    }
  }

  const state = load();

  const isRunning = () => state.endsAt !== null;
  const secondsLeft = () =>
    isRunning() ? Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000)) : state.remaining;
  const activeTask = () => state.tasks.find((t) => t.id === state.activeTaskId) || null;

  // ---------- Timer ----------
  let ticker = null;

  function start() {
    requestNotifyPermission();
    unlockAudio();
    state.endsAt = Date.now() + state.remaining * 1000;
    save();
    startTicker();
    render();
  }

  function pause() {
    state.remaining = secondsLeft();
    state.endsAt = null;
    save();
    stopTicker();
    render();
  }

  function reset() {
    state.endsAt = null;
    state.remaining = duration(state.mode);
    save();
    stopTicker();
    render();
  }

  function switchMode(mode) {
    state.mode = mode;
    state.endsAt = null;
    state.remaining = duration(mode);
    stopTicker();
  }

  function completePhase({ silent = false } = {}) {
    const finished = state.mode;
    if (finished === 'focus') {
      const task = activeTask();
      if (task) task.pomodoros += 1;
    }
    switchMode(finished === 'focus' ? 'break' : 'focus');
    save();
    render();
    if (!silent) {
      beep();
      notify(finished === 'focus' ? 'Focus done. Take a 5 minute break.' : 'Break over. Back to focus.');
    }
  }

  function skip() {
    // Skipping never credits a pomodoro.
    switchMode(state.mode === 'focus' ? 'break' : 'focus');
    save();
    render();
  }

  function tick() {
    if (isRunning() && Date.now() >= state.endsAt) {
      completePhase();
      return;
    }
    renderTime();
  }

  function startTicker() {
    stopTicker();
    ticker = setInterval(tick, 250);
  }

  function stopTicker() {
    if (ticker) clearInterval(ticker);
    ticker = null;
  }

  // ---------- Sound & notifications ----------
  let audioCtx = null;

  function unlockAudio() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch {
      audioCtx = null;
    }
  }

  function beep() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    [0, 0.25, 0.5].forEach((offset, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = i === 2 ? 1046 : 880;
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.25, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.2);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.22);
    });
  }

  function requestNotifyPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }

  function notify(body) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    try {
      new Notification('Focus Timer', { body });
    } catch {
      /* some mobile browsers only allow notifications from a service worker */
    }
  }

  // ---------- Tasks ----------
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  function addTask(title) {
    const clean = title.trim();
    if (!clean) return;
    const task = { id: uid(), title: clean, pomodoros: 0, createdAt: Date.now() };
    state.tasks.push(task);
    if (!state.activeTaskId) state.activeTaskId = task.id;
    save();
    render();
  }

  function selectTask(id) {
    state.activeTaskId = id;
    save();
    render();
  }

  function deleteTask(id) {
    state.tasks = state.tasks.filter((t) => t.id !== id);
    if (state.activeTaskId === id) state.activeTaskId = null;
    save();
    render();
  }

  // ---------- Rendering ----------
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const modeLabel = () => (state.mode === 'focus' ? 'Focus' : 'Break');

  function renderTime() {
    const left = secondsLeft();
    els.time.textContent = fmt(left);
    const progress = 1 - left / duration(state.mode);
    els.ring.style.strokeDashoffset = String(RING_CIRC * (1 - progress));
    document.title = `${fmt(left)} · ${modeLabel()}`;
  }

  function renderTasks() {
    els.list.replaceChildren(
      ...state.tasks.map((task) => {
        const li = document.createElement('li');
        li.className = 'task' + (task.id === state.activeTaskId ? ' active' : '');

        const select = document.createElement('button');
        select.type = 'button';
        select.className = 'task-select';
        select.setAttribute('aria-pressed', String(task.id === state.activeTaskId));
        select.addEventListener('click', () => selectTask(task.id));

        const dot = document.createElement('span');
        dot.className = 'dot';
        const title = document.createElement('span');
        title.className = 'task-title';
        title.textContent = task.title;
        title.title = task.title;
        const count = document.createElement('span');
        count.className = 'task-count';
        count.textContent = `🍅 ${task.pomodoros}`;
        count.setAttribute('aria-label', `${task.pomodoros} pomodoros`);
        select.append(dot, title, count);

        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'task-delete';
        del.textContent = '×';
        del.setAttribute('aria-label', `Delete ${task.title}`);
        del.addEventListener('click', () => deleteTask(task.id));

        li.append(select, del);
        return li;
      })
    );
    els.empty.hidden = state.tasks.length > 0;
  }

  function render() {
    document.body.dataset.mode = state.mode;
    els.pill.textContent = modeLabel();
    els.start.textContent = isRunning() ? 'Pause' : secondsLeft() < duration(state.mode) ? 'Resume' : 'Start';
    els.skip.textContent = state.mode === 'focus' ? 'Skip to break' : 'Skip to focus';

    const task = activeTask();
    els.currentTask.textContent = task ? task.title : 'No task selected';
    els.currentTask.classList.toggle('has-task', !!task);

    renderTime();
    renderTasks();
  }

  // ---------- Events ----------
  els.ring.style.strokeDasharray = String(RING_CIRC);

  els.start.addEventListener('click', () => (isRunning() ? pause() : start()));
  els.reset.addEventListener('click', reset);
  els.skip.addEventListener('click', skip);

  els.form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(els.input.value);
    els.input.value = '';
    els.input.focus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || e.repeat) return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
    e.preventDefault();
    isRunning() ? pause() : start();
  });

  // Catch up immediately when a throttled background tab becomes visible.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tick();
  });

  // ---------- Boot ----------
  if (isRunning() && Date.now() >= state.endsAt) {
    // Phase ended while the page was closed: credit it once, next phase waits paused.
    completePhase({ silent: true });
  } else if (isRunning()) {
    startTicker();
  }
  render();
})();
