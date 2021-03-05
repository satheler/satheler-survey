import { Router } from 'express'

export default (router: Router): void => {
  router.post('/', (request, response) => response.json({ message: 'ok from accounts' }))
}
