/**
 * Created by Administrator on 2017-6-13.
 */
import React,{Component,PropTypes} from 'react';
import { Modal,Form, Input, Button,Row,Select,Col,Table,Radio  } from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectBaseDomainServiceList,selectModelServiceList,selectEntityServiceList,selectTableServiceData} from '../../selectors'
import {requestDomainServiceList,requestModelList,requestEntityList,requestTableDataList,modelListData,entityListData,tableListData,cacheCurrentFlowData} from '../../actions'
import {UUIDUtil} from 'gilight-editor'
class EntityFiledShareWin extends Component{
    constructor(props){
        super(props);
        this.props.loadDomainList();
        this.state={
            tableFieldData:{},
            radioValue:'',
            initStatus:true,
            newStatus:true,
            selectedFields:[],
            selectedRowKeys:[]
        }
    }
    componentWillReceiveProps(){
        let {componentData} =this.props;
        if(componentData && componentData.domainId){
            if(this.state.initStatus){
                this.props.loadModelList({id:componentData.domainId});
                this.props.loadEntityList(componentData.modelId);
                this.props.loadTableDataList(componentData.entityId);
                this.setState({initStatus:false})
            }
            this.setState({selectedRowKeys:componentData.selectedRowKeys,radioValue:componentData.radioValue});
        }else{
            if(this.state.newStatus){
                // let {dispatch}=this.props;
                // dispatch(modelListData([]));
                // dispatch(entityListData([]));
                // dispatch(tableListData([]));
                //modelListData,entityListData,tableListData
                this.props.loadModelList({id:'xxx'});
                this.props.loadEntityList('xxx');
                this.props.loadTableDataList('xxx');
                this.setState({newStatus:false})
            }
        }
    }
    componentWillMount(){
        let {componentData} =this.props;
        if(componentData && componentData.domainId){
            this.props.loadModelList({id:componentData.domainId});
            this.props.loadEntityList(componentData.modelId);
        }
    }
    static propTypes = {
        onSubmit : PropTypes.func.isRequired,
        onCloseWindow : PropTypes.func.isRequired,
    };
    onSelectDomain=(val)=>{
        if(val=='' || val==null) return ;
        this.props.loadModelList({id:val});
        this.props.form.setFieldsValue({
            model:'',entity:''
        })
    };
    onSelectModel=(val)=>{
        if(val=='' || val==null) return ;
        this.props.loadEntityList(val);
        this.props.form.setFieldsValue({
            entity:''
        })
    };
    onLoadTableData=(val)=>{
        if(val=='' || val==null) return ;
        this.props.loadTableDataList(val)
    };
    getObjectByAttr = (array, attr, objectAttr)=> {
        for (let i = 0; i < array.length; i++) {
            if ((array[i])[objectAttr] == attr) {
                return array[i];
            }
        }
    };
    onRadioChange=(e)=>{
        console.log(e.target.value);
        this.setState({radioValue:e.target.value});
        let tableFieldDate = this.state.tableFieldData;
        let {componentData} =this.props;
        if(tableFieldDate && tableFieldDate.tableFileds){
            tableFieldDate.tableFileds.map( (item,index)=> {
                item.id==e.target.value ? item.isPK=true : item.isPK='';
            });
            this.setState({tableFieldData:tableFieldDate});
        }
        if(componentData && componentData.pubTableMeta && componentData.pubTableMeta.tableFileds){
            componentData.pubTableMeta.tableFileds.map( (item,index)=> {
                item.id==e.target.value ? item.isPK=true : item.isPK='';
            });
            this.setState({tableFieldData:tableFieldDate});
        }
    };
    beforeClose=()=>{
        this.setState({selectedRowKeys:[],radioValue:'',initStatus:true,newStatus:true})
    };
    render() {
        let {domainList,modelList,entityList,tableData,componentData,dispatch} =this.props;
        let columns=[
            {title: '表指定', dataIndex: 'name',width: 150,},
            {title: '类型', dataIndex: 'attType',width: 150,},
            {title: '是否唯一标识',dataIndex: 'id',width: 100,render:(id)=><Radio value={id}/>},
            ];
        let {show} = this.props;
        let FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {labelCol: {xs: { span: 24 }, sm: { span: 4 }}, wrapperCol: {xs: { span: 24 }, sm: { span: 20 }}};
        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                if(selectedRows.length>0){
                    let tableFields=[];
                    selectedRows.map((item,index)=> {
                        //属性集合List
                        let tableField={id:item.id, name:item.columnName, displayName:item.name, javaType:item.attType,
                            aliasName:item.columnName, tableId:item.entityId, tabelName:entityList[0].tableName, length:item.length,
                            isPK:this.state.radioValue==item.id?true:''};
                        tableFields.push(tableField);
                    });
                    this.setState({selectedFields:selectedRows,tableFieldData:{tableId: entityList[0].id, tableDisplayName:entityList[0].name, tableName:entityList[0].tableName, conditions:[], sql: '',tableFileds:tableFields}})
                }
                this.setState({selectedRowKeys:selectedRowKeys,});
            },
        };
        return (
            <Modal title="单实体增量共享" visible={show} onCancel={()=>{this.beforeClose();this.props.onCloseWindow()}} key={componentData&&componentData.id?componentData.id:UUIDUtil.generate()}  footer={null}
                   afterClose={()=>{this.beforeClose();}}
            >
                <Form onSubmit={(e)=> {
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
                                data.domainId =vals.range;//数据子集标识
                                data.modelId = vals.model;    //模型标识
                                data.entityId=vals.entity;   //实体标识
                                data.selectedRowKeys=this.state.selectedRowKeys;   //选中的行
                                data.radioValue=this.state.radioValue?this.state.radioValue:data.radioValue;   //选中的radio
                                data.pubTableMeta = this.state.tableFieldData.tableId?this.state.tableFieldData:data.pubTableMeta;
                                data.selectedFields=this.state.selectedFields.length<=0?data.selectedFields:this.state.selectedFields;
                                currentEditFigure.setUserData(currentEditFigure.getUserData());
                            }
                            //this.setState({initStatus:true,newStatus:true});
                            this.beforeClose();
                            this.props.onCloseWindow();
                        }
                    });
                }} >
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                    >
                        <Row>
                            <Col>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '名称不能为空' }],
                                    initialValue : componentData?componentData.name:''
                                })(
                                    <Input size="large"  />
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="数据子集"
                    >
                        <Row>
                            <Col>
                                {getFieldDecorator('range', {
                                    rules: [{ required: true, message: '数据子集名称不能为空' }],
                                    initialValue : componentData&&componentData.domainId?componentData.domainId:null
                                })(
                                    <Select
                                        size={'large'}
                                        placeholder="请选择数据子集名称"
                                        onChange={(e)=>{this.onSelectDomain(e)}}
                                    >
                                        {
                                            domainList instanceof Array ?
                                                domainList.map(function (item,index) {
                                                    return (<Select.Option key={index} value={item.id}>{item.name}</Select.Option>)
                                                }):(componentData&&componentData.domainList?componentData.domainList.map(function (item,index) {
                                                        return (<Select.Option key={index} value={item.id}>{item.name}</Select.Option>)
                                                    }):<Select.Option key={1} value={1}>无匹配数据</Select.Option>)
                                        }
                                    </Select>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="数据类"
                    >
                        <Row>
                            <Col>
                                {getFieldDecorator('model', {
                                    rules: [{ required: true, message: '数据类不能为空' }],
                                    initialValue :componentData&&componentData.modelId?componentData.modelId:null
                                })(
                                    <Select
                                        notFoundContent={'请先选择域'}
                                        size={'large'}
                                        placeholder="请选择数据类"
                                        onChange={(e)=>{this.onSelectModel(e)}}
                                    >
                                       {
                                            modelList instanceof  Array ?
                                                modelList.map(function (item,index) {
                                                    return (<Select.Option key={index} value={item.id}>{item.name}</Select.Option>)
                                                }) : (componentData&&componentData.modelList?componentData.modelList.map(function (item,index) {
                                                        return (<Select.Option key={index} value={item.id}>{item.name}</Select.Option>)
                                                    }):<Select.Option key={1} value={1}>无匹配数据</Select.Option>)
                                        }
                                    </Select>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="实体"
                    >
                        <Row>
                            <Col>
                                {getFieldDecorator('entity', {
                                    rules: [{ required: true, message: '实体不能为空' }],
                                    initialValue :componentData&&componentData.entityId?componentData.entityId:''
                                })(
                                    <Select
                                        notFoundContent={'请先选择模型'}
                                        size={'large'}
                                        placeholder="请选择实体"
                                        onChange={(e)=>{this.onLoadTableData(e)}}
                                    >
                                        {
                                            entityList instanceof  Array ?
                                                entityList.map(function (item,index) {
                                                    return (<Select.Option key={index} value={item.id}>{item.name}</Select.Option>)
                                                }) : (componentData&&componentData.entityList?componentData.entityList.map(function (item,index) {
                                                        return (<Select.Option key={index} value={item.id}>{item.name}</Select.Option>)
                                                    }):<Select.Option key={1} value={1}>无匹配数据</Select.Option>)
                                        }
                                    </Select>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <div>
                        <Row>
                            <Col>
                                {
                                    tableData instanceof Array ?
                                        (
                                            <div>
                                                <Row>
                                                    <Col offset={2}>
                                                        共享属性：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取共享属性
                                                    </Col>
                                                    <br/>
                                                    <Col>
                                                        <Radio.Group value={this.state.radioValue} onChange={(e) => {
                                                            this.onRadioChange(e)
                                                        }}>
                                                            <Table rowKey="id" rowSelection={rowSelection}
                                                                   dataSource={tableData}
                                                                   bordered size="small"
                                                                   columns={columns} pagination={false}/>
                                                        </Radio.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ) : (componentData ?
                                            (
                                                <div>
                                                    <Row>
                                                        <Col offset={2}>
                                                            共享属性：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;获取共享属性
                                                        </Col>
                                                        <br/>
                                                        <Col>
                                                            <Radio.Group onChange={(e) => {
                                                                this.onRadioChange(e)
                                                            }}>
                                                                <Table rowKey="id" rowSelection={rowSelection}
                                                                       dataSource={componentData.selectedFields}
                                                                       bordered size="small"
                                                                       columns={columns} pagination={false}/>
                                                            </Radio.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ) : '')

                                }
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center" style={{marginTop:10}}>
                        <Button type="primary" htmlType="submit" style={{width:100}}>
                            提交
                        </Button>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </Form>
            </Modal>
        );
    }
}
EntityFiledShareWin=Form.create()(EntityFiledShareWin);

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        loadDomainList:()=>dispatch(requestDomainServiceList()),
        loadModelList:(id)=>dispatch(requestModelList(id)),
        loadEntityList:(id)=>dispatch(requestEntityList(id)),
        loadTableDataList:(id)=>dispatch(requestTableDataList(id)),
    };
}
const mapStateToProps = createStructuredSelector({
    domainList:selectBaseDomainServiceList(),
    modelList:selectModelServiceList(),
    entityList:selectEntityServiceList(),
    tableData:selectTableServiceData(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityFiledShareWin);