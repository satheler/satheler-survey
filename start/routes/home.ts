import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ response }) => {
  return response.status(200).json({
    app: 'satheler-survey',
  })
})
