import { AccountDynamoDbRepository } from '../../../../../lib/database/dynamodb/repositories/AccountDynamoDbRepository'
import { DynamoDbHelper } from '../../../../../lib/database/dynamodb/helpers/DynamoDbHelper'

const makeSut = (): AccountDynamoDbRepository => {
  return new AccountDynamoDbRepository()
}

describe('Account DynamoDb Repository', () => {
  beforeEach(() => {
    DynamoDbHelper.connect({
      endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
      sslEnabled: false,
      region: 'local'
    })
  })

  test('Should return an account on succes', async () => {
    const sut = makeSut()
    const account = await sut.add({
      id: 'any_id',
      name: 'any_name',
      email: 'any@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any@mail.com',
      password: 'any_password'
    })
  })
})
