import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {

    if(localStorage.getItem("userToken")) {
      //go to the protected component
      return props.children;
    } else {
      //go to the login page
      return <Navigate to="/login"  />
    }
    

}
