import { AppError } from '../../../../main/shared/AppError'
import { User } from '../../../model/user.model'
import { Encrypt } from '../../../protocols/cryptography/Encrypter'
import { FindUserByEmailRepository } from '../../../protocols/repository/FindUserByEmailRepository'
import { SaveUserRepository } from '../../../protocols/repository/SaveUserRepository'

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
    const user = await this.saveUserRepository.save({
      email,
      name,
      password: hashPassword,
      photoUrl,
    })
    return user
  }
}
