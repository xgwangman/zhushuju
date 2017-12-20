import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Form, Select, Input, Button, Breadcrumb} from 'antd';
import {addShareService,updateShareService} from '../actions'
const FormItem = Form.Item;
class AddSreTask extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 16},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link to="/service">共享任务管理</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>{this.props.params.taskId=='add'?'添加共享任务':'修改共享任务'}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent">
                <Form style={{fontSize: '16px'}} onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, vals) => {
                        if (!err) {
                            this.props.params.taskId=='add'?
                            this.props.onSubmit({
                                name :vals.name,
                                remark :vals.remark,
                            }) :
                                this.props.onUpdate({
                                    id:this.props.params.taskId,
                                    name :vals.name,
                                    remark :vals.remark,
                                }) ;
                            this.props.form.resetFields();
                        }
                    })
                    }
                }>
                    <FormItem {...formItemLayout} label="任务名称">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入名称'},{type:'string',message: '任务名称长度不能超过50',max:50}],
                            initialValue: this.props.params.taskId=='add'?'':this.props.params.taskName  // 编辑任务时，将初始值赋到form上
                        })(
                            <Input placeholder="名称" type='input' maxLength="51"/>
                        )}
                    </FormItem>
                    < FormItem {...formItemLayout} label="描述">
                        {getFieldDecorator('remark', {
                            rules: [{type:'string',message: '描述长度不能超过100',max:100}],
                            initialValue: this.props.params.taskId=='add'?'':this.props.params.remark
                        })(
                            <Input type="textarea" placeholder="描述" maxLength="101"/>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </FormItem>
                </Form>
            </div>
         </div >
        )
    }
}

const AddSreTaskForm = Form.create()(AddSreTask);

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        onSubmit:(shareService)=>dispatch(addShareService(shareService)),
        onUpdate:(shareService)=>dispatch(updateShareService(shareService)),
    };
}
const mapStateToProps = createStructuredSelector({
});
export default connect(mapStateToProps, mapDispatchToProps)(AddSreTaskForm);