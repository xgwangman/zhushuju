import {take, call, put, select, fork, cancel} from 'redux-saga/effects';
import {takeLatest,takeEvery} from 'redux-saga';
import {hashHistory} from 'react-router';
import {
    requestDomainData,
    exportDomain,
    UpdateDomainData,
    onRequestEntityList,
    UpdateEntityList,
    onRequestAttrList,
    UpdateAttrList,
    onRequestEntityDataList,
    UpdateEntityDataList,
    filterEntityData,
    onSaveVersion,
    showAddVersion,
    onRequestAllVersions,
    setEntityVersionList,
    onRequestEntityGatherDataList,
    requestDataAuditRecord,
    UpdateDataAuditRecord,
    showAuditDataModal,
    filterEntityAuditData,
    onChangeStatus,
    requestEntityTask,
    updateEntityTaskList,
    reqDataSourceList,
    updateDataSourceList,
    onSaveTask,
    onUpdateTask,
    //^^^^^^^^^^^^^^^^^^^^^^^^
    requestVersionDataList,
    UpdateVersionDataList,
    UpdateVersionAttrList,
    requestVersionAttrList,
    filterVersionData,
    saveTaskArray,
    reqTaskArrayList,
    updateTaskArrayList,
    requestTables,
    updateTableList,
    requestFields,
    updateFieldList,
    changeTaskStatus,
    excuteSqlSentence,
    // LIXOAKANG
    reqHandleTaskExecuteLog,
    updateTaskExecuteLogPage,
    setSQLfieldList,
    //jiang
    requestFilterData,filterDataList,approveEntity,exportEtyData,onRequestBaseAttrList,entityBaseAttrList,reqTaskById,setTaskAttr,
    requestUcList,setUcList
} from './actions';
import {
    selectEntityData,
    selectConditionList,
    selectVersionData,
    selectCheckVersion,
    selectTaskExecute,
} from './selectors';
import request, {post, get} from '../../common/utils/request';
import {
    API_MASTERDATA_LIST,
    API_EXPORTMETADATA,
    API_MASTERDATA_LISTENTITY,
    API_ATTRIBUTE_LIST,
    API_LISTMEMBER,
    API_VERSION_ADD,
    API_ALLVERSION_LIST,
    API_LISTAUDITMEMBER,
    API_LISTMEMBERTRACK,
    API_ENTITY_ENABLED,
    API_ENTITY_DISABLE,
    API_GATHER_LIST,
    API_SHARE_LIST,
    API_DATASOURCE_LIST,
    API_GATHER_ADD,
    API_GATHER_UPDATE,
    API_SHARE_ADD,
    API_SHARE_UPDATE,
    API_VERSION_LISTMEMBER,
    API_VERSION_LISTBASEATTRIBUTE,
    API_GATHER_ARRANGE,
    API_GATHER_GETFLOW,
    API_DTSRC_LISTENABLETABLES,
    API_DTSRC_LISTTABLEFIELDS,
    API_GATHER_ENABLED,
    API_GATHER_DELETE,
    API_SHARE_DELETE,
    API_SHARE_ENABLED,
    API_GATHER_DISABLE,
    API_SHARE_DISABLE,
    API_SHARE_START,
    API_GATHER_START,
    API_GATHER_STOP,
    API_SHARE_STOP,
    API_GATHER_COMPONENT_GETSQLMETA,
    API_GATHER_LISTLOG,
    API_GATHER_CLEARLOG,
    API_ATTRIBUTE_LISTBASE,
    API_APPROVEMEMBER
} from '../../API';
import alert from '../../common/utils/alert';

// 查询数据子集list
export function* doRequestDomainData(action) {
    const requestURL = API_MASTERDATA_LIST;
    const result = yield call(get, requestURL+'?nameLike='+action.value.nameLike);
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateDomainData(result.data.result));
    } else if (result.data && result.data.resultCode){
        alert(result.data.resultText, 'error');
    }
}
// 导出数据子集
/*export function* doExportDomain(action) {
    const requestURL = API_EXPORTMETADATA;
    let result = yield call(post, {url: requestURL, data: {id: action.value}});
    if (result.data && result.data.resultCode == 1) {
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}*/
// 查询实体list
export function* doRequestEntityList(action) {
    //const modeldata = yield select(selectModelData());
    const requestURL = API_MASTERDATA_LISTENTITY + '?modelId=' + action.value.modelId+'&page='+action.value.page+'&limit='+action.value.limit+'&nameLike='+action.value.nameLike;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateEntityList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 改变实体是否启用
export function* doChangeStatus(action) {
    var requestURL;
    if (action.value.status == true) {
        requestURL = API_ENTITY_ENABLED;
    } else if (action.value.status == false) {
        requestURL = API_ENTITY_DISABLE;
    }
    let result = yield call(post, {url: requestURL, data: {id: action.value.id}});
    if (result.data && result.data.resultCode == 1) {
        //yield call(doRequestEntityList);
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 查询属性list
export function* doRequestAttrList(action) {
    //const entityData = yield select(selectEntityData());
    let requestURL='';
    if(action.value&&action.value.page){
        requestURL = API_ATTRIBUTE_LIST + '?entityId=' +action.value.entityId+'&page='+action.value.page+'&limit='+action.value.limit+'&nameLike='+action.value.nameLike;
    }else if(action.value&&action.value.nameLike){
        requestURL = API_ATTRIBUTE_LIST + '?entityId=' + action.value+'&nameLike='+action.value.nameLike;
    }else{
        requestURL = API_ATTRIBUTE_LIST + '?entityId=' + action.value;
    }
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateAttrList({pageNum:result.data.totalProperty,data:result.data.result}));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 查询实体数据list
export function* doRequestEntityDataList(action) {
    const requestURL = API_LISTMEMBER;
    const result = yield call(post,
        {url: requestURL,
            data: {entityId: action.value.entityId,page:action.value.page,limit:action.value.limit}});
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateEntityDataList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 过滤实体数据list
export function* doRequestFilterEntityDataList(action) {
    const conditions = yield select(selectConditionList());
    const entityData = yield select(selectEntityData());
    const requestURL = API_LISTMEMBER;
    const result = yield call(post, {url: requestURL, data: {entityId: action.value.entityId,page:action.value.page,limit:action.value.limit, condition: conditions}});
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateEntityDataList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 发布版本
export function* doSaveVersion() {
    const version = yield select(selectVersionData());
    const entityData = yield select(selectEntityData());
    if(version.versionNo=='')return;
    const requestURL = API_VERSION_ADD;
    const result = yield call(post, {
        url: requestURL,
        data: {entityId: entityData.id, versionNo: version.versionNo, remark: version.remark}
    });
    if (result.data && result.data.resultCode === 1) {
        yield put(showAddVersion(false));
        alert('发布成功', 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求实体的历史版本
export function* doReqEntityVersions(action) {
    //const entityData = yield select(selectEntityData());
    const requestURL = API_ALLVERSION_LIST + '?entityId=' +action.value.entityId+'&page='+action.value.page+'&limit='+action.value.limit+'&nameLike='+action.value.nameLike;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(setEntityVersionList({pageNum:result.data.totalProperty,data:result.data.result}));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求实体的待审批数据
export function* doReqEntityGatherData(action) {
    const requestURL = API_LISTAUDITMEMBER;
    const result = yield call(post,
        {url: requestURL, data:
            {entityId: action.value.entityId,page:action.value.page,limit:action.value.limit}});
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateEntityDataList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求实体数据的审计记录
export function* doReqDataAuditRecord(params) {
    const requestURL = API_LISTMEMBERTRACK;
    const result = yield call(post, {
        url: requestURL, data: {entityId:params.value.entityId,uuid:params.value.uuid,attId: params.value.attId}
    });
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateDataAuditRecord(result.data.result));
        yield put(showAuditDataModal(true));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 过滤待审核的数据list
export function* doFilterEntityAuditData(action) {
    const conditions = yield select(selectConditionList());
    const requestURL = API_LISTAUDITMEMBER;
    const result = yield call(post, {url: requestURL, data: {entityId: action.value.entityId,page:action.value.page,limit:action.value.limit, condition: conditions}});
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateEntityDataList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 查询版本数据list
export function* dorequestVersionDataList(action) {
    const versionData = yield select(selectCheckVersion());
    const conditions = yield select(selectConditionList());
    const requestURL = API_VERSION_LISTMEMBER;
    const result = yield call(post, {url: requestURL,
        data: {versionId: action.pagination.versionId, condition: conditions ?conditions:[],page:action.pagination.page,limit:action.pagination.limit}});
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateVersionDataList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}

// 查询版本属性list
export function* doRequestVersionAttrList(action) {
    const versionData = yield select(selectCheckVersion());
    const requestURL = API_VERSION_LISTBASEATTRIBUTE + '?id=' + action.pagination.versionId;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateVersionAttrList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 过滤版本数据list
export function* doFilterVersionData(action) {
    const conditions = yield select(selectConditionList());
    const versionData = yield select(selectCheckVersion());
    const requestURL = API_VERSION_LISTMEMBER;
    const result = yield call(post, {url: requestURL,
        data: {versionId: versionData, condition: conditions,page:action.pagination.page,limit:action.pagination.limit,versionId:action.pagination.versionId}});
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateVersionDataList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
/*// 请求版本数据的审计记录
 export function* doReqDataAuditRecord(params) {
 const entityData = yield select(selectEntityData());
 const requestURL = API_LISTMEMBERTRACK;
 const result = yield call(post, {
 url: requestURL, data: {
 entityId: entityData.id, uuid: params.value.uuid,
 attId: params.value.attId,
 }
 });
 if (result.data && result.data.resultCode === 1) {
 yield put(UpdateDataAuditRecord(result.data.result));
 yield put(showAuditDataModal(true));
 } else {
 alert(result.data.resultText, 'error');
 }
 }*/

//task
// 查询实体的任务
export function* doReqEntityTask(action) {
    let requestURL;
    const taskType = action.value.taskType;
    if (taskType == "gather") {
        requestURL = API_GATHER_LIST + '?entityId=' + action.value.entityId+'&nameLike='+action.value.nameLike;
    } else if (taskType == "share") {
        requestURL = API_SHARE_LIST + '?entityId=' + action.value.entityId+'&nameLike='+action.value.nameLike;
    }
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateEntityTaskList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求所有的采集数据源
export function* doReqDataSourceList() {
    const requestURL = API_DATASOURCE_LIST + '?direct=UP';
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateDataSourceList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 添加任务
export function* doSaveGatherTask(action) {
    let {domainName,modelName,modelId,entityName,entityId,taskType,taskData}=action.value;
    //const taskData = yield select(selectEntityTaskAttr());
    let requestURL;
    if (taskType == "gather") {
        requestURL = API_GATHER_ADD;
    } else if (taskType == "share") {
        requestURL = API_SHARE_ADD;
    }
    const result = yield call(post, {url: requestURL, data: taskData});
    if (result.data && result.data.resultCode === 1) {
        hashHistory.push('/main/entity/task/'+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+entityId+'/'+taskType);
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 更新任务
export function* doUpdateGatherTask(action) {
    let {domainName,modelName,modelId,entityName,entityId,taskType,taskData}=action.value;
    //const taskData = yield select(selectEntityTaskAttr());
    let requestURL;
    if (taskType == "gather") {
        requestURL = API_GATHER_UPDATE;
    } else if (taskType == "share") {
        requestURL = API_SHARE_UPDATE;
    }
    const result = yield call(post, {url: requestURL, data: taskData});
    if (result.data && result.data.resultCode === 1) {
        hashHistory.push('/main/entity/task/'+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+entityId+'/'+taskType);
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 保存任务流程编排
export function* doSaveTaskArray(action) {
    let {domainName,modelName,modelId,entityName,entityId,taskId,taskType,taskDefine}=action.value;
    const requestURL = API_GATHER_ARRANGE;
    //const taskData = yield select(selectEntityTaskAttr());
    const result = yield call(post, {url: requestURL, data: {id: taskId, flowDefine: taskDefine}});
    if (result.data && result.data.resultCode === 1) {
        hashHistory.push('/main/entity/task/'+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+entityId+'/'+taskType);
        alert('保存成功', 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求任务流程编排
export function* doReqTaskFlow(action) {
    const requestURL = API_GATHER_GETFLOW + '?id=' + action.value;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateTaskArrayList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求表list
export function* doReqTableList(action) {
    const requestURL = API_DTSRC_LISTENABLETABLES+'?dsId='+action.value;
    if(action.value=='xxx'){
        yield put(updateTableList([]));
        return ;
    }
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateTableList(result.data.result));
    } else {
        yield put(updateTableList([]));
        //alert(result.data.resultText, 'error');
    }
}
// 请求字段list
export function* doReqFieldList(action) {
    const requestURL = API_DTSRC_LISTTABLEFIELDS + '?tableId=' + action.value;
    if(action.value=='xxx'){
        yield put(updateFieldList([]));
        return ;
    }
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateFieldList(result.data.result));
    } else {
        yield put(updateFieldList(null));
    }
}
// 改变任务状态
export function* doChangeTaskStatus(action) {
    const {taskType,entityId} =action;
    let requestURL;
    if (taskType == "gather") {//采集任务
        switch (action.signal) {
            case "enable" :
                requestURL = API_GATHER_ENABLED;
                break;
            case "delete" :
                requestURL = API_GATHER_DELETE;
                break;
            case "disable" :
                requestURL = API_GATHER_DISABLE;
                break;
            case "start" :
                requestURL = API_GATHER_START;
                break;
            case "stop" :
                requestURL = API_GATHER_STOP;
                break;
        }
    } else if (taskType == "share") {//共享任务
        switch (action.signal) {
            case "enable" :
                requestURL = API_SHARE_ENABLED;
                break;
            case "delete" :
                requestURL = API_SHARE_DELETE;
                break;
            case "disable" :
                requestURL = API_SHARE_DISABLE;
                break;
            case "start" :
                requestURL = API_SHARE_START;
                break;
            case "stop" :
                requestURL = API_SHARE_STOP;
                break;
        }
    }
    const result = yield call(post, {url: requestURL, data: {id: action.value}});
    if (result.data && result.data.resultCode === 1) {
        let url='';
        if (taskType == "gather") {
            url = API_GATHER_LIST + '?entityId='+entityId;
        } else if (taskType == "share") {
            url = API_SHARE_LIST + '?entityId='+entityId;
        }
        const taskResult = yield call(get, url);
        if (taskResult.data && taskResult.data.resultCode === 1) {
            yield put(updateEntityTaskList(taskResult.data.result));
        }
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 执行sql请求查询结果
export function* doExcuteSqlSentence(action) {
    const requestURL = API_GATHER_COMPONENT_GETSQLMETA;
    if(action.value.dsId=='xxx' || action.value.tableId=='xxx'){
        yield put(setSQLfieldList([]));
        return ;
    }
    const result = yield call(post, {
        url: requestURL,
        data: {sql: action.value.sql, dsId: action.value.dsId, tableId: action.value.tableId}
    });
    if (result.data && result.data.resultCode === 1) {
        yield put(setSQLfieldList(result.data.result));
    } else {
        yield put(setSQLfieldList([]));
    }
}
// 查询任务执行日志
export function* doRequestTaskExecuteLog(action) {
    const requestURL = action.value.type === 'search'? API_GATHER_LISTLOG : API_GATHER_CLEARLOG;
    const result = yield call(post, {
        url: requestURL,
        data: {
            taskId:action.value.taskId,
            startTime: action.value.startTime,
            endTime: action.value.endTime,
            page: action.value.page,
            limit:action.value.limit
        }
    });
    if (result.data && result.data.resultCode === 1) {
        yield put(updateTaskExecuteLogPage(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//
export function* doFilterCondition(action) {
    const result = yield call(get,API_ATTRIBUTE_LISTBASE+'?entityId='+action.value);
    if (result.data && result.data.resultCode === 1) {
        yield put(filterDataList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
export function* doApproveEntityData(action) {
    const result = yield call(post, {url: API_APPROVEMEMBER, data: {entityId:action.value.entityId,action:action.flag}});
    if (result.data && result.data.resultCode === 1) {
        hashHistory.push('/main/entity/'+action.value.domainName+'/'+action.value.modelName+'/'+action.value.modelId);
        alert('操作成功', 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
export function* doRequestBaseAttrList(action) {
    if(action.entityId==''||action.entityId=='undefined')return ;
    const result = yield call(get,API_ATTRIBUTE_LISTBASE+'?entityId='+action.entityId);
    if (result.data && result.data.resultCode === 1) {
        yield put(entityBaseAttrList(result.data.result));
    } else {
        yield put(entityBaseAttrList([]));
    }
}
export function* doReqTaskById(action) {
    let url='task/gather/getTaskById.do'+'?id='+action.value;
    if(action.value=='xxx'){
        yield put(setTaskAttr({}));
        return ;
    }
    const result = yield call(get,url);
    if (result.data && result.data.resultCode === 1) {
        yield put(setTaskAttr(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求UC矩阵
export function* doRequestUcList(action) {
    let requestURL='moni/uc/list.do?entityId='+action.value.entityId;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(setUcList(result.data.result));
    } else if (result.data && result.data.resultCode){
        alert(result.data.resultText, 'error');
    }
}


/*-------------------------------------------*/
export function* getDomainWatcher() {
    yield *takeLatest(requestDomainData().type, doRequestDomainData)
}
/*export function* getExportDomainWatcher() {
    yield *takeLatest(exportDomain().type, doExportDomain)
}*/
export function* getEntityWatcher() {
    yield *takeLatest(onRequestEntityList().type, doRequestEntityList)
}
export function* getAttrWatcher() {
    yield *takeLatest(onRequestAttrList().type, doRequestAttrList)
}
export function* getEntityDataWatcher() {
    yield *takeLatest(onRequestEntityDataList().type, doRequestEntityDataList)
}
export function* getFilterEntityDataWatcher() {
    yield *takeLatest(filterEntityData().type, doRequestFilterEntityDataList)
}
export function* getSaveEntityVersion() {
    yield *takeLatest(onSaveVersion().type, doSaveVersion)
}
export function* getRequestEntityVersions() {
    yield *takeLatest(onRequestAllVersions().type, doReqEntityVersions)
}
export function* getRequestEntityGatherData() {
    yield *takeLatest(onRequestEntityGatherDataList().type, doReqEntityGatherData)
}
export function* getRequestDataAuditRecord() {
    yield *takeLatest(requestDataAuditRecord().type, doReqDataAuditRecord)
}
export function* getFilterEntityAuditData() {
    yield *takeLatest(filterEntityAuditData().type, doFilterEntityAuditData)
}
export function* getChangeEntityEnableStatus() {
    yield *takeLatest(onChangeStatus().type, doChangeStatus)
}
export function* getEntityTask() {
    yield *takeLatest(requestEntityTask().type, doReqEntityTask)
}
export function* getDataSourceList() {
    yield *takeLatest(reqDataSourceList().type, doReqDataSourceList)
}
export function* saveGatherTask() {
    yield *takeLatest(onSaveTask().type, doSaveGatherTask)
}
export function* updateGatherTask() {
    yield *takeLatest(onUpdateTask().type, doUpdateGatherTask)
}
export function* getSaveTaskArrayWatcher() {
    yield *takeLatest(saveTaskArray().type, doSaveTaskArray)
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
export function* getRequestVersionDataListWatcher() {
    yield *takeLatest(requestVersionDataList().type, dorequestVersionDataList)
}
//请求版本属性
export function* getRequestVersionAttrListWatcher() {
    yield *takeLatest(requestVersionAttrList().type, doRequestVersionAttrList)
}
//
export function* getFilterVersionDataWatcher() {
    yield *takeLatest(filterVersionData().type, doFilterVersionData)
}
export function* getTaskFlowListWatcher() {
    yield *takeLatest(reqTaskArrayList().type, doReqTaskFlow)
}
export function* getTableList() {
    yield *takeLatest(requestTables().type, doReqTableList)
}
export function* getFieldList() {
    yield *takeLatest(requestFields().type, doReqFieldList)
}
export function* getChangeTaskStatus() {
    yield *takeLatest(changeTaskStatus().type, doChangeTaskStatus)
}
export function* getExcuteSqlResult() {
    yield *takeLatest(excuteSqlSentence().type, doExcuteSqlSentence)
}
export function* getTaskExecuteLogResult() {
    yield *takeLatest(reqHandleTaskExecuteLog().type, doRequestTaskExecuteLog)
}
export function* getFilterCondition() {
    yield *takeLatest(requestFilterData().type, doFilterCondition)
}
export function* getApproveEntityData() {
    yield *takeLatest(approveEntity().type, doApproveEntityData)
}
export function* getRequestBaseAttrList() {
    yield *takeLatest(onRequestBaseAttrList().type, doRequestBaseAttrList)
}
export function* getGetherTaskById() {
    yield *takeLatest(reqTaskById().type, doReqTaskById)
}
//请求UC矩阵
export function* getRequestUcList() {
    yield *takeLatest(requestUcList().type, doRequestUcList)
}


export default function* entry() {
    const domainListwatcher = yield fork(getDomainWatcher);
   // const domainExportwatcher = yield fork(getExportDomainWatcher);
    const entityListwatcher = yield fork(getEntityWatcher);
    const attrListwatcher = yield fork(getAttrWatcher);
    const entityDatawatcher = yield fork(getEntityDataWatcher);
    const filterEntityDatawatcher = yield fork(getFilterEntityDataWatcher);
    const saveEntityVersionwatcher = yield fork(getSaveEntityVersion);
    const reqEntityVersionswatcher = yield fork(getRequestEntityVersions);
    const reqEntityGatherData = yield fork(getRequestEntityGatherData);
    const reqDataAuditRecord = yield fork(getRequestDataAuditRecord);
    const filterEntityAuditData = yield fork(getFilterEntityAuditData);
    const changeEntityEnableStatus = yield fork(getChangeEntityEnableStatus);
    const reqEntityTask = yield fork(getEntityTask);
    const reqDataSourceList = yield fork(getDataSourceList);
    const saveTask = yield fork(saveGatherTask);
    const updateTask = yield fork(updateGatherTask);
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    const requestVersionDataListWatcher = yield fork(getRequestVersionDataListWatcher);
    const requestVersionAttrListWatcher = yield fork(getRequestVersionAttrListWatcher);
    const filterVersionDataWatcher = yield fork(getFilterVersionDataWatcher);
    const saveTaskArrayWatcher = yield fork(getSaveTaskArrayWatcher);
    const getTaskFloWatcher = yield fork(getTaskFlowListWatcher);
    const getTableListWatcher = yield fork(getTableList);
    const getFieldListWatcher = yield fork(getFieldList);
    const getChangeTaskStatusWatcher = yield fork(getChangeTaskStatus);
    const getExcuteSqlResultWatcher = yield fork(getExcuteSqlResult);
    //lixiaokang
    const getTaskExecuteLogResultWatcher = yield fork(getTaskExecuteLogResult);
    //
    const getRequestBaseAttrListWatcher = yield fork(getRequestBaseAttrList);
    const getFilterConditionWatcher = yield fork(getFilterCondition);
    const getapproveEntityDataWatcher = yield fork(getApproveEntityData);
    const getTaskByIdWatcher = yield fork(getGetherTaskById);
    const requestUcListWatcher=yield fork(getRequestUcList);
}