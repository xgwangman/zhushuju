/**
 * Created by Administrator on 2017/6/27.
 */
import {
    REQUEST_VERSIONMAINPAGE,
    UPDATA_VERSIONMAINPAGE,
    SET_VERSIONNAME,
    GET_VERSIONTITLE,
    GET_VERSIONCHECKPAGE,
    REQUEST_VERSIONTITLE,
    REQUEST_VERSIONCHECKPAGE,
    GET_FILTERCONDTION,
    VERSION_DATA,
    SEARCH_VERSION,
    SHOW_ALLCOLUMNS,
    SET_SHOWCOLUMNS,
    SHOW_FILTERCONDITION,
    SET_CONDITIONDATA,
    SET_CONDITIONLIST,
    FILTER_VERSIONDATA
} from './constants'

//请求index中table的数据
export function requestVersionAllData(request) {
    return {
        type:REQUEST_VERSIONMAINPAGE,
        value:request
    }
}
//获取index中table的数据
export function updataVersionAllData(dataList) {
    return {
        type:UPDATA_VERSIONMAINPAGE,
        value:dataList
    }
}
export function setVersionName(versionName) {
    return {
        type:SET_VERSIONNAME,
        value:versionName
    }
}
export function requestVersionTitle(versionId) {
    return {
        type:REQUEST_VERSIONTITLE,
        value:versionId
    }
}
export function getVersionTitle(versionTitle) {
    return {
        type:GET_VERSIONTITLE,
        value:versionTitle
    }
}
export function requestVersionCheckPage(request) {
    return {
        type:REQUEST_VERSIONCHECKPAGE,
        value:request
    }
}
export function getVersionNamePage(pageList) {
    return {
        type:GET_VERSIONCHECKPAGE,
        value:pageList
    }
}
export function getFilterCondtion(filterList) {
    return {
        type:GET_FILTERCONDTION,
        value:filterList
    }
}
//版本管理index页面的查询请求
export function onSearchVersion(pageData) {
    return {
        type:SEARCH_VERSION,
        value:pageData
    }
}
//版本管理index页面的查询的条件值
export function onSearchVersionData(versionData) {
    return {
        type:VERSION_DATA,
        value:versionData
    }
}
//缓存全选实现后可显示的列
export function showAllVersionColumns(show) {
    return {
        type: SHOW_ALLCOLUMNS,
        value: show,
    };
}
export function setShowVersionColumns(filter) {
    return {
        type: SET_SHOWCOLUMNS,
        value: filter,
    };
}
//缓存显示隐藏筛选条件数据
export function showVersionFilterCondition(show) {
    return {
        type: SHOW_FILTERCONDITION,
        value: show,
    };
}
//缓存版本条件数据
export function setVersionConditionData(data) {
    return {
        type: SET_CONDITIONDATA,
        value: data,
    };
}
//缓存list
export function setVersionConditionList(list) {
    return {
        type: SET_CONDITIONLIST,
        value: list,
    };
}
export function filterVersionData(filter) {
    return {
        type: FILTER_VERSIONDATA,
        value: filter,
    };
}






















