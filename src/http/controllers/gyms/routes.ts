import { verifyUserRole } from '@/http/middlewares/only-admin'
import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { createGym } from './create'
import { nearbyGyms } from './nearby'
import { searchGyms } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)


  app.get('/gyms/nearby', nearbyGyms)
  app.get('/gyms/search', searchGyms)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')]}, createGym)
}
