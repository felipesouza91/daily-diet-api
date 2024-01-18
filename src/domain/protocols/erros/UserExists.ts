import { AppError } from './AppError'

export class UserExits extends AppError {
  constructor() {
    super('User already exists')
  }
}
