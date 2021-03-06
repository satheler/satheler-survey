import { AddAccountRepository } from '../../../../app/data/contracts/AddAccountRepository'
import { DatabaseAddAccount } from '../../../../app/data/usecases/Account/DatabaseAddAccount'
import { AddAccountParams } from '../../../../app/domain/usecases/Account/AddAccount'
import { Account } from '../../../../app/models/Account'
import { Encrypter } from '../../../../contracts'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise((resolve, reject) => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeFakeAccount = (): Account => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'hashed_password'
})

const makeAccountData = (): AddAccountParams => ({
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'valid_password'
})

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: Account): Promise<Account> {
      return makeFakeAccount()
    }
  }

  return new AddAccountRepositoryStub()
}

type SutTypes = {
  sut: DatabaseAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DatabaseAddAccount(encrypterStub, addAccountRepositoryStub)

  return { sut, encrypterStub, addAccountRepositoryStub }
}

describe('DatabaseAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = makeAccountData()

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error())
    const accountData = makeAccountData()

    const accountPromise = sut.add(accountData)
    await expect(accountPromise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = makeAccountData()

    await sut.add(accountData)

    const account = makeFakeAccount()
    expect(addSpy).toHaveBeenCalledWith(account)
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const accountData = makeAccountData()

    const accountPromise = sut.add(accountData)
    await expect(accountPromise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = makeFakeAccount()

    const account = await sut.add(accountData)
    expect(account).toEqual(accountData)
  })
})
