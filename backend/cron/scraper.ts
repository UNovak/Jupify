import type { Browser } from 'puppeteer'
import puppeteer from 'puppeteer'

const scraper = async () => {
  const url = 'https://vote.jup.ag/'
  let browser: Browser | null = null

  try {
    // Launch the browser and open a new blank page
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    // Navigate the page to a URL.
    await page.goto(url)

    // Wait for the table to appear
    await page.waitForSelector('tbody')

    // Wait until at least one row contains the value "Completed"
    await page.waitForFunction(() => {
      const rows = Array.from(document.querySelectorAll('tbody tr'))
      return rows.some((row) => Array.from(row.querySelectorAll('td')).some((td) => td.textContent?.includes('Completed')))
    })

    // Once the table is loaded, select the first row
    const firstRow = await page.$eval('tbody tr', (row) => {
      const cells = Array.from(row.querySelectorAll('td')) // Get cells
      return cells.map((td) => td.textContent) // Extract text from each cell
    })

    // Generate a return object
    const result = {
      title: firstRow[0],
      voted: firstRow[1],
      status: firstRow[2],
      result: firstRow[3],
      start: firstRow[4],
      end: firstRow[5],
    }

    // Close the browser
    await browser?.close()
    return result

    // Catch any error
  } catch (error) {
    console.log(error)

    // Ensure the browser always closes
    if (browser) await browser.close()
  }
}

export { scraper }
