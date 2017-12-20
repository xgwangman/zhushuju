import React, {Component, PropTypes} from 'react';
import {Modal, Form, Input, Button,Table, Row, Select, Col, Icon, Switch, Tooltip} from 'antd';
const Option = Select.Option;
let uuid = 0;

/* 主数据增量更新 */
class MdInsertUpdateComponentConvert extends Component {
    constructor(props) {
        super(props);
        this.initStatus=true;
    }
    state = {
        tableFields: null,
        requestTable: false,
        fieldList: [],
        allFieldList: [],
        selectedFields: [],
    };
    handleSubmit=(e)=>{
        let {  entityAttrList, flowFields,entityId} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, vals) => {
            if (!err) {
                let {editor} = this.props;
                let fieldList=[...this.state.fieldList];
                if (editor) {
                    let canvas = editor.getContainerManager().get('Canvas');
                    let showMenuPlugin = this.getObjectByAttr(canvas.plugins, "ShowMenuPlugin", "name");
                    let currentEditFigure = showMenuPlugin.currentEditFigure;
                    let data = currentEditFigure.getUserData().data;
                    data.name = vals.name;
                    data.entityId = entityId;
                    data.stagInTableName = null;
                    data.fieldMapping = [];
                    fieldList.map(function (item,index) {
                        let field = {};
                        field.srcAppId = null;
                        field.srcAppName = null;
                        field.srcDsId =null;
                        field.srcDsName = null;
                        field.srcTableName = item.tableName;//（必填）
                        field.srcFieldId = item.id;
                        field.srcFieldName =item.name;//（必填）
                        field.attId = item.attId;//（必填）
                        field.attName = item.attName;
                        field.attType = item.attType;
                        field.attColumnName = item.attColumnName;//（必填）
                        field.attLength = item.attLength;//（必填）
                        field.attAlias = item.aliasName;
                        field.isPk = item.isPk;
                        field.tranRemark =item.description;
                        data.fieldMapping.push(field);
                    });
                }
                this.onClose();
            }
        });
    };
    onClose =()=>{
        this.props.onCloseWindow();
        this.props.form.resetFields();
        this.setState({allFieldList:[],fieldList:[]});
        this.initStatus=true;
    };
    render() {
        let {show, componentData, entityAttrList, flowFields} = this.props;
       this.requestTableDate(show);
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
        let columns=[
            {title: '实体属性', dataIndex: 'name',width: '25%',render:(text, record, index) =>
                <Select defaultValue={record.attId} onChange={(value)=>{this.onSelectChange(value, record, index)}}>
                {
                    (this.state.selectedFields||[]).map(function (item,index) {
                        return (<Option key={item.id} value={item.id}>{item.name}</Option>)
                    })
                }
            </Select>},
            {title: '流字段', dataIndex: 'displayName',width: '25%'},
            {title: '是否唯一标识', dataIndex: 'isPk',width: '20%',render: (text, record, index)=> {
                        let isChecked=false;
                        if(text==true || text=='true')isChecked=true;else if(text==false || text=='false') isChecked=false;
                  return  <Switch checked={isChecked} size="small" onChange={(checked)=>{this.onSwitchChange(checked,index)}}/>;
            }},
            {title: '转换描述', dataIndex: 'description',width: '20%',render: (text, record, index)=> {
            return <Input value={this.state.fieldList[index]['description']?this.state.fieldList[index]['description']:text} type='input'
                   maxLength="50" onChange={(e)=>this.handleInputChange(e,index,'description')}/>
            }},
            {title: '删除', dataIndex: 'delete',width: '10%',
                render: (text, record, index) =>
            <Icon style={{fontSize: 'large',cursor:'pointer'}} type="delete" onClick={(e)=>{this.onDeleteRow(e,record,index)}}/>},
        ];
        return (
            <Modal title="主数据增量更新"
                   visible={show}
                   onCancel={this.onClose}
                   width={660}
                   footer={[
                       <Button key="back" type="primary" size="large" onClick={this.onClose}>取消</Button>,
                       <Button key="submit"
                               style={{marginRight: 50,marginTop:12,marginBottom:12}}
                               type='primary'
                               size="large"
                               onClick={this.handleSubmit}>
                           保存
                       </Button>
                   ]}
            >
                <Form>
                    <FormItem {...formItemLayout} label="姓名">
                            {getFieldDecorator('name', {
                                initialValue: componentData ? componentData.name : null,
                                rules: [{required: true, message: '姓名不能为空'}],
                            })(
                                <Input size="large" placeholder="名称"/>
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="字段映射">
                        <Button type="primary" size="small" icon="sync" onClick={(e)=>this.requestFlowField(componentData.id)}>
                            获取字段
                        </Button>
                    </FormItem>
                    <div>
                        <Table rowKey='id' columns={columns} dataSource={this.state.fieldList}
                               pagination={false} size={'small'}/>
                    </div>
                    {/*<Button type="primary" size="small" icon='plus' style={{width: 100}} onClick={this.addFieldMapping}>
                        添加
                    </Button>*/}
                </Form>

            </Modal>
        );
    }
    requestTableDate=(isShow)=>{
        let {componentData,entityAttrList} = this.props;
        if(isShow&&componentData&&componentData.fieldMapping&&componentData.fieldMapping.length>0&&this.initStatus){
            let allFields=entityAttrList.data;
            let fieldMapping=componentData.fieldMapping,fieldList=[];
            fieldMapping.map(function (item,index) {
                let field = {};
                field.tableName= item.srcTableName;//（必填）
                field.id = item.srcFieldId;
                field.name =item.srcFieldName;//（必填）
                field.attId = item.attId;//（必填）
                field.attName = item.attName;
                field.attType = item.attType;
                field.attColumnName = item.attColumnName;//（必填）
                field.attLength = item.attLength;//（必填）
                field.aliasName = item.attAlias;
                field.isPk = item.isPk;
                field.description =item.tranRemark;
                fieldList.push(field);
            });
            this.setState({selectedFields:[...allFields],allFieldList:[...allFields],fieldList:fieldList});
            this.initStatus=false;
        }else if(isShow&&componentData&&this.initStatus){
            this.requestFlowField(componentData.id);
            this.initStatus=false;
        }
    };
    onDeleteRow=(e,record,index)=>{
        e.preventDefault();
        let fieldList = [...this.state.fieldList];
        let selectedFields = [...this.state.selectedFields];
        let allFieldList = [...this.state.allFieldList];
        allFieldList.map(function (item,index) {
            if(item.id==record.attId){
                selectedFields.push(item);
                return ;
            }
        });
        fieldList.splice(index, 1);
        this.setState({ fieldList:fieldList,selectedFields:selectedFields });
    };
    /*输入框发生改变*/
    handleInputChange=(e,index,key)=>{
        const value = e.target.value;
        let fieldList = [...this.state.fieldList];
        fieldList[index][key]=value;
        this.setState({fieldList:fieldList});
    };
    /*开关选择器发生改变*/
    onSwitchChange=(checked,index)=>{
        let fieldList = [...this.state.fieldList];
        fieldList[index].isPk=checked;
        this.setState({fieldList:fieldList});
    };
    /*选择框发生改变*/
    onSelectChange=(value, record, key)=>{
        let fieldList =$.extend(true, [], this.state.fieldList);
        let allFieldList =$.extend(true, [], this.state.allFieldList);
        let selectedFields = $.extend(true, [], this.state.selectedFields);
        allFieldList.map(function (item,index) {
            if(item.id==value){
                fieldList[key].attId=item.id;
                fieldList[key].attName=item.name;
                fieldList[key].attType=item.attType;
                fieldList[key].attColumnName=item.columnName;
                fieldList[key].attLength=item.length;
            }
        });
        selectedFields.map(function (item,index) {
            if(item.id==value){
                selectedFields.splice(index,1);
            }
        });
        allFieldList.map(function (item,index) {
            if(item.id==record.attId){
                selectedFields.push(item);
            }
        });
        this.setState({fieldList:fieldList,selectedFields:selectedFields});
    };
    requestFlowField=(id)=>{
        let {entityAttrList} =this.props;
        let xxFields=$.extend(true,[],this.state.fieldList);
        let flowFields=this.props.requestFlowField(id),fields=[];
        if(flowFields==undefined){
            return
        }
        let allFields=entityAttrList.data;
        flowFields.map(function (item,index) {
            item.attId='';
            item.attName='';
            item.attType='';
            item.attColumnName='';
            item.attLength='';
            fields.push(item)
        });
        this.setState({selectedFields:[...allFields],allFieldList:[...allFields],fieldList:[...fields]});
    };
    /* 添加一行字段映射 */
   /* addFieldMapping = ()=> {
        let newData = {id:'' ,name:'',displayName: '',isPK:'false',description:'',delete:''};
        this.setState({fieldList: [...this.state.fieldList, newData]})
    };*/
    /**
     * 根据属性值从数组中拿到该对象
     *
     * @param array
     *            目标数组
     * @param attr
     *            属性值
     * @param objectAttr
     *            要比较的数组中的对象的属性
     * @returns {*} 对象
     */
    getObjectByAttr = (array, attr, objectAttr)=> {
        for (let i = 0; i < array.length; i++) {
            if ((array[i])[objectAttr] == attr) {
                return array[i];
            }
        }
    };

    /* 缓存selected字段 */
    setTableFields(tableFields) {
        this.state.tableFields = tableFields;
    }
}

export default Form.create()(MdInsertUpdateComponentConvert);