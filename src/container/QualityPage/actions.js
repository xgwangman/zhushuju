/**
 * Created by Administrator on 2017/5/18.
 */
import {
    REQUEST_DOMAIN,
    UPDATE_QUALITYLIST,
    CHANGE_STATUS,
    REQUEST_REPORT,
    UPDATE_QUALITYREPORT,
    SHOW_EXECUTEPLAN,
    SHOW_EXECUTEPLAN_DATA,
    SET_MODIFYPLANATTR,
    SET_REQAPPDATA,
    SHOW_MODIFYCREATE,
    SAVE_MODIFY,
    RULE_LIST_ID,
    RULE_LIST_NAME,
    REQUEST_RULE_LIST_DATA,
    RUQUEST_RULE_LIBRARY,
    UPDATE_RULE_LIBRARY,
    SET_QUALITYREQ,
    SET_WATCHERTIME,
    UPDATE_WATCHERTIME,
    SET_MONITORTABLE,
    UPDATE_MONITORTABLE,
    SET_MASTERDATACHANGE,
    UPDATA_MASTERDATA,
    SET_QUALITYTABLE,
    UPDATA_QUALITYTABLE,
    SET_ENTITYTREND,
    UPDATA_ENTITYTREND,
    SET_MEMBERTABLE,
    UPDATA_MEMBERTABLE,
    GET_ENTITYTABLEID,
    GET_MEMBERID,
    GET_ENTITYID,
    GET_ENTITYNAME,
    SHOW_FILTERCONDITION,
    SET_CONDITIONDATA,
    SET_ENTITYDATA,
    SET_CONDITIONLIST,
    SET_SHOWCOLUMNS,
    REQUEST_DATAAUDITRECORD,
    SHOW_ALLCOLUMNS,
    FILTER_ENTITYDATA,
    ADD_RULE,
    SHOW_RULE_MADAL,
    RULE_NAME,
    ON_SAVE_RULES_EDITOR,
    SET_ENTITYCLASSES,
    UPDATA_ENTITYCLASSES,
    SET_ENTITYTABLEDATA,
    UPDATA_ENTITYTABLE,
    SET_ENTITYCHANGE,
    UPDATA_ENTITYCHANGE,
    ON_CHANGE_STATUSR,
    DELETE_RULE,
    MODAL_DATA_LIST,
    DOMAIN_DATA_LIST,
    MODA_LDATA,
    ENTITY_LIST_DATA,
    ENTITY_DATA,
    ATTRIBUTE_LIST_DATA,
    ON_EDTIOR_RULE,
    RULE_PAGE_DATA,
    ON_SEARCH,
    ON_SEARCH_RULE,
    SEARCH_RULE_PAGEDATA,
    REQUEST_ENTITI_LIST,
    UPDATE_ENTITY_LIST
} from './constants';
/**
 * *****************************************************************
 */
//请求数据子集质量数据
export  function requestQualityList(request) {
    return{
        type:REQUEST_DOMAIN,
        value:request,
    };
}
//更新数据子集质量数据
export function updateQualityList(list) {
    return{
        type:UPDATE_QUALITYLIST,
        value:list,
    };
}
//是否启用质量监控
export function onChangeStatus(quality) {
    return{
        type:CHANGE_STATUS,
        value:quality,
    }
}
//请求质量报告
export function requestReport(report) {
    return{
        type:REQUEST_REPORT,
        value:report,
    }
}
//更新质量报告数据
export function updateQualityReport(dataList) {
    return{
        type:UPDATE_QUALITYREPORT,
        value:dataList,
    }
}

export function showExecutePlan(show) {
    return {
        type: SHOW_EXECUTEPLAN,
        value: show,
    };
}
//执行计划修改
export function requestExecutePlan(dataList) {
    return{
        type:SHOW_EXECUTEPLAN_DATA,
        value:dataList,
    }
}
export function setModifyPlanAttr(modifyPlan) {
    return {
        type: SET_MODIFYPLANATTR,
        value: modifyPlan,
    };
}
export function setReqAppData(app) {
    return {
        type: SET_REQAPPDATA,
        value: app,
    };
}
//缓存保存修改计划后的数据
export function onSaveModify(save) {
    return {
        type: SAVE_MODIFY,
        value: save,
    };
}
export function showModifyCreate(show) {
    return {
        type: SHOW_MODIFYCREATE,
        value: show,
    };
}

//请求数据子集的规则列表
export function ruleListId(ruleId) {
    return{
        type:RULE_LIST_ID,
        value:ruleId,
    }
}
//请求后台的table数据（page，limit）rulePageData
export function rulePageData(pageData) {
    return{
        type:RULE_PAGE_DATA,
        value:pageData,
    }
}
//查看数据子集规则的数据子集的名字
export function ruleListName(ruleName) {
    return{
        type:RULE_LIST_NAME,
        value:ruleName,
    }
}
//请求数据子集的规则列表数据
export function requestruleListData(data) {
    return{
        type:REQUEST_RULE_LIST_DATA,
        value:data,
    }
}
//请求规则库列表
export function ruquestRuleLibrary(value) {
    return{
        type:RUQUEST_RULE_LIBRARY,
        value:value,
    }
}
//获取规则库数据
export function updateRuleLibrary(libibrary) {
    return{
        type:UPDATE_RULE_LIBRARY,
        value:libibrary,
    }
}
//添加规则（tree）
export function addRule(value) {
    return{
        type:ADD_RULE,
        value:value,
    }
}
//显示自定义规则插件SHOW_RULE_MADAL
export function showRuleModal(visible) {
    return{
        type:SHOW_RULE_MADAL,
        value:visible,
    }
}
//自定义插件的弹出框的名字
export function ruleName(ruleName) {
    return{
        type:RULE_NAME,
        value:ruleName,
    }
}
//自定义插件弹出框保存按钮
export function onSaveRulesEditor(edtior) {
    return{
        type:ON_SAVE_RULES_EDITOR,
        value:edtior,
    }
}
//缓存请求质量报告的数据
export function setQualityReqData(quality) {
    return {
        type:SET_QUALITYREQ,
        value:quality
    }
}
//CYY质量监控SSS   最近一次监控时间  请求
export function setWatcherTimeData(quality) {
    return {
        type:SET_WATCHERTIME,
        value:quality
    }
}
//CYY质量监控SSS   最近一次监控时间  结果
export function updateWatcherTime(time) {
    return {
        type:UPDATE_WATCHERTIME,
        value:time
    }
}
//CYY质量监控SSS  最近一次监控质量汇总  请求
export function setMonitorTableData(monitor) {
    return {
        type:SET_MONITORTABLE,
        value:monitor
    }
}
//CYY 质量监控SSS  最近一次监控质量汇总  结果
export function updateMonitorTable(table) {
    return {
        type:UPDATE_MONITORTABLE,
        value:table
    }
}
//CYY 质量监控SSS  域数据质量变化趋势分析  请求
export function setMasterDataChange(master) {
    return {
        type:SET_MASTERDATACHANGE,
        value:master
    }
}
//CYY 质量监控SSS  域数据质量变化趋势分析  结果
export function upDateMasterChange(change) {
    return {
        type:UPDATA_MASTERDATA,
        value:change
    }
}
//缓存实体分类数据
export  function setEntityClassesData(request) {
    return {
        type:SET_ENTITYCLASSES,
        value:request
    }
}
//更新实体分类数据
export  function upDateEntityClasses(entity) {
    return {
        type:UPDATA_ENTITYCLASSES,
        value:entity
    }
}
//缓存实体分类id
export function getEntityTableId(id) {
    return {
        type: GET_ENTITYTABLEID,
        value: id
    }
}
//CYY 质量监控SSS 域数据质量变化监控日志 请求
export function setEntityTableData(value) {
    return {
        type: SET_ENTITYTABLEDATA,
        value: value
    }
}
//CYY 质量监控SSS 域数据质量变化监控日志  结果
export function upDateEntityTable(last) {
    return {
        type: UPDATA_ENTITYTABLE,
        value: last
    }
}
//CYY 实体质量查看-数据质量变化趋势分析 请求
export function setEntityDataChange(request) {
    return {
        type: SET_ENTITYCHANGE,
        value:request
    }
}
//CYY 实体质量查看-数据质量变化趋势分析  结果
export function upDateEntityChange(list) {
    return {
        type: UPDATA_ENTITYCHANGE,
        value: list
    }
}
//请求实体质量表数据
export function setQualityEntityTable(request) {
    return {
        type: SET_QUALITYTABLE,
        value: request
    }
}
//更新实体质量表数据
export function upDataQualityEntityTable(entity) {
    return {
        type: UPDATA_QUALITYTABLE,
        value: entity
    }
}
//CYY 实体质量查看-最近一次监控时间 请求
export function setEntityTrendChange(record) {
    return {
        type: SET_ENTITYTREND,
        value: record
    }
}
//CYY 实体质量查看-最近一次监控时间  结果
export function upDataEntityTrend(trend) {
    return {
        type: UPDATA_ENTITYTREND,
        value: trend
    }
}
//CYY 实体质量查看-最近一次监控质量数据明细  请求
export function setMemberDataTable(record) {
    return {
        type: SET_MEMBERTABLE,
        value: record
    }
}
//CYY 实体质量查看-最近一次监控质量数据明细  结果
export function upDataMemberTable(member) {
    return {
        type: UPDATA_MEMBERTABLE,
        value: member
    }
}
//CYY 实体质量查看-数据质量监控质量日志 请求
export function requestEntityCheckList(datas) {
    return {
        type: REQUEST_ENTITI_LIST,
        value: datas
    }
}
//CYY 实体质量查看-数据质量监控质量日志 结果
export function upDataEntityCheckList(data) {
    return {
        type: UPDATE_ENTITY_LIST,
        value: data
    }
}

//缓存id
export function getMemberId(id) {
    return {
        type: GET_MEMBERID,
        value: id
    }
}
//缓存显示隐藏筛选条件数据
export function showEntityFilterCondition(show) {
    return {
        type: SHOW_FILTERCONDITION,
        value: show,
    };
}
//缓存实体条件数据
export function setEntityConditionData(data) {
    return {
        type: SET_CONDITIONDATA,
        value: data,
    };
}
//缓存实体数据
export function setEntityData(show) {
    return {
        type: SET_ENTITYDATA,
        value: show,
    };
}
//缓存list
export function setEntityConditionList(list) {
    return {
        type: SET_CONDITIONLIST,
        value: list,
    };
}
//获取实体id
export function getEntityId(id) {
    return {
        type: GET_ENTITYID,
        value: id
    }
}
//获取实体名字
export function getEntityName(name) {
    return {
        type: GET_ENTITYNAME,
        value: name
    }
}
//
export function filterEntityData(filter) {
    return {
        type: FILTER_ENTITYDATA,
        value: filter,
    };
}
export function setShowEntityColumns(filter) {
    return {
        type: SET_SHOWCOLUMNS,
        value: filter,
    };
}
export function showAllEntityColumns(show) {
    return {
        type: SHOW_ALLCOLUMNS,
        value: show,
    };
}
//auditDataRecordModal
export function requestDataAuditRecord(params) {
    return {
        type: REQUEST_DATAAUDITRECORD,
        value: params,
    }
}
//规则是否被启用
export function onChangeStatusR(record) {
    return{
        type:ON_CHANGE_STATUSR,
        value:record,
    }
}
//删除属性规则 deleteRule
export function deleteRule(delet) {
    return{
        type:DELETE_RULE,
        value:delet,
    }
}
//获取模型对应数据子集的ID DOMAIN_DATA_LIST
export function domainDataList(domainId) {
    return{
        type:DOMAIN_DATA_LIST,
        value:domainId,
    }
}
//获取对应数据子集的模型
export function modalListData(modalList) {
    return{
        type:MODAL_DATA_LIST,
        value:modalList,
    }
}
//获取对应实体的模型的id
export function modalData(modalId) {
    return{
        type:MODA_LDATA,
        value:modalId,
    }
}
export function entityListData(entityList) {
    return{
        type:ENTITY_LIST_DATA,
        value:entityList,
    }
}
//获取对应实体的属性
export function entityData(entityId) {
    return{
        type:ENTITY_DATA,
        value:entityId,
    }
}
export function attributeListData(attributeList) {
    return{
        type:ATTRIBUTE_LIST_DATA,
        value:attributeList,
    }
}
//规则编辑
export function onEdtiorRule(ruleEdtior) {
    return{
        type:ON_EDTIOR_RULE,
        value:ruleEdtior,
    }
}
//查询框SearchBox
export function onSearch(nameLike) {
    return{
        type:ON_SEARCH,
        value:nameLike,
    }
}
//查询规则SearchBox
export function onSearchRuleList(ruleLike) {
    return{
        type:ON_SEARCH_RULE,
        value:ruleLike,
    }
}
//查询规则列表的分页数据
export function searchRulePageData(searchRulePageData) {
    return{
        type:SEARCH_RULE_PAGEDATA,
        value:searchRulePageData,
    }
}

























