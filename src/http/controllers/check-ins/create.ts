import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCheckIn(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)
  const { gymId } = createCheckInParamsSchema.parse(req.query)

  try {
    const checkInUseCase = makeCheckInUseCase()
    await checkInUseCase.execute({ userLatitude: latitude, userLongitude: longitude, gymId, userId: req.user.sub } )
  } catch (err) {
    throw err
  }

  return reply.status(201).send()
}
