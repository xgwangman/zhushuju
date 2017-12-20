import {SENDING_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS,CHANGE_LOGIN_STATUS} from './constants';
import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.
export function loginSuccess(value) {
  return {
    type: LOGIN_SUCCESS, value:success
  };
}

export function loginError(value) {
  return {
    type: LOGIN_ERROR, value:error
  };
}

export function loginRequest(value) {
  return { type: SENDING_REQUEST, value:value };
}
export function changeIsAdmin(value) {
  return { type: CHANGE_LOGIN_STATUS, value:value };
}
