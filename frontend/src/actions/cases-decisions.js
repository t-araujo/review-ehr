import { createDecision } from '../services/cases-decisions';
import * as types from './types'

export function setDecision(doctor_id, case_id, label) {
    return dispatch => {
        createDecision({
            doctor_id, case_id, label
        })
        .then(
            payload => {
                dispatch(success(payload.data));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function success(decisions) { return { type: types.DECISIONS_SUCCESS, decisions } }
    function failure(error) { return { type: types.DECISIONS_FAIL, error } }
}
