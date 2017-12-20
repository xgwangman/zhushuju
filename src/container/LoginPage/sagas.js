import {take, call, put, select, fork, cancel} from 'redux-saga/effects';
import {SENDING_REQUEST} from './constants';
import {takeLatest} from 'redux-saga';
import {hashHistory} from 'react-router'
import {selectUsername, selectPassword, selectIsCheckRemember} from './selectors';
import {loginError, loginSuccess} from './actions';
import {changeIsAdmin} from '../App/actions';
import {API_LOGIN} from '../../API';
import 'babel-polyfill';
import {push} from 'react-router-redux';
import request, {post,get} from '../../common/utils/request';

export function* doLogin(action) {
    let storage = window.localStorage;
    const resp = yield call(post,{url:'access/login.do',data:action.value});
    if (resp.data && resp.data.resultCode === 1) {
        // if (permanent == true) {
        //     storage["userName"] = value.userName;
        //     storage["password"] = value.password;
        //     storage["permanent"] = true;
        // } else {
        //     storage["userName"] = value.userName;
        //     storage["permanent"] = false;
        // }
        //yield put(changeIsAdmin(true));
        storage.setItem("isAuth",true);
        hashHistory.push('/main');}
        /*var session = window.sessionStorage;
         session.setItem("loginName", resp.data.result.name);
         session.setItem("password", resp.data.result.pwd);
         yield put(loginSuccess(true));
         } else {
         //hashHistory.push('/main');
         console.log(resp.data)
         }
    /*$.ajax({
        type: 'post',
        url: 'access/login.do',
        dataType : 'json',
        contentType:  'application/json; charset=utf-8',
        data :JSON.stringify(action.value)
    }).success(function(data){
        yield put(changeIsAdmin(true));
        hashHistory.push('/main')
       // console.log(JSON.stringify(data));
    }).fail(function(data){
        //console.log(JSON.stringify(data));
    });
    storage.setItem("isAuth",true);
    hashHistory.push('/main');
    */
}
export function* getLoginWatcher() {
    yield *takeLatest(SENDING_REQUEST, doLogin)
}

export default function* entry() {
    const watcher = yield fork(getLoginWatcher);
}