/**
 * Created by Administrator on 2017/5/18.
 */
//quality
import {createSelector} from 'reselect';

/**
 * *****************************************************************
 */
const selectQuality = () => (state) => state.get('quality');
//更新数据子集质量数据
const selectqualityDataList = () => createSelector(
    selectQuality(),
    (state) => state.get('qualityDataList')
);
//更新质量报告数据
const selectUpdateQualityReport=()=>createSelector(
    selectQuality(),
    (state)=>state.get('qualityReportList')
);
//修改执行计划
const selectModifyExecutePlan = () =>createSelector(
    selectQuality(),
    (state)=>state.get('modifyPlan')
)
const selectShowExecutePlan = () => createSelector(
    selectQuality(),
    (state) => state.get('showExecute')
);
const selectModifyPlanAttr = () => createSelector(
    selectQuality(),
    (state) => state.get('modifyPlanAttr')
);
const selectReqDataSrc = () => createSelector(
    selectQuality(),
    (state) => state.get('reqDataSrcAttr')
);
const selectShowModifyEdit = () => createSelector(
    selectQuality(),
    (state) => state.get('showEditModify')
);
const selectQualityReqData = () => createSelector(
    selectQuality(),
    (state) => state.get('qualityReqData')
);
const selectWatcherTimeData = () => createSelector(
    selectQuality(),
    (state) => state.get('recentWatcherData')
);
const selectRecentWatcherTime = () => createSelector(
    selectQuality(),
    (state) => state.get('recentWatcherTime')
);
const selectMonitorTableData = () =>createSelector(
    selectQuality(),
    (state) => state.get('monitorTableData')
);
const selectMasterChangeData = () =>createSelector(
    selectQuality(),
    (state) => state.get('masterChangeData')
);
const selectEntityClassesData = () =>createSelector(
    selectQuality(),
    (state) => state.get('entityDataClasses')
);
const selectEntityTableData = () =>createSelector(
    selectQuality(),
    (state) => state.get('entityDataTable')
);
const selectEntityDataChange = () =>createSelector(
    selectQuality(),
    (state) => state.get('entityChange')
);
const selectQualityEntityTable = () =>createSelector(
    selectQuality(),
    (state) => state.get('qualityEntityTable')
)
const selectEntityTrendChange = () =>createSelector(
    selectQuality(),
    (state) => state.get('entityTrend')
)
const selectMemberDataTable = () =>createSelector(
    selectQuality(),
    (state) => state.get('memberTable')
)
const selectMemberDataId = () =>createSelector(
    selectQuality(),
    (state) => state.get('memberId')
)
const selectGetEntityTableId = () =>createSelector(
    selectQuality(),
    (state) => state.get('entityId')
)
const selectGetEntityId = () =>createSelector(
    selectQuality(),
    (state) => state.get('getId')
)
const selectGetEntityName = () =>createSelector(
    selectQuality(),
    (state) => state.get('getName')
)
const selectEntityFilterViewStatus = () => createSelector(
    selectQuality(),
    (state) => state.get('entityFilterShow')
);
const selectEntityConditionData = () => createSelector(
    selectQuality(),
    (state) => state.get('entityConditionData')
);
const selectUpdateEntityDataList = () => createSelector(
    selectQuality(),
    (state) => state.get('entityData')
);
const selectEntityConditionList = () => createSelector(
    selectQuality(),
    (state) => state.get('entityConditionList')
);
const selectShowEntityColumns = () => createSelector(
    selectQuality(),
    (state) => state.get('showEntityColumns')
);
const selectShowAllEntityColumns = () => createSelector(
    selectQuality(),
    (state) => state.get('showAllEntityColumns')
);
const selectAuditDataList = () => createSelector(
    selectQuality(),
    (state) => state.get('auditDataList')
);
//请求数据子集的规则列表数据
const selectRequestruleListData = () => createSelector(
    selectQuality(),
    (state) => state.get('ruleListData')
);
//查看数据子集规则的数据子集的名字
const selectRuleListName = () => createSelector(
    selectQuality(),
    (state) => state.get('name')
);
//获取规则库数据
const selectUpdateRuleLibrary = () => createSelector(
    selectQuality(),
    (state) => state.get('library')
);
//显示自定义规则插件
const selectShowRuleModal = () => createSelector(
    selectQuality(),
    (state) => state.get('visible')
);
//自定义插件的弹出框的名字
const selectRuleName = () => createSelector(
    selectQuality(),
    (state) => state.get('ruleName')
);
//自定义插件弹出框保存按钮
const selectOnSaveRulesEditor = () => createSelector(
    selectQuality(),
    (state) => state.get('edtior')
);
//获取对应数据子集的模型
const selectModalListData = () => createSelector(
    selectQuality(),
    (state) => state.get('modalDataList')
);
//获取模型内的实体数据
const selectEntityListData = () => createSelector(
    selectQuality(),
    (state) => state.get('entityDataList')
);
//获取实体内的属性
const selectAttributeListData = () => createSelector(
    selectQuality(),
    (state) => state.get('attributeList')
);
//更新数据子集规则列表所需要的数据子集ID
const selectRuleListId = () => createSelector(
    selectQuality(),
    (state) => state.get('ruleId')
);
//规则编辑
const selectOnEdtiorRule = () => createSelector(
    selectQuality(),
    (state) => state.get('ruleEdtior')
);
//请求后台的table数据（page，limit）
const selectRulePageData = () => createSelector(
    selectQuality(),
    (state) => state.get('pageData')
);
//ruleDomainPage页面的搜索框中的内容
const selectOnSearchRuleList = () => createSelector(
    selectQuality(),
    (state) => state.get('ruleLike')
);
//CYY 实体质量查看-数据质量监控质量日志 结果
const selectUpDataEntityCheckList = () => createSelector(
    selectQuality(),
    (state) => state.get('entityCheckList')
);



/**
 * *****************************************************************
 *
 */
export {
    selectqualityDataList,
    selectUpdateQualityReport,
    selectModifyExecutePlan,
    selectShowExecutePlan,
    selectModifyPlanAttr,
    selectReqDataSrc,
    selectShowModifyEdit,
    selectQualityReqData,
    selectWatcherTimeData,
    selectRecentWatcherTime,
    selectMonitorTableData,
    selectMasterChangeData,
    selectEntityClassesData,
    selectEntityTableData,
    selectEntityDataChange,
    selectQualityEntityTable,
    selectEntityTrendChange,
    selectMemberDataTable,
    selectGetEntityTableId,
    selectMemberDataId,
    selectGetEntityId,
    selectGetEntityName,
    selectEntityFilterViewStatus,
    selectEntityConditionData,
    selectUpdateEntityDataList,
    selectEntityConditionList,
    selectShowEntityColumns,
    selectShowAllEntityColumns,
    selectAuditDataList,
    selectRequestruleListData,
    selectRuleListName,
    selectUpdateRuleLibrary,
    selectShowRuleModal,
    selectRuleName,
    selectOnSaveRulesEditor,
    selectRuleListId,
    selectModalListData,
    selectEntityListData,
    selectAttributeListData,
    selectOnEdtiorRule,
    selectRulePageData,
    selectOnSearchRuleList,
    selectUpDataEntityCheckList,
}