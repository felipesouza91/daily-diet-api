import { describe, expect, test, vi } from 'vitest'
import {
  FindUserByEmailRepository,
  User,
} from '../../data/repository/FindUserByEmailRepository'
import { CreateUserUseCase } from './createUseCase'

const data = {
  email: 'sample@email.com',
  name: 'John doe',
  password: '123456',
}

const resultData = {
  id: 'string',
  name: 'string',
  photoUrl: 'string',
  password: 'string',
  email: 'string',
}

class UserRepository implements FindUserByEmailRepository {
  findByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(undefined)
  }
}

const makeSut = () => {
  const repository = new UserRepository()
  const sut = new CreateUserUseCase(repository)
  return {
    repository,
    sut,
  }
}

describe('Create User use case Test', () => {
  test('should findbyEmail resposistory is called', async () => {
    const { repository, sut } = makeSut()
    vi.spyOn(repository, 'findByEmail')
    await sut.execute(data)
    expect(repository.findByEmail).toBeCalledTimes(1)
  })

  test('should throw if emails already used', async () => {
    const { repository, sut } = makeSut()
    vi.spyOn(repository, 'findByEmail').mockResolvedValue(resultData)
    const response = sut.execute(data)
    await expect(response).rejects.toThrow('Email already used')
  })
})
