import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  USER_LOADED,
  USERLOADING_FAILED
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  user: {},
  isAuthenticated: false,
  isLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case USERLOADING_FAILED:
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        user: {},
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
