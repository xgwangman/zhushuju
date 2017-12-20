import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Breadcrumb,Modal} from 'antd';
import {hashHistory} from 'react-router';
import {Link, router} from 'react-router';
import {SearchBox} from '../../../common/components/SearchBox';
import TaskElement from '../component/TaskElement';
import {requestEntityTask, setTaskAttr, changeTaskStatus,setTaskName} from '../actions';
import {
    selectDomainData,
    selectModelData,
    selectEntityData,
    selectEntityTaskList,
    selectEntityTaskType
} from '../selectors';


export class entityTaskPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestEntityTask({entityId:this.props.params.entityId,taskType:this.props.params.taskType,nameLike:''});
        this.state ={
            taskName:''
        }
    }
    render() {
        let {domainName,modelName,modelId,entityName,taskType,entityId}=this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/main">{domainName}({modelName})</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/main/entity/"+domainName+'/'+modelName+'/'+modelId)}>
                                {entityName}
                            </Link>
                        </Breadcrumb.Item>
                        {(taskType == "gather") ? (<Breadcrumb.Item>采集任务管理</Breadcrumb.Item>) : null}
                        {(taskType == "share") ? (<Breadcrumb.Item>共享任务管理</Breadcrumb.Item>) : null}
                    </Breadcrumb>
                    <SearchBox placeholder="任务名称" onChange={(e)=>{this.props.requestEntityTask({entityId:entityId,taskType:taskType,nameLike:e.target.value})}}/>
                </div>
                <div className="centerContent">
                    <button type="button" className="btn-css"
                            onClick={(e) => {
                                hashHistory.push(encodeURI('main/entity/tasks/addTask/'+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+entityId+'/'+taskType+'/add'));
                            }}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加
                    </button>
                    <TaskElement dataList={this.props.taskList}
                                 domainName={domainName}
                                 modelName={modelName}
                                 modelId={modelId}
                                 entityName={entityName}
                                 entityId={entityId}
                                 taskType={taskType}
                                 setTaskAttr={this.props.setTaskAttr}
                                 removeTask={this.props.removeTask}
                                 enableTask={this.props.enableTask}
                                 startTask={this.props.startTask}
                                 stopTask={this.props.stopTask}
                                 disableTask={this.props.disableTask}
                                 onCheckTask={this.props.taskName}
                    >
                    </TaskElement>
                </div>
            </div>
        )
    }

}
/**
 *
 */
entityTaskPage.propTypes = {
    requestEntityTask: React.PropTypes.func,
    setTaskAttr: React.PropTypes.func,
    enableTask: React.PropTypes.func,
};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestEntityTask: (entityId) => {
            dispatch(requestEntityTask(entityId));
        },
        setTaskAttr: (evt, task) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setTaskAttr(task));
        },
        enableTask: ( taskId,taskType,entityId) => {
            dispatch(changeTaskStatus("enable",taskId,taskType,entityId));
        },
        removeTask: (taskId,taskName,taskType,entityId) => {
            Modal.confirm({
                title: '你确定要删除 ' +taskName + ' 采集任务吗？',
                content: taskName,
                onOk() {
                    dispatch(changeTaskStatus("delete", taskId,taskType,entityId));
                },
                onCancel() {
                }
            });
        },
        disableTask: (taskId,taskType,entityId) => {
            dispatch(changeTaskStatus("disable",taskId,taskType,entityId));
        },
        startTask: (taskId,taskType,entityId) => {
            dispatch(changeTaskStatus("start",taskId,taskType,entityId));
        },
        stopTask: (taskId,taskType,entityId) => {
            dispatch(changeTaskStatus("stop",taskId,taskType,entityId));
        },
        taskName:(task)=>{
            dispatch(setTaskName(task))
        }

    };
}


const mapStateToProps = createStructuredSelector({
    domainData: selectDomainData(),
    modelData: selectModelData(),
    entityData: selectEntityData(),
    taskList: selectEntityTaskList(),
    taskType: selectEntityTaskType(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(entityTaskPage);