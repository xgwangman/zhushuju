/**
 * Created by Administrator on 2017/7/31.
 */
require("antd/dist/antd.css");
import React, {Component, PropTypes} from 'react';
import {Form, Select, Switch, Input, Button, Radio, Upload, Icon, Spin, Tooltip} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class AddDataSrc extends Component {
    constructor(props) {
        super(props);
    }
    state = {loading: false}
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    testURL= (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                alert("测试链接异常", 'error');
            }else {
                this.props.testConnect(values);
            }
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const params=this.props.params;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return
            }else {
                this.props.saveDataSource(values,params);
                this.setState({
                    loading: true,
                })
                setTimeout(() => {
                    this.setState({loading: false});
                }, 3000);
            }
        });
    }
    checkedName = (rule, value, callback) => {
        const form = this.props.form;
        if (value.length > 19) {
            callback('该名称最多可输入20个字符！');
        } else {
            callback();
        }
    }
    checkedDiscribe = (rule, value, callback) => {
        const form = this.props.form;
        value.length ? value.length : 1;
        console.log(value.length)
        if (value.length > 99) {
            callback('该名称最多可输入100个字符！');
        } else {
            callback();
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 16},
        };
        const {getFieldDecorator} = this.props.form;
        let dataSource = this.props.dataAttr;
        return (
            <div>
                <Spin tip="加载中..." size="large" spinning={this.state.loading} style={{marginTop: "60px"}}>
                    <Form onSubmit={this.handleSubmit} style={{marginTop : '60px',fontSize : '16px'}}>
                        <FormItem {...formItemLayout} label="名称" hasFeedback>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '数据源名称不能为空！'}, {
                                    validator: this.checkedName,
                                }],
                                initialValue: dataSource.name  //编辑应用系统时，将初始值赋到form上
                            })(
                                <Input placeholder="请输入名称" maxLength="20"
                                       onChange={ (e) => this.props.changeDataSrcData(e, "name") }/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="数据源类型">
                            {getFieldDecorator('type', {
                                rules: [{required: true, message: '请选择数据源类别'}],
                                initialValue: dataSource.type
                            })(
                                <Select placeholder="请选择数据源类别"
                                        onChange={ (e) => this.props.changeDataSrcData(e, "type")}>
                                    <Option value="DB">数据库</Option>
                                    {/*<Option value="FILE">文件</Option>*/}
                                </Select>
                            )}
                        </FormItem>
                        {(dataSource && dataSource.type == "DB") ? (
                            <FormItem {...formItemLayout} label="数据库类别">
                                {getFieldDecorator('dbType', {
                                    rules: [{required: true, message: '请选择数据库类别'}],
                                    initialValue: dataSource.dbType
                                })(
                                    <Select placeholder="请选择数据库类别"
                                            onChange={ (e) => this.props.changeDataSrcData(e, "dbType")}>
                                        <Option value="oracle">oracle</Option>
                                        <Option value="sqlserver2008">sqlserver2008</Option>
                                        <Option value="mysql5">mysql5</Option>
                                    </Select>
                                )}
                            </FormItem>
                        ) : null}
                        {
                            (dataSource && dataSource.type == "DB") ? (
                                <FormItem {...formItemLayout} label="驱动">
                                    {getFieldDecorator('dbDriver', {
                                        rules: [{required: true, message: '请选择驱动'}],
                                        initialValue: dataSource.dbDriver
                                    })(
                                        <Select placeholder="请选择驱动" allowClear disabled>
                                            <Option
                                                value="oracle.jdbc.driver.OracleDriver">oracle.jdbc.driver.OracleDriver</Option>
                                            <Option value="com.microsoft.sqlserver.jdbc.SQLServerDriver">com.microsoft.sqlserver.jdbc.SQLServerDriver</Option>
                                            <Option value="com.mysql.jdbc.Driver">com.mysql.jdbc.Driver</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            ) : null
                        }
                        {
                            (dataSource && dataSource.type == "DB") ? (
                                <FormItem {...formItemLayout} label="URL" hasFeedback>
                                    {getFieldDecorator('dbUrl', {
                                        rules: [{required: true, message: '请输入url'}],
                                        initialValue: dataSource.dbUrl
                                    })(
                                        <Input onChange={ (e) => this.props.changeDataSrcData(e, "dbUrl")}/>
                                    )}
                                </FormItem>
                            ) : null
                        }
                        {
                            (dataSource && dataSource.type == "DB") ? (
                                <FormItem {...formItemLayout} label="用户名" hasFeedback>
                                    {getFieldDecorator('dbUser', {
                                        rules: [{required: true, message: '请输入用户名'}],
                                        initialValue: dataSource.dbUser
                                    })(
                                        <Input placeholder="请输入用户名"
                                               onChange={ (e) => this.props.changeDataSrcData(e, "dbUser")}/>
                                    )}
                                </FormItem>
                            ) : null
                        }
                        {
                            (dataSource && dataSource.type == "DB") ? (
                                <FormItem {...formItemLayout} label="密码" hasFeedback>
                                    {getFieldDecorator('dbPwd', {
                                        rules: [{required: true, message: '请输入密码'}],
                                        initialValue: dataSource.dbPwd
                                    })(
                                        <Input type="password" placeholder="请输入密码" onChange={ (e) => this.props.changeDataSrcData(e, "dbPwd")}/>
                                    )}
                                </FormItem>
                            ) : null
                        }
                        {(dataSource && dataSource.type == "FILE") ? (
                            <FormItem {...formItemLayout} label="文件">
                                {getFieldDecorator('file', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload name="logo" action="/upload.do" listType="picture">
                                        <Button>
                                            <Icon type="upload"/>上传
                                        </Button>
                                    </Upload>
                                )}
                            </FormItem>
                        ) : null}
                        <FormItem {...formItemLayout} label="是否检测">
                            {getFieldDecorator('isSyn', {
                                // valuePropName: 'checked',
                                initialValue: dataSource.isSyn == 0 ? false : true
                            })(
                                <Switch onChange={ (e) => this.props.changeDataSrcData(e, "isSyn")}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="检测周期">
                            {getFieldDecorator('synPeriod', {
                                initialValue: dataSource.synPeriod
                            })(
                                <RadioGroup onChange={ (e) => this.props.changeDataSrcData(e, "synPeriod")}>
                                    <Radio value="day">每天</Radio>
                                    <Radio value="week">每周</Radio>
                                    <Radio value="month">每月</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="描述" hasFeedback>
                            {getFieldDecorator('remark', {
                                rules: [{
                                    validator: this.checkedDiscribe,
                                }],
                                initialValue: dataSource.remark
                            })(
                                <Input type="textarea" placeholder="描述" maxLength="100"
                                       onChange={ (e) => this.props.changeDataSrcData(e, "remark")}/>
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{span: 12, offset: 10}}>
                            {
                                (this.props.dataAttr.id) ? null :
                                    <Button type="primary" onClick={this.testURL} style={{marginRight: 15}}>测试链接</Button>
                            }
                            <Button type="primary" htmlType="submit">保存</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        )
    }
}
const AddDataSourceForm = Form.create()(AddDataSrc);
export default AddDataSourceForm;