// Records any web page as B-roll (a new model's announcement, a tool's landing page, a demo).
// Usage: node tools/video/record_page.js <url> <out.webm> [seconds=12] [--scroll] [--mobile]
//   --scroll  slowly scrolls the page while recording
//   --mobile  390x844 viewport (fits vertical Shorts without blur)
// Only public pages. Cookie banners are hidden best-effort. Keep clips short (commentary use, RULES §13).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const [url, outArg, secArg] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (!url || !outArg) {
    console.error('Usage: node tools/video/record_page.js <url> <out.webm> [seconds] [--scroll] [--mobile]');
    process.exit(1);
  }
  const out = path.resolve(outArg);
  const seconds = Number(secArg || 12);
  const scroll = process.argv.includes('--scroll');
  const mobile = process.argv.includes('--mobile');
  const viewport = mobile ? { width: 390, height: 844 } : { width: 1920, height: 1080 };

  fs.mkdirSync(path.dirname(out), { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport, deviceScaleFactor: mobile ? 2 : 1, colorScheme: 'dark', locale: 'en-US',
    recordVideo: { dir: path.dirname(out), size: viewport },
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2500);
  // hide common cookie / consent overlays
  await page.addStyleTag({ content: '[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],[aria-label*="cookie" i]{display:none!important}' }).catch(() => {});

  if (scroll) {
    const steps = seconds * 10;
    const total = await page.evaluate(() => Math.max(0, document.body.scrollHeight - innerHeight));
    const target = Math.min(total, viewport.height * 3);
    for (let i = 0; i <= steps; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), (target * i) / steps);
      await page.waitForTimeout(100);
    }
  } else {
    await page.waitForTimeout(seconds * 1000);
  }
  const video = page.video();
  await ctx.close();
  await browser.close();
  fs.renameSync(await video.path(), out);
  console.log(`${out} (${seconds}s, ${viewport.width}x${viewport.height})`);
})();
