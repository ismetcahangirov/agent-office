// Records the pixel office (?clean=1&lang=en: English, owner prompts hidden) to a video clip for use as B-roll.
// Usage: node tools/video/record_office.js <out.webm> [seconds=30]
// The server must be running (npm start). Real agent work or `npm run demo` provides the action.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const out = path.resolve(process.argv[2] || 'office.webm');
  const seconds = Number(process.argv[3] || 30);
  // Always landscape; assemble.py fits it into vertical videos with a blurred background.
  const viewport = { width: 1920, height: 1088 };

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, recordVideo: { dir: path.dirname(out), size: viewport } });
  const page = await ctx.newPage();
  const port = process.env.AGENT_OFFICE_PORT || 4317;
  try {
    await page.goto(`http://localhost:${port}/?clean=1&lang=en`, { waitUntil: 'load' });
  } catch {
    console.error('Ofis açılmadı. Əvvəlcə `npm start` işlət.');
    await browser.close();
    process.exit(1);
  }
  await page.waitForTimeout(seconds * 1000);
  const video = page.video();
  await ctx.close();
  await browser.close();
  fs.renameSync(await video.path(), out);
  console.log(`${out} (${seconds}s, ${viewport.width}x${viewport.height})`);
})();
