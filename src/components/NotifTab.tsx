import { IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { notifications } from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'
import './NotifTab.css'
import SockJs from 'sockjs-client'
import { Client, Message, Stomp } from '@stomp/stompjs'
import { SocketContext } from '../context/socket'

const NotifTab: React.FC = () => {
  const [notifs, setNotifs] = useState(0)
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
    // called when the client receives a STOMP message from the server
    if (message.body) {
      setNotifs(notifs + 1);
    } 
  }
  return (
    <>
      <IonIcon icon={notifications} className="notifIcon" />
      {notifs == 0 ? (
        <span className="notifBadgeTsisy"></span>
      ) : (
        <span className="notifBadge">{notifs}</span>
      )}
      <IonLabel className="notifTexte">Notifications</IonLabel>
    </>
  )
}

export default NotifTab
