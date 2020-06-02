import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "reactstrap";
import { logoutUser } from "../actions/userAction";

function Logout() {
  const user = useSelector(state => state.auth.user.name);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutUser());

  return (
    <>
      <p>
        Welcome back..!! <strong>{user}</strong>
      </p>
      <NavLink onClick={handleLogout}>Logout</NavLink>
    </>
  );
}

export default Logout;
