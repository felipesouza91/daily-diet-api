import {
  FastifyInstance,
  FastifyRegisterOptions,
  RegisterOptions,
} from 'fastify'

export async function userRouter(
  fastify: FastifyInstance,
  options: FastifyRegisterOptions<RegisterOptions>,
) {
  fastify.post('/users', (request, reponse) => {
    console.log('')
    return { menssage: 'Teste' }
  })
}
