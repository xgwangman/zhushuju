import { REQUEST_USER, UPDATE_REPO, REQUEST_ROLE, IS_SAVE, ADD_USER, DELETE_USER, CHANGE_STATUS,
         SAVE_USEREDIT, CHANGE_ACCREDIT, SHOWMODAL, USER_EDIT, RESET_PASSWORD, UPDATE_ROLE, SHOWMODAL_ADD,
         DELETE_ROLE, ADD_ROLE, SAVE_ROLE, SHOW_EDIT, SAVE_EDIT, CHECKD_USER, ROLE_USER, SELECT, CHANGE_STATUSR,
         REQUEST_AUTHOR, UPDATE_AUTHOR, SAVE_AUTHOR, EDITOR_USER, GET_NAME, CHECKD_USER_DATA, USER_MNG_DATA, USER_EDTOR,
} from './constants';

export function showModal(visible) {
    return {
        type: SHOWMODAL,
        visible,
    };
}
export function handleCancel(visible) {
    return {
        type: SHOWMODAL,
        visible,
    };
}
//请求用户列表
export function requestUserLiset(requestData) {
    return {
        type: REQUEST_USER,
        value:requestData,
    };
}
//编辑用户是请求所有的用户信息
export function requestUserLisetEdtor(userData) {
    return {
        type: USER_EDTOR,
        value:userData,
    };
}
//请求角色列表
export function requestRoleLiset(requestRule) {
    return {
        type: REQUEST_ROLE,
        requestRule,
    };
}
export function updateUser(userNameList) {
    return {
        type: UPDATE_REPO,
        userNameList,
    };
}
//修改用户
export function setUserAttr(attr) {
    return {
        type:ADD_USER,
        attr,
    }
}
//添加用户
export function onSaveUser(values) {
    return {
        type: IS_SAVE,
        values,
    };
}
export function onDeleteUser(userNo) {
    return {
        type: DELETE_USER,
        userNo,
    };
}
export function onChangeAccredit(record) {
    return {
        type: CHANGE_ACCREDIT,
        record,
    };
}
//用户编辑框弹出
export function onShowUserEdit(visibler) {
    return {
        type: USER_EDIT,
        visibler,
    };
}
//用户编辑保存
export function onSaveUserEdit(save) {
    return {
        type: SAVE_USEREDIT,
        save,
    };
}
//重置密码
export function onResetPassword(record) {
    return {
        type: RESET_PASSWORD,
        record,
    };
}
//请求角色
export function updateRole(roleList) {
    return {
        type: UPDATE_ROLE,
        roleList,
    };
}
//点击增加按钮
export function onShowModalAdd(visibler) {
    return {
        type: SHOWMODAL_ADD,
        visibler,
    };
}
//用户禁用/启用
export function onChangeStatus(record) {
    return {
        type: CHANGE_STATUS,
        record,
    };
}
//角色禁用/启用
export function onChangeRoleStatus(recordR) {
    return {
        type: CHANGE_STATUSR,
        recordR,
    };
}
//删除角色
export function onDeleteRole(rolenu) {
    return {
        type: DELETE_ROLE,
        rolenu,
    };
}
//添加角色/角色编辑
export function setRoleAttr(arrR) {
    return {
        type: ADD_ROLE,
        arrR,
    };
}
//新增角色
export function onSaveRole(roleArr) {
    return {
        type: SAVE_ROLE,
        roleArr,
    };
}
//角色编辑框弹出
export function onShowModalEdit(visibler) {
    return {
        type: SHOW_EDIT,
        visibler,
    };
}
//角色编辑 新
export function onSaveRoleEdit(roleEdit) {
    return {
        type: SAVE_EDIT,
        roleEdit,
    };
}
//查看人员
export function checkdUser(id) {
    return {
        type: CHECKD_USER,
        value:id,
    };
}
//查看人员结果
export function updateRoleUser(roleUserList) {
    return {
        type: ROLE_USER,
        roleUserList,
    };
}
//删除标示
export function rowSelect(arrNu) {
    return {
        type: SELECT,
        arrNu,
    };
}
//请求获取权限列表
export function author(record) {
    return {
        type: REQUEST_AUTHOR,
        record,
    };
}
//获的权限列表
export function updateUserAuthor(authorList) {
    return {
        type: UPDATE_AUTHOR,
        authorList,
    };
}
//保存授权按钮
export function saveAuthor(value) {
    return {
        type: SAVE_AUTHOR,
        value,
    };
}
export function editorUser(values) {
    return {
        type: EDITOR_USER,
        values,
    };
}
//弹出框上方的名字
export function onGetName(name) {
    return {
        type: GET_NAME,
        name,
    };
}
//查看角色的使用人员
export function requestCheckdUserData(pageData) {
    return {
        type: CHECKD_USER_DATA,
        value:pageData,
    };
}
//用户名，账号唯一性检验
export function userMngData(Data) {
    return {
        type: USER_MNG_DATA,
        value:Data,
    };
}









