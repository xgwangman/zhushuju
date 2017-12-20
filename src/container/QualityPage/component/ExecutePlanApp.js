/**
 * Created by Administrator on 2017/6/13.
 */
require("../../../../css/QualityPageCss.css");
import React, {Component, PropTypes} from 'react';
import {Button, Modal, Select, Form, DatePicker, TimePicker} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

/**
 * *****************************************************************
 */
class ExecutePlanApp extends Component {
    constructor(props) {
        super(props);
    }
    state = { open: false };
    handleOpenChange = (open) => {
        this.setState({ open });
    };
    handleClose = () => {
        this.setState({ open: false })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onSaveModify(values);
            }else{
                return;
            }
            this.props.form.resetFields();
        });
    };
    //取消
    handleCancels =(e) => {
        this.props.hide();
        this.props.form.resetFields();
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        let dataSource = this.props.dataAttr;
        return (
            <Modal key={this.props.executePlan} title="执行计划" visible={this.props.show}
                   onCancel={this.props.hide}
                   footer={[
                       <Button type="primary" key="cancel" onClick={(e)=>this.handleCancels(e)} size="large">取消</Button>,
                       <Button type="primary" key="save" onClick={(e)=>this.handleSubmit(e)} size="large">保存</Button>
                   ]}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="执行周期："
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('period', {
                            rules: [{ required: true, message: '请选择执行周期！' }],
                            initialValue: dataSource.period ? dataSource.period : "请输入周期"  //编辑应用系统时，将初始值赋到form上
                        })(
                            <Select placeholder="请输入周期" onChange={(e) => this.props.changeModifyData(e, "period")}>
                                <Option value="YEAR">年</Option>
                                <Option value="MONTH">月</Option>
                                <Option value="WEEK">周</Option>
                                <Option value="DAY">日</Option>
                            </Select>
                        )}
                    </FormItem>
                    {(dataSource && dataSource.period == "YEAR") ? (
                        <FormItem label="每年的："
                                 labelCol={{ span: 6 }}
                                 wrapperCol={{ span: 8 }}
                        >
                            {getFieldDecorator('everyYear', {
                                rules: [{ required: true, message: '请选择每年的月份！' }],
                                initialValue: dataSource.everyYear ? dataSource.everyYear : "请输入月份"  //编辑应用系统时，将初始值赋到form上
                            })(
                                <Select placeholder="请输入月份" onChange={(e) => this.props.changeModifyData(e, "everyYear")}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                    <Option value="7">7</Option>
                                    <Option value="8">8</Option>
                                    <Option value="9">9</Option>
                                    <Option value="10">10</Option>
                                    <Option value="11">11</Option>
                                    <Option value="12">12</Option>
                                </Select>
                            )}
                            <span className="form-text">月，月末执行</span>
                        </FormItem>
                    ) : null}
                    {(dataSource && dataSource.period == "MONTH") ? (
                        <FormItem label="每月的："
                                  labelCol={{ span: 6 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            {getFieldDecorator('everyMonth', {
                                rules: [{ required: true, message: '请选择每月的日期！' }],
                                initialValue: dataSource.everyMonth ? dataSource.everyMonth : "请输入日期"  //编辑应用系统时，将初始值赋到form上
                            })(
                                <Select placeholder="请输入日期" onChange={(e) => this.props.changeModifyData(e, "everyMonth")}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                    <Option value="7">7</Option>
                                    <Option value="8">8</Option>
                                    <Option value="9">9</Option>
                                    <Option value="10">10</Option>
                                    <Option value="11">11</Option>
                                    <Option value="12">12</Option>
                                    <Option value="13">13</Option>
                                    <Option value="14">14</Option>
                                    <Option value="15">15</Option>
                                    <Option value="16">16</Option>
                                    <Option value="17">17</Option>
                                    <Option value="18">18</Option>
                                    <Option value="19">19</Option>
                                    <Option value="20">20</Option>
                                    <Option value="21">21</Option>
                                    <Option value="22">22</Option>
                                    <Option value="23">23</Option>
                                    <Option value="24">24</Option>
                                    <Option value="25">25</Option>
                                    <Option value="26">26</Option>
                                    <Option value="27">27</Option>
                                    <Option value="28">28</Option>
                                    <Option value="-1">最后一天</Option>
                                </Select>
                            )}
                            <span className="form-text">日，23:00 执行</span>
                        </FormItem>
                    ) : null}
                    {(dataSource && dataSource.period == "WEEK") ? (
                        <FormItem label="每周的："
                                  labelCol={{ span: 6 }}
                                  wrapperCol={{ span: 8 }}
                        >
                            {getFieldDecorator('everyWeek', {
                                rules: [{ required: true, message: '请选择每周的星期！' }],
                                initialValue: dataSource.everyWeek ? ("周" + dataSource.everyWeek) : "请输入星期"  //编辑应用系统时，将初始值赋到form上
                            })(
                                <Select placeholder="请输入星期" onChange={(e) => this.props.changeModifyData(e, "everyWeek")}>
                                    <Option value="日">周日</Option>
                                    <Option value="一">周一</Option>
                                    <Option value="二">周二</Option>
                                    <Option value="三">周三</Option>
                                    <Option value="四">周四</Option>
                                    <Option value="五">周五</Option>
                                    <Option value="六">周六</Option>
                                </Select>
                            )}
                           <span className="form-text">23:00 执行</span>
                        </FormItem>
                    ) : null}
                    {(dataSource && dataSource.period == "DAY") ? (
                        <FormItem
                            label="每天的："
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 8 }}
                        >
                            {getFieldDecorator('everyDay', {
                                rules: [{ required: true, message: '请选择每天的时间！' }],
                            })(
                                <TimePicker
                                    showTime
                                    format="HH:mm:ss"
                                    onChange={(e) => this.props.changeModifyData(e, "everyDay")}
                                    placeholder={dataSource.everyDay ? dataSource.everyDay : "请输入时间"}
                                    open={this.state.open}
                                    onOpenChange={this.handleOpenChange}
                                    addon={() => (
                                        <Button size="small" type="primary" onClick={this.handleClose} style={{margin: "0px 55px"}}>
                                            确定
                                        </Button>
                                    )}
                                />
                            )}
                        </FormItem>
                     ) : null}
                    <FormItem
                        label="开始时间："
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 8 }}
                    >
                        {getFieldDecorator('startTime', {
                            rules: [{ required: true, message: '请选择开始时间！' }],
                        })(
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder={dataSource.startTime ? dataSource.startTime : "请输入开始时间"}
                                onChange={(e) => this.props.changeModifyData(e, "startTime")}
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
const ExecutePlanAppForm = Form.create()(ExecutePlanApp);
export default ExecutePlanAppForm;
