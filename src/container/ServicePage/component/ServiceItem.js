import React, {Component, PropTypes} from 'react';
import {hashHistory,Link, router} from 'react-router';
import {Breadcrumb,Button,Tooltip,Switch ,Icon} from 'antd';

const ENABLED = "1";// 启用
const DISABLE = "0";// 停用
const START = "10";// 启动
const STOP = "-01";// 停止
const RUNNING = "99";// 运行中
const ERROR = "-99";// 异常(运行异常)

export default class ServiceItem extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let ws=this.props.ws;
        return (<div className="xp-list">
                    <div className="col-md-4 col-xs-12">
                        <div className="xp-block ret" style={{height:'inherit'}}>
                            <h5>{ws.name}</h5>
                            <div className="xp-icon">
                                {
                                    ws.status==DISABLE ? (
                                            <Tooltip placement="top" arrowPointAtCenter overlay="编辑">
                                                <Icon  type="edit" className="modal-edit"
                                                      onClick={()=>hashHistory.push(encodeURI("service/add/baseInfo/"+this.props.taskId+'/'+this.props.taskName+'/'+ws.id))}
                                                />
                                            </Tooltip>
                                        ):''
                                }
                                {
                                    ws.status==DISABLE ?(
                                            <Tooltip placement="top" arrowPointAtCenter overlay="删除">
                                                <Icon type="delete" className="modal-dele"
                                                      onClick={()=>this.props.deleteWs(ws.id,ws.name)}
                                                />
                                            </Tooltip>
                                        ):''
                                }
                                {
                                    (ws.status==DISABLE) ?(
                                            <Tooltip placement="top" arrowPointAtCenter overlay="启用">
                                                <Icon type="lock" className="modal-edit"
                                                      onClick={(e)=>
                                                        this.props.changeWsStatus('enable', ws.id)}
                                                />
                                            </Tooltip>
                                        ):''
                                }
                                {
                                    (ws.status==ENABLED || ws.status==START || ws.status==RUNNING || ws.status==ERROR|| ws.status==STOP )?(
                                            <Tooltip placement="top" arrowPointAtCenter overlay="停用">
                                                <Icon type="unlock" className="modal-dele"
                                                      onClick={(e)=>
                                                          this.props.changeWsStatus('disable', ws.id)}
                                                />
                                            </Tooltip>
                                        ):''
                                }
                                {
                                    (ws.status==ENABLED || ws.status==STOP || ws.status==ERROR) ?(
                                            <Tooltip placement="top" arrowPointAtCenter overlay="启动">
                                                <Icon type="play-circle-o" className="modal-edit"
                                                      onClick={(e)=>
                                                          this.props.changeWsStatus('start', ws.id)}
                                                />
                                            </Tooltip>
                                        ):''
                                }
                                {
                                    (ws.status==START || ws.status==RUNNING) ?(
                                            <Tooltip placement="top" arrowPointAtCenter overlay="停止">
                                                <Icon type="pause-circle-o" className="modal-dele"
                                                      onClick={(e)=>
                                                          this.props.changeWsStatus('stop', ws.id)}
                                                />
                                            </Tooltip>
                                        ):''
                                }
                            </div>
                            <hr className="hr-sh"/>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 row" style={{'textAlign': 'center'}}>
                                    <div className="col-lg-6 col-md-6 col-sm-6" style={{borderRight:'1px solid #ccc',padding:0}}>
                                        <div className="row">
                                            <div className="row">
                                                <Icon type="global"
                                                      style={{display:'inline-block',cursor:'pointer',
                                                                fontSize: 75, color: 'rgb(55, 195, 176)'
                                                      }}/>
                                            </div>
                                            <div className="row">
                                                <h3 className="xp-impt" style={{display:'inline-block',size:16}}>
                                                    <span>{ws.methodName}</span>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="media" style={{paddingTop:20,sontSize:16}}>
                                            <p>请求次数:&nbsp;&nbsp;<Link to={encodeURI("service/log/serverLog/"+ws.id+'/'+ws.name+'/'+this.props.taskId+'/'+this.props.taskName)}><span>{ws.reqNum}</span></Link></p>
                                            <p>返回次数:&nbsp;&nbsp;<Link to={encodeURI("service/log/serverLog/"+ws.id+'/'+ws.name+'/'+this.props.taskId+'/'+this.props.taskName)}><span>{ws.resNum}</span></Link></p>
                                            <p>异常次数:&nbsp;&nbsp;<Link to={encodeURI("service/log/serverLog/"+ws.id+'/'+ws.name+'/'+this.props.taskId+'/'+this.props.taskName)}><span>{ws.errorNum}</span></Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="hr-sh"/>
                            <div style={{padding:10,fontSize:14}}>
                                <p>共享实体:学生共享实体基本信息 </p>
                                {
                                    ws.urls instanceof Array ?
                                    ws.urls.map((item,index)=> {
                                        var temp=item.replace(/\//g,'!');
                                        return <p key={index} style={{textOverflow:'ellipsis',overflow: 'hidden',whiteSpace:'nowrap'}}>
                                            <Link to={encodeURI("service/task/testWs/"+this.props.taskName+'/'+ws.name+'/'+temp+'/'+ws.id+'/'+this.props.taskId)}>{item}</Link>
                                        </p>
                                    }):''
                                }
                            </div>
                        </div>
                     </div>
                </div>)
    }
}