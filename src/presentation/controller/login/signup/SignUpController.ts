import { CreateUserUseCase } from '@/domain/protocols/usecases/user/CreateUserUseCase'

interface InputSignInControllerData {
  name: string
  email: string
  password: string
  photoUrl?: string
}

export class SignUpController {
  private useCase: CreateUserUseCase

  constructor(useCase: CreateUserUseCase) {
    this.useCase = useCase
  }

  async handler({
    email,
    name,
    password,
    photoUrl,
  }: InputSignInControllerData) {
    const user = await this.useCase.execute({ email, name, password, photoUrl })
    if (!user) {
      return {
        statusCode: 400,
        errorMessage: 'Email already in use',
      }
    }
  }
}
