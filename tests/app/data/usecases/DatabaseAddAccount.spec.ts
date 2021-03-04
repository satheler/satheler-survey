import { DatabaseAddAccount } from '../../../../app/data/usecases/Account/DatabaseAddAccount'

describe('DatabaseAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise((resolve, reject) => resolve('hashed_password'))
      }
    }

    const encrypterStub = new EncrypterStub()

    const sut = new DatabaseAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
