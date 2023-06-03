import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
// import { GymAlreadyExistsError } from './errors/gym-already-exists-error'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("CreateGym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it("should be able to create a gym", async () => {
   const { gym } = await sut.execute({
      title: "JavaScript Gyms",
      description: null,
      phone: null,
      latitude: -27.2092852,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

