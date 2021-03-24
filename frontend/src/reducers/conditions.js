import {
CONDITIONS_FAIL,
CONDITIONS_SUCCESS,
} from "../actions/types";

export default function cases(state = {}, action) {
  const { type, conditions } = action;

  switch (type) {
    case CONDITIONS_SUCCESS:
      return {
        ...state,
        conditions,
      }

    case CONDITIONS_FAIL:
      return {
        ...state,
        cases: null,
      }
    default:
      return state
    }
}
    