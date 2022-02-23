import { useState } from "react";

export function UseAuth(){
    const[loggedIn, setLoggedIn] = useState<boolean>(false);

    const getToken = () =>{
        const tok = localStorage.getItem("token");
        if(tok){
            setLoggedIn(true);
        }
    }

    return{
        loggedIn,
        getToken
    }
}