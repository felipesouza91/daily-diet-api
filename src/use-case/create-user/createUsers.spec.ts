import { describe, expect, test } from 'vitest'
import { CreateUserUseCase } from './createUseCase'

const data = {
  email: "sample@email.com",
  name: "John doe",
  password: "123456",
}
describe('Create User use case Test', () => {
  test('should findbyEmail resposistory is called', async () => {
    const sut = new CreateUserUseCase()
    const result = await sut.execute(data)
    expect(result).toBe(0)
  })
})
