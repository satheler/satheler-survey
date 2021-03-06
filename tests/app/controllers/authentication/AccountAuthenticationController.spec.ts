import { AccountAuthenticationController } from '../../../../app/controllers/authentication/AccountAuthenticationController'
import { httpResponseHelper } from '../../../../app/helpers/HttpHelper'
import { ControllerContext, HttpRequest } from '../../../../contracts'

describe('Authentication Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new AccountAuthenticationController()

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
    expect(httpResponse.statusCode).toEqual(400)
  })
})
