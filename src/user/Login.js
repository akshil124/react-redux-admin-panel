import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {handlelogin ,checkuser ,getAllUser} from "../reducers/user"
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { toast } from 'react-toastify';
function Login(props){

  const profile = JSON.parse(localStorage.getItem("user"));
    const validationschema = yup.object({
      email : yup.string().required().matches(/^\S+@\S+\.\S+$/,"please enter valid email"),
      password : yup.string().required()
    })
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
      resolver : yupResolver(validationschema)
    });
    const state =useSelector((state)=> state.users.user)
    const users =useSelector((state)=> state.users.users)
    const err =useSelector((state)=> state.users.err)
    const navigate = useNavigate()
    const [user,setUser] = useState({})
    const Dispach = useDispatch()
    
    useEffect(()=>{
      Dispach(getAllUser())
    },[err])
  const handlecheck=async(data)=>{
    const check = users.find((l)=>l.email===data.email)
    const checkpassword = users.find((l)=> l.email===data.email&&l.password===data.password)
    console.log("err",checkpassword);
    if(check){
      if(checkpassword){
        Dispach(handlelogin(data))
        navigate("/dashboard")
      }else{
        toast.error("password does not match")
      }
    }
    else{
      toast.error("email is not exist")
    }
  }
  useEffect(()=>{
    Dispach(checkuser(profile))
  },[])
  useEffect(()=>{
    if(state?.firstName){
      navigate("/dashboard")
    }
    
  },[state])

  return (
    <>
        <section>
        <div className="container py-5 vh-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Login Form
                  </h3>
                  <form onSubmit={handleSubmit(handlecheck)}>
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            {...register("email")}
                          />
                          <label className="form-label" for="emailAddress">
                            Email
                          </label><br />
                          {errors.email&& <label className="text-danger">{errors.email.message}</label>}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="Password"
                            className="form-control form-control-lg"
                            {...register("password")}
                          />
                          <label className="form-label" for="firstName">
                            Password
                          </label><br />
                          {errors.password&& <label className="text-danger">{errors.password.message}</label>}
                        </div>
                      </div>
                    </div>


                   <div className="row">
                    <div className="col-6">
                        <label>Don't have an account?&nbsp;&nbsp;
                        <Link to="/signup">
                            Sign-up now
                        </Link>
                        </label>
                    </div>
                   </div>
                  

                    <div className=" pt-2">
                      <input
                        className="btn btn-primary "
                        type="Submit"
                        value="Submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login