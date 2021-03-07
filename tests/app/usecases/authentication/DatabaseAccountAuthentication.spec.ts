import { Account, AccountAuthenticationParams } from '../../../../app/domain/entities/Account'
import { FindAccountByEmailRepository, FindAccountByEmailRepositoryParams } from '../../../../app/repositories/contracts/account/FindAccountByEmailRepository'
import { DatabaseAccountAuthentication } from '../../../../app/usecases/authentication/DatabaseAccountAuthentication'
import { HashComparer } from '../../../../contracts'
import { TokenGenerator } from '../../../../contracts/token-generator'

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

const makeHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparerStub()
}

const makeTokenGeneratorStub = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (value: string): Promise<string> {
      return 'any_token'
    }
  }

  return new TokenGeneratorStub()
}

type SutTypes ={
  sut: DatabaseAccountAuthentication
  findAccountByEmailRepositoryStub: FindAccountByEmailRepository
  hashComparerStub: HashComparer
  tokenGeneratorStub: TokenGenerator
}

const makeSut = (): SutTypes => {
  const findAccountByEmailRepositoryStub = makeFindAccountByEmailRepositoryStub()
  const hashComparerStub = makeHashComparerStub()
  const tokenGeneratorStub = makeTokenGeneratorStub()
  const sut = new DatabaseAccountAuthentication(findAccountByEmailRepositoryStub, hashComparerStub, tokenGeneratorStub)

  return {
    sut,
    findAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
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

  test('Should call HashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeAuthentication)
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()

    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(() => {
      throw new Error()
    })
    const accountPromise = sut.auth(makeAuthentication)
    await expect(accountPromise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns null', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const accessToken = await sut.auth(makeAuthentication)
    expect(accessToken).toBeNull()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const compareSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeAuthentication)
    expect(compareSpy).toHaveBeenCalledWith('valid_id')
  })
})
