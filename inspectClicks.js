const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.fill('input[name="user-name"]', 'standard_user');
  await page.fill('input[name="password"]', 'secret_sauce');
  await page.click('#login-button');
  await page.waitForSelector('[data-test="shopping-cart-link"]');
  const selectors = [
    '[data-test="add-to-cart-sauce-labs-backpack"]',
    '[data-test="add-to-cart-sauce-labs-bike-light"]',
    '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
    '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
    '[data-test="add-to-cart-sauce-labs-onesie"]',
    '[data-test=add-to-cart-test.allthethings()-t-shirt-(red)]'
  ];
  for (const sel of selectors) {
    const exists = await page.$(sel);
    console.log('selector', sel, 'exists', !!exists);
    if (exists) {
      try {
        await exists.click();
        console.log('clicked', sel);
      } catch (e) {
        console.log('click failed', sel, e.message);
      }
    }
    const badge = await page.$('[data-test="shopping-cart-badge"]');
    const text = badge ? (await badge.textContent()).trim() : 'no badge';
    console.log('badge after step', text);
  }
  await browser.close();
})();
