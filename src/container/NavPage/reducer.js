import {REQUEST_USER,CREATE_USER, SET_USERID,CHANGE_PASSWORD,CHANGE_USERNAME,SHOW_ERROR,UPDATE_REPO,ALTER_USERNAME,ALTER_USERPSW,CHANGE_NEWPASSWORD,SUBMIT_USERCHANGE,CHANGE_NEWNAME,DELETE_USER} from './constants';
import {fromJS} from 'immutable';
import {browserHistory} from 'react-router';

// The initial state of the App
const initialState = fromJS({
	isCreating: false,
	isDeleting: false,
    userNameList: '',
    requesting: true,
    userId: '',
    userName: '',
    password: '',
    error: '',
});

function NavReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USER:
            return state
                .set('requesting', true);
        case UPDATE_REPO:
            return state
                .set('userNameList', action.userNamelist);
        case CREATE_USER:
        	return state
        	.set('isCreating', action.userName);
        case SET_USERID:
            return state
                .set('userId', action.userId);
        case DELETE_USER:
            return state
                .set('deleteUser', action.deleteUser);
        case CHANGE_USERNAME:
            return state
                .set('userName', action.userName);
        case CHANGE_PASSWORD:
            return state
                .set('password', action.password);
        case SHOW_ERROR:
            return state
                .set('error', action.error);
        case ALTER_USERNAME:
            return state
                .set('AuserName', action.userName);
        case ALTER_USERPSW:
            return state
                .set('Apassword', action.password);
        case CHANGE_NEWPASSWORD:
            return state
                .set('newPassword', action.newPassword);
        case CHANGE_NEWNAME:
            return state
                .set('newName', action.newName);
        case SUBMIT_USERCHANGE:
            return state
                .set('submit', action.change);
        default:
            return state;
    }
}

export default NavReducer;