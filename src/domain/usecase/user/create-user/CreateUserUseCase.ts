import { User } from '@/domain/model/user.model'
import { Encrypt } from '@/domain/protocols/cryptography/Encrypter'
import { AppError } from '@/domain/protocols/erros/AppError'
import { FindUserByEmailRepository } from '@/domain/protocols/repository/FindUserByEmailRepository'
import { SaveUserRepository } from '@/domain/protocols/repository/SaveUserRepository'
import {
  CreateUseData,
  CreateUserUseCase,
} from '@/domain/protocols/usecases/user/CreateUserUseCase'
// import { AppError } from '../../../protocols/erros/AppError'

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
      throw new AppError('Email already used')
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
