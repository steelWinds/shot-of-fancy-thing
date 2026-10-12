import { expect, test } from '@playwright/test';

test.describe('Smoke tests', () => {
  test.use({
    javaScriptEnabled: false,
  });

  test.beforeEach(async ({ page }) => {
    const response = await page.goto('/');

    expect(response?.ok()).toBe(true);
  });

  test('Validate hero section is visible', async ({ page }) => {
    await expect(page.getByRole('main')).toBeVisible();

    await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
    await expect(page.getByRole('paragraph').first()).toBeInViewport();
  });

  test('Has not page overflow', async ({ page }) => {
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.clientWidth
        < document.documentElement.scrollWidth;
    });

    expect(hasOverflow).toBe(false);
  });
});

test('404 page is load', async ({ page }) => {
  const response = await page.goto('/404');

  expect(response?.status()).toBe(404);

  const goHomelink = page.getByRole('link');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(goHomelink).toBeVisible();

  await goHomelink.click();

  await expect(page).toHaveURL('/');
});
