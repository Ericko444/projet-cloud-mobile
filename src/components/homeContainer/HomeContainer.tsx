import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { home, alert } from 'ionicons/icons'
import { Redirect, Route, RouteComponentProps } from 'react-router'
import { UseAuth } from '../../hooks/useAuth'
import Detail from '../../pages/Detail'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Notifications from '../../pages/Notifications'
import Signaler from '../../pages/Signaler'
import Header from '../Header'
import NotifTab from '../NotifTab'

const HomeContainer: React.FC<RouteComponentProps> = ({ match }) => {
  if(!localStorage.getItem("token")){
    return(
      <Redirect to="/login"></Redirect>
    )
  }
  return (
    <IonReactRouter>
      <Header></Header>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path={match.url}>
            <Home />
          </Route>
          <Route exact path={`${match.url}/detail/:id`}>
            <Detail />
          </Route>
          <Route exact path={`${match.url}/signaler`}>
            <Signaler />
          </Route>
          <Route exact path={`${match.url}/notifications`}>
            <Notifications />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href={match.url}>
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Signaler" href={`${match.url}/signaler`}>
            <IonIcon icon={alert} />
            <IonLabel>Signaler</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Notifications" href={`${match.url}/notifications`}>
            <NotifTab></NotifTab>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )
}

export default HomeContainer
