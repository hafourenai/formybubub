// Jalankan dengan playwright-cli run-code --filename=scripts/studio-qa.js.
// Hanya seek dan screenshot browser Studio; tidak memanggil renderer Remotion.
async (page) => {
  const customFrames = await page.evaluate(() => window.__studioQaFrames);
  await page.setViewportSize({width: 2200, height: 1500});
  const failures = [];
  page.on('pageerror', (error) => failures.push(error.message));
  await page.context().route('https://**', (route) => route.abort());
  await page.reload();
  const studio = page.frames().find((frame) => frame.url().includes('/TcpUdpExplainer'));
  const composition = studio.locator('[data-composition="TcpUdpExplainer"]');
  await composition.waitFor();
  await studio.evaluate(() => document.fonts.ready);
  const frames = customFrames ?? [300, 315, 1200, 2500, 3800, 3870, 4100, 5200, 5480, 5850, 6000, 6350, 7200, 7650, 8000, 8220, 8600];
  const results = [];
  for (const target of frames) {
    const current = await composition.getAttribute('data-frame');
    await studio.getByRole('button', {name: current, exact: true}).click();
    const input = studio.getByRole('textbox', {name: current, exact: true});
    await input.fill(String(target));
    await studio.locator('input:focus').press('Enter');
    await studio.waitForFunction((target) => document.querySelector('[data-composition]').dataset.frame === String(target), target);
    const observation = await composition.evaluate((root) => {
      const box = root.getBoundingClientRect();
      const scale = box.width / 1920;
      const visible = (el) => {
        let opacity = 1;
        for (let node = el; node && node !== root.parentElement; node = node.parentElement) {
          const css = getComputedStyle(node);
          if (css.display === 'none' || css.visibility === 'hidden') return false;
          opacity *= Number(css.opacity);
        }
        return opacity > 0.1;
      };
      const scenes = [...root.querySelectorAll('[data-scene]')].filter(visible);
      const overflow = [];
      const undersized = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const text = walker.currentNode;
        if (!text.textContent.trim() || !visible(text.parentElement)) continue;
        const range = document.createRange();
        range.selectNodeContents(text);
        const rect = range.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        const position = {x: (rect.left - box.left) / scale, y: (rect.top - box.top) / scale,
          right: (rect.right - box.left) / scale, bottom: (rect.bottom - box.top) / scale};
        if (position.x < 94 || position.right > 1826 || position.y < 94 || position.bottom > 986) {
          overflow.push({text: text.textContent, ...position});
        }
        const size = parseFloat(getComputedStyle(text.parentElement).fontSize);
        if (size < 32) undersized.push({text: text.textContent, size});
      }
      return {frame: Number(root.dataset.frame), scenes: scenes.map((scene) => scene.dataset.scene),
        beats: scenes.flatMap((scene) => [...scene.querySelectorAll('[data-beat]')].map((beat) => beat.dataset.beat)),
        text: scenes.map((scene) => scene.innerText).join('\n'), overflow, undersized,
        audioElements: root.querySelectorAll('audio').length,
        fonts: {inter: document.fonts.check('32px Inter'), mono: document.fonts.check('32px "JetBrains Mono"')}};
    });
    await composition.screenshot({path: `qa/screenshots/frame-${target}.png`});
    results.push(observation);
  }
  return {pageErrors: failures, results};
}
