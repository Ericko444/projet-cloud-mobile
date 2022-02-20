import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { home, notifications, alert } from 'ionicons/icons'

const Tabs: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="Home" href="/home">
        <IonIcon icon={home} />
        <IonLabel>Accueil</IonLabel>
      </IonTabButton>
      <IonTabButton tab="Signaler" href="/signaler">
        <IonIcon icon={alert} />
        <IonLabel>Signaler</IonLabel>
      </IonTabButton>
      <IonTabButton tab="Notifications" href="/notifications">
        <IonIcon icon={notifications} />
        <IonLabel>Notifications</IonLabel>
      </IonTabButton>
    </IonTabBar>
  )
}

export default Tabs
