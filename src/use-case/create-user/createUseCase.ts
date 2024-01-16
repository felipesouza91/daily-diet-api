import { Encrypt } from '../../data/protocols/cryptography/Encrypter'
import {
  FindUserByEmailRepository,
  User,
} from '../../data/protocols/repository/FindUserByEmailRepository'
import { SaveUserRepository } from '../../data/protocols/repository/SaveUserRepository'
import { AppError } from '../../main/shared/AppError'

interface CreateUseData {
  email: string
  password: string
  name: string
  photoUrl?: string
}

export class CreateUserUseCase {
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
    await this.saveUserRepository.save({
      email,
      name,
      password: hashPassword,
      photoUrl,
    })
    return {} as User
  }
}
