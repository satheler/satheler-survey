import request from 'supertest'
import { DynamoDbHelper } from '../../../lib/database/dynamodb/DynamoDbHelper'
import app from '../../../start/config/app'

describe('Account Routes', () => {
  beforeEach(() => {
    DynamoDbHelper.connect({
      endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
      sslEnabled: false,
      region: 'local'
    })
  })

  describe('Create Account', () => {
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
