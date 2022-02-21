import { IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { notifications } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import './NotifTab.css'
import SockJs from 'sockjs-client'
import { Client, Message, Stomp } from '@stomp/stompjs'

const SOCKET_URL = 'http://localhost:8080/our-websocket'
const NotifTab: React.FC = () => {
  const [notifs, setNotifs] = useState(0)
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
