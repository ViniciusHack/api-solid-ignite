import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearbyGyms(req: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query)

  try {
    const nearbyGymsUseCase = makeFetchNearbyGymsUseCase()
    await nearbyGymsUseCase.execute({ userLatitude: latitude, userLongitude: longitude } )
  } catch (err) {
    throw err
  }

  return reply.status(200).send()
}
