import { Header } from './components/Header';
import { SummaryTable } from './components/SummaryTable';
import { api } from './lib/axios';
import './lib/dayjs'
import './styles/global.css';

navigator.serviceWorker.register('server-worker.js')
.then(async ServiceWorker => {
  let subscription = await ServiceWorker.pushManager.getSubscription()//verificando se o usuario já tem uma iscrição ativa

  if(!subscription){//se ele não tiver criaremos uma nova inscrição
    const publicKeyResponse = await api.get('/push/public_key') //pegando a public key lá do backend via axios
    
    subscription = await ServiceWorker.pushManager.subscribe({ 
      userVisibleOnly:true,
      applicationServerKey: publicKeyResponse.data.publicKey,
    })
  }
  await api.post('/push/register',{
    subscription,
  })

  await api.post('/push/send',{
    subscription,
  })
 
})





export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header/>
        <SummaryTable/>
      </div>
    </div>
  )
}

