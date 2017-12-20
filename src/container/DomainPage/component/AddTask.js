import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {hashHistory} from 'react-router';
import {Form, Select, Input, Button, Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class AddTask extends Component {
    constructor(props) {
        super(props);
    }
    handleSumit = (e) => {
        e.preventDefault();
        let {domainName,modelName,modelId,entityName,entityId,taskType,type,taskId}=this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            } else if(type=='add'){
                let taskData={entityId:entityId,name:values.name,remark:values.remark,dsIds:values.dataSrc};
                this.props.saveTask({taskData:taskData,type:type,domainName:domainName,modelName:modelName,modelId:modelId,
                    entityName:entityName,entityId:entityId,taskType:taskType});
            }else if(type=='update'){
                let taskData={id:taskId,entityId:entityId,name:values.name,remark:values.remark,dsIds:values.dataSrc};
                this.props.updateTask({taskData:taskData,type:type,domainName:domainName,modelName:modelName,modelId:modelId,entityName:entityName,entityId:entityId,taskType:taskType});
            }
        });
        this.props.form.resetFields();
    };
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const {getFieldDecorator} = this.props.form;
        let taskAttr = this.props.dataAttr;
        let defaultSelect=[];
        taskAttr&&taskAttr.dataSourceList?taskAttr.dataSourceList.map(function (item,index) {
            defaultSelect.push(item.id);
        }):null;
        let upDrcList = this.props.upDrcList;
        let taskType = this.props.taskType;

        return (
            <div>
                <Form style={{fontSize: '16px'}}>
                    <FormItem {...formItemLayout} label="任务名称" hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入名称'}],
                            initialValue: taskAttr&&taskAttr.name ? taskAttr.name:''
                        })(
                            <Input placeholder="名称"
                                   onChange={ (e) => this.props.onChangeTaskAttr(e, "name") }/>
                        )}
                    </FormItem>
                    {taskType === "gather" ? (
                        <FormItem {...formItemLayout} label="数据源" hasFeedback>
                            {getFieldDecorator('dataSrc', {
                                rules: [
                                    {required: true, message: '请选择数据源', type: 'array'},
                                ],
                                initialValue: defaultSelect
                            })(
                                <Select mode="multiple" placeholder="请选择数据源"
                                        onBlur={ (e) => this.props.onChangeTaskAttr(e, "dataSrc")}
                                >
                                    {(upDrcList || []).map(function (drc, index) {
                                        return (<Option key={'dataSource' + index} value={drc.id}>{drc.name}</Option>)
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    ) : null}
                    < FormItem {...formItemLayout} label="描述" >
                        {getFieldDecorator('remark', {
                            initialValue: taskAttr&&taskAttr.remark ? taskAttr.remark : ''
                        })(
                            <Input type="textarea" placeholder="描述"
                                   onChange={ (e) => this.props.onChangeTaskAttr(e, "remark")}/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.handleSumit}>保存</Button>
                    </FormItem>
                </Form>
            </div >
        )
    }
}

const AddTaskForm = Form.create()(AddTask);
export default AddTaskForm; 