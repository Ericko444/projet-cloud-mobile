import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonAvatar,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { home, alert, notifications } from 'ionicons/icons'
import Home from './pages/Home'
import Signaler from './pages/Signaler'
import Notifications from './pages/Notifications'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css';
import Detail from './pages/Detail';
import './theme/variables.css'
import Header from './components/Header'
import NotifTab from './components/NotifTab'

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Header></Header>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/detail/:id">
            <Detail/>
          </Route>
          <Route exact path="/detail">
            <Detail/>
          </Route>
          <Route exact path="/signaler">
            <Signaler />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Signaler" href="/signaler">
            <IonIcon icon={alert} />
            <IonLabel>Signaler</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Notifications" href="/notifications">
            <NotifTab></NotifTab>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)

export default App
