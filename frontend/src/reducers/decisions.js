import {
DECISIONS_FAIL,
DECISIONS_SUCCESS,
} from "../actions/types";

export default function cases(state = { decisions: { next_decision: false } }, action) {
    const { type } = action;

    switch (type) {
    case DECISIONS_SUCCESS:
        return {
        ...state,
        decisions: { next_decision: true },
        }

    case DECISIONS_FAIL:
        return {
        ...state,
        decisions: { next_decision: false },
        }
    default:
        return state
    }
}
    