import WebPush from 'web-push';
import { FastifyInstance } from "fastify"
import { z } from 'zod';


const publicKey = 'BAPKoizc0yNOjp7a28rmw0kaqljWgfThnEEyuRCUEHH34b2GnUhz5yIkZvS_UPGel4UMSonbn1MjwrgTT29SE7c';
const privateKey = 'H8aIgL3-xaiiWhc6fU5nShb4Bnm8bA8yu6ioGhO6v_I';

WebPush.setVapidDetails(
  'http://localhost:3333',
  publicKey,
  privateKey
)

export async function notificationRoutes(app: FastifyInstance) {
  //rota para o frontend recebar a chave publica
  app.get('/push/public_key', () =>{
    return{
      publicKey,
    }
  })


// essa rota seria para associar o id do usuario que aceitou receber notificação com o id do usuario logado
app.post('/push/register', (request, reply) =>{
  console.log(request.body)
  return reply.status(201).send()
})

//rota para enviar a notificação
app.post('/push/send', (request, reply) =>{
  const sendPushBody = z.object({
    subscription:z.object({
      endpoint:z.string(),
      keys:z.object({
        p256dh:z.string(),
        auth: z.string()
      })
    })
  })
  //pegando os dados do body
  const {subscription} = sendPushBody.parse(request.body)

  setTimeout(() =>{ //executará depois de 5 segundos
    WebPush.sendNotification(subscription, 'HELLO DO BACKEND')
    return reply.status(201).send()
  },5000)
 
})

}