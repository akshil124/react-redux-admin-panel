import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../reducers/user";
function Allusers(props) {
  const dispach = useDispatch();
  const profile = JSON.parse(localStorage.getItem("user"))
  let users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispach(getAllUser());
  }, []);
  if (users) {
     users = users.filter((l)=> l.id !== profile.id)
    return (
      <div className="d-flex mt-5  justify-content-center ">
      {/* <div className="set-table"> */}
          <table className="table table-striped  table-hover w-50  border">
            <thead>
              <tr>
                <th>UsersNo</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user)=>{
                return(
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                  </tr>
                  )
              })}
            </tbody>
          </table>
      {/* </div> */}
      </div>
    );
  }
}

export default Allusers;
