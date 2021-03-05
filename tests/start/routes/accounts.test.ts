import request from 'supertest'
import app from '../../../start/config/app'

describe('Account Routes', () => {
  describe('SignUp', () => {
    test('Should return an account on success', async () => {
      await request(app)
        .post('/accounts')
        .send({
          name: 'Any Name',
          email: 'any@mail.com',
          password: '123456',
          password_confirmation: '123456'
        })
        .expect(200)
    })
  })
})
