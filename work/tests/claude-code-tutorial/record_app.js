// Records the real Focus Timer app (built by Claude Code in C:\kaxo-demo\focus-timer) being used: B-roll for the tutorial.
// Usage: node work/tests/claude-code-tutorial/record_app.js <out-dir> [--mobile]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.resolve(process.argv[2]);
  const mobile = process.argv.includes('--mobile');
  const viewport = mobile ? { width: 390, height: 844 } : { width: 1920, height: 1080 };
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport, deviceScaleFactor: 1, colorScheme: 'dark', locale: 'en-US',
    recordVideo: { dir: outDir, size: viewport },  // size must equal the viewport, or Playwright pads instead of scaling
  });
  const page = await ctx.newPage();
  const url = 'file:///C:/kaxo-demo/focus-timer/index.html?fast';
  const t0 = Date.now();
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(1500);
  const mark = (label) => console.log(`${((Date.now() - t0) / 1000).toFixed(1)}s ${label}`);

  mark('empty app');
  for (const t of ['Write the tutorial script', 'Record the screen', 'Edit the video']) {
    await page.click('#task-input');
    await page.keyboard.type(t, { delay: 45 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(700);
  }
  mark('tasks added');
  await page.click('.task:nth-child(2)');
  await page.waitForTimeout(1200);
  mark('task selected');
  await page.click('#start-pause');
  mark('start (10 s fast focus)');
  await page.waitForTimeout(5000);
  await page.click('#start-pause');
  mark('pause');
  await page.waitForTimeout(1500);
  await page.click('#start-pause');
  mark('resume');
  await page.waitForTimeout(7500);
  mark('focus finished: +1 pomodoro, break');
  await page.waitForTimeout(3000);
  await page.click('#start-pause');
  mark('break started');
  await page.waitForTimeout(6500);
  mark('break finished');
  await page.waitForTimeout(2000);
  await page.reload();
  await page.waitForTimeout(2500);
  mark('reloaded: data kept');

  const video = page.video();
  await ctx.close();
  await browser.close();
  const dest = path.join(outDir, mobile ? 'app-mobile.webm' : 'app-desktop.webm');
  fs.renameSync(await video.path(), dest);
  console.log('saved', dest);
})();
