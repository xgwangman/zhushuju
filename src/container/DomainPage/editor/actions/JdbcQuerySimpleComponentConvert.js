import React, {Component, PropTypes} from 'react';
import {Modal, Form, Input, Button, Row, Select, Col, Icon} from 'antd';
import FieldListTable from '../../component/FieldListTable';
const uuidV4 = require('uuid/v4');
const InputGroup = Input.Group;
const Option = Select.Option;
import {requestTables} from '../../actions'
/* JDBC单表SQL采集 */
class JdbcQuerySimpleComponentConvert extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        dataSource: null,
        table: null,
        tableFields: [],
        newStatus:true,
        initStatus:true,
        conditions: [],
        fieldList: [],
        currentCondition: {id: null, keyFiled: null, operation: null, keyStreamFiled: null, value: null},
        requestTable: false,
        selectedRowKeys:[]
    };
    handleSubmit=()=>{
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
                        fieldList:this.props.fieldList.length>0?this.props.fieldList:this.state.fieldList,
                        conditions: this.state.conditions ? this.state.conditions : [],
                        sql: null,
                    };
                }
                this.props.form.resetFields();
                this.props.onCloseWindow();
                this.beforeCloseWin();
            }
        })
    }

    render() {
        let {
            show, taskAttr, componentData, tableList, fieldList, onCloseWindow, selectADataSrc, selectATable
        } = this.props;
        this.requestRelationData(show);
        let FormItem = Form.Item;
        //组件数据为空且表list或字段list为空时，请求表和字段list/或组件数据不为空且requestTable为false时么请求
        // if ((componentData && (!tableList || !fieldList)) || (componentData && !this.state.requestTable)) {
        //     selectADataSrc(componentData.dsId);
        //     selectATable(componentData.pubTableMeta.tableId);
        //     this.state.requestTable = true;
        // }
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: {xs: {span: 20}, sm: {span: 4}},
            wrapperCol: {xs: {span: 24}, sm: {span: 18}},
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {span: 20, offset: 0},
                sm: {span: 20, offset: 2},
            },
        };
        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');
        return (
            <Modal title="JDBC单表采集"
                   visible={show}
                   width={660}
                   onCancel={()=>{onCloseWindow();this.beforeCloseWin();}}
                   maskClosable={false}
                   footer={[
                       <Button key="back" type="primary" size="large" onClick={()=>{onCloseWindow();this.beforeCloseWin();}}>取消</Button>,
                       <Button key="submit"
                               style={{marginRight: 50}}
                               type='primary'
                               size="large"
                               onClick={this.handleSubmit}>
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

                    <FormItem {...formItemLayout} label="数据源" >
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

                    <FormItem {...formItemLayout} label="数据表" >
                            {getFieldDecorator('table', {
                                initialValue: componentData ? (componentData.pubTableMeta ? componentData.pubTableMeta.tableId : null) : null,
                                rules: [{required: true, message: '数据表不能为空'}],
                            })(
                                <Select notFoundContent={'请先选择数据源'} size={'large'} placeholder="数据表名称" onSelect={(id)=> {
                                    selectATable(id);
                                    this.onSelectToCacheData(id, "table");
                                }}>
                                    {(tableList || []).map((item, idx)=><Option key={"table" + idx}
                                                                                value={item.id}>{item.name}</Option>)}
                                </Select>
                            )}
                    </FormItem>
                    {
                        //保存过后在打开的表格
                        this.state.fieldList.length>0?(
                                <div>
                                    <Row>
                                        <Col>
                                            <p style={{marginBottom:15,fontSize:16}}>字段选择：</p>
                                            <FieldListTable type="table" dataList={this.state.fieldList}
                                                            selectedRowKeys={this.state.selectedRowKeys}
                                                            getSelectedRowKeys={this.getSelectedRowKeys}
                                                            tableAttr={this.state.table}
                                                            selectedFields={componentData ? (componentData.pubTableMeta ? componentData.pubTableMeta.tableFileds : null) : null}
                                                            setTableFields={this.setTableFields.bind(this)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            ):(
                                <div>
                                    <Row>
                                        <Col>
                                            <p style={{marginBottom:15,fontSize:16}}>字段选择：</p>
                                            <FieldListTable type="table" dataList={fieldList}
                                                            selectedRowKeys={this.state.selectedRowKeys}
                                                            getSelectedRowKeys={this.getSelectedRowKeys}
                                                            tableAttr={this.state.table}
                                                            selectedFields={componentData ? (componentData.pubTableMeta ? componentData.pubTableMeta.tableFileds : null) : null}
                                                            setTableFields={this.setTableFields.bind(this)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            )
                    }
                    {fieldList ? (
                        <div>
                            <Row>
                                <Col>
                                    <p style={{marginBottom:15,fontSize:16}}>条件设置：</p>
                                    {(this.state.conditions && this.state.conditions.length > 0) ? (
                                            <div className="media xp-tj-cai">
                                                <div className="media-left   text-nowrap">
                                                    <h5 className="ft-16" style={{marginTop: '10px', marginBottom: '10px'}}>
                                                        当前条件：</h5>
                                                </div>
                                                <div className="media-body">
                                                    <ul className="nav nav-pills">
                                                        {(this.state.conditions || []).map(function (condition, i) {
                                                            return (
                                                                <li key={'currentCondition' + i}>
                                                                    <a href="javascript:void(0)"
                                                                       onClick={(e) =>this.deleteCondition(condition, i)}>
                                                                        {condition.keyFiled}({condition.keyStreamFiled}{condition.value})
                                                                        <button className="badge xp-tj-del btn btn-danger">
                                                                            ×
                                                                        </button>
                                                                    </a></li>
                                                            )
                                                        }.bind(this))}
                                                        <li>
                                                            <p style={{marginTop: '10px', marginBottom: '10px'}}>
                                                                <a href="#" onClick={(e)=>{e.preventDefault();this.clearAllCondition()}}>
                                                                    清除全部
                                                                </a>
                                                            </p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : null}
                                </Col>
                                <Col>
                                    <InputGroup key={this.props.key} compact style={{marginTop: '10px'}}> 属性：
                                        <Select id="conditionName" style={{width: '35%'}}
                                                onSelect={(value, option)=>this.changeCondition(value, 'id', option)}>
                                            {this.state.fieldList.length>0 ?
                                                (this.state.fieldList || []).map(function (field, index) {
                                                        return (
                                                            <Option key={'field' + index} value={field.id}>{field.name}</Option>
                                                        )
                                                    }.bind(this)
                                                ) : null
                                            }
                                        </Select>
                                        <Select id="condition" style={{width: '20%'}}
                                                onSelect={(value, option)=>this.changeCondition(value, 'operation', option)}>
                                            <Option value="LIKE">包含</Option>
                                            <Option value="LEFT_LIKE">以开始</Option>
                                            <Option value="RIGHT_LIKE">以结束</Option>
                                            <Option value="EQUAL">等于</Option>
                                            <Option value="UNEQUAL">不等于</Option>
                                            <Option value="GT">大于</Option>
                                            <Option value="GT_EQUAL">大于等于</Option>
                                            <Option value="LESS">小于</Option>
                                            <Option value="LESS_EQUAL">小于等于</Option>
                                        </Select>
                                        <Input id="conditionValue" style={{width: '20%'}} placeholder="值"
                                               onChange={(e)=>this.changeCondition(e, 'value')}/>
                                        <Button type="dashed" size="large" onClick={this.onPlusCondition.bind(this)}>添加条件</Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </div>
                    ) : null}
                </Form>
            </Modal>
        );
    }
    getSelectedRowKeys=(selectedRowKeys)=>{
        this.setState({selectedRowKeys:selectedRowKeys})
    };
    requestRelationData=(type)=>{
        let componentData = this.props.componentData;
        let dataSource={dbDriver:'',dbUrl:'',dbUser:'',dbPwd:''};
        if(componentData && componentData.dsId){
            if(type){
                if(this.state.initStatus){
                    this.props.selectADataSrc(componentData.dsId);
                    let tableFields=componentData.pubTableMeta.tableFileds;
                    let conditions=componentData.pubTableMeta.conditions;
                    /*let fieldList=[];
                    let tempFieldList=$.extend(true, [], tableFields);
                    tempFieldList.map(function (item,index) {
                        let temp={};
                        temp.code=item.aliasName;
                        temp.columeName=item.attColumnName;
                        temp.id=item.id;
                        temp.javaType=item.javaType;
                        temp.jdbcLength=item.length;
                        temp.jdbcIspk=item.isPK;
                        temp.name=item.name;
                        temp.jdbcLength=item.length;
                        temp.tableId=item.tableId;
                        fieldList.push(temp);
                    });*/
                    dataSource.dbDriver=componentData.driverClassName;
                    dataSource.dbUrl=componentData.url;
                    dataSource.dbUser=componentData.username;
                    dataSource.dbPwd=componentData.password;
                    //this.props.selectATable(componentData.pubTableMeta.tableId);
                    this.setState({initStatus:false,selectedRowKeys:componentData.selectedRowKeys,dataSource:dataSource,
                        fieldList:componentData.pubTableMeta.fieldList,tableFields:tableFields,conditions:conditions});
                }
            }
        }else if(type!='undefined'&&!type){
            if(this.state.newStatus){
                this.props.selectADataSrc('xxx');
                this.props.selectATable('xxx');
                this.setState({newStatus:false});
            }
        }
    };
    beforeCloseWin=()=>{
        this.props.form.resetFields();
        this.setState({initStatus:true,newStatus:true,conditions:[],dataSource:[],fieldList:[],tableFields:[]});
    };
    /* 更改组件的业务数据 */
    onSelectToCacheData = (value, type)=> {
        if (type == "dataSource") {
            //this.setState({dataSource:this.getObjectByAttr(this.props.taskAttr.dataSourceList, value, "id")});
            this.state.dataSource = this.getObjectByAttr(this.props.taskAttr.dataSourceList, value, "id");
        } else if (type == "table") {
            //this.setState({table:this.getObjectByAttr(this.props.taskAttr.value, value, "id")});
            this.state.table = this.getObjectByAttr(this.props.tableList, value, "id");
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
        this.setState({tableFields:tableFields})
    }

    /**
     * 条件改变后，将改变后的值赋值给currentCondition
     * @param value
     * @param type
     * @param optionName
     */
    changeCondition(value, type, option) {
        let conditionObject=$.extend(true, {}, this.state.currentCondition);
        switch (type) {
            case "id" :
                conditionObject.id=value;
                conditionObject.keyFiled = option.props.children;
                break;
            case "operation" :
                conditionObject.operation = value;
                conditionObject.keyStreamFiled = option.props.children;
                break;
            case "value" :
                conditionObject.value = value.target.value;
                break;
        }
        this.setState({currentCondition:conditionObject})
    }

    onPlusCondition() {
        let {id, keyFiled, operation, keyStreamFiled, value} = this.state.currentCondition;
        let temp=[...this.state.conditions];
        if (id && keyFiled && operation && keyStreamFiled && value) {
            temp.push(this.state.currentCondition);
            this.setState({conditions:temp});
            //this.state.conditions.push(this.state.currentCondition);
            // this.state.currentCondition = {
            //     id: null,
            //     keyFiled: null,
            //     operation: null,
            //     keyStreamFiled: null,
            //     value: null
            // };
        }
    }

    clearAllCondition() {
        this.setState({conditions:[]});
    }

    deleteCondition(condition, index) {
        let temp=[...this.state.conditions];
        temp.splice(index, 1);
        this.setState({conditions:temp});
    }
}

export default Form.create()(JdbcQuerySimpleComponentConvert);