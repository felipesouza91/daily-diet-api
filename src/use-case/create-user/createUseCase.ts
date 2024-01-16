import { Encrypt } from '../../data/protocols/cryptography/Encrypter'
import {
  FindUserByEmailRepository,
  User,
} from '../../data/protocols/repository/FindUserByEmailRepository'
import { AppError } from '../../main/shared/AppError'

interface CreateUseData {
  email: string
  password: string
  name: string
}

export class CreateUserUseCase {
  private findUserByEmailRepository: FindUserByEmailRepository
  private encrypt: Encrypt
  constructor(
    findUserByEmailRepository: FindUserByEmailRepository,
    Encrypt: Encrypt,
  ) {
    this.findUserByEmailRepository = findUserByEmailRepository
    this.encrypt = Encrypt
  }

  async execute({ email, password, name }: CreateUseData): Promise<User> {
    const userExits = await this.findUserByEmailRepository.findByEmail(email)
    if (userExits) {
      throw new AppError('Email already used')
    }
    await this.encrypt.encrypt(password)
    return {} as User
  }
}
