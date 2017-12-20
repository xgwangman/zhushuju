require("../../../../css/PageHeader.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb,Row,Col} from 'antd';
import {Link, router} from 'react-router';
import {createStructuredSelector} from 'reselect';
import alert from '../../../common/utils/alert';
import {Button} from 'antd';
import {SearchBox} from '../../../common/components/SearchBox';
import {PickColumns} from '../../../common/components/PickColumns';
import {FilterCondition} from '../../../common/components/FilterCondition';
import EntityDataListTable from '../component/EntityDataListTable';
import AuditDataRecordModal from '../component/AuditDataRecordModal';
import {
    selectDomainData,
    selectModelData,
    selectEntityData,
    selectEntityDataList,
    selectFilterViewStatus,
    selectConditionData,
    selectConditionList,
    selectShowColumns,
    selectShowAllColumns,
    selectDataType,
    selectAuditShowStatus,
    selectAuditDataList,
    selectFilterDataList
} from '../selectors';
import {
    onRequestEntityDataList,
    showFilterCondition,
    setConditionData,
    setConditionList,
    filterEntityData,
    setShowColumns,
    showAllColumns,
    onRequestEntityGatherDataList,
    showAuditDataModal,
    requestDataAuditRecord,
    exportAuditDataRecord,
    filterEntityAuditData,
    requestFilterData,
    approveEntity,
} from '../actions';

export class entityDataPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        let {dataType,entityId}=this.props.params;
        if (dataType == "data") {
            this.props.requestEntityDataList({entityId:entityId,page:1,limit:15});
        } else if (dataType == "gatherData") {
            this.props.requestEntityGatherDataList({entityId:entityId,page:1,limit:15});
        }
        this.props.requestFilterConditionData(entityId);
        //切换页面后，默认显示所有列（适应于渲染多个页面的情况）
        this.props.dispatch(showAllColumns(true));
        this.props. dispatch(showFilterCondition(false));
        //切换页面后，清空所有过滤条件
        //this.props.dispatch(setConditionList(null));
        //this.props.dispatch(setConditionList(null));
    }
    componentWillUnmount(){
        this.props.foldFilterCondition();
        this.props.dispatch(setConditionList(null));
    }
    render() {
        let {domainName,modelName,entityName,entityId,modelId,dataType} =this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Row>
                        <Col span={18}>
                            <Breadcrumb >
                                <Breadcrumb.Item>
                                    <Link to="/main">{domainName}({modelName})</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to={encodeURI("/main/entity/"+domainName+'/'+modelName+'/'+modelId)}>{entityName}</Link>
                                </Breadcrumb.Item>
                                {(dataType == "data") ?
                                    (<Breadcrumb.Item>实体数据管理</Breadcrumb.Item>)
                                    :
                                    (<Breadcrumb.Item>审批实体数据管理</Breadcrumb.Item>)}
                            </Breadcrumb>
                        </Col>
                        <Col span={6}>
                            <div className="pull-right" style={{display:'inline-block',marginTop:80}}>
                                {dataType == "gatherData" ?
                                    <span>
                                <button type="button" className="btn-css"
                                        onClick={()=>this.props.approveEntityData(1,{entityId:entityId,domainName:domainName,modelName:modelName,modelId:modelId})}>
                                    审批
                                </button>&nbsp;&nbsp;&nbsp;
                                        <button type="button" className="btn-css"
                                                onClick={()=>this.props.approveEntityData(0,{entityId:entityId,domainName:domainName,modelName:modelName,modelId:modelId})}>
                                    驳回
                                </button>&nbsp;&nbsp;&nbsp;
                            </span>
                                    :'' }
                                {dataType == "data" ?
                                    <span>
                                <button type="button" className="btn-css"
                                        onClick={()=>{window.location.href='md/masterdata/mdexport.do?entityId='+entityId}}>
                                    导出
                                </button>&nbsp;&nbsp;&nbsp;
                            </span>
                                    :'' }
                                {this.props.filterShow ? (
                                        <button type="button" className="btn-css" onClick={this.props.foldFilterCondition}>收起
                                        </button>
                                    ) : (
                                        <button type="button" className="btn-css" onClick={this.props.showFilterCondition}>高级筛选
                                        </button>)}
                                &nbsp;&nbsp;&nbsp;
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="centerContent">
                    <FilterCondition show={this.props.filterShow}
                                     dataList={this.props.filterDataList}
                                     conditionList={this.props.conditionList}
                                     changeCondition={this.onChangeCondition.bind(this)}
                                     onPlusCondition={this.onPlusCondition.bind(this)}
                                     deleteCondition={this.onDeleteCondition.bind(this)}
                                     clearAllCondition={this.onClearAllCondition.bind(this)}
                    />
                    <PickColumns dataList={this.props.entityDataList?this.props.entityDataList.result:[]}
                                 checkedList={this.props.showColumns}
                                 checkAll={this.props.showAllColumns}
                                 changeCheckColumns={this.props.onChangeCheckColumns}
                                 checkAllColumns={this.props.onCheckAllColumns}
                    />
                    <EntityDataListTable dataType={dataType}
                                         entityId={entityId}
                                         dataList={this.props.entityDataList}
                                         columns={this.props.showColumns}
                                         showAllColumns={this.props.showAllColumns}
                                         onChangePage={this.onChangePage}
                                         requestEntityDataList={this.props.requestEntityDataList}
                                         requestEntityGatherDataList={this.props.requestEntityGatherDataList}
                                         clickToRequestApprovalRecord={this.props.onClickToRequestApprovalRecord}
                    />
                    <AuditDataRecordModal show={this.props.auditModalShow}
                                          hide={this.props.closeAuditDataModal}
                                          dataList={this.props.auditDataRecord}
                                          exportAuditDataRecord={this.props.exportAuditDataRecord}
                    />
                </div>
            </div>
        );
    }
    /**
     * 分页
     * @param page
     */
    onChangePage=(page)=>{
        let {dataType,entityId} = this.props.params;
        let data={entityId:entityId, page:page.current, limit:page.pageSize};
        if(dataType=="data"){
            this.props.dispatch(filterEntityData(data));
        }else{
            this.props.dispatch(filterEntityAuditData(data));
        }
    }
    /**
     * 输入或改变条件过滤组合框
     * @param value
     * @param type 条件的类型 id/operation/value
     * @
     */
    onChangeCondition(value, type, option) {
        var me = this;
        var conditionData = this.props.conditionData;
        var conditionObject = {};
        // 深拷贝对象conditionObject
        $.extend(true, conditionObject, conditionData);
        if (type == "value") {
            conditionObject[type] = value.target.value;
        } else if (type == "operation") {
            conditionObject[type] = value;
            conditionObject["operationName"] = option.props.children;
        } else if (type == "id") {
            conditionObject[type] = value;
            conditionObject["name"] = option.props.children;
        }
        me.props.dispatch(setConditionData(conditionObject));
    }

    /**
     * 添加条件
     */
    onPlusCondition() {
        var me = this;
        var {entityId}=this.props.params;
        var data={entityId:entityId, page:1, limit:15};
        var conditionData = this.props.conditionData;
        var conditionList = this.props.conditionList;
        var conditionObject = {};
        var conditionListObject = [];
        // 深拷贝对象conditionObject
        $.extend(true, conditionObject, conditionData);
        if (!conditionObject.id) {
            alert("当前条件的属性没有填写", 'error');
            return;
        } else if (!conditionObject.operation) {
            alert("当前条件的条件没有填写", 'error');
            return;
        } else if (!conditionObject.value) {
            alert("当前条件的值没有填写", 'error');
            return;
        }
        $.extend(true, conditionListObject, conditionList);
        conditionListObject.push(conditionObject);
        me.props.dispatch(setConditionList(conditionListObject));

        // 如果是实体数据页面，添加条件后，请求过滤后的数据action：filterEntityData
        if (me.props.params.dataType == "data") {
            me.props.dispatch(filterEntityData(data));
        } else if (me.props.params.dataType == "gatherData") {
            // 如果是实体审计数据页面，添加条件后，请求过滤后的数据action：filterEntityAuditData
            me.props.dispatch(filterEntityAuditData(data));
        }
    }

    /**
     * 删除条件
     */
    onDeleteCondition(condition, index) {
        var me = this;
        var {entityId}=this.props.params;
        var data={entityId:entityId, page:1, limit:15};
        var conditionList = this.props.conditionList;
        var conditionListObject = [];
        // 深拷贝对象conditionObject
        $.extend(true, conditionListObject, conditionList);
        conditionListObject.splice(index, 1);
        me.props.dispatch(setConditionList(conditionListObject));
        if (me.props.params.dataType == "data") {
            me.props.dispatch(filterEntityData(data));
        } else if (me.props.params.dataType == "gatherData") {
            // 如果是实体审计数据页面，添加条件后，请求过滤后的数据action：filterEntityAuditData
            me.props.dispatch(filterEntityAuditData(data));
        }
    }

    //清空全部条件
    onClearAllCondition(evt) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        var {entityId}=this.props.params;
        var data={entityId:entityId, page:1, limit:15};
        this.props.dispatch(setConditionList(null));
        // 如果是实体数据页面，添加条件后，请求过滤后的数据action：filterEntityData
        if (this.props.params.dataType == "data") {
            this.props.dispatch(filterEntityData(data));
        } else if (this.props.params.dataType == "gatherData") {
            // 如果是实体审计数据页面，添加条件后，请求过滤后的数据action：filterEntityAuditData
            this.props.dispatch(filterEntityAuditData(data));
        }
    }
}

/**
 *
 */
entityDataPage.propTypes = {
    requestEntityDataList: React.PropTypes.func,
    showFilterCondition: React.PropTypes.func,
    foldFilterCondition: React.PropTypes.func,
    onPlusCondition: React.PropTypes.func,
    onClearAllCondition: React.PropTypes.func,
    exportEntityData: React.PropTypes.func,
    onCheckAllColumns: React.PropTypes.func,
    requestEntityGatherDataList: React.PropTypes.func,
    onClickToRequestApprovalRecord: React.PropTypes.func,
};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestEntityDataList: (evt) => {
            dispatch(onRequestEntityDataList(evt));
        },
        requestEntityGatherDataList: (evt) => {
            dispatch(onRequestEntityGatherDataList(evt));
        },
        showFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showFilterCondition(true));
        },
        onPlusCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(filterEntityData(true));
        },
        foldFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showFilterCondition(false));
            dispatch(setConditionData(null));
        },
        onChangeCheckColumns: (checked) => {
            dispatch(showAllColumns(false));
            dispatch(setShowColumns(checked));
        },
        onCheckAllColumns: (evt, Allchecked) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAllColumns(evt.target.checked));
            if (evt.target.checked == true) {
                dispatch(setShowColumns(Allchecked));
            } else if (evt.target.checked == false) {
                dispatch(setShowColumns(null));
            }
        },
        onClickToRequestApprovalRecord: (entityId, id, uuid) => {
            dispatch(requestDataAuditRecord({entityId:entityId,attId: id, uuid:uuid}));
        },
        closeAuditDataModal: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAuditDataModal(false));
        },
        exportAuditDataRecord: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(exportAuditDataRecord(false));
        },
        requestFilterConditionData: (evt) => {
            dispatch(requestFilterData(evt));
        },
        approveEntityData: (flag,entityId) => {
            dispatch(approveEntity(flag,entityId))
        },
    };
}


const mapStateToProps = createStructuredSelector({
    domainData: selectDomainData(),
    modelData: selectModelData(),
    entityData: selectEntityData(),
    entityDataList: selectEntityDataList(),
    filterShow: selectFilterViewStatus(),
    conditionData: selectConditionData(),
    conditionList: selectConditionList(),
    filterDataList: selectFilterDataList(),
    showColumns: selectShowColumns(),
    showAllColumns: selectShowAllColumns(),
    dataType: selectDataType(),
    auditModalShow: selectAuditShowStatus(),
    auditDataRecord: selectAuditDataList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(entityDataPage);