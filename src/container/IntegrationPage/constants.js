/**
 * 点击登陆按钮
 * @type {string}
 */
//请求应用系统数据
export const REQUEST_APPDATA = 'MASTERDATA/INTEGRATION/REQUEST_APPDATA';
//缓存搜索应用系统数据
export const REQUEST_APPSEARCH = 'MASTERDATA/INTEGRATION/REQUEST_APPSEARCH';
//更新应用系统缓存
export const UPDATE_APPLIST = 'MASTERDATA/INTEGRATION/UPDATE_APPLIST';
//是否显示应用系统编辑页面
export const SHOW_APPCREATE = 'MASTERDATA/INTEGRATION/SHOW_APPCREATE';
//每次关闭modal后，重新生成一个modalKey
export const SET_MODALKEY = 'MASTERDATA/INTEGRATION/SET_MODALKEY';
//缓存当前编辑app的属性
export const SET_APPATTR = 'MASTERDATA/INTEGRATION/SET_APPATTR';
//添加/更改应用系统请求
export const SAVE_APP = 'MASTERDATA/INTEGRATION/SAVE_APP';
//删除应用系统
export const ON_DELETEAPP = 'MASTERDATA/INTEGRATION/ON_DELETEAPP';
//缓存请求数据源的参数
export const SET_REQAPPDATA = 'MASTERDATA/INTEGRATION/SET_REQAPPDATA';
//请求应用系统的采集数据源
export const REQUEST_DATASRC = 'MASTERDATA/INTEGRATION/REQUEST_DATASRC';
//更新采集数据源的数据list
export const UPDATE_DATASRCLIST = 'MASTERDATA/INTEGRATION/UPDATE_DATASRCLIST';
//缓存应用系统的采集数据源搜索框
export const REQUEST_DATASEARCH = 'MASTERDATA/INTEGRATION/REQUEST_DATASEARCH';
//当前编辑的数据源的属性
export const SET_DATASOURCEATTR = 'MASTERDATA/INTEGRATION/SET_DATASOURCEATTR';
//添加数据源
export const SAVE_DATASOURCE = 'MASTERDATA/INTEGRATION/SAVE_DATASOURCE';
//添加数据库数据源时的测试链接
export const TEST_CONNECTION = 'MASTERDATA/INTEGRATION/TEST_CONNECTION';
//删除数据源
export const DELETE_DATASOURCE = 'MASTERDATA/INTEGRATION/DELETE_DATASOURCE';
//请求实体list
export const REQUEST_TABLELIST = 'MASTERDATA/INTEGRATION/REQUEST_TABLELIST';
//更新表list缓存
export const UPDATE_TABLELIST = 'MASTERDATA/INTEGRATION/UPDATE_TABLELIST';
//缓存表list分页数据
export const REQUEST_PAGE = 'MASTERDATA/INTEGRATION/REQUEST_PAGE';
//缓存实体list表的搜索框
export const REQUEST_TABLESEARCH = 'MASTERDATA/INTEGRATION/REQUEST_TABLESEARCH';
//改变table的状态
export const CHANGE_TABLESTATUS = 'MASTERDATA/INTEGRATION/CHANGE_TABLESTATUS';
//缓存当前编辑表的属性数据
export const SET_TABLEATTR = 'MASTERDATA/INTEGRATION/SET_TABLEATTR';
//请求字段list
export const REQUEST_FIELDLIST = 'MASTERDATA/INTEGRATION/REQUEST_FIELDLIST';
//更新字段list缓存
export const UPDATE_FIELDSLIST = 'MASTERDATA/INTEGRATION/UPDATE_FIELDSLIST';
//请求 需要同步的实体list
export const REQUEST_SYNTABLELIST = 'MASTERDATA/INTEGRATION/REQUEST_SYNTABLELIST';
//缓存 需要同步的实体list
export const UPDATE_SYNTABLELIST = 'MASTERDATA/INTEGRATION/UPDATE_SYNTABLELIST';
//缓存需要同步的实体list的搜索框
export const REQUEST_SYNTABLESEARCH = 'MASTERDATA/INTEGRATION/REQUEST_SYNTABLESEARCH';
//请求 需要同步的字段list
export const REQUEST_SYNFIELDLIST = 'MASTERDATA/INTEGRATION/REQUEST_SYNFIELDLIST';
//缓存 需要同步的字段list
export const UPDATE_SYNFIELDLIST = 'MASTERDATA/INTEGRATION/UPDATE_SYNFIELDLIST';
//缓存 需要同步的字段list表的搜索框
export const REQUEST_FIELDSEARCH = 'MASTERDATA/INTEGRATION/REQUEST_FIELDSEARCH';
//一键更新
export const SYN_TABLESACTION = 'MASTERDATA/INTEGRATION/SYN_TABLESACTION';
//一键更新一个表
export const SYN_FIELDSACTION = 'MASTERDATA/INTEGRATION/SYN_FIELDSACTION';
//缓存导入实体数据列表
export const SET_REQIMPORTDATA = 'MASTERDATA/INTEGRATION/SET_REQIMPORTDATA';
//更新导入实体数据列表
export const UPDATA_IMPORTDATA = 'MASTERDATA/INTEGRATION/UPDATA_IMPORTDATA';
//缓存导入实体数据搜索
export const SET_IMPORTSEARCH = 'MASTERDATA/INTEGRATION/SET_IMPORTSEARCH';
//缓存实体列表每一行的数据
export const SET_IMPORTAPP = 'MASTERDATA/INTEGRATION/SET_IMPORTAPP';
//缓存显示隐藏对话框
export const SHOW_MODALAPP = 'MASTERDATA/INTEGRATION/SHOW_MODALAPP';
//获取上传文件数据
export const SET_UPLOADFILES = 'MASTERDATA/INTEGRATION/SET_UPLOADFILES';
//更新上传文件列表1
export const UPDATE_UPLOADFILES = 'MASTERDATA/INTEGRATION/UPDATE_UPLOADFILES';
//更新上传文件列表2
export const UPDATE_FILESUPLOAD = 'MASTERDATA/INTEGRATION/UPDATE_FILESUPLOAD';
//缓存显示隐藏筛选条件数据
export const SHOW_FILTERCONDITION = 'MASTERDATA/INTEGRATION/SHOW_FILTERCONDITION';
//缓存可显示的列
export const SET_SHOWIMPORTCOLUMNS = 'MASTERDATA/INTEGRATION/SET_SHOWIMPORTCOLUMNS';
// 显示所有的列
export const SHOW_ALLCOLUMNS = 'MASTERDATA/INTEGRATION/SHOW_ALLCOLUMNS';
//确认导入的数据
export const SET_CONFIRMIMPORT = 'MASTERDATA/INTEGRATION/SET_CONFIRMIMPORT';
//取消导入的数据
export const SET_CANCELIMPORT= 'MASTERDATA/INTEGRATION/SET_CANCELIMPORT';
//缓存查看历史导入数据
export const SET_CHECKHISTORY = 'MASTERDATA/INTEGRATION/SET_CHECKHISTORY';
//更新查看历史导入数据
export const UPDATE_CHECKHISTORY = 'MASTERDATA/INTEGRATION/UPDATE_CHECKHISTORY';
//历史导入数据搜索
export const SET_CHECKSEARCH = 'MASTERDATA/INTEGRATION/SET_CHECKSEARCH';
//缓存清除导入数据
export const SET_CLAERIMPORT = 'MASTERDATA/INTEGRATION/SET_CLAERIMPORT';
//导入数据查看
export const SET_IMPORTCHECK = 'MASTERDATA/INTEGRATION/SET_IMPORTCHECK';
//更新导入数据查看
export const UPDATE_IMPORTCHECK = 'MASTERDATA/INTEGRATION/UPDATE_IMPORTCHECK';
// 缓存条件list
export const SET_CONDITIONLIST ='MASTERDATA/INTEGRATION/SET_CONDITIONLIST';
// 缓存当前编辑的条件
export const SET_CONDITIONDATA = 'MASTERDATA/INTEGRATION/SET_CONDITIONDATA';
//FILTER_IMPORTDATA
export const FILTER_IMPORTDATA = 'MASTERDATA/INTEGRATION/FILTER_IMPORTDATA';
//缓存上传显示页面分页数据
export const SET_UPLOADPAGE = 'MASTERDATA/INTEGRATION/SET_UPLOADPAGE';


