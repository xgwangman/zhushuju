import React, {Component, PropTypes} from 'react';
import {Button, Modal, Form,Input} from 'antd'

class AddEntity extends Component {
    constructor(props) {
        super(props);
    }

    handleSumit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(err){
                return;
            }else {
                this.props.onSetTableVal(values);
                this.props.onSaveEntity(true);
                this.props.form.resetFields();
            }
        })

    };
    //取消
   handleCancels =(e) => {
        this.props.showEntity(e);
        this.props.form.resetFields();
    };

    check =(rule,value,callback)=>{
    if(!/^[A-Za-z]+.*\w+$/.test(value)){
        callback("必须以字母开头,含字母,数字和下划线！");
    }
    else{
        callback();
    }

};
    //长度校验
    checkNameLength = (rule, value, callback) => {
        const form = this.props.form;
        value=value?value:'';
        if (value.length > 19) {
            callback('实体名称最多可输入20个字符！');
        } else {
            callback();
        }
    };
    checkCodeLength = (rule, value, callback) => {
        const form = this.props.form;
        value=value?value:'';
        if (value.length > 49) {
            callback('表名称最多可输入50个字符！');
        } else {
            callback();
        }
    };


    render() {
        const entityAttr=this.props.entityAttr;
        let {show,hide} = this.props;
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
            <Modal title="实体基本信息维护"
                   visible={show}
                   onCancel={this.handleCancels}
                   maskClosable ={false}
                   footer={[
                       <Button type="primary" onClick={this.handleCancels} size="large">取消</Button>,
                       <Button type="primary" style={{margin:10}}  onClick={this.handleSumit} size="large">保存</Button>
                   ]}
            >
                <Form>
                    <FormItem  {...formItemLayout} key='name' label='实体名称' hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [
                                {required: true, message: `实体名称不能为空`},
                                {validator:this.checkNameLength},
                            ],
                            initialValue:entityAttr?entityAttr.name:null,
                        })(
                            <Input placeholder={`实体名称`} maxLength="20"
                            />
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout} key='code' label='表名称' hasFeedback>
                        {getFieldDecorator('code', {
                            rules: [
                                {required: true, message: `表名称不能为空`,},
                                {validator:this.check},
                                {validator:this.checkCodeLength}

                            ],
                            initialValue:entityAttr?entityAttr.code:null,

                        })(
                            <Input placeholder={`表名称`} maxLength="50"
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(AddEntity);