import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe("GetUserProfile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it("should be able to get user profile", async () => {
    const password = "123456"

    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: "john.doe@gmail.com",
      password_hash: await hash(password, 6)
    })

   const { user } =  await sut.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual("John Doe")
  })

  it("should not be able to get user profile with wrong id", async () => {
    await expect(
      () => sut.execute({
        userId: "non-existing-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
