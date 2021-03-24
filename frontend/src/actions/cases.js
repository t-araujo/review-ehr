import { getCases } from '../services/cases';
import * as types from './types'

export function getAllCases() {
    return dispatch => {
        getCases()
            .then(
                payload => {
                    dispatch(success(payload.data));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function success(cases) { return { type: types.CASES_SUCCESS, cases } }
    function failure(error) { return { type: types.CASES_FAIL, error } }
}
