import {
    REQUEST_DOMAINDATA,
    UPDATE_DOMAINDATA,
    EXPORT_DOMAIN,
    SET_DOMAINATTR,
    SET_MODELATTR,
    REQUEST_ENTITYLIST,
    UPDATE_ENTITYLIST,
    SET_ENTITYATTR,
    REQUEST_ATTRLIST,
    UPDATE_ATTRLIST,
    REQUEST_ENTITYDATALIST,
    UPDATE_ENTITYDATALIST,
    SHOW_FILTERCONDITION,
    SET_CONDITIONDATA,
    SET_CONDITIONLIST,
    FILTER_ENTITYDATA,
    SET_SHOWCOLUMNS,
    SHOW_ALLCOLUMNS,
    SHOW_ADDVERSION,
    SET_VERSIONDATA,
    SAVE_VERSION,
    SET_MODALKEY,
    REQUEST_ALLVERSIONS,
    SET_ENTITYVERSIONLIST,
    SET_ENTITYDATATYPE,
    REQUEST_ENTITYGATHERDATA,
    SET_AUDITDATAMODALSTATUS,
    REQUEST_DATAAUDITRECORD,
    UPDATE_DATAAUDITRECORD,
    EXPORT_AUDITDATARECORD,
    FILTER_ENTITYAUDITDATA,
    CHANGE_STATUS,
    REQUEST_ENTITYTASK,
    UPDATE_ENTITYTASKLIST,
    SET_TASKATTR,
    REQ_DATASOURCELIST,
    UPDATE_DATASOURCELIST,
    ON_SAVETASK,
    ON_UPDATETASK,
    //^^^^^^^^^^^^^^^
    VERSION_ID,
    REQUEST_DATA,
    UPDATE_VERSIONDATALIST,
    REQUEST_VERSIONATTRLIST,
    UPDATE_VERSIONATTRLIST,
    GET_NAME,
    FILTER_VERSIONDATA,
    SET_ENTITYTASKTYPE,
    SAVE_TASKARRAY,
    OPEN_EDITWINDOW,
    REQ_TASKARRAYLIST,
    REQ_TASKBYID,
    UPDATE_TASKARRAYLIST,
    CLOSE_EDITWINDOW,
    REQUEST_TABLES,
    UPDATE_TABLELIST,
    REQUEST_FIELDS,
    UPDATE_FIELDLIST,
    SET_CURRENTEDITCOMPONENTDATA,
    CHANGE_TASKSTATUS,
    SET_COMPONENTFLOWFIELDS,
    EXCUTE_SQLSENTENCE,
    REQUEST_HANDLE_TASKEXECUTELOG,
    UPDATE_TASKEXECUTELOGPAGE,
    SET_TASKNAME,
    SET_SQLT_FIELDLIST,
    SET_ST_FIELDLIST,
    REQUEST_FILTER_DATA,FILTER_DATA_LIST,APPROVE_ENTITY_DATA,EXPORT_ENTITY_DATA,REQUEST_BASE_ATTRLIST,ENTITY_BASE_ATTRLIST,
    REQUEST_UC,SET_UC,
} from'./constants'

// domain
export function requestDomainData(request) {
    return {
        type: REQUEST_DOMAINDATA,
        value:request,
    };
}
export function UpdateDomainData(domainDataList) {
    return {
        type: UPDATE_DOMAINDATA,
        value: domainDataList,
    };
}
export function setDomainAttr(domain) {
    return {
        type: SET_DOMAINATTR,
        value: domain,
    };
}
/*export function exportDomain(domainId) {
    return {
        type: EXPORT_DOMAIN,
        value: domainId,
    };
}*/
// model
export function setModelAttr(model) {
    return {
        type: SET_MODELATTR,
        value: model,
    };
}
// entity
export function onRequestEntityList(request) {
    return {
        type: REQUEST_ENTITYLIST,
        value: request,
    };
}
export function UpdateEntityList(entityList) {
    return {
        type: UPDATE_ENTITYLIST,
        value: entityList,
    };
}
export function setEntityAttr(entity) {
    return {
        type: SET_ENTITYATTR,
        value: entity,
    };
}
export function showAddVersion(show) {
    return {
        type: SHOW_ADDVERSION,
        value: show,
    };
}
export function setVersionData(show) {
    return {
        type: SET_VERSIONDATA,
        value: show,
    };
}
export function onChangeStatus(status) {
    return {
        type: CHANGE_STATUS,
        value: status,
    };
}
// attribute
export function onRequestAttrList(request) {
    return {
        type: REQUEST_ATTRLIST,
        value: request,
    };
}
// base attribute
export function onRequestBaseAttrList(entityId) {
    return {
        type: REQUEST_BASE_ATTRLIST,
        entityId: entityId,
    };
}
// save base attribute
export function entityBaseAttrList(list) {
    return {
        type: ENTITY_BASE_ATTRLIST,
        value: list,
    };
}
export function UpdateAttrList(attrList) {
    return {
        type: UPDATE_ATTRLIST,
        value: attrList,
    };
}
export function onSaveVersion(save) {
    return {
        type: SAVE_VERSION,
        value: save,
    };
}
export function setModalKey(key) {
    return {
        type: SET_MODALKEY,
        value: key,
    };
}
// entityData
export function onRequestEntityDataList(req) {
    return {
        type: REQUEST_ENTITYDATALIST,
        value: req,
    };
}
export function UpdateEntityDataList(entityData) {
    return {
        type: UPDATE_ENTITYDATALIST,
        value: entityData,
    };
}
export function showFilterCondition(show) {
    return {
        type: SHOW_FILTERCONDITION,
        value: show,
    };
}
export function setConditionData(data) {
    return {
        type: SET_CONDITIONDATA,
        value: data,
    };
}
export function setConditionList(list) {
    return {
        type: SET_CONDITIONLIST,
        value: list,
    };
}
export function filterEntityData(filter) {
    return {
        type: FILTER_ENTITYDATA,
        value: filter,
    };
}
export function setShowColumns(filter) {
    return {
        type: SET_SHOWCOLUMNS,
        value: filter,
    };
}
export function showAllColumns(show) {
    return {
        type: SHOW_ALLCOLUMNS,
        value: show,
    };
}
export function setEntityDataType(type) {
    return {
        type: SET_ENTITYDATATYPE,
        value: type,
    };
}
export function showAuditDataModal(show) {
    return {
        type: SET_AUDITDATAMODALSTATUS,
        value: show,
    };
}
// version
export function onRequestAllVersions(request) {
    return {
        type: REQUEST_ALLVERSIONS,
        value: request,
    };
}
export function setEntityVersionList(versions) {
    return {
        type: SET_ENTITYVERSIONLIST,
        value: versions,
    };
}
//entityGatherData
export function onRequestEntityGatherDataList(request) {
    return {
        type: REQUEST_ENTITYGATHERDATA,
        value: request,
    }
}
//auditDataRecordModal
export function requestDataAuditRecord(params) {
    return {
        type: REQUEST_DATAAUDITRECORD,
        value: params,
    }
}
export function UpdateDataAuditRecord(dataList) {
    return {
        type: UPDATE_DATAAUDITRECORD,
        value: dataList,
    }
}
export function exportAuditDataRecord(params) {
    return {
        type: EXPORT_AUDITDATARECORD,
        value: params,
    }
}
export function filterEntityAuditData(filter) {
    return {
        type: FILTER_ENTITYAUDITDATA,
        value: filter,
    }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//versionPage 选择的版本的标示id
export function checkVersion(value) {
    return {
        type: VERSION_ID,
        value: value,
    }
}
//versionDataPage 请求对应版本的数据
export function requestVersionDataList(value,pagination) {
    return {
        type: REQUEST_DATA,
        value: value,
        pagination: pagination,
    }
}
//刷新版本的数据
export function UpdateVersionDataList(versionData) {
    return {
        type: UPDATE_VERSIONDATALIST,
        value: versionData,
    };
}
//请求版本的属性
export function requestVersionAttrList(value,pagination) {
    return {
        type: REQUEST_VERSIONATTRLIST,
        value: value,
        pagination:pagination
    };
}
//刷新版本的属性
export function UpdateVersionAttrList(versionAttrList) {
    return {
        type: UPDATE_VERSIONATTRLIST,
        value: versionAttrList,
    };
}
//getName 获得版本的名字
export function getName(name) {
    return {
        type: GET_NAME,
        value: name,
    };
}
//
export function filterVersionData(filter,pagination) {
    return {
        type: FILTER_VERSIONDATA,
        value: filter,
        pagination: pagination,
    };
}
// entityTaskPage
export function requestEntityTask(request) {
    return {
        type: REQUEST_ENTITYTASK,
        value: request,
    }
}
export function updateEntityTaskList(request) {
    return {
        type: UPDATE_ENTITYTASKLIST,
        value: request,
    }
}
export function setTaskAttr(data) {
    return {
        type: SET_TASKATTR,
        value: data,
    }
}
export function saveTaskArray(data) {
    return {
        type: SAVE_TASKARRAY,
        value: data,
    }
}
// addTaskPage
export function reqDataSourceList(req) {
    return {
        type: REQ_DATASOURCELIST,
        value: req,
    }
}
/*缓存数据源list*/
export function updateDataSourceList(drcList) {
    return {type: UPDATE_DATASOURCELIST, value: drcList}
}
/*保存任务*/
export function onSaveTask(save) {
    return {type: ON_SAVETASK, value: save,}
}
/*保存任务*/
export function onUpdateTask(data) {
    return {type: ON_UPDATETASK, value: data,}
}
/*缓存实体任务类型*/
export function setEntityTaskType(taskType) {
    return {type: SET_ENTITYTASKTYPE, value: taskType}
}
/*打开组件编辑窗口*/
export function openEditWindow(window, data) {
    return {type: OPEN_EDITWINDOW, window: window, data: data}
}
/*请求任务的流程编排*/
export function reqTaskArrayList(req) {
    return {type: REQ_TASKARRAYLIST, value: req}
}
/*通过任务ID请求任务*/
export function reqTaskById(req) {
    return {type: REQ_TASKBYID, value: req}
}
/*缓存任务的流程编排*/
export function updateTaskArrayList(flow) {
    return {type: UPDATE_TASKARRAYLIST, value: flow}
}
/*关闭组件编辑窗口*/
export function closeEditWindow(window) {
    return {type: CLOSE_EDITWINDOW, window: window}
}
/*选择数据源后请求表列表*/
export function requestTables(dataSrcId) {
    return {type: REQUEST_TABLES, value: dataSrcId}
}
/*缓存表list*/
export function updateTableList(list) {
    return {type: UPDATE_TABLELIST, value: list}
}
/*选择表后请求字段列表*/
export function requestFields(tableId) {
    return {type: REQUEST_FIELDS, value: tableId}
}
/*选择表后请求字段列表*/
export function updateFieldList(list) {
    return {type: UPDATE_FIELDLIST, value: list}
}
/*改变任务状态：启用/停用/启动/停止/删除*/
export function changeTaskStatus(signal, taskId,taskType,entityId) {
    return {type: CHANGE_TASKSTATUS, signal: signal, value: taskId,taskType:taskType,entityId:entityId}
}
/*缓存当前编辑的组件数据*/
export function setCurrentEditComponentData(data) {
    return {type: SET_CURRENTEDITCOMPONENTDATA, value: data}
}
/*缓存当前组件前面所有组件的采集字段*/
export function setComponentFlowFields(fields) {
    return {type: SET_COMPONENTFLOWFIELDS, value: fields}
}
/*执行sql语句*/
export function excuteSqlSentence(params) {
    return {type: EXCUTE_SQLSENTENCE, value: params}
}
/*对任务执行日志查看的操作请求：查询和删除*/
export function reqHandleTaskExecuteLog(reqHandleData) {
    return {type: REQUEST_HANDLE_TASKEXECUTELOG, value: reqHandleData}
}
/*更新任务执行日志列表*/
export function updateTaskExecuteLogPage(dataList) {
    return {type: UPDATE_TASKEXECUTELOGPAGE, value: dataList}
}

/*缓存当前组件taskName*/
export function setTaskName(taskname) {
    return {type: SET_TASKNAME, value: taskname}
}

/*缓存SQL组见*/
export function setSQLfieldList(list) {
    return {type: SET_SQLT_FIELDLIST, value: list}
}
/*缓存SimpleTable组见*/
export function setSTfieldList(STfieldList) {
    return {type: SET_ST_FIELDLIST, value: STfieldList}
}
/*请求审批实体 过滤数据*/
export function requestFilterData(entityId) {
    return {type: REQUEST_FILTER_DATA,value:entityId}
}
/*存放审批实体 过滤数据*/
export function filterDataList(filterData) {
    return {type: FILTER_DATA_LIST,value:filterData}
}
/*审批 与 驳回*/
export function approveEntity(flag,entityId) {
    return {type: APPROVE_ENTITY_DATA,flag:flag,value:entityId}
}
/*数据量界面 导出*/
export function exportEtyData() {
    return {type: EXPORT_ENTITY_DATA}
}
/*请求UC矩阵*/
export function requestUcList(request) {
    return{
        type:REQUEST_UC,
        value:request
    }
}
//UC矩阵请求结果 SET_UC
export function setUcList(data) {
    return{
        type:SET_UC,
        value:data
    }
}