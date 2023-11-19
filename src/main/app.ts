import Fastify from 'fastify'
import { userRouter } from '../routes/users'

const app = Fastify({
  logger: true,
})

app.register(userRouter)

export { app }
