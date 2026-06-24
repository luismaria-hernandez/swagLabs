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
    '[data-test="add-to-cart-sauce-labs-onesie"]'
  ];
  for (const sel of selectors) {
    const element = await page.$(sel);
    console.log('selector', sel, 'exists', !!element);
    await element.click();
    const badge = await page.$('[data-test="shopping-cart-badge"]');
    console.log('badge after click', badge ? (await badge.textContent()).trim() : 'none');
  }
  const finalBadge = await page.textContent('[data-test="shopping-cart-badge"]');
  console.log('final badge', finalBadge?.trim());
  await browser.close();
})();
