// Renders the KAXO channel logo (800x800) and banner (2560x1440, content inside the 1546x423 safe area).
// Usage: node tools/brand/render.js   -> content/assets/brand/logo.png, banner.png, banner-safe-preview.png
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const u = (p) => 'file:///' + path.join(root, p).replace(/\\/g, '/');
const FONT = u('tools/video/fonts/Anton-Regular.ttf');
const KAXO = u('content/character/poses/cutout-holding-zero-sign__none__waist-up.png');
const out = path.join(root, 'content/assets/brand');
fs.mkdirSync(out, { recursive: true });

const base = `@font-face{font-family:Anton;src:url(${FONT})}*{margin:0;box-sizing:border-box}body{background:#000;overflow:hidden}`;

// Logo: KAXO's face, cropped from the waist-up cut-out, on a black disc with a green rim glow.
const logo = `<style>${base}
.c{width:800px;height:800px;position:relative;background:radial-gradient(circle at 50% 55%,#12301c 0,#050806 62%,#000 100%);overflow:hidden}
.w{position:absolute;inset:0;filter:drop-shadow(0 0 14px #3ddc97) drop-shadow(0 0 34px rgba(61,220,151,.55))}
.k{position:absolute;width:690px;left:22px;top:84px;clip-path:polygon(0 0,100% 0,100% 44%,68% 44%,68% 100%,0 100%)}
</style><div class="c"><div class="w"><img class="k" src="${KAXO}"></div></div>`;

// Banner: everything important sits in the centre 1546x423 (visible on every device).
const banner = `<style>${base}
.b{width:2560px;height:1440px;position:relative;background:
  radial-gradient(ellipse 900px 420px at 50% 50%,rgba(61,220,151,.16),transparent 70%),
  repeating-linear-gradient(90deg,rgba(255,255,255,.025) 0 2px,transparent 2px 80px),
  repeating-linear-gradient(0deg,rgba(255,255,255,.025) 0 2px,transparent 2px 80px),#07090b}
.safe{position:absolute;left:507px;top:508px;width:1546px;height:423px;display:flex;align-items:center;justify-content:center;gap:56px}
.k{height:520px;margin-top:40px;filter:drop-shadow(0 0 10px #3ddc97) drop-shadow(0 0 30px rgba(61,220,151,.5))}
.t{font-family:Anton;color:#fff;text-transform:uppercase;line-height:.92}
.t .name{font-size:190px;letter-spacing:4px}
.t .name span{color:#FFD21F}
.t .tag{font-size:62px;margin-top:14px}
.t .tag span{color:#FFD21F}
.t .sub{font-family:Arial,sans-serif;font-weight:700;font-size:34px;color:#9aa4b2;margin-top:18px;text-transform:none;letter-spacing:.5px}
</style><div class="b"><div class="safe">
<img class="k" src="${KAXO}">
<div class="t"><div class="name">KAXO</div>
<div class="tag">Every employee is an AI.<br><span>The boss does nothing.</span></div>
<div class="sub">Real AI agents. Real tests. Real numbers.</div></div>
</div></div>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 800, height: 800 } });
  const show = async (html) => {
    const f = path.join(out, '_tmp.html');
    fs.writeFileSync(f, html);
    await p.goto('file:///' + f.replace(/\\/g, '/'), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
  };
  await show(logo);
  await p.screenshot({ path: path.join(out, 'logo.png') });
  await p.setViewportSize({ width: 2560, height: 1440 });
  await show(banner);
  await p.screenshot({ path: path.join(out, 'banner.png') });
  await p.screenshot({ path: path.join(out, 'banner-safe-preview.png'), clip: { x: 507, y: 508, width: 1546, height: 423 } });
  await b.close();
  fs.unlinkSync(path.join(out, '_tmp.html'));
  console.log('written to', out);
})();
