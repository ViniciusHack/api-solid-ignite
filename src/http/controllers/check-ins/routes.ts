import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { createCheckIn } from './create'
import { checkInHistory } from './history'
import { checkInMetrics } from './metrics'
import { validateCheckIn } from './validate'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)


  app.get('/check-ins/metrics', checkInMetrics)
  app.get('/check-ins/history', checkInHistory)
  app.post('/gyms/:gymId/check-ins', createCheckIn)
  app.patch('/check-ins/:checkInId/validate', validateCheckIn)
}
