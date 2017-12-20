import React, {Component} from 'react';
import {Breadcrumb,Modal} from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {showModal, requestUserLiset, onSaveUser, setUserAttr, requestRoleLiset, onDeleteUser,
        onChangeStatus, onShowUserEdit, onSaveUserEdit, onResetPassword, rowSelect, author,
        editorUser, onGetName, onSearchUserList, onSearchUserData, requestUserLisetEdtor
} from '../actions';
import {selectShowModal, selectUsernameList, selectUserName, selectUserId, selectRole, selectChecked,
        selectShowUserEdit, selectUserAttribute, selectRoleList, selectRowSelect, selectUserMngData,
} from '../selectors';
import UserModalElement from '../component/UserModalElement';
import UserEditElement from '../component/UserEditElement';
import UserListTable from '../component/UserListTable';
import {SearchBox} from '../../../../common/components/SearchBox';

export class UserMngPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestUserList({page:1,limit:15,nameLike:''});
        this.state={
            searchValue:''
        }
    }
    searchChange=(e)=>{
        this.setState({
            searchValue:e.target.value
        });
        this.props.requestUserList({page:1,limit:15,nameLike:e.target.value});
    };
    render() {
        var arrNo = this.props.arrN;
        return (
            <div>
                <div className="xp-header ret">
                   <Breadcrumb >
                      <Breadcrumb.Item><Link to="/main">用户管理</Link></Breadcrumb.Item>
                   </Breadcrumb>
                   <SearchBox
                       placeholder="账号或用户名"
                       onChange={this.searchChange}
                   />
                </div>
                <div className="centerContent ">
                    <div>
                        <button type="button" className="btn-css"
                                onClick={(e) => this.props.onShowModal(e)}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 增加
                        </button>
                        <button type="button" className="btn-css-del"
                                onClick={(e) => this.props.onDeleteUser(e,arrNo)}>
                            <span className="glyphicon glyphicon-minus" ></span> 删除
                        </button>
                    </div>
                    <div>
                        <UserListTable
                            userNameList={this.props.userNameList}
                            onChangeStatusT={this.props.onChangeStatus}
                            onResetPasswordT={this.props.onResetPassword}
                            authorU={this.props.author}
                            name={this.props.name}
                            onShowUserEditT={this.props.onShowUserEdit}
                            onDeleteUser={this.props.onDeleteUser}
                            rowSelectT={this.props.rowSelect}
                            requestPageData={this.props.requestUserList}
                            userNameLike={this.state.searchValue}
                        />
                        <UserModalElement
                            name={this.props.name}
                            visibleu={this.props.visible}
                            handleCancelu={this.props.handleCancel}
                            requestRoleLiset={this.props.requestRoleList}
                            rolrLists={this.props.roleNameList}
                            onSaveUser={this.props.onSaveUser}
                            userMngData={this.props.userMngData}
                        />
                        <UserEditElement
                            name={this.props.userAttribute.name}
                            showEdit={this.props.visiblerE}
                            handleCancelE={this.props.handleCancelE}
                            rolrListE={this.props.roleNameList}
                            userAttribute={this.props.userAttribute}
                            editorUser={this.props.editorUser}
                            userMngData={this.props.userMngData}
                        />
                    </div>
                </div>

            </div>
        )
    }
}

UserMngPage.propTypes = {
    onShowModal: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    requestUserList: React.PropTypes.func,
    requestRoleList: React.PropTypes.func,
    onSaveUser:React.PropTypes.func,
    onDeleteUser:React.PropTypes.func,
    onChangeStatus:React.PropTypes.func,
    onShowUserEdit:React.PropTypes.func,
    handleCancelE:React.PropTypes.func,
    onSaveUserEdit:React.PropTypes.func,
    onResetPassword:React.PropTypes.func,
    rowSelect:React.PropTypes.func,
    author:React.PropTypes.func,
    editorUser:React.PropTypes.func,
    visible: React.PropTypes.bool,
    userName:React.PropTypes.string,
    userId:React.PropTypes.string,
    role:React.PropTypes.string,
    roleNameList:React.PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
            return {
                dispatch: dispatch,
                requestRoleList: (evt) => dispatch(requestRoleLiset(evt)),
                requestUserList: (evt) => dispatch(requestUserLiset(evt)),
                handleCancelE:(evt) => {
                    dispatch(onShowUserEdit(false));
                },
                onSaveUserEdit:(evt,values) => dispatch(onSaveUserEdit(values)),
                onResetPassword:(evt,record) => dispatch(onResetPassword(record)),
                onShowModal: (evt) => {
                    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
                    dispatch(showModal(true));
                    dispatch(requestUserLisetEdtor({page:-1,limit:-1,nameLike:''}));
                    dispatch(requestRoleLiset({page:-1,limit:-1,nameLike:''}));
                },
                handleCancel: (evt) => {
                    dispatch(showModal(false));
                },
                onSaveUser: (evt)=> {
                    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
                    dispatch(onSaveUser(evt));
                    dispatch(showModal(false));
                },
                onDeleteUser:(evt,arrNo)=> {
                    if(arrNo==""){
                        Modal.confirm({
                            title: '没有选中删除的用户',
                            onCancel() {},
                            onOk(){}
                        })
                    } else if(arrNo.name!=null){
                        Modal.confirm({
                            title: '你确定要删除用户'+arrNo.name+'？',
                            onOk() {
                                dispatch(onDeleteUser(arrNo))
                            },
                            onCancel() {
                            }
                        })
                    }
                    else{
                        Modal.confirm({
                            title: '你确定要删除'+arrNo.length+'个用户？',
                            onOk() {
                                dispatch(onDeleteUser(arrNo))
                            },
                            onCancel() {
                            }
                        })
                    }
                },
                onChangeStatus: (evt,record)=> {
                    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
                    if(record.status==true){
                        record.status=false;
                        dispatch(onChangeStatus(record));
                    }else {
                        record.status=true;
                        dispatch(onChangeStatus(record));
                    }
                },
        onShowUserEdit:(evt,record) =>{
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onShowUserEdit(true));
            dispatch(onGetName(record.name));
            dispatch(setUserAttr(record));
            dispatch(requestUserLisetEdtor({page:-1,limit:-1,nameLike:''}));//换成独有的
            dispatch(requestRoleLiset({page:-1,limit:-1,nameLike:''}));
},
        rowSelect: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(rowSelect(evt))
        },
        author:(evt,record) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(author(record));
            dispatch(onGetName(record.name));

        },
         editorUser:(evt) => {
             if (evt !== undefined && evt.preventDefault) evt.preventDefault();
                dispatch(editorUser(evt));
             },
    }
}
const mapStateToProps = createStructuredSelector({
    visible: selectShowModal(),
    visiblerE:selectShowUserEdit(),
    handleCancelE:selectShowUserEdit(),
    userNameList: selectUsernameList(),
    roleNameList:selectRoleList(),
    userAttribute:selectUserAttribute(),
    arrN:selectRowSelect(),
    userMngData:selectUserMngData(),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMngPage);

