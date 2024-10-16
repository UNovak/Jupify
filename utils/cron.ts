import { CronJob } from 'cron'
import ky from 'ky'
import jupScrape from './scraper'

const startCron = () => {
  const cron = new CronJob(
    // Every 8 hours at hh:05
    '5 */8 * * *',
    async () => {
      const result = await jupScrape() // Run the scraper
      ky.post('http://localhost:8000/update', {
        // Send the data to the server
        json: {
          ...result,
        },
      })
    }, // onTick
    null, // onComplete
    true, // start
    'utc', // timeZone
  )
}

startCron()
