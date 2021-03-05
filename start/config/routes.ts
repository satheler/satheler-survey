import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export default (app: Express): void => {
  const appRouter = Router()

  app.use('/', appRouter)
  const baseRoutesPath = join(__dirname, '../routes')

  readdirSync(baseRoutesPath)
    .map(async file => {
      const router = Router()
      const [routeName] = file.split('.')

      if (!file.endsWith('.map')) {
        (await import(`../routes/${file}`)).default(router)
        appRouter.use(`/${routeName}`, router)
      }
    })
}
