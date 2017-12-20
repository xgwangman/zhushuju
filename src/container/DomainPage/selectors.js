import {createSelector} from 'reselect';
const selectDomain = () => (state) => state.get('domain');

// domain
const selectDomainDataList = () => createSelector(
    selectDomain(),
    (state) => state.get('domainDataList')
);
const selectDomainData = () => createSelector(
    selectDomain(),
    (state) => state.get('domainAttr')
);
// model
const selectModelData = () => createSelector(
    selectDomain(),
    (state) => state.get('modelAttr')
);
// entity
const selectEntityList = () => createSelector(
    selectDomain(),
    (state) => state.get('entityList')
);
const selectEntityData = () => createSelector(
    selectDomain(),
    (state) => state.get('entityData')
);
const selectAttrList = () => createSelector(
    selectDomain(),
    (state) => state.get('attrList')
);
const selectEntityDataList = () => createSelector(
    selectDomain(),
    (state) => state.get('entityDataList')
);
const selectFilterViewStatus = () => createSelector(
    selectDomain(),
    (state) => state.get('filterShow')
);
const selectConditionData = () => createSelector(
    selectDomain(),
    (state) => state.get('conditionData')
);
const selectConditionList = () => createSelector(
    selectDomain(),
    (state) => state.get('conditionList')
);
const selectFilterDataList = () => createSelector(
    selectDomain(),
    (state) => state.get('filterDataList')
);
const selectShowColumns = () => createSelector(
    selectDomain(),
    (state) => state.get('showColumns')
);
const selectShowAllColumns = () => createSelector(
    selectDomain(),
    (state) => state.get('showAllColumns')
);
const selectShowAddVersion = () => createSelector(
    selectDomain(),
    (state) => state.get('showAddVersion')
);
const selectVersionData = () => createSelector(
    selectDomain(),
    (state) => state.get('versionData')
);
const selectModalKey = () => createSelector(
    selectDomain(),
    (state) => state.get('modalKey')
);
const selectVersionList = () => createSelector(
    selectDomain(),
    (state) => state.get('versionList')
);
const selectDataType = () => createSelector(
    selectDomain(),
    (state) => state.get('dataType')
);
const selectAuditShowStatus = () => createSelector(
    selectDomain(),
    (state) => state.get('auditShow')
);
const selectAuditDataList = () => createSelector(
    selectDomain(),
    (state) => state.get('auditDataList')
);
const selectEntityTaskList = () => createSelector(
    selectDomain(),
    (state) => state.get('entityTaskList')
);
const selectEntityTaskAttr = () => createSelector(
    selectDomain(),
    (state) => state.get('taskAttr')
);
const selectUPDrcList = () => createSelector(
    selectDomain(),
    (state) => state.get('upDataSrcList')
);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^
//某一版本的标示 id
const selectCheckVersion = () => createSelector(
    selectDomain(),
    (state) => state.get('id')
);
//更新版本的数据
const selectUpdateVersionDataList = () => createSelector(
    selectDomain(),
    (state) => state.get('versionData')
);
//更新版本的属性
const selectUpdateVersionAttrList = () => createSelector(
    selectDomain(),
    (state) => state.get('versionAttrList')
);
//
const selectGetName = () => createSelector(
    selectDomain(),
    (state) => state.get('name')
);
const selectEntityTaskType = () => createSelector(
    selectDomain(),
    (state) => state.get('taskType')
);
/*获取组件的编辑窗口的状态*/
const selectEditWindowState = (window)=>createSelector(
    selectDomain(),
    (state)=>state.get(window)
);
/*获取任务的编排组件及流程*/
const selectTaskFlow = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('taskFlow')
);
/*获取表list*/
const selectTableList = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('tableList')
);
/*获取字段list*/
const selectFieldList = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('fieldList')
);
/*获取当前编辑的组件数据*/
const selectComponentData = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('componentData')
);
/*获取当前编辑的组件数据*/
const selectFlowFields = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('flowFields')
);

/*任务执行日志查看的组件数据*/
const selectTaskExecuteDataList = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('taskExecuteDataList')
);
/*获取当前组建的taskName*/
const selectTaskName = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('setTaskName')
);

/*获取SQLFieldlist*/
const selectSQLFieldlist = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('sqlTfieldList')
);
/*获取SimpleTableList*/
const selectSimpleTableFieldList = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('STfieldList')
);
/*获取实体基本属性*/
const selectEntityBaseAttrList = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('entityBaseAttrList')
);
//uc矩阵请求到的结果
const selectUcDataList = ()=>createSelector(
    selectDomain(),
    (state)=>state.get('ucDataList')
);


export {
    selectDomainDataList,
    selectDomainData,
    selectModelData,
    selectEntityList,
    selectEntityData,
    selectAttrList,
    selectEntityDataList,
    selectFilterViewStatus,
    selectConditionData,
    selectConditionList,
    selectShowColumns,
    selectShowAllColumns,
    selectShowAddVersion,
    selectVersionData,
    selectModalKey,
    selectVersionList,
    selectDataType,
    selectAuditShowStatus,
    selectAuditDataList,
    selectEntityTaskList,
    selectEntityTaskAttr,
    selectUPDrcList,
    //^^^^^^^^^^^
    selectCheckVersion,
    selectUpdateVersionDataList,
    selectUpdateVersionAttrList,
    selectGetName,
    selectEntityTaskType,
    selectEditWindowState,
    selectTaskFlow, selectTableList, selectFieldList, selectComponentData, selectFlowFields,
    selectTaskExecuteDataList,selectTaskName,selectSQLFieldlist,selectSimpleTableFieldList,
    selectFilterDataList,selectEntityBaseAttrList,selectUcDataList
};