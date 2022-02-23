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
import { useContext, useEffect, useState } from 'react'
import NotifListItem from '../components/NotifListItem'
import { SocketContext } from '../context/socket'

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

export interface Notification{
  idUser: string,
  idSignalement: string,
  date: string,
  message: string,
  isOpen: boolean
}

const SOCKET_URL = 'https://projet-cloud-signal.herokuapp.com/our-websocket'
const Notifications: React.FC = () => {
  const [notif, setNotif] = useState<CustomNotification>({ showNotif: false })
  const [listNotifs, setListNotifs] = useState<Notification[]>([]);
  useEffect(() => {
      GetNotifs();
    // setListNotifs(listNotifs);
  },[])
  const GetNotifs = () => {
    fetch('https://projet-cloud-signal.herokuapp.com/api/notification/user/'+localStorage.getItem("idUser"), {
      method: 'GET',
      
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setListNotifs(result);
      })
      .catch((error) => alert('Erreur fetch notifications'))
  }
  const SOCKET_URL = 'https://projet-cloud-signal.herokuapp.com/our-websocket';
  const socket = new SockJs(SOCKET_URL)
  const  stompClient = Stomp.over(socket);
  // const socket = useContext(SocketContext);
  stompClient.connect({}, onConnected);
  stompClient.activate();
  function onConnected() {
    console.log('Connected in signaler')
  }
  function onError() {
    console.log('Error in signaler')
  }
  stompClient.onConnect = function (frame) {
    console.log('In on connect')
    stompClient.subscribe('/topic/private-notifications/'+localStorage.getItem("idUser"), callback)
  }
  var callback = function (message: Message) {
    if (message.body) {
      console.log("Nisy notif");
      GetNotifs();
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
          {listNotifs.map((listNotif,k) => <NotifListItem key={k} data={listNotif} customClickEvent={() => {console.log("TAY ATONOO")}}></NotifListItem>)}
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
