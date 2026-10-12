import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL;
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

export default defineConfig({
  testDir: './__tests__/playwright',
  testMatch: ['**/playwright/**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      pathTemplate:
        '{testDir}/__snapshots__/visual/{arg}-{projectName}{ext}',
      animations: 'disabled',
      threshold: 0.1,
      maxDiffPixelRatio: 0.001,
    },
    toMatchAriaSnapshot: {
      pathTemplate:
        '{testDir}/__snapshots__/aria/{arg}{ext}',
    },
  },
  reporter: [
    ['github'],
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL,
    extraHTTPHeaders: {
      'x-vercel-protection-bypass': bypassSecret ?? '',
      'x-vercel-set-bypass-cookie': 'true',
      'x-vercel-skip-toolbar': '1',
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    contextOptions: {
      reducedMotion: 'reduce',
    },
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox-desktop',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit-desktop',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
    },
  ],
});
