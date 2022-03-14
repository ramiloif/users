const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require('mongodb');

(async () => {
  const expectedEmail = `${uuidv4()}@gmail.com`;

  const browser = await puppeteer.launch();
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
  await page.screenshot({ path: 'test-result.png' });  
  await browser.close();
  await validateEmailInDb(expectedEmail)
})();


const validateEmailInDb =  async (expectedEmail) => {
  const url = 'mongodb://localhost:27017/';
  const client = new MongoClient(url);

  await client.connect();
  const db = client.db('lusha')
  const users = db.collection('users');
  const user = await users.findOne({ email: expectedEmail })
  if(!user) {
    console.log('Error user not really reated in db')
    process.exit(1);
  } else {
    console.log('Success' ,user._id, user.email)
    process.exit(0);
  }
}