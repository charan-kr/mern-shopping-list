import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";
import axios from "axios";
import { getErrors } from "../actions/errorActions";

export const getItems = () => dispatch => {
  axios
    .get("/items")
    .then(response =>
      dispatch({
        type: GET_ITEMS,
        payload: response.data
      })
    )
    .catch(err => dispatch(getErrors(null, null, "SERVER_ERROR")));
};

export const addItem = item => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) config.headers["x-auth-token"] = token;

  axios
    .post("/items", item, config)
    .then(response => {
      dispatch({
        type: ADD_ITEM,
        payload: response.data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: null
        }
      })
    );
};

export const deleteItem = id => (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) config.headers["x-auth-token"] = token;
  axios
    .delete(`/items/${id}`, config)
    .then(response => {
      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: null
        }
      })
    );
};
