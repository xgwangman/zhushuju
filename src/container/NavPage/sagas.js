/**
 * Gets the repositories of the user from Github
 */

import {take,call,put,select,fork,cancel} from 'redux-saga/effects';
import {REQUEST_USER,CREATE_USER,DELETE_USER,SUBMIT_USERCHANGE} from './constants';
import {selectUsername,selectPassword,selectUserId,selectNewPassword,selectAUserName} from './selectors';
import {requestUser,changeUserName,changePassword,ErrorMsg,updateUser} from './actions';
import 'babel-polyfill';
import {push} from 'react-router-redux';
import request from '../../common/utils/request';

/**
 * 创建用户
 */
export function* doCreate() {
    const userName = yield select(selectUsername());
    const password = yield select(selectPassword());
    const requestURL = 'auth/createUser.do?name=' + userName + '&pwd=' + password;

    const resp = yield call(request, requestURL, {
        method: "POST"
    });
    if (resp.data && resp.data.resultCode === 1) {
        yield put(requestUser(true));
        yield put(changeUserName(null));
        yield put(changePassword(null));
    }else {
        yield put(ErrorMsg(resp.data.resultText));
    }
}
/**
 * search用户
 */
export function* doSearch() {
	const requestURL = 'auth/queryall.do';
	const resp = yield call(request, requestURL, {
		method: "GET"
	});
	if (resp.data && resp.data.resultCode === 1) {
		yield put(updateUser(resp.data.result));
	}else {
        yield put(ErrorMsg(resp.data.resultText));
    }
}
/**
 * 删除用户
 */
export function* doDelete() {
    const userId = yield select(selectUserId());
	const requestURL = 'auth/delUser.do?id='+userId;
	const resp = yield call(request, requestURL, {
		method: "POST"
	});
	if (resp.data && resp.data.resultCode === 1) {
		yield put(requestUser(true));
	}else {
        yield put(ErrorMsg(resp.data.resultText));
    }
}
/**
 * 修改用户密码
 */
export function* doUpdate() {
    const userId = yield select(selectUserId());
    const newName = yield select(selectAUserName());
    const newPassword = yield select(selectNewPassword());
	const requestURL = 'auth/updateUser.do?id='+userId+'&pwd='+newPassword+'&name='+newName;
	const resp = yield call(request, requestURL, {
		method: "POST"
	});
	if (resp.data && resp.data.resultCode === 1) {
		yield put(requestUser(true));
	}else {
        yield put(ErrorMsg(resp.data.resultText));
    }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getNavWatcher() {
  while (yield take(REQUEST_USER)) {
	  yield call(doSearch);
  };
}

export function* getCreateWatcher() {
  while (yield take(CREATE_USER)) {
	  yield call(doCreate);
  };
}

export function* getDeleteWatcher() {
  while (yield take(DELETE_USER)) {
	  yield call(doDelete);
  };
}

export function* getUpdateUserWatcher() {
  while (yield take(SUBMIT_USERCHANGE)) {
	  yield call(doUpdate);
  };
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* entry() {

  const watcher = yield fork(getNavWatcher);
  const createWatcher = yield fork(getCreateWatcher);
  const deleteWatcher = yield fork(getDeleteWatcher);
  const UpdateUserWatcher = yield fork(getUpdateUserWatcher);

}