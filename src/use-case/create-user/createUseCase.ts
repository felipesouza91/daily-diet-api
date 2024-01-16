import { FindUserByEmailRepository } from '../../data/repository/FindUserByEmailRepository'

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

  async execute({ email, password, name }: CreateUseData) {
    this.findUserByEmailRepository.findByEmail(email)
    return 0
  }
}
