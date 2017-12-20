import {
    REQUEST_DOMAINDATA,
    UPDATE_DOMAINDATA,
    SHOW_ERROR,
    SHOW_DOMAINCREATE,
    ADD_DOMAINATTR,
    CHANGE_MODELNAME,
    UPDATE_ENTITYDATA,
    SHOW_ENTITYMODAL,
    CHANGE_ENTITYNAME,
    CHANGE_ENTITYDESC,
    SET_MODELATTR,
    ADD_ENTITY,
    SHOW_ATTRCREATE,
    SET_CLICKENTITYDATA,
    UPDATE_ATTRLIST,
    SET_ATTRIBUTEDATA,
    SET_ALLMODELLIST,
    SET_SELECTEDMODELS_ENTITY,
    SET_SELECTEDENTITYS_ATTR, REQUEST_ALLVERSION,
    UPDATE_VERSIONLIST,
    DOMAIN_EDTIOR_SIGN,
    SET_MONITOR,
    SET_MONITOR_LIST,
    MONITOR_DATA_LIST,
} from'./constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
    isRequesting: false,
    // 数据子集编辑模态框是否显示
    showEditDomain: false,
    // 实体编辑模态框是否显示
    showEditEntity: false,
    // 属性编辑模态框是否显示
    showEditAttr: false,
    // 所有数据子集的list
    domainDataList: '',
    // 当前编辑的model数据缓存
    modelAttr: '',
    // 当前编辑数据子集下的实体list
    entityDataList: '',
    // 当前编辑的domain数据缓存
    domainAttribute: '',
    // 当前错误信息
    error: '',
    // 当前编辑的模型名称缓存
    modelName: '',
    // 当前编辑的实体名称缓存
    entityName: '',
    // 当前编辑的实体描述缓存
    entityDesc: '',
    // 当前编辑的entity数据缓存
    entityAttr: '',
    // 当前编辑实体下的属性list
    entityAttrList: '',
    // 当前编辑的Attribute数据缓存
    attributeData: '',
    // modelList数据缓存
    modelDataList: '',
    // 下拉框中实体的缓存
    selectedEntityList: '',
    // 下拉框中属性的缓存
    selectedAttrsList: '',
    // 当前编辑的实体的历史版本缓存
    entityVersionList: '',
});

function designReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_DOMAINCREATE:
            return state
                .set('showEditDomain', action.show);
        case REQUEST_DOMAINDATA:
            return state
                .set('isRequesting', action.request);
        case UPDATE_DOMAINDATA:
            return state
                .set('domainDataList', action.domainDataList);
        case SHOW_ERROR:
            return state
                .set('error', action.error);
        case ADD_DOMAINATTR:
            return state
                .set('domainAttribute', action.attr);
        case CHANGE_MODELNAME:
            return state
                .set('modelName', action.modelName);
        case SET_MODELATTR:
            return state
                .set('modelAttr', action.value);
        case UPDATE_ENTITYDATA:
            return state
                .set("entityDataList", action.value);
        case SHOW_ENTITYMODAL:
            return state
                .set("showEditEntity", action.value);
        case CHANGE_ENTITYNAME:
            return state
                .set("entityName", action.value);
        case CHANGE_ENTITYDESC:
            return state
                .set("entityDesc", action.value);
        case ADD_ENTITY:
            return state
                .set("entityAttr", action.value);
        case SHOW_ATTRCREATE:
            return state
                .set("showEditAttr", action.value);
        case SET_CLICKENTITYDATA:
            return state
                .set("entityAttr", action.value);
        case UPDATE_ATTRLIST:
            return state
                .set("entityAttrList", action.value);
        case SET_ATTRIBUTEDATA:
            return state
                .set("attributeData", action.value);
        case SET_ALLMODELLIST:
            return state
                .set("modelDataList", action.value);
        case SET_SELECTEDMODELS_ENTITY:
            return state
                .set("selectedEntityList", action.value);
        case SET_SELECTEDENTITYS_ATTR:
            return state
                .set("selectedAttrsList", action.value);
        case REQUEST_ALLVERSION:
            return state
                .set("entityAttr", action.value);
        case UPDATE_VERSIONLIST:
            return state
                .set("entityVersionList", action.value);
        case DOMAIN_EDTIOR_SIGN:
            return state
                .set('domainSign',action.value);
        case SET_MONITOR:
            return state
                .set('isMonitor',action.value);
        case SET_MONITOR_LIST:
            return state
                .set('monitorList',action.value);
        case MONITOR_DATA_LIST:
            return state
                .set('monitorDataList',action.value);
        default:
            return state;
    }
}
export default designReducer;