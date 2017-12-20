require("../../../../css/DomainPageCss.css");
import React, {Component, PropTypes} from 'react';
const uuidV4 = require('uuid/v4');
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import AppElement from '../component/AppElement';
import AddApp from '../component/AddApp';
import {selectAppDataList, selectShowAppEdit, selectAppAttr, selectModelKey} from '../selectors';
import {
    requestAppData,
    requestAppSearch,
    showAppCreate,
    setAppAttr,
    onSaveApp,
    onDeleteApp,
    setReqAppData,
    setModalKey
} from '../actions';

export class IntegrationPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestAppList();
    }
    state = {searchValue: ''};
    searchChange=(e)=>{
        this.setState({
            searchValue: e.target.value
        })
            this.props.requestAppSearch(e.target.value);
    };
    render() {
        let currentAppAttr = {
            id: '',
            name: '',
            remark: ''
        };
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>集成管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="请输入应用系统名称"
                               onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">
                <button type="button" className="btn-css"
                        onClick={(e) => this.props.showAppCreate(e, currentAppAttr)}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加应用系统
                </button>
                <AppElement dataList={this.props.appDataList}
                            deleteApp={this.props.onClickDeleteApp}
                            updateApp={this.props.onUpdateApp}
                            requestUpDataSrc={this.props.requestUpDataSrc}
                            requestDownDataSrc={this.props.requestDownDataSrc}
                >
                </AppElement>
                <AddApp show={this.props.showAppEdit}
                        hide={this.props.hideAppEdit}
                        dataList={this.props.appDataList}
                        modalKey={this.props.modalKey}
                        modalState={this.props.appModalState}
                        onSaveApp={this.props.onSaveApp}
                        onChangeAttr={this.onChangeAttr.bind(this)}
                        appAttribute={this.props.appAttr}/>
            </div>
            </div>
        )
    }

    /**
     * change属性后，更新state中应用系统属性对象
     * @param evt
     * @param type 属性标识
     */
    onChangeAttr(evt, type) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        var stateApp = this.props.appAttr;
        var newAppAttr = {};
        // 深拷贝对象stateApp
        $.extend(true, newAppAttr, stateApp);
        newAppAttr[type] = evt.target.value;
        this.props.dispatch(setAppAttr(newAppAttr));
    }
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
IntegrationPage.propTypes = {
    requestAppList: React.PropTypes.func,
    showAppCreate: React.PropTypes.func,
    hideAppEdit: React.PropTypes.func,
    onSaveApp: React.PropTypes.func,
    onClickDeleteApp: React.PropTypes.func,
    requestUpDataSrc: React.PropTypes.func,
    requestDownDataSrc: React.PropTypes.func,
    requestAppSearch: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestAppList: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestAppData(evt));
        },
        requestAppSearch: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestAppSearch(evt));
        },
        showAppCreate: (evt, app) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAppCreate(true));
            dispatch(setAppAttr(app));
        },
        hideAppEdit: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAppCreate(false));
            let modalKey = uuidV4();
            dispatch(setModalKey(modalKey));
        },
        onSaveApp: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onSaveApp(evt));
        },
        onUpdateApp: (evt, app) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAppCreate(true));
            var editApp = {
                id: app.id,
                name: app.name,
                remark: app.remark,
            };
            dispatch(setAppAttr(editApp));
        },
        onClickDeleteApp: (evt, appId) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onDeleteApp(appId));
        },
        requestUpDataSrc: (evt, app) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setReqAppData({appId: app.id, appName: app.name, direct: "UP"}));
        },
        requestDownDataSrc: (evt, app) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setReqAppData({appId: app.id, appName: app.name, direct: "DOWN"}));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    appDataList: selectAppDataList(),
    showAppEdit: selectShowAppEdit(),
    appAttr: selectAppAttr(),
    modalKey: selectModelKey(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(IntegrationPage);