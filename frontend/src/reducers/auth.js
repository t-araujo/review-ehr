import {
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function auth(state = initialState, action) {
  const { type, user } = action;

  switch (type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            isLoggedIn: true,
            user,
        }

    case LOGIN_FAIL:
        return {
            ...state,
            isLoggedIn: false,
            message: action.error,
            user: null,
        }

    case LOGOUT:
        return {
            ...state,
            isLoggedIn: false,
            user: null,
        }

    default:
        return state
  }
}
