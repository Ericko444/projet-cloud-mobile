import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Notifications.css'
import SockJs from 'sockjs-client'
import { Client, Message, Stomp } from '@stomp/stompjs'
import Header from '../components/Header'
import MarginHeader from '../components/MarginHeader'

const SOCKET_URL = 'https://projet-cloud-signal.herokuapp.com/our-websocket'
const Notifications: React.FC = () => {
  const socket = new SockJs(SOCKET_URL)
  var stompClient = Stomp.over(socket)
  stompClient.connect({}, onConnected)
  function onConnected() {
    console.log("Connected");
  }
  function onError(){
    console.log("Error");
  }
  stompClient.onConnect = function (frame) {
    console.log("In on connect");
    stompClient.subscribe('/topic/private-messages/User-15', callback);
  };
  stompClient.activate();
  var callback = function (message:Message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      alert('got message with body ' + message.body);
    } else {
      alert('got empty message');
    }
  };
  return (
    <IonPage>
      <IonContent fullscreen>
      <MarginHeader></MarginHeader>
        <ExploreContainer name="Notifications page" />
      </IonContent>
    </IonPage>
  )
}

export default Notifications
