import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import MarginHeader from '../components/MarginHeader';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <MarginHeader></MarginHeader>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Vos signalements</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader>Liste</IonListHeader>
        <IonList>
          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
