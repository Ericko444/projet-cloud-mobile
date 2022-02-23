import { IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { home, alert } from 'ionicons/icons'
import { match, RouteComponentProps } from 'react-router-dom'
import NotifTab from './NotifTab'
interface LelenaBavy{
    url: string
}

const CustomTabBar: React.FC<LelenaBavy> = ({url}) => {
  return (
    <>
      <IonTabButton tab="Home" href={url}>
        <IonIcon icon={home} />
        <IonLabel>Accueil</IonLabel>
      </IonTabButton>
      <IonTabButton tab="Signaler" href={`${url}/signaler`}>
        <IonIcon icon={alert} />
        <IonLabel>Signaler</IonLabel>
      </IonTabButton>
      <IonTabButton tab="Notifications" href={`${url}/notifications`}>
        <NotifTab></NotifTab>
      </IonTabButton>
    </>
  )
}

export default CustomTabBar
