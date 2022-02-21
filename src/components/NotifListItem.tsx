import { IonItem, IonLabel, IonNote } from '@ionic/react'
import { TraitementNotif } from '../pages/Notifications'
import './NotifListItem.css'


interface NotifItemProps {
  data: TraitementNotif
}

const NotifListItem: React.FC<NotifItemProps> = ({ data }) => {
  return (
    <IonItem routerLink={`/detail/${data.idSignalement}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {data.type}
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
