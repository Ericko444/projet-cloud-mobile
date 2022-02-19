import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='toolbar'>
          <IonItem lines='none' className='tool-item'>
          <IonAvatar slot='start'>
            <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'></img>
          </IonAvatar>
          <IonLabel>
            <p>Hello,</p>
            <h3>RAKOTO Jean</h3>
          </IonLabel>
        </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
