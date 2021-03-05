import request from 'supertest'
import app from '../../../start/config/app'

describe('Express Body Parser', () => {
  test('Should parse request body as json', async () => {
    app.post('/test-body-parser', (request, response) => response.json(request.body))

    await request(app)
      .post('/test-body-parser')
      .send({ app_name: 'Satheler Survey' })
      .expect({ app_name: 'Satheler Survey' })
  })
})
