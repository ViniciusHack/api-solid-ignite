import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchGyms(req: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number()
  })

  const { q, page } = searchGymsQuerySchema.parse(req.query)

  try {
    const searchGymsUseCase = makeSearchGymsUseCase()
    await searchGymsUseCase.execute({ page, query: q } )
  } catch (err) {
    throw err
  }

  return reply.status(200).send()
}
