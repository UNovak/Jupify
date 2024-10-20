import { CronJob } from 'cron'
import ky from 'ky'
import { scraper } from './scraper'

const startCron = () => {
  const cronJob = new CronJob(
    // Every 8 hours at hh:05
    '5 */8 * * *',
    async () => {
      const result = await scraper() // Run the scraper
      ky.post(`${process.env.DOMAIN}/update`, {
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
