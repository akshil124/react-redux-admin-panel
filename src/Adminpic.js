import React, { useEffect } from 'react'
import Pic from "./pic/admin-pic.png"
function Adminpic(props) {
  useEffect(()=>{
    props.handleprogress(100)
  },[])
  return (
    <div>
        <img src={Pic}  width="100%" height={"685vh"}/>
    </div>
  )
}

export default Adminpic