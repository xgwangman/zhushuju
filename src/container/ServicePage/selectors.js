import {createSelector} from 'reselect';

const selectService = () => (state) => state.get('service');

// domain
const selectDomainServiceList = () => createSelector(
    selectService(),
    (state) => state.get('domainServiceList')
);
// domain base j
const selectBaseDomainServiceList = () => createSelector(
    selectService(),
    (state) => state.get('domainBaseList')
);
// model
const selectModelServiceList = () => createSelector(
    selectService(),
    (state) => state.get('modelServiceList')
);
// entity
const selectEntityServiceList = () => createSelector(
    selectService(),
    (state) => state.get('entityServiceList')
);
// table
const selectTableServiceData = () => createSelector(
    selectService(),
    (state) => state.get('tableServiceData')
);
// getTaskFlow
const getTaskFlow = () => createSelector(
    selectService(),
    (state) => state.get('taskEditFlow')
);
// 编排
const getSelectTaskFlow = () => createSelector(
    selectService(),
    (state) => state.get('taskFlow')
);
// taskList
const getTaskList = () => createSelector(
    selectService(),
    (state) => state.get('taskList')
);
// userList
const getUserList = () => createSelector(
    selectService(),
    (state) => state.get('userList')
);
// shareLogList
const getShareLogList = () => createSelector(
    selectService(),
    (state) => state.get('shareLogList')
);
// wsList
const getWsList = () => createSelector(
    selectService(),
    (state) => state.get('wsList')
);
// wsDetail
const getWsDetail = () => createSelector(
    selectService(),
    (state) => state.get('wsDetail')
);
// wsLogList
const getWsLogList = () => createSelector(
    selectService(),
    (state) => state.get('wsLogList')
);
// taskOutputList
const getTaskOutputList = () => createSelector(
    selectService(),
    (state) => state.get('taskOutputList')
);
const entityFieldShareWin = (value) => createSelector(
    selectService(),
    (state) => state.get(value)
);
const getCacheFigureData = (value) => createSelector(
    selectService(),
    (state) => state.get("cacheCurrentFigureData")
);
const getFlowFieldData = (value) => createSelector(
    selectService(),
    (state) => state.get("flowFieldData")
);
const getTestParamsData = (value) => createSelector(
    selectService(),
    (state) => state.get("testParams")
);
const getTestResultData = (value) => createSelector(
    selectService(),
    (state) => state.get("testResult")
);
const closeShareWin = (value) => createSelector(
    selectService(),
    (state) => state.get(value)
);
//条件筛选
const selectShowCondition = () => createSelector(
    selectService(),
    (state) => state.get('showCondition')
);
//请求共享管理数据(结果)
const selectShareListData = () => createSelector(
    selectService(),
    (state) => state.get('shareDataList')
);
const selectConditionData = () => createSelector(
    selectService(),
    (state) => state.get('shareConditionData')
);
const selectConditionList = () => createSelector(
    selectService(),
    (state) => state.get('shareConditionList')
);
const selectShowAllColumns = () => createSelector(
    selectService(),
    (state) => state.get('showAllColumns')
);
const selectShowColumns = () => createSelector(
    selectService(),
    (state) => state.get('showColumns')
);

export {
    selectDomainServiceList,entityFieldShareWin,closeShareWin,selectModelServiceList,
    selectEntityServiceList,selectTableServiceData,getCacheFigureData,getFlowFieldData,
    selectBaseDomainServiceList,getTaskFlow,getTaskList,getUserList,getTaskOutputList,
    getShareLogList,getWsList,getWsLogList,getWsDetail,getTestParamsData,getTestResultData,
    getSelectTaskFlow,selectShowCondition,selectShareListData,selectConditionData,selectConditionList,
    selectShowAllColumns,selectShowColumns
};