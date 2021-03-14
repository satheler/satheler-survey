import { AccountAuthenticationController } from '../../../../app/controllers/authentication/AccountAuthenticationController'
import { AccountAuthentication, AccountAuthenticationParams } from '../../../../app/domain/entities/Account'
import { httpResponseHelper } from '../../../../lib/helpers/HttpResponseHelper'
import { ControllerContext, HttpRequest, Validation } from '../../../../contracts'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeAuthenticationStub = (): AccountAuthentication => {
  class AuthenticationStub {
    async auth ({ email, password }: AccountAuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

type SutTypes = {
  sut: AccountAuthenticationController
  validationStub: Validation
  authenticationStub: AccountAuthentication
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const authenticationStub = makeAuthenticationStub()
  const sut = new AccountAuthenticationController(validationStub, authenticationStub)

  return {
    sut,
    validationStub,
    authenticationStub
  }
}

const makeRequest = (): HttpRequest => ({
  body: {
    email: 'any@email.com',
    password: 'any_password'
  }
})

const makeControllerContext = (): ControllerContext => ({
  request: makeRequest(),
  response: httpResponseHelper
})

describe('Authentication Controller', () => {
  test('Should call Validator with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const controllerContext = makeControllerContext()

    await sut.handle(controllerContext)
    expect(validateSpy).toHaveBeenCalledWith(controllerContext.request.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const controllerContext = makeControllerContext()

    const httpResponse = await sut.handle(controllerContext)
    const expectedResponse = httpResponseHelper.badRequest(new Error())
    expect(httpResponse).toEqual(expectedResponse)
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    const controllerContext = makeControllerContext()

    await sut.handle(controllerContext)
    expect(authSpy).toHaveBeenCalledWith(controllerContext.request.body)
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)

    const controllerContext = makeControllerContext()

    const httpResponse = await sut.handle(controllerContext)
    const expectedHttpResponse = httpResponseHelper.unauthorized()
    expect(httpResponse).toEqual(expectedHttpResponse)
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error())

    const controllerContext = makeControllerContext()

    const httpResponse = await sut.handle(controllerContext)
    const expectedHttpResponse = httpResponseHelper.internalServerError()
    expect(httpResponse).toEqual(expectedHttpResponse)
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const controllerContext = makeControllerContext()

    const httpResponse = await sut.handle(controllerContext)
    const expectedHttpResponse = httpResponseHelper.ok({ access_token: 'any_token' })
    expect(httpResponse).toEqual(expectedHttpResponse)
  })
})
