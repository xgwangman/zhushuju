/**
 * Created by Administrator on 2017/4/7.
 */
import {createSelector} from 'reselect';

const selectUserMng = () => (state) => state.get('userMng');
const selectShowModal = () => createSelector(
    selectUserMng(),
    (state) => state.get('visible')
);
const selectUsernameList=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('userNameList')
);
const selectUserAttribute = () => createSelector(
    selectUserMng(),
    (state) => state.get('userAttribute')
);
const selectShowUserEdit = () => createSelector(
    selectUserMng(),
    (state) => state.get('visiblerE')
);
const selectRoleList = () => createSelector(
    selectUserMng(),
    (state) => state.get('roleList')
);
const selectOnShowModalAdd=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('visibler')
);
const selectRoleAttr = () => createSelector(
    selectUserMng(),
    (state) => state.get('roleAttribute')
);
const selectOnShowModalEdit=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('visiblerE')
);
const selectUpdateRoleUser=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('roleUserList')
);
const selectRowSelect=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('arrNu')
);
const selectOnChangeRoleStatus=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('recordR')
);
const selectUpdateUserAuthor=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('authorList')
);
const selectAuthor=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('record')
);
const selectOnGetName=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('name')
);
//获取user table的当前页信息
const selectRequestData=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('pageData')
);
// 获取role table的当前页信息
const selectRequestRoleLiset=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('rulePage')
);
//查看使用人员的角色的ID
const selectCheckdUser=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('id')
);
//用户名，账号唯一性检验
const selectUserMngData=()=>createSelector(
    selectUserMng(),
    (state)=>state.get('data')
);
export {
    selectShowModal,
    selectUsernameList,
    selectUserAttribute,
    selectShowUserEdit,
    selectRoleList,
    selectOnShowModalAdd,
    selectRoleAttr,
    selectOnShowModalEdit,
    selectUpdateRoleUser,
    selectRowSelect,
    selectOnChangeRoleStatus,
    selectUpdateUserAuthor,
    selectAuthor,
   selectOnGetName,
    selectRequestData,
    selectRequestRoleLiset,
    selectCheckdUser,
    selectUserMngData,
}

