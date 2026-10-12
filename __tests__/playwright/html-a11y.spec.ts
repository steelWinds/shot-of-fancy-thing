import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { ROUTES } from './lib';

test.describe('validate HTML and a11y', () => {
  test('Validate a11y', async ({ page }) => {
    for (const route of ROUTES) {
      await test.step(`a11y: ${route}`, async () => {
        await page.goto(route);

        await expect(page).toMatchAriaSnapshot();

        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  });
});
