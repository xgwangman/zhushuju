/**
 * Created by Administrator on 2017/4/25.
 */
import 'antd/dist/antd.css';
import { Modal,Button,Form,Input,Switch} from 'antd';
import React, {Component, PropTypes} from 'react';

export  class AddRoleModalElement extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit =(e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err){
                return;
            }else {
                if(values.status==true){
                    values.status='1';
                }else{
                    values.status='0';
                }
                this.props.onSaveRoleR(values);
            }
            this.props.form.resetFields();
        });
    };
//取消
    cancel=(e)=>{
        this.props.handleCancelR(e),
        this.props.form.resetFields();
    };
//重复校验  roleList
    checkRepeatCode =(rule,value,callback)=>{
        let roleLists=this.props.roleList?this.props.roleList.result:[];
        let dataListCodes=[];
        for (let i=0;i<roleLists.length;i++){
            dataListCodes[i]=roleLists[i].code;
        }
        let dataListCode = dataListCodes.filter(code=>code == value);
        if(value==dataListCode[0]){
            callback('角色标识已存在');
        }
        callback();
    };
    checkRepeatName =(rule,value,callback)=>{
        let roleLists=this.props.roleList?this.props.roleList.result:[];
        let dataListNames=[];
        for (let i=0;i<roleLists.length;i++){
            dataListNames[i]=roleLists[i].name;
        }
        let dataListName = dataListNames.filter(name=>name == value);
        if(value==dataListName[0]){
            callback('角色名已存在');
        }
        callback();
    };

//长度校验
    checkCodeLength = (rule, value, callback) => {
        const form = this.props.form;
        value=value?value:'';
        if (value.length > 17) {
            callback('角色标示最多可输入18个字符！');
        } else {
            callback();
        }
    };
    checkNameLength= (rule, value, callback) => {
        const form = this.props.form;
        value=value?value:'';
        if (value.length > 24) {
            callback('角色名最多可输入25个字符！');
        } else {
            callback();
        }
    };
    checkRemarkLength= (rule, value, callback) => {
        const form = this.props.form;
        value=value?value:'';
        if (value.length > 49) {
            callback('角色描述描述最多可输入50个字符！');
        } else {
            callback();
        }
    };
    render() {
        const FormItem = Form.Item;
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
                <Modal title="新增角色基本信息"
                       visible={this.props.visibleR}
                       onCancel={(e)=>this.cancel(e)}
                       footer={[
                           <Button type="primary"onClick={(e)=>this.cancel(e)} size="large">取消</Button>,
                           <Button type="primary"  style={{margin:10}}  onClick={(e)=>this.handleSubmit(e)} size="large">保存</Button>
                       ]}
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="角色标识"
                            hasFeedback
                        >
                            {getFieldDecorator('code', {
                                rules: [
                                    {required: true, message: '请输入角色标识!'},
                                    {validator:this.checkRepeatCode},
                                    {validator: this.checkCodeLength},
                                ],
                            })(
                                <Input type="text" maxLength="18" placeholder='请输入角色标识'/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="角色名称"
                            hasFeedback
                        >
                            {getFieldDecorator('name', {
                                rules: [
                                    {required: true, message: '请输入角色名称!'},
                                    {validator:this.checkRepeatName},
                                    {validator: this.checkNameLength},
                                ],
                            })(
                                <Input type="text" maxLength="25" placeholder='请输入角色名称'/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述"
                        >{getFieldDecorator('remark',{
                            rules: [
                                {validator: this.checkRemarkLength},
                            ],
                        })
                        (
                            <Input type="textarea" maxLength="50" placeholder='描述不能超过50个字符'/>
                        )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="是否启用"
                        >
                            {getFieldDecorator('status', {
                                valuePropName: 'checked',
                                initialValue:true
                            })
                            (
                                <Switch/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(AddRoleModalElement);
