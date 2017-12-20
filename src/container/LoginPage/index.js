require("../../../css/login/login.css");
require("../../../css/login/style.css");
require("../../../css/login/font-awesome.min-3.2.1.css");
import {Form, Button} from 'react-bootstrap';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router'
import {loginRequest} from './actions';
import LoadingButton from '../../common/components/LoadingButton';
import {selectUsername,selectPassword,selectIsCheckRemember,selectIsSending,selectError} from './selectors';
import {createStructuredSelector} from 'reselect';
export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state={userNo:'',userPwd:''}
    }
    onClickLogin=(obj)=>{
        let storage = window.localStorage;
        $.ajax({
            type: 'POST',
            url: 'access/login.do',
            dataType : 'json',
            contentType:  'application/json; charset=utf-8',
            data :JSON.stringify(obj)
        }).success(function(data){
            debugger
            if(data.resultCode==1){
                storage.setItem("isAuth",true);
                hashHistory.push('/main');
            }else{
                console.log("登录失败了。。。。")
            }
        }).fail(function(data){
            console.log('登录失败了。。。。');
        });
    }
    render() {
        return (
        <div className="login-bg body" style={{width:'100%',height:'100%'}}>
            <div className="hmlg-bg-t"></div>
            <div className="hmlg-box">
                <div className="form-logo"><img src="images/logo-txt.png" /></div>
                <div className="hmlg-form">
                <input type="text" className="hmlg-input" placeholder="用户名" value={ this.state.userNo } onChange={ (e) => this.setState({userNo:e.target.value})}/>
                <input type="password" className="hmlg-input" placeholder="密码" value={ this.state.userPwd } onChange={ (e) => this.setState({userPwd:e.target.value})}/>
                <button className="hmlg-btn" type="button" onClick={()=>{this.onClickLogin({userNo:this.state.userNo,userPwd:this.state.userPwd})}}>登&nbsp;&nbsp;录</button>
            </div>
            </div>
        </div>
        );
    };
}
export function mapDispatchToProps(dispatch) {
    return {
        onClickLogin: (value) => {dispatch(loginRequest(value));}
    };
}
const mapStateToProps = createStructuredSelector({
    checkRemember: selectIsCheckRemember(),
    currentlySending: selectIsSending(),
    error: selectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);