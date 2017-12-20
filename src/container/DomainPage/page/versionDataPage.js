/**
 * Created by Administrator on 2017/5/12.
 */
require("../../../../css/PageHeader.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';
import {hashHistory} from 'react-router';
import {Link, router,} from 'react-router';
import {createStructuredSelector} from 'reselect';
import alert from '../../../common/utils/alert';
import {Button,Row} from 'antd';
import {SearchBox} from '../../../common/components/SearchBox';
import {PickColumns} from '../../../common/components/PickColumns';
import {FilterCondition} from '../../../common/components/FilterCondition';
import AuditDataRecordModal from '../component/AuditDataRecordModal';
import VersionDataListTable from '../component/VersionDataListTable';
import {
    selectShowAllColumns,
    selectShowColumns,
    selectFilterViewStatus,
    selectConditionList,
    selectConditionData,
    //^^^^^^^^^^^^^^^
    selectUpdateVersionDataList,
    selectUpdateVersionAttrList,
    selectDomainData,
    selectGetName,
    selectAuditShowStatus,
    selectAuditDataList
} from '../selectors';
import {
    showAllColumns,
    setShowColumns,
    //^^^^^^^^^^^^^^^^^^^^^^^^
    requestVersionDataList,
    requestVersionAttrList,
    setConditionList,
    showFilterCondition,
    setConditionData,
    filterEntityData,
    filterVersionData,
    requestDataAuditRecord,
    exportAuditDataRecord,
    showAuditDataModal,
} from '../actions';
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
export class versionDataPage extends Component {
    constructor(props){
        super (props);
        this.props.requestVersionDataList({versionId:this.props.params.versionId,page:1,limit:15});
        //切换页面后，默认显示所有列（适应于渲染多个页面的情况）
        this.props.dispatch(showAllColumns(true));
        //切换页面后，清空所有过滤条件
        this.props.dispatch(setConditionList(null));
    }
    onPageChange=(page)=>{
        this.props.requestVersionDataList({versionId:this.props.params.versionId,page:page.current,limit:page.pageSize});
    };
    render(){
        let {domainName,modelName,modelId,entityName,entityId,versionName,versionId} =this.props.params;
        return(
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to="/main">{domainName}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("main/entity/allVersion/"+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+entityId)}>{versionName}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>版本信息</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <div className="pull-right" style={{display:'inline-block'}}>
                            {this.props.filterShow ? (
                                    <Button id="fold" type="primary"
                                            onClick={this.props.foldFilterCondition}>收起
                                    </Button>
                                ) : (
                                    <Button id="show" type="primary"
                                            onClick={this.props.showFilterCondition}>高级筛选
                                    </Button>)}
                        </div>
                    </Row>
                </div>
                <div className="centerContent">
                    <FilterCondition show={this.props.filterShow}
                                     dataList={this.props.versionDataList?this.props.versionDataList.result.titles:[]}
                                     conditionList={this.props.conditionList}
                                     changeCondition={this.onChangeCondition.bind(this)}
                                     onPlusCondition={this.onPlusCondition.bind(this)}
                                     deleteCondition={this.onDeleteCondition.bind(this)}
                                     clearAllCondition={this.onClearAllCondition.bind(this)}
                    />
                    <PickColumns
                        dataList={this.props.versionDataList?this.props.versionDataList.result:[]}
                        checkedList={this.props.showColumns}
                        checkAll={this.props.showAllColumns}
                        changeCheckColumns={this.onChangeCheckColumns}
                        checkAllColumns={this.props.onCheckAllColumns}
                    />
                    <VersionDataListTable
                        dataList={this.props.versionDataList}
                        columns={this.props.showColumns}
                        showAllColumns={this.props.showAllColumns}
                        onPageChange={()=>this.onPageChange}
                        clickToRequestApprovalRecord={this.props.onClickToRequestApprovalRecord}
                    />
                </div>
            </div>
        )
    }
    onChangeCheckColumns=(checked)=>{
        let temp=this.props.versionDataList ? this.props.versionDataList.result.titles: [];
        if(temp.length==checked.length){
            this.props.onChangeCheckColumns(true,checked)
        }else{
            this.props.onChangeCheckColumns(false,checked)
        }
    };
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
        me.props.dispatch(filterVersionData(true,{page:1,limit:15,versionId:this.props.params.versionId}));

    }

    /**
     * 删除条件
     */
    onDeleteCondition(condition, index) {
        var me = this;
        var conditionList = this.props.conditionList;
        var conditionListObject = [];
        // 深拷贝对象conditionObject
        $.extend(true, conditionListObject, conditionList);
        conditionListObject.splice(index, 1);
        me.props.dispatch(setConditionList(conditionListObject));
        me.props.dispatch(filterVersionData(true,{page:1,limit:15,versionId:this.props.params.versionId}));

    }

    //清空全部条件
    onClearAllCondition(evt) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        this.props.dispatch(setConditionList(null));
        //添加条件后，请求过滤后的数据action：filterVersionData
        this.props.dispatch(filterVersionData(true,{page:1,limit:15,versionId:this.props.params.versionId}));
    }
}
/**
 *
 */
versionDataPage.propTypes = {

    // versionDataList:React.PropTypes.any,
    onChangeCheckColumns:React.PropTypes.func,
    showFilterCondition:React.PropTypes.func,
    onCheckAllColumns:React.PropTypes.func,
    onClickToRequestApprovalRecord:React.PropTypes.func,
    onClearAllCondition: React.PropTypes.func,
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^
    requestVersionDataList:React.PropTypes.func,
    requestVersionAttrList:React.PropTypes.func,
    versionName:React.PropTypes.string,
    foldFilterCondition:React.PropTypes.func,
};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestVersionDataList:(object)=>{
            dispatch(requestVersionDataList(true,object));
            dispatch(requestVersionAttrList(true,object))
        },
        showFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showFilterCondition(true));
        },

        onChangeCheckColumns: (isCheckedAll,checked) => {
            dispatch(showAllColumns(isCheckedAll));
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
        showFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showFilterCondition(true));
        },
        onClickToRequestApprovalRecord: (evt, id, record) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestDataAuditRecord({attId: id, uuid: record.UUID}));

        },
        foldFilterCondition: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showFilterCondition(false));
            dispatch(setConditionData(null));
        },
        closeAuditDataModal: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAuditDataModal(false));
        },
        exportAuditDataRecord: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(exportAuditDataRecord(false));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    versionDataList:selectUpdateVersionDataList(),
    showAllColumns: selectShowAllColumns(),
    showColumns: selectShowColumns(),
    filterShow: selectFilterViewStatus(),
    conditionList: selectConditionList(),
    conditionData: selectConditionData(),
    domainData: selectDomainData(),
    versionName:selectGetName(),
    versionList:selectUpdateVersionAttrList(),//版本的属性列表



});

export default connect(mapStateToProps, mapDispatchToProps)(versionDataPage);