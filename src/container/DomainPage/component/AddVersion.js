require("../../../../css/DomainPageCss.css");
import {Form, Modal, Input, Button} from 'antd';
import React, {Component, PropTypes} from 'react';

const FormItem = Form.Item;

class AddVersion extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let version = this.props.version;
        const {getFieldDecorator} = this.props.form;
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
            <Modal key={this.props.modalKey}
                   title="发布版本sss"
                   visible={this.props.show}
                   onCancel={(e)=>this.props.hide(e)}
                   footer={[
                       <Button key="1" type="primary" onClick={(e)=>this.props.hide(e)} size="large">取消</Button>,
                       <Button key="2" type="primary"  style={{margin:10}} onClick={(e)=>this.props.onSaveVersion(e)} size="large">保存</Button>
                   ]}
            >
                <Form>
                    <FormItem {...formItemLayout} label="版本号">
                        {getFieldDecorator('versionNo', {
                            rules: [{required: true, message: '版本号不能为空'}],
                            initialValue: version ? version.versionNo : null
                        })(
                            <Input placeholder="版本号"
                                   onChange={ (e) => this.props.onChangeVersionAttr(e, "versionNo")}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="描述">
                        {getFieldDecorator('versionRemark', {
                            initialValue: version ? version.remark : null
                        })(
                            <Input placeholder="描述"
                                   onChange={ (e) => this.props.onChangeVersionAttr(e, "remark") }/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const addVersionForm = Form.create()(AddVersion);
export default addVersionForm;