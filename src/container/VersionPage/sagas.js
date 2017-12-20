/**
 * Created by Administrator on 2017/6/27.
 */
import {take, call, put, select, fork, cancel} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {
    requestVersionAllData,
    updataVersionAllData,
    getVersionNamePage,
    getVersionTitle,
    requestVersionTitle,
    onSearchVersion,
    filterVersionData
} from './actions';
import {selectVersionName,selectOnSearchVersionData,selectVersionConditionList} from './selectors';
import request, {post, get} from '../../common/utils/request';
import {API_ALLVERSION_LIST,API_VERSION_LISTMEMBER,API_VERSION_LISTBASEATTRIBUTE} from '../../API';
import alert from '../../common/utils/alert';

// 获取全部版本号
export function* doRequestVersionData(action) {
    const requestURL = API_ALLVERSION_LIST +'?page='+ action.value.page +'&limit='+ action.value.limit +'&nameLike='+ action.value.nameLike;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updataVersionAllData(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
export function* dorequestVersionTitle() {
    const versionData= yield select(selectVersionName());
    const requestURL = API_VERSION_LISTBASEATTRIBUTE + '?id=' +versionData.id;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(getVersionTitle(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//版本管理index页面的查询请求
export function* doOnSearchVersion(action) {
    const nameLike=yield select(selectOnSearchVersionData());
    const requestURL = API_ALLVERSION_LIST +'?nameLike='+ nameLike +'&page='+ action.value.page +'&limit='+ action.value.limit;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updataVersionAllData(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//过滤实体数据list
export function* doFilterVersionData(action) {
    const conditions= yield select(selectVersionConditionList());
    const requestURL = API_VERSION_LISTMEMBER;
    const result = yield call(post, {url: requestURL, data: {versionId:action.value.versionId, condition: conditions,page:action.value.page,limit:action.value.limit}});
    if (result.data && result.data.resultCode === 1) {
        yield put(getVersionNamePage(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}

export function* getRequestVersion() {
    yield *takeLatest(requestVersionAllData().type, doRequestVersionData)
}
export function* GetVersionTitle() {
    yield *takeLatest(requestVersionTitle().type, dorequestVersionTitle)
}
//版本管理index页面的查询请求 doOnSearchVersion
export function* getOnSearchVersionWatcher() {
    yield *takeLatest(onSearchVersion().type, doOnSearchVersion);
}
//过滤版本数据list
export function* getFilterVersionDataWatcher () {
    yield *takeLatest(filterVersionData().type, doFilterVersionData)
}

export default function* entry() {
    const RequestVersionWatcher = yield fork(getRequestVersion);
    const GetVersionTitleWatcher = yield fork(GetVersionTitle);
    const OnSearchVersionWatcher=yield fork(getOnSearchVersionWatcher);
    const GetFilterVersionDataWatcher=yield fork(getFilterVersionDataWatcher)
}










