import {
  FindUserByEmailRepository,
  User,
} from '../../data/repository/FindUserByEmailRepository'
import { AppError } from '../../main/shared/AppError'

interface CreateUseData {
  email: string
  password: string
  name: string
}

export class CreateUserUseCase {
  private findUserByEmailRepository: FindUserByEmailRepository

  constructor(findUserByEmailRepository: FindUserByEmailRepository) {
    this.findUserByEmailRepository = findUserByEmailRepository
  }

  async execute({ email, password, name }: CreateUseData): Promise<User> {
    const userExits = await this.findUserByEmailRepository.findByEmail(email)
    if (userExits) {
      throw new AppError('Email already used')
    }
    return {} as User
  }
}
