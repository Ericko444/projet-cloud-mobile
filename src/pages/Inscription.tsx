import React, { useState } from 'react';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonDatetime,
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonRange,
  IonItem,
  IonInput,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonText,
  IonCol,
} from '@ionic/react';

import './Inscription.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";


const Inscription: React.FunctionComponent = () => {
  const history = useHistory()  
  var today = new Date();
  const [startDate, setStartDate] = useState(new Date());

  var curr =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      login: '',
      dateDeNaissance: '',
      nom: '',
      prenom: '',
      sexe: '',
      mdp: '',
      conf: '',
    },
  });

  /**
   *
   * @param data
   */
  const onSubmit = (data: any) => {
    delete data.conf;
    var json = JSON.stringify(data, null, 2);
    const formData = new FormData()
    formData.append('login', data.login!)
    formData.append('mdp', data.mdp!)
    console.log("LOG>>"+data.login!);
    console.log("MDP>>"+data.mdp!);
    fetch(
      'https://projet-cloud-signal.herokuapp.com/api/utilisateur/inscription',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: json,
      },
    )
      .then((res) => res.json())
      .then((result) => {
        if(result['error']){
          if(result['message'].includes('passe')){
            setError('mdp', {
              type: 'manual',
              message: result['message'],
            });
          }
          if(result['message'].includes('Login')){
            setError('login', {
              type: 'manual',
              message: result['message'],
            });
          }
        }
        else{
          fetch(
            'https://projet-cloud-signal.herokuapp.com/api/utilisateur/auth/login',
            {
              method: 'POST',
              body: formData,
            },
          )
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result['token']) {
                localStorage.setItem('token', result['token'])
                localStorage.setItem('idUser', result['id'])
                localStorage.setItem('login', result['login'])
                history.push('/homeContainer');
              } else {
                console.log(result['message'])
              }
            })
            .catch((error) => {
              console.error(error)
            })
        };
      })
      .catch((error) => {
        console.error(error)
      })

  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Inscription</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* === ION INPUT === */}
            <IonItem>
              <IonLabel>Nom</IonLabel>
              <IonInput
                {...register('nom', {
                  required: 'Vous devez remplir ce champ',
                })}
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="nom"
              as={<div style={{ color: 'red' }} />}
            />

            {/* === ION INPUT === */}
            <IonItem>
              <IonLabel>Pr&eacute;nom</IonLabel>
              <IonInput
                {...register('prenom', {
                  required: 'Vous devez remplir ce champ',
                })}
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="prenom"
              as={<div style={{ color: 'red' }} />}
            />

            {/* === ION INPUT === */}
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                {...register('login', {
                  required: 'Vous devez remplir ce champ',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Le format d'email n'est pas valide",
                  },
                })}
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="login"
              as={<div style={{ color: 'red' }} />}
            />

            {/* === ION INPUT === */}
            <IonItem>
              <IonLabel>Mot de passe</IonLabel>
              <IonInput
                type="password"
                {...register('mdp', {
                  required: 'Vous devez remplir ce champ',
                  pattern: {
                    value: /[^^`éèêâàûùîìôò]/i,
                    message: 'Ne doit pas contenir des accents',
                  },
                  minLength: {
                    value: 8,
                    message: 'Au moins 8 caracteres',
                  },
                })}
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="mdp"
              as={<div style={{ color: 'red' }} />}
            />

            {/* === ION INPUT === */}
            <IonItem>
              <IonLabel>Confirmer</IonLabel>
              <IonInput
                type="password"
                {...register('conf', {
                  required: 'Vous devez remplir ce champ',
                  validate: (value) => value === getValues('mdp'),
                })}
              />
            </IonItem>
            {errors.conf && errors.conf.type === 'validate' && (
              <div style={{ color: 'red' }}>Mot de passe ne correspond pas</div>
            )}

            {/* === ION DATE TIME === */}
            <IonItem>
              <IonLabel>Date de naissance</IonLabel>
              <IonInput
                type="text"
                {...register('dateDeNaissance', {
                  required: 'Vous devez remplir ce champ',
                })}
                placeholder={"AAAA-MM-JJ"}
              />
            </IonItem>

            {/* === ION RADIO === */}
            <IonItem>
              <IonText>
                <div style={{ padding: 8, paddingLeft: 0, fontWeight: 'bold' }}>
                  Sexe
                </div>
                <div>
                  <IonRadioGroup
                    style={{ display: 'flex', width: '130%' }}
                    {...register('sexe', { required: true })}
                    defaultValue={getValues('sexe')}
                    onIonChange={(e) => setValue('sexe', e.detail.value)}
                  >
                    <IonItem
                      lines="none"
                      style={{
                        flex: 1,
                      }}
                    >
                      <IonLabel position="fixed">Homme</IonLabel>
                      <IonRadio slot="start" value="M" />
                    </IonItem>

                    <IonItem style={{ flex: 2 }} lines="none">
                      <IonLabel position="fixed">Femme</IonLabel>
                      <IonRadio slot="start" value="F" />
                    </IonItem>
                  </IonRadioGroup>
                </div>
              </IonText>
            </IonItem>
            {errors.sexe && (
              <span style={{ color: 'red' }}>Vous devez remplir ce champ</span>
            )}

            <div>
            <IonCol>
              <IonButton type="submit" expand="block">
                S'inscrire
              </IonButton>
              <p style={{ fontSize: 'medium' }}>
                Vous avez d&eacute;j&agrave; un compte? <Link to="/login">Se connecter</Link>
              </p>
            </IonCol>
            </div>
          </form>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Inscription;
