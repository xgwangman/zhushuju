require('../../../../css/style.css');
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import AddSreTaskForm from '../component/AddSreTask';
import {createStructuredSelector} from 'reselect';
import {
    selectEntityTaskAttr,
    selectDomainData,
    selectModelData,
    selectEntityData,
    selectUPDrcList,
    selectEntityTaskType
} from '../selectors';
import {reqDataSourceList, setTaskAttr, onSaveTask,savedateDomainService} from '../actions';


export class addServiceTaskPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestDataSourceList();
    }

    render() {
        return (
            <div className="xp-header ret">
                <AddSreTaskForm dataAttr={this.props.taskAttr}
                                upDrcList={this.props.upDrcList}
                                taskType={this.props.taskType}
                                onChangeTaskAttr={this.onChangeTaskAttr.bind(this)}
                                saveTask={this.props.onSaveTask}
                >
                </AddSreTaskForm>
            </div>

        )
    }

    /**
     * 改变属性的属性后，将属性的属性值更新为最新，并更新state中的属性数据
     * @param evt
     * @param sign
     */
    onChangeTaskAttr(evt, sign) {
        var me = this;
        var taskAttr = this.props.taskAttr;
        var taskObj = {};
        // 深拷贝对象taskAttr
        $.extend(true, taskObj, taskAttr);
        if (sign == "dataSrc") {
            taskObj["dsIds"] = evt;
        } else {
            taskObj[sign] = evt.target.value;
        }
        me.props.dispatch(setTaskAttr(taskObj));
    };
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
addServiceTaskPage.propTypes = {
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
        onSaveTask: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(savedateDomainService(true));
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

export default connect(mapStateToProps, mapDispatchToProps)(addServiceTaskPage);