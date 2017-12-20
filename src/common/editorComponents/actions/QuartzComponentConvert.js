import React, {Component, PropTypes} from 'react';
import {Modal, Form, Input, Button, Row, Col, Icon, InputNumber} from 'antd';
import CronExpressionGenerator from '../../components/CronExpressionGenerator'

/* 定时表达式组件 */
class QuartzComponentConvert extends Component {
    constructor(props) {
        super(props);
        this.initStatus=true;
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        let name=$('#nameCron').val(),expression=$('#expression').val(),description=$('#description').val();
        if(name==''||expression==''){
            this.onChangeExpression(name,'name');
            this.onChangeExpression(expression,'expression');
            return;
        }
        let {editor} = this.props;
        if (editor) {
            let canvas = editor.getContainerManager().get('Canvas');
            let showMenuPlugin = this.getObjectByAttr(canvas.plugins, "ShowMenuPlugin", "name");
            let currentEditFigure = showMenuPlugin.currentEditFigure;
            let data = currentEditFigure.getUserData().data;
            data.name = name;
            data.cron =expression;
            data.description =description?description:'';
            data.cronName = $("#cron").val();
        }
        this.onClose();
    };
    onClose=()=>{
        this.props.onCloseWindow();
        this.props.form.resetFields();
        $('#nameCron').val('');
        $('#expression').val('');
        $('#description').val('');
        this.initStatus=true;
    };
    render() {
        let {show, componentData, onCloseWindow} = this.props;
        this.renderCronExpression();
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
            <Modal title="定时表达式组件"
                   visible={show}
                   onCancel={this.onClose}
                   footer={[
                       <Button key="back" type="primary" size="large" onClick={this.onClose}>取消</Button>,
                       <Button key="submit"
                               style={{marginRight: 50,marginTop:12,marginBottom:12}}
                               type='primary'
                               size="large"
                               onClick={this.handleSubmit}>
                           保存
                       </Button>
                   ]}
                   width={660}
            >
               <Form>
                   <Row>
                       <Col span={4}>
                           <div className='ant-form-item-label' style={{display:'block'}}>
                               <label className="ant-form-item-required">名称</label>
                           </div>
                       </Col>
                       <Col span={18}>
                           <div id="nameDiv" className='ant-form-item-control' style={{display:'block'}}>
                               <Input id="nameCron" size="large" className='ant-input' onChange={(e)=>{this.onChangeExpression(e,'name')}}/>
                               <div id="nameError" className="ant-form-explain" style={{display:'none'}}>名称不能为空</div>
                           </div>
                       </Col>
                   </Row>
                   <br/>
                   <Row>
                       <Col offset={4} span={18}>
                           <CronExpressionGenerator/>
                       </Col>
                   </Row>
                   <br/>
                   <Row>
                       <Col span={4}>
                           <div className='ant-form-item-label' style={{display:'block'}}>
                               <label className="ant-form-item-required">表达式</label>
                           </div>
                       </Col>
                       <Col span={18}>
                           <div id="expressionDiv" className='ant-form-item-control' style={{display:'block'}}>
                               <Input id="expression" size="large" className='ant-input' readOnly onChange={(e)=>{this.onChangeExpression(e,'expression')}}/>
                               <div id="expressionError" className="ant-form-explain" style={{display:'none'}}>时间间隔不能为空</div>
                           </div>

                       </Col>
                   </Row>
                   <br/>
                   <Row>
                       <Col offset={4} span={18}>
                           <div style={{display:'block'}}>
                               <Input id="description" size="large" className='ant-input' placeholder="请输入你的表达式描述"/>
                           </div>
                       </Col>
                   </Row>
                    {/*<FormItem {...formItemLayout} label="名称">
                             {getFieldDecorator('name', {
                             initialValue: componentData ? componentData.name : null,
                             rules: [{required: true, message: '名称不能为空'}],
                             })(
                             <Input size="large" placeholder="名称"/>
                             )}
                     </FormItem>
                     <FormItem {...formItemLayout} label="表达式生成">
                            {getFieldDecorator('quartz', {
                            })(
                                <CronExpressionGenerator expression={this.state.expression}/>
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="表达式">
                            {getFieldDecorator('expression', {
                                initialValue: componentData ? componentData.cron : '* * * * * ?',
                                rules: [{required: true, message: '时间间隔不能为空'}],
                            })(
                                <Input value={this.state.expression} onChange={()=>{console.log('.....')}}/>
                            )}
                    </FormItem>*/}
                </Form>
            </Modal>
        );
    }
    renderCronExpression=()=>{
        let {show,componentData} = this.props;
        if (show && this.initStatus&&componentData&&componentData.name){
            $('#nameCron').val(componentData.name);
            $('#expression').val(componentData.cron);
            $('#description').val(componentData.description);
            this.initStatus=false;
        }
    };
    onChangeExpression=(e,type)=>{
        let expressionDiv=$('#expressionDiv'),expressionError=$('#expressionError');
        let nameDiv=$('#nameDiv'),nameError=$('#nameError');
        let value=e.target?e.target.value:e;
        if(type=='expression' && value==''){
            expressionDiv.addClass('has-error');
            expressionDiv.removeClass('has-success');
            expressionError.show();
        }else if(type=='expression' && !value==''){
            expressionDiv.removeClass('has-error');
            expressionDiv.addClass('has-success');
            expressionError.hide();
        }
        if(type=='name' && value==''){
            nameDiv.addClass('has-error');
            nameDiv.removeClass('has-success');
            nameError.show();
        }else if(type=='name' && !value==''){
            nameDiv.removeClass('has-error');
            nameDiv.addClass('has-success');
            nameError.hide();
        }
    };
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

export default Form.create()(QuartzComponentConvert);