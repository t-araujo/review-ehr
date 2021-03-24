import { getConditions } from '../services/conditions';
import * as types from './types'

export function getAllConditions() {
    return dispatch => {
        getConditions()
            .then(
                payload => {
                    dispatch(success(payload.data));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function success(conditions) { return { type: types.CONDITIONS_SUCCESS, conditions } }
    function failure(error) { return { type: types.CONDITIONS_FAIL, error } }
}
