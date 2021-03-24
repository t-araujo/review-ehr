import {
CASES_FAIL,
CASES_SUCCESS,
} from "../actions/types";

export default function cases(state = {}, action) {
    const { type, cases } = action;

    switch (type) {
        case CASES_SUCCESS:
            return { ...state, cases }

        case CASES_FAIL:
            return { ...state, cases: null }

        default:
            return state
    }
}
