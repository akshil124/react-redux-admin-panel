import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {handlesubmit , getAllUser} from "../reducers/user"
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { toast } from 'react-toastify';
function Signup(props) {
  const validationschema = yup.object({
    firstName : yup.string().required().matches(/^[a-zA-Z\s]+$/,"please enter valid name"),
    lastName : yup.string().required().matches(/^[a-zA-Z\s]+$/,"please enter valid name"),
    email : yup.string().required().matches(/^\S+@\S+\.\S+$/,"please enter valid email"),
    password : yup.string().required(),
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"A password contains at least eight characters, including at least one number and includes both lower and uppercase letters and special characters"),
    date : yup.string().required(),
    number : yup.string().required().min(10).max(10),
    gender : yup.string().required(),
    languages : yup.array().required()
  })
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver : yupResolver(validationschema)
  });
  const users = useSelector((state)=>state.users.users)
  const Dispach = useDispatch()
  const navigate = useNavigate()

  // const handleinput =(event)=>{
  //   const{name,value}=event.target
  //   const checked = event.target.checked
  //   if(name==="languages"){
  //     if(checked){
  //       setUser({...user,languages : [...user.languages,value]})
  //     }
  //     else{
  //       const newlanguage = user.languages.filter((item)=>item !== value)
  //       setUser({...user,languages : newlanguage})
  //     }
  //   }else{
  //     setUser({
  //       ...user,[name] : value
  //     }) 
  //   }

  // }
  useEffect(()=>{
    Dispach(getAllUser())
    props.handleprogress(100)
  },[])
  
  const handlesubmits=(data)=>{
    const check = users.find((l)=>l.email===data.email)
    if(check){
      toast.error("email is alredy exist")
    }else{
      Dispach(handlesubmit(data))
      navigate("/")
    }
  }
  return (
    <>
      <section >
        <div className="container  vh-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Registration Form
                  </h3>
                  <form onSubmit={handleSubmit(handlesubmits)}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            // name="firstName"
                            {...register("firstName")}
                            
                          />
                          <label className="form-label" for="firstName">
                            First Name 
                          </label><br />
                          {errors.firstName&& <label className="text-danger">{errors.firstName.message}</label>}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            {...register("lastName")}
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="lastName">
                            Last Name
                          </label><br />
                          {errors.lastName&& <label className="text-danger">{errors.lastName.message}</label>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            {...register("email")}
                          />
                          <label className="form-label" for="emailAddress">
                            Email
                          </label><br />
                          {errors.email&& <label className="text-danger">{errors.email.message}</label>}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            {...register("password")}
                          />
                          <label className="form-label" for="emailAddress">
                            Password
                          </label><br />
                          {errors.password&& <label className="text-danger">{errors.password.message}</label>}
                        </div>
                      </div>
                     
                    </div>

                    <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            {...register("date")}
                          />
                          <label for="birthdayDate" className="form-label">
                            Birthday
                          </label><br />
                          {errors.date&& <label className="text-danger">{errors.date.message}</label>}
                        </div>
                      </div>
                     
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="tel"
                            id="number"
                            className="form-control form-control-lg"
                            {...register("number")}
                          />
                          <label className="form-label" for="phoneNumber">
                            Phone Number
                          </label><br />
                          {errors.number&& <label className="text-danger">{errors.number.message}</label>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>
                          {errors.gender&& <p className="text-danger">gender is required</p>}

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={"female"}
                            {...register("gender")}
                          />
                          <label
                            className="form-check-label"
                            for="femaleGender"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={"male"}
                            {...register("gender")}
                          />
                          <label className="form-check-label" for="maleGender">
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={"other"}
                            {...register("gender")}
                          />
                          <label className="form-check-label" for="otherGender">
                            Other
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                          <h6 className="mb-2 pb-1">Languages: </h6>
                          {errors.languages&& <p className="text-danger">languages is required</p>}
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={"english"}
                              {...register("languages")}
                            />
                            <label
                              className="form-check-label"
                            >
                              Engish
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={"gujarati"}
                              {...register("languages")}
                            />
                            <label className="form-check-label" >
                              Gujarati
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={"hindi"}
                              {...register("languages")}
                            />
                            <label className="form-check-label" >
                              Hindi
                            </label>
                          </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-primary "
                        type="Submit"
                        value="Submit"
                        // onClick={handlesubmits}
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
  );
}

export default Signup;
