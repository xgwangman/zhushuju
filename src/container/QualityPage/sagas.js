/**
 * Created by Administrator on 2017/5/18.
 */
import {take, call, put, select, fork, cancel} from 'redux-saga/effects';
import request, {post, get} from '../../common/utils/request';
import alert from '../../common/utils/alert';
import {takeLatest} from 'redux-saga';
import moment from 'moment';
import {
    API_MD_DOMAINLIST,
    API_MD_ENTITYLIST,
    API_MD_UPDATEPLAN,
    API_LISTLAST,
    API_LISTLASTENTITY,
    API_DOMAIN_LISTLASTYEAR,
    API_MDRP_LISTENTITYLASTYEAR,
    API_ENTITY_LISTBASE,
    API_MDRP_LISTDOMAIN,
    API_MDRP_LISTENTITY,
    API_MDRP_LISTENTITYLAST,
    API_MDRP_LISTLASTERRORMEMBER,
    API_MD_ENABLED,
    API_MD_DISABLE,
    API_MD_DESIGN_RULE_LIST,
    API_DQ_LIST,
    API_DESIGN_ADD,
    API_DESIGN_ENABLED,
    API_DESIGN_DISABLE,
    API_DESIGN_DELETE,
    API_LISTMODEL,
    API_ATTRIBUTE_LISTBASE,
    API_DESIGN_UPDATE,
    API_DOMAIN_LIST,
    API_MDRP_LISTDOMAINEETITY,
} from '../../API';
import {
    requestQualityList,
    updateQualityList,
    requestReport,
    updateQualityReport,
    onSaveModify,
    showExecutePlan,
    setWatcherTimeData,
    updateWatcherTime,
    setMonitorTableData,
    updateMonitorTable,
    setMasterDataChange,
    upDateMasterChange,
    setEntityClassesData,
    upDateEntityClasses,
    setEntityTableData,
    upDateEntityTable,
    setEntityDataChange,
    upDateEntityChange,
    setQualityEntityTable,
    upDataQualityEntityTable,
    setEntityTrendChange,
    upDataEntityTrend,
    setMemberDataTable,
    upDataMemberTable,
    onChangeStatus,
    ruleListId,
    requestruleListData,
    ruquestRuleLibrary,
    updateRuleLibrary,
    filterEntityData,
    addRule,
    onChangeStatusR,
    deleteRule,
    domainDataList,
    entityListData,
    modalListData,
    modalData,
    attributeListData,
    entityData,
    rulePageData,
    onSearch,
    searchRulePageData,
    requestEntityCheckList,
    upDataEntityCheckList,
} from './actions';
import {
    selectModifyPlanAttr,
    selectQualityReqData,
    selectEntityConditionList,
    selectEntityTrendChange,
    selectRuleListId,
    selectOnEdtiorRule,
    selectRulePageData,
    selectOnSearchRuleList,
} from './selectors';

/**
 * *****************************************************************
 */

// 请求数据子集质量数据
export function* doRequestQualityList() {
    const requestURL = API_MD_DOMAINLIST;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateQualityList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求质量报告
export function* dorequestReport() {
    const requestURL= API_MD_ENTITYLIST;
    const result=yield call(get,requestURL);
    if(result.data && result.data.resultCode === 1){
        yield put(updateQualityReport(result.data.result));
    }else{
        alert(result.data.resultText, 'error');
    }

}
// 请求保存修改执行计划
export function* doSaveModify() {
    var requestURL = API_MD_UPDATEPLAN;
    const ModifyAttr = yield select(selectModifyPlanAttr());
    ModifyAttr.startTime=moment(ModifyAttr.startTime).format("YYYY-MM-DD HH:mm:ss");
    ModifyAttr.everyDay=moment(ModifyAttr.everyDay).format("HH:mm:ss");
    let result = yield call(post, {url: requestURL, data: ModifyAttr});
    if (result.data && result.data.resultCode == 1) {
        yield put(showExecutePlan(false));
        yield call(doRequestQualityList);
    } else {
        alert(result.data.resultText, 'error');
    }
}
//CYY  请求数据子集的规则列表（table）
export function* doRuleListId(action) {
    var requestURL = API_MD_DESIGN_RULE_LIST+ '?domainId=' + action.value.domainId +'&page='+action.value.page+'&limit='+action.value.limit;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(requestruleListData(result.data))
    } else {
        alert(result.data.resultText, 'error');
    }
}
//是否启用质量监控
export function* doChangeStatus(action) {
    let requestURL;
    if (action.value.status == true) {
        requestURL = API_MD_ENABLED;
    } else if (action.value.status == false) {
        requestURL = API_MD_DISABLE;
    }
    let result = yield call(post, {url: requestURL, data: {id: action.value.id}});
    if (result.data && result.data.resultCode == 1) {
        yield call(doRequestQualityList);
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求规则库列表
export function* doRuquestRuleLibrary() {
    const requestURL=API_DQ_LIST;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateRuleLibrary(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}

//添加规则（tree）doAddRule
export function* doAddRule(action) {
    const ruleId=yield select(selectRuleListId());
    var edtior=yield select(selectOnEdtiorRule());
    const pageData=yield select(selectRulePageData());
    var requestURL,rules,result;
    if(edtior==null){
        requestURL=API_DESIGN_ADD;
         rules=JSON.stringify(action.value.value);
         result = yield call(post, {url: requestURL, data: {attId:action.value.attributeId, domainId:ruleId,modelId:action.value.modelId,entityId:action.value.entityId,
                                    name:action.value.name,remark:action.value.describe, rule:rules}});
        if (result.data && result.data.resultCode == 1) {
            alert(result.data.resultText, 'success');
            yield put(rulePageData(pageData));
        } else {
            alert(result.data.resultText, 'error');
        }
    }else{
        var edtiorId=edtior.id;//编辑规则的ID。判断是新加规则还是修改规则
        requestURL=API_DESIGN_UPDATE;
        rules=JSON.stringify(action.value.value);
        result = yield call(post, {url: requestURL, data: {id:edtiorId,attId:action.value.attributeId, domainId:ruleId,modelId:action.value.modelId,entityId:action.value.entityId,
            name:action.value.name,remark:action.value.describe, rule:rules}});
        if (result.data && result.data.resultCode == 1) {
            alert(result.data.resultText, 'success');
            yield put(rulePageData(pageData));
        } else {
            alert(result.data.resultText, 'error');
        }



    }
}

//CYY质量监控SSS   最近一次监控时间
export function* doWatcherTime (action) {
    //const dataWatcher = yield select(selectQualityReqData());
    const requestURL = API_LISTLAST + '?id=' + action.value.entityId;
    let result = yield call(get, requestURL);
    if(result.data && result.data.resultCode === 1){
        yield put(updateWatcherTime(result.data.result));
    }else{
        alert(result.data.resultText, 'error');
    }
}
//CYY质量监控SSS  最近一次监控质量汇总
export function* doMonitorTable (action) {
    //const dataWatcher = yield select(selectQualityReqData());
    const requestURL = API_MDRP_LISTDOMAIN+ '?id=' + action.value.id.entityId + '&page=' + action.value.page + '&limit='+ action.value.limit;
    let result = yield call(get, requestURL);
    if(result.data && result.data.resultCode === 1){
        yield put(updateMonitorTable(result.data));
    }else{
        alert(result.data.resultText, 'error');
    }
}
//CYY质量监控SSS  域数据质量变化趋势分析
export function* doMasterChange (action) {
    //const dataWatcher = yield select(selectQualityReqData());
    const requestURL = API_DOMAIN_LISTLASTYEAR+ '?id=' + action.value.entityId;
    let result = yield call(get, requestURL);
    if(result.data && result.data.resultCode === 1){
        yield put(upDateMasterChange(result.data.result));
    }else{
        alert(result.data.resultText, 'error');
    }
}
//CYY 质量监控SSS 域数据质量变化监控日志
export function* doEntityTable (action) {
    //const dataWatcher = yield select(selectQualityReqData());
    const requestURL = API_LISTLASTENTITY + '?id=' +action.value.id.entityId + '&page=' + action.value.page + '&limit=' + action.value.limit;
    let result = yield call(get, requestURL);
    if(result.data && result.data.resultCode === 1){
        yield put(upDateEntityTable(result.data));
    }else{
        alert(result.data.resultText, 'error');
    }
}
//CYY 实体质量查看-数据质量变化趋势分析
export function* doEntityChange (entityId) {
    const requestURL = API_MDRP_LISTENTITYLASTYEAR + '?id=' + entityId.value;
    let result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(upDateEntityChange(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求实体质量表数据
export function* doQualityTable (action) {
        const requestURL = API_MDRP_LISTDOMAINEETITY + '?id=' +  action.value.entityId + '&page=' + action.value.page + '&limit=' + action.value.limit +'&nameLike=' + action.value.nameLike;
        let result = yield call(get, requestURL);
        if (result.data && result.data.resultCode === 1) {
            yield put(upDataQualityEntityTable(result.data));
        } else {
            alert(result.data.resultText, 'error');
        }
}
//CYY 实体质量查看- 最近一次监控时间
export function* doEntityTrend (action) {
    const requestURL = API_MDRP_LISTENTITYLAST + '?id=' + action.value.entityId;
    let result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(upDataEntityTrend(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//CYY 实体质量查看-数据质量监控质量日志
export function* OnRequestEntityCheckList (action) {
    const requestURL = API_MDRP_LISTENTITY + '?id=' + action.value.id.entityId + '&page=' + action.value.page + '&limit=' + action.value.limit;
    let result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(upDataEntityCheckList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//CYY 实体质量查看-最近一次监控质量数据明细
export function* doMemberTable (action) {
    const requestURL = API_MDRP_LISTLASTERRORMEMBER;
    let result = yield call(post, {url: requestURL,
        data: {
            entityId: action.value.id.entityId,
            page: action.value.page,
            limit: action.value.limit
        }});
    if (result.data && result.data.resultCode === 1) {
        yield put(upDataMemberTable({totalProperty: result.data.totalProperty, values: result.data.result.values, titles: result.data.result.titles}));

    } else {
        alert(result.data.resultText, 'error');
    }
}
//过滤实体数据list
export function* doFilterEntityData() {
    const conditions = yield select(selectEntityConditionList());
    const entityData = yield select(selectEntityTrendChange());
    const requestURL = API_MDRP_LISTLASTERRORMEMBER;
    const result = yield call(post, {url: requestURL, data: {entityId: entityData.entityId, condition: conditions}});
    if (result.data && result.data.resultCode === 1) {
        yield put(upDataMemberTable(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//规则是否被启用
export function* doChangeStatusR(action) {
    let requestURL;
    const ruleId=yield select(selectRuleListId());
    if (action.value.status == true) {
        requestURL = API_DESIGN_ENABLED;
    } else if (action.value.status == false) {
        requestURL = API_DESIGN_DISABLE;
    }
    let result = yield call(post, {url: requestURL, data: {id: action.value.id}});
    if (result.data && result.data.resultCode == 1) {
        yield put(ruleListId(ruleId));
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
//删除属性规则
export function* doDeleteRule(action) {
    const ruleId=yield select(selectRuleListId());
    const pageData=yield select(selectRulePageData());
    const requestURL=API_DESIGN_DELETE;
    const result = yield call(post, {url: requestURL, data: {id:action.value.id}});
    if (result.data && result.data.resultCode == 1) {
        yield put(rulePageData(pageData));//用rulePageData（）替代ruleListId（）
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
//获取对应数据子集的模型
export function* doDomainDataList(action) {
    const requestURL = API_LISTMODEL;
    const result = yield call(post, {url: requestURL, data: {id:action.value}});
    if (result.data && result.data.resultCode === 1) {
        yield put(modalListData(result.data.result))
    } else {
        alert(result.data.resultText, 'error');
    }
}
//获取对应实体的模型的 (获取模型内的实体)
export function* doModalData(action) {
    var requestURL = API_ENTITY_LISTBASE+ '?modelId=' + action.value;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(entityListData(result.data.result))
    } else {
        alert(result.data.resultText, 'error');
    }
}
//获取对应实体的属性（获取实体的属性）
export function* doEntityData(action) {
    var requestURL = API_ATTRIBUTE_LISTBASE+ '?entityId=' + action.value;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(attributeListData(result.data.result))
    } else {
        alert(result.data.resultText, 'error');
    }
}
//查询框SearchBox
export function* doOnSearch(action) {
    const requestURL = API_MD_DOMAINLIST + '?nameLike='+action.value;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode === 1) {
        yield put(updateQualityList(result.data.result));
    } else {
        alert(result.data.resultText?result.data.resultText:'操作失败', 'error');
    }
}
//查询规则SearchBox
export function* OnSearchRuleList(action) {
    const ruleData=yield select(selectOnSearchRuleList());
    const requestURL = API_MD_DESIGN_RULE_LIST + '?domainId='+ruleData.domainId+'&nameLike='+ruleData.nameLike+'&page='+action.value.page+'&limit='+action.value.limit;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode === 1) {
        yield put(requestruleListData(result.data));
    } else {
        alert(result.data.resultText?result.data.resultText:'操作失败', 'error');
    }
}

/**
 * *****************************************************************
 */
//请求数据子集质量数据
export function* getRequestQualityListWatcher() {
    yield *takeLatest(requestQualityList().type, doRequestQualityList)
}
//请求质量报告
export function* getRequestReportWatcher() {
    yield *takeLatest(requestReport().type,dorequestReport)
}
//请求保存修改执行计划
export function* getSaveModifyWatcher() {
    yield *takeLatest(onSaveModify().type, doSaveModify)
}
//CYY质量监控SSS   最近一次监控时间
export function* getWatcherTimeWatcher() {
    yield *takeLatest(setWatcherTimeData().type, doWatcherTime)
}
//CYY质量监控SSS  最近一次监控质量汇总
export function* getMonitorTableWatcher () {
    yield *takeLatest(setMonitorTableData().type, doMonitorTable)
}
//CYY质量监控SSS  域数据质量变化趋势分析
export function* getMasterDataChangeWatcher () {
    yield *takeLatest(setMasterDataChange().type, doMasterChange)
}
//CYY 质量监控SSS 域数据质量变化监控日志
export function* getEntityTableDataWatcher () {
    yield *takeLatest(setEntityTableData().type, doEntityTable)
}
//CYY 实体质量查看-数据质量变化趋势分析
export function* getEntityDataChangeWatcher () {
    yield *takeLatest(setEntityDataChange().type, doEntityChange)
}
//请求实体质量表数据
export function* getQualityEntityTableWatcher () {
    yield *takeLatest(setQualityEntityTable().type, doQualityTable)
}
//CYY 实体质量查看- 最近一次监控时间
export function* getEntityTrendChangeWathcer () {
    yield *takeLatest(setEntityTrendChange().type, doEntityTrend)
}
//CYY 实体质量查看-最近一次监控质量数据明细
export function* getMemberDataTableWatcher () {
    yield *takeLatest(setMemberDataTable().type, doMemberTable)
}
//过滤实体数据list
export function* getFilterEntityData () {
    yield *takeLatest(filterEntityData().type, doFilterEntityData)
}
//是否启用质量监控
export function* getOnChangeStatusWatcher() {
    yield *takeLatest(onChangeStatus().type, doChangeStatus)
}
//请求数据子集的规则列表
export function* getRuleListIdWatcher() {
    yield *takeLatest(rulePageData().type, doRuleListId)
}
//请求规则库列表
export function* getRuquestRuleLibraryWatcher() {
    yield *takeLatest(ruquestRuleLibrary().type, doRuquestRuleLibrary)
}
//添加规则（tree）
export function* getAddRuleWatcher() {
    yield *takeLatest(addRule().type, doAddRule)
}

//规则是否被启用 doChangeStatusR
export function* getonChangeStatusRWatcher() {
    yield *takeLatest(onChangeStatusR().type, doChangeStatusR)
}
//删除属性规则 doDeleteRule
export function* getDeleteRuleWatcher() {
    yield *takeLatest(deleteRule().type, doDeleteRule)
}
//获取对应数据子集的模型
export function* getDomainDataListWatcher() {
    yield *takeLatest(domainDataList().type, doDomainDataList)
}
//获取对应实体的模型的id
export function* getModalDataWatcher() {
    yield *takeLatest(modalData().type, doModalData)
}
//获取对应实体的属性（获取实体的属性）
export function* getEntityDataWatcher() {
    yield *takeLatest(entityData().type, doEntityData)
}
//查询框SearchBox doOnSearch
export function* getOnSearchWatcher() {
    yield *takeLatest(onSearch().type, doOnSearch)
}
//查询规则SearchBox
export function* getOnSearchRuleListWacther() {
    yield *takeLatest(searchRulePageData().type, OnSearchRuleList)
}
//CYY 实体质量查看-数据质量监控质量日志
export function* getRequestEntityCheckListWatcher() {
    yield *takeLatest(requestEntityCheckList().type, OnRequestEntityCheckList)
}
/**
 * *****************************************************************
 */
export default function* entry() {
    const requestQualityListWatcher = yield fork(getRequestQualityListWatcher);
    const requestReportWatcher = yield fork(getRequestReportWatcher);
    const saveModifywatcher = yield fork(getSaveModifyWatcher);
    const recentTimeWatcher = yield fork(getWatcherTimeWatcher);
    const monitorTableWatcher = yield fork(getMonitorTableWatcher);
    const masterDataChangeWatcher = yield fork(getMasterDataChangeWatcher);
    //const entityClassesDataWatcher = yield fork(getEntityClassesDataWatcher);
    const entityTableDataWatcher = yield fork(getEntityTableDataWatcher);
    const entityDataChangeWatcher = yield fork(getEntityDataChangeWatcher);
    const entityTrendChangeWatcher= yield fork(getEntityTrendChangeWathcer);
    const onChangeStatusWatcher = yield fork(getOnChangeStatusWatcher);
    const ruleListIdWatcher = yield fork(getRuleListIdWatcher);
    const ruquestRuleLibraryWatcher = yield fork(getRuquestRuleLibraryWatcher);
    const addRuleWatcher = yield fork(getAddRuleWatcher);
    const qualityEntityTableWatcher = yield fork(getQualityEntityTableWatcher);
    const onChangeStatusRWatcher = yield fork(getonChangeStatusRWatcher);
    const deleteRuleWatcher = yield fork(getDeleteRuleWatcher);
    const domainDataListWatcher = yield fork(getDomainDataListWatcher);
    const modalDataWatcher = yield fork(getModalDataWatcher);
    const entityDataWatcher = yield fork(getEntityDataWatcher);
    const memberDataTableWatcher = yield fork(getMemberDataTableWatcher);
    const filterEntityDataWatcher = yield fork(getFilterEntityData);
    const onSearchWatcher=yield fork(getOnSearchWatcher);
    const onSearchRuleListWatcher=yield fork(getOnSearchRuleListWacther);
    const requestEntityCheckListWatcher=yield fork(getRequestEntityCheckListWatcher);
}