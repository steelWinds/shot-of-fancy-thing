const process = require('node:process');

module.exports = async (browser, { url }) => {
  const page = await browser.newPage();

  try {
    await page.setExtraHTTPHeaders({
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? '',
      'x-vercel-set-bypass-cookie': 'true',
    });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }
  finally {
    await page.close();
  }
};
