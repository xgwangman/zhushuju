/**
 * Created by Administrator on 2017/5/18.
 */

//请求数据子集质量数据
export const REQUEST_DOMAIN='QualityPage/REQUEST_DOMAIN';
//更新数据子集质量数据
export const UPDATE_QUALITYLIST='QualityPage/UPDATE_QUALITYLIST';
//是否启用监控
export const CHANGE_STATUS='QualityPage/CHANGE_STATUS';
//请求质量报告
export const REQUEST_REPORT='QualityPage/REQUEST_REPORT';
//更新质量报告数据
export const UPDATE_QUALITYREPORT='QualityPage/UPDATE_QUALITYREPORT';
//是否显示执行计划修改弹窗
export const SHOW_EXECUTEPLAN = 'QualityPage/SHOW_EXECUTEPLAN';
//根据参数渲染计划界面
export const SHOW_EXECUTEPLAN_DATA='QualityPage/SHOW_EXECUTEPLAN_DATA';
//当前编辑的执行计划的属性
export const SET_MODIFYPLANATTR = 'QualityPage/SET_MODIFYPLANATTR';
//缓存请求数据源的参数
export const SET_REQAPPDATA = 'QualityPage/SET_REQAPPDATA';
//保存修改执行计划应用系统请求
export  const SAVE_MODIFY = 'QualityPage/SAVE_MODIFY';

export const SHOW_MODIFYCREATE = 'QualityPage/SHOW_MODIFYCREATE';
//查看数据子集规则的数据子集的ID
export const RULE_LIST_ID = 'QualityPage/RULE_LIST_ID';
//查看数据子集规则的数据子集的名字
export const RULE_LIST_NAME = 'QualityPage/RULE_LIST_NAME';
//请求数据子集的规则列表数据
export const REQUEST_RULE_LIST_DATA = 'QualityPage/REQUEST_RULE_LIST_DATA';
//请求规则库列表
export const RUQUEST_RULE_LIBRARY = 'QualityPage/RUQUEST_RULE_LIBRARY';
//获取规则库数据
export const UPDATE_RULE_LIBRARY = 'QualityPage/UPDATE_RULE_LIBRARY';
//添加规则（tree）
export const ADD_RULE = 'QualityPage/ADD_RULE';
//显示自定义规则插件
export const SHOW_RULE_MADAL = 'QualityPage/SHOW_RULE_MADAL';
//自定义插件的弹出框的名字
export const RULE_NAME = 'QualityPage/RULE_NAME';
//自定义插件弹出框保存按钮
export const ON_SAVE_RULES_EDITOR = 'QualityPage/ON_SAVE_RULES_EDITOR';
//缓存质量报告
export const SET_QUALITYREQ = 'QualityPage/SET_QUALITYREQ';
//缓存监控时间
export const SET_WATCHERTIME = 'QualityPage/SET_WATCHERTIME';
//更新监控时间
export const UPDATE_WATCHERTIME = 'QualityPage/UPDATE_WATCHERTIME';
//缓存监控时间表
export const SET_MONITORTABLE = 'QualityPage/SET_MONITORTABLE';
//更新监控时间表
export const UPDATE_MONITORTABLE = 'QualityPage/UPDATE_MONITORTABLE';
//缓存一年内主数据变化情况
export const SET_MASTERDATACHANGE = 'QualityPage/SET_MASTERDATACHANGE';
//更新一年内主数据变化情况
export const UPDATA_MASTERDATA = 'QualityPage/UPDATA_MASTERDATA';
//缓存实体分类数据
export const SET_ENTITYCLASSES = 'QualityPage/SET_ENTITYCLASSES';
//更新实体分类数据
export const UPDATA_ENTITYCLASSES = 'QualityPage/UPDATA_ENTITYCLASSES';
//缓存实体分类id
export const GET_ENTITYTABLEID = 'QualityPage/GET_ENTITYTABLEID';
//请求实体分类表数据
export const SET_ENTITYTABLEDATA = 'QualityPage/SET_ENTITYTABLEDATA';
//更新实体分类表数据
export const UPDATA_ENTITYTABLE = 'QualityPage/UPDATA_ENTITYTABLE';
//请求每个实体一年内数据变化情况
export const SET_ENTITYCHANGE = 'QualityPage/SET_ENTITYCHANGE';
//更新每个实体一年内数据变化情况
export const UPDATA_ENTITYCHANGE = 'QualityPage/UPDATA_ENTITYCHANGE';
//请求实体质量表数据
export const SET_QUALITYTABLE = 'QualityPage/SET_QUALITYTABLE';
//更新实体质量表数据
export const UPDATA_QUALITYTABLE = 'QualityPage/UPDATA_QUALITYTABLE';
//请求实体最近一次监控数据
export const SET_ENTITYTREND = 'QualityPage/SET_ENTITYTREND';
//更新实体最近一次监控数据
export const UPDATA_ENTITYTREND = 'QualityPage/UPDATA_ENTITYTREND';
//请求成员表数据
export const SET_MEMBERTABLE = 'QualityPage/SET_MEMBERTABLE';
//更新实体最近一次检测质量数据
export const UPDATA_MEMBERTABLE = 'QualityPage/UPDATA_MEMBERTABLE';
//CYY 实体质量查看-数据质量监控质量日志 请求
export const REQUEST_ENTITI_LIST = 'QualityPage/REQUEST_ENTITI_LIST';
//CYY 实体质量查看-数据质量监控质量日志 结果
export const UPDATE_ENTITY_LIST = 'QualityPage/UPDATE_ENTITY_LIST';
//缓存实体id
export const GET_ENTITYID = 'QualityPage/GET_ENTITYID';
//缓存实体名字
export const GET_ENTITYNAME = 'QualityPage/GET_ENTITYNAME';
//缓存显示隐藏筛选条件数据
export const SHOW_FILTERCONDITION = 'QualityPage/SHOW_FILTERCONDITION';
// 缓存当前编辑的条件
export const SET_CONDITIONDATA = 'QualityPage/SET_CONDITIONDATA';
//缓存实体数据
export const SET_ENTITYDATA = 'QualityPage/SET_ENTITYDATA';
//缓存id
export const GET_MEMBERID = 'QualityPage/GET_MEMBERID';
// 缓存条件list
export const SET_CONDITIONLIST ='QualityPage/SET_CONDITIONLIST';
//FILTER_ENTITYDATA
export const FILTER_ENTITYDATA = 'QualityPage/FILTER_ENTITYDATA';
// 缓存可显示的列
export const SET_SHOWCOLUMNS = 'QualityPage/SET_SHOWCOLUMNS';
// 显示所有的列
export const SHOW_ALLCOLUMNS = 'QualityPage/SHOW_ALLCOLUMNS';
// 请求数据审计记录的值
export const REQUEST_DATAAUDITRECORD = 'QualityPage/REQUEST_DATAAUDITRECORD';
//规则是否被启用
export const ON_CHANGE_STATUSR = 'QualityPage/ON_CHANGE_STATUSR';
//删除属性规则
export const DELETE_RULE = 'QualityPage/DELETE_RULE';
//获取模型对应数据子集的ID
export const  DOMAIN_DATA_LIST= 'QualityPage/DOMAIN_DATA_LIST';
//获取对应数据子集的模型
export const MODAL_DATA_LIST = 'QualityPage/MODAL_DATA_LIST';
//获取对应实体的模型的id
export const MODA_LDATA = 'QualityPage/MODA_LDATA';
//获取模型内的实体数据
export const ENTITY_LIST_DATA = 'QualityPage/ENTITY_LIST_DATA';
//获取对应属性的实体id
export const ENTITY_DATA = 'QualityPage/ENTITY_DATA';
//获取对应实体的属性
export const ATTRIBUTE_LIST_DATA = 'QualityPage/ATTRIBUTE_LIST_DATA';
//规则编辑
export const ON_EDTIOR_RULE = 'QualityPage/ON_EDTIOR_RULE';
//请求后台的table数据（page，limit）
export const RULE_PAGE_DATA = 'QualityPage/RULE_PAGE_DATA';
//查询框SearchBox
export const ON_SEARCH = 'QualityPage/ON_SEARCH';
//查询规则SearchBox
export const ON_SEARCH_RULE = 'QualityPage/ON_SEARCH_RULE';
//查询规则列表的分页数据
export const SEARCH_RULE_PAGEDATA = 'QualityPage/search_Rule_PageData';






