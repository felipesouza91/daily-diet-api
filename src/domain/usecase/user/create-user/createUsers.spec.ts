import { User } from '@/domain/model/user.model'
import { Encrypt } from '@/domain/protocols/cryptography/Encrypter'
import { FindUserByEmailRepository } from '@/domain/protocols/repository/FindUserByEmailRepository'
import {
  SaveUserInput,
  SaveUserRepository,
} from '@/domain/protocols/repository/SaveUserRepository'
import { describe, expect, test, vi } from 'vitest'
import { CreateUserUseCaseImpl } from './createUseCase'

const data = {
  email: 'sample@email.com',
  name: 'John doe',
  password: 'valid_password',
}

const resultData = {
  id: 'string',
  name: 'string',
  photoUrl: 'string',
  password: 'string',
  email: 'string',
}

class Cypher implements Encrypt {
  encrypt(value: string): Promise<string> {
    return Promise.resolve(value.toUpperCase())
  }
}

class UserRepository implements FindUserByEmailRepository, SaveUserRepository {
  save(data: SaveUserInput): Promise<User> {
    return Promise.resolve({ id: 'valid-uuid', ...data })
  }

  findByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(undefined)
  }
}

const makeSut = () => {
  const cypher = new Cypher()
  const repository = new UserRepository()
  const sut = new CreateUserUseCaseImpl(repository, cypher, repository)
  return {
    repository,
    sut,
    cypher,
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

  test('should bcrypt already called to cypher password', async () => {
    const { cypher, sut } = makeSut()
    vi.spyOn(cypher, 'encrypt')
    await sut.execute(data)
    expect(cypher.encrypt).toBeCalledTimes(1)
  })

  test('should bcrypt already called with correct value', async () => {
    const { cypher, sut } = makeSut()
    vi.spyOn(cypher, 'encrypt')
    await sut.execute(data)
    expect(cypher.encrypt).toBeCalledWith(data.password)
  })

  test('should saveUser repository has been called', async () => {
    const { repository, sut } = makeSut()
    vi.spyOn(repository, 'save')
    await sut.execute(data)
    expect(repository.save).toBeCalledTimes(1)
  })

  test('should saveUser repository is call with correct value', async () => {
    const { repository, sut } = makeSut()
    vi.spyOn(repository, 'save')
    await sut.execute(data)
    expect(repository.save).toBeCalledWith({
      ...data,
      password: data.password.toUpperCase(),
    })
  })

  test('should return a user with id field', async () => {
    const { sut } = makeSut()
    const user = await sut.execute(data)
    expect(user).not.toBeNull()
    expect(user.id).toBeTruthy()
  })

  test('should throws when findUserRespository throws', async () => {
    const { repository, sut } = makeSut()
    vi.spyOn(repository, 'findByEmail').mockRejectedValueOnce(new Error())
    const response = sut.execute(data)
    await expect(response).rejects.toThrow()
  })
  test('should throws when Encrypt throws', async () => {
    const { cypher, sut } = makeSut()
    vi.spyOn(cypher, 'encrypt').mockRejectedValueOnce(new Error())
    const response = sut.execute(data)
    await expect(response).rejects.toThrow()
  })

  test('should throws when saveUser throws', async () => {
    const { repository, sut } = makeSut()
    vi.spyOn(repository, 'save').mockRejectedValueOnce(new Error())
    const response = sut.execute(data)
    await expect(response).rejects.toThrow()
  })
})
