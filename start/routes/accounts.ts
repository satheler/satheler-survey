import { Router } from 'express'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeSignUpController } from '../factories/SignUpControllerFactory'

export default (router: Router): void => {
  router.post('/', adaptRoute(makeSignUpController()))
}
