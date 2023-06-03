import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  longitude: number;
  latitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({ description, latitude, longitude, phone, title }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title
    });

    if(!gym) {
      throw new ResourceNotFoundError();
    }

    return { gym }
  }
}