import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar,IonList,IonCardHeader,IonCardSubtitle,IonCardTitle,IonCardContent, IonRow,IonGrid,IonCol,IonImg, IonListHeader } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import MarginHeader from '../components/MarginHeader';
import './Home.css';
// import check from '../assets/icon/checked.png';

const Home: React.FC = () => {
  const [erreur,setErreur]=useState('');
  const [signalements,setSignalements]=useState<any[]>([]);

  var token = 'Bearer '+localStorage.getItem("token");
  useEffect(()=>{
    SignalementGet();
},[])

  function getClassNameCol(signalement:any){
    if(signalement.dateTraitement==null && signalement.dateFinition==null){
        return "col-etat-envoye";
    }else if(signalement.dateFinition==null && signalement.dateTraitement!=null){
        return "col-etat-traitement";
    }else{
        return "col-etat-fini";
    }
  }
  function getIcon(signalement:any){
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
        {/* <ExploreContainer name="Home page" /> */}
        <p className="error-message">{erreur}</p>
      <IonContent fullscreen>
        <br></br>
        <br></br>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Vos signalements</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader>Liste</IonListHeader>
        <IonList>
          {signalements.map((s,index)=>{
            var link="/homeContainer/detail/"+s.id;
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
