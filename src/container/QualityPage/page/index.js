import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
const uuidV4 = require('uuid/v4');
import {SearchBox} from '../../../common/components/SearchBox';
import QualityElement from '../component/QualityElement';
import ExecutePlanAppForm from '../component/ExecutePlanApp';
import {
    selectqualityDataList,
    selectModifyExecutePlan,
    selectShowExecutePlan,
    selectModifyPlanAttr,
    selectReqDataSrc,
    selectQualityReqData,
} from '../selectors';
import {
    requestQualityList,
    onChangeStatus,
    showExecutePlan,
    onSaveModify,
    setModifyPlanAttr,
    setQualityEntityTable,
    ruleListId,
    ruleListName,
    domainDataList,
    onSearch,
} from '../actions';

export class QualityPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestQualityList();
    }
    state={
        searchValue: ''
    }
    searchChange=(e)=>{
        this.props.dispatch(onSearch(e.target.value));
        this.setState({
            searchValue:e.target.value
        })
    };

    render() {
        return (
            <div>
                <div className="xp-header ret" style={{marginBottom:20}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>质量监控</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox
                        placeholder="请输入数据子集名称"
                        onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">
                <QualityElement
                    dataList={this.props.qualityDataList}
                    ChangeStatus={this.props.onChangeStatus}
                    modifyExecutePlan={this.props.onModifyExecutePlan}
                    getQualityEntityTable = {this.props.onQualityEntityTable}
                />
                <ExecutePlanAppForm
                    show={this.props.ShowExecutePlan}
                    hide={this.props.hideAppEdit}
                    executePlan={this.props.executePlan}
                    dataAttr={this.props.modifyPlanAttr}
                    changeModifyData={this.onChangeModifyData.bind(this)}
                    onSaveModify ={this.props.onSaveModify}

                />
                </div>
            </div>
        )
    }
    /**
     * 改变属性的属性后，将属性的属性值更新为最新，并更新state中的属性数据
     * @param evt
     * @param sign
     */
    onChangeModifyData(evt, sign) {
        var me = this;
        var modifyPlanAttr = this.props.modifyPlanAttr;
        var dataSrcObject = {};
        // 深拷贝对象modifyPlanAttr
        $.extend(true, dataSrcObject, modifyPlanAttr);
        switch (sign) {
            case "period" :
                dataSrcObject[sign] = evt;
                break;
            case "everyYear" :
                dataSrcObject[sign] = evt;
                break;
            case "everyMonth" :
                dataSrcObject[sign] = evt;
                break;
            case "everyWeek" :
                dataSrcObject[sign] = evt;
                break;
            case "everyDay" :
                dataSrcObject[sign] = evt;
                break;
            case "startTime" :
                dataSrcObject[sign] = evt;
                break;
            default:
                dataSrcObject[sign] = this.value;
        }
        me.props.dispatch(setModifyPlanAttr(dataSrcObject));
    };
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
QualityPage.propTypes = {
    requestQualityList: React.PropTypes.func,
    onChangeStatus: React.PropTypes.func,
    showExecutePlan: React.PropTypes.func,
    modifyExecutePlan: React.PropTypes.func,
    onModifyExecutePlan: React.PropTypes.func,
    hideAppEdit: React.PropTypes.func,
    onSaveModify: React.PropTypes.func,
    onEntityDataChange: React.PropTypes.func,
    onQualityEntityTable: React.PropTypes.func,
    ruleList:React.PropTypes.func,
    onSearch:React.PropTypes.func,

};

/**
 * *****************************************************************
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestQualityList: () => {
            dispatch(requestQualityList(true));
        },
        onChangeStatus: (evt, quality) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            if (quality.status == true) {
                quality.status = false;
                dispatch(onChangeStatus(quality));
            } else {
                quality.status = true;
                dispatch(onChangeStatus(quality));
            }
        },
        onModifyExecutePlan: (evt, quality) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showExecutePlan(true));
            let modifyExecute = {
                id: quality.id,
                period: quality.period,
                everyYear: quality.everyYear,
                everyDay: quality.everyDay,
                everyWeek: quality.everyWeek,
                everyMonth: quality.everyMonth,
                startTime: quality.startTime
            };
            dispatch(setModifyPlanAttr(modifyExecute));
        },
        hideAppEdit: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showExecutePlan(false));
            // let modalKey = uuidV4();
        },
        onSaveModify: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onSaveModify(false));
        },
        onQualityEntityTable:(evt,quality) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            let qualityEntityPage = {
                page:1,
                limit:13,
                entityId:quality.id,
            }
            dispatch(setQualityEntityTable(qualityEntityPage))
        },
        ruleList:(evt,quality)=>{
            dispatch(ruleListId(quality.id));
            dispatch(ruleListName(quality.name));
            dispatch(domainDataList(quality.id));
        },
    };
}
/**
 * *****************************************************************
 */

const mapStateToProps = createStructuredSelector({
    qualityDataList: selectqualityDataList(),
    executePlan : selectModifyExecutePlan(),
    ShowExecutePlan: selectShowExecutePlan(),
    modifyPlanAttr: selectModifyPlanAttr(),
    modifyReqData: selectReqDataSrc(),
    qualityReqData:selectQualityReqData(),
});

export default connect(mapStateToProps, mapDispatchToProps)(QualityPage);