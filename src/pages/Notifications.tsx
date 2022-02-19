import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import './Notifications.css';

const Notifications: React.FC = () => {
  return (
    <IonPage>
      <Header></Header>
      <IonContent fullscreen>
        <ExploreContainer name="Notifications page" />
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
