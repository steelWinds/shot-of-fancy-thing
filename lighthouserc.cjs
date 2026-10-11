const process = require('node:process');

module.exports = {
  ci: {
    collect: {
      staticDistDir: './.vercel/output/static',
      url: [
        'http://localhost/',
        'http://localhost/en/',
        'http://localhost/404',
        'http://localhost/en/404',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: process.env.CI ? '--no-sandbox' : undefined,
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci/reports',
    },
  },
};
