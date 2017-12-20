import {createSelector} from 'reselect';

const selectIntegration = () => (state) => state.get('integration');

const selectAppDataList = () => createSelector(
    selectIntegration(),
    (state) => state.get('appDataList')
);
const selectShowAppEdit = () => createSelector(
    selectIntegration(),
    (state) => state.get('showEditApp')
);
const selectAppAttr = () => createSelector(
    selectIntegration(),
    (state) => state.get('appAttr')
);
const selectReqDataSrc = () => createSelector(
    selectIntegration(),
    (state) => state.get('reqDataSrcAttr')
);
const selectDataSrcList = () => createSelector(
    selectIntegration(),
    (state) => state.get('dataSrcList')
);
const selectDataSourceAttr = () => createSelector(
    selectIntegration(),
    (state) => state.get('dataSourceAttr')
);
const selectTableList = () => createSelector(
    selectIntegration(),
    (state) => state.get('tableList')
);
const selectTableAttr = () => createSelector(
    selectIntegration(),
    (state) => state.get('tableAttr')
);
const selectFieldList = () => createSelector(
    selectIntegration(),
    (state) => state.get('fieldList')
);
const selectSynTableList = () => createSelector(
    selectIntegration(),
    (state) => state.get('synTableList')
);
const selectSynFieldList = () => createSelector(
    selectIntegration(),
    (state) => state.get('synFieldList')
);
const selectModelKey = () => createSelector(
    selectIntegration(),
    (state) => state.get('modelKey')
);
const selectImportEntityData = () => createSelector(
    selectIntegration(),
    (state) => state.get('importData')
);
const selectImportAppData = () => createSelector(
    selectIntegration(),
    (state) => state.get('importApp')
);
const selectShowModalApp = () => createSelector(
    selectIntegration(),
    (state) => state.get('showApp')
);
const selectUploadFiles = () => createSelector(
    selectIntegration(),
    (state) => state.get('uploadFiles')
);
const selectImportFilterViewStatus = () => createSelector(
    selectIntegration(),
    (state) => state.get('importFilterShow')
);
const selectShowImportColumns = () => createSelector(
    selectIntegration(),
    (state) => state.get('showImportColumns')
);
const selectShowAllImportColumns = () => createSelector(
    selectIntegration(),
    (state) => state.get('showAllImportColumns')
);
const selectCheckHistoryData = () => createSelector(
    selectIntegration(),
    (state) => state.get('checkHistory')
);
const selectImportConditionList = () => createSelector(
    selectIntegration(),
    (state) => state.get('importConditionList')
);
const selectImoprtConditionData = () => createSelector(
    selectIntegration(),
    (state) => state.get('importConditionData')
);
const selectUploadImportFiles = () => createSelector(
    selectIntegration(),
    (state) => state.get('uploadFilesData')
);
const selectUploadImportData = () => createSelector(
    selectIntegration(),
    (state) => state.get('uploadDataFiles')
);
const selectImportCheckData = () => createSelector(
    selectIntegration(),
    (state) => state.get('importCheckData')
);

export {
    selectAppDataList,
    selectShowAppEdit,
    selectAppAttr,
    selectReqDataSrc,
    selectDataSrcList,
    selectDataSourceAttr,
    selectTableList,
    selectTableAttr,
    selectFieldList,
    selectSynTableList,
    selectSynFieldList,
    selectModelKey,
    selectImportEntityData,
    selectImportAppData,
    selectShowModalApp,
    selectUploadFiles,
    selectImportFilterViewStatus,
    selectShowImportColumns,
    selectShowAllImportColumns,
    selectCheckHistoryData,
    selectImportCheckData,
    selectImportConditionList,
    selectImoprtConditionData,
    selectUploadImportFiles,
    selectUploadImportData,

};