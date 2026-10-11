import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:4321';
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

export default defineConfig({
  testDir: './__tests__/playwright',
  testMatch: [
    '**/playwright/**/*.spec.ts',
    '**/visual/**/*.spec.ts',
  ],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  expect: {
    timeout: 10_000,

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
  reporter: process.env.CI
    ? [
      ['github'],
      ['list'],
      ['html', { open: 'never' }],
    ]
    : 'list',
  use: {
    baseURL,
    extraHTTPHeaders: process.env.BASE_URL && bypassSecret
      ? { 'x-vercel-protection-bypass': bypassSecret }
      : undefined,

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
      command: 'npm run build && npm run preview',
      url: baseURL,
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,

      stdout: 'ignore',
      stderr: 'pipe',
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
