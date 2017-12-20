import {
    UPDATE_APPLIST,
    SHOW_APPCREATE,
    SET_APPATTR,
    SET_REQAPPDATA,
    UPDATE_DATASRCLIST,
    SET_DATASOURCEATTR,
    UPDATE_TABLELIST,
    SET_TABLEATTR,
    UPDATE_FIELDSLIST,
    UPDATE_SYNTABLELIST,
    UPDATE_SYNFIELDLIST,
    SET_MODALKEY,
    UPDATA_IMPORTDATA,
    SET_IMPORTAPP,
    SHOW_MODALAPP,
    SET_UPLOADFILES,
    SHOW_FILTERCONDITION,
    SHOW_ALLCOLUMNS,
    SET_SHOWIMPORTCOLUMNS,
    UPDATE_CHECKHISTORY,
    SET_CONDITIONLIST,
    SET_CONDITIONDATA,
    UPDATE_UPLOADFILES,
    UPDATE_FILESUPLOAD,
    SET_IMPORTCHECK,
} from'./constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
    isRequesting: false,
    // 请求的应用系统list缓存
    appDataList : '',
    // 应用系统编辑模态框是否显示
    showEditApp: false,
    // 当前编辑app的属性缓存
    appAttr: '',
    // 请求数据源时，将appId和数据源类型缓存起来
    reqDataSrcAttr: '',
    // 数据源list
    dataSrcList: '',
    // 数据源attr
    dataSourceAttr: '',
    //表list
    tableList: '',
    //当前编辑的表的属性数据缓存
    tableAttr: '',
    //字段list数据缓存
    fieldList: '',
    //同步表list数据缓存
    synTableList: '',
    //导入实体数据列表
    importData: '',
    //实体列表每一行数据
    importApp: '',
    //显示隐藏对话框
    showApp: false,
    //上传文件
    uploadFiles: '',
    //筛选显示隐藏
    importFilterShow: false,
    //缓存可显示的列
    showImportColumns: '',
    //全选显示所有的列
    showAllImportColumns: true,
    //查看历史导入数据
    checkHistory : '',
    //更新导入数据查看
    importCheckData: '',
    //筛选条件
    importConditionList: '',
    //缓存当前编辑条件
    importConditionData: '',
    //更新上传后显示页面数据1
    uploadFilesData: '',
    //更新上传后显示页面数据2
    uploadDataFiles: '',
    //缓存上传返回数据
    diffData: ''

});

function integrationReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_APPLIST:
            return state
                .set('appDataList', action.value);
        case SHOW_APPCREATE:
            return state
                .set('showEditApp', action.value);
        case SET_MODALKEY:
            return state
                .set('modelKey', action.value);
        case SET_APPATTR:
            return state
                .set('appAttr', action.value);
        case SET_REQAPPDATA:
            return state
                .set('reqDataSrcAttr', action.value);
        case UPDATE_DATASRCLIST:
            return state
                .set('dataSrcList', action.value);
        case SET_DATASOURCEATTR:
            return state
                .set('dataSourceAttr', action.value);
        case UPDATE_TABLELIST:
            return state
                .set('tableList', action.value);
        case SET_TABLEATTR:
            return state
                .set('tableAttr', action.value);
        case UPDATE_FIELDSLIST:
            return state
                .set('fieldList', action.value);
        case UPDATE_SYNTABLELIST:
            return state
                .set('synTableList', action.value);
        case UPDATE_SYNFIELDLIST:
            return state
                .set('synFieldList', action.value);
        case UPDATA_IMPORTDATA:
            return state
                .set('importData', action.value);
        case SET_IMPORTAPP:
            return state
                .set('importApp', action.value);
        case SHOW_MODALAPP:
            return state
                .set('showApp', action.value);
        case SET_UPLOADFILES:
            return state
                .set('uploadFiles', action.value);
        case SHOW_FILTERCONDITION:
            return state
                .set('importFilterShow', action.value);
        case SET_SHOWIMPORTCOLUMNS:
            return state
                .set('showImportColumns', action.value);
        case SHOW_ALLCOLUMNS:
            return state
                .set('showAllImportColumns', action.value);
        case UPDATE_CHECKHISTORY:
            return state
                .set('checkHistory', action.value);
        case SET_CONDITIONLIST:
            return state
                .set('importConditionList', action.value);
        case SET_CONDITIONDATA:
            return state
                .set('importConditionData', action.value);
        case UPDATE_UPLOADFILES:
            return state
                .set('uploadFilesData', action.value);
        case UPDATE_FILESUPLOAD:
            return state
                .set('uploadDataFiles', action.value);
        case SET_IMPORTCHECK:
            return state
                .set('importCheckData', action.value);
        default:
            return state;
    }
}
export default integrationReducer;