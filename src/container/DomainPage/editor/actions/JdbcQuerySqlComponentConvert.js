import React, {Component, PropTypes} from 'react';
import {Modal, Form, Input, Button, Row, Select, Col, Icon} from 'antd';
import FieldListTable from '../../component/FieldListTable';
import CodeMirror from '../../../../common/components/CodeMirror';
import alert from '../../../../common/utils/alert';
require('../../../../../node_modules/codemirror/mode/sql/sql.js');
const uuidV4 = require('uuid/v4');
const InputGroup = Input.Group;
const Option = Select.Option;
let uuid = 0;
import {requestTables,excuteSqlSentence} from '../../actions'


/* JDBC单表SQL采集 */
class JdbcQuerySqlComponentConvert extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        dataSource: null,
        table: null,
        tableFields: null,
        requestTable: false,
        sql:null,
        initStatus:true,
        newStatus:true,
        codeMirrorIsRender:false,
        selectedRowKeys:[]
    };
 /*   componentDidUpdate(){
        let componentData = this.props.componentData;
        if(this.state.codeMirrorIsRender && componentData && componentData.pubTableMeta){
            window.codeEditor.setValue(componentData.pubTableMeta.sql);
        }
    }
    componentDidMount(){
        console.log('父组件渲染完成了。。。。。')
    }*/
    render() {
        let {
            show, taskAttr, componentData, tableList, fieldList, onCloseWindow, selectADataSrc, selectATable
        } = this.props;
        this.requestRelationData(show);
        let FormItem = Form.Item;
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 20},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 20,
                    offset: 0,
                },
                sm: {
                    span: 20,
                    offset: 2,
                },
            },
        };
        return (
            <Modal title="JDBC单表SQL采集"
                   visible={show}
                   onCancel={()=>{this.beforeCloseWin();onCloseWindow()}}
                   width={620}
                   footer={[
                       <Button key="back" type="primary" size="large" onClick={()=>{this.beforeCloseWin();onCloseWindow()}}>取消</Button>,
                       <Button key="submit"
                               style={{marginRight: 50}}
                               type='primary'
                               size="large"
                               onClick={this.handleSumit}>
                           保存
                       </Button>
                   ]}
            >
                <Form>
                    <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('name', {
                            initialValue: componentData ? componentData.name : null,
                            rules: [{required: true, message: '名称不能为空'}],
                        })(
                            <Input size="large" placeholder="名称"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="数据源">
                        {getFieldDecorator('dataSrc', {
                            initialValue: componentData ? componentData.dsId : null,
                            rules: [{required: true, message: '数据源不能为空'}],
                        })(
                            <Select size={'large'} placeholder="数据源名称" onSelect={(id)=> {
                                selectADataSrc(id);
                                this.onSelectToCacheData(id, "dataSource");
                            }}>
                                {(taskAttr&&taskAttr.dataSourceList || []).map((item, idx)=><Option
                                    key={"datasrc" + idx}
                                    value={item.id}>{item.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="数据表">
                        {getFieldDecorator('table', {
                            initialValue: componentData ? (componentData.pubTableMeta ? componentData.pubTableMeta.tableId : null) : null,
                            rules: [{required: true, message: '数据表不能为空'}],
                        })(
                            <Select size={'large'} placeholder="数据表名称" onSelect={(id, option)=> {
                                this.onSelectToCacheData(id, "table");
                            }}>
                                {(tableList || []).map((item, idx)=><Option key={"table" + idx}
                                                                            value={item.id}>{item.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="sql编辑">
                        {getFieldDecorator('codeEdit', {
                            initialValue: componentData ? (componentData.pubTableMeta ? componentData.pubTableMeta.sql : '') : '',
                        })(
                            <CodeMirror codeMirrorIsMount={this.codeMirrorIsMount}
                                sql={this.state.sql?this.state.sql:''}/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.getSqlSentence}>
                            获取字段
                        </Button>
                    </FormItem>
                    {fieldList || (componentData ? (componentData.pubTableMeta ? componentData.pubTableMeta.tableFileds : null) : null) ? (
                    <div>
                        <Row>
                            <Col>
                            <p style={{marginBottom:15,fontSize:16}}>字段选择：</p>
                            <FieldListTable type="table" dataList={fieldList}
                                            selectedRowKeys={this.state.selectedRowKeys}
                                            getSelectedRowKeys={this.getSelectedRowKeys}
                                            tableAttr={this.state.table}
                                            selectedFields={this.state.tableFields}
                                            setTableFields={this.setTableFields.bind(this)}
                            />
                            </Col>
                        </Row>
                    </div>
                    ) : null}

                </Form>

            </Modal>
        );
    }
    codeMirrorIsMount=(isMount)=>{
        let componentData = this.props.componentData;
        if(componentData && componentData.pubTableMeta){
            window.codeEditor.setValue(componentData.pubTableMeta.sql);
        }
        this.setState({codeMirrorIsRender:true})

    };
    getSelectedRowKeys=(selectedRowKeys)=>{
        this.setState({selectedRowKeys:selectedRowKeys})
    };
    handleSumit=(e)=>{
        this.setState({initStatus:true});
        e.preventDefault();
        this.props.form.validateFields((err, vals) => {
            if (!err) {
                let {editor} = this.props;
                if (editor) {
                    let canvas = editor.getContainerManager().get('Canvas');
                    let showMenuPlugin = this.getObjectByAttr(canvas.plugins, "ShowMenuPlugin", "name");
                    let currentEditFigure = showMenuPlugin.currentEditFigure;
                    let data = currentEditFigure.getUserData().data;
                    data.name = vals.name;
                    data.dsId = vals.dataSrc;
                    data.selectedRowKeys = this.state.selectedRowKeys;
                    data.driverClassName = this.state.dataSource ? this.state.dataSource.dbDriver : null;
                    data.url = this.state.dataSource ? this.state.dataSource.dbUrl : null;
                    data.username = this.state.dataSource ? this.state.dataSource.dbUser : null;
                    data.password = this.state.dataSource ? this.state.dataSource.dbPwd : null;
                    data.pubTableMeta = {
                        tableId: vals.table,
                        tableDisplayName: this.state.table ? this.state.table.tableName : null,
                        tableName: this.state.table ? this.state.table.name : null,
                        tableFileds: this.state.tableFields ? this.state.tableFields : [],
                        conditions: this.state.conditions ? this.state.conditions : [],
                        sql: this.state.sql
                    };
                }
                this.props.form.resetFields();
                this.setState({sql:''});
                this.beforeCloseWin();
                this.props.onCloseWindow();
            }
        })
    };

    requestRelationData=(type)=>{
        let componentData = this.props.componentData;
        if(componentData && componentData.pubTableMeta){
            if(type){
                if(this.state.initStatus){
                    this.props.selectADataSrc(componentData.dsId);
                    this.props.excuteSqlSentence({
                        sql:componentData.pubTableMeta.sql,
                        dsId: componentData.dsId,
                        tableId: componentData.pubTableMeta.tableId
                    });
                    this.setState({initStatus:false,sql:componentData.pubTableMeta.sql,
                        tableFields:componentData.pubTableMeta.tableFileds,selectedRowKeys:componentData.selectedRowKeys});
                }
                if(this.state.codeMirrorIsRender){
                    window.codeEditor.setValue(this.state.sql);
                }
            }
        }else if(type!='undefined'&&!type){
            if(this.state.newStatus){
                this.props.selectADataSrc('xxx');
                this.props.excuteSqlSentence({
                    sql:'',
                    dsId: 'xxx',
                    tableId: 'xxx'
                });
                this.setState({newStatus:false});
            }
        }
    };
    beforeCloseWin=()=>{
        window.codeEditor.setValue('');
        this.setState({newStatus:true,initStatus:true,sql:'',selectedRowKeys:[]});
    };
    /* 更改组件的业务数据 */
    onSelectToCacheData = (value, type)=> {
        if (type == "dataSource") {
            this.state.dataSource = this.getObjectByAttr(this.props.taskAttr.dataSourceList, value, "id");
        } else if (type == "table") {
            let table = this.getObjectByAttr(this.props.tableList, value, "id");
            window.codeEditor.setValue("SELECT * FROM " + table.name);//选中表后，给sql编辑器设定一个默认sql
            this.setState({sql:"SELECT * FROM " + table.name,table:table});
            //this.state.sql = "SELECT * FROM " + this.state.table.name;
        }
    };

    /**
     * 根据属性值从数组中拿到该对象
     * @param array 目标数组
     * @param attr 属性值
     * @param objectAttr 要比较的数组中的对象的属性
     * @returns {*} 对象
     */
    getObjectByAttr = (array, attr, objectAttr)=> {
        for (let i = 0; i < array.length; i++) {
            if ((array[i])[objectAttr] == attr) {
                return array[i];
            }
        }
    };

    /* 缓存selected字段*/
    setTableFields(tableFields) {
        this.setState({tableFields:tableFields});
    }

    /* 执行sql语句 */
    getSqlSentence = ()=> {
        let sql = window.codeEditor.getValue();
        this.setState({sql});
        //this.state.sql = sql;
        let componentData = this.props.componentData;
        if(this.state.dataSource && this.state.table){
            // 判断新增
            if (!this.state.dataSource) {
                alert("请选择数据源", 'error');
                return;
            }
            if (!this.state.table) {
                alert("请选择表", 'error');
                return;
            }
            this.props.excuteSqlSentence({
                sql: this.state.sql,
                dsId: this.state.dataSource.id,
                tableId: this.state.table.id
            });

        } else {
            // 判断是否是修改
            this.props.excuteSqlSentence({
                sql: sql,
                dsId: componentData.dsId,
                tableId: componentData.pubTableMeta.tableId
            });
        }

    }
}

export default   Form.create()(JdbcQuerySqlComponentConvert);