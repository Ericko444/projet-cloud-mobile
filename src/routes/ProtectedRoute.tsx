import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { UseStorage } from '../hooks/UseStorage'
import { Storage } from '@capacitor/storage'
import { useIonViewWillEnter } from '@ionic/react'


interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  path: string;
  isAuthenticated: boolean
}


// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, path, isAuthenticated }) => {

//   useEffect(() => {
//     console.log("from protected ROUTE", isAuthenticated)
//   }, [])

// return (
//     <Route path={path} render={() => isAuthenticated ? <Component /> : <Redirect to="/login" />} />
//   );
// };

const ProtectedRoute = ({ children, ...rest }) => {
  // useIonViewWillEnter(async () => {
  //   const { value } = await Storage.get({ key: 'token' })
  //   setToken(value!)
  // })
  // useEffect(() => {
  //   //   async function getToken() {
  //   //     const {value} = await Storage.get({ key: 'token' });
  //   //     setToken(value!);
  //   // }
  //   getTokenAwait()
  // }, [])
  // console.log(token)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
export default ProtectedRoute
