export interface User {
  id: string
  name: string
  photoUrl?: string
  password: string
  email: string
}

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<User | undefined>
}
