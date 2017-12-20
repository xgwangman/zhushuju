/**
 * Created by Administrator on 2017/5/18.
 */
import {
    UPDATE_QUALITYLIST,
    UPDATE_QUALITYREPORT,
    SHOW_EXECUTEPLAN,
    SET_MODIFYPLANATTR,
    SET_REQAPPDATA,
    SHOW_MODIFYCREATE,
    REQUEST_RULE_LIST_DATA,
    RULE_LIST_NAME,
    UPDATE_RULE_LIBRARY,
    SHOW_RULE_MADAL,
    RULE_NAME,
    ON_SAVE_RULES_EDITOR,
    SET_QUALITYREQ,
    SET_WATCHERTIME,
    UPDATE_WATCHERTIME,
    UPDATE_MONITORTABLE,
    UPDATA_MASTERDATA,
    UPDATA_ENTITYCLASSES,
    UPDATA_ENTITYTABLE,
    UPDATA_ENTITYCHANGE,
    UPDATA_QUALITYTABLE,
    UPDATA_ENTITYTREND,
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
    SHOW_ALLCOLUMNS,
    RULE_LIST_ID,
    ON_EDTIOR_RULE,
    MODAL_DATA_LIST,
    ENTITY_LIST_DATA,
    ATTRIBUTE_LIST_DATA,
    RULE_PAGE_DATA,
    ON_SEARCH_RULE,
    UPDATE_ENTITY_LIST,
}from './constants';
import {fromJS} from 'immutable';

/**
 * *****************************************************************
 */
const initialState=fromJS({
    qualityDataList:'',
    qualityReportList:'',
    showExecute: false,      // 应用执行计划修改模态框是否显示
    executePlan:'',
    // 执行计划attr
    modifyPlanAttr: '',
    // 请求数据源时，将appId和数据源类型缓存起来
    reqDataSrcAttr: '',
    showEditModify :false,
    qualityReqData: '',
    recentWatcherData: '',
    recentWatcherTime: '',
    monitorDataTable: '',
    monitorTableData: '',
    entityClassesData: '',
    entityDataClasses: '',
    entityDataTable: '',
    entityChange: '',
    entityTrend: '',
    entityId: '',
    memberId:'',
    getId: '',
    getName: '',
    entityFilterShow: false,
    entityConditionData: '',
    entityData: '',
    showEntityColumns: '',
    showAllEntityColumns: true,
    auditShow: '',
});
/**
 * *****************************************************************
 */
function qualityReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_QUALITYLIST:
            return state
                .set('qualityDataList', action.value);
        case UPDATE_QUALITYREPORT:
            return state
                .set('qualityReportList',action.value);
        case SHOW_EXECUTEPLAN:
            return state
                .set('showExecute',action.value);
        case SET_MODIFYPLANATTR:
            return state
                .set('modifyPlanAttr', action.value);
        case SET_REQAPPDATA:
            return statef
                .set('reqDataSrcAttr', action.value);
        case SHOW_MODIFYCREATE:
            return state
                .set('showEditModify', action.value);
        case REQUEST_RULE_LIST_DATA:
            return state
                .set('ruleListData',action.value);
        case RULE_LIST_NAME:
            return state
                .set('name',action.value);
        case UPDATE_RULE_LIBRARY:
            return state
                .set('library',action.value);
        case SHOW_RULE_MADAL:
            return state
                .set('visible',action.value);
        case RULE_NAME:
            return state
                .set('ruleName',action.value);
        case ON_SAVE_RULES_EDITOR:
            return state
                .set('edtior',action.value);
	    case SET_QUALITYREQ:
            return state
                .set('qualityReqData', action.value);
        case SET_WATCHERTIME:
            return state
                .set('recentWatcherData',action.value);
        case UPDATE_WATCHERTIME:
            return state
                .set('recentWatcherTime',action.value);
        case UPDATE_MONITORTABLE:
            return state
                .set('monitorTableData',action.value);
        case UPDATA_MASTERDATA:
            return state
                .set('masterChangeData',action.value);
        case UPDATA_ENTITYCLASSES:
            return state
                .set('entityDataClasses',action.value);
        case UPDATA_ENTITYTABLE:
            return state
                .set('entityDataTable',action.value);
        case UPDATA_ENTITYCHANGE:
            return state
                .set('entityChange',action.value);
        case UPDATA_QUALITYTABLE:
            return state
                .set('qualityEntityTable',action.value);
        case UPDATA_ENTITYTREND:
            return state
                .set('entityTrend',action.value);
        case UPDATA_MEMBERTABLE:
            return state
                .set('memberTable',action.value);
        case GET_ENTITYTABLEID:
            return state
                .set('entityId',action.value);
        case GET_MEMBERID:
            return state
                .set('memberId',action.value);
        case GET_ENTITYID:
            return state
                .set('getID',action.value);
        case GET_ENTITYNAME:
            return state
                .set('getName',action.value);
        case SHOW_FILTERCONDITION:
            return state
                .set('entityFilterShow', action.value);
        case SET_CONDITIONDATA:
            return state
                .set('entityConditionData', action.value);
        case SET_ENTITYDATA:
            return state
                .set('entityData', action.value);
        case SET_CONDITIONLIST:
            return state
                .set('entityConditionList', action.value);
        case SET_SHOWCOLUMNS:
            return state
                .set('showEntityColumns', action.value);
        case SHOW_ALLCOLUMNS:
            return state
                .set('showAllEntityColumns', action.value);
        case MODAL_DATA_LIST:
            return state
                .set('modalDataList',action.value);
        case ENTITY_LIST_DATA:
            return state
                .set('entityDataList',action.value);
        case ATTRIBUTE_LIST_DATA:
            return state
                .set('attributeList',action.value);
        case RULE_LIST_ID:
            return state
                .set('ruleId',action.value);
        case ON_EDTIOR_RULE:
            return state
                .set('ruleEdtior',action.value);
        case RULE_PAGE_DATA:
            return state
                .set('pageData',action.value);
        case ON_SEARCH_RULE:
            return state
                .set('ruleLike',action.value);
        case UPDATE_ENTITY_LIST:
            return state
                .set('entityCheckList',action.value);
        default:
            return state;
    }
}
export default qualityReducer;