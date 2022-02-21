import { useState, useEffect } from 'react'
import { isPlatform } from '@ionic/react'

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Storage } from '@capacitor/storage'
import { Capacitor } from '@capacitor/core'
import { Upload } from 'tus-js-client'

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([])
  const [base64s, setBase64s] = useState<base64Photo[]>([]);

  const savePicture = async (
    photo: Photo,
    fileName: string,
  ): Promise<UserPhoto> => {
    let base64Data: string
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      })
      base64Data = file.data
    } else {
      base64Data = await base64FromPath(photo.webPath!)
    }
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    })

    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filePath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      }
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filePath: fileName,
        webviewPath: photo.webPath,
        dataBase64: base64Data
      }
    }
  }

  const takePhoto = async () => {
    // const cameraPhoto = await Camera.getPhoto({
    //   resultType: CameraResultType.Uri,
    //   source: CameraSource.Camera,
    //   quality: 100
    // });
    // const fileName = new Date().getTime() + '.jpeg';
    // const savedFileImage = await savePicture(cameraPhoto, fileName);
    // const newPhotos = [savedFileImage, ...photos];
    // setPhotos(newPhotos);
    const options = {
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 50
    }
    Camera.getPhoto(options).then((imageData) => {
      let base64Image = imageData;
      const newBase64s = [base64Image, ...base64s];
      setBase64s(newBase64s);
    });
    // Storage.set({key: PHOTO_STORAGE,value: JSON.stringify(newPhotos)});
  };
  const deletePhoto = (photo: base64Photo) => {
    const afterDelete = base64s.filter(p => p.dataUrl != photo.dataUrl);
    setBase64s(afterDelete);
  }
  // const takePhoto = async () => {
  //   const photo = await Camera.getPhoto({
  //     resultType: CameraResultType.Uri,
  //     source: CameraSource.Camera,
  //     quality: 100,
  //   })
  //   const fileName = new Date().getTime() + '.jpeg'
  //   const newPhotos = [
  //     {
  //       filePath: fileName,
  //       webviewPath: photo.webPath,
  //     },
  //     ...photos,
  //   ]
  //   setPhotos(newPhotos)
  // }

  return {
    photos,
    takePhoto,
    base64s,
    setBase64s,
    deletePhoto
  }
}
export interface UserPhoto {
  filePath: string
  webviewPath?: string
  dataBase64?: string
}

export interface base64Photo{
  dataUrl?: string,
  format?: string,
  saved?: boolean
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject('method did not return a string')
      }
    }
    reader.readAsDataURL(blob)
  })
}
