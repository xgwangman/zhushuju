import {take, call, put, select, fork, cancel} from 'redux-saga/effects';
import {hashHistory} from 'react-router';
import {
    requestAppData,
    requestAppSearch,
    updateAppList,
    onSaveApp,
    showAppCreate,
    onDeleteApp,
    onRequestDataSrc,
    updateDataSrcList,
    onRequestDataSearch,
    onSaveDataSource,
    onTestConnection,
    onDeleteDataSource,
    onRequestTableList,
    updateTableList,
    onChangeTableStatus,
    onRequestFieldList,
    updateFieldsList,
    requestTablePage,
    requestTableSearch,
    onRequestSynTableList,
    onRequestSynTableSearch,
    updateSynTableList,
    onRequestSynFieldList,
    updateSynFieldsList,
    requestSynFieldSearch,
    synTablesAction,
    synFieldsAction,
    setReqImportData,
    updateImportData,
    setReqImportSearch,
    setUploadFiles,
    updateUploadFiles,
    updateFilesUpload,
    setConfirmImport,
    setCancelImport,
    setCheckHistory,
    updateCheckHistory,
    setClearImport,
    setImportCheck,
    setCheckHistorySearch,
    filterImportData,
} from './actions';
import {
    selectAppAttr,
    selectReqDataSrc,
    selectDataSourceAttr,
    selectTableAttr,
    selectImportConditionList,
    selectUploadImportData,
    selectImportCheckData
} from './selectors';
import request, {post, get} from '../../common/utils/request';
import {
    API_APP_ADD,
    API_APP_LIST,
    API_APP_UPDATE,
    API_APP_DELETE,
    API_DATASOURCE_LIST,
    API_IGN_ADD,
    API_IGN_UPDATA,
    API_IGN_TESTCONNECT,
    API_IGN_DELETE,
    API_DTSRC_LISTTABLES,
    API_DTSRC_ENABLETABLE,
    API_DTSRC_DISABLETABLE,
    API_DTSRC_LISTTABLEFIELDS,
    API_DTSRC_LISTSYNTABLES,
    API_DTSRC_LISTSYNTABLESFIELDS,
    API_DTSRC_SYNTABLES,
    API_DTSRC_SYNTABLE,
    API_IMPORT_QUERYENTITY,
    API_IMPORT_CONFIRMAPPROVE,
    API_IMPORT_CANCELREJECT,
    API_IMPORT_QUERYIMPORTLOG,
    API_IMPORT_CLEARIMPORTDATA,
    API_IMPORT_QUERYIMPENTITYDATA
} from '../../API';
import {takeLatest} from 'redux-saga';
import alert from '../../common/utils/alert';

// 请求应用系统
export function* doRequestAppList() {
    const requestURL = API_APP_LIST;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateAppList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求应用系统搜索框
export function* doRequestAppSearch(action) {
    const requestURL = API_APP_LIST + '?nameLike=' + action.value;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateAppList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 新增应用系统/修改应用系统
export function* doSaveApp() {
    var requestURL;
    const appAttr = yield select(selectAppAttr());
    if (appAttr.id) {
        requestURL = API_APP_UPDATE;
    } else {
        requestURL = API_APP_ADD;
    }
    let result = yield call(post, {url: requestURL, data: appAttr});
    if (result.data && result.data.resultCode == 1) {
        yield put(showAppCreate(false));
        yield call(doRequestAppList);
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 删除数据子集
export function* doDeleteApp(action) {
    const requestURL = API_APP_DELETE;
    let result = yield call(post, {url: requestURL, data: {id: action.value}});
    if (result.data && result.data.resultCode == 1) {
        yield call(doRequestAppList);
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求应用系统下的数据源
export function* doReqDataSrc() {
    var reqData = yield select(selectReqDataSrc());
    const requestURL = API_DATASOURCE_LIST + '?appId=' + reqData.appId + '&direct=' + reqData.direct;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateDataSrcList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求应用系统下的数据源搜索框
export function* doReqDataSearch(action) {
    var reqData = yield select(selectReqDataSrc());
    const requestURL = API_DATASOURCE_LIST + '?appId=' + reqData.appId + '&direct=' + reqData.direct + '&nameLike=' + action.value;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateDataSrcList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 新增数据源/修改数据源
export function* doSaveDataSrc(action) {
    var requestURL;
    const dataSrcAttr = yield select(selectDataSourceAttr());
    const reqData = yield select(selectReqDataSrc());
    if (dataSrcAttr.id) {
        requestURL = API_IGN_UPDATA;
        let result = yield call(post, {url: requestURL,
            data: {
                id: action.value.paId.intId,
                appId: action.value.paId.intId,
                name: action.value.cont.name,
                remark: action.value.cont.remark,
                synPeriod: action.value.cont.synPeriod,
                isSyn:  action.value.cont.isSyn,
            }});
        if (result.data && result.data.resultCode == 1) {
            alert(result.data.resultText, 'success');
            hashHistory.push('/integration/dataSrc/'+ reqData.appId +'/'+ reqData.appName);
            yield call(doReqDataSrc);
            yield call(doRequestAppList);
            alert(result.data.resultText, 'success');
        } else {
            alert(result.data.resultText, 'error');
        }
    } else {
        requestURL = API_IGN_ADD;
        let result = yield call(post, {url: requestURL, data: dataSrcAttr});
        if (result.data && result.data.resultCode == 1) {
            hashHistory.push('/integration/dataSrc/'+ reqData.appId +'/'+ reqData.appName);
            yield call(doReqDataSrc);
            yield call(doRequestAppList);
            alert(result.data.resultText, 'success');
        } else {
            alert(result.data.resultText, 'error');
        }
    }
}
// 测试链接
export function* doTestConnection() {
    var requestURL = API_IGN_TESTCONNECT;
    const dataSrcAttr = yield select(selectDataSourceAttr());
    let result = yield call(post, {url: requestURL, data: dataSrcAttr});
    if (result.data && result.data.resultCode == 1) {
        alert(result.data.resultText, 'success')
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 删除数据源
export function* doDeleteDataSource(action) {
    const requestURL = API_IGN_DELETE;
    let result = yield call(post, {url: requestURL, data: {id: action.value}});
    if (result.data && result.data.resultCode == 1) {
        yield call(doReqDataSrc);
        yield call(doRequestAppList);
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求table
export function* doRequestTableList(action) {
    const requestURL = API_DTSRC_LISTTABLES + '?dsId=' + action.value.id +'&page='+ action.value.page + '&limit=' + action.value.limit +'&nameLike='+ action.value.nameLike;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(updateTableList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求table表page
export function* doRequestTablePage(action) {
    const requestURL = API_DTSRC_LISTTABLES + '?dsId=' + action.value.id + '&page='+ action.value.page + '&limit=' + action.value.limit +'&nameLike='+ action.value.nameLike;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(updateTableList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求table表的搜索框数据
export function* doRequestTableSearch(action) {
    // var dataSourceAttr = yield select(selectDataSourceAttr());
    const requestURL = API_DTSRC_LISTTABLES + '?dsId=' + action.value.id + '&page='+ action.value.page + '&limit=' + action.value.limit + '&nameLike=' + action.value.nameLike;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(updateTableList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}

// 改变table的状态（是否可用）
export function* doChangeTableStatus(action) {
    var requestURL;
    var dataSourceAttr = yield select(selectDataSourceAttr());
    if (action.value.status == true) {
        requestURL = API_DTSRC_ENABLETABLE;
    } else if (action.value.status == false) {
        requestURL = API_DTSRC_DISABLETABLE;
    }
    let result = yield call(post, {url: requestURL, data: {id: action.value.id, dsId: dataSourceAttr.id}});
    if (result.data && result.data.resultCode == 1) {
        // yield call(doRequestTableList);
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求表字段list
export function* doRequestTableFields(action) {
    if(action.value.nameLike){
        const requestURL = API_DTSRC_LISTTABLEFIELDS + '?dsId=' + action.value.dsId + '&tableId=' + action.value.tableId + '&page='+action.value.page + '&limit=' +action.value.limit + '&nameLike=' + action.value.nameLike;
        const result = yield call(get, requestURL);
        if (result.data && result.data.resultCode == 1) {
            yield put(updateFieldsList(result.data));
        } else {
            alert(result.data.resultText, 'error');
        }
    }else{
        const requestURL = API_DTSRC_LISTTABLEFIELDS + '?dsId=' + action.value.dsId + '&tableId=' + action.value.tableId + '&page='+action.value.page + '&limit=' +action.value.limit;
        const result = yield call(get, requestURL);
        if (result.data && result.data.resultCode == 1) {
            yield put(updateFieldsList(result.data));
        } else {
            alert(result.data.resultText, 'error');
        }
    }

}
// 请求同步table列表
export function* doRequestSynTables() {
    var dataSourceAttr = yield select(selectDataSourceAttr());
    const requestURL = API_DTSRC_LISTSYNTABLES + '?dsId=' + dataSourceAttr.id;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(updateSynTableList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求同步table列表搜索框
export function* doRequestSynSearch(action) {
    var dataSourceAttr = yield select(selectDataSourceAttr());
    const requestURL = API_DTSRC_LISTSYNTABLES + '?dsId=' + dataSourceAttr.id + '&nameLike=' + action.value;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(updateSynTableList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求同步table列表
export function* doRequestSynFields(action) {
    var dataSourceAttr = yield select(selectDataSourceAttr());
    var tableAttr = yield select(selectTableAttr());
    const requestURL = API_DTSRC_LISTSYNTABLESFIELDS + '?dsId=' + dataSourceAttr.id + '&tableId=' + tableAttr.id + '&page='+action.value.page + '&limit=' +action.value.limit;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(updateSynFieldsList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求同步table列表的搜索框
export function* doRequestSynFieldSearch(action) {
    var dataSourceAttr = yield select(selectDataSourceAttr());
    var tableAttr = yield select(selectTableAttr());
    const requestURL = API_DTSRC_LISTSYNTABLESFIELDS + '?dsId=' + dataSourceAttr.id + '&tableId=' + tableAttr.id + '&page='+action.value.page + '&limit=' +action.value.limit + '&nameLike=' + action.value.nameLike;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(updateSynFieldsList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 更新表
export function* doSynTables() {
    var dataSourceAttr = yield select(selectDataSourceAttr());
    const requestURL = API_DTSRC_SYNTABLES;
    const result = yield call(post, {url: requestURL, data: {dsId: dataSourceAttr.id}});
    if (result.data && result.data.resultCode == 1) {
        yield call(doRequestSynTables);
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 更新一个表
export function* doSynFields() {
    var dataSourceAttr = yield select(selectDataSourceAttr());
    var tableAttr = yield select(selectTableAttr());
    const requestURL = API_DTSRC_SYNTABLE;
    const result = yield call(post, {url: requestURL, data: {dsId: dataSourceAttr.id, id: tableAttr.id}});
    if (result.data && result.data.resultCode == 1) {
        yield call(doRequestSynFields);
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 获取导入实体列表数据
export function* doReqImportData (action) {
    const requestURL = API_IMPORT_QUERYENTITY + '?page='+action.value.page + '&limit=' +action.value.limit + '&nameLike=' + action.value.nameLike;
    const result = yield call(get, requestURL);
    if(result.data && result.data.resultCode == 1){
        yield put(updateImportData({result: result.data.result,totalProperty: result.data.totalProperty}));
    }else{
        alert(result.data.resultText, 'error');
    }
}
//获取导入实体数据搜索框
export function* doImportDataSearch(action) {
    const requestURL = API_IMPORT_QUERYENTITY + '?page='+action.value.page + '&limit=' +action.value.limit + '&nameLike=' + action.value.nameLike;
    const result = yield call(get, requestURL);
    if(result.data && result.data.resultCode == 1){
        yield put(updateImportData({result: result.data.result,totalProperty: result.data.totalProperty}));
    }else{
        alert(result.data.resultText, 'error');
    }
}

//获取上传页面分页数据
export function* doUploadPage(action) {
    const requestURL = API_IMPORT_QUERYIMPENTITYDATA;
    const result = yield call(post, { url: requestURL,data: {logId: action.value.id,page:action.value.page,limit:action.value.limit}});
    if(result.data && result.data.resultCode == 1){
        yield put(updateUploadFiles(result.data));
        yield put(updateFilesUpload(result.data.result));
    }else{
        alert(result.data.resultText, 'error');
    }
}
//过滤实体数据list
export function* doFilterImportData() {
    const conditions= yield select(selectImportConditionList());
    let conditionsArr = conditions?conditions:[];
    var importAppId = yield select(selectUploadImportData());
    var importLogId = yield select(selectImportCheckData());
    const requestURL = API_IMPORT_QUERYIMPENTITYDATA;
    const result = yield call(post, {url: requestURL, data: {logId: importAppId.id || importLogId.id, condition: conditionsArr}});
    if (result.data && result.data.resultCode === 1) {
        yield put(updateUploadFiles(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}

//请求确认导入数据
export function* doConfirmImport(action) {
    const requestURL = API_IMPORT_CONFIRMAPPROVE;
    const result = yield call(post, {url: requestURL, data:{id: action.value}});
    if(result.data && result.data.resultCode == 1){
        hashHistory.push('importMasterData');
    }else{
        alert(result.data.resultText, 'error');
    }
}
//请求取消导入数据
export function* doCancelImport(action) {
    const requestURL = API_IMPORT_CANCELREJECT;
    const result = yield call(post, {url: requestURL, data:{id: action.value}});
    if(result.data && result.data.resultCode == 1){
        hashHistory.push('importMasterData');
    }else{
        alert(result.data.resultText, 'error');
    }
}
//请求导入历史数据
export function* doCheckHistoryData(action) {
    if(action){
        const requestURL = API_IMPORT_QUERYIMPORTLOG + '?page=' + action.value.page + '&limit=' + action.value.limit +'&namLike='+ action.value.nameLike;
        const result = yield call(get, requestURL);
        if(result.data && result.data.resultCode == 1){
            yield put(updateCheckHistory({result: result.data.result,totalProperty: result.data.totalProperty}));
        }else{
            alert(result.data.resultText, 'error');
        }
    }else{
        const requestURL = API_IMPORT_QUERYIMPORTLOG;
        const result = yield call(get, requestURL);
        if(result.data && result.data.resultCode == 1){
            yield put(updateCheckHistory({result: result.data.result,totalProperty: result.data.totalProperty}));
        }else{
            alert(result.data.resultText, 'error');
        }
    }
}
//请求导入历史数据搜索
export function* doCheckHistorySearch(action) {
    const requestURL = API_IMPORT_QUERYIMPORTLOG + '?page=' + action.value.page + '&limit=' + action.value.limit + '&nameLike=' + action.value.nameLike;
    const result = yield call(get, requestURL);
    if(result.data && result.data.resultCode == 1){
        yield put(updateCheckHistory({result: result.data.result,totalProperty: result.data.totalProperty}));
    }else{
        alert(result.data.resultText, 'error');
    }
}
//请求清除导入数据
export function* doClearImport(action) {
    const requestURL = API_IMPORT_CLEARIMPORTDATA;
    const result = yield call(post, {url: requestURL, data:{id: action.value}});
    if(result.data && result.data.resultCode == 1){
        yield call(doCheckHistoryData);
    }else{
        alert(result.data.resultText, 'error');
    }
}
//请求历史数据查看
export function* doImportCheck(action) {
    const requestURL = API_IMPORT_QUERYIMPENTITYDATA;
    const result = yield call(post, {url: requestURL, data:{logId: action.value.id,page:action.value.page,limit:action.value.limit}});
    if(result.data && result.data.resultCode == 1){
        yield put(updateUploadFiles(result.data));
        yield put(updateFilesUpload(result.data.result));
    }else{
        alert(result.data.resultText, 'error');
    }
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====================================================================
//请求应用系统
export function* getRequestAppWatcher() {
    yield *takeLatest(requestAppData().type, doRequestAppList)
}
//请求应用系统搜索框
export function* getRequestSearchWatcher() {
    yield *takeLatest(requestAppSearch().type, doRequestAppSearch)
}
//添加/更改应用系统
export function* getSaveAppWatcher() {
    yield *takeLatest(onSaveApp().type, doSaveApp)
}
//删除应用系统
export function* getDeleteAppWatcher() {
    yield *takeLatest(onDeleteApp().type, doDeleteApp)
}
//请求应用系统的采集数据源
export function* getReqGatherDataSrcWatcher() {
    yield *takeLatest(onRequestDataSrc().type, doReqDataSrc)
}
//请求应用系统的采集数据搜索框
export function* getReqGatherDataSearchWatcher() {
    yield *takeLatest(onRequestDataSearch().type, doReqDataSearch)
}
//保存数据源
export function* getSaveDataSrcWatcher() {
    yield *takeLatest(onSaveDataSource().type, doSaveDataSrc)
}
//测试连接
export function* getTestConnectionWatcher() {
    yield *takeLatest(onTestConnection().type, doTestConnection)
}
//删除数据源
export function* getDeleteDataSrcWatcher() {
    yield *takeLatest(onDeleteDataSource().type, doDeleteDataSource)
}
//请求tableList
export function* getRequestTableListWatcher() {
    yield *takeLatest(onRequestTableList().type, doRequestTableList)
}
//请求tableList表分页
export function* getRequestTablePageWatcher() {
    yield *takeLatest(requestTablePage().type, doRequestTablePage)
}
//请求table表的搜索框数据
export function* getRequestTableSearchWatcher () {
    yield *takeLatest(requestTableSearch().type, doRequestTableSearch)
}
//改变table的状态
export function* getChangeTableStatusWatcher() {
    yield *takeLatest(onChangeTableStatus().type, doChangeTableStatus)
}
//请求表字段
export function* getRequestTableFieldsWatcher() {
    yield *takeLatest(onRequestFieldList().type, doRequestTableFields)
}
//请求同步表列表
export function* getRequestSynTablesWatcher() {
    yield *takeLatest(onRequestSynTableList().type, doRequestSynTables)
}
//请求同步列表搜索框
export function* getRequestSynSearchWatcher () {
    yield *takeLatest(onRequestSynTableSearch().type, doRequestSynSearch)
}
//请求同步字段列表
export function* getRequestSynFieldsWatcher() {
    yield *takeLatest(onRequestSynFieldList().type, doRequestSynFields)
}
//请求同步字段列表的搜索框
export function* getRequestSynFieldSearchWatcher () {
    yield *takeLatest(requestSynFieldSearch().type, doRequestSynFieldSearch)
}
//更新表
export function* getSynTablesWatcher() {
    yield *takeLatest(synTablesAction().type, doSynTables)
}
//更新表
export function* getSynFieldsWatcher() {
    yield *takeLatest(synFieldsAction().type, doSynFields)
}
//请求导入实体列表数据
export function* getReqImportDataWatcher () {
    yield *takeLatest(setReqImportData().type, doReqImportData)
}
//请求导入实体数据搜索
export function* getReqImportDataSearchWatcher () {
    yield *takeLatest(setReqImportSearch().type, doImportDataSearch)
}
//请求上传文件显示页面
export function* getUploadFilesPageWatcher () {
    yield *takeLatest(setUploadFiles().type, doUploadPage)
}
//过滤导入数据list
export function* getFilterImportDataWatcher () {
    yield *takeLatest(filterImportData().type, doFilterImportData)
}
//请求确认导入数据
export function* getConfirmImportDataWatcher () {
    yield *takeLatest(setConfirmImport().type, doConfirmImport)
}
//请求取消导入数据
export function* getCancelImportDataWatcher () {
    yield *takeLatest(setCancelImport().type, doCancelImport)
}
//请求历史导入数据
export function* getCheckHistoryDataWatcher () {
    yield *takeLatest(setCheckHistory().type, doCheckHistoryData)
}
//请求历史导入数据搜索
export function* getCheckHistorySearchWatcher () {
    yield *takeLatest(setCheckHistorySearch().type, doCheckHistorySearch)
}
//请求清除导入数据
export function* getClearImportDataWatcher () {
    yield *takeLatest(setClearImport().type, doClearImport)
}
//请求导入数据查看
export function* getImportDataCheckWatcher () {
    yield *takeLatest(setImportCheck().type, doImportCheck)
}

/**
 * *****************************************************************
 * Root saga manages watcher lifecycle
 */
export default function* entry() {
    const requestAppListwatcher = yield fork(getRequestAppWatcher);
    const requestSearchWatcher=yield fork(getRequestSearchWatcher);
    const saveAppwatcher = yield fork(getSaveAppWatcher);
    const deleteAppwatcher = yield fork(getDeleteAppWatcher);
    const reqGatherDataSrcwatcher = yield fork(getReqGatherDataSrcWatcher);
    const reqGatherDataSearchwatcher=yield fork(getReqGatherDataSearchWatcher)
    const saveDataSrcWatcher = yield fork(getSaveDataSrcWatcher);
    const testConnectWatcher = yield fork(getTestConnectionWatcher);
    const deleteDataSrcWatcher = yield fork(getDeleteDataSrcWatcher);
    const requestTableListWatcher = yield fork(getRequestTableListWatcher);
    const requestTablePageWatcher = yield fork(getRequestTablePageWatcher);
    const requestTableSearchWatcher = yield fork(getRequestTableSearchWatcher);
    const changeTableStatusWatcher = yield fork(getChangeTableStatusWatcher);
    const reqTableFieldsWatcher = yield fork(getRequestTableFieldsWatcher);
    const reqSynTablesWatcher = yield fork(getRequestSynTablesWatcher);
    const reqSynSearchWatcher= yield fork(getRequestSynSearchWatcher);
    const reqSynFieldsWatcher = yield fork(getRequestSynFieldsWatcher);
    const reqSynFieldSearchWatcher = yield fork(getRequestSynFieldSearchWatcher);
    const synTablesWatcher = yield fork(getSynTablesWatcher);
    const synFieldssWatcher = yield fork(getSynFieldsWatcher);
    const requestImportDataWatcher= yield fork(getReqImportDataWatcher);
    const requestImportDataSearchWatcher = yield fork(getReqImportDataSearchWatcher);
    const requestConfirmImportDataWatcher= yield fork(getConfirmImportDataWatcher);
    const requestCancelImportDataWatcher = yield fork(getCancelImportDataWatcher);
    const requestCheckHistoryDataWatcher = yield fork(getCheckHistoryDataWatcher);
    const requestCheckHistorySearchWatcher = yield fork(getCheckHistorySearchWatcher);
    const requestClearImportDataWatcher = yield fork(getClearImportDataWatcher);
    const requestImportDataCheckWatcher = yield fork(getImportDataCheckWatcher);
    const requestFilterImportDataWatcher = yield fork(getFilterImportDataWatcher);
    const requestUploadFilesPageWatcher = yield fork(getUploadFilesPageWatcher);
}