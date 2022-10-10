import React from 'react'
import { Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';
import { useEffect, useState } from 'react';
import {Route, Navigate, json, Outlet, useLocation} from "react-router-dom"

function CustomRoutes({children}) {
    const [progress, setProgress] = useState(0)
   const [prevLoc, setPrevLoc] = useState("")
   const location = useLocation()

   useEffect(() => {
    if(location.pathname !== prevLoc){
        setPrevLoc(location.pathname)
        setProgress(100)
    }
   }, [location])

   useEffect(() => {
    if(progress != 0)
      setProgress(0)
   }, [prevLoc])
  return (
    <>
    <LoadingBar  progress={progress}/>
    <Routes>
    {children}
    </Routes>
    </>
  )
}

export default CustomRoutes