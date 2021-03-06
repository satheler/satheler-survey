import { AccountAuthenticationController } from '../../../../app/controllers/authentication/AccountAuthenticationController'
import { InvalidParamError, MissingParamError } from '../../../../app/errors'
import { httpResponseHelper } from '../../../../app/helpers/HttpHelper'
import { ControllerContext, EmailValidator, HttpRequest } from '../../../../contracts'

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  return emailValidatorStub
}

type SutTypes = {
  sut: AccountAuthenticationController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new AccountAuthenticationController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
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
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const request: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const controllerContext: ControllerContext = {
      request,
      response: httpResponseHelper
    }

    const httpResponse = await sut.handle(controllerContext)
    const expectedHttpResponse = httpResponseHelper.badRequest(new MissingParamError('email'))
    expect(httpResponse).toEqual(expectedHttpResponse)
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const request: HttpRequest = {
      body: {
        email: 'any@email.com'
      }
    }

    const controllerContext: ControllerContext = {
      request,
      response: httpResponseHelper
    }

    const httpResponse = await sut.handle(controllerContext)
    const expectedHttpResponse = httpResponseHelper.badRequest(new MissingParamError('password'))
    expect(httpResponse).toEqual(expectedHttpResponse)
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const controllerContext = makeControllerContext()

    const httpResponse = await sut.handle(controllerContext)
    const expectedHttpResponse = httpResponseHelper.badRequest(new InvalidParamError('email'))
    expect(httpResponse).toEqual(expectedHttpResponse)
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const controllerContext = makeControllerContext()

    await sut.handle(controllerContext)
    expect(isValidSpy).toHaveBeenCalledWith(controllerContext.request.body.email)
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const controllerContext = makeControllerContext()

    const httpResponse = await sut.handle(controllerContext)
    const expectedHttpResponse = httpResponseHelper.internalServerError()
    expect(httpResponse).toEqual(expectedHttpResponse)
  })
})
