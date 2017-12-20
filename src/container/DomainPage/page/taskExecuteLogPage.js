import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb, DatePicker, Button, Table} from 'antd';
const {MonthPicker, RangePicker} = DatePicker;
import moment from 'moment'
import {connect} from 'react-redux';

import {SearchBox} from '../../../common/components/SearchBox';
import {createStructuredSelector,} from 'reselect';
import alert from '../../../common/utils/alert'
import {
    selectTaskExecuteDataList,
    selectDomainData,
    selectEntityData,
    selectModelData,
    selectTaskName,
} from '../selectors';
import {
    reqHandleTaskExecuteLog,
} from '../actions';
import '../../../../css/DomainPageCss.css'

let columns = [
    {title: '执行开始时间', dataIndex: 'startTime', key: 'startTime'},
    {title: '执行结束时间', dataIndex: 'endTime', key: 'endTime'},
    {title: '采集数据量', dataIndex: 'sumData', key: 'sumData'},
    {title: '结果', dataIndex: 'status', key: 'status',render:
        (text,recode,index)=> <span className={text==1?'blue':'red'}>{text==1 ? '成功' : `失败(${recode.errMsg})` }</span>},
]
export class taskExecuteLogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: '',
        }
    }

    betweenInputChange = (dates, value) => {
        this.setState({
            startTime: value[0],
            endTime: value[1],
        })
    }
    getRangePickerTime=()=>{
        let RangePickerTime ={
            startTime: moment().subtract(7, 'days').format("YYYY-MM-DD HH:mm:ss"),
            endTime:moment().format("YYYY-MM-DD HH:mm:ss")
        }
        return RangePickerTime
    }
    onsearch = () => {
        let reqHandleData ={
            type:'search',
            taskId:this.props.params.taskId,
            page:1,
            limit:25,
            startTime:this.state.startTime =='' ? this.getRangePickerTime().startTime: this.state.startTime,
            endTime:this.state.endTime == ''?this.getRangePickerTime().endTime:this.state.endTime
        };
        this.props.reqHandleTaskExecuteLog(reqHandleData)
    };
    ondelete = () => {
        let reqHandleData ={
            type:'delete',
            taskId:this.props.params.taskId,
            page:1,
            limit:25,
            startTime:this.state.startTime == '' ? this.getRangePickerTime().startTime: this.state.startTime,
            endTime:this.state.endTime == ''?this.getRangePickerTime().endTime:this.state.endTime,
        };
        this.props.reqHandleTaskExecuteLog(reqHandleData)
    };
    onfork = () => {
        console.log(this.props.taskName)
    };
    componentWillMount(){
        let startTime = this.getRangePickerTime().startTime,
            endTime = this.getRangePickerTime().endTime;
        let loginRequestData ={
            type:'search',
            taskId:this.props.params.taskId,
            page:1,
            limit:25,
            startTime:startTime,
            endTime:endTime,
        };
        this.props.reqHandleTaskExecuteLog(loginRequestData)
    }
    render() {
        let {domainName,modelName,modelId,entityName,taskName}=this.props.params;
        return (
            <div>
            <div className="xp-header ret">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        <Link to="/main">{domainName}({modelName})</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={encodeURI("/main/entity/"+domainName+'/'+modelName+'/'+modelId)}>{entityName}</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{taskName}</Breadcrumb.Item>
                </Breadcrumb>
                <SearchBox placeholder="任务名称"/>
            </div>
                <div className="centerContent">
                    <div style={{borderBottom: '1px solid #ddd'}}>
                        <span>开始时间</span>　　
                        <RangePicker
                            className="gilight_rp"
                            allowClear={true}
                            format="YYYY-MM-DD HH:mm:ss"
                            onChange={this.betweenInputChange}
                            placeholder={['起始时间', '截止时间']}
                            defaultValue={[
                                moment().subtract(7, 'days'), moment()
                            ]}/>
                    <button style={{marginLeft: 10, marginRight: 10,margin:'0 10px'}} type="button" className="btn-css" size="large" icon="search" onClick={this.onsearch}>查询</button>
                    <button style={{marginLeft: 10, marginRight: 10,margin:'0 10px'}} type="button" className="btn-css" size="large" icon="delete" onClick={this.ondelete}>清空</button>
                    </div>
                    <Table key='taskExecuteLogPage' columns={columns} dataSource={this.props.taskExecuteDataList}/>
                </div>

            </div>

        )
    }

}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
taskExecuteLogPage.propTypes = {
    reqHandleTaskExecuteLog: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        reqHandleTaskExecuteLog:(reqHandleData)=>{
            dispatch(reqHandleTaskExecuteLog(reqHandleData))
        },
    };
}

const mapStateToProps = createStructuredSelector({
    taskExecuteDataList:selectTaskExecuteDataList(),
    domainData: selectDomainData(),
    modelData: selectModelData(),
    entityData: selectEntityData(),
    taskName:selectTaskName(),

});

export default connect(mapStateToProps, mapDispatchToProps)(taskExecuteLogPage);