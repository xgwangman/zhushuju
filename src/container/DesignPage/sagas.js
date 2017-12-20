import {take, call, put, select, fork, cancel} from 'redux-saga/effects';
import {REQUEST_DOMAINDATA, SAVE_DOMAIN,SEARCH_DOMAINDATA,SEARCH_ENTITYDATA,SEARCH_ATTRDATA} from './constants';
import {
    UpdateDomainData,
    showDomainCreate,
    onDeleteDomain,
    onExportDomain,
    onClickModelAction,
    updateEntityData,
    onSaveEntity,
    showEntityCreate,
    onDeleteEntity,
    onChangeStatus,
    onRequestAttrData,
    updateAttrList,
    onSaveAttribute,
    showAttrCreate,
    onDeleteAttr,
    requestAllModels,
    setAllModelsList,
    onSelectThisModel,
    setSelectedModelsEntity,
    onSelectThisEntity,
    setSelectedEntitysAttrs,
    onRequestAllVersion,
    updateVersionList,
    setAttributeData,
    requestMonitor,
    setMonitor,
    requestMonitorList,
    setMonitorList,
    requestSynch,
    requestCheck,
    setMonitorDataList
} from './actions';
import {selectDomainAttribute, selectEntityAttr, selectClickModel, selectAttributeData} from './selectors';
import request, {post, get} from '../../common/utils/request';
import {
    API_DOMAIN_LIST,
    API_DOMAIN_ADD,
    API_DOMAIN_DELETE,
    API_EXPORTMETADATA,
    API_MD_LIST,
    API_DOMAIN_UPDATE,
    API_ENTITY_ADD,
    API_ENTITY_UPDATE,
    API_ENTITY_DELETE,
    API_ENTITY_DISABLE,
    API_ENTITY_ENABLED,
    API_ATTRIBUTE_LIST,
    API_ATTRIBUTE_ADD,
    API_ATTRIBUTE_UPDATE,
    API_ATTRIBUTE_DELETE,
    API_MODEL_LIST,
    API_ALLVERSION_LIST
} from '../../API';
import {takeLatest, takeEvery} from 'redux-saga';
import alert from '../../common/utils/alert';

// 请求数据子集
export function* doRequestDomainData() {
    const requestURL = API_DOMAIN_LIST;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateDomainData(result.data.result));

    } else {
        alert(result.data.resultText, 'error');
    }
}
// 搜索数据子集
export function* doSearchDomainData(searchVal) {
    const requestURL = API_DOMAIN_LIST + '?nameLike='+searchVal;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode === 1) {
        yield put(UpdateDomainData(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
}
}
// 新增数据子集/修改数据子集
export function* doCreateDomain() {
    var requestURL;
    const domainAttr = yield select(selectDomainAttribute());
    if (domainAttr.id) {
        requestURL = API_DOMAIN_UPDATE;
    } else {
        requestURL = API_DOMAIN_ADD;
    }
    let result = yield call(post, {url: requestURL, data: domainAttr});
    if (result.data && result.data.resultCode == 1) {
        yield put(showDomainCreate(false));
        yield call(doRequestDomainData);
        yield alert(result.data.resultText,'success')
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 删除数据子集
export function* doDeleteDomain(action) {
    const requestURL = API_DOMAIN_DELETE;
    let result = yield call(post, {url: requestURL, data: {id: action.value}});
    if (result.data && result.data.resultCode == 1) {
        yield call(doRequestDomainData);
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 导出数据子集
export function* doExportDomain(action) {
    const requestURL = API_EXPORTMETADATA+'?id='+action.value;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode == 1) {
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText,'error');
    }
}
// 请求实体
export function* doRequestEntity(pagination) {
    const limit = pagination ? pagination.value.limit :15;
    const page = pagination ? pagination.value.page :1;
    const nameLike =pagination? pagination.value.nameLike:'';
    const modelId =pagination.value.modelId;
    const requestURL = API_MD_LIST + '?modelId=' + modelId +'&nameLike='+nameLike+'&limit='+ limit+'&page='+page;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode == 1) {
        let rspData={
            dataLists:result.data.result,
            modelId:modelId, //将模型Id缓存在实体list中
            totalProperty:result.data.totalProperty
        }
        yield put(updateEntityData(rspData));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//添加实体
export function* doCreateEntity() {
    var requestURL;
    const entityAttr = yield select(selectEntityAttr());
    const modelAttr = yield select(selectClickModel());
    entityAttr.modelId = modelAttr.id;
    if (entityAttr.id) {
        requestURL = API_ENTITY_UPDATE;
    } else {
        requestURL = API_ENTITY_ADD;
    }
    let result = yield call(post, {url: requestURL, data: entityAttr});
    if (result.data && result.data.resultCode == 1) {
        yield put(showEntityCreate(false));
        yield put(onClickModelAction({page:1,limit:15,nameLike:'',modelId:modelAttr.id}));
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 删除实体
export function* doDeleteEntity(action) {
    var requestURL = API_ENTITY_DELETE;
    let result = yield call(post, {url: requestURL, data: {id: action.value.entityId}});
    if (result.data && result.data.resultCode == 1) {
        yield put(onClickModelAction({page:1,limit:15,nameLike:'',modelId:action.value.modelId}));
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 切换实体是否可用
export function* doChangeEntityStatus(action) {
    var requestURL;
    if (action.value.status == true) {
        requestURL = API_ENTITY_ENABLED;
    } else if (action.value.status == false) {
        requestURL = API_ENTITY_DISABLE;
    }
    let result = yield call(post, {url: requestURL, data: {id: action.value.id}});
    if (result.data && result.data.resultCode == 1) {
        yield put(onClickModelAction({page:1,limit:15,nameLike:'',modelId:action.value.modelId}));
        alert(result.data.resultText, 'success');
    } else {
        yield put(onClickModelAction({page:1,limit:15,nameLike:'',modelId:action.value.modelId}));
        alert(result.data.resultText, 'error');
    }
}
// 请求实体的属性列表
export function* doRequestEntityAttrs(searchRequestData) {
    const limit = searchRequestData ? searchRequestData.value.limit :15;
    const page = searchRequestData ? searchRequestData.value.page :1;
    const value =searchRequestData? searchRequestData.value.nameLike:'';
    const entityId =searchRequestData.value.entityId;
    const requestURL = API_ATTRIBUTE_LIST + '?entityId=' +entityId +'&limit='+limit+'&page='+page+'&nameLike='+value;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode == 1) {
        let rspData={
            dataLists:result.data.result,
            totalProperty:result.data.totalProperty
        }
        yield put(updateAttrList(rspData));
    } else {
        alert(result.data.resultText, 'error');
    }
}

// 新增属性/修改属性
export function* doSaveAttrs(action) {
    let requestURL;
    let attributeAttr =action.value;
    const editor=yield select(selectAttributeData());
    if (editor.id==null) {
        requestURL = API_ATTRIBUTE_ADD;
    } else {
        requestURL = API_ATTRIBUTE_UPDATE;
        attributeAttr.id=editor.id;
    }
    let result = yield call(post, {url: requestURL, data: attributeAttr});
    if (result.data && result.data.resultCode == 1) {
        yield put(showAttrCreate(false));
        yield put(setAttributeData(""));
        yield put(onRequestAttrData({page:1,limit:15,nameLike:'',entityId:action.value.entityId}));
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 删除属性
export function* doDeleteAttrs(action) {
    var requestURL = API_ATTRIBUTE_DELETE;
    let result = yield call(post, {url: requestURL, data: {id: action.value.id}});
    if (result.data && result.data.resultCode == 1) {
        yield put(onRequestAttrData({page:1,limit:15,nameLike:'',entityId:action.value.entityId}));
        alert(result.data.resultText, 'success');
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求所有的models  + '?domainId=' +entityId +'&limit='+limit+'&page='+page+'&nameLike='+value;
export function* doRequestAllModels(action) {
    var requestURL = API_MODEL_LIST;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(setAllModelsList(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求entitys
export function* doRequestSelectEntitys(action) {
    const requestURL = API_MD_LIST + '?modelId=' + action.value;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(setSelectedModelsEntity(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求attrs
export function* doRequestSelectAttrs(action) {
    const requestURL = API_ATTRIBUTE_LIST + '?entityId=' + action.value;
    const result = yield call(get, requestURL);
    if (result.data && result.data.resultCode == 1) {
        yield put(setSelectedEntitysAttrs(result.data.result));
    } else {
        alert(result.data.resultText, 'error');
    }
}
// 请求实体的历史版本
export function* doRequestEntityVersions(action) {
    const requestURL = API_ALLVERSION_LIST + '?entityId=' + action.value.entityId+'&nameLike='+action.value.nameLike+'&page='+action.value.page+'&limit='+action.value.limit;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode == 1) {
        yield put(updateVersionList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//查看是否有变动数据(请求)
export function* doRequestMonitor(action) {
    const requestURL ='moni/entity/list.do';
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode == 1) {
        yield put(setMonitor(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求监控变动的数据
export function* doRequestMonitorList() {
    yield put(setMonitor());
    const requestURL ='moni/entity/list.do';
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode == 1) {
        yield put(setMonitorList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求同步
export function* doRequestSynch(action) {
    const requestURL ='moni/entity/sync.do';
    let result = yield call(post, {url: requestURL, data:{moniId: action.value.moniId,modelID:action.value.modelID}});
    if (result.data && result.data.resultCode == 1) {
        yield put(setMonitorList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}
//请求查看变动字段
export function* doRequestCheck(action) {
    const requestURL ='moni/atrr/list.do?entityId='+action.value.entityId;
    const result = yield call(request, requestURL, {
        method: "GET"
    });
    if (result.data && result.data.resultCode == 1) {
        yield put(setMonitorDataList(result.data));
    } else {
        alert(result.data.resultText, 'error');
    }
}



//====================================================================
//请求数据子集
export function* getDomainWatcher() {
    while (yield take(REQUEST_DOMAINDATA)) {
        yield call(doRequestDomainData);
    }
}
//搜索数据子集
export function* getSearchDomainWatcher() {
    while (true) {
        let {searchVal} = yield take(SEARCH_DOMAINDATA)
        yield call(doSearchDomainData,searchVal);
    }
}
//创建数据子集
export function* getCreateDomainWatcher() {
    while (yield take(SAVE_DOMAIN)) {
        yield call(doCreateDomain);
    }
}
//delete数据子集
export function* getDeleteDomainWatcher() {
    yield *takeLatest(onDeleteDomain().type, doDeleteDomain)
}
//export数据子集
export function* getExportDomainWatcher() {
    yield *takeLatest(onExportDomain().type, doExportDomain)
}
//请求实体
export function* getModelsEntityWatcher() {
    yield *takeLatest(onClickModelAction().type, doRequestEntity)
}
//创建实体
export function* getCreateEntityWatcher() {
    yield *takeLatest(onSaveEntity().type, doCreateEntity)
}
//删除实体
export function* getDeleteEntityWatcher() {
    yield *takeLatest(onDeleteEntity().type, doDeleteEntity)
}
//切换实体是否启用
export function* getEntityStatusWatcher() {
    yield *takeEvery(onChangeStatus().type, doChangeEntityStatus)
}
//请求实体的属性列表
export function* getEntityAttrWatcher() {
    yield *takeLatest(onRequestAttrData().type, doRequestEntityAttrs)
}

//保存属性
export function* getCreateAttrWatcher() {
    yield *takeLatest(onSaveAttribute().type, doSaveAttrs)
}
//删除属性
export function* getDeleteAttrWatcher() {
    yield *takeLatest(onDeleteAttr().type, doDeleteAttrs)
}
//请求所有的models
export function* getAllModelsWatcher() {
    yield *takeLatest(requestAllModels().type, doRequestAllModels)
}
//下拉框中选中模型后，请求该模型下的所有实体
export function* getSelectedModelsEntityWatcher() {
    yield *takeLatest(onSelectThisModel().type, doRequestSelectEntitys)
}
//下拉框中选中实体后，请求该模型下的所有属性
export function* getSelectedEntitysAttrsWatcher() {
    yield *takeLatest(onSelectThisEntity().type, doRequestSelectAttrs)
}
// 请求实体的历史版本
export function* getEntityVersionsWatcher() {
    yield *takeLatest(onRequestAllVersion().type, doRequestEntityVersions)
}
//查看是否有变动数据(请求)
export function* getRequestMonitorWatcher() {
    yield *takeLatest(requestMonitor().type, doRequestMonitor)
}
//请求监控变动的数据
export function* getRequestMonitorList() {
    yield *takeLatest(requestMonitorList().type, doRequestMonitorList)
}
//请求同步
export function* getRequestSynch() {
    yield *takeLatest(requestSynch().type, doRequestSynch)
}
//请求查看变动字段
export function* getRequestCheck() {
    yield *takeLatest(requestCheck().type, doRequestCheck)
}


/**
 * *****************************************************************
 * Root saga manages watcher lifecycle
 */
export default function* entry() {
    const watcher = yield fork(getDomainWatcher);
    const Createwatcher = yield fork(getCreateDomainWatcher);
    const Deletewatcher = yield fork(getDeleteDomainWatcher);
    const Exportwatcher = yield fork(getExportDomainWatcher);
    const Modelwatcher = yield fork(getModelsEntityWatcher);
    const CreateEntitywatcher = yield fork(getCreateEntityWatcher);
    const DeleteEntitywatcher = yield fork(getDeleteEntityWatcher);
    const EntityStatuswatcher = yield fork(getEntityStatusWatcher);
    const EntityAttrwatcher = yield fork(getEntityAttrWatcher);
    const CreateAttrwatcher = yield fork(getCreateAttrWatcher);
    const DeleteAttrwatcher = yield fork(getDeleteAttrWatcher);
    const RequestAllModelwatcher = yield fork(getAllModelsWatcher);
    const selectModelWatcher = yield fork(getSelectedModelsEntityWatcher);
    const selectEntityWatcher = yield fork(getSelectedEntitysAttrsWatcher);
    const entityVersionsWatcher = yield fork(getEntityVersionsWatcher);
    const searchDomainWatcher = yield fork(getSearchDomainWatcher);
    const requestMonitorWatcher=yield fork(getRequestMonitorWatcher);
    const requestMonitorList=yield fork(getRequestMonitorList);
    const requestSynch=yield fork(getRequestSynch);
    const requestCheck=yield fork(getRequestCheck);
}