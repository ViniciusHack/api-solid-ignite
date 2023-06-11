import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  async searchMany(query: string, page: number) {
    return this.items.filter(item => item.title.includes(query)).slice((page -1) * 20, page * 20)
  }
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find(gym => gym.id === id)

    if(!gym) {
      return null
    }

    return gym
  }

  async create({ id, title, description, phone, latitude, longitude}: Prisma.GymUncheckedCreateInput) {
    const gym = {
      id: id ?? randomUUID(),
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString())
    }

    this.items.push(gym)

    return gym
  }
}