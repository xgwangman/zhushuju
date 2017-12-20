import {
    REQUEST_APPDATA,
    UPDATE_APPLIST,
    REQUEST_SYNTABLESEARCH,
    REQUEST_APPSEARCH,
    SHOW_APPCREATE,
    SET_APPATTR,
    SAVE_APP,
    ON_DELETEAPP,
    SET_REQAPPDATA,
    REQUEST_DATASRC,
    REQUEST_DATASEARCH,
    UPDATE_DATASRCLIST,
    SET_DATASOURCEATTR,
    SAVE_DATASOURCE,
    TEST_CONNECTION,
    DELETE_DATASOURCE,
    REQUEST_TABLELIST,
    UPDATE_TABLELIST,
    REQUEST_PAGE,
    REQUEST_TABLESEARCH,
    CHANGE_TABLESTATUS,
    SET_TABLEATTR,
    UPDATE_FIELDSLIST,
    REQUEST_FIELDLIST,
    REQUEST_SYNTABLELIST,
    UPDATE_SYNTABLELIST,
    REQUEST_SYNFIELDLIST,
    UPDATE_SYNFIELDLIST,
    REQUEST_FIELDSEARCH,
    SYN_TABLESACTION,
    SYN_FIELDSACTION,
    SET_MODALKEY,
    SET_REQIMPORTDATA,
    UPDATA_IMPORTDATA,
    SET_IMPORTSEARCH,
    SET_IMPORTAPP,
    SHOW_MODALAPP,
    SET_UPLOADFILES,
    UPDATE_UPLOADFILES,
    SHOW_FILTERCONDITION,
    SET_SHOWIMPORTCOLUMNS,
    SHOW_ALLCOLUMNS,
    SET_CONFIRMIMPORT,
    SET_CANCELIMPORT,
    SET_CHECKHISTORY,
    UPDATE_CHECKHISTORY,
    SET_CLAERIMPORT,
    SET_IMPORTCHECK,
    SET_CHECKSEARCH,
    SET_CONDITIONLIST,
    FILTER_IMPORTDATA,
    SET_CONDITIONDATA,
    SET_UPLOADPAGE,
    UPDATE_FILESUPLOAD,
}from'./constants'
export function requestAppData(request) {
    return {
        type: REQUEST_APPDATA,
        value: request,
    };
}
export function requestAppSearch(nameLike) {  //搜索框
    return {
        type: REQUEST_APPSEARCH,
        value: nameLike,
    };
}
export function updateAppList(appList) {
    return {
        type: UPDATE_APPLIST,
        value: appList,
    };
}
export function showAppCreate(show) {
    return {
        type: SHOW_APPCREATE,
        value: show,
    };
}
export function setAppAttr(appAttr) {
    return {
        type: SET_APPATTR,
        value: appAttr,
    };
}
export function onSaveApp(save) {
    return {
        type: SAVE_APP,
        value: save,
    };
}
export function onDeleteApp(appId) {
    return {
        type: ON_DELETEAPP,
        value: appId,
    };
}
export function setModalKey(key) {
    return {
        type: SET_MODALKEY,
        value: key,
    };
}
//=================gatherDataSrcPage.js=====================
export function setReqAppData(app) {
    return {
        type: SET_REQAPPDATA,
        value: app,
    };
}
export function onRequestDataSrc(request) {
    return {
        type: REQUEST_DATASRC,
        value: request,
    };
}
export function onRequestDataSearch(nameLike) {
    return {
        type: REQUEST_DATASEARCH,
        value: nameLike,
    };
}
export function updateDataSrcList(dataSrcList) {
    return {
        type: UPDATE_DATASRCLIST,
        value: dataSrcList,
    };
}
export function setDataSourceAttr(dataSource) {
    return {
        type: SET_DATASOURCEATTR,
        value: dataSource,
    };
}
export function onDeleteDataSource(id) {
    return {
        type: DELETE_DATASOURCE,
        value: id,
    };
}
//=================addDataSrcPage.js=====================
export function onSaveDataSource(save) {
    return {
        type: SAVE_DATASOURCE,
        value: save,
    };
}
export function onTestConnection(test) {
    return {
        type: TEST_CONNECTION,
        value: test,
    };
}
//=================TableListPage.js=====================
export function onRequestTableList(request) {
    return {
        type: REQUEST_TABLELIST,
        value: request,
    };
}
export function updateTableList(tableList) {
    return {
        type: UPDATE_TABLELIST,
        value: tableList,
    };
}
export function requestTablePage(page) {
    return {
        type: REQUEST_PAGE,
        value: page,
    };
}
export function requestTableSearch(search) {
    return {
        type: REQUEST_TABLESEARCH,
        value: search,
    };
}
export function onChangeTableStatus(status) {
    return {
        type: CHANGE_TABLESTATUS,
        value: status,
    };
}
export function setTableAttr(table) {
    return {
        type: SET_TABLEATTR,
        value: table,
    };
}
//=================attrListPage.js=====================
export function onRequestFieldList(request) {
    return {
        type: REQUEST_FIELDLIST,
        value: request,
    };
}
export function updateFieldsList(fields) {
    return {
        type: UPDATE_FIELDSLIST,
        value: fields,
    };
}
//=================synTableListPage.js=====================
export function onRequestSynTableList(request) {
    return {
        type: REQUEST_SYNTABLELIST,
        value: request,
    };
}
export function updateSynTableList(synTableList) {
    return {
        type: UPDATE_SYNTABLELIST,
        value: synTableList,
    };
}
export function onRequestSynTableSearch(nameLike) {
    return {
        type: REQUEST_SYNTABLESEARCH,
        value: nameLike,
    };
}
export function synTablesAction(syn) {
    return {
        type: SYN_TABLESACTION,
        value: syn,
    };
}
//=================synFieldListPage.js=====================
export function onRequestSynFieldList(request) {
    return {
        type: REQUEST_SYNFIELDLIST,
        value: request,
    };
}
export function updateSynFieldsList(synFieldList) {
    return {
        type: UPDATE_SYNFIELDLIST,
        value: synFieldList,
    };
}
export function requestSynFieldSearch(search) {
    return {
        type: REQUEST_FIELDSEARCH,
        value: search,
    };
}
export function synFieldsAction(syn) {
    return {
        type: SYN_FIELDSACTION,
        value: syn,
    };
}
//获取实体导入数据列表
export function setReqImportData(req) {
    return {
        type: SET_REQIMPORTDATA,
        value: req
    }
}
//更新实体导入数据列表
export function updateImportData(list) {
    return {
        type: UPDATA_IMPORTDATA,
        value: list
    }
}
//获取实体导入数据搜索框
export function setReqImportSearch(search) {
    return {
        type: SET_IMPORTSEARCH,
        value: search
    }
}
//缓存导入实体列表每一行的数据
export function setImportApp(app) {
    return {
        type: SET_IMPORTAPP,
        value: app
    }
}
//显示隐藏对话框
export function showModelApp(show) {
    return {
        type: SHOW_MODALAPP,
        value: show
    }
}
//获取上传文件数据
export function setUploadFiles(file) {
    return {
        type: SET_UPLOADFILES,
        value: file
    }
}
//更新上传文件列表1
export function updateUploadFiles(list) {
    return {
        type: UPDATE_UPLOADFILES,
        value: list
    }
}
//更新上传文件列表2
export function updateFilesUpload(lis) {
    return {
        type: UPDATE_FILESUPLOAD,
        value: lis
    }
}
//获取上传页面分页数据
export function setUploadPage(file) {
    return {
        type: SET_UPLOADPAGE,
        value: file
    }
}
//缓存显示隐藏筛选条件数据
export function showImportFilterCondition(show) {
    return {
        type: SHOW_FILTERCONDITION,
        value: show,
    };
}
//显示所有的列
export function showAllImportColumns(show) {
    return {
        type: SHOW_ALLCOLUMNS,
        value: show,
    };
}
//缓存可显示的列
export function setShowImportColumns(filter) {
    return {
        type: SET_SHOWIMPORTCOLUMNS,
        value: filter,
    };
}
//确定导入的数据
export function setConfirmImport(data) {
    return {
        type: SET_CONFIRMIMPORT,
        value: data
    }
}
//取消导入的数据
export function setCancelImport(list) {
    return {
        type: SET_CANCELIMPORT,
        value: list
    }
}
//缓存查看历史导入数据
export function setCheckHistory(request) {
    return {
        type: SET_CHECKHISTORY,
        value: request
    }
}
//更新历史导入数据
export function updateCheckHistory(data) {
    return {
        type: UPDATE_CHECKHISTORY,
        value: data
    }
}
//历史导入数据查看搜索
export function setCheckHistorySearch(search) {
    return {
        type: SET_CHECKSEARCH,
        value: search
    }
}
//清除导入数据
export function setClearImport(request) {
    return {
        type: SET_CLAERIMPORT,
        value: request
    }
}
//导入数据查看
export function setImportCheck(check) {
    return {
        type: SET_IMPORTCHECK,
        value: check
    }
}
//缓存list
export function setImportConditionList(list) {
    return {
        type: SET_CONDITIONLIST,
        value: list,
    };
}
//缓存版本条件数据
export function setImportConditionData(data) {
    return {
        type: SET_CONDITIONDATA,
        value: data,
    };
}
export function filterImportData(filter) {
    return {
        type: FILTER_IMPORTDATA,
        value: filter,
    };
}