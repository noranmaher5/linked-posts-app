import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import CounterContextProvider from './Context/CounterContext';


const x= createBrowserRouter([
  {path : "" ,
     element: <Layout/>, 
     children: [
    {index: true, element: <Home/>},
 { path: "profile", element: <Profile /> },
{ path: "login", element: <Login /> },
{ path: "register", element: <Register /> },

    {path: "*", element: <NotFound/>},
  ],
  },


]);

function App() {
  

  return (
    <>
    <CounterContextProvider>
      <RouterProvider router={x}></RouterProvider>
    </CounterContextProvider>

    </>
  )
}

export default App
