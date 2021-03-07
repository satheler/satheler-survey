import { Router } from 'express'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeCreateAccountController } from '../factories/controllers/account/CreateAccountControllerFactory'

export default (router: Router): void => {
  router.post('/', adaptRoute(makeCreateAccountController()))
}
