//+++++++++++++++登录+++++++++++++++
//登入
export const API_LOGIN = 'access/login.do';
//登出
export const API_LOGOUT = 'access/logout.do';
//修改密码
export const API_CHGPASSWORD = 'access/chgPassword.do';

//+++++++++++++++用户管理+++++++++++++++
//获取用户
export const API_USER_LIST = 'user/list.do';
//添加用户
export const API_USER_ADD = 'user/add.do';
//删除用户
export const API_UESR_DELETE = 'user/delete.do';
//批量删除用户
export const API_UESR_DELETEBATCH = 'user/deleteBatch.do';
//修改用户
export const API_UESR_UPDATE = 'user/update.do';
//重置密码
export const API_USER_RESETPASSWORD = 'user/resetPassword.do';
//修改角色
export const API_USER_CHGROLE = 'user/chgRole.do';
//启用
export const API_USER_ENABLED = 'user/enabled.do';
//停用
export const API_USER_DISABLE = 'user/disable.do';
//获取用户权限
export const API_USER_GETAUTHURL = 'user/getAuthUrl.do';
//保存用户权限
export const API_USER_SAVEAUTHURL = 'user/saveAuthUrl.do';


//+++++++++++++++菜单资源+++++++++++++++
//获取菜单资源
export const API_MR_LIST = 'menuResource/list.do';
//初始化菜单资源
export const API_INIT = 'menuResource/init.do';


//+++++++++++++++角色管理+++++++++++++++
//获取启用角色
export const API_ROLE_LISTENABLE = 'role/listenable.do';
//获取角色
export const API_ROLE_LIST = 'role/list.do';
//添加角色
export const API_ROLE_ADD = 'role/add.do';
//删除角色
export const API_ROLE_DELETE = 'role/delete.do';
//批量删除角色
export const API_ROLE_DELETEBATCH = 'role/deleteBatch.do';
//修改角色
export const API_ROLE_UPDATE = 'role/update.do';
//启用
export const API_ROLE_ENABLED = 'role/enabled.do';
//停用
export const API_ROLE_DISABLE = 'role/disable.do';
//获取角色用户列表
export const API_ROLE_GETUSER = 'role/getUser.do';
//获取角色权限
export const API_ROLE_GETAUTHURL = 'role/getAuthUrl.do';
//保存角色权
export const API_ROLE_SAVEAUTHURL = 'role/saveAuthUrl.do';


//+++++++++++++++主数据+++++++++++++++
//获取数据子集设计信息
export const API_DOMAIN_LIST = 'md/design/domain/list.do';
//添加数据子集
export const API_DOMAIN_ADD = 'md/design/domain/add.do';
//修改数据子集
export const API_DOMAIN_UPDATE = 'md/design/domain/update.do';
//删除数据子集
export const API_DOMAIN_DELETE = 'md/design/domain/delete.do';
//导出数据子集内模型结构
export const API_EXPORTMETADATA = 'md/design/domain/exportmetadata.do';
//导出数据子集内模型基本信息
export const API_LISTMODEL = 'md/design/domain/listmodel.do';
//添加模型
export const API_MODEL_ADD = 'md/design/model/add.do';
//修改模型
export const API_MODEL_UPDATE = 'md/design/model/update.do';
//删除模型
export const API_MODEL_DELETE = 'md/design/model/delete.do';
//获取模型基本信息(所有模型)
export const API_MODEL_LIST = 'md/design/model/list.do';
//获取模型内设计实体
export const API_MD_LIST = 'md/design/entity/list.do';
//获取模型的基本信息
export const API_ENTITY_LISTBASE = 'md/design/entity/listbase.do';
//添加实体
export const API_ENTITY_ADD = 'md/design/entity/add.do';
//修改实体
export const API_ENTITY_UPDATE = 'md/design/entity/update.do';
//删除实体
export const API_ENTITY_DELETE = 'md/design/entity/delete.do';
//启用实体
export const API_ENTITY_ENABLED = 'md/design/entity/enabled.do';
//停用实体
export const API_ENTITY_DISABLE = 'md/design/entity/disable.do';
//获取实体内设计属性
export const API_ATTRIBUTE_LIST = 'md/design/attribute/list.do';
//获取实体内属性基本信息
export const API_ATTRIBUTE_LISTBASE = 'md/design/attribute/listbase.do';
//添加属性
export const API_ATTRIBUTE_ADD = 'md/design/attribute/add.do';
//修改属性
export const API_ATTRIBUTE_UPDATE = 'md/design/attribute/update.do';
//删除属性
export const API_ATTRIBUTE_DELETE = 'md/design/attribute/delete.do';
//获取属性的规则
export const API_RULE_LIST = 'md/design/attribute/rule/list.do';
//添加属性的规则
export const API_RULE_ADD = 'md/design/attribute/rule/add.do';
//修改属性的规则
export const API_RULE_UPDATE = 'md/design/attribute/rule/update.do';
//删除属性的规则
export const API_RULE_DELETE = 'md/design/attribute/rule/delete.do';
//启用规则
export const API_RULE_ENABLED = 'md/design/attribute/rule/enabled.do';
//停用规则
export const API_RULE_DISABLE = 'md/design/attribute/rule/disable.do';
//获取数据子集主页信息
export const API_MASTERDATA_LIST = 'md/masterdata/list.do';
//获取实体
export const API_MASTERDATA_LISTENTITY = 'md/masterdata/listentity.do';
//获取实体主数据
export const API_LISTMEMBER = 'md/masterdata/listmember.do';
//获取待审批主数据
export const API_LISTAUDITMEMBER = 'md/masterdata/listauditmember.do';
//审批通过/驳回主数据
export const API_APPROVEMEMBER = 'md/masterdata/approvemember.do';
//获取实体主数据审计记录
export const API_LISTMEMBERTRACK = 'md/masterdata/listmembertrack.do';


//+++++++++++++++采集任务+++++++++++++++
//获取实体的采集任务的设计信息
export const API_GATHER_LIST = 'task/gather/list.do';
//获取实体的采集任务基本信息
export const API_GATHER_LISTBASE = 'task/gather/listbase.do';
//添加采集任务
export const API_GATHER_ADD = 'task/gather/add.do';
//删除采集任务
export const API_GATHER_DELETE = 'task/gather/delete.do';
//修改采集任务
export const API_GATHER_UPDATE = 'task/gather/update.do';
//启用采集任务
export const API_GATHER_ENABLED = 'task/gather/enabled.do';
//停用采集任务
export const API_GATHER_DISABLE = 'task/gather/disable.do';
//启动采集任务
export const API_GATHER_START = 'task/gather/start.do';
//停止采集任务
export const API_GATHER_STOP = 'task/gather/stop.do';
//获取编排流程
export const API_GATHER_GETFLOW = 'task/gather/getFlow.do';
//编排采集任务
export const API_GATHER_ARRANGE = 'task/gather/arrange.do';
//获取采集任务的执行日志
export const API_GATHER_LISTLOG = 'task/gather/listlog.do';
//清空采集任务的执行日志
export const API_GATHER_CLEARLOG = 'task/gather/clearlog.do';
//获取采集任务的执行日志失败详情
export const API_GATHER_LISTLOGDETAIL = 'task/gather/listlogdetail.do';
//JDBCSQL采集 输入sql语句查询结果
export const API_GATHER_COMPONENT_GETSQLMETA = 'task/gather/component/getSqlMeta.do';


//+++++++++++++++共享任务+++++++++++++++
//获取实体的共享任务设计信息
export const API_SHARE_LIST = 'task/share/list.do';
//获取实体的共享任务基本信息
export const API_SHARE_LISTBASE = 'task/share/listbase.do';
//添加共享任务
export const API_SHARE_ADD = 'task/share/add.do';
//删除共享任务
export const API_SHARE_DELETE = 'task/share/delete.do';
//修改共享任务
export const API_SHARE_UPDATE = 'task/share/update.do';
//启用共享任务
export const API_SHARE_ENABLED = 'task/share/enabled.do';
//停用共享任务
export const API_SHARE_DISABLE = 'task/share/disable.do';
//启动共享任务
export const API_SHARE_START = 'task/share/start.do';
//停止共享任务
export const API_SHARE_STOP = 'task/share/stop.do';
//编排共享任务
export const API_SHARE_ARRANGE = 'task/share/arrange.do';
//获取共享任务的执行日志
export const API_SHARE_LISTLOG = 'task/share/listlog.do';
//获取共享任务的执行日志失败详情
export const API_SHARE_LISTLOGDETAIL = 'task/share/listlogdetail.do';

//+++++++++++++++审批+++++++++++++++
//获取实体待审批数据统计
export const API_ENTITY_COUNT = 'bpm/entity/count.do';
//获取实体版本待审批数据统计
export const API_VERSION_COUNT = 'bpm/entity/version/count.do';
//获取采集任务待审批数据统计
export const API_TASKGATHER_COUNT = 'bpm/taskgather/count.do';
//获取共享任务待审批数据统计
export const API_TASKSHARE_COUNT = 'bpm/taskshare/count.do';
//获取服务待审批数据统计
export const API_WS_COUNT = 'bpm/ws/count.do';
//获取实体待审批数据
export const API_ENTITY_LIST = 'bpm/entity/list.do';
//获取实体版本待审批数据
export const API_VERSION_LIST = 'bpm/entity/version/list.do';
//获取采集任务待审批数据
export const API_AUDIT_TASKGATHER_LIST = 'bpm/taskgather/list.do';
//获取共享任务待审批数据
export const API_AUDIT_TASKSHARE_LIST = 'bpm/taskshare/list.do';
//获取服务待审批数据
export const API_WS_LIST = 'bpm/ws/list.do';
//审批实体
export const API_ENTITY_AUDIT = 'bpm/entity/audit.do';
//审批采集任务
export const API_TASKGATHER_AUDIT = 'bpm/taskgather/audit.do';
//审批共享任务
export const API_TASKSHARE_AUDIT = 'bpm/taskshare/audit.do';
//审批服务
export const API_WS_AUDIT = 'bpm/ws/audit.do';


//+++++++++++++++版本+++++++++++++++
//获取实体的所有版本基本信息
export const API_ALLVERSION_LISTBASE = 'md/version/listbase.do';
//获取实体的所有版本
export const API_ALLVERSION_LIST = 'md/version/list.do';
//发布实体版本
export const API_VERSION_ADD = 'md/version/add.do';
//查询实体某一版本的数据
export const API_VERSION_LISTMEMBER = 'md/version/listmember.do';
//获取某一版本实体属性基本信息
export const API_VERSION_LISTBASEATTRIBUTE = 'md/version/listbaseattribute.do';
//获取实体版本待审批数据
export const API_VERSION_LISTAUDIT = 'md/version/listaudit.do';
//审批实体版本
export const API_VERSION_AUDIT = 'md/version/audit.do';
//获取实体版本待审批数据统计
export const API_VERSION_LISTAUDITCOUNT = 'md/version/listauditcount.do';


//+++++++++++++++服务+++++++++++++++
//获取数据子集服务概况
export const API_WS_DOMAINLIST = 'ws/domainlist.do';
//获取数据子集内服务详细信息
export const API_WS2_LIST = 'ws/list.do';
//启用服务
export const API_WS_ENABLED = 'ws/enabled.do';
//停用服务
export const API_WS_DISABLE = 'ws/disable.do';
//启动服务
export const API_WS_START = 'ws/start.do';
//停止服务
export const API_WS_STOP = 'ws/stop.do';
//获取一个服务的详细信息
export const API_WS_queryWs = 'ws/queryWs.do';
//获取服务的运行时状态
export const API_WS_QUERYRUNNINGSTATE = 'ws/queryRunningstate.do';
//添加服务
export const API_WS_ADD = 'ws/add.do';
//修改服务
export const API_WS_UPDATE = 'ws/update.do';
//删除服务
export const API_WS_DELETE = 'ws/delete.do';
//服务调用日志
export const API_WS_LISTLOG = 'ws/listLog.do';
//清空调用日志
export const API_WS_CLEARLOG = 'ws/clearLog.do';


//+++++++++++++++质量+++++++++++++++
//获取规则库
export const API_DQ_LIST = 'dq/library/list.do';
//获取数据子集质量任务信息
export const API_MD_DOMAINLIST = 'dq/md/domainlist.do';
//获取数据子集实体质量信息
export const API_MD_ENTITYLIST = 'dq/md/entitylist.do';
//修改数据子集任务执行计划
export const API_MD_UPDATEPLAN = 'dq/md/updateplan.do';
//启用数据子集数据质量监控
export const API_MD_ENABLED='dq/md/enabled.do';
//停用数据子集数据质量监控
export const API_MD_DISABLE='dq/md/disable.do';
//获取实体规则列表
export const API_MD_DESIGN_RULE_LIST='md/design/attribute/rule/list.do';
//启用规则
export const API_DESIGN_ENABLED='md/design/attribute/rule/enabled.do';
//停用规则
export const API_DESIGN_DISABLE='md/design/attribute/rule/disable.do';
//添加规则
export const API_DESIGN_ADD='md/design/attribute/rule/add.do';
// 修改规则
export const API_DESIGN_UPDATE='md/design/attribute/rule/update.do';
//删除规则
export const API_DESIGN_DELETE='md/design/attribute/rule/delete.do';
// （获取数据子集质量监控明细信息）质量报告-最近一次监控质量汇总
export const API_MDRP_LISTDOMAIN='dq/mdrp/listdomain.do';
//质量报告-域实体列表
export const API_MDRP_LISTDOMAINEETITY='dq/mdrp/listdomainentity.do';
// 实体质量查看-数据质量监控日志
export const API_MDRP_LISTENTITY='dq/mdrp/listentity.do';
//获取最一年内实体质量变化趋势情况
export const API_MDRP_LISTENTITYLASTYEAR='dq/mdrp/listentitylastyear.do';
//实体质量查看-最近一次监控质量数据
export const API_MDRP_LISTLASTERRORMEMBER='dq/mdrp/listlasterrormember.do';
//质量报告-最近一次执行情况
export const API_LISTLAST = 'dq/mdrp/listlast.do';
//质量报告-域数据质量变化监控日志
export const API_LISTLASTENTITY = 'dq/mdrp/listlastentity.do';
//质量报告-域数据质量变化趋势
export const API_DOMAIN_LISTLASTYEAR = 'dq/mdrp/listlastyear.do';
//实体质量查看-最近一次监控情况
export const API_MDRP_LISTENTITYLAST = 'dq/mdrp/listentitylast.do';


//+++++++++++++++应用系统+++++++++++++++
//添加应用系统
export const API_APP_ADD = 'ign/app/add.do';
//修改应用系统
export const API_APP_UPDATE = 'ign/app/update.do';
//删除应用系统
export const API_APP_DELETE = 'ign/app/delete.do';
//获取应用系统概况信息
export const API_APP_LIST = 'ign/app/list.do';
//获取应用系统基本信息
export const API_APP_LISTBASE = 'ign/app/listbase.do';
//获取应用系统的任务
export const API_APP_LISTTASK = 'ign/app/listtask.do';
// 获取数据源基本信息
export const API_DATASOURCE_LISTBASE = 'ign/datasource/listbase.do';
// 获取数据源概况信息
export const API_DATASOURCE_LIST = 'ign/datasource/list.do';
// 自动生成url
export const API_DATASOURCE_AUTOTESTURL = 'ign/datasource/autoTestUrl.do';
//添加数据源
export const API_IGN_ADD = 'ign/datasource/add.do';
//编辑数据源
export const API_IGN_UPDATA = 'ign/datasource/update.do';
//测试连接
export const API_IGN_TESTCONNECT = 'ign/datasource/test.do';
// 删除数据源
export const API_IGN_DELETE = 'ign/datasource/delete.do';
//查看数据源实体信息
export const API_DTSRC_LISTTABLES = 'ign/datasource/listTables.do';
//查看数据源实体字段信息
export const API_DTSRC_LISTTABLEFIELDS = 'ign/datasource/listTableFields.do';
//启用数据源实体
export const API_DTSRC_ENABLETABLE = 'ign/datasource/enableTable.do';
//停用数据源实体
export const API_DTSRC_DISABLETABLE = 'ign/datasource/disableTable.do';
//获取检查变动数据源实体
export const API_DTSRC_LISTSYNTABLES = 'ign/datasource/listSynTables.do';
//获取检查变动数据源实体字段
export const API_DTSRC_LISTSYNTABLESFIELDS = 'ign/datasource/listSynTablesFields.do';
//一键同步
export const API_DTSRC_SYNTABLES = 'ign/datasource/synTables.do';
//同步一个table
export const API_DTSRC_SYNTABLE = 'ign/datasource/synTable.do';
// 获取数据源的采集任务基本信息
export const API_DTSRC_LISTGATHERTASK = 'ign/datasource/listgathertask.do';
//获取数据源的共享任务基本信息
export const API_DTSRC_LISTSHARETASK = 'ign/datasource/listsharetask.do';
//查看启用的数据表实体
export const API_DTSRC_LISTENABLETABLES = 'ign/datasource/listenableTables.do';
//查看启用的数据表实体字段
export const API_DTSRC_LISTENABLETABLEFIELDS = 'ign/datasource/listenableTableFields.do';
//获取导入实体列表数据
export const API_IMPORT_QUERYENTITY = 'ign/md/import/queryEntity.do';
//获取下载实体列表数据
export const API_IMPORT_DOWNENTITYTEMPLATE = 'ign/md/import/downEntityTemplate.do';
//获取上传文件信息
export const API_IMPORT_IMPORTENTITYDATA = 'ign/md/import/importEntityData.do';
//确认导入数据
export const API_IMPORT_CONFIRMAPPROVE = 'ign/md/import/approve.do';
//取消导入数据
export const API_IMPORT_CANCELREJECT = 'ign/md/import/reject.do';
//导入数据查看
export const API_IMPORT_QUERYIMPORTLOG = 'ign/md/import/queryImportLog.do';
//清除导入数据
export const API_IMPORT_CLEARIMPORTDATA = 'ign/md/import/clear.do';
//导入数据查看
export const API_IMPORT_QUERYIMPENTITYDATA = 'ign/md/import/queryImpEntityData.do';


//+++++++++++++++系统设置+++++++++++++++
//实体审批
export const API_BPM_LIST = 'bpm/flow/entity/list.do';
//实体审批上传
export const API_BPM_UPLOAD = 'bpm/flow/entity/upload.do';
//实体版本审批
export const API_FLOW_LIST = 'bpm/flow/entityversion/list.do';
//实体版本审批上传
export const API_ENTITYVERSION_UPLOAD = 'bpm/flow/entityversion/upload.do';
//采集任务审批
export const API_TASKGATHER_LIST = 'bpm/flow/taskgather/list.do';
// 采集任务审批上传
export const API_TASKGATHER_UPLOAD = 'bpm/flow/taskgather/upload.do';
//共享任务审批
export const API_TASKSHARE_LIST = 'bpm/flow/taskshare/list.do';
// 共享任务审批上传
export const API_FLOW_UPLOAD = 'bpm/flow/taskshare/upload.do';
//服务审批
export const API_BPMS_LIST = 'bpm/flow/ws/list.do';
//服务审批上传
export const API_BPMS_UPLOAD = 'bpm/flow/ws/upload.do';



