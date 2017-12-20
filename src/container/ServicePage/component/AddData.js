import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {hashHistory} from 'react-router';
import {Form, Select, Input, Button, Icon,Breadcrumb} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskTitle:'',
            taskContent:''
        }
    }
    onChangetaskTitle=(e)=>{
        this.setState({
            taskTitle:e.target.value,
        })
    }
    onChangetaskContent=(e)=>{
        this.setState({
            taskContent:e.target.value,
        })
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 16},
        };
        const {getFieldDecorator} = this.props.form;
        let taskAttr = this.props.dataAttr;
        let upDrcList = this.props.upDrcList;
        let taskType = this.props.taskType;

        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/service">共享任务管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>添加任务</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <hr className="hr"></hr>
                <Form style={{marginTop: '60px', fontSize: '16px'}}>
                    <FormItem {...formItemLayout} label="任务名称">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入名称'}],
                            initialValue: '' // 编辑任务时，将初始值赋到form上
                        })(
                            <Input placeholder="名称"
                                   onChange={ this.onChangetaskTitle}/>
                        )}
                    </FormItem>
                    {taskType === "gather" ? (
                        <FormItem {...formItemLayout} label="数据源">
                            {getFieldDecorator('dataSrc', {
                                rules: [
                                    {required: true, message: '请选择数据源', type: 'array'},
                                ],
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
                    < FormItem {...formItemLayout} label="描述">
                        {getFieldDecorator('remark', {
                            initialValue: ''
                        })(
                            <Input type="textarea" placeholder="描述"
                                   onChange={ this.taskContent}/>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" onClick={this.props.saveTask}>保存</Button>
                    </FormItem>
                </Form>
            </div >
        )
    }
}

const AddData = Form.create()(AddTask);
export default AddData;