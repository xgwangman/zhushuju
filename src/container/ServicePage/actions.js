import {REQUEST_DOMAINSERVICELIST,UPDATE_DOMAINSERVICELIST,SAVE_DOMAINSERVICEDATA,REQUEST_MODEL_LIST,DOMAIN_LIST_DATA,MODEL_LIST_DATA,ENTITY_LIST_DATA,
    OPENENTITYFIELDSHAREWIN,CLOSEENTITYFIELDSHAREWIN,REQUEST_ENTITY_LIST,REQUEST_TABLE_DATA_LIST,TABLE_LIST_DATA,
    CACHE_CURRENT_FLOW_DATA,CONCAT_FLOW_FIELD_DATA,SAVE_ARRANGE_SERVICE,CHANGE_SERVICE_STATUS,REMOVE_SERVICE_STATUS,USER_LIST,
    ADD_SHARE_SERVICE,UPDATE_SHARE_SERVICE,TASK_OUTPUT_SCHEMA,REQUEST_USRE_LIST,TASK_EDIT_FLOW,GET_TASK_EDIT_FLOW,UPDATE_TASKARRAYLIST,REQUEST_TASK_LIST,
    TASK_LIST_DATA,REQUEST_TASK_OUTPUT_SCHEMA,ADD_WS,REQUEST_SHARE_LOG,SHARE_LOG_LIST,REQUEST_WS_LIST,WS_LIST,DELETE_WS,CHANGE_WS_STATUS,
    REQUEST_SERVICE_LOG_LIST,WS_LOG_LIST,REQUEST_WS_DETAIL,WS_DETAIL,UPDATE_WS,CLEAR_SHARE_LOG,CLEAR_SERVICE_LOG,REQUEST_TEST_PARAMS,
    WS_TEST_PARAMS,BEGIN_TEST_WS,TEST_WS_RESULT,SHOW_CONDITION,SHARE_DATA,SHARE_LIST_DATA,SHARE_SET_CONDITIONDATA,SHARE_SET_CONDITIONLIST,
    SHARE_SHOW_ALLCOLUMNS,SHARE_SET_SHOWCOLUMNS

} from'./constants'
// domain
export function requestDomainServiceList(request) {
    return {
        type: REQUEST_DOMAINSERVICELIST,
        request,
    };
}
// 请求任务列表
export function requestTaskServiceList(object) {
    return {
        type: REQUEST_TASK_LIST,
        value:object
    };
}
export function requestModelList(id) {
    return {
        type: REQUEST_MODEL_LIST,
        value:id,
    };
}
export function requestEntityList(id) {
    return {
        type: REQUEST_ENTITY_LIST,
        value:id,
    };
}
export function requestTableDataList(id) {
    return {
        type: REQUEST_TABLE_DATA_LIST,
        value:id,
    };
}
export function updateDomainServiceList(domainSerList) {
    return {
        type: UPDATE_DOMAINSERVICELIST,
        value : domainSerList,
    };
}
//数据子集
export function domainListData(domainList) {
    return {
        type: DOMAIN_LIST_DATA,
        value : domainList,
    };
}
//模型
export function modelListData(modelList) {
    return {
        type: MODEL_LIST_DATA,
        value : modelList,
    };
}
//实体
export function entityListData(entityList) {
    return {
        type: ENTITY_LIST_DATA,
        value : entityList,
    };
}
//存放任务列表action
export function taskListData(taskList) {
    return {
        type: TASK_LIST_DATA,
        value : taskList
    };
}
export function tableListData(tableData) {
    return {
        type: TABLE_LIST_DATA,
        value : tableData,
    };
}
export function concatFlowFieldData(flowField) {
    return {
        type: CONCAT_FLOW_FIELD_DATA,
        value : flowField,
    };
}
export function cacheCurrentFlowData(componentData) {
    return {
        type: CACHE_CURRENT_FLOW_DATA,
        value : componentData,
    };
}
export function openShareWin(type) {
    return {
        type: OPENENTITYFIELDSHAREWIN,
        value : type,
    };
}
export function closeShareWin(type) {
    return {
        type: CLOSEENTITYFIELDSHAREWIN,
        value : type,
    };
}
export function savedateDomainService(data) {
    return {
        type: SAVE_DOMAINSERVICEDATA,
        value : data,
    };
}
export function saveArrangeService(arrange,id) {
    return {
        type: SAVE_ARRANGE_SERVICE,
        value : arrange,
        id:id
    };
}
//改变服务状态 action
export function changeServiceStatus(statue,taskId) {
    return {
        type: CHANGE_SERVICE_STATUS,
        status : statue,
        taskId:taskId
    };
}
//删除服务状态 action
export function removeService(taskId) {
    return {
        type: REMOVE_SERVICE_STATUS,
        taskId:taskId
    };
}
//添加共享服务action
export function addShareService(service) {
    return {
        type:ADD_SHARE_SERVICE,
        value:service
    };
}
//修改共享服务action
export function updateShareService(service) {
    return {
        type:UPDATE_SHARE_SERVICE,
        value:service
    };
}
//任务输出schema
export function requestTaskOutPutScheam(taskId) {
    return {
        type:REQUEST_TASK_OUTPUT_SCHEMA,
        value:taskId
    };
}
//存放任务输出schema
export function taskOutPutSchema(outPutSchema) {
    return {
        type:TASK_OUTPUT_SCHEMA,
        value:outPutSchema
    };
}
//请求用户列表
export function requestUserList() {
    return {
        type:REQUEST_USRE_LIST
    };
}
//存放用户列表
export function userList(userList) {
    return {
        type:USER_LIST,
        value:userList
    };
}
//请求编排过后的数据流
export function requestTaskEditFlow(taskId) {
    return {
        type:TASK_EDIT_FLOW,
        value:taskId
    };
}
//拿到编排过后的数据流
export function getTaskEditFlow(taskFlow) {
    return {
        type:GET_TASK_EDIT_FLOW,
        value:taskFlow
    };
}
//拿到编排过后的数据流
export function updateTaskArrayList(flow) {
    return {
        type:UPDATE_TASKARRAYLIST,
        value:flow
    };
}
//添加ws
export function addService(ws,taskName) {
    return {
        type:ADD_WS,
        value:ws,
        taskName:taskName
    };
}
//修改ws
export function updateService(ws,taskName) {
    return {
        type:UPDATE_WS,
        value:ws,
        taskName:taskName
    };
}
//获取一个服务的详细信息
export function requestWsDetail(wsId) {
    return {
        type:REQUEST_WS_DETAIL,
        value:wsId
    };
}
//存放一个服务的详细信息
export function wsDetail(ws) {
    return {
        type:WS_DETAIL,
        value:ws
    };
}
//请求共享日志
export function requestShareLog(item) {
    return {
        type:REQUEST_SHARE_LOG,
        value:item,
    };
}
//删除共享日志
export function clearShareLog(item) {
    return {
        type:CLEAR_SHARE_LOG,
        value:item,
    };
}
//存储共享日志
export function shareLog(taskList) {
    return {
        type:SHARE_LOG_LIST,
        value:taskList
    };
}
//请求服务列表
export function requestServiceList(taskId,nameLike) {
    return {
        type:REQUEST_WS_LIST,
        value:taskId,
        nameLike:nameLike
    };
}
//删除服务
export function deleteWs(wsId,taskId) {
    return {
        type:DELETE_WS,
        value:wsId,
        taskId:taskId
    };
}
//修改ws 状态
export function changeWsStatus(status,wsId,taskId) {
    return {
        type:CHANGE_WS_STATUS,
        value:wsId,
        taskId:taskId,
        status:status
    };
}
//存储服务列表
export function wsList(wsList) {
    return {
        type:WS_LIST,
        value:wsList
    };
}
//请求服务日志列表
export function requestServiceLogList(wsId) {
    return {
        type:REQUEST_SERVICE_LOG_LIST,
        value:wsId
    };
}
//删除服务日志列表
export function clearWsLog(item) {
    return {
        type:CLEAR_SERVICE_LOG,
        value:item
    };
}
//存储服务日志列表
export function wsLogList(wsLogList) {
    return {
        type:WS_LOG_LIST,
        value:wsLogList
    };
}
//请求测试服务的接口参数
export function requestTestParams(wsId) {
    return {
        type:REQUEST_TEST_PARAMS,
        value:wsId
    };
}
//存放测试服务的接口参数
export function wsTestParams(data) {
    return {
        type:WS_TEST_PARAMS,
        value:data
    };
}
//开始测试服务
export function beginTestWs(data) {
    return {
        type:BEGIN_TEST_WS,
        value:data
    };
}
//测试服务结果
export function testWsResult(data) {
    return {
        type:TEST_WS_RESULT,
        value:data
    };
}
//请求共享管理数据
export function requestShareData(id){
    return{
        type:SHARE_DATA,
        value:id
    }
}
//请求共享管理数据(结果) shareListData
export function shareListData(data){
    return{
        type:SHARE_LIST_DATA,
        value:data
    }
}
//条件筛选
export function showSelectCondition(show){
    return{
        type:SHOW_CONDITION,
        value:show
    }
}
//条件属性
export function setConditionData(data) {
    return {
        type: SHARE_SET_CONDITIONDATA,
        value: data,
    };
}
export function setConditionList(list) {
    return {
        type: SHARE_SET_CONDITIONLIST,
        value: list,
    };
}
export function showAllColumns(show) {
    return {
        type: SHARE_SHOW_ALLCOLUMNS,
        value: show,
    };
}
export function setShowColumns(filter) {
    return {
        type: SHARE_SET_SHOWCOLUMNS,
        value: filter,
    };
}























