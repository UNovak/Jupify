import puppeteer from 'puppeteer'

const url = 'https://vote.jup.ag/'

// Launch the browser and open a new blank page
const browser = await puppeteer.launch()
const page = await browser.newPage()

// Navigate the page to a URL.
await page.goto(url)

// do something on the page

// close the browser
await browser.close()
