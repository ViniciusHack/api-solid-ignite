import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validateCheckIn(req: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.params)

  try {
    const validateCheckInUseCase = makeValidateCheckInUseCase()
    await validateCheckInUseCase.execute({ checkInId } )
  } catch (err) {
    throw err
  }

  return reply.status(204).send()
}
