import { AccountAuthenticationController } from '../../../../app/controllers/authentication/AccountAuthenticationController'
import { MissingParamError } from '../../../../app/errors'
import { httpResponseHelper } from '../../../../app/helpers/HttpHelper'
import { ControllerContext, HttpRequest } from '../../../../contracts'

type SutTypes = {
  sut: AccountAuthenticationController
}

const makeSut = (): SutTypes => {
  const sut = new AccountAuthenticationController()

  return {
    sut
  }
}

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
})
