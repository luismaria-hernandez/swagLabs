const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.fill('input[name="user-name"]', 'standard_user');
  await page.fill('input[name="password"]', 'secret_sauce');
  await page.click('#login-button');
  await page.waitForSelector('[data-test="shopping-cart-link"]');
  const counts = await page.$$eval('button[data-test], [data-test="shopping-cart-badge"]', els => els.map(el => ({tag: el.tagName, dataTest: el.getAttribute('data-test'), text: el.textContent?.trim()})));
  console.log(JSON.stringify(counts, null, 2));
  await browser.close();
})();
