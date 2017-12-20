import {Form, Button} from 'react-bootstrap';
require("bootstrap/dist/css/bootstrap.css");
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {createStructuredSelector} from 'reselect';
import {requestUser,createUser,setUserId,changeUserName,changePassword,alterUserName,alterUserPsw,deleteUser,changeNewPassword,submitUserChange,changeNewName} from './actions';
import {selectUsernameList,selectUsername,selectPassword,selectError,selectUserId,selectNewPassword,selectAUserName,selectAPassword} from './selectors';
import Dialog from 'react-bootstrap-dialog';

// NavPage 组件是一个整体的组件，最终的React渲染也将只渲染这一个组件
 export class NavPage extends Component {
	 constructor(props) {
		 super(props);
		 this.props.requestUserList();
	 }
	 render(){
		 return (
		 	<div>
                <Button type="Button" className="btn btn-primary btn-lg btn-block">用户管理</Button>
                <div className="align">
                {
                    this.props.error?(<p className="show-err" >{this.props.error}</p>): null
                }
				 <div>
                     <Table class="table table-hover">
                         <tr>
                             <th>用户名</th>
                             <th>密码</th>
                             <th>操作</th>
                         </tr>
						 {
							 (this.props.userNameList || []).map(function(item,i){
								 return (
								     <tr>
									 <td>{item.username}</td>
									 <td>{item.password}</td>
                                     <td>
                                         <Button type="Button" className="btn btn-primary btn-success" onClick={ (e) => this.props.onDeleteUser(e) } data-key={item.id} >delete</Button>
                                         <a href="#" className="btn btn-default btn-flat" data-toggle="modal" data-target="#myModal" aria-hidden="true" onClick={ (e) => this.props.onAlterUser(e) } data-key={item.id} data-user={item.username} data-psw={item.password}>修改</a>
                                     </td>
									 </tr>
								 )
							 }.bind(this))
						 }
					 </Table>
				 </div>
				 <br/>
                <div>
                    <Form role="form"  onSubmit={(e) => this.props.onCreateUser(e)} method="post">
                        <input type="text" name="userName" required value={ this.props.userName } onChange={ (e) => this.props.onChangeUsername(e) } placeholder="用户名" /><br/>
                        <input type="text" name="password" required value={ this.props.password } onChange={ (e) => this.props.onChangePassword(e) } placeholder="密码" /><br/>
                       <input type="submit" className="btn btn-primary btn-success"  defaultValue="增加用户"></input>
                    </Form>
                </div>
                </div>



                <div className="modal fade " id="myModal"   role="dialog" aria-labelledby="exampleModalLabel" >
                    <div  role="document" style={{position: 'relative', width: 350, margin:'8% auto' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                <h4 className="modal-title" id="exampleModalLabel">修改密码</h4>
                            </div>
                            <form onSubmit={(e) => this.props.onChangeUserPsw(e)} method="post">
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="control-label" >
                                        <span style={{color:'red',fontSize:15}}>*</span>用户名</label>
                                        <input type="text" className="form-control"  required value={this.props.AuserName} onChange={ (e) => this.props.onChangeNewName(e) }/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="control-label" >
                                        <span style={{color:'red',fontSize:15}}>*</span>当前密码</label>
                                        <input type="text" className="form-control"  required value={this.props.Apassword}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="control-label">
                                            <span style={{color:'red',fontSize:15}}>*</span>新密码</label>
                                        <input type="text" className="form-control" required value={ this.props.newpassword } onChange={ (e) => this.props.onChangeNewPassword(e) }/>
                                    </div>
                                </div>
                                <div className="modal-footer" style={{textAlign: 'center'}}>
                                    <button type="button" className="btn btn-default" data-dismiss="modal" style={{marginRight:10}}>取消</button>
                                    <button type="submit" className="btn btn-primary" >确定</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

			</div>
		 )
	 }
 };
/**
 * 
 */
NavPage.propTypes = {
    userId: React.PropTypes.string,
    userName: React.PropTypes.string,
    password: React.PropTypes.string,
	userNameList: React.PropTypes.array,
	requestUserList: React.PropTypes.func,
	onCreateUser: React.PropTypes.func,
    onChangeUsername: React.PropTypes.func,
    onChangePassword: React.PropTypes.func,
    onDeleteUser: React.PropTypes.func,
    onAlterUser: React.PropTypes.func,
    error: React.PropTypes.string,
    AuserName: React.PropTypes.string,
    Apassword: React.PropTypes.string,
    newpassword: React.PropTypes.string,
    onChangeNewPassword: React.PropTypes.func,
    onChangeUserPsw: React.PropTypes.func,
    onChangeNewName: React.PropTypes.func,
}

export function mapDispatchToProps(dispatch) {
    return {
        requestUserList: (evt) => dispatch(requestUser(true)),
        onChangeUsername: (evt) => dispatch(changeUserName(evt.target.value)),
        onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
        onCreateUser: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(createUser(true));
        },
        onDeleteUser: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setUserId(evt.target.getAttribute('data-key')));
            dispatch(deleteUser(true));
        },
        onAlterUser: (evt) => {
            dispatch(alterUserName(evt.target.getAttribute('data-user')));
            dispatch(alterUserPsw(evt.target.getAttribute('data-psw')));
            dispatch(setUserId(evt.target.getAttribute('data-key')));
        },
        onChangeNewPassword: (evt) => {
            dispatch(changeNewPassword(evt.target.value));
        },
        onChangeNewName: (evt) => {
            dispatch(alterUserName(evt.target.value));
        },
        // 提交修改密码
        onChangeUserPsw: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(submitUserChange(true));
        },

    };
}
const mapStateToProps = createStructuredSelector({
    userNameList: selectUsernameList(),
    userName: selectUsername(),
    password: selectPassword(),
    userId: selectUserId(),
    error: selectError(),
    AuserName: selectAUserName(),
    Apassword: selectAPassword(),
    newpassword:selectNewPassword(),

});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(NavPage);
