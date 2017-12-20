import React, {Component, PropTypes} from 'react';
import {Modal, Form, Input, Button, Row, Select, Col, Icon, InputNumber} from 'antd';
const Option = Select.Option;
let uuid = 0;

/* 轮询组件 */
class TimerComponentConvert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {show, componentData, onCloseWindow} = this.props;
        let FormItem = Form.Item;
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        return (
            <Modal title="轮询组件"
                   visible={show}
                   onCancel={onCloseWindow}
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
                                data.period = vals.timePeriod;
                            }
                            this.props.form.resetFields();
                            onCloseWindow();
                        }
                    });
                }}>
                    <FormItem {...formItemLayout} label="名称">
                        <Row><Col>
                            {getFieldDecorator('name', {
                                initialValue: componentData ? componentData.name : null,
                                rules: [{required: true, message: '名称不能为空'}],
                            })(
                                <Input size="large" placeholder="名称"/>
                            )}
                        </Col></Row>
                    </FormItem>
                    <FormItem {...formItemLayout} label="时间间隔">
                        <Row><Col>
                            {getFieldDecorator('timePeriod', {
                                initialValue: componentData ? componentData.period : null,
                                rules: [{required: true, message: '时间间隔不能为空'}],
                            })(
                                <InputNumber />
                            )}
                        </Col></Row>
                    </FormItem>
                    <span style={{position: 'absolute', left: "190px", top: "130px"}}>秒</span>
                    <Button type="primary" htmlType="submit" style={{width: 100}}>
                        提交
                    </Button>
                </Form>
            </Modal>
        );
    }


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
}

export default Form.create()(TimerComponentConvert);