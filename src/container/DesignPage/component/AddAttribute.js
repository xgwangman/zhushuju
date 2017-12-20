import React, {Component, PropTypes} from 'react';
import {Button, Modal, Form, Input, Select, InputNumber} from 'antd'

class AddAttribute extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectValue:'',
        }
    }

    handleSumit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            } else {
                this.props.onSaveAttr(values);
            }
            this.props.form.resetFields();
        })
    }
    onClose = ()=>{
        this.props.hide();
        this.props.form.resetFields();
    }
    onChange= (e)=>{
        this.setState({
            selectValue:e
        })
    }
    onSelectModel=(value)=>{
        this.props.onSelectThisModel(value);
    };
    onSelectEntity=(value)=>{
        this.props.onSelectThisEntity(value);
    };
    render() {
        let selectData=this.state.selectValue;
        let attributeData = this.props.attributeData?this.props.attributeData:{attType:''};
            attributeData?(selectData!=''?(attributeData.attType=selectData):attributeData):(attributeData.attType=selectData);
        let modelDataList = this.props.modelDataList||[];
        let entityList = this.props.selectEntityList||[];
        let attrList = this.props.selectAttrList||[];
        let {show} = this.props;
        let FormItem = Form.Item;
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

        return (
            <Modal title="属性基本信息维护"
                   visible={show}
                   onCancel={this.onClose}
                   maskClosable={false}
                   footer={[
                       <Button key="back" type="primary"  size="large" onClick={this.onClose}>取消</Button>,
                       <Button key="submit" type='primary'style={{margin:10}} size="large" onClick={this.handleSumit}>保存</Button>,
                   ]}
            >
                <Form>
                    <FormItem  {...formItemLayout}
                               key='name'
                               label='名称'
                               hasFeedback
                    >
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '名称不能为空'}],
                            initialValue: attributeData?attributeData.name:null,
                        })(
                            <Input placeholder={`名称最多20个字符`} maxLength="20"/>
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout}
                               key='code'
                               label='列名称'
                               hasFeedback
                    >
                        {getFieldDecorator('code', {
                            rules: [{required: true, message: '列名称不能为空'}],
                            initialValue: attributeData?attributeData.code:null,
                        })(
                            <Input placeholder={`列名称不能超过50个字符`} maxLength="50"/>
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout}
                               key='attType'
                               label='类型'
                               hasFeedback
                    >
                        {getFieldDecorator('attType', {
                            rules: [{required: true, message: '至少选择一种类型'}],
                            initialValue: attributeData?attributeData.attType:"TEXT",
                        })(
                            <Select placeholder="请选择类型" onChange={this.onChange}>
                                <Select.Option value="TEXT">文本</Select.Option>
                                <Select.Option value="DATE">日期</Select.Option>
                                <Select.Option value="NUMBER">数值</Select.Option>
                                <Select.Option value="STREAM">流</Select.Option>
                                <Select.Option value="DOMAIN">基于数据子集</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    {
                        attributeData?(attributeData.attType === 'TEXT'?
                                <FormItem  {...formItemLayout}
                                           key='length'
                                           label='长度'>
                                    {getFieldDecorator('length', {
                                        rules: [{required: true, message: '长度不能为空'}],
                                        initialValue: attributeData?attributeData.length:null,
                                    })(
                                        <InputNumber style={{width:'100%'}} placeholder="只能填写数字" size="large" min={0} max={40000}/>
                                    )}
                                </FormItem> : null
                        ):(<FormItem  {...formItemLayout}
                                      key='length'
                                      label='长度'>
                            {getFieldDecorator('length', {
                                rules: [{required: true, message: '长度不能为空'}],
                                initialValue: attributeData?attributeData.length:null,
                            })(
                                <InputNumber style={{width:'100%'}} placeholder="只能填写数字" size="large" min={0} max={40000}/>
                            )}
                        </FormItem>)
                    }
                    {
                        attributeData?(attributeData.attType === 'DATE'?
                            (
                                <FormItem  {...formItemLayout}
                                           key='dateType'
                                           label='日期格式'
                                           hasFeedback>
                                    {getFieldDecorator('dateType', {
                                        rules: [{required: true, message: '日期格式不能为空'}],
                                        initialValue: attributeData?attributeData.dateType:"YMD",
                                    })(
                                        <Select placeholder="请选择日期格式">
                                            <Select.Option value="YMD">yyyyMMdd</Select.Option>
                                            <Select.Option value="YMD_SLASH">yyyy/MM/dd</Select.Option>
                                            <Select.Option value="YMD_DASH">yyyy-MM-dd</Select.Option>
                                            <Select.Option value="YMD_DASH_WITH_TIME">yyyy-MM-dd H:m</Select.Option>
                                            <Select.Option value="YDM_SLASH">yyyy/dd/MM</Select.Option>
                                            <Select.Option value="YDM_DASH">yyyy-dd-MM</Select.Option>
                                            <Select.Option value="YMDHM">yyyy-MM-dd HH:mm</Select.Option>
                                            <Select.Option value="YMDHMS">yyyy-MM-dd HH:mm:ss</Select.Option>
                                            <Select.Option value="YMDHMSS">yyyy-MM-dd HH:mm:ss:sss</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>): null
                        ):null
                    }
                    {
                        attributeData?(
                            attributeData.attType === 'DOMAIN'?(
                                <div>
                                    <FormItem  {...formItemLayout}
                                               key='refModelId'
                                               label='数据类'
                                               hasFeedback>
                                        {getFieldDecorator('refModelId', {
                                            rules: [{required: true, message: '数据类不能为空'}],
                                            initialValue: attributeData?attributeData.refModelId:modelDataList[0].id,
                                        })(
                                            <Select placeholder="请选择数据类"  onChange={(e)=>{this.onSelectModel(e)}}>
                                                {
                                                    modelDataList.map((option, index) =>
                                                        <Select.Option key={index} value={option.id}>
                                                            {option.name}
                                                        </Select.Option>
                                                    )
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem  {...formItemLayout}
                                               key='refEntityId'
                                               label='实体'
                                               hasFeedback>
                                        {getFieldDecorator('refEntityId', {
                                            rules: [{required: true, message: '实体不能为空'}],
                                            initialValue: attributeData?attributeData.refEntityId:entityList[0].id,
                                        })(
                                            <Select placeholder="请选择实体" onChange={(e)=>{this.onSelectEntity(e)}}>
                                                {
                                                    entityList.map((option, index) =>
                                                        <Select.Option key={index} value={option.id}>
                                                            {option.name}
                                                        </Select.Option>
                                                    )
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem  {...formItemLayout}
                                               key='refAttId'
                                               label='属性'
                                               hasFeedback>
                                        {getFieldDecorator('refAttId', {
                                            rules: [{required: true, message: '属性不能为空'}],
                                            initialValue:attributeData?attributeData.refAttId:attrList[0].id,
                                        })(
                                            <Select placeholder="请选择属性">
                                                {
                                                    attrList.map((option, index) =>
                                                        <Select.Option key={index} value={option.id}>
                                                            {option.name ||''}
                                                        </Select.Option>
                                                    )
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem  {...formItemLayout}
                                               key='refAttName'
                                               label='显示属性'
                                               hasFeedback>
                                        {getFieldDecorator('refAttName', {
                                            rules: [{required: true, message: '显示属性不能为空'}],
                                            initialValue:attributeData?attributeData.refAttName:attrList[0].id,
                                        })(
                                            <Select placeholder="请选择显示属性">
                                                {
                                                    attrList.map((option, index) =>
                                                        <Select.Option key={index} value={option.id}>
                                                            {option.name}
                                                        </Select.Option>
                                                    )
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </div>
                            ):null
                        ):null


                    }
                    <FormItem  {...formItemLayout}
                               key='displaySequence'
                               label='显示顺序'
                    >
                        {getFieldDecorator('displaySequence', {
                            rules: [{required: true, message: '显示顺序不能为空'}],
                            initialValue:attributeData?attributeData.displaySequence:-99,
                        })(
                            <InputNumber style={{width:'100%'}} placeholder='只能填写数字' size="large" min={-99}/>
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout}
                               key='remark'
                               label='描述'
                               hasFeedback
                    >
                        {getFieldDecorator('remark', {
                            initialValue:attributeData?attributeData.remark:null,
                        })(
                            <Input type="textarea" placeholder={`一些相关描述`}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(AddAttribute);