import {take, call, put, select, fork, cancel} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {hashHistory} from 'react-router'
import {
     updateDomainServiceList,modelListData,entityListData,tableListData,
    domainListData,getTaskEditFlow,updateTaskArrayList,taskListData,userList,taskOutPutSchema,shareLog,
    wsList,requestServiceList,wsLogList,wsDetail,wsTestParams,testWsResult,shareListData
} from './actions';
import {selectConditionList} from './selectors';
import {REQUEST_DOMAINSERVICELIST,REQUEST_MODEL_LIST,REQUEST_ENTITY_LIST,REQUEST_TABLE_DATA_LIST,SAVE_ARRANGE_SERVICE,
    CHANGE_SERVICE_STATUS,REMOVE_SERVICE_STATUS,ADD_SHARE_SERVICE,UPDATE_SHARE_SERVICE,REQUEST_TASK_OUTPUT_SCHEMA,REQUEST_USRE_LIST,
    TASK_EDIT_FLOW,REQUEST_TASK_LIST,ADD_WS,REQUEST_SHARE_LOG,REQUEST_WS_LIST,DELETE_WS,CHANGE_WS_STATUS,REQUEST_SERVICE_LOG_LIST,
    REQUEST_WS_DETAIL,UPDATE_WS,CLEAR_SHARE_LOG,CLEAR_SERVICE_LOG,REQUEST_TEST_PARAMS,BEGIN_TEST_WS,SHARE_DATA} from './constants'
import request, {post, get} from '../../common/utils/request';
import alert from '../../common/utils/alert';

// 查询数据子集list
export function* doRequestDomainServiceList() {
    const result = yield call(get, 'md/design/domain/list.do');
    if (result.data && result.data.resultCode === 1) {
        yield put(domainListData(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 查询模型list
export function* doRequestModelServiceList(action) {
    if(action.value&&action.value.id=='xxx'){
        yield put(modelListData([]));
        return ;
    }
    const result = yield call(post, {url : "md/design/domain/listmodel.do",data : action.value});
    if (result.data && result.data.resultCode === 1) {
        yield put(modelListData(result.data.result));
    } else {
        yield put(modelListData([]));
        alert(result.data.resultText, 'error');
    }
}
// 查询实体list
export function* doRequestEntityServiceList(action) {
    if(action.value=='xxx'){
        yield put(entityListData([]));
        return ;
    }
    const result = yield call(get,"md/design/entity/listbase.do?modelId="+action.value);
    if (result.data && result.data.resultCode === 1) {
        yield put(entityListData(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 查询实体 属性list
export function* doRequestTableDataServiceList(action) {
    let url="md/design/attribute/list.do?entityId="+action.value;
    if(action.value=='xxx'){
        yield put(tableListData([]));
        return ;
    }
    const result = yield call(get,url);
    if (result.data && result.data.resultCode === 1) {
        yield put(tableListData(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 保存编排后的数据
export function* doSaveArrangeService(action) {
    const result = yield call(post,{url : "task/share/arrange.do",data :{id:action.id,flowDefine: action.value}});
    if (result.data && result.data.resultCode === 1) {
        hashHistory.push('service');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 改变服务状态
export function* doChangeStatueService(action) {
    let url='';
    if(action.status=='enable') url='task/share/enabled.do';
    else if(action.status=='disable')url='task/share/disable.do';
    else if(action.status=='start')url='task/share/start.do';
    else if(action.status=='stop')url='task/share/stop.do';
    const result = yield call(post,{url : url,data :{id:action.taskId}});
    if (result.data && result.data.resultCode === 1) {
        const shareResult = yield call(get, 'task/share/list.do');
        if (shareResult.data && shareResult.data.resultCode === 1) {
            yield put(taskListData({pageNum:shareResult.data.totalProperty,data:shareResult.data.result}));
        }
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 删除服务状态
export function* doRemoveService(action) {
    const result = yield call(post,{url : 'task/share/delete.do',data :{id:action.taskId}});
    if (result.data && result.data.resultCode === 1) {
        const serverList = yield call(get, 'task/share/list.do');
        if (serverList.data && serverList.data.resultCode === 1) {
            yield put(taskListData({pageNum:serverList.data.totalProperty,data:serverList.data.result}));
        }
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 添加共享任务
export function* doAddShareService(action) {
    const result = yield call(post,{url : 'task/share/add.do',data :action.value});
    if (result.data && result.data.resultCode === 1) {
        hashHistory.push('service');
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 修改共享任务
export function* doUpdateShareService(action) {
    const result = yield call(post,{url : 'task/share/update.do',data :action.value});
    if (result.data && result.data.resultCode === 1) {
        hashHistory.push('service');
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 任务输出scheam
export function* doTaskOutputSchema(action) {
    const result = yield call(get,'task/share/getTaskOutPutScheam.do?id='+action.value);
    if (result.data && result.data.resultCode === 1) {
        yield put(taskOutPutSchema(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 获取用户列表
export function* doUserList(action) {
    const result = yield call(get,'user/list.do');
    if (result.data && result.data.resultCode === 1) {
        yield put(userList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求编排过后的数据流
export function* doTaskEditFlow(action) {
    const result = yield call(get,'task/share/getFlow.do?id='+action.value);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateTaskArrayList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求任务列表
export function* doTaskList(action) {
    const result = yield call(get,'task/share/list.do?page='+action.value.page+'&limit='+action.value.limit+'&nameLike='+action.value.nameLike);
    if (result.data && result.data.resultCode === 1) {
        yield put(taskListData({pageNum:result.data.totalProperty,data:result.data.result}));
        yield put(getTaskEditFlow([]));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 添加ws
export function* doAddWS(action) {
    const result = yield call(post,{url : 'ws/add.do',data :action.value});
    if (result.data && result.data.resultCode === 1) {
        alert(result.data.resultText, 'success');
        hashHistory.push('service/task/serverMgt/'+action.value.taskId+'/'+action.taskName);
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 添加ws
export function* doUpdateWS(action) {
    const result = yield call(post,{url : 'ws/update.do',data :action.value});
    if (result.data && result.data.resultCode === 1) {
        alert(result.data.resultText, 'success');
        hashHistory.push('service/task/serverMgt/'+action.value.taskId+'/'+action.taskName);
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求共享日志
export function* doShareLog(action) {
    const result = yield call(get,'task/share/listlog.do?taskId='+action.value.id
        +'&page='+action.value.page
        +'&limit='+action.value.limit
        +'&startTime='+action.value.startTime
        +"&endTime="+action.value.endTime);
    if (result.data && result.data.resultCode === 1) {
        yield put(shareLog({pageNum:result.data.totalProperty,data:result.data.result}));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 删除共享日志
export function* doClearShareLog(action) {
    const result = yield call(post,{url : 'task/share/clearlog.do',data :action.value});
    if (result.data && result.data.resultCode === 1) {
        alert('删除共享日志成功', 'success');
        const shareRes = yield call(get,'task/share/listlog.do?taskId='+action.value.taskId
            +'&page=1'
            +'&limit=15'
            +'&startTime='+''
            +'&endTime='+'');
        if (shareRes.data && shareRes.data.resultCode === 1) {
            yield put(shareLog({pageNum:shareRes.data.totalProperty,data:shareRes.data.result}));
        } else {
            alert(result.data.resultText, 'error');
        }
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求ws 列表
export function* doWsList(action) {
    yield put(wsList([])); //防止出现幻觉
    const result = yield call(get,'ws/list.do?taskId='+action.value+'&nameLike='+action.nameLike);
    if (result.data && result.data.resultCode === 1) {
        yield put(wsList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 获取一个服务的详细信息
export function* doWsDetail(action) {
    const result = yield call(get,'ws/queryWs.do?id='+action.value);
    if (result.data && result.data.resultCode === 1) {
        yield put(wsDetail(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 删除ws
export function* doDeleteWs(action) {
    const result = yield call(post,{url : 'ws/delete.do',data :{id:action.value}});
    if (result.data && result.data.resultCode === 1) {
        alert('删除服务成功', 'success');
        const wsResult = yield call(get, 'ws/list.do?taskId='+action.taskId);
        if (wsResult.data && wsResult.data.resultCode === 1) {
            yield put(wsList(wsResult.data.result));
        }
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 修改ws 状态
export function* doChangeWsStatus(action) {
    let url='';
    if(action.status=='enable') url='ws/enabled.do';
    else if(action.status=='disable')url='ws/disable.do';
    else if(action.status=='start')url='ws/start.do';
    else if(action.status=='stop')url='ws/stop.do';
    const result = yield call(post,{url : url,data :{id:action.value}});
    if (result.data && result.data.resultCode === 1) {
        const wsResult = yield call(get, 'ws/list.do?taskId='+action.taskId);
        if (wsResult.data && wsResult.data.resultCode === 1) {
            yield put(wsList(wsResult.data.result));
        }
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求ws 日志列表
export function* doWsLogStatus(action) {
    const result = yield call(get,'ws/listLog.do?wsId='+action.value.id
        +'&page='+action.value.page
        +'&limit='+action.value.limit
        +'&startTime='+action.value.startTime
        +'&endTime='+action.value.endTime);
    if (result.data && result.data.resultCode === 1) {
        yield put(wsLogList({pageNum:result.data.totalProperty,data:result.data.result}));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 删除ws 日志列表
export function* doClearWsLog(action) {
    const result = yield call(post,{url : 'ws/clearLog.do',data :action.value});
    if (result.data && result.data.resultCode === 1) {
        alert(result.data.resultText, 'success');
        const wsRes = yield call(get,'ws/listLog.do?wsId='+action.value.wsId
            +'&page=1'
            +'&limit=15'
            +'&startTime='+''
            +'&endTime='+'');
        if (wsRes.data && wsRes.data.resultCode === 1) {
            yield put(wsLogList({pageNum:wsRes.data.totalProperty,data:wsRes.data.result}));
        } else {
            alert(result.data.resultText, 'error');
        }
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求测试服务的接口参数
export function* doWsTest(action) {
    yield put(testWsResult([]));
    const result = yield call(get,'ws/listWsReq.do?id='+action.value);
    if (result.data && result.data.resultCode === 1) {
        yield put(wsTestParams(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 开始测试服务
export function* doBeginTestWs(action) {
    const result = yield call(post,{url : 'ws/test.do',data :action.value});
    if (result.data && result.data.resultCode === 1) {
        yield put(testWsResult(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
        yield put(testWsResult(result.data.result));
    }
}
//请求共享管理数据
export function* doShareData(action) {
    const conditions = yield select(selectConditionList());
    const result = yield call(post,{url : 'share/num/listmember.do',data :{taskId:action.value.taskId,page:action.value.page,limit:action.value.limit,condition:conditions}});
    if (result.data && result.data.resultCode === 1) {
        yield put(shareListData(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

export function* getDomainWatcher() {
    yield *takeLatest(REQUEST_DOMAINSERVICELIST, doRequestDomainServiceList)
}
export function* getModelWatcher() {
    yield *takeLatest(REQUEST_MODEL_LIST, doRequestModelServiceList)
}
export function* getEntityWatcher() {
    yield *takeLatest(REQUEST_ENTITY_LIST, doRequestEntityServiceList)
}
export function* getTableDataWatcher() {
    yield *takeLatest(REQUEST_TABLE_DATA_LIST, doRequestTableDataServiceList)
}
export function* getSaveArrangeWatcher() {
    yield *takeLatest(SAVE_ARRANGE_SERVICE, doSaveArrangeService)
}
export function* getChangeServiceWatcher() {
    yield *takeLatest(CHANGE_SERVICE_STATUS, doChangeStatueService)
}
export function* getRemoveServiceWatcher() {
    yield *takeLatest(REMOVE_SERVICE_STATUS, doRemoveService)
}
export function* getAddShareServiceWatcher() {
    yield *takeLatest(ADD_SHARE_SERVICE, doAddShareService)
}
export function* getUpdateShareServiceWatcher() {
    yield *takeLatest(UPDATE_SHARE_SERVICE, doUpdateShareService)
}
export function* getTaskOutputScheanWatcher() {
    yield *takeLatest(REQUEST_TASK_OUTPUT_SCHEMA, doTaskOutputSchema)
}
export function* getUserListWatcher() {
    yield *takeLatest(REQUEST_USRE_LIST, doUserList)
}
export function* getTaskEditFlowWatcher() {
    yield *takeLatest(TASK_EDIT_FLOW, doTaskEditFlow)
}
export function* getTaskListWatcher() {
    yield *takeLatest(REQUEST_TASK_LIST, doTaskList)
}
export function* getAddWSWatcher() {
    yield *takeLatest(ADD_WS, doAddWS)
}
export function* getUpdateWSWatcher() {
    yield *takeLatest(UPDATE_WS, doUpdateWS)
}
export function* getShareLogWatcher() {
    yield *takeLatest(REQUEST_SHARE_LOG, doShareLog)
}
export function* getClearShareLogWatcher() {
    yield *takeLatest(CLEAR_SHARE_LOG, doClearShareLog)
}
export function* getWsListWatcher() {
    yield *takeLatest(REQUEST_WS_LIST, doWsList)
}
export function* getDeleteWsWatcher() {
    yield *takeLatest(DELETE_WS, doDeleteWs)
}
export function* getChangeWsStatusWatcher() {
    yield *takeLatest(CHANGE_WS_STATUS, doChangeWsStatus)
}
export function* getWsLogWatcher() {
    yield *takeLatest(REQUEST_SERVICE_LOG_LIST, doWsLogStatus)
}
export function* getClearWsLogWatcher() {
    yield *takeLatest(CLEAR_SERVICE_LOG, doClearWsLog)
}
export function* getWsDetailWatcher() {
    yield *takeLatest(REQUEST_WS_DETAIL, doWsDetail)
}
export function* getWsTestWatcher() {
    yield *takeLatest(REQUEST_TEST_PARAMS, doWsTest)
}
export function* getBeginTestWsWatcher() {
    yield *takeLatest(BEGIN_TEST_WS, doBeginTestWs)
}
export function* getShareDataWsWatcher() {
    yield *takeLatest(SHARE_DATA, doShareData)
}



export default function* entry() {
    yield [
        fork(getDomainWatcher),
        fork(getModelWatcher),
        fork(getEntityWatcher),
        fork(getTableDataWatcher),
        fork(getSaveArrangeWatcher),
        fork(getChangeServiceWatcher),
        fork(getRemoveServiceWatcher),
        fork(getAddShareServiceWatcher),
        fork(getUpdateShareServiceWatcher),
        fork(getTaskOutputScheanWatcher),
        fork(getUserListWatcher),
        fork(getTaskEditFlowWatcher),
        fork(getTaskListWatcher),
        fork(getAddWSWatcher),
        fork(getUpdateWSWatcher),
        fork(getShareLogWatcher),
        fork(getClearShareLogWatcher),
        fork(getWsListWatcher),
        fork(getDeleteWsWatcher),
        fork(getChangeWsStatusWatcher),
        fork(getWsLogWatcher),
        fork(getClearWsLogWatcher),
        fork(getWsDetailWatcher),
        fork(getWsTestWatcher),
        fork(getBeginTestWsWatcher),
        fork(getShareDataWsWatcher),
    ];
}