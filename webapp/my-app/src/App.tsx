import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthProvider, AuthProviderProps, useAuth } from 'oidc-react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const Callback = () => {
  const {  userManager, userData} = useAuth();
    useEffect(() => {
    const fetchTest = async () => {
      const response = await fetch('https://oktatestfnapp.azurewebsites.net/api/garytest', {headers: {
        Authorization: `Bearer ${userData?.access_token}`
      }})
      const data = await response.json()
      console.log({data})
    }
    fetchTest()
  }, [userData])
  return (
    <div><p>{userData?.access_token}</p></div>
  ) 
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login/callback",
    element: <Callback />,
  }
]);

const oidcConfig : AuthProviderProps = {
  onSignIn: () => {
    console.log("onSignIn")
  },
  authority: 'https://dev-56089123.okta.com/oauth2/aus934m1fmAYT5lN95d7',
  clientId: '0oa936u00r4eE67Ak5d7',
  redirectUri: 'http://localhost:3000/login/callback',
  scope: 'openid profile api_access',

};

const App : React.FC = () => {
  // useEffect(() => {
  //   const fetchTest = async () => {
  //     const response = await fetch('https://oktatestfnapp.azurewebsites.net/api/garytest')
  //     const data = await response.json()
  //     console.log({data})
  //   }
  //   fetchTest()
  // }, [])
  return (<AuthProvider {...oidcConfig}><RouterProvider router={router} /></AuthProvider>)
}


export default App;
