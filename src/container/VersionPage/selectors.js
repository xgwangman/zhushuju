/**
 * Created by Administrator on 2017/6/27.
 */
import {createSelector} from 'reselect';
const selectVersion = () => (state) => state.get('version');
//index中table的数据
const selectVersionDataList = () => createSelector(
    selectVersion(),
    (state) => state.get('versionDataList')
);
const selectVersionName = () => createSelector(
    selectVersion(),
    (state) => state.get('setVersionName')
);
const selectVersionTitle = () => createSelector(
    selectVersion(),
    (state) => state.get('getVersionTitle')
);
const selectVersionCheckPage = () => createSelector(
    selectVersion(),
    (state) => state.get('getVersionCheckPage')
);
const selectFilterCondtions = () => createSelector(
    selectVersion(),
    (state) => state.get('filterContions')
);
//版本管理index页面的查询的条件值
const selectOnSearchVersionData= ()=>createSelector(
    selectVersion(),
    (state)=>state.get('versionData')
);
//全选
const selectShowAllVersionColumns = () => createSelector(
    selectVersion(),
    (state) => state.get('showAllVersionColumns')
);
const selectSetShowColumns= ()=>createSelector(
    selectVersion(),
    (state)=>state.get('setShowColumns')
);
const selectShowVersionColumns = () => createSelector(
    selectVersion(),
    (state) => state.get('showVersionColumns')
);
const selectVersionFilterViewStatus = () => createSelector(
    selectVersion(),
    (state) => state.get('versionFilterShow')
);
const selectVersionConditionData = () => createSelector(
    selectVersion(),
    (state) => state.get('versionConditionData')
);
const selectVersionConditionList = () => createSelector(
    selectVersion(),
    (state) => state.get('versionConditionList')
);

export {
    selectVersionDataList,
    selectVersionName,
    selectVersionCheckPage,
    selectVersionTitle,
    selectFilterCondtions,
    selectOnSearchVersionData,
    selectShowAllVersionColumns,
    selectSetShowColumns,
    selectShowVersionColumns,
    selectVersionFilterViewStatus,
    selectVersionConditionData,
    selectVersionConditionList
}