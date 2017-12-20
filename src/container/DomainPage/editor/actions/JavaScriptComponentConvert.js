/**
 * Created by Administrator on 2017/6/21.
 */
import React, {Component, PropTypes} from 'react';
import {Modal, Form, Input, Button, Row, Col, Icon, Upload, message} from 'antd';
/* 定时表达式组件 */
class JavaScriptComponentConvert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JSContents: '',
            fileListLength: 0,
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
            }]
        }
    }

    handleSumit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            } else {
                let {editor} = this.props
                if (editor) {
                    let canvas = editor.getContainerManager().get('Canvas');
                    let showMenuPlugin = this.getObjectByAttr(canvas.plugins, "ShowMenuPlugin", "name");
                    let currentEditFigure = showMenuPlugin.currentEditFigure;
                    let data = currentEditFigure.getUserData().data;
                    data.name = values.name;
                    data.scriptContents = values.scriptContents
                }
                this.props.form.resetFields();
                this.props.onCloseWindow();
            }
        })

    }
    getObjectByAttr = (array, attr, objectAttr) => {
        for (let i = 0; i < array.length; i++) {
            if ((array[i])[objectAttr] == attr) {
                return array[i];
            }
        }
    };
    handleChange = (info) => {
        let status = info.file.status;
        let fileList = info.fileList
        if (status !== 'uploading') {
            console.log(info.file);
            console.log(info.fileList);
        }
        if (status === 'done') {
            this.setState({
                JSContents: info.file.response.result.content,
                fileListLength: this.state.fileListLength + 1
            })
            alert('上传成功', 'success')
        } else if (status === 'error') {
            alert('上传失败', 'error')
        }
    }
    onRemoveFileList = () => {
        this.setState({
            fileListLength: this.state.fileListLength - 1
        })
    }

    render() {
        let {show, componentData, onCloseWindow} = this.props;
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

        return (
            <Modal title="JavaScript转换"
                   visible={show}
                   onCancel={onCloseWindow}
                   maskClosable={false}
                   footer={[
                       <Button key="test"
                               type='primary'
                               size="large"
                               onClick={this.test}>
                           测试
                       </Button>,
                       <Button key="back" type="primary" size="large" onClick={onCloseWindow}>取消</Button>,
                       <Button key="submit"
                               style={{marginRight: 40}}
                               type='primary'
                               size="large"
                               onClick={this.handleSumit}>
                           保存
                       </Button>
                   ]}
            >
                <Form>
                    <FormItem  {...formItemLayout}
                               label="名称"
                               hasFeedback
                    >
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '名称不能为空'}],
                        })(
                            <Input placeholder="请输入名称"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="脚本"
                    >
                        <Upload name='file'
                                action="file/uploadGetContent.do"
                                onChange={this.state.fileListLength === 0 ? this.handleChange : null}
                                onRemove={this.onRemoveFileList}
                                disabled={this.state.fileListLength === 0 ? false : true}
                        >
                            <Button type='primary' disabled={this.state.fileListLength === 0 ? false : true}><Icon
                                type="upload"/> 上传脚本文件</Button>
                            <span style={{color: '#a7a7a7', paddingLeft: 10}}>(只能上传一个.js类型文件)</span>
                        </Upload>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='脚本代码'
                        hasFeedback
                    >
                        {getFieldDecorator('scriptContents', {
                            rules: [{required: true, message: '不能为空'}],
                            initialValue: this.state.JSContents
                        })(
                            <Input type='textarea' rows={6} placeholder="自动获取上传脚本代码或者手写脚本代码"/>
                        )}

                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(JavaScriptComponentConvert);