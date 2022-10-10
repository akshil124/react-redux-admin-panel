import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Edituser from "./user/Edituser";
import { checkuser } from "./reducers/user";

function Dashboard(props) {
  const profile = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const state = useSelector((state) => state.users.user);
  const dispach = useDispatch();
  const handlelogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {
    dispach(checkuser(profile));
    props.handleprogress(100)
  }, []);
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/dashboard/createblog"}>
                  Create Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/dashboard/viewblog"}>
                  View Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={"/dashboard/users"}
                >
                  User
                </Link>
              </li>
            </ul>
            <form className="d-flex text-light">
              <span>{profile?.firstName + " " + profile?.lastName}</span>
              <div className="btn-group dropstart" role="group">
                <i
                  type="button"
                  className="ms-2 bi bi-person-circle "
                  data-bs-toggle="dropdown"
                ></i>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      profile
                    </button>
                  </li>

                  <li>
                    <button onClick={handlelogout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                My profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {<Edituser />}
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
      <Outlet />
    </>
  );
}

export default Dashboard;
