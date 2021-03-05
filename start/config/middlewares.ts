import { Express } from 'express'
import { bodyParser } from '../middlewares/BodyParser'

export default (app: Express): void => {
  app.use(bodyParser)
}
