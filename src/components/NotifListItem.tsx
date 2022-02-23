import { IonItem, IonLabel, IonNote } from '@ionic/react'
import { TraitementNotif, Notification } from '../pages/Notifications'
import './NotifListItem.css'


interface NotifItemProps {
  data: Notification
  customClickEvent: any
}

const NotifListItem: React.FC<NotifItemProps> = ({ data, customClickEvent }) => {
  return (
    <IonItem routerLink={`/homeContainer/detail/${data.idSignalement}`} detail={false}>
      {data.isOpen ? "" : <div slot="start" className="dot dot-unread" onClick={customClickEvent}></div>}
      <IonLabel className="ion-text-wrap">
        <h2>
          <span className="date">
            <IonNote>{data.date}</IonNote>
          </span>
        </h2>
        <p>
          {data.message}
        </p>
      </IonLabel>
    </IonItem>
  )
}

export default NotifListItem
