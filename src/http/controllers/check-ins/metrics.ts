import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkInMetrics(req: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()
  
  const { checkInsCount } = await getUserMetricsUseCase.execute({ userId: req.user.sub })

  return reply.status(200).send({
    checkInsCount
  })
}
