import React, {Component, PropTypes} from 'react';
import {Button, Modal, Form, Input, Icon, Row, Col, Tag} from 'antd'
import alert from '../../../common/utils/alert';

class AddDomain extends Component {
    constructor(props) {
        super(props);
    }

    handleSumit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const model=this.props.domainAttribute.models||[];
            if (err) {
                return;
            } else if(model.length==0){//添加数据子集的时候保证至少有一个模型
                alert('数据类未添加','error');
                return;
            }else{
                this.props.onSaveDomain(e);
                this.props.domainEdtiorSign();
                this.props.form.resetFields();
            }
        })
    };
    getdataListName=()=>{
        let dataList = this.props.dataList;
        let dataListNames =[];
        for (let i=0;i<dataList.length;i++){
            dataListNames[i]=dataList[i].name
        }
        return dataListNames
    };
   onvalidator =(rule,value,callback)=>{
       let domainEdt=this.props.domainSign;
        let dataListNames = this.getdataListName();
       if(domainEdt==null){
           let dataListName = dataListNames.filter(name=>name == value);
           if(value==dataListName[0]){
               callback('数据子集名称已存在！');
           }
           callback();
       }else{
           for(let i=0;i<dataListNames.length;i++){
               if(dataListNames[i]==domainEdt){
                   dataListNames.splice(i,1);
               }
           }
           let ListName = dataListNames.filter(name=>name == value);
           if(value==ListName[0]){
               callback('数据子集名称已存在');
           }
           callback();
       }
    };
    onClose = () => {
        this.props.hide();
        this.props.domainEdtiorSign();
        this.props.form.resetFields();
    };

    render() {
        let {show} = this.props;
        let FormItem = Form.Item;
        let domainEdt=this.props.domainAttribute.models||[];
        let domainName = this.props.domainAttribute ? this.props.domainAttribute.name : '';
        let modelNameList = this.props.domainAttribute ? this.props.domainAttribute.models : [];
        const {getFieldDecorator} = this.props.form;
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
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 18,
                    offset: 4,
                },
            },
        };
        return (
            <Modal title="数据子集基本信息维护"
                   visible={show}
                   onCancel={this.onClose}
                   maskClosable={false}
                   width={600}
                   footer={[
                       <Button key="back" type="primary" size="large" onClick={this.onClose}>取消</Button>,
                       <Button key="submit" style={{margin:10}}  type='primary' size="large" onClick={this.handleSumit}>保存</Button>
                   ]}
            >
                <Form>
                    <FormItem  {...formItemLayout} key='domainName' label='数据子集名称' hasFeedback>
                        {getFieldDecorator('domainName', {
                            rules: [
                                {required: true, message: `数据子集名称不能为空`,},
                                {validator:this.onvalidator},
                            ],
                            initialValue:domainName,

                        })(
                            <Input placeholder={`最多20个字符`} maxLength="20"
                                   closable={true}
                                   onChange={(e)=>this.props.onChangeDomainName(e, domainName)}
                            />
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout} key='model' label='数据类'>
                        {getFieldDecorator('model', {
                            rules: [
                                {required:domainEdt.length>0?false:true, message: `数据类不能为空`},
                            ],
                        })(
                            <div>
                                <Input placeholder={`最多20个字符`}
                                       maxLength="20"
                                       onChange={(e)=>this.props.onChangeModelName(e)}
                                       value={this.props.modelName}
                                       size='large'
                                       style={{width:'80%'}}
                                />
                                <Button style={{width: '15%', background: '#49a0e5',marginLeft:'5%'}}
                                        size='large'
                                        type='primary'
                                        onClick={(e)=>this.props.onPlusModelName(e)}
                                >添加
                                </Button>
                            </div>
                        )}
                    </FormItem>
                    {
                        modelNameList.length > 0
                            ? <FormItem {...tailFormItemLayout} key='AllModel'>
                            {
                                modelNameList.map((model, i) =>
                                    <Tag color='red'
                                         key={i}
                                         style={{paddingTop:1,marginBottom:10}}
                                    >
                                        {model.name}
                                        <Icon style={{marginLeft:6}} type="close" onClick={(e) =>this.props.onDeleteModelName(e, model.name)}/>
                                    </Tag>)
                            }
                        </FormItem>
                            : null
                    }
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(AddDomain);