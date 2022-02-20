import { useState } from "react";
import {Geolocation, Geoposition} from '@ionic-native/geolocation';

interface LocationError{
    showError: boolean;
    message?: string;
}

export function useLocation(){
    const [loading, setLoading] = useState<boolean>(false);
    const [position, setPosition] = useState<Geoposition>();
    const [error, setError] = useState<LocationError>({ showError: false});
    const getLocation = async () => {
        try{
            const position = await Geolocation.getCurrentPosition();
            setPosition(position);
            setError({ showError: false, message: undefined});
            setLoading(false);
        }catch(e){
            const message = "Cannot get user location";
            alert(message);
            setError({ showError: true, message: message});
            setLoading(false);
        }
      }
    return{
        position,
        getLocation,
    }
}