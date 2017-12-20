/**
 * Created by Administrator on 2017/4/26.
 */
import 'antd/dist/antd.css';
import { Modal, Button,Form,Input} from 'antd';
import React, {Component} from 'react';
export  class EditRoleElement extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit =(e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err){
                return;
            }else {
                this.props.onSaveRoleE(values);
            }
            this.props.form.resetFields();
        });
    };
    //取消
    cancel=(e)=>{
        this.props.handleCancelE(e),
        this.props.form.resetFields();
    };
    //重复校验
    checkRepeatCode =(rule,value,callback)=>{
        let roleLists=this.props.roleList?this.props.roleList.result:[];
        let roleAttribute=this.props.roleAttribute;
        let dataListCodes=[];      //标识
        for (let i=0;i<roleLists.length;i++){
            dataListCodes[i]=roleLists[i].code;
        };
        for(let i=0;i<dataListCodes.length;i++){
            if(dataListCodes[i]==roleAttribute.code){
                dataListCodes.splice(i,1);
            }
        }
        let dataListCode = dataListCodes.filter(code=>code == value);
        if(value==dataListCode[0]){
            callback('角色标识已存在');
        }
        callback();
    };
    checkRepeatName =(rule,value,callback)=>{
        let roleLists=this.props.roleList?this.props.roleList.result:[];
        let roleAttribute=this.props.roleAttribute;
        let dataListNames=[];
        for (let i=0;i<roleLists.length;i++){
            dataListNames[i]=roleLists[i].name;
        }
        for(let i=0;i<dataListNames.length;i++){
            if(dataListNames[i]==roleAttribute.name){
                dataListNames.splice(i,1);
            }
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
        if (value.length > 17) {
            callback('该名称最多可输入18个字符！');
        } else {
            callback();
        }
    };
    checkNameLength= (rule, value, callback) => {
        const form = this.props.form;
        if (value.length > 24) {
            callback('该名称最多可输入25个字符！');
        } else {
            callback();
        }
    };
    checkRemarkLength= (rule, value, callback) => {
        const form = this.props.form;
        if (value.length > 49) {
            callback('该名称最多可输入50个字符！');
        } else {
            callback();
        }
    };
    render() {
        const roleAttribute=this.props.roleAttribute;
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
        return (<div>
                <Modal title={'角色:'+roleAttribute.name+'的信息编辑'}
                       visible={this.props.showEdit}
                       onCancel={(e)=>this.cancel(e)}
                       footer={[
                           <Button type="primary" onClick={(e)=>this.cancel(e)} size="large">取消</Button>,
                           <Button type="primary"  style={{margin:10}}  onClick={(e)=>this.handleSubmit(e)} size="large">保存</Button>,
                       ]}
                >
                    <Form >
                        <FormItem
                            {...formItemLayout}
                            label="角色标识:"
                            hasFeedback
                        >
                            {getFieldDecorator('code', {
                                rules: [
                                    {required: true, message: '请输入角色标识!'},
                                    {validator:this.checkRepeatCode},
                                    {validator:this.checkCodeLength}
                                ],
                                initialValue:roleAttribute.code,
                            })(
                                <Input maxLength="18" placeholder="最多输入18个字符"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="角色名称:"
                            hasFeedback
                        >
                            {getFieldDecorator('name', {
                                rules: [
                                    {required: true, message: '请输入角色名称!'},
                                    {validator:this.checkRepeatName},
                                    {validator:this.checkNameLength}
                                ],
                                initialValue:roleAttribute.name,
                            })(
                                <Input maxLength="25" placeholder="最多输入25个字符"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述"
                            hasFeedback
                        >
                            {getFieldDecorator('remark', {
                                rule:[
                                    {validator:this.checkRemarkLength}
                                ],
                                initialValue:roleAttribute.remark?roleAttribute.remark:null,
                            })(
                                <Input type="textarea" maxLength="50" placeholder="最多输入50个字符"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(EditRoleElement);






