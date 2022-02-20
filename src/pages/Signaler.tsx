import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react'
import { camera, addOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import ExploreContainer from '../components/ExploreContainer'
import { useLocation } from '../hooks/useLocation'
import { usePhotoGallery } from '../hooks/usePhotoGallery'
import './Signaler.css'
import styled from 'styled-components'
import { type } from 'os'
import { useHistory } from 'react-router'
import { Base64 } from '@ionic-native/base64';
import Header from '../components/Header'
import MarginHeader from '../components/MarginHeader'

interface CustomError {
  showError: boolean
  message?: string
}

interface CustomSuccess {
  showSuccess: boolean
  message?: string
}

interface TypeSignalement {
  id: string
  nom: string
}

const Signaler: React.FC = () => {
  useEffect(() => {
    TypeGet()
  }, [])
  const { photos, takePhoto, base64s, setBase64s } = usePhotoGallery()
  const [typeSignalement, setTypeSignalement] = useState<string>('')
  const [description, setDescription] = useState('')
  const { position, getLocation } = useLocation()
  const [error, setError] = useState<CustomError>({ showError: false })
  const [success, setSuccess] = useState<CustomSuccess>({ showSuccess: false })
  const [types, setTypes] = useState<TypeSignalement[]>([])
  const token =
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJVc2VyLTE1Iiwic3ViIjoicmFrb3RvYm9iQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2NDUzNDE1OTgsImV4cCI6MTY0NTk0MTU5OH0.KY9v-QhdbSk4T0f4OfC3_g4eNUsDCERX7ajZDltrfNgJjfAAEq0qyIw_ZoH8kYN9RicMbGWwbeEiRTLa67-xsw'
  const history = useHistory()
  const TypeGet = () => {
    fetch('https://projet-cloud-signal.herokuapp.com/api/typesignalement/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setTypes(result)
      })
      .catch((error) => alert('Erreur fetch types'))
  }
  const uploadSignalement = () => {
    var files: string[] = []
    // photos.forEach(async (photo) => {
    //   // var fileData = photo.dataBase64!
    //   var fileData = '';
    //   Base64.encodeFile(photo.webviewPath!).then((base64:string) => {
    //     fileData = base64;
    //   })
    //   files.push(fileData)
    // })
    base64s.forEach((element) => {
      files.push(element.dataUrl!)
    })
    var date = new Date().toISOString()
    date = date.slice(0, 19)
    getLocation()
    var ts = JSON.parse(typeSignalement)
    var signalement = {
      date: date,
      type: ts,
      longitude: position?.coords.longitude,
      latitude: position?.coords.latitude,
      description: description,
    }

    const arr = JSON.stringify(files)
    const sign = JSON.stringify(signalement)

    // alert(arr);

    // console.log(sign)

    var formData = new FormData()
    formData.append('signalement', sign)
    formData.append('images', arr)

    var url = 'https://projet-cloud-signal.herokuapp.com/api/signalement'

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setError({ showError: false, message: undefined })
        setSuccess({
          showSuccess: true,
          message: 'Votre signalement a été envoyé',
        })
        setBase64s([])
        setDescription('')
        setTypeSignalement('')
        history.push('/home')
      })
      .catch((error) => setError({ showError: true, message: error }))

    // console.log(JSON.stringify(dataForm))
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <MarginHeader></MarginHeader>
        <IonContent>
          <IonItem>
            <IonLabel position="stacked">Type de signalement</IonLabel>
            <select
              name="typeSignalement"
              value={typeSignalement}
              onChange={(e: any) => setTypeSignalement(e.target.value)}
            >
              {types.map((type) => (
                <option value={JSON.stringify(type)} key={type.id}>
                  {type.nom}
                </option>
              ))}
            </select>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(e: any) => setDescription(e.target.value)}
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Vos images</IonLabel>
            <IonGrid>
              <IonRow>
                {base64s.map((photo, index) => (
                  <IonCol size="4" key={index}>
                   <img src={photo.dataUrl}></img>
                  </IonCol>
                ))}
                <IonCol size="4">
                  <IonButton color="primary" className='tof' onClick={() => takePhoto()}>
                    <IonIcon icon={addOutline} className='tof-add'></IonIcon>
                    Ajouter
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonButton
            color="primary"
            expand="block"
            onClick={() => uploadSignalement()}
          >
            Valider signalement
          </IonButton>
        </IonContent>
      </IonContent>
      <IonToast
        isOpen={error.showError}
        message={error.message}
        onDidDismiss={() => setError({ message: undefined, showError: false })}
        duration={3000}
      ></IonToast>
      <IonToast
        isOpen={success.showSuccess}
        message={success.message}
        onDidDismiss={() =>
          setSuccess({ message: undefined, showSuccess: false })
        }
        duration={3000}
      ></IonToast>
    </IonPage>
  )
}

export default Signaler
