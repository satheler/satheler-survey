import { CreateAccountController } from '../../../../app/controllers/account/CreateAccountController'
import { AddAccount, AddAccountParams } from '../../../../app/domain/usecases/Account/AddAccount'
import { MissingParamError, InvalidParamError } from '../../../../app/errors'
import { httpResponseHelper } from '../../../../app/helpers/HttpHelper'
import { Account } from '../../../../app/models/Account'
import { EmailValidator, HttpRequest } from '../../../../contracts'

type SutTypes = {
  sut: CreateAccountController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  return emailValidatorStub
}

const makeFakeAccount = (): Account => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'valid_password'
})

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (params: AddAccountParams): Promise<Account> {
      const fakeAccount = makeFakeAccount()

      return fakeAccount
    }
  }

  const addAccountStub = new AddAccountStub()
  return addAccountStub
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid@mail.com',
    password: 'valid_password',
    password_confirmation: 'valid_password'
  }
})

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const addAccountStub = makeAddAccountStub()
  const sut = new CreateAccountController(emailValidatorStub, addAccountStub)

  return { sut, emailValidatorStub, addAccountStub }
}

describe('CreateAccount Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        password_confirmation: 'any_password_confirmation'
      }
    }

    const httpResponse = await sut.handle({ request, response: httpResponseHelper })
    const expectedResponse = httpResponseHelper.badRequest(new MissingParamError('name'))
    expect(httpResponse).toEqual(expectedResponse)
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        name: 'any_name',
        password: 'any_password',
        password_confirmation: 'any_password_confirmation'
      }
    }

    const httpResponse = await sut.handle({ request, response: httpResponseHelper })
    const expectedResponse = httpResponseHelper.badRequest(new MissingParamError('email'))
    expect(httpResponse).toEqual(expectedResponse)
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password_confirmation: 'any_password_confirmation'
      }
    }

    const httpResponse = await sut.handle({ request, response: httpResponseHelper })
    const expectedResponse = httpResponseHelper.badRequest(new MissingParamError('password'))
    expect(httpResponse).toEqual(expectedResponse)
  })

  test('Should return 400 if no password confirmation is provided', async () => {
    const { sut } = makeSut()
    const request = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle({ request, response: httpResponseHelper })
    const expectedResponse = httpResponseHelper.badRequest(new MissingParamError('password_confirmation'))
    expect(httpResponse).toEqual(expectedResponse)
  })

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

    const request = makeFakeRequest()

    const httpResponse = await sut.handle({ request, response: httpResponseHelper })
    const expectedResponse = httpResponseHelper.badRequest(new InvalidParamError('email'))
    expect(httpResponse).toEqual(expectedResponse)
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const request = makeFakeRequest()

    await sut.handle({ request, response: httpResponseHelper })
    expect(isValidSpy).toHaveBeenCalledWith(request.body.email)
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const request = makeFakeRequest()

    const httpResponse = await sut.handle({ request, response: httpResponseHelper })

    const expectedResponse = httpResponseHelper.internalServerError()
    expect(httpResponse).toEqual(expectedResponse)
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    const request = makeFakeRequest()

    await sut.handle({ request, response: httpResponseHelper })
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid@mail.com',
      password: 'valid_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(new Error())

    const request = makeFakeRequest()

    const httpResponse = await sut.handle({ request, response: httpResponseHelper })
    const expectedResponse = httpResponseHelper.internalServerError()
    expect(httpResponse).toEqual(expectedResponse)
  })

  test('Should return 200 if valid values is provided', async () => {
    const { sut } = makeSut()

    const request = makeFakeRequest()

    const httpResponse = await sut.handle({ request, response: httpResponseHelper })

    const fakeAccount = makeFakeAccount()
    const expectedResponse = httpResponseHelper.ok(fakeAccount)
    expect(httpResponse).toEqual(expectedResponse)
  })
})
