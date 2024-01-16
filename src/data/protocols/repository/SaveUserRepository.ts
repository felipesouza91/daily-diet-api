import { User } from './FindUserByEmailRepository'
export interface SaveUserInput {
  name: string
  email: string
  photoUrl?: string
  password: string
}
export interface SaveUserRepository {
  save(data: SaveUserInput): Promise<User>
}
