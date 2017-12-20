import React, {Component, PropTypes} from 'react';
import {Breadcrumb,Input,Button} from 'antd';
import {Link, router} from 'react-router';
import '../css/index.css'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import VersionCheckPageTable from '../component/VersionCheckPageTable'
const Search = Input.Search;
import {PickColumns} from '../../../common/components/PickColumns';
import {FilterCondition} from '../../../common/components/FilterCondition';
import {
    getFilterCondtion,
    showAllVersionColumns,
    setShowVersionColumns,
    showVersionFilterCondition,
    setVersionConditionData,
    setVersionConditionList,
    filterVersionData} from '../actions';
import {
    selectVersionName,
    selectShowAllVersionColumns ,
    selectSetShowColumns,
    selectVersionTitle,
    selectVersionCheckPage,
    selectFilterCondtions,
    selectShowVersionColumns,
    selectVersionFilterViewStatus,
    selectVersionConditionData,
    selectVersionConditionList} from '../selectors';
export class VersionInfoPage extends Component {
    constructor(props) {
        super(props);
        this.props.filterVersionData({versionId:this.props.params.versionId,page:1,limit:15});
        this.props. dispatch(showVersionFilterCondition(false));
    }
    render() {
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item className="titleFontSize"><Link to="/versionManage">版本管理</Link></Breadcrumb.Item>
                        <Breadcrumb.Item className="titleFontSize">{this.props.params.versionName}-版本信息</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div  className="centerContent ">

                {this.props.versionFilterShow ? (
                    <div style={{position: "relative"}}>
                        <button type="button" className="btn-css"
                                style={{position: 'absolute', right: '50px', marginTop: '10px'}}
                                onClick={this.props.foldVersionFilterCondition}>
                            收起
                        </button>
                    </div>
                ) : (
                    <div style={{position: "relative"}}>
                        <button type="button" className="btn-css"
                                style={{position: 'absolute', right: '50px', marginTop: '10px'}}
                                onClick={this.props.showVersionFilterCondition}>
                            高级筛选
                        </button>
                    </div>
                    )
                }
                <FilterCondition
                    show={this.props.versionFilterShow}
                    dataList={this.props.versionTitle}
                    conditionList={this.props.versionConditionList}
                    changeCondition={this.onChangeVersionCondition.bind(this)}
                    onPlusCondition={this.onPlusVersionCondition.bind(this)}
                    deleteCondition={this.onDeleteVersionCondition.bind(this)}
                    clearAllCondition={this.onClearAllVersionCondition.bind(this)}
                />

                <PickColumns
                    dataList={this.props.versionCheckPage.result}
                    checkedList={this.props.showVersionColumns}
                    checkAll={this.props.showAllVersionColumns}
                    changeCheckColumns={this.props.onChangeCheckVersionColumns}
                    checkAllColumns={this.props.onCheckAllVersionColumns}
                />

                <VersionCheckPageTable
                    versionData={this.props.versionCheckPage}
                    columns={this.props.showVersionColumns}
                    showAllColumns={this.props.showAllVersionColumns}
                    filterVersionData={this.props.filterVersionData}
                    params={this.props.params}
                />
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
    onChangeVersionCondition(value, type, option) {
        var me = this;
        var versionConditionData = this.props.versionConditionData;
        var conditionObject = {};
        // 深拷贝对象conditionObject
        $.extend(true, conditionObject, versionConditionData);
        if (type == "value") {
            conditionObject[type] = value.target.value;
        } else if (type == "operation") {
            conditionObject[type] = value;
            conditionObject["operationName"] = option.props.children;
        } else if (type == "id") {
            conditionObject[type] = value;
            conditionObject["name"] = option.props.children;
        }
        me.props.dispatch(setVersionConditionData(conditionObject));
    }
    /**
     * 添加条件
     */
    onPlusVersionCondition() {
        var me = this;
        var conditionData = this.props.versionConditionData;
        var conditionList = this.props.versionConditionList;
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
        me.props.dispatch(setVersionConditionList(conditionListObject));
        me.props.dispatch(filterVersionData({versionId:this.props.params.versionId,page:1,limit:15}));
    }
    /**
     * 删除条件
     */
    onDeleteVersionCondition(condition, index) {
        var me = this;
        var conditionList = this.props.versionConditionList;
        var conditionListObject = [];
        // 深拷贝对象conditionObject
        $.extend(true, conditionListObject, conditionList);
        conditionListObject.splice(index, 1);
        me.props.dispatch(setVersionConditionList(conditionListObject));
        me.props.dispatch(filterVersionData({versionId:this.props.params.versionId,page:1,limit:15}));
    }
    //清空全部条件
    onClearAllVersionCondition(evt) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        this.props.dispatch(setVersionConditionList());
        //添加条件后，请求过滤后的数据action: filterEntityData
        this.props.dispatch(filterVersionData({versionId:this.props.params.versionId,page:1,limit:15}));
    }
}

VersionInfoPage.propTypes = {
    foldVersionFilterCondition:React.PropTypes.func,
    showVersionFilterCondition:React.PropTypes.func,
    onChangeCheckVersionColumns:React.PropTypes.func,
    onCheckAllVersionColumns:React.PropTypes.func,
    onClickToRequestApprovalRecord: React.PropTypes.func,
    onChangeVersionCondition: React.PropTypes.func,
    onPlusVersionCondition: React.PropTypes.func,
    onDeleteVersionCondition: React.PropTypes.func,
    onClearAllVersionCondition: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        filterVersionData: (pagination) => {
            dispatch(filterVersionData(pagination));
        },
        getFilterCondtion:(filterConditions)=>{
            dispatch(getFilterCondtion(filterConditions))
        },
        onChangeCheckVersionColumns: (checked) => {
            dispatch(showAllVersionColumns(false));
            dispatch(setShowVersionColumns(checked));
        },
        onCheckAllVersionColumns: (evt, Allchecked) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAllVersionColumns(evt.target.checked));
            if (evt.target.checked == true) {
                dispatch(setShowVersionColumns(Allchecked));
            } else if (evt.target.checked == false) {
                dispatch(setShowVersionColumns(null));
            }
        },
        foldVersionFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showVersionFilterCondition(false));
            dispatch(setVersionConditionData(null));
        },
        showVersionFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showVersionFilterCondition(true));
        },
    }
}
const mapStateToProps = createStructuredSelector({
    versionName:selectVersionName(),
    versionTitle:selectVersionTitle(),
    versionCheckPage:selectVersionCheckPage(),
    filterCondtions:selectFilterCondtions(),
    showAllVersionColumns:selectShowAllVersionColumns(),
    setShowColumns:selectSetShowColumns(),
    showVersionColumns:selectShowVersionColumns(),
    versionFilterShow:selectVersionFilterViewStatus(),
    versionConditionData:selectVersionConditionData(),
    versionConditionList:selectVersionConditionList()
});
export default connect(mapStateToProps,mapDispatchToProps)(VersionInfoPage);