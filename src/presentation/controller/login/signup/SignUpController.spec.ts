import { User } from '@/domain/model/user.model'
import {
  CreateUseData,
  CreateUserUseCase,
} from '@/domain/protocols/usecases/user/CreateUserUseCase'

import { describe, expect, test, vi } from 'vitest'
import { SignUpController } from './SignUpController'

class CreateUserUseCaseStub implements CreateUserUseCase {
  execute(data: CreateUseData): Promise<User | null> {
    return Promise.resolve({
      id: 'uuid',
      email: 'valid@email.com',
      name: 'Valid Name',
      password: 'hasPassword',
    })
  }
}

const fakeInputRequest = {
  name: 'some name',
  email: 'valid@email.com',
  password: 'valid@password.com',
}

const makeSut = () => {
  const useCase = new CreateUserUseCaseStub()

  const sut = new SignUpController(useCase)
  return {
    sut,
    useCase,
  }
}

describe('SignUpController', async () => {
  test('should controller call use case', async () => {
    const { sut, useCase } = makeSut()
    vi.spyOn(useCase, 'execute')
    await sut.handler(fakeInputRequest)
    expect(useCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should useCase has been called with correct values', async () => {
    const { sut, useCase } = makeSut()
    vi.spyOn(useCase, 'execute')
    await sut.handler(fakeInputRequest)
    expect(useCase.execute).toHaveBeenCalledWith(fakeInputRequest)
  })
  test('should return bad request if email exists', async () => {
    const { sut, useCase } = makeSut()
    vi.spyOn(useCase, 'execute').mockResolvedValueOnce(null)
    const response = await sut.handler(fakeInputRequest)
    expect(response).toEqual({
      statusCode: 400,
      errorMessage: 'Email already in use',
    })
  })
})
