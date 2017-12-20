import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import alert from '../../../common/utils/alert'
import {
    selectEntityTaskAttr,
    selectDomainData,
    selectModelData,
    selectEntityData,
    selectTaskFlow,
    selectEditWindowState,
    selectUPDrcList,
    selectTableList,
    selectFieldList,
    selectComponentData,
    selectAttrList,
    selectFlowFields,
    selectSQLFieldlist,
    selectSimpleTableFieldList,
    selectEntityBaseAttrList
} from '../selectors';
import {
    saveTaskArray,
    reqTaskArrayList,
    reqTaskById,
    closeEditWindow,
    requestTables,
    requestFields,
    onRequestAttrList,
    onRequestBaseAttrList,
    setComponentFlowFields,
    excuteSqlSentence,setCurrentEditComponentData,setTaskAttr,updateTableList,updateFieldList,updateTaskArrayList
} from '../actions';
/*图形编辑器组件引入*/
import {
    DataLink,
    JdbcQuerySimpleComponent,
    JdbcQuerySqlComponent,
    MdInsertUpdateComponent,
    MdSynComponent,JavaScriptComponentConvert
} from '../editor/figures'
import QuartzComponentConvert from '../../../common/editorComponents/figures/QuartzComponentConvert';
import TimerComponentConvert from '../../../common/editorComponents/figures/TimerComponentConvert';
import EditorActions from '../editor/actions/EditorActions';
import Layers from '../editor/layers';
import JdbcSimpleTableConvert from '../editor/actions/JdbcQuerySimpleComponentConvert';
import JdbcQuerySqlComponentConvert from '../editor/actions/JdbcQuerySqlComponentConvert';
import MdInsertUpdateConvert from '../editor/actions/MdInsertUpdateComponentConvert';
import MdSynComponentConvert from '../editor/actions/MdSynComponentConvert';
import TimerComponent from '../../../common/editorComponents/actions/TimerComponentConvert';
import QuartzComponent from '../../../common/editorComponents/actions/QuartzComponentConvert';
import JavaScriptComponent from '../editor/actions/JavaScriptComponentConvert';

import {UUIDUtil, Editor} from 'gilight-editor'


export class taskEditFlowPage extends Component {
    constructor(props) {
        super(props);
        //目的 为了清除缓存
        this.props.requestTaskEditArray(this.props.params.taskId);
        this.props.requestEntityAttributes(this.props.params.entityId);
        this.props.requestTaskAttr(this.props.params.taskId);
        this.clearCache=true;
        this.taskFlowId='';
        this.flowDefine='';
    }
    state = {
        registAction: false,
        renderFigure: false,
        clearFigure:false
    };
    renderEditorLayer() {
        let {dispatch, taskFlow} = this.props;
        let {editor} = this.refs;
        if (!editor) return;
        let layer = editor.getDataManager().getCurrentEditLayer();
        if (!layer) return;
        /*给编辑器的上下文菜单注册事件*/
        if (!this.state.registAction) {
            EditorActions.registActions(this, editor);
            this.state.registAction = true;
        }
        if (taskFlow && taskFlow.flowDefine) {
            if(this.taskFlowId!==taskFlow.id || !(this.flowDefine==taskFlow.flowDefine)){
                editor.clearAll();
                let tempRelations=[];
                let taskDefine = JSON.parse(taskFlow.flowDefine);
                let components = taskDefine.componentSettings;
                let relations = taskDefine.componentRelations;
                relations.map(function (relation,index) {
                    relation.viewConfig=relation.viewInfo;
                    tempRelations.push(relation);
                });
                editor.addModels(components);
                editor.addModels(tempRelations);
            }
            this.taskFlowId=taskFlow.id;
            this.flowDefine=taskFlow.flowDefine;
        }else if(taskFlow && !taskFlow.flowDefine &&this.clearCache){
            editor.clearAll();
            this.clearCache=false;
        }
    }
    beforeCloseWin=()=>{
        let {dispatch}=this.props;
        this.props.clickOneDataSrcForReqTables('xxx');
        this.props.clickOnetableForReqFields('xxx');
    };
    render() {
        this.renderEditorLayer();
        let options = {
            rightWidth: 0    //不渲染右边属性窗
        };
        let {domainData,
            modelData,
            entityData,
            taskAttr,
            taskFlow,
            tableList,
            fieldList,
            showJdbcSimpleTableConvert,
            showJdbcQuerySqlConvert,
            showMdInsertUpdateConvert,
            showQuartzComponentConvert,
            showMdSynComponentConvert,
            showTimerComponentConvert,
            componentData,
            closeComponentWindow,
            clickOneDataSrcForReqTables,
            clickOnetableForReqFields,
            showJavaScriptComponentConvert,

            sqlTfieldList,
            SimpleTableFieldList
        } = this.props;
        let {domainName,modelName,entityName,taskName,modelId,entityId,taskId,taskType}=this.props.params;
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
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/main/entity/task/"+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+entityId+'/'+taskType)}>{taskName}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>任务编排</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div  className="centerContent ">
                <button type="button" className="btn-css" style={{marginBottom:0}}
                        onClick={()=>{this.saveCurrentTaskArray()}}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 保存
                </button>
                <div style={{height: "92%", marginTop: 10, border: '1px solid #ddd'}}>
                    <Editor className="editor"
                            ref="editor"
                            models={[
                                DataLink,
                                JdbcQuerySimpleComponent,
                                JdbcQuerySqlComponent,
                                MdInsertUpdateComponent,
                                MdSynComponent,
                                QuartzComponentConvert,
                                TimerComponentConvert,
                                JavaScriptComponentConvert
                            ]}
                            options={options}
                            layers={Layers}
                    ></Editor>
                </div>
                <JdbcSimpleTableConvert show={showJdbcSimpleTableConvert}
                                        editor={this.refs.editor}
                                        entityId={entityId}
                                        taskAttr={taskAttr}
                                        taskFlow={taskFlow}
                                        tableList={tableList}
                                        fieldList={fieldList}
                                        componentData={componentData}
                                        selectADataSrc={clickOneDataSrcForReqTables}
                                        selectATable={clickOnetableForReqFields}
                                        onCloseWindow={() => {
                                            this.beforeCloseWin();
                                            closeComponentWindow("JdbcQuerySimpleComponentConvert")
                                        }}
                ></JdbcSimpleTableConvert>
                <JdbcQuerySqlComponentConvert show={showJdbcQuerySqlConvert}
                                              editor={this.refs.editor}
                                              taskAttr={taskAttr}
                                              taskFlow={taskFlow}
                                              tableList={tableList}
                                              fieldList={sqlTfieldList}
                                              componentData={componentData}
                                              selectADataSrc={clickOneDataSrcForReqTables}
                                              selectATable={clickOnetableForReqFields}
                                              onCloseWindow={() => {
                                                  this.beforeCloseWin();
                                                  closeComponentWindow("JdbcQuerySqlComponentConvert")
                                              }}
                                              excuteSqlSentence={this.props.excuteSqlSentence}
                                              dispatch={this.props.dispatch}
                ></JdbcQuerySqlComponentConvert>
                <MdInsertUpdateConvert show={showMdInsertUpdateConvert}
                                       editor={this.refs.editor}
                                       entityId={entityId}
                                       entityAttrList={this.props.entityAttrList}
                                       entityData={this.props.entityData}
                                       componentData={componentData}
                                       requestEntityAttributes={this.props.requestEntityBaseAttributes}
                                       onCloseWindow={() => {
                                           closeComponentWindow("MdInsertUpdateComponentConvert")
                                       }}
                                       requestFlowField={this.requestFlowField.bind(this)}
                                       flowFields={this.props.flowFields}
                ></MdInsertUpdateConvert>
                <MdSynComponentConvert show={showMdSynComponentConvert}
                                       editor={this.refs.editor}
                                       entityId={entityId}
                                       entityAttrList={this.props.entityAttrList}
                                       entityData={this.props.entityData}
                                       componentData={componentData}
                                       requestEntityAttributes={this.props.requestEntityBaseAttributes}
                                       onCloseWindow={() => {
                                           closeComponentWindow("MdSynComponentConvert")
                                       }}
                                       requestFlowField={this.requestFlowField.bind(this)}
                                       flowFields={this.props.flowFields}
                ></MdSynComponentConvert>
                <TimerComponent show={showTimerComponentConvert}
                                editor={this.refs.editor}
                                onCloseWindow={() => {
                                    closeComponentWindow("TimerComponentConvert")
                                }}
                                componentData={componentData}
                ></TimerComponent>
                <QuartzComponent show={showQuartzComponentConvert}
                                 editor={this.refs.editor}
                                 onCloseWindow={() => {
                                     closeComponentWindow("QuartzComponentConvert")
                                 }}
                                 componentData={componentData}
                ></QuartzComponent>
                <JavaScriptComponent show={showJavaScriptComponentConvert}
                                     editor={this.refs.editor}
                                     onCloseWindow={() => {
                                         closeComponentWindow("JavaScriptComponentConvert")
                                     }}
                                     componentData={componentData}
                ></JavaScriptComponent>
            </div>
            </div>
        )
    }

    /**
     * 保存任务的流程编排
     */
    saveCurrentTaskArray() {
        let {domainName,modelName,entityName,modelId,entityId,taskId,taskType}=this.props.params;
        let me = this, layer, components, componentsRelations;
        let {editor} = this.refs;
        layer = editor.getDataManager().getCurrentEditLayer();
        components = layer.getAllModels(false, true);
        componentsRelations = layer.getAllModels(true, false);
        let taskDefine = me._toJson(components, componentsRelations);
        let data={domainName:domainName,modelName:modelName,entityName:entityName,modelId:modelId,entityId:entityId,taskId:taskId,taskType:taskType,taskDefine:taskDefine};
        this.props.dispatch(saveTaskArray(data));
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
            id: this.props.taskAttr.id,
            componentSettings: [],//流程的组件
            componentRelations: [],//流程的关系
        };
        //流程的输出字段
        components = components ? components : [];
        componentsRelations = componentsRelations ? componentsRelations : [];
        $.each(components, function (index, component) {
           // delete component.data.viewConfig.userData;
            flowDefine.componentSettings.push(component.getPerAttsIngnoreSet());
        });
        $.each(componentsRelations, function (index, relation) {
            //delete relation.data.viewConfig.userData;
            flowDefine.componentRelations.push(relation.getPerAttsIngnoreSet());
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
        let me = this, fields = [],allFields = [], preFields, previousComs = me.getPreviousComponents(componentId);
        if (!previousComs || previousComs.length == 0) {
            //前面没有组件，返回任务的默认输入流结构
            alert("没有获取到流字段，请检查前一组件", 'error');
            return
        }
        previousComs.map((component,index)=>{
            preFields = component.data.pubTableMeta ? component.data.pubTableMeta.tableFileds : null;
            if (preFields) {
                preFields.map(function (preField,index) {
                    preField.tableName = component.data.pubTableMeta.tableName;//每个流字段添加一个tableName的属性，傳給後台用
                    preField.description = '';
                });
                fields = fields.concat(preFields)
            }
        });
        return fields;
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
                let previousComId = record.data.viewConfig.srcNodeId;
                previousComIds.push(previousComId);//所有的srcNodeId
            }
        });
        if (previousComIds.length == 0) {//没有找到，返回空
            return null;
        }
        $.each(components, function (index, component) {//查找前一個組件
            if ((previousComIds.indexOf(component.data.id)) >= 0) {//判断是否属于前面的组件集合
                previousModels.push(component);//拿到所有的連線源图元
            }
        });
        return previousModels;
    }
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
taskEditFlowPage.propTypes = {
    saveCurrentTaskArray: React.PropTypes.func,
    requestTaskEditArray: React.PropTypes.func,
    closeComponentWindow: React.PropTypes.func,
    reqDataSrcList: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestTaskEditArray: (taskId) => {
            dispatch(reqTaskArrayList(taskId));
        },
        requestTaskAttr: (taskId) => {
            dispatch(reqTaskById(taskId));
        },
        closeComponentWindow: (window) => {
            dispatch(closeEditWindow(window));
        },
        clickOneDataSrcForReqTables: (id) => {
            dispatch(requestTables(id));
        },
        clickOnetableForReqFields: (id) => {
            dispatch(requestFields(id));
        },
        requestEntityAttributes: (entityId) => {
            dispatch(onRequestAttrList(entityId));
        },
        requestEntityBaseAttributes: (entityId) => {
            dispatch(onRequestBaseAttrList(entityId));
        },
        excuteSqlSentence: (params) => {
            dispatch(excuteSqlSentence(params));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    taskAttr: selectEntityTaskAttr(),
    domainData: selectDomainData(),
    modelData: selectModelData(),
    entityData: selectEntityData(),
    taskFlow: selectTaskFlow(),
    dataSrcList: selectUPDrcList(),
    tableList: selectTableList(),
    fieldList: selectFieldList(),
    entityAttrList: selectAttrList(),
    entityBaseAttrList: selectEntityBaseAttrList(),
    //
    sqlTfieldList:selectSQLFieldlist(),
    SimpleTableFieldList:selectSimpleTableFieldList(),
    showJdbcSimpleTableConvert: selectEditWindowState("JdbcQuerySimpleComponentConvert"),
    showJdbcQuerySqlConvert: selectEditWindowState("JdbcQuerySqlComponentConvert"),
    showMdInsertUpdateConvert: selectEditWindowState("MdInsertUpdateComponentConvert"),
    showMdSynComponentConvert: selectEditWindowState("MdSynComponentConvert"),
    showTimerComponentConvert: selectEditWindowState("TimerComponentConvert"),
    showQuartzComponentConvert: selectEditWindowState("QuartzComponentConvert"),
    showJavaScriptComponentConvert: selectEditWindowState("JavaScriptComponentConvert"),
    componentData: selectComponentData(),
    flowFields: selectFlowFields(),//注意：该数据必须在当前组件调用 this.props.requestFlowField(id)方法，获取该组件的流字段后才可使用。
});

export default connect(mapStateToProps, mapDispatchToProps)(taskEditFlowPage);