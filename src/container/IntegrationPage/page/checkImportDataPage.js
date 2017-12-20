/**
 * Created by Administrator on 2017/8/10.
 */
import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button} from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Link, hashHistory} from 'react-router';
import CheckImportDataTable from '../component/CheckImportDataTable';
import {PickColumns} from '../../../common/components/PickColumns';
import {FilterCondition} from '../../../common/components/FilterCondition';
import {
    showImportFilterCondition,
    setShowImportColumns,
    showAllImportColumns,
    setConfirmImport,
    setCancelImport,
    setImportConditionData,
    filterImportData,
    setImportConditionList,
    setUploadFiles,
    setImportCheck
} from '../actions';
import {
    selectImportAppData,
    selectUploadImportFiles,
    selectShowImportColumns,
    selectShowAllImportColumns,
    selectImportConditionList,
    selectImoprtConditionData,
    selectImportFilterViewStatus,
    selectUploadImportData,
} from '../selectors';

export class CheckImportDataPage extends Component {
    constructor(props) {
        super(props);
        const params=this.props.params;
        this.props.onImportDataCheck(params);
    }
    render () {
        const params=this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/importMasterData"}>主数据导入</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.importAppData.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent ">
                {this.props.importFilterShow ? (
                    <div style={{position: "relative"}}>
                        <button type="button" className="btn-css"
                                style={{position: 'absolute', right: '50px', marginTop: '12px' }}
                                onClick={this.props.foldImportFilterCondition}>
                            收起
                        </button>
                    </div>
                ) : (
                    <div style={{position: "relative"}}>
                        <button type="button" className="btn-css"
                                style={{position: 'absolute', right: '50px', marginTop: '12px'}}
                                onClick={this.props.showImportFilterCondition}>
                            高级筛选
                        </button>
                    </div>
                )
                }
                <FilterCondition
                                show={this.props.importFilterShow}
                                dataList={this.props.importTitle.titles}
                                conditionList={this.props.importConditionList}
                                changeCondition={this.onChangeImportCondition.bind(this)}
                                onPlusCondition={this.onPlusImportCondition.bind(this)}
                                deleteCondition={this.onDeleteImportCondition.bind(this)}
                                clearAllCondition={this.onClearAllImportCondition.bind(this)}
                />
                <PickColumns
                            dataList={this.props.importTitle}
                            checkedList={this.props.showImportColumns}
                            checkAll={this.props.showAllImportColumns}
                            changeCheckColumns={this.props.onChangeCheckImportColumns}
                            checkAllColumns={this.props.onCheckAllImportColumns}
                />
                <CheckImportDataTable
                                        uploadFilesData={this.props.uploadFilesData}
                                        handleUploadPage={this.props.onQueryImpEntityData}
                                        columns={this.props.showImportColumns}
                                        showAllColumns={this.props.showAllImportColumns}
                                        confirmImportData={this.props.onConfirmImportData}
                                        handleCancel={this.props.onHandleCancel}
                                        importAppId={this.props.importAppId}
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
    onChangeImportCondition(value, type, option) {
        var me = this;
        var importConditionData = this.props.importConditionData;
        var conditionObject = {};
        // 深拷贝对象conditionObject
        $.extend(true, conditionObject, importConditionData);
        if (type == "value") {
            conditionObject[type] = value.target.value;
        } else if (type == "operation") {
            conditionObject[type] = value;
            conditionObject["operationName"] = option.props.children;
        } else if (type == "id") {
            conditionObject[type] = value;
            conditionObject["name"] = option.props.children;
        }
        me.props.dispatch(setImportConditionData(conditionObject));
    }
    /**
     * 添加条件
     */
    onPlusImportCondition() {
        var me = this;
        var conditionData = this.props.importConditionData;
        var conditionList = this.props.importConditionList;
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
        me.props.dispatch(setImportConditionList(conditionListObject));
        me.props.dispatch(filterImportData(true));
    }
    /**
     * 删除条件
     */
    onDeleteImportCondition(condition, index) {
        var me = this;
        var conditionList = this.props.importConditionList;
        var conditionListObject = [];
        // 深拷贝对象conditionObject
        $.extend(true, conditionListObject, conditionList);
        conditionListObject.splice(index, 1);
        me.props.dispatch(setImportConditionList(conditionListObject));
        me.props.dispatch(filterImportData(true));
    }
    //清空全部条件
    onClearAllImportCondition(evt) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        this.props.dispatch(setImportConditionList(null));
        //添加条件后，请求过滤后的数据action: filterImportData
        this.props.dispatch(filterImportData(true));
    }

}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
CheckImportDataPage.propTypes = {
    requestImportEntityData: React.PropTypes.func,
    foldImportFilterCondition: React.PropTypes.func,
    showImportFilterCondition: React.PropTypes.func,
    onChangeCheckImportColumns: React.PropTypes.func,
    onCheckAllImportColumns: React.PropTypes.func,
    onConfirmImportData: React.PropTypes.func,
    onHandleCancel: React.PropTypes.func,
    onHandleUploadPage: React.PropTypes.func,
    onQueryImpEntityData: React.PropTypes.func,
    onImportDataCheck: React.PropTypes.func,

};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestImportEntityData: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setReqImportData(evt));
        },
        foldImportFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showImportFilterCondition(false));
            dispatch(setImportConditionData(null));
        },
        showImportFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showImportFilterCondition(true));
        },
        onChangeCheckImportColumns: (checked) => {
            dispatch(showAllImportColumns(false));
            dispatch(setShowImportColumns(checked));
        },
        onCheckAllImportColumns: (evt, Allchecked) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAllImportColumns(evt.target.checked));
            if (evt.target.checked == true) {
                dispatch(setShowImportColumns(Allchecked));
            } else if (evt.target.checked == false) {
                dispatch(setShowImportColumns(null));
            }
        },
        onConfirmImportData: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setConfirmImport(evt));
        },
        onHandleCancel: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setCancelImport(evt));
        },
        onQueryImpEntityData: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setUploadFiles(evt));
        },
        onImportDataCheck: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            let importPage = {
                id: evt.importId,
                page:1,
                limit:12
            }
            dispatch(setImportCheck(importPage));
        },
    }
}

const mapStateToProps = createStructuredSelector({
    importAppData: selectImportAppData(),
    uploadFilesData: selectUploadImportFiles(),
    importTitle: selectUploadImportData(),
    showImportColumns: selectShowImportColumns(),
    showAllImportColumns: selectShowAllImportColumns(),
    importAppId: selectImportAppData(),
    importConditionList: selectImportConditionList(),
    importConditionData: selectImoprtConditionData(),
    importFilterShow: selectImportFilterViewStatus(),

});

export default connect(mapStateToProps, mapDispatchToProps)(CheckImportDataPage);