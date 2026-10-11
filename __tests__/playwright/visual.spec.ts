import { expect, test } from '@playwright/test';

test.describe('Visual screenshots', () => {
  test.use({
    reducedMotion: 'reduce',
  });

  test('Home page screenshot', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveScreenshot('home.webp', { fullPage: true });
  });

  test('home page sections screenshot', async ({ page }) => {
    await page.goto('/');

    const sections = await page.locator('main section[id]').all();

    for (const section of sections) {
      const id = await section.getAttribute('id');

      await test.step(`Section - ${id}`, () => expect(section).toHaveScreenshot(`home-section-${id}.webp`));
    }
  });

  test('404 page screenshot', async ({ page }) => {
    await page.goto('/404');

    await expect(page).toHaveScreenshot('404.webp', { fullPage: true });
  });
});
