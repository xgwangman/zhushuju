import {createSelector} from 'reselect';

const selectDomain = () => (state) => state.get('design');

const selectDomainDataList = () => createSelector(
    selectDomain(),
    (state) => state.get('domainDataList')
);
const selectError = () => createSelector(
    selectDomain(),
    (state) => state.get('error')
);
const selectShowEditDomain = () => createSelector(
    selectDomain(),
    (state) => state.get('showEditDomain')
);
const selectDomainAttribute = () => createSelector(
    selectDomain(),
    (state) => state.get('domainAttribute')
);
const selectModelName = () => createSelector(
    selectDomain(),
    (state) => state.get('modelName')
);
const selectEntityList = () => createSelector(
    selectDomain(),
    (state) => state.get('entityDataList')
);
const selectShowEntityModal = () => createSelector(
    selectDomain(),
    (state) => state.get('showEditEntity')
);
const selectEntityName = () => createSelector(
    selectDomain(),
    (state) => state.get('entityName')
);
const selectEntityDesc = () => createSelector(
    selectDomain(),
    (state) => state.get('entityDesc')
);
const selectEntityAttr = () => createSelector(
    selectDomain(),
    (state) => state.get('entityAttr')
);
const selectClickModel = () => createSelector(
    selectDomain(),
    (state) => state.get('modelAttr')
);
const selectShowAttrModal = () => createSelector(
    selectDomain(),
    (state) => state.get('showEditAttr')
);
const selectAttrList = () => createSelector(
    selectDomain(),
    (state) => state.get('entityAttrList')
);
const selectAttributeData = () => createSelector(
    selectDomain(),
    (state) => state.get('attributeData')
);
const selectAllModelList = () => createSelector(
    selectDomain(),
    (state) => state.get('modelDataList')
);
const selectSelectedEntity = () => createSelector(
    selectDomain(),
    (state) => state.get('selectedEntityList')
);
const selectSelectedAttrs = () => createSelector(
    selectDomain(),
    (state) => state.get('selectedAttrsList')
);
const selectEntityVersionList = () => createSelector(
    selectDomain(),
    (state) => state.get('entityVersionList')
);
//数据子集编辑的标记
const selectDomainEdtiorSign = () => createSelector(
    selectDomain(),
    (state) => state.get('domainSign')
);
//查看是否有变动数据(结果)
const selectSetMonitor = () => createSelector(
    selectDomain(),
    (state) => state.get('isMonitor')
);
//请求监控变动的数据(结果)
const selectSetMonitorList = () => createSelector(
    selectDomain(),
    (state) => state.get('monitorList')
);
//变动字段数据
const selectSetMonitorDataList = () => createSelector(
    selectDomain(),
    (state) => state.get('monitorDataList')
);

/*----------------------------------*/
export {
    selectDomainDataList,
    selectError,
    selectShowEditDomain,
    selectDomainAttribute,
    selectModelName,
    selectEntityList,
    selectShowEntityModal,
    selectEntityName,
    selectEntityDesc,
    selectEntityAttr,
    selectClickModel,
    selectAttrList,
    selectShowAttrModal,
    selectAttributeData,
    selectAllModelList,
    selectSelectedEntity,
    selectSelectedAttrs,
    selectEntityVersionList,
    selectDomainEdtiorSign,
    selectSetMonitor,
    selectSetMonitorList,
    selectSetMonitorDataList,
};