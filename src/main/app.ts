import { userRouter } from '@/routes/users'
import Fastify from 'fastify'

const app = Fastify({
  logger: true,
})

app.register(userRouter)

export { app }
