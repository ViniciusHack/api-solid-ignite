import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it("should be able to authenticate", async () => {
    const password = "123456"

    await usersRepository.create({
      name: 'John Doe',
      email: "john.doe@gmail.com",
      password_hash: await hash(password, 6)
    })

   const { user } =  await sut.execute({
      email: "john.doe@gmail.com",
      password
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should not be able to authenticate with wrong email", async () => {
    const password = "123456"

    await expect(
      () => sut.execute({
        email: "john.doe@gmail.com",
        password
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticate with wrong password", async () => {
    const password = "123456"

    await usersRepository.create({
      name: 'John Doe',
      email: "john.doe@gmail.com",
      password_hash: await hash(password, 6)
    })

    await expect(
      () => sut.execute({
        email: "john.doe@gmail.com",
        password: "123123"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
