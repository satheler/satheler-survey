import { CreateAccountController } from '../../../../app/controllers/account/CreateAccountController'
import { AddAccount, AddAccountParams } from '../../../../app/domain/usecases/Account/AddAccount'
import { InvalidParamError } from '../../../../app/errors'
import { httpResponseHelper } from '../../../../app/helpers/HttpHelper'
import { Account } from '../../../../app/models/Account'
import { ControllerContext, EmailValidator, HttpRequest, Validation } from '../../../../contracts'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
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
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const emailValidatorStub = makeEmailValidatorStub()
  const addAccountStub = makeAddAccountStub()
  const sut = new CreateAccountController(validationStub, emailValidatorStub, addAccountStub)

  return { sut, validationStub, emailValidatorStub, addAccountStub }
}

describe('CreateAccount Controller', () => {
  test('Should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        password_confirmation: 'invalid_password'
      }
    }

    const httpResponse = await sut.handle({ request, response: httpResponseHelper })
    const expectedResponse = httpResponseHelper.badRequest(new InvalidParamError('password_confirmation'))
    expect(httpResponse).toEqual(expectedResponse)
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const controllerContext = makeControllerContext()

    const httpResponse = await sut.handle(controllerContext)
    const expectedResponse = httpResponseHelper.badRequest(new InvalidParamError('email'))
    expect(httpResponse).toEqual(expectedResponse)
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

    const expectedResponse = httpResponseHelper.internalServerError()
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
})
