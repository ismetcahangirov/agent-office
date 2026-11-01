// Renders the KAXO channel logo (800x800) and banner (2560x1440, content inside the 1546x423 safe area).
// The host is the human KAXO (content/character/reference.png); the old cactus brand is in content/archive/kaxo/brand/.
// Usage: node tools/brand/render.js   -> content/assets/brand/logo.png, banner.png, banner-safe-preview.png
// Cut-outs: work/brand/face.png (from reference.png) and work/brand/point.png (from expressions.png), made with tools/video/cutout.py.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const u = (p) => 'file:///' + path.join(root, p).replace(/\\/g, '/');
const FONT = u('tools/video/fonts/LilitaOne-Regular.ttf');
const FACE = u('work/brand/face.png');
const POINT = u('work/brand/point.png');
const out = path.join(root, 'content/assets/brand');
fs.mkdirSync(out, { recursive: true });

// Channel palette (RULES §5 graphics, THUMBNAILS.md).
const C = { cream: '#FFF6E5', ink: '#2B2118', tomato: '#FF4D2E', mustard: '#F2B33D', olive: '#6B7A3A' };
const base = `@font-face{font-family:Lilita;src:url(${FONT})}*{margin:0;box-sizing:border-box}body{background:${C.cream};overflow:hidden}`;

// Logo: KAXO's head and shoulders on a tomato disc (YouTube crops it to a circle).
const logo = `<style>${base}
.c{width:800px;height:800px;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 42%,#ff6a4f 0,${C.tomato} 55%,#e23c20 100%)}
.ring{position:absolute;inset:26px;border-radius:50%;border:14px solid ${C.mustard};opacity:.9}
.k{position:absolute;width:640px;left:92px;top:70px;filter:drop-shadow(0 10px 18px rgba(0,0,0,.25))}
</style><div class="c"><div class="ring"></div><img class="k" src="${FACE}"></div>`;

// Banner: everything important sits in the centre 1546x423 (visible on every device).
const dots = `radial-gradient(circle,rgba(43,33,24,.07) 3px,transparent 4px) 0 0/56px 56px`;
const banner = `<style>${base}
.b{width:2560px;height:1440px;position:relative;background:${dots},${C.cream}}
.band{position:absolute;left:0;right:0;top:540px;height:470px;background:${C.mustard};transform:skewY(-2deg)}
.safe{position:absolute;left:507px;top:508px;width:1546px;height:423px;display:flex;align-items:flex-end;gap:40px;padding-left:36px}
.k{height:430px;margin-bottom:-40px;-webkit-mask-image:linear-gradient(to bottom,#000 82%,transparent 100%);filter:drop-shadow(0 12px 18px rgba(0,0,0,.22))}
.t{padding-bottom:36px;color:${C.ink}}
.name{font-family:Lilita;font-size:170px;line-height:.9;letter-spacing:2px}
.name span{color:${C.tomato}}
.tag{font-family:Lilita;font-size:64px;line-height:1.05;margin-top:6px}
.tag span{color:#fff;-webkit-text-stroke:0;text-shadow:0 4px 0 ${C.ink}}
.sub{font-family:Arial,sans-serif;font-weight:700;font-size:32px;margin-top:16px;letter-spacing:.5px}
</style><div class="b"><div class="band"></div><div class="safe">
<img class="k" src="${POINT}">
<div class="t"><div class="name">KAX<span>O</span></div>
<div class="tag">Why is the world like this?<br><span>One curious question a week.</span></div>
<div class="sub">Food · Inventions · Prehistory · Animals · Your brain</div></div>
</div></div>`;

(async () => {
  // falls back to the installed Chrome when Playwright's own browser is missing
  const b = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
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
