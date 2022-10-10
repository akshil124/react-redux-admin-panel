import './App.css';
import {Routes ,Route, Navigate, json, Outlet, useLocation} from "react-router-dom"
import Signup from './user/Signup';
import Login from './user/Login';
import Dashboard from './Dashboard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Allusers from './user/Allusers';
import Adminpic from './Adminpic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import Blog from './blog/createBlog';
import Viewblogs from './blog/Viewblogs';
import CustomRoutes from './CustomRoutes';
function App() {
  const [progress,setProgress] = useState(0)
  const [preLoaction,setPreLoaction] = useState("")
  const handleprogress = (num)=>{
    // setProgress(num)
  }
  // const loaction = useLocation()

  // useEffect(()=>{
    
  //   setPreLoaction(loaction.pathname)
  //       setProgress(100) 
  //       if(location.pathname === preLoaction){
  //         setPreLoaction("")
  //       }    
  // },[location])

  // useEffect( () => {
  //   setProgress(0)
  // },[preLoaction])

  return (
  <>
   <LoadingBar  progress={progress}/>
    <CustomRoutes>
      <Route path='/' element={<Login handleprogress={handleprogress}/>} />
      <Route path='/signup' element={<Signup handleprogress={handleprogress}/>} />
      <Route path='/dashboard' element={<Dashboard handleprogress={handleprogress}/>} >
        <Route index element={<Adminpic handleprogress={handleprogress}/>} />
        <Route path='users' element={<Allusers handleprogress={handleprogress}/>} />
        <Route path='createblog' element={<Blog handleprogress={handleprogress}/>} />
        <Route path='viewblog' element={<Viewblogs handleprogress={handleprogress}/>} />
      </Route>
    </CustomRoutes>
    <ToastContainer />
   </>
  );
}

export default App;
