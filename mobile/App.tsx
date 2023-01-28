import './src/lib/dayjs';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';

import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  

  //pegando notificações agendadas
  async function schedulePushNotification() {
   const schedule = await Notifications.getAllScheduledNotificationsAsync();
   console.log("Agendadas: ", schedule);
  

   if (schedule.length > 0) {
     await Notifications.cancelAllScheduledNotificationsAsync();
    }

    //adicionando tempo para enviar a notificação
    const trigger = new Date(Date.now());
    trigger.setHours(trigger.getHours() + 1);
    trigger.setSeconds(0);
    //trigger.setMinutes(trigger.getMinutes() + 1)

    //apresentação da notificação 
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Olá, Mônica! 😀",
        body: "Você praticou seus hábitos hoje?"
      },
      trigger
    });
  }

  useEffect(() => {
    schedulePushNotification();
  }, []);

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}