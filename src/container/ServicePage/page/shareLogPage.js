/**
 * Created by Administrator on 2017-7-3.
 */
/**
 * Created by Administrator on 2017-6-20.
 */
import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {hashHistory,Link} from 'react-router';
import {Breadcrumb,Button,Table,Modal,DatePicker,Row} from 'antd';
import moment from 'moment'
import {requestShareLog,clearShareLog} from '../actions'
import {getShareLogList} from '../selectors'
const { RangePicker} = DatePicker;
const confirm = Modal.confirm;

export class ShareLogPage extends Component {
    constructor(props) {
        super(props);
        this.props.loadShareLog({id:this.props.params.taskId,page:1,limit:15,startTime:'',endTime:''});
        this.state={
            startTime:'',
            endTime:''
        }
    }
    onChangeTime=(dates, dateStrings)=>{
        this.setState({
            startTime:dates[0].format("YYYY-MM-DD") + " 00:00:00",
            endTime:dates[1].format("YYYY-MM-DD") + " 23:59:59"
        })
    };
    onSearch=()=>{
        this.props.loadShareLog({id:this.props.params.taskId,page:1,limit:15,startTime:this.state.startTime,endTime:this.state.endTime});
    };
    onClearLog=()=>{
        if(this.state.startTime==null && this.state.startTime=='') {
            confirm({
                title: '确定要删除此任务下的所有日志吗？',
                onOk:()=>{
                    this.props.clearShareLog({taskId: this.props.params.taskId, startTime: this.state.startTime, endTime: this.state.endTime});
                },
                onCancel() {
                }
            })
        } else {
            confirm({
                title: '确定要删除此任务当前时间段内的日志吗？',
                onOk:()=>{
                    this.props.clearShareLog({taskId: this.props.params.taskId, startTime: this.state.startTime, endTime: this.state.endTime});
                },
                onCancel() {
                }
            })
        }
    };
    onChangePage=(page)=>{
        this.props.loadShareLog({id:this.props.params.taskId,page:page.current,limit:page.pageSize,startTime:this.state.startTime,endTime:this.state.endTime});
    };
    render() {
        let logList=this.props.logList;
        let pagination={pageSize : 15,showQuickJumper:true,defaultCurrent:1,total:(logList&& logList.pageNum)?logList.pageNum:0, showTotal:total => `共 ${total} 条记录`};
        const column=[
            {title: '执行开始时间', dataIndex: 'startTime',width: '25%',},
            {title: '执行结束时间', dataIndex: 'endTime',width: '25%',},
            {title: '采集数据量', dataIndex: 'sumData',width: '25%',render:(text, record, index)=>{
                return (<span>{text?text:0}</span>)
            }},
            {title: '结果', dataIndex: 'status',width: '25%',render:(text, record, index)=>{
                return (<span style={text==1?{color:'green'}:{color:'red'}}>{text==1?'成功':record.errMsg}</span>)
            }},
        ];
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link to="service">{this.props.params.taskName}</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>基本信息接口</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent">
                    <div style={{borderBottom: '1px solid #ddd'}}>
                        <span>请求时间</span>　　
                        <RangePicker
                            className="gilight_rp"
                            allowClear={true}
                            format="YYYY-MM-DD"
                            onChange={this.onChangeTime}
                            placeholder={['起始时间', '截止时间']}
                        />
                        <button style={{marginLeft: 10, marginRight: 10,margin:'0 10px'}} type="button" className="btn-css" size="large" icon="search" onClick={this.onSearch}>查询</button>
                        <button style={{marginLeft: 10, marginRight: 10,margin:'0 10px'}} type="button" className="btn-css" size="large" icon="delete" onClick={this.onClearLog}>清空历史日志</button>
                    </div>
                    <div>
                        {
                            (logList && logList.data instanceof  Array )?
                                <Table rowKey="id" columns={column} pagination={pagination} onChange={this.onChangePage}
                                       dataSource={logList.data}/>
                                :''
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        loadShareLog:(item)=> {dispatch(requestShareLog(item))},
        clearShareLog:(item)=> {dispatch(clearShareLog(item))},
    };
}
const mapStateToProps = createStructuredSelector({
    logList:getShareLogList()
});
export default connect(mapStateToProps, mapDispatchToProps)(ShareLogPage);