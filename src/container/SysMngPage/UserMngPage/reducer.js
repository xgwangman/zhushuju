/**
 * Created by Administrator on 2017/4/7.
 */
import { SHOWMODAL, UPDATE_REPO, ADD_USER, USER_EDIT, UPDATE_ROLE, SHOWMODAL_ADD,
         ADD_ROLE, ROLE_USER, SHOW_EDIT, SELECT, CHANGE_STATUSR, UPDATE_AUTHOR,
         REQUEST_AUTHOR, GET_NAME, REQUEST_USER, REQUEST_ROLE, CHECKD_USER, USER_MNG_DATA,
} from './constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
    loading: false, visible: false, requesting:true, status:true, userAttribute:'',
    userNameList:'', roleNameList:'', attr:'', userId:'', userName:'', role:'', passWord:'',
    value:'', roleList:'', visibler:false, visiblerE:false, roleAttribute:'', roleUserList:'',
    arrEdit:'', arrNu:'', recordR:'', authorList:'',
});

function UserMngReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_REPO:
            return state
                .set('userNameList',action.userNameList);
        case ADD_USER:
            return state
                .set('userAttribute',action.attr);
        case SHOWMODAL:
            return state
                .set('visible', action.visible);
        case USER_EDIT:
            return state
                .set('visiblerE',action.visibler);
        case UPDATE_ROLE:
            return state
                .set('roleList',action.roleList);
        case SHOWMODAL_ADD:
            return state
                .set('visibler',action.visibler);
        case ADD_ROLE:
            return state
                .set('roleAttribute',action.arrR);
        case SHOW_EDIT:
            return state
                .set('visiblerE',action.visibler);
        case ROLE_USER:
            return state
                .set('roleUserList',action.roleUserList);
        case SELECT:
            return state
                .set('arrNu',action.arrNu);
        case CHANGE_STATUSR:
            return state
                .set('recordR',action.recordR);
        case UPDATE_AUTHOR:
            return state
                .set('authorList',action.authorList);
        case REQUEST_AUTHOR:
            return state
                .set('record',action.record);
        case GET_NAME:
            return state
                .set('name',action.name);
        case REQUEST_USER:
            return state
                .set('pageData',action.value);
        case REQUEST_ROLE:
            return state
                .set('rulePage',action.requestRule);
        case CHECKD_USER:
            return state
                .set('id',action.value);
        case USER_MNG_DATA:
            return state
                .set('data',action.value);
        default:
            return state;
    }
}
export default UserMngReducer;