import { CreateAccountController } from '../../../../app/controllers/account/CreateAccountController'
import { AddAccount, AddAccountParams } from '../../../../app/domain/entities/AddAccount'
import { httpResponseHelper } from '../../../../lib/helpers/HttpResponseHelper'
import { Account } from '../../../../app/domain/entities/Account'
import { ControllerContext, HttpRequest, Validation } from '../../../../contracts'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (params: AddAccountParams): Promise<Account> {
      const fakeAccount = makeFakeAccount()

      return fakeAccount
    }
  }

  return new AddAccountStub()
}

const makeFakeAccount = (): Account => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid@mail.com',
    password: 'valid_password',
    password_confirmation: 'valid_password'
  }
})

const makeControllerContext = (): ControllerContext => ({
  request: makeFakeRequest(),
  response: httpResponseHelper
})

type SutTypes = {
  sut: CreateAccountController
  validationStub: Validation
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addAccountStub = makeAddAccountStub()
  const sut = new CreateAccountController(validationStub, addAccountStub)

  return { sut, validationStub, addAccountStub }
}

describe('CreateAccount Controller', () => {
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

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    const controllerContext = makeControllerContext()

    await sut.handle(controllerContext)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(new Error())

    const controllerContext = makeControllerContext()

    const httpResponse = await sut.handle(controllerContext)
    const expectedResponse = httpResponseHelper.internalServerError()
    expect(httpResponse).toEqual(expectedResponse)
  })

  test('Should return 200 if valid values is provided', async () => {
    const { sut } = makeSut()

    const controllerContext = makeControllerContext()

    const httpResponse = await sut.handle(controllerContext)

    const fakeAccount = makeFakeAccount()
    const expectedResponse = httpResponseHelper.ok(fakeAccount)
    expect(httpResponse).toEqual(expectedResponse)
  })
})
