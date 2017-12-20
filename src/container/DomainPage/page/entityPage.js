require("../../../../css/PageHeader.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';
import {Link, router} from 'react-router';
import {createStructuredSelector} from 'reselect';
const moment = require('moment');
const uuidV4 = require('uuid/v4');
import {SearchBox} from '../../../common/components/SearchBox';
import EntityListTable from '../component/EntityListTable';
import AddVersion from '../component/AddVersion';
import {
    selectDomainData,
    selectModelData,
    selectEntityList,
    selectEntityData,
    selectShowAddVersion,
    selectVersionData,
    selectModalKey
} from '../selectors';
import {
    onRequestEntityList,
    setEntityAttr,
    showAddVersion,
    setVersionData,
    onSaveVersion,
    setModalKey,
    setEntityDataType,
    onChangeStatus,
    setEntityTaskType
} from '../actions';

export class entityPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestEntityList({modelId:this.props.params.modelId,page:1,limit:15,nameLike:''});
    }

    render() {
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/main">
                                {this.props.params.domainName}({this.props.params.modelName})
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>实体管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="实体名称" onChange={(e)=>{this.props.requestEntityList({modelId:this.props.params.modelId,page:1,limit:15,nameLike:e.target.value});}}/>
                </div>
                <div className="centerContent">
                    <EntityListTable dataList={this.props.entityList}
                                     domainName={this.props.params.domainName}
                                     modelId={this.props.params.modelId}
                                     modelName={this.props.params.modelName}
                                     changeStatus={this.props.onChangeStatus}
                                     clickAttrLink={this.props.onClickAttrLink}
                                     clickEntityDataNum={this.props.onClickEntityDataNum}
                                     requestAllVersion={this.props.onRequestAllVersion}
                                     addEntityVersion={this.props.clickAddEntityVersion}
                                     clickEntityDataGatherNum={this.props.clickEntityDataGatherNum}
                                     clickEntityGatherTask={this.props.clickEntityGatherTask}
                                     clickEntityShareTask={this.props.clickEntityShareTask}
                                     requestEntityList={this.props.requestEntityList}
                    />
                    <AddVersion show={this.props.show}
                                hide={this.props.hideAddVersion}
                                modalKey={this.props.modalKey}
                                version={this.props.versionData}
                                onSaveVersion={this.props.onSaveVersion}
                                onChangeVersionAttr={this.onChangeVersionAttr.bind(this)}
                    >
                    </AddVersion>
                </div>
            </div>
        );

    }

    /**
     * 实时改变版本的数据
     * @param evt
     * @param type
     */
    onChangeVersionAttr(evt, type) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        let versionData = this.props.versionData;
        let versionObj = [];
        $.extend(true, versionObj, versionData);
        versionObj[type] = evt.target.value;
        this.props.dispatch(setVersionData(versionObj));
        if (type == "versionNo") {
            //@todo 这里判断该版本号是否已经存在
        }
    }
}
/**
 *
 */
entityPage.propTypes = {
    onClickAttrLink: React.PropTypes.func,
    onClickEntityDataNum: React.PropTypes.func,
    show: React.PropTypes.bool,
    hideAddVersion: React.PropTypes.func,
    onSaveVersion: React.PropTypes.func,
    clickEntityDataGatherNum: React.PropTypes.func,
    onChangeStatus: React.PropTypes.func,
    clickEntityGatherTask: React.PropTypes.func,
    clickEntityShareTask: React.PropTypes.func,
};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestEntityList: (evt) => {
            dispatch(onRequestEntityList(evt));
        },
        onClickAttrLink: (evt, entity) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setEntityAttr(entity));
        },
        onChangeStatus: (checked, record) => {
            dispatch(onChangeStatus({status: checked, id: record.id}));
        },
        onClickEntityDataNum: (evt, entity) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setEntityAttr(entity));
            dispatch(setEntityDataType("data"));
        },
        clickAddEntityVersion: (evt, entity) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            // let modalKey = uuidV4();
            // dispatch(setModalKey(modalKey));
            let now = moment().format('YYYYMMDDHHmmss');
            dispatch(setVersionData({versionNo: entity.name + '-' + now, remark: ' '}));
            dispatch(showAddVersion(true));
            dispatch(setEntityAttr(entity));
        },
        hideAddVersion: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAddVersion(false));
            let modalKey = uuidV4();
            dispatch(setModalKey(modalKey));
        },
        onSaveVersion: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onSaveVersion(true));
        },
        onRequestAllVersion: (evt, entity) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setEntityAttr(entity));
        },
        clickEntityDataGatherNum: (evt, entity) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setEntityAttr(entity));
            dispatch(setEntityDataType("gatherData"));
        },
        clickEntityGatherTask: (evt, entity) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setEntityAttr(entity));
            dispatch(setEntityTaskType("gather"));
        },
        clickEntityShareTask: (evt, entity) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setEntityAttr(entity));
            dispatch(setEntityTaskType("share"));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    domainData: selectDomainData(),
    modelData: selectModelData(),
    entityData: selectEntityData(),
    entityList: selectEntityList(),
    show: selectShowAddVersion(),
    versionData: selectVersionData(),
    modalKey: selectModalKey(),
});

export default connect(mapStateToProps, mapDispatchToProps)(entityPage);