import { CLEAR_ERRORS, GET_ERRORS } from "./types";

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const getErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};
