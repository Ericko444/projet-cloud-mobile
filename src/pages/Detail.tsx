import {
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonListHeader,
  IonList,
  IonRow,
  IonGrid,
  IonCol,
  IonImg,
  IonText,
} from '@ionic/react'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import './Detail.css'
import MarginHeader from '../components/MarginHeader'

const Detail: React.FC = () => {
  const [erreur, setErreur] = useState('')
  const [signalement, setSignalement] = useState<any>()

  function getClassNameHeader(signalement: any) {
    if (signalement !== undefined) {
      if (
        signalement.dateTraitement === null &&
        signalement.dateFinition === null
      ) {
        return 'header-detail-envoye'
      } else if (
        signalement.dateFinition === null &&
        signalement.dateTraitement !== null
      ) {
        return 'header-detail-traitement'
      } else {
        return 'header-detail-fini'
      }
    }
    return 'header-detail-envoye'
  }
  function getEtat(signalement: any) {
    if (signalement !== undefined) {
      if (
        signalement.dateTraitement === null &&
        signalement.dateFinition === null
      ) {
        return 'Envoyé aux responsables'
      } else if (
        signalement.dateFinition === null &&
        signalement.dateTraitement !== null
      ) {
        return 'En cours de traitement'
      } else {
        return 'header-detail-fini'
      }
    }

    return 'Envoyé aux responsables'
  }
  // const search = useLocation().search;
  //   const id2 = new URLSearchParams(search).get('id');
  var token =
    'Bearer '+localStorage.getItem("token");
  // const { id } = useParams();
  let { id } = useParams<{ id: string }>()
  // var id2=match.params.id;
  useEffect(() => {
    SignalementGet()
  }, [])
  const SignalementGet = () => {
    // alert(id);
    fetch('https://projet-cloud-signal.herokuapp.com/api/signalement/' + id, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setSignalement(result)
        setErreur('')
      })
      .catch((error) => setErreur("Il s'est produit une erreur!"))
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <MarginHeader></MarginHeader>
        <IonGrid>
          <IonListHeader className={getClassNameHeader(signalement)}>
            <IonTitle>
              {signalement !== undefined ? signalement.type['nom'] + ' du' : ''}{' '}
              {signalement !== undefined ? signalement.date.slice(0, 10) : ''}
            </IonTitle>
          </IonListHeader>
          <IonList>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonCol size="4" className="text-style">
                    Region:
                  </IonCol>
                  <IonCol size="8">
                    <IonText>
                      {(signalement == undefined || signalement.region == null)
                        ? 'Non défini'
                        : signalement.region}
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem className="div-desc">
              <IonGrid className="div-desc">
                <IonRow className="div-desc">
                  <IonCol size="4" className="text-style">
                    Description:
                  </IonCol>
                  <IonCol size="8">
                    <div className="div-desc">
                      <IonText>
                        {signalement == undefined ||
                        signalement.description == null
                          ? '-'
                          : signalement.description}
                      </IonText>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonCol size="4" className="text-style">
                    Etat actuel:
                  </IonCol>
                  <IonCol size="8">{getEtat(signalement)}</IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonList>
          <IonListHeader className="header-image">
            <IonLabel>IMAGES ENVOYEE(S)</IonLabel>
          </IonListHeader>
          <IonGrid>
            <IonRow>
              {signalement == undefined
                ? 'Aucune image'
                : signalement.photos.map((p: any, i: any) => (
                    <IonCol
                      size="4"
                      key={i}
                      className={(i + 1) % 3 !== 0 ? 'image' : 'image'}
                    >
                      <IonImg
                        src={`https://firebasestorage.googleapis.com/v0/b/projet-signalement.appspot.com/o/${p}?alt=media`}
                      />
                    </IonCol>
                  ))}
            </IonRow>
          </IonGrid>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
export default Detail
