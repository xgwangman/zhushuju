require("../../../../css/PageHeader.css");
require("../../../../css/QualityPageCss.css");
import  React, {Component, PropTypes} from "react";
import {createStructuredSelector} from "reselect";
import {Link, hashHistory} from 'react-router';
import {Breadcrumb, Tooltip, Icon, Button, Col, Row, Spin} from "antd";
import {connect} from "react-redux";
import EntityCheckList from "../component/EntityCheckList";
import Echarts_bar from "../component/Echarts_bar";
import {PickColumns} from '../../../common/components/PickColumns';
import {FilterCondition} from '../../../common/components/FilterCondition';
import EntityCheckListTable from '../component/EntityCheckListTable';
import {
    showEntityFilterCondition,
    setEntityConditionData,
    setEntityConditionList,
    filterEntityData,
    setShowEntityColumns,
    showAllEntityColumns,
    requestDataAuditRecord,
    setMemberDataTable,
    setEntityTableData,
    setEntityDataChange,
    setEntityTrendChange,
    getEntityId,
    getEntityName,
    getMemberId,
    requestEntityCheckList
} from '../actions';
import {
    selectQualityEntityTable,
    selectMonitorTableData,
    selectQualityReqData,
    selectEntityDataChange,
    selectGetEntityName,
    selectEntityTrendChange,
    selectMemberDataTable,
    selectEntityFilterViewStatus,
    selectEntityConditionData,
    selectEntityConditionList,
    selectShowEntityColumns,
    selectShowAllEntityColumns,
    selectEntityTableData,
    selectMemberDataId,
    selectUpDataEntityCheckList,
} from "../selectors";

export class EntityQualityCheckPage extends Component {
    constructor(props){
        super(props);
        //切换页面后，默认显示所有列（适应于渲染多个页面的情况）
        this.props.dispatch(showAllEntityColumns(true));
        //切换页面后，清空所有过滤条件
        this.props.dispatch(setEntityConditionList(null));
        let record = this.props.params;
        this.props.onEntityChangeData(record);
        this.props.onEntityTrendChange(record);
        this.props.onMemberDataTable(record);
        this.props.getMemberDataId(record);
        this.props.requestEntityCheckList(record);
    }
    state = {loading: setTimeout(()=>{this.setState({loading: false})}, 3000)}
    render (){
        const params = this.props.params;
        const entityDataList=this.props.entityDataList?this.props.entityDataList.titles:[];
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"quality"}>质量监控</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("quality/qualityEntity/"+ params.entId +'/'+ params.entName)}>{this.props.params.entName}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.entityName}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent "style={{marginLeft:10}}>
                    <div className="monitor_column_left">
                        最近一次监控时间：{this.props.getEntityTrendChange && this.props.getEntityTrendChange.startTime ? this.props.getEntityTrendChange.startTime : null}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        监控数据总量 {this.props.getEntityTrendChange && this.props.getEntityTrendChange.dateNum ? this.props.getEntityTrendChange.dateNum : 0}，
                        异常数据量 <span className="red">{this.props.getEntityTrendChange && this.props.getEntityTrendChange.dateErrorNum ? this.props.getEntityTrendChange.dateErrorNum : 0}</span>
                        <br/>
                        <p style={{borderBottom: '1px dashed #37c3b0'}}>最近一次监控质量数据明细</p>
                    </div>
                    <div style={{marginTop:60}}>
                        <Spin tip="加载中..." size="large" spinning={this.state.loading} style={{marginTop: "60px"}}>
                            <div className="ret">
                                {this.props.entityFilterShow ? (
                                    <div>
                                        <button id="fold" type="button" className="btn-css"
                                                style={{position: 'absolute', right: '0px'}}
                                                onClick={this.props.foldEntityFilterCondition}>收起
                                        </button>
                                    </div>
                                ) : (
                                    <button id="show" type="button" className="btn-css"
                                            style={{position: 'absolute', right: '0px'}}
                                            onClick={this.props.showEntityFilterCondition}>高级筛选
                                    </button>)
                                }
                            </div>
                            <FilterCondition
                                show={this.props.entityFilterShow}
                                dataList={entityDataList}
                                conditionList={this.props.entityConditionList}
                                changeCondition={this.onChangeEntityCondition.bind(this)}
                                onPlusCondition={this.onPlusEntityCondition.bind(this)}
                                deleteCondition={this.onDeleteEntityCondition.bind(this)}
                                clearAllCondition={this.onClearAllEntityCondition.bind(this)}
                            />
                            <PickColumns
                                dataList={this.props.entityDataList}
                                checkedList={this.props.showEntityColumns}
                                checkAll={this.props.showAllEntityColumns}
                                changeCheckColumns={this.props.onChangeCheckEntityColumns}
                                checkAllColumns={this.props.onCheckAllEntityColumns}
                            />
                            <EntityCheckListTable
                                dataList={this.props.entityDataList}
                                columns={this.props.showEntityColumns}
                                showAllColumns={this.props.showAllEntityColumns}
                                getMemberDataPage = {this.props.onMemberDataPage}
                                getMemberDataId = {this.props.getMemberDataId}
                                params={this.props.params}
                            />
                        </Spin>
                    </div>
                    <hr className="hr"></hr>
                    <div>
                        <div>
                            <p className="monitor_column_left"> {this.props.params.entityName}数据质量变化趋势</p>
                            <Echarts_bar
                                entityName = {this.props.entityName}
                                getEntityDataChange = {this.props.entityDataChange}
                            />
                        </div>
                        <hr className="hr"></hr>
                        <div className="monitor_column_left">
                            {this.props.entityName}数据质量监控日志
                        </div>
                        <div>
                            <EntityCheckList
                                getEntityDataTable = {this.props.getEntityDataTable}
                                getEntityTablePage = {this.props.onEntityTablePage}
                                getMemberDataId = {this.props.getMemberDataId}
                                params={this.props.params}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    /**
     * 输入或改变条件过滤组合框
     * @param value
     * @param type 条件的类型 id/operation/value
     * @
     */
    onChangeEntityCondition(value, type, option) {
        var me = this;
        var entityConditionData = this.props.entityConditionData;
        var conditionObject = {};
        // 深拷贝对象conditionObject
        $.extend(true, conditionObject, entityConditionData);
        if (type == "value") {
            conditionObject[type] = value.target.value;
        } else if (type == "operation") {
            conditionObject[type] = value;
            conditionObject["operationName"] = option.props.children;
        } else if (type == "id") {
            conditionObject[type] = value;
            conditionObject["name"] = option.props.children;
        }
        me.props.dispatch(setEntityConditionData(conditionObject));
    }
    /**
     * 添加条件
     */
    onPlusEntityCondition() {
        var me = this;
        var conditionData = this.props.entityConditionData;
        var conditionList = this.props.entityConditionList;
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
        me.props.dispatch(setEntityConditionList(conditionListObject));
        me.props.dispatch(filterEntityData(true));
    }
    /**
     * 删除条件
     */
    onDeleteEntityCondition(condition, index) {
        var me = this;
        var conditionList = this.props.entityConditionList;
        var conditionListObject = [];
        // 深拷贝对象conditionObject
        $.extend(true, conditionListObject, conditionList);
        conditionListObject.splice(index, 1);
        me.props.dispatch(setEntityConditionList(conditionListObject));
        me.props.dispatch(filterEntityData(true));
    }
    //清空全部条件
    onClearAllEntityCondition(evt) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        this.props.dispatch(setEntityConditionList(null));
        //添加条件后，请求过滤后的数据action: filterEntityData
        this.props.dispatch(filterEntityData(true));
    }

}
/**
 * *****************************************************************
 */
EntityQualityCheckPage.propTypes = {
    foldEntityFilterCondition:React.PropTypes.func,
    showEntityFilterCondition:React.PropTypes.func,
    onChangeCheckEntityColumns:React.PropTypes.func,
    onCheckAllEntityColumns:React.PropTypes.func,
    onClickToRequestApprovalRecord: React.PropTypes.func,
    onMemberDataTable: React.PropTypes.func,
    //onEntityTableData: React.PropTypes.func,
    onEntityChangeData :React.PropTypes.func,
    onEntityTrendChange: React.PropTypes.func,
    requestEntityCheckList: React.PropTypes.func,
};

/**
 * *****************************************************************
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        foldEntityFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showEntityFilterCondition(false));
            dispatch(setEntityConditionData(null));
        },
        showEntityFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showEntityFilterCondition(true));
        },
        onChangeCheckEntityColumns: (checked) => {
            dispatch(showAllEntityColumns(false));
            dispatch(setShowEntityColumns(checked));
        },
        onCheckAllEntityColumns: (evt, Allchecked) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAllEntityColumns(evt.target.checked));
            if (evt.target.checked == true) {
                dispatch(setShowEntityColumns(Allchecked));
            } else if (evt.target.checked == false) {
                dispatch(setShowEntityColumns(null));
            }
        },
        onClickToRequestApprovalRecord: (evt, id, record) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestDataAuditRecord({attId: id, uuid: record.UUID}));
        },
        onMemberDataPage: (action) => {
            dispatch(setMemberDataTable(action))
        },
        onMemberDataTable: (evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            let memberPage = {
                id: evt,
                page:1,
                limit:10
            }
            dispatch(setMemberDataTable(memberPage))
        },
        onEntityTablePage:(evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestEntityCheckList(evt))
        },
        onEntityChangeData :(evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setEntityDataChange(evt.entityId))
        },
        onEntityTrendChange: (evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setEntityTrendChange(evt))
            dispatch(getEntityId(evt))
            dispatch(getEntityName(evt.entityName))
        },
        getMemberDataId: (evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(getMemberId(evt.entityId))
        },
        requestEntityCheckList: (evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            let entityCheckList={
                id:evt,
                page:1,
                limit:10
            }
            dispatch(requestEntityCheckList(entityCheckList))
        },
    }
}

/**
 * *****************************************************************
 */

const mapStateToProps = createStructuredSelector({
    entityDataList: selectMemberDataTable(),
    getEntityQualityTable: selectQualityEntityTable(),
    monitorTableData:selectMonitorTableData(),
    getQualityReqData:selectQualityReqData(),
    entityDataChange: selectEntityDataChange(),
    entityName: selectGetEntityName(),
    getEntityTrendChange: selectEntityTrendChange(),
    entityFilterShow: selectEntityFilterViewStatus(),
    entityConditionData: selectEntityConditionData(),
    entityConditionList: selectEntityConditionList(),
    showEntityColumns: selectShowEntityColumns(),
    showAllEntityColumns: selectShowAllEntityColumns(),
    getEntityDataTable: selectUpDataEntityCheckList(),
    getMemberDataId :selectMemberDataId()
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityQualityCheckPage);