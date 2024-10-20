import ky from 'ky'
import { scraper } from './scraper'

const runScraper = async () => {
  const result = await scraper() // Run the scraper
  ky.post(`${process.env.DOMAIN}/update`, {
    // Send the data to the server
    json: {
      ...result,
    },
  })
}

runScraper()
