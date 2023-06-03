import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let usersRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("CheckIn Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(usersRepository, gymsRepository)
    gymsRepository.items.push({
      id: 'gym-01',
      title: "JavaScript Gym",
      description: "",
      latitude: new Decimal(-27.2092852),
      longitude: new Decimal(-49.6401091),
      phone: ""
    })
    
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {

   const { checkIn } =  await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -27.2092852,
      userLongitude: -49.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0))

   await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -27.2092852,
      userLongitude: -49.6401091
    })

    await expect(sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -27.2092852,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0))

   await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -27.2092852,
      userLongitude: -49.6401091
    })

    vi.setSystemTime(new Date(2020, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -27.2092852,
      userLongitude: -49.6401091
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in on a distant gym", async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() => sut.execute({
      userId: "user-01",
      gymId: "gym-02",
      userLatitude: -27.2092852,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(Error)
  })
})
