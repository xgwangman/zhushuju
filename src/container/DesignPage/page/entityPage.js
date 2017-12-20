require("bootstrap/dist/css/bootstrap.css");
require("../../../../css/PageHeader.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb,Modal} from 'antd';
import {Link, router} from 'react-router';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import EntityListTable from '../component/EntityListTable';
import AddEntity from '../component/AddEntity';
import {
    selectEntityList,
    selectShowEntityModal,
    selectEntityName,
    selectEntityAttr,
    selectDomainAttribute,
    selectClickModel
} from '../selectors';
import {
    showEntityCreate,
    onSaveEntity,
    onChangeEntityName,
    onChangeEntityDesc,
    setEntityAttr,
    onDeleteEntity,
    onRequestAllVersion,
    onClickModelAction,
    onChangeStatus,
} from '../actions';

export class entityPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            defaultLimit:10,
            searchValue:'',
            current:1
        }
        this.props.requestEntityList({
            modelId:this.props.params.modelId,
            page:1,
            limit:15,
            nameLike:''
        })
    }
    searchValueChange=(e)=>{
        this.setState({
            searchValue:e.target.value
        });
        let searchRequestData={
            modelId:this.props.params.modelId,
            nameLike:e.target.value,
            limit:this.state.defaultLimit,
            page:1,
        };
        this.props.requestEntityList(searchRequestData)
    };
    pageOnchange=(page,pageSize)=>{
        this.setState({
            current:page,
        });
        let searchRequestData = {
            modelId:this.props.params.modelId,
            page:page,
            limit:pageSize,
            nameLike:this.state.searchValue
        }
        this.props.requestEntityList(searchRequestData)
    };
    showEntityCreate=(currentEntityAttr)=>{
        this.setState({
            defaultLimit:10,
            current:1
        });
        this.props.showEntityCreate(currentEntityAttr)
    };
     domainName=this.props.params.domainName;
     modelName=this.props.params.modelName;
     modelId=this.props.params.modelId;
    render() {
        // 新增数据子集的数据格式
        let currentEntityAttr = {
            modelId: '',
            id: '',
            name: '',
            remark: '',
        };
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb className="">
                        <Breadcrumb.Item><Link to="/design">
                            {this.props.params.domainName}({this.props.params.modelName})
                        </Link></Breadcrumb.Item>
                        <Breadcrumb.Item>实体管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="实体名称"
                               onChange={this.searchValueChange}
                    />
                </div>
                <div className="centerContent ">
                    <button type="button" className="btn-css"
                            onClick={() => this.showEntityCreate(currentEntityAttr)}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加实体
                    </button>
                    <EntityListTable dataList={this.props.entityList}
                                     deleteEntity={this.props.deleteEntity}
                                     changeStatus={this.onChangeStatus}
                                     UpdateEntity={this.props.onUpdateEntity}
                                     requestAllVersion={this.props.onRequestAllVersion}
                                     requestEntityList={this.props.requestEntityList}
                                     limit={this.state.defaultLimit}
                                     current={this.state.current}
                                     pageOnchange={this.pageOnchange}
                                     domainName={this.domainName}
                                     modelName={this.modelName}
                                     modelId={this.modelId}
                    />
                    <AddEntity show={this.props.showEditEntity}
                               hide={this.props.hideEditEntity}
                               showEntity={this.props.hideEditEntity}
                               onSaveEntity={this.props.onSaveEntity}
                               onSetTableVal ={this.setTableValues}
                               entityAttr={this.props.entityAttr}/>
                </div>
            </div>
        );

    }
    setTableValues=(values)=>{
        values.id = this.props.entityAttr.id;
        this.props.dispatch(setEntityAttr(values));
    };
    onChangeStatus=(checked, record)=> {
        this.props.dispatch(onChangeStatus({status:checked, id: record.id,modelId:this.props.params.modelId}));
};

}
/**
 *
 */
entityPage.propTypes = {
    showEntityCreate: React.PropTypes.func,
    hideEditEntity: React.PropTypes.func,
    onChangeDescription: React.PropTypes.func,
    onChangeEntityName: React.PropTypes.func,
    onSaveEntity: React.PropTypes.func,
    onChangeStatus: React.PropTypes.func,
    onUpdateEntity: React.PropTypes.func,
    setClickEntityData: React.PropTypes.func,
    onRequestAllVersion: React.PropTypes.func,
};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestEntityList: (pagination) => {
            dispatch(onClickModelAction(pagination));
        },
        showEntityCreate: (entity) => {
            dispatch(showEntityCreate(true));
            dispatch(setEntityAttr(entity));
        },
        hideEditEntity: (domain) => {
            dispatch(showEntityCreate(false));
        },
        onChangeDescription: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onChangeEntityDesc(evt.target.value));
        },
        onChangeEntityName: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onChangeEntityName(evt.target.value));
        },
        onSaveEntity: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onSaveEntity(true));
        },
        onUpdateEntity: (evt, record)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showEntityCreate(true));
            var entityAttr = {
                modelId: '',
                id: record.id,
                name: record.name,
                remark: record.remark,
                code:record.code
            };
            dispatch(setEntityAttr(entityAttr));
        },
        onRequestAllVersion: (evt,record)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();

            dispatch(onRequestAllVersion(record.id));
        },

        deleteEntity :(evt,record)=>{
        Modal.confirm({
            title: '你确定要删除实体：'+record.name+'？',
            onOk() {
                dispatch(onDeleteEntity({entityId:record.id,modelId:record.modelId}));
            },
            onCancel() {
            }
        })
    },

    };
}


const mapStateToProps = createStructuredSelector({
    domainAttr: selectDomainAttribute(),
    modelAttr: selectClickModel(),
    showEditEntity: selectShowEntityModal(),
    entityName: selectEntityName(),
    entityList: selectEntityList(),
    entityAttr: selectEntityAttr(),
});

export default connect(mapStateToProps, mapDispatchToProps)(entityPage);