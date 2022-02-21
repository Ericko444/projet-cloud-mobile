import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Notifications.css'
import SockJs from 'sockjs-client'
import { Client, Message, Stomp } from '@stomp/stompjs'
import Header from '../components/Header'
import MarginHeader from '../components/MarginHeader'
import { useEffect, useState } from 'react'
import NotifListItem from '../components/NotifListItem'

interface CustomNotification {
  showNotif: boolean
  message?: string
}

export interface TraitementNotif {
  idSignalement: string
  type: string
  date: string
  typeTraitement: string
  message: string
}

const SOCKET_URL = 'http://localhost:8080/our-websocket'
const Notifications: React.FC = () => {
  useEffect(() => {
    
  })
  const [notif, setNotif] = useState<CustomNotification>({ showNotif: false })
  const [listNotifs, setListNotifs] = useState<TraitementNotif[]>([]);
  const socket = new SockJs(SOCKET_URL)
  var stompClient = Stomp.over(socket)
  stompClient.connect({}, onConnected)
  function onConnected() {
    console.log('Connected')
  }
  function onError() {
    console.log('Error')
  }
  stompClient.onConnect = function (frame) {
    console.log('In on connect')
    stompClient.subscribe('/topic/private-notifications/User-5', callback)
  }
  stompClient.activate()
  var callback = function (message: Message) {
    if (message.body) {
      var msg:TraitementNotif = JSON.parse(message.body)
      setNotif({ showNotif: true, message: msg.message })
      setListNotifs([msg, ...listNotifs]);
    }
    else{
      console.log("WTF")
    }
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <MarginHeader></MarginHeader>
        <IonList>
          {listNotifs.map((listNotif,k) => <NotifListItem key={k} data={listNotif}></NotifListItem>)}
        </IonList>
      </IonContent>
      <IonToast
        isOpen={notif.showNotif}
        message={notif.message}
        onDidDismiss={() => {
          setNotif({ showNotif: false, message: undefined })
        }}
        duration={4000}
      ></IonToast>
    </IonPage>
  )
}

export default Notifications
