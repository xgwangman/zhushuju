/**
 * Created by Administrator on 2017/6/21.
 */
import {createStructuredSelector} from 'reselect';
import {Table, Button, Switch, Icon, Tooltip,Breadcrumb} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {
    addRule,
    showRuleModal,
    ruleName,
    onSaveRulesEditor,
    modalData,
    entityData,
    onEdtiorRule,
} from '../actions';
import {
    selectRuleListName,
    selectUpdateRuleLibrary,
    selectShowRuleModal,
    selectRuleName,
    selectModalListData,
    selectEntityListData,
    selectAttributeListData,
   selectOnEdtiorRule,
    selectOnSaveRulesEditor,
} from '../selectors';

import CustomRuleModal from '../component/CustomRuleModal';
import FormAddRule from '../component/FormAddRule';
/**
 * *****************************************************************
 */
export  class AddRulePage extends Component {
    constructor(props) {
        super(props);
        this.props.onSaveRulesEditor();
    }
    domainId=this.props.params.domainId;
    domainName=this.props.params.domainName;
    render() {
            let ruleList=this.props.ruleLibrary;
            let EdtiorRule=this.props.EdtiorRule;//在table点击编辑后将数据拿到
            if(EdtiorRule!=null){
            for(var i=0;i<ruleList.length;i++){
            if(EdtiorRule!=null){
               let ruleContextObj=JSON.parse(EdtiorRule.ruleContext);//数组
               for(var i=0;i<ruleList.length;i++){
                   if(ruleList[i].label=="自定义插件"){
                       var child=ruleList[i].children||[];//自定义插件组
                       for(var n=0;n<child.length;n++){
                           for(var m=0;m<ruleContextObj.length;m++){
                               let edtiorRuleName=JSON.parse(ruleContextObj[m]).name;
                               if(child[n].label==edtiorRuleName){
                                   child[n].value=ruleContextObj[m];
                               }
                           }
                       }
                   }
               }
            }
         }
    };
        return (
            <div >
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to={'quality'}>质量监控</Link>/
                            <Link to={encodeURI('ruleDomainPage/'+this.props.params.domainId+'/'+this.props.params.domainName)}> {this.props.params.domainName}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{EdtiorRule?'编辑规则':'添加规则'}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent ">
                    <FormAddRule
                        ruleLibrary={ruleList}
                        addRule={this.props.addRule}
                        showRuleModal={this.props.showRuleModal}
                        ruleName={this.props.ruleName}
                        edtiorValue={this.props.edtiorValue}
                        ruleNameValue={this.props.ruleNameValue}
                        modelList={this.props.modelList}
                        modalData={this.props.modalData}
                        entityList={this.props.entityList}
                        entityData={this.props.entityData}
                        attributeList={this.props.attributeList}
                        edtiorDataValue={this.props.EdtiorRule}
                        onEdtiorRule={this.props.onEdtiorRule}
                        edtiorData={this.props.EdtiorRule}
                        edtiorSaveData={this.props.edtiorValue}
                        onEmptyEdtiorRule={this.props.onEmptyEdtiorRule}
                        domainId={this.domainId}
                        domainName={this.domainName}
                    />
                    <CustomRuleModal
                        visible={this.props.visible}
                        handleCancel={this.props.handleCancel}
                        ruleNameValue={this.props.ruleNameValue}
                        onSaveRulesEditor={this.saveRulesArray.bind(this)}

                    />

                </div>

            </div>
        )
    }

    /**
     * 保存规则自定义插件的值
     */

    saveRulesArray(e) {
           var type=this.props.ruleNameValue.type;
           var elementObj;
           var customData=new Array();
               if(e.lengthMin!=null){
                     elementObj={type:type,value:{min:e.lengthMin,max:e.lengthMax}};
               }else if(e.min!=null){
                      elementObj={type:type,value:{min:e.min,max:e.max}};
               } else if(e.name!=null){
                   elementObj={type:type,value:{name:e.name,value:e.values}};
               }else if(e.restValue!=null){
                   elementObj={type:type,value:e.restValue};
               }
            //var customData=this.props.edtiorValue||[];
             customData[customData.length]=elementObj;
             this.props.dispatch(onSaveRulesEditor(customData));
             this.props.dispatch(showRuleModal(false));
                }

}


/**
 * *****************************************************************
 */
AddRulePage.propTypes = {
    ruquestRuleLibrary:React.PropTypes.func,
    addRule:React.PropTypes.func,
    showRuleModal:React.PropTypes.func,
    handleCancel:React.PropTypes.func,
    ruleName:React.PropTypes.func,
    onSaveRulesEditor:React.PropTypes.func,
    modalData:React.PropTypes.func,
    entityData:React.PropTypes.func,
    onEmptyEdtiorRule:React.PropTypes.func,

};

/**
 * *****************************************************************
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch:dispatch,
        addRule:(e)=>{
            dispatch(addRule(e));
        },
        showRuleModal:(e)=>{
            dispatch(showRuleModal(true))
        },
        handleCancel:(e)=>{
            dispatch(showRuleModal(false))
        },
        ruleName:(e)=>{
            dispatch(ruleName(e))
        },
        onSaveRulesEditor:(e)=>{
            dispatch(onSaveRulesEditor(e));
            dispatch(showRuleModal(false));
        },
        modalData:(e)=>{
            dispatch(modalData(e));
        },
        entityData:(e)=>{
            dispatch(entityData(e));
        },
        onEdtiorRule:(e)=> {
            dispatch(onEdtiorRule(e));
        },
        onEmptyEdtiorRule:(e)=> {
            dispatch(onEdtiorRule(e));
        },

    }
}
/**
 * *****************************************************************
 */

const mapStateToProps = createStructuredSelector({
    name:selectRuleListName(),
    ruleLibrary:selectUpdateRuleLibrary(),
    visible:selectShowRuleModal(),
    ruleNameValue:selectRuleName(),
    edtiorValue:selectOnSaveRulesEditor(),//自定义插件弹出框保存按钮
    modelList:selectModalListData(),
    entityList:selectEntityListData(),
    attributeList:selectAttributeListData(),
    EdtiorRule:selectOnEdtiorRule(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRulePage);
