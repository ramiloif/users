const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

(async () => {
  const expectedEmail = `${uuidv4()}@gmail.com`;

  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  await page.waitForSelector("#create_user_btn")
  await page.$eval('#create_user_btn', btn => btn.click());
  await page.waitForSelector("#create_form")
  await page.type('#firstname', 'Rami')
  await page.type('#lastname', 'Loiferman')
  await page.type('#email', expectedEmail)
  await page.type('#password', 'Aa123456')
  await page.type('#description', 'No comment')
  await page.$eval('#submit_form', btn => btn.click());
  await page.waitForSelector("#create_success")
  
  // TODO: validate db for expectedEmail

  await page.screenshot({ path: 'test-result.png' });

 await browser.close();
})();