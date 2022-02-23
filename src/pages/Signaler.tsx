import {
  IonActionSheet,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTextarea,
  IonToast,
} from '@ionic/react'
import { addOutline, trash, close } from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from '../hooks/useLocation'
import { base64Photo, usePhotoGallery } from '../hooks/usePhotoGallery'
import './Signaler.css'
import { useHistory } from 'react-router'
import MarginHeader from '../components/MarginHeader'
import SockJs from 'sockjs-client'
import { Client, Message, Stomp } from '@stomp/stompjs'
import { SocketContext } from '../context/socket'

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

const SOCKET_URL = 'https://projet-cloud-signal.herokuapp.com/our-websocket'
const Signaler: React.FC = () => {
  useEffect(() => {
    TypeGet()
  }, [])
  const {
    photos,
    takePhoto,
    base64s,
    setBase64s,
    deletePhoto,
  } = usePhotoGallery()
  const [photoDelete, setPhotoDelete] = useState<base64Photo>()
  const [typeSignalement, setTypeSignalement] = useState<string>('')
  const [description, setDescription] = useState('')
  const { position, getLocation } = useLocation()
  const [error, setError] = useState<CustomError>({ showError: false })
  const [success, setSuccess] = useState<CustomSuccess>({ showSuccess: false })
  const [types, setTypes] = useState<TypeSignalement[]>([])
  const [wasReceivedByServer, setWasReceivedByServer] = useState<boolean>(false)
  const token = 'Bearer '+localStorage.getItem("token");
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
 const SOCKET_URL = 'https://projet-cloud-signal.herokuapp.com/our-websocket';
 const socket = new SockJs(SOCKET_URL)
  // const socket = useContext(SocketContext);
 const  stompClient = Stomp.over(socket);
  stompClient.connect({}, onConnected);
  stompClient.activate();
  function onConnected() {
    console.log('Connected in signaler')
  }
  function onError() {
    console.log('Error in signaler')
  }
  stompClient.onConnect = function (frame) {
    console.log('In on connect')
    stompClient.subscribe('/topic/private-messages/'+localStorage.getItem("idUser"), callback)
  }
  var callback = function (message: Message) {
    if (message.body) {
      setWasReceivedByServer(true)
      setSuccess({showSuccess: true, message: message.body})
    } else {
      console.log('WTF')
    }
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
        console.log("wasReceived", wasReceivedByServer);
        if (wasReceivedByServer) {
          console.log(result)
          setError({ showError: false, message: undefined })
          setSuccess({
            showSuccess: true,
            message: 'Votre signalement a été envoyé',
          })
          setBase64s([])
          setDescription('')
          setTypeSignalement('')
          setWasReceivedByServer(false)
          history.push('/homeContainer')
        }
        else{
          setError({ showError: true, message: "Pas inséré" })
        }
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
                    <IonImg
                      src={photo.dataUrl}
                      onClick={() => setPhotoDelete(photo)}
                    ></IonImg>
                  </IonCol>
                ))}
                <IonCol size="4">
                  <IonButton
                    color="light"
                    className="tof"
                    onClick={() => takePhoto()}
                  >
                    <IonIcon icon={addOutline} className="tof-add"></IonIcon>
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

      <IonActionSheet
        isOpen={!!photoDelete}
        buttons={[
          {
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoDelete) {
                deletePhoto(photoDelete)
                setPhotoDelete(undefined)
              }
            },
          },
          {
            text: 'Cancel',
            icon: close,
            role: 'cancel',
          },
        ]}
        onDidDismiss={() => setPhotoDelete(undefined)}
      ></IonActionSheet>
    </IonPage>
  )
}

export default Signaler
