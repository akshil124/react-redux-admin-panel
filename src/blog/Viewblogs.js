import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../reducers/blog";
import { getAllUser } from "../reducers/user";

function Viewblogs(props) {
  const dispach = useDispatch();

  const blogs = useSelector((state) => state.blog.blogs);
  const users = useSelector((state) => state.users.users);
  const myprofile = useSelector((state) => state.users.user);
  const [user, setuser] = useState();
  useEffect(() => {
    dispach(getAllBlogs());
    dispach(getAllUser());
  }, []);
  const viweuser = (id) => {
    setuser(users.find((u) => u.id === id));
  };
  return (
    <>
      <h1 className="text-center mt-5">All blogs</h1>
      <div className="d-flex flex-wrap justify-content-center ">
        {blogs?.map((blog) => {
          return (
            <div className="card col-8 mt-5">
              <div className="card-body">
                <h2 className="card-title">{blog?.blogtitle}</h2>
                <p className="card-text">{blog?.blogcontent}</p>
                <h6>
                  Author :{" "}
                  <span
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                    onClick={() => viweuser(blog?.userid)}
                  >
                    {blog?.author}
                  </span>
                </h6>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
              profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>name : {user?.firstName + " " + user?.lastName} {myprofile?.firstName===user?.firstName && "(you)" }</h5>
              <h5>email : {user?.email}</h5>
              <h5>date : {user?.date}</h5>
              <h5>number : {user?.number}</h5>
              <h5>languages : {user?.languages?.join(",")}</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Viewblogs;
