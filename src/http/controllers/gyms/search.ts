import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchGyms(req: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { q, page } = searchGymsQuerySchema.parse(req.query)

  try {
    const searchGymsUseCase = makeSearchGymsUseCase()
    const gyms = await searchGymsUseCase.execute({ page, query: q } )
    return reply.status(200).send(gyms)
  } catch (err) {
    throw err
  }

}
