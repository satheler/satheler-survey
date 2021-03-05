import request from 'supertest'
import app from '../../../start/config/app'

describe('Express Cors', () => {
  test('Should enable CORS', async () => {
    app.all('/test-cors', (request, response) => response.send())

    await request(app)
      .options('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
