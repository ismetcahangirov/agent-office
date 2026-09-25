// Renders a KAXO thumbnail from a JSON spec with HTML + headless Chromium (text is real type, never AI-drawn).
// Usage: node tools/video/thumbnail.js <spec.json> [out.png]
//
// spec (paths relative to the spec file):
// {
//   "format": "16x9",                     // or "9x16" (Shorts / TikTok cover)
//   "line1": "FIVE EMPLOYEES",            // white, top
//   "line2": "ZERO HUMANS",               // yellow, bottom
//   "mascot": "mascot.png",               // transparent cut-out (tools/video/cutout.py)
//   "glow": "#19d3ff",                    // coloured rim light around the mascot
//   "background": null,                   // optional topic image, darkened behind everything
//   "elements": [ { "src": "logo.svg", "x": 0.60, "y": 0.62, "w": 0.13, "rotate": -8, "glow": "#ff7a45" } ],
//   "mascot_scale": 1.12, "mascot_x": 0.0, "mascot_y": 0.08   // fine-tuning (fractions of height)
// }
// Also writes <out>-small.png (320 px wide) to check readability at feed size.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const FONT = path.join(__dirname, 'fonts', 'Anton-Regular.ttf');
const url = (p) => 'file:///' + path.resolve(p).replace(/\\/g, '/');

function html(spec, base) {
  const vertical = spec.format === '9x16';
  const [W, H] = vertical ? [1080, 1920] : [1280, 720];
  const glow = spec.glow || '#19d3ff';
  const rel = (p) => url(path.join(base, p));
  const els = (spec.elements || []).map((e) => `
    <img class="el" src="${rel(e.src)}" style="left:${e.x * 100}%;top:${e.y * 100}%;width:${e.w * 100}%;
      transform:translate(-50%,-50%) rotate(${e.rotate || 0}deg);
      filter:drop-shadow(0 0 ${vertical ? 30 : 18}px ${e.glow || glow}) drop-shadow(0 6px 10px #000c);">`).join('');
  const mScale = spec.mascot_scale || 1.12;
  const mx = spec.mascot_x || 0;
  const my = spec.mascot_y ?? 0.08;

  // 16:9 -> text left, mascot right. 9:16 -> text top, mascot bottom.
  const layout = vertical ? `
    .text { left: 6%; right: 6%; top: 6%; height: 32%; align-items: center; }
    .mascot { height: ${62 * mScale}%; left: 50%; bottom: ${-my * 100}%; transform: translateX(calc(-50% + ${mx * 100}%)); }
    .halo { left: 50%; top: 68%; width: 110%; height: 60%; }
  ` : `
    .text { left: 4.5%; top: 9%; bottom: 9%; width: 55%; }
    .mascot { height: ${100 * mScale}%; right: ${2 - mx * 100}%; bottom: ${-my * 100}%; }
    .halo { left: 76%; top: 52%; width: 62%; height: 120%; }
  `;

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: Anton; src: url('${url(FONT)}'); }
    * { margin: 0; box-sizing: border-box; }
    body { width: ${W}px; height: ${H}px; overflow: hidden; background: #050505; position: relative; font-family: Anton, Impact, sans-serif; }
    .bg { position: absolute; inset: 0; background: ${spec.background ? `url('${rel(spec.background)}') center/cover` : 'none'};
          filter: brightness(.33) saturate(.8) blur(2px); }
    .vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at 40% 50%, transparent 35%, #000 100%); }
    .halo { position: absolute; transform: translate(-50%, -50%); border-radius: 50%;
            background: radial-gradient(closest-side, ${glow}55, ${glow}22 45%, transparent 75%); }
    .mascot { position: absolute; filter: drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 22px ${glow}aa) drop-shadow(0 0 60px ${glow}66); }
    .text { position: absolute; display: flex; flex-direction: column; justify-content: center; }
    .line { display: block; white-space: nowrap; line-height: .98; text-transform: uppercase; letter-spacing: .5px;
            text-shadow: 0 5px 0 #000, 0 0 24px #000c; }
    .l1 { color: #ffffff; }
    .l2 { color: #ffd21f; }
    .el { position: absolute; }
    ${layout}
  </style></head><body>
    <div class="bg"></div><div class="vignette"></div>
    <div class="halo"></div>
    <img class="mascot" src="${rel(spec.mascot)}">
    ${els}
    <div class="text"><span class="line l1">${spec.line1 || ''}</span><span class="line l2">${spec.line2 || ''}</span></div>
    <script>
      // each line grows until it fills the text column (capped so one short word is not absurd)
      document.fonts.ready.then(() => {
        const box = document.querySelector('.text');
        const maxW = box.clientWidth, maxLine = ${vertical ? 0.17 : 0.34} * ${H};
        for (const el of document.querySelectorAll('.line')) {
          let lo = 10, hi = maxLine;
          while (hi - lo > 1) { const mid = (lo + hi) / 2; el.style.fontSize = mid + 'px'; (el.scrollWidth <= maxW ? lo = mid : hi = mid); }
          el.style.fontSize = lo + 'px';
        }
        document.body.dataset.ready = '1';
      });
    </script>
  </body></html>`;
}

(async () => {
  const specPath = path.resolve(process.argv[2]);
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const base = path.dirname(specPath);
  const out = path.resolve(process.argv[3] || path.join(base, 'thumbnail.png'));
  const vertical = spec.format === '9x16';
  const viewport = vertical ? { width: 1080, height: 1920 } : { width: 1280, height: 720 };

  const tmp = path.join(base, '.thumbnail.html');
  fs.writeFileSync(tmp, html(spec, base));
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport });
  await page.goto(url(tmp));
  await page.waitForSelector('body[data-ready="1"]', { timeout: 15000 });
  await page.waitForTimeout(200);
  await page.screenshot({ path: out });
  // feed-size preview for the readability check
  await page.setViewportSize(viewport);
  const small = out.replace(/\.png$/i, '-small.png');
  await page.evaluate(([w]) => { document.body.style.zoom = String(320 / w); }, [viewport.width]);
  await page.setViewportSize({ width: 320, height: Math.round(viewport.height * 320 / viewport.width) });
  await page.screenshot({ path: small });
  await browser.close();
  fs.unlinkSync(tmp);
  console.log(`${out}\n${small}`);
})();
