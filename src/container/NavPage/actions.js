/*
 */
import {REQUEST_USER,CREATE_USER, SET_USERID,CHANGE_PASSWORD,CHANGE_USERNAME,SHOW_ERROR,UPDATE_REPO,ALTER_USERNAME,ALTER_USERPSW,CHANGE_NEWPASSWORD,SUBMIT_USERCHANGE,CHANGE_NEWNAME,DELETE_USER} from './constants';
import {push} from 'react-router-redux';
import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.


export function requestUser(request) {
	return {
		type: REQUEST_USER,
        request,
	};
}
export function updateUser(userNamelist) {
	return {
		type: UPDATE_REPO,
		userNamelist,
	};
}
export function createUser(userName) {
	return {
		type: CREATE_USER,
		userName,
	};
}
export function setUserId(userId) {
	return {
		type: SET_USERID,
		userId,
	};
}
export function deleteUser(deleteUser) {
    return {
        type: DELETE_USER,
        deleteUser,
    };
}
export function changeUserName(userName) {
	return {
		type: CHANGE_USERNAME,
		userName,
	};
}
export function changePassword(password) {
	return {
		type: CHANGE_PASSWORD,
		password,
	};
}
export function ErrorMsg(error) {
	return {
		type: SHOW_ERROR,
		error,
	};
}
export function alterUserName(userName) {
	return {
		type: ALTER_USERNAME,
        userName,
	};
}
export function alterUserPsw(password) {
	return {
		type: ALTER_USERPSW,
        password,
	};
}
export function changeNewPassword(newPassword) {
    return {
        type: CHANGE_NEWPASSWORD,
        newPassword,
    };
}
export function changeNewName(newName) {
    return {
        type: CHANGE_NEWNAME,
        newName,
    };
}
export function submitUserChange(change) {
    return {
        type: SUBMIT_USERCHANGE,
        change,
    };
}
