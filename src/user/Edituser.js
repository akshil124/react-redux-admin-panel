import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {editprofile} from "../reducers/user"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
function Edituser() {
  const dispach = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const user = useSelector((state)=> state.users.user)
  const [toggle, setToggle] = useState({});
  const handlesubmits = (data) => {
    const mydata = {...user,...data}
    dispach(editprofile(mydata))
    setToggle("")
  };
  const handletoggle = (name) => {
      setToggle({
        [name]: true
      })
  };

  return (
    <div>
      <section>
        <div className="container ">
          <div className="row justify-content-center align-items-center ">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card mt-5 shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5">
                  <form onSubmit={handleSubmit(handlesubmits)}>
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="form-outline">
                          <label className="form-label" for="firstName">
                            First Name : 
                          </label><span>{user?.firstName}</span>
                          {toggle.firstName ? <i class="bi bi-check-lg float-end" type="button" onClick={handleSubmit(handlesubmits)}></i> : 
                          <i
                            className="bi bi-pencil-square float-end"
                            type="button"
                            onClick={() => handletoggle("firstName")}
                          ></i>
                          }
                          {toggle.firstName && (
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              // value={user.firstName}
                              defaultValue={user?.firstName}
                              {...register("firstName")}
                            />
                          )}
                          <br />
                          {errors.firstName && (
                            <label className="text-danger">
                              {errors.firstName.message}
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6  ">
                        <div className="form-outline">
                          <label className="form-label" for="lastName">
                            Last Name : 
                          </label><span>{user?.lastName}</span>
                          {toggle.lastName ? <i class="bi bi-check-lg float-end" type="button"  onClick={handleSubmit(handlesubmits)}></i> : 
                          <i
                            className="bi bi-pencil-square float-end"
                            type="button"
                            onClick={() => handletoggle("lastName")}
                          ></i>
                          }
                          {toggle.lastName && (
                            <input
                              type="text"
                              {...register("lastName")}
                              className="form-control form-control-lg"
                              defaultValue={user?.lastName}
                            />
                          )}
                          <br />
                          {errors.lastName && (
                            <label className="text-danger">
                              {errors.lastName.message}
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 pb-2">
                        <div className="form-outline">
                          <label className="form-label" for="emailAddress">
                            Email : 
                          </label><span>{user?.email}</span>
                          {toggle.email ? <i class="bi bi-check-lg float-end" type="button"  onClick={handleSubmit(handlesubmits)}></i> : 
                          <i
                            className="bi bi-pencil-square float-end"
                            type="button"
                            onClick={() => handletoggle("email")}
                          ></i>
                          }
                          {toggle.email && (
                            <input
                              type="email"
                              className="form-control form-control-lg"
                              {...register("email")}
                              defaultValue={user?.email}
                            />
                          )}
                          <br />
                          {errors.email && (
                            <label className="text-danger">
                              {errors.email.message}
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 pb-2">
                        <div className="form-outline">
                          <label className="form-label" for="emailAddress">
                            Password : 
                          </label><span>{user?.password}</span>
                          {toggle.password ? <i class="bi bi-check-lg float-end" type="button"  onClick={handleSubmit(handlesubmits)}></i> : 
                          <i
                            className="bi bi-pencil-square float-end"
                            type="button"
                            onClick={() => handletoggle("password")}
                          ></i>
                          }
                          {toggle.password && (
                            <input
                              type="password"
                              className="form-control form-control-lg"
                              {...register("password")}
                              defaultValue={user?.password}
                            />
                          )}
                          <br />
                          {errors.password && (
                            <label className="text-danger">
                              {errors.password.message}
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <label for="birthdayDate" className="form-label">
                            Birthday : 
                          </label><span>{user?.date}</span>
                          {toggle.date ? <i class="bi bi-check-lg float-end" type="button"  onClick={handleSubmit(handlesubmits)}></i> : 
                          <i
                            className="bi bi-pencil-square float-end"
                            type="button"
                            onClick={() => handletoggle("date")}
                          ></i>
                          }
                          {toggle.date && (
                            <input
                              type="date"
                              className="form-control form-control-lg"
                              {...register("date")}
                              defaultValue={user?.date}
                            />
                          )}
                          <br />
                          {errors.date && (
                            <label className="text-danger">
                              {errors.date.message}
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6   pb-2">
                        <div className="form-outline">
                          <label className="form-label" for="phoneNumber">
                            Phone Number : 
                          </label><span>{user?.number}</span>
                          {toggle.number ? <i class="bi bi-check-lg float-end" type="button"  onClick={handleSubmit(handlesubmits)}></i> : 
                          <i
                            className="bi bi-pencil-square float-end"
                            type="button"
                            onClick={() => handletoggle("number")}
                          ></i>
                          }
                          {toggle.number && (
                            <input
                              type="tel"
                              id="number"
                              className="form-control form-control-lg"
                              {...register("number")}
                              defaultValue={user?.number}
                            />
                          )}
                          <br />
                          {errors.number && (
                            <label className="text-danger">
                              {errors.number.message}
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 ">
                        <label className="mb-2 pb-1">Gender : </label><span>{user?.gender}</span>
                        {toggle.gender ? <i class="bi bi-check-lg float-end" type="button"  onClick={handleSubmit(handlesubmits)}></i> : 
                          <i
                            className="bi bi-pencil-square float-end"
                            type="button"
                            onClick={() => handletoggle("gender")}
                          ></i>
                          }
                        <br />
                        {errors.gender && (
                          <p className="text-danger">gender is required</p>
                        )}
                        {toggle.gender && (
                          <>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                value={"female"}
                                {...register("gender")}
                                defaultChecked={user.gender==="female"}
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
                                defaultChecked={user.gender==="male"}
                              />
                              <label
                                className="form-check-label"
                                for="maleGender"
                              >
                                Male
                              </label>
                            </div>

                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                value={"other"}
                                {...register("gender")}
                                defaultChecked={user.gender==="other"}
                              />
                              <label
                                className="form-check-label"
                                for="otherGender"
                              >
                                Other
                              </label>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-md-6 ">
                        <label className="mb-2 pb-1">Languages : </label><span>{user?.languages?.join(",")}</span>
                        {toggle.languages ? <i class="bi bi-check-lg float-end" type="button"  onClick={handleSubmit(handlesubmits)}></i> : 
                          <i
                            className="bi bi-pencil-square float-end"
                            type="button"
                            onClick={() => handletoggle("languages")}
                          ></i>
                          }
                        <br />
                        {errors.languages && (
                          <p className="text-danger">languages is required</p>
                        )}
                        {toggle.languages && (
                          <>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={"english"}
                                {...register("languages")}
                                defaultChecked={user?.languages?.includes("english")}
                              />
                              <label className="form-check-label">Engish</label>
                            </div>

                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={"gujarati"}
                                {...register("languages")}
                                defaultChecked={user?.languages.includes("gujarati")}
                              />
                              <label className="form-check-label">
                                Gujarati
                              </label>
                            </div>

                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={"hindi"}
                                {...register("languages")}
                                defaultChecked={user?.languages.includes("hindi")}
                              />
                              <label className="form-check-label">Hindi</label>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                 
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Edituser;
