import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/en/',
  '/404',
  '/en/404',
];

test.describe('validate HTML and a11y', () => {
  test('Validate home page screenshot', async ({ page }) => {
    await page.goto('/');

    await expect(page).toMatchAriaSnapshot();
  });

  test('Validate 404 page snapshot', async ({ page }) => {
    await page.goto('/404');

    await expect(page).toMatchAriaSnapshot();
  });

  test('Validate a11y', async ({ page }) => {
    for (const route of ROUTES) {
      await test.step(`a11y: ${route}`, async () => {
        await page.goto(route);

        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  });
});
