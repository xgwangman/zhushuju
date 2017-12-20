import React, {Component, PropTypes} from 'react';
import {browserHistory, hashHistory} from 'react-router';
import {Icon, Tooltip} from 'antd';
// 获取的任务状态
const ENABLED = "1";//启用
const DISABLE = "0";//停用
const START = "10";//启动
const STOP = "-01";//停止
const RUNNING = "99";//运行中
const ERROR = "-99";//异常(运行异常)
const NEW = "-1";//新增未编排
const FLOW = "-10";//编排未启用

export default class TaskElement extends Component {
    constructor(props) {
        super(props);
    }

    CheckTask = (task)=> {
        let {entityId,domainName,modelName,modelId,entityName,taskType}=this.props;
        hashHistory.push(encodeURI('/main/entity/task/taskExecuteLogPage/'+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+task.name+'/'+task.id));
        this.props.onCheckTask(task);
    };

    render() {
        let taskDataList = this.props.dataList;
        let {entityId,domainName,modelName,modelId,entityName,taskType}=this.props;
        return (
            <div className="xp-list">
                <div className="row">
                    {
                        taskDataList ? (
                            (taskDataList || []).map(function (task, i) {
                                return (
                                    <div className="col-md-4" key={'task' + i}>
                                        <div className="xp-block ret">
                                            <div className="xp-icon">
                                                {/*编辑*/}
                                                {(task.status == NEW || task.status == DISABLE || task.status == FLOW) ? (
                                                    <Tooltip title="编辑">
                                                        <Icon type="edit" className="modal-edit"
                                                              onClick={(e) => {hashHistory.push(encodeURI('main/entity/tasks/addTask/'+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+entityId+'/'+taskType+'/update'+'/'+task.id))}}/>
                                                    </Tooltip>) : null}
                                                {/*删除*/}
                                                {(task.status == NEW || task.status == DISABLE || task.status == FLOW) ? (
                                                    <Tooltip title="删除">
                                                        <Icon type="delete" className="modal-dele"
                                                              onClick={(e) => {
                                                                  this.props.removeTask(task.id,task.name,taskType,entityId);
                                                              }}/></Tooltip>) : null}
                                                {/*编排*/}
                                                {(task.status == NEW || task.status == DISABLE || task.status == FLOW) ? (
                                                    <Tooltip title="编排">
                                                        <Icon type="appstore-o" className="modal-edit"
                                                              onClick={(e) => {
                                                                  hashHistory.push(encodeURI("/main/entity/taskEditFlow/"+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+entityId+'/'+task.name+'/'+task.id+'/'+taskType));
                                                                  {/*this.props.setTaskAttr(e, task);*/}
                                                              }}/></Tooltip>) : null}
                                                {/*启用*/}
                                                {(task.status == FLOW || task.status == DISABLE) ? (
                                                    <Tooltip title="启用">
                                                        <Icon type="lock" className="modal-edit"
                                                              onClick={(e) =>
                                                                  this.props.enableTask(task.id,taskType,entityId)}
                                                        /></Tooltip>) : null}
                                                {/*停用*/}
                                                {(task.status == ENABLED || task.status == START|| task.status == STOP||task.status == ERROR) ? (
                                                    <Tooltip title="停用">
                                                        <Icon type="unlock" className="modal-dele"
                                                              onClick={(e) => this.props.disableTask(task.id,taskType,entityId)}/></Tooltip>) : null}
                                                {/*启动*/}
                                                {(task.status == ENABLED || task.status == STOP ) ? (
                                                    <Tooltip title="启动">
                                                        <Icon type="play-circle-o" className="modal-edit"
                                                              onClick={(e) => this.props.startTask(task.id,taskType,entityId)}/></Tooltip>) : null}
                                                {/*停止*/}
                                                {(task.status == START || task.status == RUNNING||task.status == ERROR) ? (
                                                    <Tooltip title="停止">
                                                        <Icon type="pause-circle-o" className="modal-dele"
                                                              onClick={(e) => this.props.stopTask(task.id,taskType,entityId)}/></Tooltip>) : null}
                                            </div>
                                            <h5>{task.name}</h5>
                                            <hr className="hr-sh"></hr>
                                            <p><strong>执行计划：</strong>{task.executePlan ? task.executePlan : "未设置"}
                                                <span style={{
                                                    display: 'inline-block',
                                                    marginLeft: 12,
                                                    marginRight: 12
                                                }}>|</span>
                                                <strong>执行类型：</strong>{task.executeType ? task.executeType == 1 ? "同步更新" : "增量更新" : "未设置"}
                                            </p>
                                            {task.lastEexRst && task.lastEexRst.status ?
                                                ((task.lastEexRst.status == "1" || task.lastEexRst.status == "99") ? (
                                                    <div>
                                                        <p style={{fontWeight: "bold", marginBottom: "5px"}}
                                                        >最后一次执行结果
                                                            <Tooltip title="采集任务日志">
                                                            <Icon className='task-icon'
                                                                       type="plus-circle"
                                                                       onClick={()=>this.CheckTask(task)}/>
                                                            </Tooltip>
                                                        </p>
                                                        <p>执行时间：{task.lastEexRst.startTime}
                                                            数据量：{task.lastEexRst.dataNum}</p>
                                                    </div>) :
                                                    (<div>
                                                        <p style={{fontWeight: "bold", marginBottom: "5px"}}
                                                        >最后一次执行结果
                                                            <Tooltip title="采集任务日志">
                                                            <Icon className='task-icon'
                                                                  type="plus-circle"
                                                                  onClick={()=>this.CheckTask(task)}/>
                                                            </Tooltip>
                                                        </p>
                                                        <p style={{textOverflow:'ellipsis',overflow: 'hidden',whiteSpace:'nowrap'}}>执行时间：{task.lastEexRst.startTime}
                                                            <Tooltip placement="topLeft" title={task.lastEexRst.errorMsg}><i className="red">{task.lastEexRst.errorMsg}</i></Tooltip></p>
                                                    </div>))
                                                : (<i style={{margin: '0'}} className="red">任务未执行</i>)}

                                            <hr className="hr-sh"/>
                                            <div style={{height: '58px'}}></div>
                                            <ul className="xp-img text-center clearfix">
                                                {
                                                    task.dataSourceList ? (
                                                        (task.dataSourceList || []).map(function (dataSource, j) {
                                                            return (
                                                                <li key={'dataSource' + j}>
                                                                    <a href="javascript:void(0)">
                                                                        <span
                                                                            className="glyphicon glyphicon-picture img-01"></span>
                                                                        <p title={dataSource.name}>{dataSource.name}</p>
                                                                    </a>
                                                                </li>
                                                            )
                                                        }.bind(this))
                                                    ) : null}
                                            </ul>
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