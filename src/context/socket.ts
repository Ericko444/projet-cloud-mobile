import SockJs from 'sockjs-client'
import {CompatClient, Stomp } from '@stomp/stompjs'
import React from 'react';

const SOCKET_URL = 'https://projet-cloud-signal.herokuapp.com/our-websocket';
export const socket = new SockJs(SOCKET_URL)
export const  stompClient = Stomp.over(socket);
export const SocketContext = React.createContext<CompatClient>(stompClient);
  function onConnected() {
    console.log('Connected')
  }
  function onError() {
    console.log('Error')
  }