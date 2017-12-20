import {SENDING_REQUEST, CHANGE_LOGIN_STATUS,LOGIN_ERROR, LOGIN_SUCCESS} from './constants';
import {
    fromJS
} from 'immutable';
import {
    browserHistory
} from 'react-router';
var storage = window.localStorage;
var user = storage["userName"];
var pass = storage["password"];
var permanent = storage["permanent"];
if (!permanent || permanent == "true") {
    permanent = true;
} else {
    permanent = false;
}
// The initial state of the App
const initialState = fromJS({
    isRequesting: false,
    isAuth: false,
    checkRemember: permanent,
    error: '',
    loginSuccess: false
});

function loginReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOGIN_STATUS:
            return state
                .set('isAuth', action.value);
        case SENDING_REQUEST:
            return state
                .set('isRequesting', action.sending);
        case LOGIN_SUCCESS:
            return state
                .set('loginSuccess', true).set('error', null).set('isRequesting', false);
        case LOGIN_ERROR:
            return state
                .set('error', action.error).set('isRequesting', false);
        default:
            return state;
    }
}

export default loginReducer;