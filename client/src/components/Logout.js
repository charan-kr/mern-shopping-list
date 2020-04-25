import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { logoutUser } from "../actions/userAction";

function Logout() {
  const user = useSelector(state => state.auth.user.name);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutUser());

  return (
    <>
      <p style={{ float: "right" }}>
        Welcome back..!! <strong>{user}</strong>
      </p>
      <Button color="link" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}

export default Logout;
