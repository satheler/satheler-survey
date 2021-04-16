import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ response }) => {
  return response.status(200).json({
    app: 'satheler-survey',
    cloud_provider: Env.get('DB_CONNECTION', 'local'),
  })
})
