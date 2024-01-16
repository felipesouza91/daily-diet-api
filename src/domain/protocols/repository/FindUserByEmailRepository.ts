import { User } from '../../model/user.model'

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<User | undefined>
}
