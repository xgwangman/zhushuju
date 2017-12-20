/**
 * Created by Administrator on 2017/6/20.
 */
import {createStructuredSelector} from 'reselect';
import {Modal,Breadcrumb} from 'antd';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {SearchBox} from '../../../common/components/SearchBox';
const uuidV4 = require('uuid/v4');
import {
    onChangeStatusR,
    deleteRule,
    onEdtiorRule,
    domainDataList,
    modalData,
    entityData,
    ruquestRuleLibrary,
    rulePageData,
    onSearchRuleList,
    searchRulePageData,
} from '../actions';
import {
    selectRequestruleListData,
    selectRuleListName,
    selectOnSearchRuleList,
} from '../selectors';


import RuleTable from '../component/RuleTable';
/**
 * *****************************************************************
 */
export  class RuleDomainPage extends Component {
    constructor(props) {
        super(props);
        this.props.ruquestRuleLibrary();
        this.props.onEmptyEdtiorRule();
        this.props.rulePageData({page:1,limit:15,domainId:this.props.params.domainId});
        this.state={
            searchValue:''
        }
    }

    searchChange=(e)=>{
        if(e.target.value==""){
            this.props.onSearchRuleList({nameLike:e.target.value,domainId:this.props.params.domainId});
        }else{
            this.props.onSearchRuleList({nameLike:e.target.value,domainId:this.props.params.domainId});
        }
        this.setState({
            searchValue:e.target.value
        })
    };

    addRule=(e)=>{
        this.props.dispatch(domainDataList(this.props.params.domainId));
    }
    domainId=this.props.params.domainId;
    domainName=this.props.params.domainName;
    render() {
        const ruleDataList=this.props.dataList;
        return (

            <div >
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to={"quality"}>质量监控</Link>/{this.props.params.domainName}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="名称"
                               onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">
                <Link to={encodeURI('addRulePage/'+this.props.params.domainId+'/'+this.props.params.domainName)}>
                <button type="button" className="btn-css" onClick={this.addRule}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>添加规则
                </button>
                </Link>

                <RuleTable
                    ruleList={this.props.dataList}
                    onChangeStatusR={this.props.onChangeStatusR}
                    deleteRule={this.props.deleteRule}
                    rulePageData={this.props.rulePageData}
                    searchRulePageData={this.props.searchRulePageData}
                    onEdtiorRule={this.props.onEdtiorRule}
                    ruleLike={this.props.ruleLike}
                    domainId={this.domainId}
                    domainName={this.domainName}
                />
                </div>
            </div>
        )
    }
}
/**
 * *****************************************************************
 */
RuleDomainPage.propTypes = {
    onChangeStatusR:React.PropTypes.func,
    deleteRule:React.PropTypes.func,
    onEdtiorRule:React.PropTypes.func,
    onSearchRuleList:React.PropTypes.func,
};

/**
 * *****************************************************************
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch:dispatch,
        onChangeStatusR:(evt,record)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            if(record.status==true||record.status==1){
                record.status=false;
                dispatch(onChangeStatusR(record));
            }else {
                record.status=true;
                dispatch(onChangeStatusR(record));

            }
        },
        deleteRule:(evt,record)=> {
            Modal.confirm({
                title: '你确定要删除规则'+record.name+'？',
                onOk() {
                    dispatch(deleteRule(record))
                },
                onCancel() {
                }
            })

        },
        onEdtiorRule:(evt,record)=> {
            dispatch(onEdtiorRule(record));
            dispatch(domainDataList(record.domainId));
            dispatch(modalData(record.modelId));
            dispatch(entityData(record.entityId));
        },
        ruquestRuleLibrary:(e)=>{
            dispatch(ruquestRuleLibrary(true))
        },
        rulePageData:(evt)=>{
            dispatch(rulePageData(evt));

        },
        onEmptyEdtiorRule:(evt)=>{
            dispatch(onEdtiorRule(evt));

        },
        onSearchRuleList:(evt)=>{
            dispatch(onSearchRuleList(evt));
            if(evt==""){
                dispatch(rulePageData({page:1,limit:15}));
            }else {
                dispatch(searchRulePageData({page:1,limit:15}))
            }
        },
    }


}
/**
 * *****************************************************************
 */

const mapStateToProps = createStructuredSelector({
    dataList:selectRequestruleListData(),
    name:selectRuleListName(),
    ruleLike:selectOnSearchRuleList(),

});

export default connect(mapStateToProps, mapDispatchToProps)(RuleDomainPage);

