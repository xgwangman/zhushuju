require("antd/dist/antd.css");
require("../../../../css/DomainPageCss.css");
import {Form, Modal, Input, Button, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';
const FormItem = Form.Item;

class AddApp extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return
            }else {
                this.props.onSaveApp(values);
            }
            this.props.form.resetFields();
        });
    }
    checkName = (rule, value, callback) => {
        const form = this.props.form;
         if(value.length > 19) {
            callback('该名称最多可输入20个字符！');
        } else {
            callback();
        }
    }
    checkDiscribe = (rule, value, callback) => {
        const form = this.props.form;
        if (value.length > 99) {
            callback('该名称最多可输入100个字符！');
        } else {
            callback();
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        let app = this.props.appAttribute;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <Modal key={this.props.modalKey} title="应用系统基本信息维护" visible={this.props.show}
                   onCancel={this.props.hide}
                   footer={[
                       <Button key="cancel" type="primary" onClick={this.props.hide} size="large">取消</Button>,
                       <Button key="submit" type="primary" onClick={this.handleSubmit} size="large">保存</Button>
                   ]}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="名称" hasFeedback>
                        {getFieldDecorator('app.name', {
                            rules: [{required: true, message: '应用系统名称不能为空！'}, {
                                validator: this.checkName,
                            }],
                            initialValue: app.name //编辑应用系统时，将初始值赋到form上
                        })(
                            <Input placeholder="请输入应用系统名称" maxLength="20" onChange={ (e) => this.props.onChangeAttr(e, "name") }/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="描述" hasFeedback>
                        {getFieldDecorator('app.remark', {
                            rules: [{
                                validator: this.checkDiscribe,
                            }],
                            initialValue: app.remark
                        })(
                            <Input type="textarea" placeholder="描述" maxLength="100"
                                   onChange={ (e) => this.props.onChangeAttr(e, "remark") }/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const addAppForm = Form.create()(AddApp);
export default addAppForm;