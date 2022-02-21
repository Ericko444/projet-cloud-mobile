import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle, returnUpBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { Storage } from '@capacitor/storage';

const Login: React.FC = () => {
//   var token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJVc2VyLTE1Iiwic3ViIjoicmFrb3RvYm9iQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2NDUxMzM2MDksImV4cCI6MTY0NTczMzYwOX0.qrV2nMJZawIJw148hj0dAio5eWnh54lVXRtyO3jtuACQqlQV3JQCHwjtYll8drViL5kxmZR7SE3lOdVNW9TX7w';
  const history = useHistory();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [erreur, setErreur] = useState<string>("");


  const setToken = async (result) => {
    await Storage.set({
      key: 'token',
      value: result['token'],
    });
  };

  const getToken = async () => {
    const { value } = await Storage.get({ key: 'token' });
  
    alert(`Hello ${value}!`);
  };
    
  const handleLogin = (event: { preventDefault: () => void; }) => {
    // var storage: Storage
    event.preventDefault()
    const formData = new FormData()
    formData.append('login', email!)
    formData.append('mdp', password!)
    fetch('https://projet-cloud-signal.herokuapp.com/api/utilisateur/auth/login', {
      method: 'POST',
      body: formData
    })
    .then((res) => res.json())
    .then(result => {
        if(result['token']){
            setToken(result)
            getToken()
        }
        else{
            console.log(result['message']);
        }
    })
    .catch(error => {
        console.error(error);
    })
      
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Manaona</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
        <IonRow>
          <IonCol>
            <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
            />
          </IonCol>
        </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="floating"> Email</IonLabel>
            <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                >
            </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating"> Mot de passe</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                >
              </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleLogin}>Se connecter</IonButton>
              <p style={{ fontSize: "medium" }}>
                  Vous n'avez pas de compte? <a href="#">S'inscrire!</a>
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;