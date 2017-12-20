require('react-s-alert/dist/s-alert-default.css');
require('react-s-alert/dist/s-alert-css-effects/slide.css');
require('react-s-alert/dist/s-alert-css-effects/stackslide.css');
require('../css/DomainPageCss.css');
import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, match, hashHistory, IndexRedirect} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import configureStore from './store';
import {changeIsAdmin} from './container/App/actions';
import {selectLocationState, selectIsAdmin} from './container/App/selectors'
import {
    App,
    LoginPage,
    DomainPage,
    DomainEntityPage,
    DomainAttrPage,
    DomainDataPage,
    DomainEntityDataListPage,
    DomainEntityVersionsPage,
    EntityTaskPage,
    AddTaskPage,
    TaskEditFlowPage,
    TaskServiceEditFlowPage,
    DesignPage,
    DesignEntityPage,
    DesignAttrPage,
    DesignVersionPage,
    IntegrationPage,
    ImportMasterDataPage,
    CheckImportDataPage,
    CheckHistoryImportPage,
    DataSrcPage,
    AddDataSrcPage,
    EditDataSrcPage,
    TableListPage,
    FieldListPage,
    SynTableListPage,
    SynFieldListPage,
    QualityPage,
    DomainServicePage,
    SysMngPage,
    VersionInfoPage,
    ActivitiMngPage,
    UserMngPage,
    RoleMngPage,
    AuthorPage,
    RoleAuthorPage,
    UserPage,
    ExecutePlanModifyPage,
    QualityReportPage,
    QualityEntityPage,
    EntityQualityCheckPage,
    TaskExecuteLogPage,
    AddSreTask,
    ShareDataPage,
    ServerMgtPage,
    AddServicePage,
    ServerLogPage,
    ShareLogPage,
    RuleDomainPage,
    AddRulePage,
    VersionMamentPage,
    VersionInfoList,
    TestWsPage,
    ShareDataRecords
} from './container'
import {renderToString} from 'react-dom/server';
import Alert from 'react-s-alert';

const initialState = {};                                         //#####定义初始State
//创建store
const store = configureStore(initialState, hashHistory);
//创建历史记录
const history = syncHistoryWithStore(hashHistory, store, {selectLocationState: selectLocationState()});
//权限校验
const requireAuth = (nextState, replace, next) => {
   /* let state = store.getState();
    //获取登录状态
    if (!window.localStorage.getItem("isAuth") || window.localStorage.getItem("isAuth") == 'false') {
        replace({pathname: '/login'});
    } else {
    }
    next();*/
    /*onEnter={requireAuth}*/
};
export function renderApp(requestPath, currentUserName) {
    ReactDOM.render(
        <Provider store={store}>
            <div id="app">
                <Router history={history}>
                    <Route path="/"  component={App}>
                        <IndexRedirect to="main"/>
                        <Route path="main" component={DomainPage}/>
                        <Route path="main/data" component={DomainDataPage}/>
                        <Route path="main/entity/:domainName/:modelName/:modelId" component={DomainEntityPage}/>
                        <Route path="main/entity/attr/:domainName/:modelName/:modelId/:entityName/:entityId" component={DomainAttrPage}/>
                        <Route path="main/entity/entityData/:domainName/:modelName/:modelId/:entityName/:entityId/:dataType" component={DomainEntityDataListPage}/>
                        <Route path="main/entity/allVersion/:domainName/:modelName/:modelId/:entityName/:entityId" component={DomainEntityVersionsPage}/>
                        <Route path="main/entity/task/:domainName/:modelName/:modelId/:entityName/:entityId/:taskType" component={EntityTaskPage}/>
                        <Route path="main/entity/tasks/addTask/:domainName/:modelName/:modelId/:entityName/:entityId/:taskType/:type(/:taskId)" component={AddTaskPage}/>
                        <Route path="main/entity/taskEditFlow/:domainName/:modelName/:modelId/:entityName/:entityId/:taskName/:taskId/:taskType" component={TaskEditFlowPage}/>
                        <Route path="main/entity/task/taskExecuteLogPage/:domainName/:modelName/:modelId/:entityName/:taskName/:taskId" component={TaskExecuteLogPage}/>

                        <Route path="design" component={DesignPage}/>
                        <Route path="design/entitys/:modelId/:domainName/:modelName" component={DesignEntityPage}/>
                        <Route path="design/entity/attr/:entityId/:domainName/:modelName/:modelId/:entityName" component={DesignAttrPage}/>
                        <Route path="design/entity/version/:entityId/:domainName/:modelName/:entityName/:modelId" component={DesignVersionPage}/>

                        <Route path="integration" component={IntegrationPage}/>
                        <Route path="integration/dataSrc/:intId/:intName" component={DataSrcPage}/>
                        <Route path="integration/addDataSource/:intId/:intName" component={AddDataSrcPage}/>
                        <Route path="integration/editDataSource/:intId/:intName/:antId/:antName" component={EditDataSrcPage}/>
                        <Route path="integration/dataSrc/tableList/:srcId/:srcName/:paramsId" component={TableListPage}/>
                        <Route path="integration/table/fieldList/:srcId/:srcTableId/:srcName/:srcType/:paramsId" component={FieldListPage}/>
                        <Route path="integration/dataSrc/synTableList" component={SynTableListPage}/>
                        <Route path="integration/table/synFieldList/:srcId/:srcTableId/:srcName/:srcType/:paramsId" component={SynFieldListPage}/>
                        <Route path="importMasterData" component={ImportMasterDataPage}/>
                        <Route path="importMasterData/checkImportData/:importId/:recordName" component={CheckImportDataPage}/>
                        <Route path="importMasterData/checkHistoryImportData" component={CheckHistoryImportPage}/>

                        <Route path="quality" component={QualityPage}/>
                        <Route path="executePlanModifyPage" component={ExecutePlanModifyPage}/>
                        <Route path="quality/qualityReport/:entityId/:entityName" component={QualityReportPage}/>
                        <Route path="quality/qualityEntity/:entityId/:entityName" component={QualityEntityPage}/>
                        <Route path="quality/qualityEntity/entityQualityCheck/:entityId/:entityName/:entId/:entName" component={EntityQualityCheckPage}/>

                        <Route path="ruleDomainPage/:domainId/:domainName" component={RuleDomainPage}/>
                        <Route path="addRulePage/:domainId/:domainName" component={AddRulePage}/>

                        <Route path="service" component={ShareDataPage}/>
                        <Route path="service/AddSreTask/:taskId/:taskName(/:remark)" component={AddSreTask}/>
                        <Route path="service/service" component={DomainServicePage}/>
                        <Route path="service/task/taskEditFlow/:taskId/:taskName" component={TaskServiceEditFlowPage}/>
                        <Route path="service/task/serverMgt/:taskId/:taskName" component={ServerMgtPage}/>
                        <Route path="service/add/baseInfo/:taskId/:taskName(/:wsId)" component={AddServicePage}/>
                        <Route path="service/log/serverLog/:wsId/:wsName/:taskId/:taskName" component={ServerLogPage}/>
                        <Route path="service/task/shareLog/:taskId/:taskName" component={ShareLogPage}/>
                        <Route path="service/task/testWs/:taskName/:wsName/:wsUrl/:wsId/:taskId" component={TestWsPage}/>
                        <Route path="service/shareDataRecords/:modelId/:modelName" component={ShareDataRecords}/>

                        <Route path="versionManage" component={VersionMamentPage}/>
                        <Route path="versionManage/versionInfoList/:versionId/:versionName" component={VersionInfoList}/>

                        <Route path="version/:domainName/:modelName/:modelId/:entityName/:entityId/:versionName/:versionId" component={VersionInfoPage}/>
                        <Route path="system" component={SysMngPage}/>
                        <Route path="activiti" component={ActivitiMngPage}/>
                        <Route path="userMng" component={UserMngPage}/>
                        <Route path="roleMng" component={RoleMngPage}/>
                        <Route path="userPage/:roleId/:roleName" component={UserPage}/>
                        <Route path="authorPage/:userId/:userName/:userNo" component={AuthorPage}/>
                        <Route path="roleMng" component={RoleMngPage}/>
                        <Route path="roleAuthorPage/:roleId/:roleName" component={RoleAuthorPage}/>
                    </Route>
                    <Route path="login" component={LoginPage}/>
                </Router>
                <Alert id="alert" stack={{limit: 3}}/>
            </div>
        </Provider>,
        document.getElementById('mount')
    )
}


