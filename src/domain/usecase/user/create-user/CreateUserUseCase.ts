import { User } from '@/domain/model/user.model'
import { Encrypt } from '@/domain/protocols/cryptography/Encrypter'
import { UserExits } from '@/domain/protocols/erros/UserExists'
import { FindUserByEmailRepository } from '@/domain/protocols/repository/FindUserByEmailRepository'
import { SaveUserRepository } from '@/domain/protocols/repository/SaveUserRepository'
import {
  CreateUseData,
  CreateUserUseCase,
} from '@/domain/protocols/usecases/user/CreateUserUseCase'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  private findUserByEmailRepository: FindUserByEmailRepository
  private encrypt: Encrypt
  private saveUserRepository: SaveUserRepository
  constructor(
    findUserByEmailRepository: FindUserByEmailRepository,
    encrypt: Encrypt,
    saveUserRepository: SaveUserRepository,
  ) {
    this.findUserByEmailRepository = findUserByEmailRepository
    this.encrypt = encrypt
    this.saveUserRepository = saveUserRepository
  }

  async execute({
    email,
    password,
    name,
    photoUrl,
  }: CreateUseData): Promise<User> {
    const userExits = await this.findUserByEmailRepository.findByEmail(email)
    if (userExits) {
      throw new UserExits()
    }
    const hashPassword = await this.encrypt.encrypt(password)
    const user = await this.saveUserRepository.save({
      email,
      name,
      password: hashPassword,
      photoUrl,
    })
    return user
  }
}
