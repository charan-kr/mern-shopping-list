import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";
const initialState = {
  msg: null,
  status: null,
  id: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      const { msg, status, id } = action.payload;
      return {
        ...state,
        msg,
        status,
        id
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        msg: null,
        status: null,
        id: null
      };
    default:
      return state;
  }
}
