import { Account, AccountAuthenticationParams } from '../../../../app/domain/entities/Account'
import { FindAccountByEmailRepository, FindAccountByEmailRepositoryParams } from '../../../../app/repositories/contracts/account/FindAccountByEmailRepository'
import { DatabaseAccountAuthentication } from '../../../../app/usecases/authentication/DatabaseAccountAuthentication'

const makeAccount = (): Account => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'hashed_password'
})

const makeAuthentication: AccountAuthenticationParams = ({
  email: 'valid@mail.com',
  password: 'any_password'
})

const makeFindAccountByEmailRepositoryStub = (): FindAccountByEmailRepository => {
  class FindAccountByEmailRepositoryStub implements FindAccountByEmailRepository {
    async find ({ email }: FindAccountByEmailRepositoryParams): Promise<Account> {
      return makeAccount()
    }
  }

  return new FindAccountByEmailRepositoryStub()
}

type SutTypes ={
  sut: DatabaseAccountAuthentication
  findAccountByEmailRepositoryStub: FindAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const findAccountByEmailRepositoryStub = makeFindAccountByEmailRepositoryStub()
  const sut = new DatabaseAccountAuthentication(findAccountByEmailRepositoryStub)

  return {
    sut,
    findAccountByEmailRepositoryStub
  }
}

describe('Database AccountAuthentication UseCase', () => {
  test('Should call FindAccountByEmailRepository with correct email', async () => {
    const { sut, findAccountByEmailRepositoryStub } = makeSut()
    const findSpy = jest.spyOn(findAccountByEmailRepositoryStub, 'find')
    await sut.auth(makeAuthentication)
    expect(findSpy).toHaveBeenCalledWith({ email: 'valid@mail.com' })
  })

  test('Should throw if FindAccountByEmailRepository throws', async () => {
    const { sut, findAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(findAccountByEmailRepositoryStub, 'find').mockRejectedValueOnce(() => {
      throw new Error()
    })
    const accountPromise = sut.auth(makeAuthentication)
    await expect(accountPromise).rejects.toThrow()
  })

  test('Should return null if FindAccountByEmailRepository returns null', async () => {
    const { sut, findAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(findAccountByEmailRepositoryStub, 'find').mockResolvedValueOnce(null)
    const accessToken = await sut.auth(makeAuthentication)
    expect(accessToken).toBeNull()
  })
})
