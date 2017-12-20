/**
 * Created by Administrator on 2017/4/25.
 */
import 'antd/dist/antd.css';
import { Modal,Select,Button,Form,Input,Switch} from 'antd';
import React, {Component} from 'react';

export class UserModalElement extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit =(e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err){
                return
            } else{
                    if(values.status==true){
                        values.status='1';
                    }
                    else{
                        values.status='0';
                    }
                this.props.onSaveUser(values);
            };
            this.props.form.resetFields();

        });
    };
    //取消
    handleCancels =(e) => {
        this.props.handleCancelu(e);
        this.props.form.resetFields();
    };

    getdataListName=()=>{
        let userMng=this.props.userMngData?this.props.userMngData.result:[];
        let dataListNames =[];   //用户名
        for (let i=0;i<userMng.length;i++){
            dataListNames[i]=userMng[i].name;
        }
        return dataListNames
    };
    //重复校验
   checkRepeat =(rule,value,callback)=>{
       let dataListNames = this.getdataListName();
       let dataListName = dataListNames.filter(name=>name == value);
       if(value==dataListName[0]){
       callback('用户名已存在');
       }
       callback();
        };
    checkRepeatUserNo =(rule,value,callback)=>{
        let userMng=this.props.userMngData?this.props.userMngData.result:[];
        let dataListUserNos=[];      //账号
        for (let i=0;i<userMng.length;i++){
            dataListUserNos[i]=userMng[i].userNo;
        }
        let dataListUserNo = dataListUserNos.filter(uerNo=>uerNo == value);
        if(value==dataListUserNo[0]){
            callback('账号已存在');
        }
        callback();
    };
    //长度校验
    checkLength = (rule, value, callback) => {
        const form = this.props.form;
        value=value?value:[];
        if (value.length > 24) {
            callback('该名称最多可输入25个字符！');
        } else {
            callback();
        }
    };
    render() {
        let rolrList=this.props.rolrLists.result;
        const FormItem = Form.Item;
        const select=Select.Option;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
                <div>
                    <Modal title="新增用户基本信息"
                           visible={this.props.visibleu}
                           onCancel={(e)=>this.handleCancels(e)}
                           footer={[
                               <Button type="primary" onClick={(e)=>this.handleCancels(e)} size="large">取消</Button>,
                               <Button type="primary"  style={{margin:10}} onClick={(e)=>this.handleSubmit(e)} size="large">保存</Button>
                           ]}
                    >
                        <Form >
                            <FormItem
                                {...formItemLayout}
                                label="账号"
                                hasFeedback
                            >
                                {getFieldDecorator('userNo', {
                                    rules: [
                                        {required: true, message: '请输入账号!'},
                                        {validator: this.checkLength},
                                        {validator:this.checkRepeatUserNo}
                                    ],
                                })(
                                    <Input type='text' maxLength="25"  placeholder='请输入账号'/>
                                )}
                            </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="用户名"
                                    hasFeedback
                                >
                                    {getFieldDecorator('name', {
                                        rules: [
                                            {required: true, message: '请输入用户名!'},
                                            {validator:this.checkRepeat},
                                            {validator: this.checkLength},
                                        ],
                                    })(
                                        <Input  maxLength="25" placeholder='请输入用户名'/>
                                    )}
                                </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="密码"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('userPwd', {
                                            rules: [
                                                {required: true, message: '请输入密码!'},
                                                {validator: this.checkLength},

                                            ],
                                        })(
                                            <Input type='password'  maxLength="25" placeholder='请输入密码'/>
                                        )}
                                    </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="角色：">
                                {getFieldDecorator('roleId', {
                                    rules: [
                                        {
                                            required: true, message: '请选择角色!',
                                        }],
                                    initialValue:rolrList?rolrList[0].id:[],
                                })(
                                    <select  placeholder="请选择角色"
                                             style={{ width:'100%',height:32,borderRadius:4,
                                                 borderColor:'#d9d9d9',padding:'6px 7px'}}>
                                        {

                                            (rolrList || []).map(function (role, i) {
                                                return (<option key={i} value={role.id}>{role.name}</option>)
                                            })
                                        }
                                    </select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="是否启用"
                            >
                                {getFieldDecorator('status', { valuePropName: 'checked',
                                    initialValue:true
                                })(
                                    <Switch className="ant-switch-checked"/>
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
        )
    }
}
export default Form.create()(UserModalElement);
