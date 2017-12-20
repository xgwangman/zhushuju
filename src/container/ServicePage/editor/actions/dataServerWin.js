import React,{Component,PropTypes} from 'react';
import { Modal,Form, Input, Button,Row,Select,Col,Table,Radio , Popconfirm } from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getFlowFieldData} from '../../selectors';
import {concatFlowFieldData} from '../../actions'
import EditableCell from '../../component/EditAntdTable'
import alert from '../../../../common/utils/alert';

class DataServerWin extends Component{
    constructor(props){
        super(props)
        this.state={
            tableData:[], //存放表格数据
            mapFieldData:[], //存放选中的映射字段
            selectedRowKeys:[],//存放选中行的key值
            initStatus:true,
            newStatus:true,
            radioValue:'' // radio默认选中
        }
    }
    static propTypes = {
        onSubmit : PropTypes.func.isRequired,
        onCloseWindow : PropTypes.func.isRequired,
    };
   /* componentWillReceiveProps(){
        let {componentData} =this.props;
        if(componentData && componentData.tableData){
            if(this.state.initStatus){
                let mapFieldData=[];
                componentData.tableData.map(function (item,index) {
                    let mapField={attId:item.attId, attName:item.attName, attColumnName:item.attColumnName.value, attAlias:item.attAlias,
                        targetFieldName:item.targetFieldName.value, targetFieldDisplayName:item.targetFieldDisplayName.value, targetType:item.targetType.value, targetLength:item.targetLength.value,
                        isPK:item.isPK,tranRemark:item.tranRemark.value};
                    mapFieldData.push(mapField);
                });
                this.setState({radioValue:componentData.radioValue,initStatus:false,tableData:componentData.tableData,selectedRowKeys:componentData.selectedRowKeys,mapFieldData:mapFieldData})
            }
        }else{
            if(this.state.newStatus){
                this.setState({radioValue:'',initStatus:false,newStatus:false,tableData:[],selectedRowKeys:[],mapFieldData:[]})
            }
        }
    }*/
    requestRelationData=(type)=>{
        let componentData = this.props.componentData;
        if(componentData && componentData.tableData){
            if(type){
                if(this.state.initStatus){
                    let mapFieldData=[];
                    componentData.tableData.map(function (item,index) {
                        let mapField={attId:item.attId, attName:item.attName, attColumnName:item.attColumnName.value, attAlias:item.attAlias,
                            targetFieldName:item.targetFieldName.value, targetFieldDisplayName:item.targetFieldDisplayName.value, targetType:item.targetType.value, targetLength:item.targetLength.value,
                            isPK:item.isPK,tranRemark:item.tranRemark.value};
                        mapFieldData.push(mapField);
                    });
                    this.setState({radioValue:componentData.radioValue,initStatus:false,tableData:componentData.tableData,selectedRowKeys:componentData.selectedRowKeys,mapFieldData:mapFieldData})
                }
            }
        }else if(type!=undefined&&!type){
            if(this.state.newStatus){
                this.setState({radioValue:'',newStatus:false,tableData:[],selectedRowKeys:[],mapFieldData:[]})
            }
        }
    };
    beforeClose=()=>{
        this.setState({selectedRowKeys:[],radioValue:'',initStatus:true,newStatus:true})
    };
    //自动映射字段
    autoMapFields=()=>{
        let {editor,dispatch}=this.props;
        if (editor) {
            let relationFigureIds=[],relationFigures=[],fields=[],dataSource=[],preFields,selectedRowKeys=[],mapFieldData=[];
            let canvas = editor.getContainerManager().get('Canvas');
            let showMenuPlugin = this.getObjectByAttr(canvas.plugins, "ShowMenuPlugin", "name");
            let currentEditFigure = showMenuPlugin.currentEditFigure;
            if(currentEditFigure.getConnectionsModels() instanceof Array && currentEditFigure.getConnectionsModels().length<=0){
                alert('没有相关联的数据','error');
                return;
            }
            currentEditFigure.getConnectionsModels().map(function (dataLink,index) {
                relationFigureIds.push(dataLink.viewConfig.srcNodeId)
            });
            if(relationFigureIds.length<=0){
                alert('没有相关联的数据','error');
                return;
            }
            //let sourceFigureId=currentEditFigure.getConnectionsModels()[0].viewConfig.srcNodeId;
            let components = editor.getDataManager().getCurrentEditLayer().getAllModels(false, true);
            //let componentsRelations = editor.getDataManager().getCurrentEditLayer().getAllModels(true, false);
            components.map(function (component,index) {
                if (relationFigureIds.includes(component.data.id)) {
                    relationFigures.push(component)
                }
            });
            relationFigures.map((figure,index)=> {
                preFields = figure.data.pubTableMeta ? figure.data.pubTableMeta.tableFileds : null;
                if(preFields){
                    fields=fields.concat(preFields)
                }
                if(figure.data.radioValue){
                    this.setState({radioValue:figure.data.radioValue})
                }
            });
            //let mappingField =$.extend(true, [],fields);
            fields.map((item,index)=> {
                selectedRowKeys.push(item.id);
                dataSource.push({
                    attId:item.id,
                    attName:item.displayName,
                    attColumnName:{editable: false,value:item.name},
                    attAlias:item.aliasName,
                    isPK:item.isPK,
                    tranRemark:{editable: false,value:''},
                    targetFieldName:{editable: false,value:item.name},
                    targetFieldDisplayName:{editable: false,value:item.displayName},
                    targetType:{editable: false,value:item.javaType},
                    targetLength:{editable: false,value:item.length},
                });
                mapFieldData.push({
                    attId:item.id,
                    attName:item.displayName,
                    attColumnName:item.name,
                    attAlias:item.aliasName,
                    isPK:item.isPK,
                    tranRemark:'',
                    targetFieldName:item.name,
                    targetFieldDisplayName:item.displayName,
                    targetType:item.javaType,
                    targetLength:item.length,
                });
            });
            dispatch(concatFlowFieldData(dataSource));
            this.setState({tableData:dataSource,selectedRowKeys:selectedRowKeys,mapFieldData:mapFieldData})
        }
    };
    getObjectByAttr = (array, attr, objectAttr)=> {
        for (let i = 0; i < array.length; i++) {
            if ((array[i])[objectAttr] == attr) {
                return array[i];
            }
        }
    };
    // 可编辑表格  开始api
    renderColumns(data, index, key, text) {
        const { editable, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text.value;
        }
        return (<EditableCell
            editable={editable}
            value={text.value}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
        />);
    }
    handleChange(key, index, value) {
        let tableData = [...this.state.tableData],mapFieldData=[...this.state.mapFieldData];
        tableData[index][key].value = value;
        mapFieldData[index][key] = value;
        this.setState({ tableData ,mapFieldData});
    }
    edit(index) {
        const { tableData } = this.state;
        Object.keys(tableData[index]).forEach((item) => {
            if (tableData[index][item] && typeof tableData[index][item].editable !== 'undefined') {
                tableData[index][item].editable = true;
            }
        });
        this.setState({ tableData });
    }
    editDone(index, type) {
        const { tableData } = this.state;
        Object.keys(tableData[index]).forEach((item) => {
            if (tableData[index][item] && typeof tableData[index][item].editable !== 'undefined') {
                tableData[index][item].editable = false;
                tableData[index][item].status = type;
            }
        });
        this.setState({ tableData }, () => {
            Object.keys(tableData[index]).forEach((item) => {
                if (tableData[index][item] && typeof tableData[index][item].editable !== 'undefined') {
                    delete tableData[index][item].status;
                }
            });
        });
    }
    // 可编辑表格  结束api
    onRadioChange=(e)=>{
        this.setState({radioValue:e.target.value});
        let mapFieldData = this.state.mapFieldData;
        if(mapFieldData){
            mapFieldData.map( (item,index)=> {
                if(item.attId==e.target.value){
                    item.isPK=true
                }else{
                    item.isPK=''
                }
            });
            this.setState({mapFieldData:mapFieldData});
        }
    };

    render() {
        let {flowFieldData,show,componentData} =this.props;
        this.requestRelationData(show);
        const {tableData}=this.state;
        let columns=[
            {title: '流字段', dataIndex: 'attName',width: 100},
            {title: '输出名称', dataIndex: 'targetFieldDisplayName',width: 100,render: (text, record, index) => this.renderColumns(this.state.tableData, index, 'targetFieldDisplayName', text)},
            {title: '输出名称',dataIndex: 'targetFieldName',width: 100,render: (text, record, index) => this.renderColumns(this.state.tableData, index, 'targetFieldName', text)},
            {title: '是否唯一标识',dataIndex: 'attId',width: 100,render:(id)=><Radio value={id}/>},
            {title: '输出类型',dataIndex: 'targetType',width: 100,render: (text, record, index) => this.renderColumns(this.state.tableData, index, 'targetType', text)},
            {title: '输出长度',width: 100,dataIndex: 'targetLength',render: (text, record, index) => this.renderColumns(this.state.tableData, index, 'targetLength', text)},
            {title: '转换描述',dataIndex: 'tranRemark',width: 200,render: (text, record, index) => this.renderColumns(this.state.tableData, index, 'tranRemark', text)},
            {
                title: '操作',
                dataIndex: 'operation',
                width: 100,
                render: (text, record, index) => {
                    const { editable } = this.state.tableData[index].targetFieldDisplayName;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                                      <a onClick={() => this.editDone(index, 'save')}>保存</a> &nbsp;&nbsp;&nbsp;&nbsp;
                                      <Popconfirm title="确定取消吗?" onConfirm={() => this.editDone(index, 'cancel')}>
                                        <a>取消</a>
                                      </Popconfirm>
                                    </span> :
                                    <span><a onClick={() => this.edit(index)}>编辑</a></span>
                            }
                        </div>
                    );
                },
            }
        ];
        let FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                if(selectedRows.length>0){
                    let mapFields=[];
                    selectedRows.map(function (item,index) {
                        //映射字段集合List
                        let mapField={attId:item.attId, attName:item.attName, attColumnName:item.attColumnName.value, attAlias:item.attAlias,
                            targetFieldName:item.targetFieldName.value, targetFieldDisplayName:item.targetFieldDisplayName.value, targetType:item.targetType.value, targetLength:item.targetLength.value,
                            isPK:item.isPK,tranRemark:item.tranRemark.value};
                        mapFields.push(mapField);
                    });
                   this.setState({mapFieldData:mapFields})
                }
                this.setState({selectedRowKeys:selectedRowKeys})
            },
        };
        return (
            <Modal title="主数据同步采集"
                   visible={show}
                   width={1000}
                   onCancel={()=>{this.beforeClose();this.props.onCloseWindow()}}
                   afterClose={()=>{
                       this.beforeClose();
                       this.props.form.resetFields();
                   }}
                   footer={null}
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
                                data.stagOutTableName = '';
                                data.tableData =this.state.tableData;
                                data.selectedRowKeys =this.state.selectedRowKeys;
                                data.radioValue =this.state.radioValue;
                                data.fieldMapping = this.state.mapFieldData.length<=0?componentData.fieldMapping:this.state.mapFieldData;
                            }
                           // this.props.form.resetFields();
                            this.props.onCloseWindow();
                            this.beforeClose();
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
                    <div>
                        <Row>
                            <Col span={20} offset={2}>
                                字段映射：
                                <Button type='primary' onClick={()=>this.autoMapFields()}>自动映射</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center" style={{marginTop:10}}>
                        <Row>
                            <Col>
                                {
                                    (tableData instanceof Array && tableData.length>0) ?
                                        (<Radio.Group onChange={(e)=>{this.onRadioChange(e)}} value={this.state.radioValue?this.state.radioValue:''}>
                                            <Table rowKey="attId" rowSelection={rowSelection} dataSource={tableData}
                                                   bordered size="small"
                                                   columns={columns} pagination={false}/>
                                        </Radio.Group>) :''
                                }
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center" style={{marginTop:10}}>
                        <Button type="primary" htmlType="submit" style={{width:100}}>
                            提交
                        </Button>
                    </div>
                </Form>
            </Modal>
        );
    }
}

DataServerWin= Form.create()(DataServerWin);
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
    };
}
const mapStateToProps = createStructuredSelector({
    flowFieldData:getFlowFieldData()
});

export default connect(mapStateToProps, mapDispatchToProps)(DataServerWin);