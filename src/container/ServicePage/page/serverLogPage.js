/**
 * Created by Administrator on 2017-6-20.
 */
import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {hashHistory,Link} from 'react-router';
import {Breadcrumb,Button,Table,DatePicker,Modal} from 'antd';
import moment from 'moment'
import {requestServiceLogList,clearWsLog} from '../actions'
import {getWsLogList} from '../selectors'
const { RangePicker} = DatePicker;
const confirm = Modal.confirm;
export class ServerLogPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            startTime:'',
            endTime:''
        }
        this.props.loadServceLog({id:this.props.params.wsId,page:1,limit:15,startTime:'',endTime:''});
    }
    onChangeTime=(dates, dateStrings)=>{
        this.setState({
            startTime:dates[0].format("YYYY-MM-DD") + " 00:00:00",
            endTime:dates[1].format("YYYY-MM-DD") + " 23:59:59"
        })
    };
    onSearch=(dates, dateStrings)=>{
        this.props.loadServceLog({id:this.props.params.wsId,page:1,limit:15,startTime:this.state.startTime,endTime:this.state.endTime});
    };
    onClearWsLog=()=>{
        if(this.state.startTime==null && this.state.startTime=='') {
            confirm({
                title: '确定要删除此任务下的所有日志吗？',
                onOk:()=>{
                    this.props.clearWsLog({wsId:this.props.params.wsId,startTime:this.state.startTime,endTime:this.state.endTime});
                },
                onCancel() {}
            })
        } else {
            confirm({
                title: '确定要删除此任务当前时间段内的日志吗？',
                onOk:()=>{
                    this.props.clearWsLog({wsId:this.props.params.wsId,startTime:this.state.startTime,endTime:this.state.endTime});
                },
                onCancel() {}
            })
        }
    };
    onChangePage=(page)=>{
        this.props.loadServceLog({id:this.props.params.wsId,page:page.current,limit:page.pageSize,startTime:this.state.startTime,endTime:this.state.endTime});
    };
    render() {
        let logList=this.props.wsLogList;
        let pagination={pageSize : 15,showQuickJumper:true , defaultCurrent : 1, total :(logList&& logList.pageNum)?logList.pageNum:0, showTotal:total => `共 ${total} 条记录`};
        const column=[
            {title: '请求时间', dataIndex: 'requestTime',width: '25%'},
            {title: '响应时间', dataIndex: 'responseTime',width: '25%'},
            {title: '成功/失败', dataIndex: 'isSuccess',width: '25%',render:(text, record, index)=>{
                return <span style={text==1?{color:'green'}:{color:'red'}}>{text==1?'成功':record.errorMsg}</span>
            }},
            {title: '请求用户', dataIndex: 'requestor',width: '25%'},
        ];
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to="service">{this.props.params.taskName}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("service/task/serverMgt/"+this.props.params.taskId+'/'+this.props.params.taskName)}>
                                {this.props.params.wsName}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>服务日志</Breadcrumb.Item>
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
                        <button style={{marginLeft: 10, marginRight: 10,margin:'0 10px'}} type="button" className="btn-css"  size="large" icon="search" onClick={this.onSearch}>查询</button>
                        <button style={{marginLeft: 10, marginRight: 10,margin:'0 10px'}} type="button" className="btn-css"  size="large" icon="delete" onClick={this.onClearWsLog}>清空历史日志</button>
                    </div>
                    <div>
                        <Table rowKey="id" columns={column} pagination={pagination} onChange={this.onChangePage}
                               dataSource={(logList&&logList.data instanceof Array) ? logList.data:[]}/>
                    </div>
                </div>
            </div>
        )
    }
}


export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        loadServceLog:(wsId)=>{dispatch(requestServiceLogList(wsId))},
        clearWsLog:(item)=>{dispatch(clearWsLog(item))}
    };
}
const mapStateToProps = createStructuredSelector({
    wsLogList:getWsLogList()
});
export default connect(mapStateToProps, mapDispatchToProps)(ServerLogPage);