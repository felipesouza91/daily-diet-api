import { User } from '@/domain/model/user.model'
export interface CreateUseData {
  email: string
  password: string
  name: string
  photoUrl?: string
}

export interface CreateUserUseCase {
  execute(data: CreateUseData): Promise<User | null>
}
