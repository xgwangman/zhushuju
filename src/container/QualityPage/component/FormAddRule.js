/**
 * Created by Administrator on 2017/6/21.
 */
import {Select,Button,Form,Input} from 'antd';
import React, {Component, PropTypes} from 'react';
import TreeSelectRule from './TreeSelect'
import {Link,hashHistory} from 'react-router';

export class FormAddRule extends Component {
    constructor(props) {
        super(props);
        const edtiorTreeSelectData=this.props.edtiorDataValue;
        let TreeSelect=new Array();
        if(edtiorTreeSelectData!=null&&edtiorTreeSelectData.ruleContext!=null){
            var TreeSelectData=JSON.parse(edtiorTreeSelectData.ruleContext);
            for(var i=0;i<TreeSelectData.length;i++){
                TreeSelect[i]=TreeSelectData[i];
            };
        };
        if(TreeSelect==null){
            this.state={
                treeValue:['0']
            };
        }else{
            this.state={
                treeValue:TreeSelect
            };
        };
    }
    handleSubmit =(e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                //规则自定义插件（）
                var customData=this.props.edtiorValue;
                var value=values.value;
                if(customData!=null){
                    for(var i=0;i<value.length;i++){
                        for(var num=0;num<customData.length;num++){
                            var valueObj=JSON.parse(value[i]);
                            var customType=customData[num].type;
                            if(valueObj.type==customType){
                                var valueJson={
                                    type: valueObj.type, classifyId: valueObj.classifyId,
                                    plugIn: valueObj.plugIn, name: valueObj.name, id: valueObj.id,value:customData[num].value,
                                    modelId:valueObj.modelId,entityId:valueObj.entityId,attributeId:valueObj.attributeId,
                                };
                                value[i]=JSON.stringify(valueJson);
                            }
                        }
                    }
                };
                //编辑规则是获取规则的初始值
                const edtiorTreeSelectData=this.props.edtiorDataValue;//table值
                let TreeSelect=new Array();
                if(edtiorTreeSelectData!=null&&edtiorTreeSelectData.ruleContext!=null){
                    var TreeSelectData=JSON.parse(edtiorTreeSelectData.ruleContext);
                    for(var i=0;i<TreeSelectData.length;i++){
                        TreeSelect[i]=TreeSelectData[i];
                    };
                    if(values.value==null){
                        values.value=TreeSelect;
                    };
                };
                //检查没有错误后提交
                this.props.addRule(values);
                hashHistory.push(encodeURI('ruleDomainPage/'+this.props.domainId+'/'+this.props.domainName));
                this.props.onEdtiorRule();//清空table编辑数据
            }else{
                return
            }
        });
    };
    //使用if判断是唯一性的话就不弹出框
    onTreeSelect=(value)=>{
        var s="plugin";
        var valueJson=JSON.parse(value);
        if(valueJson.type.substring(0,6)==s){
            if(valueJson.type=='plugin-unique'||valueJson.type=='plugin-null'){
                this.props.ruleName(valueJson);
            }else{
                this.props.ruleName(valueJson);
                this.props.showRuleModal(true);
            }
        }
    };
    onTreeChange =(value) => {
        this.setState({treeValue:value});
    };
    onSelectModel=(value)=>{
        this.props.modalData(value);
    };
    onSelectEntity=(value)=>{
        this.props.entityData(value);
    };
    //长度校验
    checkLength = (rule, value, callback) => {
        const form = this.props.form;
        value=value?value:[];
        if (value.length > 49) {
            callback('该名称最多可输入50个字符！');
        } else {
            callback();
        }
    };
    checkLengthRemak = (rule, value, callback) => {
        const form = this.props.form;
        value=value?value:[];
        if (value.length > 99) {
            callback('该名称最多可输入100个字符！');
        } else {
            callback();
        }
    };
    render() {
        let {modelList,entityList,attributeList,edtiorDataValue} =this.props;
        const option=Select.Option;
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
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
            <div className="mar-tb ">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout}
                              label="规则名称"
                              hasFeedback
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {required: true, message: '请输入规则名称!'},
                                {validator: this.checkLength},
                            ],
                            initialValue:edtiorDataValue?edtiorDataValue.name:null,
                        })(
                            <Input placeholder={`请输入规则名称`} type="text" maxLength="50"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="数据类"
                        hasFeedback
                    >
                        {getFieldDecorator('modelId', {
                            rules: [
                                {
                                    required: true, message: '请选择数据类!',
                                }],
                            initialValue:edtiorDataValue?edtiorDataValue.modelId:null,
                        })(
                            <Select
                                size={'large'}
                                placeholder="请选择数据类"
                                onChange={(e)=>{this.onSelectModel(e)}}
                            >
                                {modelList instanceof  Array ?
                                    modelList.map(function (model,index) {
                                        return (<option key={index} value={model.id}>{model.name}</option>)
                                    }): <option key={1} value=''></option>
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="实体"
                        hasFeedback
                    >
                        {getFieldDecorator('entityId', {
                            rules: [
                                {
                                    required: true, message: '请选择实体!',
                                }],
                            initialValue:edtiorDataValue?edtiorDataValue.entityId:null,
                        })(
                            <Select
                                size={'large'}
                                placeholder="请选择实体"
                                onChange={(e)=>{this.onSelectEntity(e)}}
                            >
                                {entityList instanceof  Array ?
                                    entityList.map(function (entity, index) {
                                        return (<option key={index} value={entity.id}>{entity.name}</option>)
                                    }):<option key={1} value=''></option>

                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="属性"
                        hasFeedback
                    >
                        {getFieldDecorator('attributeId', {
                            rules: [
                                {
                                    required: true, message: '请选择属性!',
                                }],
                            initialValue:edtiorDataValue?edtiorDataValue.attId:null,
                        })(
                            <Select
                                size={'large'}
                                placeholder="请选择属性"
                            >
                                {
                                    attributeList instanceof  Array ?
                                        attributeList.map(function (attribute,index) {
                                            return (<option key={index} value={attribute.id}>{attribute.name}</option>)
                                        }):<option key={1} value=''></option>

                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="规则"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('value', {
                            rules: [
                                {
                                    required: edtiorDataValue==null?true:false, message: '请选择规则!',
                                }],
                        })
                        (
                            <TreeSelectRule
                                ruleLibrary={this.props.ruleLibrary}
                                edtiorData={this.props.edtiorData}
                                onChange={this.onTreeChange}
                                onSelect={this.onTreeSelect}
                                treeValue={this.state.treeValue}
                                edtiorDataValue={this.props.edtiorDataValue}
                                edtiorSaveData={this.props.edtiorSaveData}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="描述"
                        hasFeedback
                    >
                        {getFieldDecorator('describe',{
                            rules: [
                                {validator: this.checkLengthRemak},


                            ],
                            initialValue:edtiorDataValue?edtiorDataValue.remark:null,
                        })(
                            <Input type="textarea" maxLength="100"/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary"  onClick={()=>this.props.onEmptyEdtiorRule()} size="large">
                            <Link to={encodeURI('ruleDomainPage/'+this.props.domainId+'/'+this.props.domainName)}>取消</Link>
                        </Button>
                        <Button type="primary" style={{margin:10}} htmlType="submit" size="large">
                            保存
                        </Button>


                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(FormAddRule);