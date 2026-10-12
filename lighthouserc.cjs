const process = require('node:process');

const baseURL = new URL(process.env.BASE_URL);

const ROUTES = ['/', '/en/'];

module.exports = {
  ci: {
    collect: {
      url: ROUTES.map(path => new URL(path, baseURL).href),
      numberOfRuns: 3,
      puppeteerScript: './.github/lighthouse-bypass.cjs',
      puppeteerLaunchOptions: {
        args: process.env.CI ? ['--no-sandbox'] : [],
      },
      settings: {
        extraHeaders: {
          'x-vercel-skip-toolbar': 'true',
        },
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'is-crawlable': 'off',
        'valid-source-maps': 'off',
        'network-dependency-tree-insight': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
