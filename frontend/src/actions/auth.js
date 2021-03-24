import { loginService, logoutService } from '../services/auth';
import * as history from '../helpers/history'
import * as types from './types'

export function login(email, password, from) {
    return dispatch => {
        dispatch(request({ email }));

        loginService(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: types.LOGIN_REQUEST, user } }
    function success(user) { return { type: types.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: types.LOGIN_FAIL, error } }
}

export function logout() {
    logoutService()
    return { type: types.LOGOUT };
}