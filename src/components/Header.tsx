import {
  IonAvatar,
  IonHeader,
  IonItem,
  IonLabel,
  IonToolbar,
} from '@ionic/react'

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar className="toolbar">
        <IonItem lines="none" className="tool-item">
          <IonAvatar slot="start">
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"></img>
          </IonAvatar>
          <IonLabel>
            <p>Hello,</p>
            <h3>RAKOTO Jean</h3>
          </IonLabel>
        </IonItem>
      </IonToolbar>
    </IonHeader>
  )
}

export default Header
