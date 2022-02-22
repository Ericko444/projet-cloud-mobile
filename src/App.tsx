import { Redirect, Route, Switch } from 'react-router-dom'
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
import './theme/variables.css'
import Detail from './pages/Detail'
import './theme/variables.css'
import Header from './components/Header'
import NotifTab from './components/NotifTab'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import HomeContainer from './components/homeContainer/HomeContainer'

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/">
          <Redirect to="/homeContainer"></Redirect>
        </Route>
        <Route path="/homeContainer" render={props => <HomeContainer {...props}></HomeContainer>}></Route>
      </Switch>
    </IonReactRouter>
  </IonApp>
)

export default App
