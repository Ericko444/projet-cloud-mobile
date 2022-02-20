import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import MarginHeader from '../components/MarginHeader'
import './Notifications.css'

const Notifications: React.FC = () => {
 
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
