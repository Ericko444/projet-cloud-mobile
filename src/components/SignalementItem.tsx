import { IonItem, IonLabel, IonNote } from "@ionic/react";

interface TypeSignalement{
    id: string,
    nom: string
}
interface Region{
    id: string,
    nom: string,
    chefLieuDeRegion: string,
    longitude: number,
    latitude: number
}
interface Signalement{
    id: string,
    region: Region,
    idUtilisateur: string,
    date: Date
    typeSignalement: TypeSignalement,
    longitude: number,
    latitude: number,
    description: string,
    dateTraitement: Date,
    dateFinition: Date,
    photos: string[]
}

interface ListSignalementProps{
    signalement: Signalement
}

const SignalementItem: React.FC<ListSignalementProps> = ({ signalement }) => {
    return(
        <IonItem routerLink={`/signalement/${signalement.id}`} detail={false}>
            <div slot="start" className="dot dot-unread"></div>
            <IonLabel className="ion-text-wrap">
                <h2>
                    {signalement.typeSignalement.nom}
                    <span className="date">
                        <IonNote>{signalement.date}</IonNote>
                    </span>
                </h2>
                <h3>{signalement.description}</h3>
            </IonLabel>
        </IonItem>
    );
}

export default SignalementItem;