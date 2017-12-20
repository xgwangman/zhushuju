
require("antd/dist/antd.css");
require("../../../../css/DomainPageCss.css");
require("../../../../css/QualityPageCss.css");
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import  React, {Component, PropTypes} from "react";
import {createStructuredSelector} from "reselect";
import {hashHistory, Link} from "react-router";
import {Breadcrumb, Col, Row} from "antd";
import {connect} from "react-redux";
import MoiterDataTable from '../component/MoiterDataTable';
import EntityDataTable from '../component/EntityDataTable';
import {
    selectqualityDataList,
    selectQualityReqData,
    selectRecentWatcherTime,
    selectMonitorTableData,
    selectEntityClassesData,
    selectMasterChangeData,
    selectEntityTableData,
    selectEntityDataChange,
    selectGetEntityTableId,
    selectDataListId
} from "../selectors";
import {
    setEntityTableData,
    setEntityDataChange,
    setMonitorTableData,
    getEntityTableId,
    setQualityReqData,
    setWatcherTimeData,
    setMasterDataChange,
    setEntityClassesData
} from '../actions';
import Echarts_pie from "../component/Echarts_pie";
import Echarts_bar from "../component/Echarts_bar";

/**
 * *****************************************************************
 */
export  class QualityReportPage extends Component {
    constructor(props) {
        super(props);
        let quality = this.props.params;
        this.props.onQualityReqData(quality);
        this.props.onWatcherTimeData(quality);
        this.props.onMonitorTableData(quality);
        this.props.onMasterDataChange(quality);
        this.props.onEntityTableData(quality);
        this.props.onEntityClassesData(quality);
    }

render() {
        let entityFirstId=this.props.entityClassesData;
        return (

            <div >
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"quality"}>质量监控</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.params.entityName}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent" style={{marginLeft:10}}>
                        <div className="monitor_column_left">
                            最近一次监控时间：{(this.props.getRecentWatcherTime && this.props.getRecentWatcherTime.updateTime) ? this.props.getRecentWatcherTime.updateTime : null}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            监控实体个数 {(this.props.getRecentWatcherTime && this.props.getRecentWatcherTime.entityNum) ? this.props.getRecentWatcherTime.entityNum : 0}个，
                            数据总量 {(this.props.getRecentWatcherTime && this.props.getRecentWatcherTime.dateNum) ? this.props.getRecentWatcherTime.dateNum : 0}，
                            异常数据量 <span className="red">{(this.props.getRecentWatcherTime && this.props.getRecentWatcherTime.dateErrorNum) ? this.props.getRecentWatcherTime.dateErrorNum : 0}</span>
                        </div>
                        <div>
                            <p className="monitor_column_left">最近一次质量监控汇总</p>
                        </div>
                <div>
                    <div>
                        <MoiterDataTable
                            moiterDataTable = {this.props.moiterDataTable}
                            monitorTablePage = {this.props.onMonitorTablePage}
                            id={this.props.params}
                        />
                    </div>
                    <hr className="hr"/>
                    <div style={{marginTop:20}}>
                        <p className="monitor_column_left"> {this.props.params.entityName}域数据质量变化趋势分析</p>
                        <Echarts_pie
                            getMasterChangeData = {this.props.masterChangeData}
                        />
                    </div>
                </div>
                <hr className="hr"/>
                <div>
                    <div className="monitor_column_left">
                        <p>{this.props.params.entityName}域数据质量变化监控日志</p>
                    </div>
                    <div>
                        <EntityDataTable
                            getEntityDataTable = {this.props.entityDataTable}
                            getEntityTablePage = {this.props.onEntityTablePage}
                            id={this.props.params}
                        />
                    </div>
                </div>
                </div>
            </div>
        )
}
}
/**
 * *****************************************************************
 */
QualityReportPage.propTypes = {
    onEntityTableData: React.PropTypes.func,
    onEntityChangeData: React.PropTypes.func,
    onMonitorTablePage: React.PropTypes.func,
    onEntityTablePage: React.PropTypes.func,
    onQualityReqData:React.PropTypes.func,
    onWatcherTimeData: React.PropTypes.func,
    onMonitorTableData: React.PropTypes.func,
    onMasterDataChange :React.PropTypes.func,
    onEntityClassesData :React.PropTypes.func,

};

/**
 * *****************************************************************
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        onEntityTableData:(value) => {
            let tablePage = {
                id: value,
                page: 1,
                limit: 10,
            }
            dispatch(setEntityTableData(tablePage))
        },
        onEntityChangeData :(value) => {
            dispatch(setEntityDataChange(value))
        },
        onMonitorTablePage :(evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setMonitorTableData(evt))
        },
        onEntityTablePage:(action) => {
            dispatch(setEntityTableData(action))
        },
        getEntityTableId:(evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(getEntityTableId(evt))
        },
        onQualityReqData :(evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setQualityReqData(evt))
        },
        onWatcherTimeData :(evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setWatcherTimeData(evt))
        },
        onMonitorTableData :(evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            let monitorPage = {
                page: 1,
                limit: 10,
                id:evt,
            }
            dispatch(setMonitorTableData(monitorPage))
        },
        onMasterDataChange :(evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setMasterDataChange(evt))
        },
        onEntityClassesData :(evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setEntityClassesData(evt))
        },
    }
}
/**
 * *****************************************************************
 */

const mapStateToProps = createStructuredSelector({
    dataList:selectqualityDataList(),
    getQualityReqData:selectQualityReqData(),
    getRecentWatcherTime: selectRecentWatcherTime(),
    moiterDataTable: selectMonitorTableData(),
    entityClassesData: selectEntityClassesData(),
    entityDataTable: selectEntityTableData(),
    masterChangeData: selectMasterChangeData(),
    entityDataChange: selectEntityDataChange(),
    entityTableId: selectGetEntityTableId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(QualityReportPage);
