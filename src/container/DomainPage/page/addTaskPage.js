require('../../../../css/style.css');
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import AddTaskForm from '../component/AddTask';
import {createStructuredSelector} from 'reselect';
import {
    selectEntityTaskAttr,
    selectDomainData,
    selectModelData,  
    selectEntityData,
    selectUPDrcList,
    selectEntityTaskType
} from '../selectors';
import {reqDataSourceList, setTaskAttr, onSaveTask,onUpdateTask,reqTaskById} from '../actions';


export class addTaskPage extends Component {
    constructor(props) {
        super(props);
        if(this.props.params.type=='update'){
            this.props.requestTaskAttr(this.props.params.taskId);
        }else if(this.props.params.type=='add'){
            this.props.requestTaskAttr('xxx');
        }
        this.props.requestDataSourceList();
    }

    render() {
        let {domainName,modelName,modelId,entityName,entityId,taskType,type,taskId}=this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to="/main">{domainName}({modelName})</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/main/entity/"+domainName+'/'+modelName+'/'+modelId)}>{entityName}</Link>
                        </Breadcrumb.Item>
                        {(type == "add") ? (<Breadcrumb.Item>添加任务</Breadcrumb.Item>) : null}
                        {(type == "update") ? (<Breadcrumb.Item>修改任务</Breadcrumb.Item>) : null}
                    </Breadcrumb>
                </div>
                <div className="centerContent">
                    <AddTaskForm dataAttr={this.props.taskAttr}
                                 upDrcList={this.props.upDrcList}
                                 taskType={taskType}
                                 entityId={entityId}
                                 entityName={entityName}
                                 modelId={modelId}
                                 taskId={taskId}
                                 type={type}
                                 modelName={modelName}
                                 domainName={domainName}
                                 onChangeTaskAttr={this.onChangeTaskAttr.bind(this)}
                                 saveTask={this.props.onSaveTask}
                                 updateTask={this.props.onUpdateTask}
                    >
                    </AddTaskForm>
                </div>
        </div>

        )
    }

    /**
     * 改变属性的属性后，将属性的属性值更新为最新，并更新state中的属性数据
     * @param evt
     * @param sign
     */
    onChangeTaskAttr(evt, sign) {
       /* var me = this;
        var taskAttr = this.props.taskAttr;
        var taskObj = {};
        // 深拷贝对象taskAttr
        //$.extend(true, taskObj, taskAttr);
        if (sign == "dataSrc") {
            taskObj["dsIds"] = evt;
        } else {
            taskObj[sign] = evt.target.value;
        }
        taskObj['entityId'] =this.props.params.entityId;
        taskObj['id'] =taskAttr.id;
        me.props.dispatch(setTaskAttr(taskObj));*/
    };
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
addTaskPage.propTypes = {
    requestDataSourceList: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestDataSourceList: () => {
            dispatch(reqDataSourceList(true));
        },
        requestTaskAttr: (taskId) => {
            dispatch(reqTaskById(taskId));
        },
        onSaveTask: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onSaveTask(evt));
        },
        onUpdateTask: (data) => {
            dispatch(onUpdateTask(data));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    taskAttr: selectEntityTaskAttr(),
    taskType: selectEntityTaskType(),
    domainData: selectDomainData(),
    modelData: selectModelData(),
    entityData: selectEntityData(),
    upDrcList: selectUPDrcList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(addTaskPage);