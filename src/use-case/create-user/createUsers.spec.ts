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

class UserRepository implements FindUserByEmailRepository {
  findByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(undefined)
  }
}

describe('Create User use case Test', () => {
  test('should findbyEmail resposistory is called', async () => {
    const repository = new UserRepository()
    const sut = new CreateUserUseCase(repository)
    const repositorySpy = vi.spyOn(repository, 'findByEmail')
    const result = await sut.execute(data)
    expect(repository.findByEmail).toBeCalledTimes(1)
  })
})
