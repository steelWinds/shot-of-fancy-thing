const process = require('node:process');

const baseURL = process.env.BASE_URL || 'http://localhost/';
const useBypass = !!(process.env.BASE_URL && process.env.VERCEL_AUTOMATION_BYPASS_SECRET);

const ROUTES = [
  '/',
  '/en/',
];

module.exports = {
  ci: {
    collect: {
      staticDistDir: process.env.BASE_URL ? undefined : './.vercel/output/static',
      url: ROUTES.map(path => new URL(path, baseURL).href),
      numberOfRuns: 3,
      puppeteerScript: useBypass ? './.github/lighthouse-bypass.cjs' : undefined,
      puppeteerLaunchOptions: {
        args: process.env.CI ? ['--no-sandbox'] : [],
      },
      settings: {
        chromeFlags: process.env.CI && !useBypass ? '--no-sandbox' : undefined,
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
