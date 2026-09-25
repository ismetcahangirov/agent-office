#!/usr/bin/env node
// Claude Code hook -> Agent Office server.
// Reads the hook payload from stdin, compacts it and POSTs it to the local server.
// Must never block or fail the Claude session: short timeout, always exit 0.
const http = require('http');
const path = require('path');

const PORT = Number(process.env.AGENT_OFFICE_PORT || 4317);

function clip(s, n) {
  if (s == null) return '';
  s = String(s).replace(/\s+/g, ' ').trim();
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function detailOf(tool, input) {
  input = input || {};
  switch (tool) {
    case 'Read':
    case 'Edit':
    case 'Write':
    case 'NotebookEdit':
      return path.basename(String(input.file_path || input.notebook_path || ''));
    case 'Grep':
    case 'Glob':
      return clip(input.pattern, 50);
    case 'Bash':
    case 'PowerShell':
      return clip(input.description || input.command, 70);
    case 'WebSearch':
      return clip(input.query, 70);
    case 'WebFetch':
      try { return new URL(input.url).host; } catch { return clip(input.url, 50); }
    case 'Agent':
    case 'Task':
      return clip(input.description, 70);
    case 'SendMessage':
      return clip(input.to, 40);
    default:
      return '';
  }
}

function compact(p) {
  const tool = p.tool_name || '';
  const input = p.tool_input || {};
  const ev = {
    t: Date.now(),
    event: p.hook_event_name,
    session: p.session_id,
    agentId: p.agent_id || null,
    agentType: p.agent_type || null,
    tool,
    detail: detailOf(tool, input),
  };
  if (tool === 'Agent' || tool === 'Task') ev.subagentType = input.subagent_type || 'general-purpose';
  if (p.hook_event_name === 'UserPromptSubmit') ev.detail = clip(p.prompt, 90);
  if (p.hook_event_name === 'Stop' || p.hook_event_name === 'SubagentStop') {
    ev.detail = clip(String(p.last_assistant_message || '').replace(/[`*#>]/g, ''), 90);
  }
  if (p.hook_event_name === 'PostToolUseFailure') ev.detail = clip(p.error || ev.detail, 90);
  return ev;
}

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (d) => (raw += d));
process.stdin.on('end', () => {
  let body;
  try { body = JSON.stringify(compact(JSON.parse(raw))); } catch { process.exit(0); }
  const req = http.request(
    { host: '127.0.0.1', port: PORT, path: '/event', method: 'POST', timeout: 800,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
    (res) => { res.resume(); res.on('end', () => process.exit(0)); }
  );
  req.on('error', () => process.exit(0));
  req.on('timeout', () => { req.destroy(); process.exit(0); });
  req.end(body);
});
setTimeout(() => process.exit(0), 1500).unref();
