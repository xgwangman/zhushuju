/**
 * Created by Administrator on 2017/6/22.
 */
import 'antd/dist/antd.css';
import { Modal,Select,Button,Form,Input,DatePicker} from 'antd';
import React, {Component, PropTypes} from 'react';
export class CustomRuleModal extends Component {
    constructor(props) {
        super(props);
       this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        };
    }
    handleSubmit =(e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const ruleTypeData=this.props.ruleNameValue||[];
            if(ruleTypeData.type=='plugin-length'&&values.lengthMin!=null&&values.lengthMax!=null){
                this.props.onSaveRulesEditor(values);
            }else if(ruleTypeData.type=='plugin-datarange'&&values.min!=null&&values.max!=null){
                this.props.onSaveRulesEditor(values);
            }
            else if(ruleTypeData.type=='plugin-regex'&&values.name!=null&&values.values!=null){
                this.props.onSaveRulesEditor(values);
            }else if(values.restValue!=null){
                this.props.onSaveRulesEditor(values);
            }
        });
    };
    render() {
        const ruleValue=this.props.ruleNameValue||[];
        if(ruleValue.type=='plugin-length'){
               var length=1;
        }else if(ruleValue.type=="plugin-datarange"){
               var datarange=1;
        }else if(ruleValue.type=='plugin-regex'){
            var regex=1;
        }
        else{
               var rest=1;
        };
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
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
        const {endOpen } = this.state;
        return (
            <div>
                <Modal title={ruleValue.name+"校验规则定义"}
                       visible={this.props.visible}
                       onCancel={this.props.handleCancel}
                       maskClosable={false}
                       footer={null}
                       style={{ top: 20 }}
                >

                    <Form onSubmit={(e)=>this.handleSubmit(e)}>
                        {
                            length?(
                            <FormItem
                            {...formItemLayout}
                            label={ruleValue.name}
                            hasFeedback
                        >
                            {getFieldDecorator('lengthMin', {
                                rules: [
                                    {
                                        required: true, message: '请输入!',
                                    }],
                            })(
                                <Input placeholder="请输入最小值"/>
                            )}
                            </FormItem>):null
                        }
                        {
                            length?(
                                <FormItem
                                    {...formItemLayout}
                                    label={ruleValue.name}
                                    hasFeedback
                                >
                                    {getFieldDecorator('lengthMax', {
                                        rules: [
                                            {
                                                required: true, message: '请输入!',
                                            }],
                                    })(
                                        <Input placeholder="请输入最大值"/>
                                    )}
                                </FormItem>):null
                        }

                        {
                            rest?(<FormItem
                                {...formItemLayout}
                                label={ruleValue.name}
                                hasFeedback
                            >
                                {getFieldDecorator('restValue', {
                                    rules: [
                                        {
                                            required: true, message: '请输入!',
                                        }],
                                })(
                                    <Input placeholder="请输入"/>
                                )}
                            </FormItem>):null
                        }
                        {
                            regex?(<FormItem
                                {...formItemLayout}
                                label='名称'
                                hasFeedback
                            >
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true, message: '请输入!',
                                        }],
                                })(
                                    <Input placeholder="请输入"/>
                                )}
                            </FormItem>):null
                        }
                        {
                            regex?(<FormItem
                                {...formItemLayout}
                                label='正则校验'
                                hasFeedback
                            >
                                {getFieldDecorator('values', {
                                    rules: [
                                        {
                                            required: true, message: '请输入!',
                                        }],
                                })(
                                    <Input placeholder="请输入"/>
                                )}
                            </FormItem>):null
                        }
                        {
                            datarange?(
                                <FormItem
                                    {...formItemLayout}
                                    label={ruleValue.name}
                                    hasFeedback
                                >
                                    {getFieldDecorator('min', {
                                        rules: [
                                            {
                                                required: true, message: '请输入起始日期!',
                                            }],
                                    })(
                                        <DatePicker
                                            disabledDate={this.disabledStartDate}
                                            showTime
                                            format="YYYY-MM-DD"
                                            placeholder="起始日期"
                                            onChange={this.onStartChange}
                                            onOpenChange={this.handleStartOpenChange}
                                        />
                                    )}
                                </FormItem>):null
                        }
                        {
                            datarange?(
                                <FormItem
                                    {...formItemLayout}
                                    label={ruleValue.name}
                                    hasFeedback
                                >
                                    {getFieldDecorator('max', {
                                        rules: [
                                            {
                                                required: true, message: '请输入截止日期!',
                                            }],
                                    })(
                                        <DatePicker
                                        disabledDate={this.disabledEndDate}
                                        showTime
                                        format="YYYY-MM-DD"
                                        placeholder="请输入截止日期"
                                        onChange={this.onEndChange}
                                        open={endOpen}
                                        onOpenChange={this.handleEndOpenChange}
                                        />
                                    )}
                                </FormItem>):null
                        }
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">保存</Button>
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        )
    }
//日期组件
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };
    onStartChange = (value) => {
        this.onChange('startValue', value);
    };
    onEndChange = (value) => {
        this.onChange('endValue', value);
    };
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    };

}
export default Form.create()(CustomRuleModal);
