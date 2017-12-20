import React, {Component, PropTypes} from 'react';
import {Breadcrumb,Row,Col} from 'antd';
import {Link, router} from 'react-router';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {PickColumns} from '../../../common/components/PickColumns';
import {FilterCondition} from '../../../common/components/FilterCondition';
import ServiceDataListTable from "../component/ServiceDataListTable";
import {showSelectCondition,requestShareData,setConditionData,setConditionList,showAllColumns,setShowColumns,

} from "../actions";
import {selectShowCondition,selectShareListData,selectConditionData,selectConditionList,selectShowAllColumns,
        selectShowColumns

} from"../selectors"

export class ShareDataRecords extends Component {
    constructor(props) {
        super(props)
        this.props.requestShareData({taskId:this.props.params.modelId,limit:15,page:1});
        //切换页面后，默认（适应于渲染多个页面的情况）
        this.props.dispatch(showAllColumns(true));
        this.props.dispatch(showSelectCondition(false));
    }
    render() {
        return (
               <div>
                   <div className="xp-header ret">
                       <Row>
                           <Col span={18}>
                               <Breadcrumb >
                                   <Breadcrumb.Item>
                                       <Link to="/service"> 共享管理({this.props.params.modelName})</Link>
                                   </Breadcrumb.Item>
                               </Breadcrumb>
                           </Col>
                           <Col span={6}>
                               <div className="pull-right" style={{display:'inline-block',marginTop:80}}>
                                       <span>
                                            <button type="button" className="btn-css"
                                                    onClick={()=>{window.location.href='share/num/mdexport.do?taskId='+this.props.params.modelId}}>
                                                导出
                                            </button>&nbsp;&nbsp;&nbsp;
                                        </span>
                                   {this.props.conditionShow ?
                                       (
                                       <button type="button" className="btn-css" onClick={this.props.foldSelectCondition}>收起
                                       </button>
                                        ) : (
                                       <button type="button" className="btn-css" onClick={this.props.showSelectCondition}>高级筛选
                                       </button>)}
                                   &nbsp;&nbsp;&nbsp;
                               </div>
                           </Col>
                       </Row>
                   </div>
                   <div className="centerContent">
                      <FilterCondition show={this.props.conditionShow}
                                        dataList={this.props.dataList?this.props.dataList.result.titles:[]}
                                        conditionList={this.props.conditionList}
                                        changeCondition={this.onChangeCondition.bind(this)}
                                        onPlusCondition={this.onPlusCondition.bind(this)}
                                        deleteCondition={this.onDeleteCondition.bind(this)}
                                        clearAllCondition={this.onClearAllCondition.bind(this)}
                       />
                      <PickColumns dataList={this.props.dataList?this.props.dataList.result:[]}
                                    checkedList={this.props.showColumns}
                                    checkAll={this.props.showAllColumns}
                                    changeCheckColumns={this.props.onChangeCheckColumns}
                                    checkAllColumns={this.props.onCheckAllColumns}
                       />
                        <ServiceDataListTable
                            taskId={this.props.params.modelId}
                            dataList={this.props.dataList}
                            columns={this.props.showColumns}
                            showAllColumns={this.props.showAllColumns}
                            requestShareData={this.props.requestShareData}/>
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
        var taskId=this.props.params.modelId;
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
        //添加条件后，请求过滤后的数据action
        me.props.dispatch(requestShareData({taskId:taskId,page:1,limit:15,}));
    }

    /**
     * 删除条件
     */
    onDeleteCondition(condition, index) {
        var me = this;
        var taskId=this.props.params.modelId;
        var conditionList = this.props.conditionList;
        var conditionListObject = [];
        // 深拷贝对象conditionObject
        $.extend(true, conditionListObject, conditionList);
        conditionListObject.splice(index, 1);
        me.props.dispatch(setConditionList(conditionListObject));

        me.props.dispatch(requestShareData({taskId:taskId,page:1,limit:15,}));

    }

    //清空全部条件
    onClearAllCondition(evt) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        var taskId=this.props.params.modelId;
        this.props.dispatch(setConditionList(null));
        //请求过滤后的数据action：filterEntityData
        this.props.dispatch(requestShareData({taskId:taskId,page:1,limit:15,}));
    }
}

ShareDataRecords.propTypes = {
    requestShareData:React.PropTypes.func,
    onCheckAllColumns:React.PropTypes.func,
    onChangeCheckColumns:React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestShareData: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestShareData(evt));
        },
        foldSelectCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showSelectCondition(false));
            dispatch(setConditionData(null));
        },
        showSelectCondition:(evt)=>{
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showSelectCondition(true));
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
        onChangeCheckColumns: (checked) => {
            dispatch(showAllColumns(false));
            dispatch(setShowColumns(checked));
        },
    }
}

const mapStateToProps = createStructuredSelector({
    conditionShow:selectShowCondition(),
    dataList:selectShareListData(),
    conditionData:selectConditionData(),
    conditionList:selectConditionList(),
    showAllColumns: selectShowAllColumns(),
    showColumns: selectShowColumns(),
});
export default connect(mapStateToProps,mapDispatchToProps)(ShareDataRecords);