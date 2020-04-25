import axios from "axios";

import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILED,
  REGISTER_FAILED,
  USER_LOADED,
  USERLOADING_FAILED
} from "./types";
import { clearErrors, getErrors } from "./errorActions";

export const registerUser = user => dispatch => {
  axios
    .post("http://localhost:5000/user", user)
    .then(res => {
      dispatch(clearErrors());
      dispatch(registerSuccess(res.data));
    })
    .catch(err => {
      dispatch(registerFailed());
      dispatch(
        getErrors(err.response.data.msg, err.response.status, "REGISTER_FAILED")
      );
    });
};

export const loginUser = user => dispatch => {
  axios
    .post("http://localhost:5000/auth", user)
    .then(res => {
      dispatch(clearErrors());
      dispatch(loginSuccess(res.data));
    })
    .catch(err => {
      dispatch(loginFailed());
      dispatch(
        getErrors(err.response.data.msg, err.response.status, "LOGIN_FAILED")
      );
    });
};

export const loadUser = () => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) config.headers["x-auth-token"] = token;

  axios
    .get("http://localhost:5000/auth/user", config)
    .then(res => {
      dispatch(clearErrors());
      dispatch(userLoadSuccess(res.data));
    })
    .catch(err => {
      dispatch(userLoadFailed());
      dispatch(
        getErrors(
          err.response.data.msg,
          err.response.status,
          "USERLOADING_FAILED"
        )
      );
    });
};

export const logoutUser = () => ({
  type: LOGOUT_SUCCESS
});

const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
});

const loginFailed = () => ({
  type: LOGIN_FAILED
});

const registerSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload
});

const registerFailed = () => ({
  type: REGISTER_FAILED
});

const userLoadSuccess = payload => ({
  type: USER_LOADED,
  payload
});

const userLoadFailed = () => ({
  type: USERLOADING_FAILED
});
