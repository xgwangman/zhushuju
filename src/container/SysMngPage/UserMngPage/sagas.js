import {take, call, put, select, fork} from 'redux-saga/effects';
import { selectUserAttribute, selectStatus, selectFoundUser, selectRoleAttr,
         selectRoleEditAttr, selectOnChangeRoleStatus, selectAuthor, selectRequestData,
         selectRequestRoleLiset, selectOnSearchRoleData, selectCheckdUser,
} from './selectors';
import { updateUser, showModal, onShowUserEdit, requestUserLiset, onDeleteUser, onSaveUser,
         onSwitchChange, onResetPassword, beginFoundUser, requestRoleLiset, updateRole,
         onChangeStatus, onDeleteRole, onSaveRole, onShowModalAdd, onSaveRoleEdit, onShowModalEdit,
         requestCheckdUserData, updateRoleUser, setUserAttr, author, updateUserAuthor, saveAuthor,
         editorUser,onSearchRolePageData, userMngData, requestUserLisetEdtor,
} from './actions';
import { API_USER_LIST, API_USER_ADD, API_UESR_DELETE, API_UESR_DELETEBATCH, API_ROLE_LIST,
         API_USER_GETAUTHURL, API_USER_SAVEAUTHURL, API_USER_DISABLE, API_ROLE_ENABLED, API_ROLE_DISABLE,
         API_UESR_UPDATE, API_USER_RESETPASSWORD, API_ROLE_DELETE, API_ROLE_ADD, API_ROLE_UPDATE,
         API_ROLE_GETUSER, API_USER_ENABLED, API_ROLE_GETAUTHURL, API_ROLE_SAVEAUTHURL, API_ROLE_DELETEBATCH,
} from '../../../API';
import {CHANGE_STATUSR} from './constants'
import 'babel-polyfill';
import {takeLatest} from 'redux-saga';
import alert from '../../../common/utils/alert';
import request, {post, get} from '../../../common/utils/request';

/**
 * search用户
 */
export function* doSearch(action) {
    yield put(updateUserAuthor([]));
    const requestURL = API_USER_LIST+'?page=' + action.value.page+'&limit=' +action.value.limit+'&nameLike='+action.value.nameLike;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode === 1) {
        if(action.value.page==-1){//通过if判断是用户添加时请求的所有用户信息不分页。
        yield put(userMngData(result.data))
        }else{
            yield put(updateUser(result.data));
        }
    } else {
        alert(result.data.resultText, 'error');
    }
}
/**
 * search角色
 */
export function* doSearchRole(action) {
    yield put(updateUserAuthor([]));
    const requestURL = API_ROLE_LIST+'?page='+action.requestRule.page +'&limit=' +action.requestRule.limit+'&nameLike='+action.requestRule.nameLike;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode === 1) {
        yield put(updateRole(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}

/**
 * delete用户
 */
export function* doDeleteUser(action) {
    var requestURL;
    const pageData=yield select(selectRequestData());
    if (action.userNo.length!=null) {
        requestURL = API_UESR_DELETEBATCH;
        var result = yield call(post, {url: requestURL, data: {ids: action.userNo}});
    } else {
        requestURL = API_UESR_DELETE;
        result = yield call(post, {url: requestURL, data: {id: action.userNo.id}});
    }
    if (result.data && result.data.resultCode == 1) {
        yield put(requestUserLiset({page:pageData.page,limit:pageData.limit,nameLike:''}));
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
/**
 * 新增用户
 */
export function* doCreateUser(action) {
    const requestURL = API_USER_ADD;
    const pageData=yield select(selectRequestData());
    const userAttr = action.values;
    let result = yield call(post, {url: requestURL, data: userAttr});
    if (result.data && result.data.resultCode == 1) {
        yield  put(showModal(false));
        yield put(requestUserLiset({page:pageData.page,limit:pageData.limit,nameLike:''}));
        alert(result.data.resultText, 'success');
    } else {
        yield  put(showModal(false));
        yield put(setUserAttr());
        alert(result.data.resultText, 'error');
    }
}
/**
 * 用户编辑
 */
export function* doUserEdit(action) {
    const requestURL = API_UESR_UPDATE;
    const arr=yield select(selectUserAttribute());
    const pageData=yield select(selectRequestData());
    var userEditAttr = action.values;
    if(userEditAttr!=null){
        userEditAttr={id:arr.id,userNo:arr.userNo,name:action.values.name,roleId:action.values.roleId};
    }
    let result = yield call(post, {url: requestURL, data: userEditAttr});
    if (result.data && result.data.resultCode == 1) {
        yield  put(onShowUserEdit(false));
        yield put(requestUserLiset({page:pageData.page,limit:pageData.limit,nameLike:''}));
        alert(result.data.resultText, 'success');
    } else {
        yield  put(onShowUserEdit(false));
        yield put(setUserAttr());
        yield put(requestUserLiset({page:pageData.page,limit:pageData.limit,nameLike:''}));//刷新数据（page,limit）
        alert(result.data.resultText, 'error');
    }
}
/**
 *用户启用/停用
 */
export function* doChangeStatus(action) {
    var requestURL;
    const pageData=yield select(selectRequestData());
    if (action.record.status == true) {
        requestURL = API_USER_ENABLED;
    } else {
        requestURL = API_USER_DISABLE;
    }
    const result = yield call(post, {url: requestURL, data: {id: action.record.id}});
    if (result.data && result.data.resultCode == 1) {
        alert(result.data.resultText, 'success');
        yield put(requestUserLiset({page:pageData.page,limit:pageData.limit,nameLike:''}));//刷新数据（page,limit）
    } else {
        alert(result.data.resultText, 'error');
    }
}
/**
 *角色启用/停用
 */
export function* doChangeRoleStatus() {
    var requestURL;
    const rolePage=yield select(selectRequestRoleLiset());
    const record = yield  select(selectOnChangeRoleStatus());
    if (record.status == true) {
        requestURL = API_ROLE_ENABLED;
    } else {
        requestURL = API_ROLE_DISABLE;
    }
    const result = yield call(post, {url: requestURL, data: {id: record.id}});
    if (result.data && result.data.resultCode == 1) {
        alert(result.data.resultText, 'success');
        yield put(requestRoleLiset({page:rolePage.page,limit:rolePage.limit,nameLike:''}));
    } else {
        alert(result.data.resultText, 'error');
    }
}
/**
 * 重置密码
 */
export function* doResetPassword(action) {
    const requestURL = API_USER_RESETPASSWORD;
    const result = yield call(post, {url: requestURL, data: {id: action.record.id}});
    if (result.data && result.data.resultCode == 1) {
        alert('重置默认密码123456', 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
/**
 * 删除角色  判断是单独删除还是批量删除
 */
export function* doDeleteRole(action) {
    var requestURL,result ;
    const rolePage=yield select(selectRequestRoleLiset());
    if(action.rolenu.length!=null){
        requestURL=API_ROLE_DELETEBATCH;
        result = yield call(post, {url: requestURL, data: {ids: action.rolenu}});
    }else{
        requestURL=API_ROLE_DELETE;
        result = yield call(post, {url: requestURL, data: {id: action.rolenu.id}});//需要查看rolenu的值
    }
    if (result.data && result.data.resultCode == 1) {
        alert(result.data.resultText, 'success');
        yield put(requestRoleLiset({page:rolePage.page,limit:rolePage.limit,nameLike:''}));
    } else {
        alert(result.data.resultText, 'error');
    }
}
/**
 * 创建角色
 */
export function* doCreateRole(action) {
    const requestURL = API_ROLE_ADD;
    const roleAttr = action.roleArr;
    const rolePage=yield select(selectRequestRoleLiset());
    let result = yield call(post, {url: requestURL, data: roleAttr});
    if (result.data && result.data.resultCode == 1) {
        yield  put(onShowModalAdd(false));
        alert(result.data.resultText, 'success');
        yield put(requestRoleLiset({page:rolePage.page,limit:rolePage.limit,nameLike:''}));
    } else {
        yield  put(onShowModalAdd(false));
        alert(result.data.resultText, 'error');
    }
}
/**
 * 编辑角色
 *
 */
export function* doSaveRoleEdit(action) {
    const requestURL = API_ROLE_UPDATE;
    const rolePage=yield select(selectRequestRoleLiset());
    const arrRole=action.roleEdit;
    var roleEditAttr = yield select(selectRoleAttr());
    roleEditAttr={id:roleEditAttr.id,code:arrRole.code,name:arrRole.name,remark:arrRole.remark};
    let result = yield call(post, {url: requestURL, data: roleEditAttr});
    if (result.data && result.data.resultCode == 1) {
        yield  put(onShowModalEdit(false));
        alert(result.data.resultText, 'success');
        yield put(requestRoleLiset({page:rolePage.page,limit:rolePage.limit,nameLike:''}));

    } else {
        yield  put(onShowModalEdit(false));
        alert(result.data.resultText, 'error');
    }
}
/**
 * 查看人员
 */
export function* doCheckdUser(action) {
    const requestURL = API_ROLE_GETUSER;
    const Roleid=yield select(selectCheckdUser());
    let result = yield call(post, {url: requestURL, data: {id:action.value.roleId,page:action.value.page,limit:action.value.limit}});
    if (result.data && result.data.resultCode === 1) {
        yield put(updateRoleUser(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
/**
 * 请求获取用户/角色权限列表
 */
export function* doCheckdAuthor(action) {
    var requestURL;
    if(action.record.userNo!=undefined){
        requestURL=API_USER_GETAUTHURL;//获取用户权限
    }else{
        requestURL=API_ROLE_GETAUTHURL;//获取角色权限
    }
    let result = yield call(post, {url: requestURL, data: {id: action.record.id,}});
    if (result.data && result.data.resultCode === 1) {
        yield put(updateUserAuthor(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}

/**
 * 保存权限
 * &&action.value.length!=0
 */
export function* dosaveAuthor(action) {
    var  requestURL,authorDatas;
    const authorData=yield select(selectAuthor());
    if(authorData.userNo!=null){
        requestURL=API_USER_SAVEAUTHURL;//保存用户权限
        authorDatas={
            userId:authorData.id,
            urls:action.value,
        };
    }else{
        requestURL=API_ROLE_SAVEAUTHURL;//保存角色权限
        authorDatas={
            roleId:authorData.id,
            urls:action.value,
        };
    }
    let result = yield call(post, {url: requestURL, data:authorDatas});
    if (result.data && result.data.resultCode === 1) {
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}

//请求用户列表
export function* getUserListWatcher() {
    yield *takeLatest(requestUserLiset().type, doSearch)
}
export function* getUserEditorListWatcher() {
    yield *takeLatest(requestUserLisetEdtor().type, doSearch)
}
//请求角色列表
export function* getRoleListWatcher() {
    yield *takeLatest(requestRoleLiset().type, doSearchRole)
}


//编辑用户请求角色列表
export function* getCreateRoleEditWatcher() {
    yield *takeLatest(requestRoleLiset().type, doSearchRole)
}
//添加用户请求角色列表
export function* getCreateShowModalWatcher() {
    yield *takeLatest(requestRoleLiset().type, doSearchRole)
}
//创建用户
export function* getCreateUserWatcher() {
    yield *takeLatest(onSaveUser().type, doCreateUser)
}
//删除用户
export function* getDeleteUserWatcher() {
    yield *takeLatest(onDeleteUser().type, doDeleteUser)
}

//用户启用/禁用
export function *getChangeStatusWatcher() {
    yield *takeLatest(onChangeStatus().type, doChangeStatus)
}
//角色启用/禁用
export function *getChangeRoleStatusWatcher() {
    while (yield take(CHANGE_STATUSR)) {
        yield call(doChangeRoleStatus);
    }
}
//保存编辑用户
export function *getSaveUserEditWatcher() {
    yield *takeLatest(editorUser().type, doUserEdit)
}
//重置密码
export function *getResetPasswordWatcher() {
    yield *takeLatest(onResetPassword().type, doResetPassword)
}
//删除角色
export function *getDeleteRoleWatcher() {
    yield *takeLatest(onDeleteRole().type, doDeleteRole)
}
//创建角色
export function *getCreateRoleWatcher() {
    yield *takeLatest(onSaveRole().type, doCreateRole)
}
//角色编辑保存
export function *getEditRoleWatcher() {
    yield *takeLatest(onSaveRoleEdit().type, doSaveRoleEdit)
}
//查看人员
export function *getCheckdUserWatcher() {
    yield *takeLatest(requestCheckdUserData().type, doCheckdUser)
}
//请求获取权限列表
export function *getCreateauthorwatcher() {
    yield *takeLatest(author().type, doCheckdAuthor)
}
//保存授权按钮
export function *getCreateSaveAuthor() {
    yield *takeLatest(saveAuthor().type, dosaveAuthor)
}

export default function* entry() {
    const watcher = yield fork(getUserListWatcher);
    const Createwatcher = yield fork(getCreateUserWatcher);
    const CreateRolewatcher = yield  fork(getCreateRoleWatcher);
    const DeleteUserWatcher = yield fork(getDeleteUserWatcher);
    const ChangeStatusWatcher = yield fork(getChangeStatusWatcher);
    const SaveUserEditWatcher = yield fork(getSaveUserEditWatcher);
    const ResetPasswordWatcher = yield fork(getResetPasswordWatcher);
    const CreateRoleEditWatcher = yield fork(getCreateRoleEditWatcher);
    const RoleListwatcher = yield fork(getRoleListWatcher);
    const DeleteRole = yield fork(getDeleteRoleWatcher);
    const EditRoleWatcher = yield fork(getEditRoleWatcher);
    const CheckdUserWatcher = yield fork(getCheckdUserWatcher);
    const CreateShowModalWatcher = yield fork(getCreateShowModalWatcher);
    const ChangeRoleStatusWatcher = yield fork(getChangeRoleStatusWatcher);
    const Createauthorwatcher = yield fork(getCreateauthorwatcher);
    const CreateSaveAuthor=yield fork(getCreateSaveAuthor);
    const UserEditorListWatcher=yield fork(getUserEditorListWatcher);
}
