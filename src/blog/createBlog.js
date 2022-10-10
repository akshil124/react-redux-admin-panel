import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {getAllUser} from "../reducers/user"
import { submitBlog} from "../reducers/blog"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Blog(props) {
    const dispach = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=> state.users.user)
    const validationschema = yup.object({
        blogtitle : yup.string().required(),
        blogcontent : yup.string().required()
    })
    const { register, handleSubmit,reset, watch, formState: { errors } } = useForm({
      resolver : yupResolver(validationschema)
    });
    useEffect(()=>{
        props.handleprogress(100)
        dispach(getAllUser())
    },[])
    const handleBlog = async(data) =>{
        const author = user.firstName + " " + user.lastName 
        const Alldata = {...data,author,userid : user.id}
        await dispach(submitBlog(Alldata))
        navigate("/dashboard/viewblog")
        reset()
    }
  return (
    <>
        <div className="container py-5 ">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Create Blog
                  </h3>
                  <form onSubmit={handleSubmit(handleBlog)}>
                    <div className="row">
                      <div className="col-md-12 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            {...register("blogtitle")}
                          />
                          <label className="form-label" for="emailAddress">
                            Blog-title
                          </label><br />
                          {errors?.blogtitle&& <label className="text-danger">{errors.blogtitle.message}</label>}
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="form-outline">
                          <textarea
                            type="text"
                            className="form-control form-control-lg"
                            {...register("blogcontent")}
                          />
                          <label className="form-label" for="firstName">
                            Blog-content
                          </label><br />
                          {errors?.blogcontent&& <label className="text-danger">{errors.blogcontent.message}</label>}
                        </div>
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
    </>
  )
}

export default Blog