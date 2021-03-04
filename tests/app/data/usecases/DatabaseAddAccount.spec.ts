import { DatabaseAddAccount } from '../../../../app/data/usecases/Account/DatabaseAddAccount'
import { Encrypter } from '../../../../contracts'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise((resolve, reject) => resolve('hashed_password'))
    }
  }

  const encrypterStub = new EncrypterStub()
  return encrypterStub
}

const makeSut = (): any => {
  const encrypterStub = makeEncrypterStub()
  const sut = new DatabaseAddAccount(encrypterStub)

  return { sut, encrypterStub }
}

describe('DatabaseAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error())
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    }

    const accountPromise = sut.add(accountData)
    await expect(accountPromise).rejects.toThrow()
  })
})
