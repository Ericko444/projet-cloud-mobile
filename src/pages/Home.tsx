import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar,IonList,IonCardHeader,IonCardSubtitle,IonCardTitle,IonCard,IonCardContent, IonRow,IonGrid,IonCol,IonImg } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
// import check from '../assets/icon/checked.png';

const Home: React.FC = () => {
  const [erreur,setErreur]=useState('');
  const [signalements,setSignalements]=useState<any[]>([]);

  var token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJVc2VyLTE1Iiwic3ViIjoicmFrb3RvYm9iQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2NDUxMzM2MDksImV4cCI6MTY0NTczMzYwOX0.qrV2nMJZawIJw148hj0dAio5eWnh54lVXRtyO3jtuACQqlQV3JQCHwjtYll8drViL5kxmZR7SE3lOdVNW9TX7w';
  useEffect(()=>{
    SignalementGet();
},[])

  function getClassNameCol(signalement){
    if(signalement.dateTraitement==null && signalement.dateFinition==null){
        return "col-etat-envoye";
    }else if(signalement.dateFinition==null && signalement.dateTraitement!=null){
        return "col-etat-traitement";
    }else{
        return "col-etat-fini";
    }
  }
  function getIcon(signalement){
    if(signalement.dateTraitement==null && signalement.dateFinition==null){
        // return "assets/icon/pending.png";
        return "";
    }else if(signalement.dateFinition==null && signalement.dateTraitement!=null){
        // return "assets/icon/pending.png";
        return "";
    }else{
        return "assets/icon/checked.png";
    }
  }
  const SignalementGet=()=>{
    fetch("https://projet-cloud-signal.herokuapp.com/api/signalement/filter/",{
      method: 'GET',
      headers: {
        'Authorization':token,
      },
    })
      .then(res=>res.json())
      .then(
          (result)=>{
              console.log(result);
              setSignalements(result)
              setErreur('');
          }
      ).catch(error=>setErreur("Il s'est produit une erreur!"));
}
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
        {/* <ExploreContainer name="Home page" /> */}
        <p className="error-message">{erreur}</p>
        <IonList>
          {signalements.map((s,index)=>{
            var link="/detail/"+s.id;
            return(
              <IonItem key={index} href={link}>
              <IonGrid className="card-signalement">
                <IonRow>
                <IonCol size="0.1" className={getClassNameCol(s)}>
                  </IonCol>
                  <IonCol size="10">
                    <IonCardHeader>
                      <IonCardTitle>{s.type['nom']}</IonCardTitle>
                      <IonCardSubtitle>{s.date.replace('T'," ").slice(0,16)}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {s.description}
                    </IonCardContent>
                  </IonCol>
                  <IonCol size="1">
                    {getIcon(s)=="" ? "":<IonImg className="icon-signalement" src={getIcon(s)}/>}
                  </IonCol>
                </IonRow>
                
              </IonGrid>
              
          </IonItem>
            );
          })}
          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
