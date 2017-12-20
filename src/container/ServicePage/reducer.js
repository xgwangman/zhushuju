import {
    OPENENTITYFIELDSHAREWIN,CLOSEENTITYFIELDSHAREWIN,MODEL_LIST_DATA,
    ENTITY_LIST_DATA,TABLE_LIST_DATA,CACHE_CURRENT_FLOW_DATA,CONCAT_FLOW_FIELD_DATA,
    UPDATE_DOMAINSERVICELIST,SAVE_DOMAINSERVICEDATA,DOMAIN_LIST_DATA,GET_TASK_EDIT_FLOW,UPDATE_TASKARRAYLIST,
    TASK_LIST_DATA,USER_LIST,TASK_OUTPUT_SCHEMA,SHARE_LOG_LIST,WS_LIST,WS_LOG_LIST,WS_DETAIL,
    WS_TEST_PARAMS,TEST_WS_RESULT,SHOW_CONDITION,SHARE_LIST_DATA,SHARE_SET_CONDITIONDATA,SHARE_SET_CONDITIONLIST,
    SHARE_SHOW_ALLCOLUMNS,SHARE_SET_SHOWCOLUMNS
} from'./constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
    domainServiceList: '',
    saveDomainServiceData:'',
    taskOutputList:'',
    userList:[],
    tableServiceData:[],
    taskFlow: null,
});

function serviceReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DOMAINSERVICELIST:
            return state.set('domainServiceList', action.value);
        case DOMAIN_LIST_DATA:
            return state.set('domainBaseList', action.value);
        case MODEL_LIST_DATA:
            return state.set('modelServiceList', action.value);
        case ENTITY_LIST_DATA:
            return state.set('entityServiceList', action.value);
        case TABLE_LIST_DATA:
            return state.set('tableServiceData', action.value);
        case TASK_LIST_DATA:
            return state.set('taskList', action.value);
        case USER_LIST:
            return state.set('userList', action.value);
        case SHARE_LOG_LIST:
            return state.set('shareLogList', action.value);
        case WS_DETAIL:
            return state.set('wsDetail', action.value);
        case WS_LIST:
            return state.set('wsList', action.value);
        case WS_LOG_LIST:
            return state.set('wsLogList', action.value);
        case TASK_OUTPUT_SCHEMA:
            return state.set('taskOutputList', action.value);
        case CACHE_CURRENT_FLOW_DATA:
            return state.set('cacheCurrentFigureData', action.value);
        case CONCAT_FLOW_FIELD_DATA:
            return state.set('flowFieldData', action.value);
        case GET_TASK_EDIT_FLOW:
            return state.set('taskEditFlow', action.value);
        case UPDATE_TASKARRAYLIST:
            return state.set('taskFlow', action.value);
        case OPENENTITYFIELDSHAREWIN:
            return state.set(action.value, true);
        case CLOSEENTITYFIELDSHAREWIN:
            return state.set(action.value, false);
        case SAVE_DOMAINSERVICEDATA:
            return state.set('saveDomainServiceData', action.value);
        case WS_TEST_PARAMS:
            return state.set('testParams', action.value);
        case TEST_WS_RESULT:
            return state.set('testResult', action.value);
        case SHOW_CONDITION:
            return state.set('showCondition',action.value);
        case SHARE_LIST_DATA:
            return state.set('shareDataList',action.value);
        case SHARE_SET_CONDITIONDATA:
            return state.set('shareConditionData',action.value);
        case SHARE_SET_CONDITIONLIST:
            return state.set('shareConditionList',action.value);
        case SHARE_SHOW_ALLCOLUMNS:
            return state
                .set('showAllColumns', action.value);
        case SHARE_SET_SHOWCOLUMNS:
            return state
                .set('showColumns', action.value);
        default:
            return state;
    }
}
export default serviceReducer;



