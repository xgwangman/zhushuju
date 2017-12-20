/**
 * Created by Administrator on 2017-6-13.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory, hashHistory} from 'react-router';
import {Icon, Tooltip,Modal} from 'antd';
// 获取的任务状态
const ENABLED = "1";//启用
const DISABLE = "0";//停用
const START = "10";//启动
const STOP = "-01";//停止
const RUNNING = "99";//运行中
const ERROR = "-99";//异常(运行异常)
const NEW = "-1";//新增未编排
const FLOW = "-10";//编排未启用

export default class ShareTaskElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let taskDataList = this.props.dataList;
        return (
            <div className="xp-list" style={{'minWidth':'514px'}}>
                <div className="row">
                    {
                        taskDataList ? (
                            (taskDataList || []).map(function (task, i) {
                                return (
                                    <div className="col-md-4" key={'task' + i}>
                                        <div className="xp-block ret" style={{height:'inherit'}}>
                                            <div className="xp-icon">
                                                {/*编辑*/}
                                                {(task.status == NEW || task.status == DISABLE || task.status == FLOW) ? (
                                                    <Tooltip title="编辑">
                                                        <Icon type="edit" className="modal-edit"
                                                              onClick={(e)=>{hashHistory.push(encodeURI("/service/AddSreTask/"+task.id+'/'+task.name+'/'+task.remark))}}/></Tooltip>) : null}
                                                {/*删除*/}
                                                {(task.status == NEW || task.status == DISABLE || task.status == FLOW) ? (
                                                    <Tooltip title="删除">
                                                        <Icon type="delete" className="modal-dele"
                                                              onClick={(e)=> {
                                                                  this.props.removeService(task.id,task.name);
                                                              }}/></Tooltip>) : null}
                                                {/*编排*/}
                                                {(task.status == NEW || task.status == DISABLE || task.status == FLOW) ? (
                                                    <Tooltip title="编排">
                                                        <Icon type="appstore-o" className="modal-edit"
                                                              onClick={(e)=> {
                                                                  hashHistory.push(encodeURI("service/task/taskEditFlow/"+task.id+'/'+task.name));
                                                              }}/></Tooltip>) : null}
                                                {/*启用*/}
                                                {(task.status == FLOW || task.status == DISABLE) ? (
                                                    <Tooltip title="启用">
                                                        <Icon type="lock" className="modal-edit"
                                                              onClick={(e)=>
                                                                  this.props.chengeServiceStatus('enable', task.id)}
                                                        /></Tooltip>) : null}
                                                {/*停用*/}
                                                {(task.status == ENABLED ||task.status ==ERROR|| task.status == STOP) ? (
                                                    <Tooltip title="停用">
                                                        <Icon type="unlock" className="modal-dele"
                                                              onClick={(e)=>
                                                                  this.props.chengeServiceStatus('disable', task.id)}/></Tooltip>) : null}
                                                {/*启动*/}
                                                {(task.status == ENABLED || task.status == STOP ||task.status ==ERROR) ? (
                                                    <Tooltip title="启动">
                                                        <Icon type="play-circle-o" className="modal-edit"
                                                              onClick={(e)=>this.props.chengeServiceStatus('start', task.id)}/></Tooltip>) : null}
                                                {/*停止*/}
                                                {(task.status == START || task.status == RUNNING ||task.status ==ERROR) ? (
                                                    <Tooltip title="停止">
                                                        <Icon type="pause-circle-o" className="modal-dele"
                                                              onClick={(e)=>this.props.chengeServiceStatus('stop', task.id)}/></Tooltip>) : null}
                                            </div>
                                            {/*启用状态下可以查看数据*/}
                                            <h5>{task.name}  
                                            {(task.status == ENABLED || task.status == STOP || task.status == START || task.status == RUNNING ||task.status ==ERROR) ? (<button type="button" className="btn-css-share"
                                                                     onClick={(e)=>{
                                                                         hashHistory.push("service/shareDataRecords/"+task.id+'/'+task.name)
                                                                     }}></button>) : null}
                                            </h5>
                                            <hr className="hr-sh"/>
                                            <div style={{marginBottom:10}}>
                                                <p style={{'display':'inline-block'}}><strong>执行计划：</strong>{task.executePlan == null?'未设置':task.executePlan}</p>
                                                <p style={{'marginLeft': '15%','display':'inline-block'}}><strong>执行类型：</strong>{task.executeType ? task.executeType == 1 ? "同步更新" : "增量更新" : "未设置"}</p>
                                            </div>
                                            {task.lastEexRst && task.lastEexRst.status ?
                                                    (task.lastEexRst.status == "1" ? (
                                                        <div>
                                                            <p style={{fontWeight: "bold", marginBottom: "5px"}}
                                                            >最后一次执行结果
                                                            <Tooltip title="共享任务日志">
                                                            <Icon className='task-icon'
                                                                  style={{cursor:'pointer'}}
                                                                  type="plus-circle"
                                                                  onClick={(e)=> {
                                                                      hashHistory.push(encodeURI("service/task/shareLog/"+task.id+'/'+task.name))}}/>
                                                        </Tooltip>
                                                            </p>
                                                            <p>执行时间：{task.lastEexRst.startTime}
                                                                数据量：{task.lastEexRst.dataNum}</p>
                                                        </div>) :
                                                        (<div>
                                                            <p style={{fontWeight: "bold", marginBottom: "5px"}}
                                                            >最后一次执行结果
                                                            <Tooltip title="共享任务日志">
                                                            <Icon className='task-icon'
                                                                  style={{cursor:'pointer'}}
                                                                  type="plus-circle"
                                                                  onClick={(e)=> {
                                                                      hashHistory.push(encodeURI("service/task/shareLog/"+task.id+'/'+task.name))}}/>
                                                        </Tooltip>
                                                            </p>
                                                            <p>执行时间：{task.lastEexRst.startTime}
                                                                <i className="red">{task.lastEexRst.errorMsg}</i></p>
                                                        </div>))
                                                    : (<div>
                                                        <p style={{marginBottom: "5px"}}>
                                                            <i style={{margin: '0'}} className="red">任务未执行</i>
                                                        </p>
                                                        <p>&nbsp;</p>
                                                </div>)}
                                            <hr className="hr-sh"/>
                                            <div className="row">
                                                <div className="col-lg-1 col-md-1 col-sm-1">
                                                    <p style={{
                                                        'width': '1%', 'fontSize': '16px', 'top': '50%',
                                                        'display': 'inline-block'
                                                    }}>服务接口</p>
                                                </div>
                                                <div className="col-lg-10 col-md-10 col-sm-10 row" style={{'textAlign': 'center'}}>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                                <div className="upDsImage-1" style={{display:'inline-block',cursor:'pointer',marginTop:10}}
                                                                     onClick={(e)=> {
                                                                        hashHistory.push(encodeURI('service/task/serverMgt/'+task.id+'/'+task.name));
                                                                }}/>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6" style={{height:80,borderRight:'1px solid #ccc',padding:0}}>
                                                                <h3 className="xp-impt" style={{display:'inline-block',marginTop:15}}>
                                                                    <span>{task.wsStatRst.wsNum == null?'0':task.wsStatRst.wsNum}</span>&nbsp;个
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="media">
                                                            <p style={{'margin': '5px'}}>运行中<span
                                                                style={{'marginLeft': '13%','color':'#FF9900'}}>{task.wsStatRst.runNum == null?'0':task.wsStatRst.runNum}</span></p>

                                                            <p style={{'margin': '5px'}}>未启动<span
                                                                style={{'marginLeft': '13%','color':'#FF9900'}}>{task.wsStatRst.disableNum == null?'0':task.wsStatRst.disableNum}</span></p>

                                                            <p style={{'margin': '5px'}}>停&nbsp;&nbsp;&nbsp;&nbsp;止<span
                                                                style={{'marginLeft': '13%','color':'#FF0000'}}>{task.wsStatRst.stopNum == null?'0':task.wsStatRst.stopNum}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }.bind(this))
                        ) : null
                    }
                </div>
            </div>
        )
    }
}
