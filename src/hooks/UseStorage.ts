import { Storage } from '@capacitor/storage'
import { useState } from 'react'

export function UseStorage() {
  const [tok, setTok] = useState<string>();
  const getToken = async () => {
    console.log("Maka token");
    Storage.get({ key: 'token' }).then((token) => {
      setTok(token.value!);
    })
  }

  const getTokenAwait =  () => {
    Storage.get({ key: 'token' }).then((value) => {
      setTok(value.value!);
    });
    console.log("TAYYYY", tok)
  };

  return{
    tok,
    getToken
  }

}
