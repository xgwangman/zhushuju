import {
    REQUEST_DOMAINDATA,
    UPDATE_DOMAINDATA,
    SHOW_ERROR,
    SHOW_DOMAINCREATE,
    ADD_DOMAINATTR,
    CHANGE_MODELNAME,
    SAVE_DOMAIN,
    DELETE_DOMAIN,
    EXPORT_DOMAIN,
    UPDATE_DOMAIN,
    SET_MODELATTR,
    CLICK_MODEL,
    UPDATE_ENTITYDATA,
    SHOW_ENTITYMODAL,
    SAVE_ENTITY,
    CHANGE_ENTITYNAME,
    CHANGE_ENTITYDESC,
    ADD_ENTITY,
    DELETE_ENTITY,
    CHANGE_STATUS,
    SHOW_ATTRCREATE,
    SET_CLICKENTITYDATA,
    REQUEST_ATTRDATA,
    SET_ATTRIBUTEDATA,
    UPDATE_ATTRLIST,
    SAVE_ATTRIBUTE,
    DELETE_ATTR,
    REQUEST_ALLMODELS,
    SET_ALLMODELLIST,
    SELECT_THISMODEL,
    SET_SELECTEDMODELS_ENTITY,
    SELECT_THISENTITY,
    SET_SELECTEDENTITYS_ATTR,
    REQUEST_ALLVERSION,
    UPDATE_VERSIONLIST,
    SEARCH_DOMAINDATA,
     DOMAIN_EDTIOR_SIGN,
    MONITOR,SET_MONITOR,
    REQUEST_MONITOR_LIST,
    SET_MONITOR_LIST,
    REQUEST_SYNCH,
    REQUEST_CHECK,
    MONITOR_DATA_LIST,
}from'./constants'
export function ErrorMsg(error) {
    return {
        type: SHOW_ERROR,
        error,
    };
}
export function requestDomainData(request) {
    return {
        type: REQUEST_DOMAINDATA,
        request,
    };
}
export function UpdateDomainData(domainDataList) {
    return {
        type: UPDATE_DOMAINDATA,
        domainDataList,
    };
}
export function showDomainCreate(show) {
    return {
        type: SHOW_DOMAINCREATE,
        show,
    };
}
export function setDomainAttr(attr) {
    return {
        type: ADD_DOMAINATTR,
        attr,
    };
}
export function onChangeModelName(modelName) {
    return {
        type: CHANGE_MODELNAME,
        modelName,
    };
}
export function onSaveDomain(isSave) {
    return {
        type: SAVE_DOMAIN,
        isSave,
    };
}
export function onDeleteDomain(domainId) {
    return {
        type: DELETE_DOMAIN,
        value: domainId,
    };
}
export function onExportDomain(domainId) {
    return {
        type: EXPORT_DOMAIN,
        value: domainId,
    };
}
export function onUpdateDomain(domain) {
    return {
        type: UPDATE_DOMAIN,
        value: domain,
    };
}
export function setModelAttr(model) {
    return {
        type: SET_MODELATTR,
        value: model,
    };
}
export function onClickModelAction(model) {
    return {
        type: CLICK_MODEL,
        value: model,
    };
}
export function updateEntityData(entityList) {
    return {
        type: UPDATE_ENTITYDATA,
        value: entityList,
    };
}
export function showEntityCreate(show) {
    return {
        type: SHOW_ENTITYMODAL,
        value: show,
    };
}
export function onSaveEntity(isSave) {
    return {
        type: SAVE_ENTITY,
        value: isSave,
    };
}
export function onChangeEntityName(name) {
    return {
        type: CHANGE_ENTITYNAME,
        value: name,
    };
}
export function onChangeEntityDesc(name) {
    return {
        type: CHANGE_ENTITYDESC,
        value: name,
    };
}
//添加实体的数据（name,code）
export function setEntityAttr(entity) {
    return {
        type: ADD_ENTITY,
        value: entity,
    };
}
export function onDeleteEntity(entityId) {
    return {
        type: DELETE_ENTITY,
        value: entityId,
    };
}
export function onChangeStatus(status) {
    return {
        type: CHANGE_STATUS,
        value: status,
    };
}
export function showAttrCreate(show) {
    return {
        type: SHOW_ATTRCREATE,
        value: show,
    };
}
export function setClickEntityData(entity) {
    return {
        type: SET_CLICKENTITYDATA,
        value: entity,
    };
}
//saga  属性
export function onRequestAttrData(request) {
    return {
        type: REQUEST_ATTRDATA,
        value: request,
    };
}
export function updateAttrList(attrList) {
    return {
        type: UPDATE_ATTRLIST,
        value: attrList,
    };
}
export function setAttributeData(attribute) {
    return {
        type: SET_ATTRIBUTEDATA,
        value: attribute,
    };
}
//添加/编辑属性
export function onSaveAttribute(arrtData) {
    return {
        type: SAVE_ATTRIBUTE,
        value: arrtData,
    };
}
//删除属性
export function onDeleteAttr(isDelete) {
    return {
        type: DELETE_ATTR,
        value: isDelete,
    };
}
export function requestAllModels(request) {
    return {
        type: REQUEST_ALLMODELS,
        value: request,
    };
}
export function setAllModelsList(modelList) {
    return {
        type: SET_ALLMODELLIST,
        value: modelList,
    };
}
export function onSelectThisModel(modelId) {
    return {
        type: SELECT_THISMODEL,
        value: modelId,
    };
}
export function setSelectedModelsEntity(entityList) {
    return {
        type: SET_SELECTEDMODELS_ENTITY,
        value: entityList,
    };
}
export function onSelectThisEntity(entityId) {
    return {
        type: SELECT_THISENTITY,
        value: entityId,
    };
}
export function setSelectedEntitysAttrs(attrsList) {
    return {
        type: SET_SELECTEDENTITYS_ATTR,
        value: attrsList,
    };
}
export function onRequestAllVersion(entityId) {
    return {
        type: REQUEST_ALLVERSION,
        value: entityId,
    };
}
export function updateVersionList(versionList) {
    return {
        type: UPDATE_VERSIONLIST,
        value: versionList,
    };
}
export function searchDomainList(searchVal) {
    return {
        type: SEARCH_DOMAINDATA,
        searchVal,
    };
}
//数据子集编辑的标记
export function domainEdtiorSign(domainSign) {
    return {
        type: DOMAIN_EDTIOR_SIGN,
        value:domainSign,
    };
}
//查看是否有变动数据(请求) requestMonitor
export function requestMonitor(Y) {
    return {
        type: MONITOR,
        value:Y,
    };
}
//查看是否有变动数据(结果)
export function setMonitor(YN) {
    return {
        type: SET_MONITOR,
        value:YN,
    };
}
//请求监控变动的数据
export function requestMonitorList(request) {
    return {
        type: REQUEST_MONITOR_LIST,
        value:request,
    };
}
//请求监控变动的数据(结果)
export function setMonitorList(list) {
    return {
        type: SET_MONITOR_LIST,
        value:list,
    };
}
//请求同步
export function requestSynch(synch) {
    return {
        type: REQUEST_SYNCH,
        value:synch,
    };
}
//请求查看变动字段
export function requestCheck(check) {
    return {
        type: REQUEST_CHECK,
        value:check,
    };
}
//变动字段数据
export function setMonitorDataList(data) {
    return {
        type: MONITOR_DATA_LIST,
        value:data,
    };
}














