import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import alert from '../../../common/utils/alert'
import {
} from '../selectors';
import {
    closeShareWin,saveArrangeService,modelListData,entityListData,tableListData,cacheCurrentFlowData
} from '../actions';
/*图形编辑器组件引入*/
import {
    DataLink,
    MdSimpleShareComponent,
    MdShareOutComponentConvert,
    ShareComponent
} from '../editor/figures'
import QuartzComponentConvert from '../../../common/editorComponents/figures/QuartzComponentConvert/index'
import TimerComponentConvert from '../../../common/editorComponents/figures/TimerComponentConvert/index'
import QuartzComponentWin from '../../../common/editorComponents/actions/QuartzComponentConvert'
import TimerComponentWin from '../../../common/editorComponents/actions/TimerComponentConvert'
import EditorActions from '../editor/actions/EditorActions';
import Layer from '../editor/layers'
import {UUIDUtil, Editor} from 'gilight-editor'
import EntityFiledShareWin from '../editor/actions/entityFiledShareWin'
import DataServerWin from '../editor/actions/dataServerWin'
import {entityFieldShareWin,getCacheFigureData,getSelectTaskFlow} from '../selectors'
import {requestTaskEditFlow} from '../actions'

export class TaskServiceEditFlowPage extends Component {
    constructor(props) {
        super(props);
        this.clearCache=true;
        this.props.requestTaskEditFlow(this.props.params.taskId);
        this.taskFlowId='';
        this.flowDefine='';
    }

    state = {
        registAction: false,
        renderFigure: false,
    };
    componentDidUpdate(){
        let {taskFlow} = this.props;
        let {serviceEditor} = this.refs;
        if (!serviceEditor) return;
        /*给编辑器的上下文菜单注册事件*/
        if (!this.state.registAction) {
            EditorActions.registActions(this, serviceEditor);
            this.state.registAction = true;
        }
        if (taskFlow && taskFlow.flowDefine) {
            if(this.taskFlowId!==taskFlow.id || !(this.flowDefine==taskFlow.flowDefine)){
                serviceEditor.clearAll();
                let tempRelations = [];
                let taskDefine = JSON.parse(taskFlow.flowDefine);
                let components = taskDefine.componentSettings;
                let relations = taskDefine.componentRelations;
                relations.map(function (relation, index) {
                    relation.viewConfig = relation.viewInfo;
                    tempRelations.push(relation);
                });
                serviceEditor.addModels(components);
                serviceEditor.addModels(tempRelations);
            }
            this.taskFlowId=taskFlow.id;
            this.flowDefine=taskFlow.flowDefine;
        }else if(taskFlow && !taskFlow.flowDefine &&this.clearCache){
            serviceEditor.clearAll();
            this.clearCache=false;
        }
    }
    render() {
        let options = {
            rightWidth: 0    //不渲染右边属性窗
        };
        let {showEntityFieldShareWin,showDataServerWin,showQuartzComponentWin,showTimerComponentWin,componentData,dispatch} = this.props;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to="service">{this.props.params.taskName}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>任务编排</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent">
                    <button type="button" className="btn-css" style={{marginBottom:0}}
                            onClick={this.saveCurrentTaskArray.bind(this)}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"/>保存
                    </button>
                    <div style={{height: "92%", marginTop: 10, border: '1px solid #ddd'}}>
                        <Editor className="editor"
                                ref="serviceEditor"
                                models={[DataLink, MdSimpleShareComponent,MdShareOutComponentConvert,QuartzComponentConvert,TimerComponentConvert]}
                                options={options}
                                layers={Layer}
                        />
                        <EntityFiledShareWin
                            show={showEntityFieldShareWin}
                            componentData={componentData}
                            onCloseWindow={()=>{dispatch(closeShareWin('openShareComponentConvert'))}}
                            onSubmit={()=>{}}
                            editor={this.refs.serviceEditor}
                        />
                        <DataServerWin
                            show={showDataServerWin}
                            componentData={componentData}
                            onCloseWindow={()=>dispatch(closeShareWin('openShareOutComponentConvert'))}
                            onSubmit={()=>{}}
                            editor={this.refs.serviceEditor}
                        />
                        <QuartzComponentWin
                            show={showQuartzComponentWin}
                            componentData={componentData}
                            onCloseWindow={()=>dispatch(closeShareWin('QuartzComponentConvert'))}
                            editor={this.refs.serviceEditor}
                        />
                        <TimerComponentWin
                            show={showTimerComponentWin}
                            componentData={componentData}
                            onCloseWindow={()=>dispatch(closeShareWin('TimerComponentConvert'))}
                            editor={this.refs.serviceEditor}
                        />
                    </div>
                </div>
            </div>

        )
    }

    /**
     * 保存任务的流程编排
     */
    saveCurrentTaskArray() {
        let me = this, layer, components, componentsRelations;
        let {serviceEditor} = this.refs;
        layer = serviceEditor.getDataManager().getCurrentEditLayer();
        components = layer.getAllModels(false, true);
        componentsRelations = layer.getAllModels(true, false);
        let taskDefine = me._toJson(components, componentsRelations);
        this.props.dispatch(saveArrangeService(taskDefine,this.props.params.taskId));
    }

    /**
     * 将流程定义转化为json数据
     * @param components 节点
     * @param componentsRelations 线
     * @private
     */
    _toJson(components, componentsRelations) {
        let me = this, flowDefine = me._getFlowDefineTree(components, componentsRelations);
        if (flowDefine) {
            return JSON.stringify(flowDefine);
        } else {
            return null;
        }
    }

    /**
     * 获取流程任务的组件定义
     * @param components
     * @param componentsRelations
     * @private
     */
    _getFlowDefineTree(components, componentsRelations) {
        let me = this, flowDefine = {
            id: this.props.params.taskId,
            componentSettings: [],//流程的组件
            componentRelations: []//流程的关系
        };
        //流程的输出字段
        components = components ? components : [];
        componentsRelations = componentsRelations ? componentsRelations : [];
        $.each(components, function (index, component) {
            flowDefine.componentSettings.push(component.getPerAttsIngnoreSet());
            // delete component.data.viewConfig.userData;
            // flowDefine.componentSettings.push(component.data);
        });
        $.each(componentsRelations, function (index, relation) {
            flowDefine.componentRelations.push(relation.getPerAttsIngnoreSet());
            // delete relation.data.viewConfig.userData;
            // flowDefine.componentRelations.push(relation.data);
        });
        return flowDefine;
    }

    /**
     * 请求前一组件的采集表信息
     * pubTables结构：
     * {id：prePubTableMeta,
     *  id：prePubTableMeta,
     *  ...
     * }
     */
    requestFlowField(componentId) {
        let me = this, fields = [], preFields, previousComs = me.getPreviousComponents(componentId);
        if (!previousComs || previousComs.length == 0) {
            //前面没有组件，返回任务的默认输入流结构
            alert("没有获取到流字段，请检查前一组件", 'error');
        }
        $.each(previousComs, function (index, component) {//遍历前面的组件，合并流结构
            preFields = component.data.pubTableMeta ? component.data.pubTableMeta.tableFileds : null;
            if (preFields) {
                $.each(preFields, function (index, preField) {
                    preField.tableName = component.data.pubTableMeta.tableName;
                });
                fields = fields.concat(preFields)
            }
        });
        me.props.dispatch(setComponentFlowFields(fields));
    }

    /**
     * 获取前面的所有组件
     */
    getPreviousComponents(componentId) {
        let me = this, layer, components, componentsRelations;
        let {editor} = this.refs;
        layer = editor.getDataManager().getCurrentEditLayer();
        let previousComIds = [], previousModels = [];
        components = layer.getAllModels(false, true);
        componentsRelations = layer.getAllModels(true, false);
        $.each(componentsRelations, function (index, record) {
            if (record.data.viewConfig.targetNodeId === componentId) {
                var previousComId = record.data.viewConfig.srcNodeId;
                previousComIds.push(previousComId);
            }
        });
        if (previousComIds.length == 0) {//没有找到，返回空
            return null;
        }
        $.each(components, function (index, component) {//查找前一個組件
            if ((previousComIds.indexOf(component.data.id)) >= 0) {//判断是否属于前面的组件集合
                previousModels.push(component);
            }
        });
        return previousModels;
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestTaskEditFlow: (taskId)=> {dispatch(requestTaskEditFlow(taskId))},
    };
}


const mapStateToProps = createStructuredSelector({
    showEntityFieldShareWin:entityFieldShareWin("openShareComponentConvert"),
    showDataServerWin:entityFieldShareWin("openShareOutComponentConvert"),
    showQuartzComponentWin:entityFieldShareWin("QuartzComponentConvert"),
    showTimerComponentWin:entityFieldShareWin("TimerComponentConvert"),
    componentData:getCacheFigureData(),
    taskFlow:getSelectTaskFlow()
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskServiceEditFlowPage);