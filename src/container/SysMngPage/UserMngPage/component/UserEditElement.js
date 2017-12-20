/**
 * Created by Administrator on 2017/4/27.
 */
import 'antd/dist/antd.css';
import { Modal,Select, Button,Form,Input} from 'antd';
import React, {Component} from 'react';

export class UserEditElement extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit =(e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err){
                return
            }else {
               this.props.editorUser(values);
            }
            this.props.form.resetFields();
        });
    };
    //取消
    handleCancelEdit =(e) => {
        this.props.handleCancelE(e);
        this.props.form.resetFields();
    };
    //账号 用户名重复校验
    checkRepeatName =(rule,value,callback)=>{
        let userAttribute=this.props.userAttribute;
        let userMng=this.props.userMngData?this.props.userMngData.result:[];
        let dataListNames=[];      //用户名
        for (let i=0;i<userMng.length;i++){
            dataListNames[i]=userMng[i].name;
        }
        for(let i=0;i<dataListNames.length;i++){
                if(dataListNames[i]==userAttribute.name){
                    dataListNames.splice(i,1);
                }
            }
            let ListName = dataListNames.filter(name=>name == value);
            if(value==ListName[0]){
                callback('用户名已存在');
            }
            callback();
    };
    //长度校验
    checkLength = (rule, value, callback) => {
        const form = this.props.form;
        if (value.length > 24) {
            callback('该名称最多可输入25个字符！');
        } else {
            callback();
        }
    };
    render() {
        let rolrList=this.props.rolrListE.result;
        let userAttribute=this.props.userAttribute;
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
                <Modal title={'用户:'+this.props.name+'的信息编辑'}
                       visible={this.props.showEdit}
                       onCancel={(e)=>this.handleCancelEdit(e)}
                       footer={[
                           <Button type="primary" onClick={(e)=>this.handleCancelEdit(e)} size="large">取消</Button>,
                           <Button type="primary" style={{margin:10}}  onClick={(e)=>this.handleSubmit(e)} size="large">保存</Button>
                       ]}
                >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                        hasFeedback
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {required: true, message: '请输入用户名!'},
                                {validator:this.checkRepeatName},
                                {validator: this.checkLength},

                        ],
                            initialValue:userAttribute?userAttribute.name:null,
                        })(
                            <Input  maxLength="25" placeholder='请输入用户名'/>
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
                               initialValue:userAttribute?userAttribute.roleId:null,
                        })
                        (
                            <select
                                placeholder="请选择角色" style={{ width:'100%',height:32,borderRadius:4,borderColor:'#d9d9d9',padding:'6px 7px' }}
                            >
                                {

                                    (rolrList || []).map(function (role, i) {
                                        return(<option key={i} value={role.id}>{role.name}</option>)
                                    })
                                }
                            </select>
                        )}

                    </FormItem>
                </Form>
                </Modal>
            </div>
        )
    }

}
export default Form.create()(UserEditElement);

