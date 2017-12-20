import 'antd/dist/antd.css';
import {Breadcrumb,Modal} from 'antd';
import React, {Component} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { requestRoleLiset, onShowModalAdd, onChangeRoleStatus, onDeleteRole, setRoleAttr,
         onSaveRole, onShowModalEdit, onSaveRoleEdit, checkdUser, rowSelect, getName,
         author, onGetName, onSearchRolePageData, onSearchRoleData, requestCheckdUserData
} from '../../UserMngPage/actions';
import { selectRoleList, selectOnShowModalAdd, selectOnShowModalEdit, selectRoleAttr,
         selectRowSelect, selectOnSearchRoleData,
} from '../../UserMngPage/selectors';
import AddRoleModalElement from '../component/AddRoleModalElement';
import EditRoleElement from '../component/EditRoleElement';
import RoleListTable from '../component/RoleListTable';
import {SearchBox} from '../../../../common/components/SearchBox';

export  class RoleMngPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestRoleList({page:1,limit:15,nameLike:''});
        this.state={
            searchValue:''
        }
    }
    searchChange=(e)=>{
        this.setState({
            searchValue:e.target.value
        });
        this.props.requestRoleList({page:1,limit:15,nameLike:e.target.value});

    };


    render() {
        var rolenu=this.props.arrN;//delete role的标记
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link to="/main">角色管理</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox
                        placeholder="角色标识或角色名"
                        onChange={this.searchChange}
                    />
                </div>

                <div className="centerContent ">
                <div>
                    <button type="button" className="btn-css"
                            onClick={(e) => this.props.onShowModalAdd(e)}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 增加
                    </button>
                    <button type="button" className="btn-css-del"
                            onClick={(e) =>this.props.onDeleteRole(e, rolenu)}>
                        <span className="glyphicon glyphicon-minus" aria-hidden="true"></span> 删除
                    </button>
                </div>
                <div>
                    <RoleListTable
                        checkdUserR={this.props.checkdUser}
                        onChangeRoleStatusR={this.props.onChangeRoleStatus}
                        requestRoleList={this.props.requestRoleList}
                        setRoleEditAttrR={this.props.setRoleEditAttr}
                        roleListR={this.props.roleList}
                        rowSelectT={this.props.rowSelect}
                        authorR={this.props.author}
                        onDeleteRole={this.props.onDeleteRole}
                        roleNameLike={this.state.searchValue}
                        onSearchRolePageData={this.props.onSearchRolePageData}
                    />
                    <AddRoleModalElement
                        visibleR={this.props.visibler}
                        onSaveRoleR={this.props.onSaveRole}
                        handleCancelR={this.props.handleCancel}
                        roleList={this.props.roleList}
                    />
                    <EditRoleElement
                        name={this.props.name}
                        showEdit={this.props.visiblerE}
                        handleCancelE={this.props.handleCancelE}
                        onSaveRoleE={this.props.onSaveRoleEdit}
                        roleAttribute={this.props.roleAttribute}
                        roleList={this.props.roleList}
                    />
                </div>
                </div>
            </div>
        )
    }

}

RoleMngPage.propTypes={
    requestRoleList: React.PropTypes.func,
    onShowModalAdd:React.PropTypes.func,
    onChangeRoleStatus:React.PropTypes.func,
    onDeleteRole:React.PropTypes.func,
    onSaveRole:React.PropTypes.func,
    onSaveRoleEdit:React.PropTypes.func,
    handleCancel:React.PropTypes.func,
    handleCancelE:React.PropTypes.func,
    onShowModalEdit:React.PropTypes.func,
    checkdUser:React.PropTypes.func,
    setRoleEditAttr:React.PropTypes.func,
    rowSelect:React.PropTypes.func,
    visibler:React.PropTypes.bool,
    visiblerE:React.PropTypes.bool,
    roleList:React.PropTypes.any,
}

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestRoleList: (evt) => dispatch(requestRoleLiset(evt)),
        onShowModalAdd:(evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onShowModalAdd(true));
            dispatch(requestRoleLiset({page:1,limit:15,nameLike:''}));
        },
        handleCancel:(evt) => dispatch(onShowModalAdd(false)),
        setRoleEditAttr:(evt,record) =>{
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onShowModalEdit(true));
            dispatch(onGetName(record.name));
            dispatch(requestRoleLiset({page:1,limit:15,nameLike:''}));
            dispatch(setRoleAttr(record));
            },
        handleCancelE:(evt) => dispatch(onShowModalEdit(false)),
        onChangeRoleStatus: (evt,record)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            if(record.status==true){
                record.status=false;
                dispatch(onChangeRoleStatus(record));
            }else {
                record.status=true;
                dispatch(onChangeRoleStatus(record));
            }
        },
        onDeleteRole:(evt,rolenu)=> {
            if(rolenu==""){
                Modal.confirm({
                    title: '请选择要删除的角色！',
                    onCancel() {},
                    onOk(){}
                })
            } else if(rolenu.name!=null){
                Modal.confirm({
                    title: '你确定要删除角色'+rolenu.name+'？',
                    content: rolenu.length,
                    onOk() {
                        dispatch(onDeleteRole(rolenu))
                    },
                    onCancel() {
                    }
                })
            } else {
                Modal.confirm({
                    title: '你确定要删除角色'+rolenu.length+'个角色？',
                    onOk() {
                        dispatch(onDeleteRole(rolenu))
                    },
                    onCancel() {
                    }
                })
            }
        },
        onSaveRole:(evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onSaveRole(evt))
        },
        onSaveRoleEdit:(evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onSaveRoleEdit(evt))
        },
        checkdUser:(evt,record)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(checkdUser(record.id));
            dispatch(requestCheckdUserData({page:1,limit:15,roleId:record.id}));
            dispatch(onGetName(record.name));
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
    }
}

const mapStateToProps = createStructuredSelector({
    roleList:selectRoleList(),
    visibler:selectOnShowModalAdd(),
    visiblerE:selectOnShowModalEdit(),
    roleAttribute:selectRoleAttr(),
    arrN:selectRowSelect(),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleMngPage);

