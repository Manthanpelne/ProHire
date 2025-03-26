import { SignedIn, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
  const {isSignedIn, user, isLoaded} = useUser()
  const {pathname} = useLocation()

  if(isLoaded && !isSignedIn && isSignedIn!==undefined){
    return <Navigate to="/?sign-in=true"/>
  }
   
  
  //check if user is onboarded or not. if not, make him onboard first
  if(user !== undefined && !user?.unsafeMetadata?.role && pathname !== "/onboarding")

  return <Navigate to = "/onboarding" />
  return children;
}
