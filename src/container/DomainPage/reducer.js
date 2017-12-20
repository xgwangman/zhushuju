import {
    UPDATE_DOMAINDATA,
    SET_DOMAINATTR,
    SET_MODELATTR,
    UPDATE_ENTITYLIST,
    SET_ENTITYATTR,
    UPDATE_ATTRLIST,
    UPDATE_ENTITYDATALIST,
    SHOW_FILTERCONDITION,
    SET_CONDITIONDATA,
    SET_CONDITIONLIST,
    SET_SHOWCOLUMNS,
    SHOW_ALLCOLUMNS,
    SHOW_ADDVERSION,
    SET_VERSIONDATA,
    SET_MODALKEY,
    SET_ENTITYVERSIONLIST,
    SET_ENTITYDATATYPE,
    SET_AUDITDATAMODALSTATUS,
    UPDATE_DATAAUDITRECORD,
    UPDATE_ENTITYTASKLIST,
    SET_TASKATTR,
    UPDATE_DATASOURCELIST,

    //^^^^^^^^^^^^^^^^^^^^^^^
    VERSION_ID,
    UPDATE_VERSIONDATALIST,
    UPDATE_VERSIONATTRLIST,
    GET_NAME,
    SET_ENTITYTASKTYPE,
    OPEN_EDITWINDOW,
    UPDATE_TASKARRAYLIST,
    CLOSE_EDITWINDOW,
    UPDATE_TABLELIST,
    UPDATE_FIELDLIST,
    SET_CURRENTEDITCOMPONENTDATA,
    SET_COMPONENTFLOWFIELDS,

    //lixiaokang
    REQUEST_HANDLE_TASKEXECUTELOG,
    UPDATE_TASKEXECUTELOGPAGE,
    SET_TASKNAME,
    SET_SQLT_FIELDLIST,
    SET_ST_FIELDLIST,

    FILTER_DATA_LIST,
    ENTITY_BASE_ATTRLIST,
    SET_UC,
} from'./constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
    domainDataList: null,
    domainAttr: null,
    modelAttr: null,
    entityList: null,
    entityData: null,
    attrList: null,
    entityDataList: null,
    filterShow: false,
    conditionData: null,
    conditionList: null,
    showColumns: null,
    showAllColumns: true,
    showAddVersion: false,
    versionData: null,
    modalKey: null,
    versionList: null,
    dataType: null,
    auditShow: false,
    auditDataList: null,
    entityTaskList: null,
    taskAttr: null,
    upDataSrcList: null,
    taskType: null,
    taskFlow: null,
    tableList: null,
    fieldList: null,
    currentEditFigure: null,
    componentData: null,
    flowFields: null,
    taskExecuteData:null,
    reqHandletaskExecute:null,
    taskExecuteDataList:null,
    setTaskName:null,
    sqlTfieldList:null,
    STfieldList:[]
});

function domainReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DOMAINDATA:
            return state
                .set('domainDataList', action.value);
        case SET_DOMAINATTR:
            return state
                .set('domainAttr', action.value);
        case SET_MODELATTR:
            return state
                .set('modelAttr', action.value);
        case UPDATE_ENTITYLIST:
            return state
                .set('entityList', action.value);
        case SET_ENTITYATTR:
            return state
                .set('entityData', action.value);
        case UPDATE_ATTRLIST:
            return state
                .set('attrList', action.value);
        case UPDATE_ENTITYDATALIST:
            return state
                .set('entityDataList', action.value);
        case SHOW_FILTERCONDITION:
            return state
                .set('filterShow', action.value);
        case SET_CONDITIONDATA:
            return state
                .set('conditionData', action.value);
        case SET_CONDITIONLIST:
            return state
                .set('conditionList', action.value);
        case SET_SHOWCOLUMNS:
            return state
                .set('showColumns', action.value);
        case SHOW_ALLCOLUMNS:
            return state
                .set('showAllColumns', action.value);
        case SHOW_ADDVERSION:
            return state
                .set('showAddVersion', action.value);
        case SET_VERSIONDATA:
            return state
                .set('versionData', action.value);
        case SET_MODALKEY:
            return state
                .set('modalKey', action.value);
        case SET_ENTITYVERSIONLIST:
            return state
                .set('versionList', action.value);
        case SET_ENTITYDATATYPE:
            return state
                .set('dataType', action.value);
        case SET_AUDITDATAMODALSTATUS:
            return state
                .set('auditShow', action.value);
        case UPDATE_DATAAUDITRECORD:
            return state
                .set('auditDataList', action.value);
        //^^^^^^^
        case VERSION_ID:
            return state
                .set('id', action.value);
        case UPDATE_VERSIONDATALIST:
            return state
                .set('versionData', action.value);
        case UPDATE_VERSIONATTRLIST:
            return state
                .set('versionAttrList', action.value);
        case GET_NAME:
            return state
                .set('name', action.value);
        case UPDATE_ENTITYTASKLIST:
            return state
                .set('entityTaskList', action.value);
        case SET_TASKATTR:
            return state
                .set('taskAttr', action.value);
        case UPDATE_DATASOURCELIST:
            return state
                .set('upDataSrcList', action.value);
        case SET_ENTITYTASKTYPE:
            return state
                .set('taskType', action.value);
        case OPEN_EDITWINDOW:
            return state
                .set(action.window, true);
        case SET_CURRENTEDITCOMPONENTDATA:
            return state
                .set('componentData', action.value);
        case UPDATE_TASKARRAYLIST:
            return state
                .set('taskFlow', action.value);
        case CLOSE_EDITWINDOW:
            return state
                .set(action.window, false);
        case UPDATE_TABLELIST:
            return state
                .set('tableList', action.value);
        case UPDATE_FIELDLIST:
            return state
                .set('fieldList', action.value);
        case SET_COMPONENTFLOWFIELDS:
            return state
                .set('flowFields', action.value);
        case REQUEST_HANDLE_TASKEXECUTELOG:
            return state
                .set('reqHandletaskExecute', action.value);
        case UPDATE_TASKEXECUTELOGPAGE:
            return state
                .set('taskExecuteDataList', action.value);
        case SET_TASKNAME:
            return state
                .set('setTaskName', action.value);
        case SET_SQLT_FIELDLIST:
            return state
                .set('sqlTfieldList', action.value);
        case SET_ST_FIELDLIST:
            return state
                .set('STfieldList', action.value);
        case FILTER_DATA_LIST:
            return state
                .set('filterDataList', action.value);
        case ENTITY_BASE_ATTRLIST:
            return state
                .set('entityBaseAttrList', action.value);
        case SET_UC:
            return state
                .set('ucDataList',action.value);
        default:
            return state;
    }
}
export default domainReducer;