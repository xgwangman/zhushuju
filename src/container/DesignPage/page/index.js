import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, hashHistory} from 'react-router';
import {Breadcrumb,Modal,Icon,Tooltip} from 'antd';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import AddDomain from '../component/AddDomain';
import DomainElement from '../component/DomainElement';
import { selectShowEditDomain, selectDomainAttribute, selectModelName, selectDomainDataList,
         selectDomainEdtiorSign, selectClickModel,selectSetMonitor,
} from '../selectors';
import { showDomainCreate, setDomainAttr, onChangeModelName, onSaveDomain, requestDomainData,
         onDeleteDomain, setModelAttr, searchDomainList, domainEdtiorSign,requestMonitor,
} from '../actions';
import alert from '../../../common/utils/alert';

export class DesignPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestDesignDomain();
        this.props.requestMonitor();
        this.state={
            searchValue:''
        }
    }
    searchChange=(e)=>{
        if(e.target.value==""){
            this.props.requestDesignDomain();
        }else{
            this.props.dispatch(searchDomainList(e.target.value));
        }
        this.setState({
            searchValue:e.target.value
        })
    };

    render() {
        // 新增数据子集的数据格式
        let currentDomainAttr = {
            id: '',
            name: '',
            models: [],
        };
        let isMonitor=this.props.isMonitor?(this.props.isMonitor.result .totalProperty!=0?true:false):false;

        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                    <Breadcrumb.Item><Link to="/design">数据子集设计</Link></Breadcrumb.Item>
                </Breadcrumb>
                    {
                        isMonitor?( <Breadcrumb >
                            <Breadcrumb.Item>
                                <Tooltip title="监控">
                                    <Icon type="bell" className="monitorCss" onClick={(e)=> {
                                        hashHistory.push(encodeURI("/monitorPage"))
                                    }}/>
                                </Tooltip>
                            </Breadcrumb.Item>
                        </Breadcrumb>):null
                    }

                    <SearchBox placeholder="数据子集名称"
                               onChange={this.searchChange}
                    />
                </div>
                <div  className="centerContent ">
                    <button type="button" className="btn-css" size='large'
                            onClick={(e) => this.props.showDomainCreate(e, currentDomainAttr)}
                    >
                        <span className="glyphicon glyphicon-plus" aria-hidden="true" ></span> 添加数据子集
                    </button>

                    <DomainElement dataList={this.props.domainDataList}
                                   deleteDomain={this.props.onClickDeleteDomain}
                                   exportDomainStructure={this.props.onExportDomain}
                                   updateDomain={this.props.onUpdateDomain}
                                   clickModel={this.props.onClickModel}>
                    </DomainElement>
                    <AddDomain show={this.props.showEditDomain}
                               hide={this.props.hideEditDomain}
                               onSaveDomain={this.props.onSaveDomain}
                               onPlusModelName={this.onPlusModelName.bind(this)}
                               onDeleteModelName={this.onDeleteModelName.bind(this)}
                               onChangeModelName={this.props.onChangeModelName}
                               onChangeDomainName={this.onChangeDomainName.bind(this)}
                               domainAttribute={this.props.domainAttribute}
                               modelName={this.props.modelName}
                               dataList={this.props.domainDataList}
                               domainSign={this.props.domainSign}
                               domainEdtiorSign={this.props.domainEdtiorSign}
                    />
                </div>
            </div>
        );

    }

    // 改变数据子集名称后，将现在的state值set进domainAttribute
    onChangeDomainName(evt, domainName) {
        var me = this;
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        var domainAttribute = this.props.domainAttribute;
        var domainObject = {};
        // 深拷贝对象domainAttribute
        Object.assign( domainObject, domainAttribute);
        domainObject.name = evt.target.value;
        me.props.dispatch(setDomainAttr(domainObject));
    }

    // 添加model
    onPlusModelName(evt) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        var me = this, repeat = false;
        var modelName = this.props.modelName;
        if (!modelName) {
            return;
        }
        var domainAttribute = this.props.domainAttribute;
        var domainObject = {};
        // 深拷贝对象domainAttribute
       Object.assign(domainObject, domainAttribute);
        var modelNameList = domainObject.models;
        for (var i = 0; i < modelNameList.length; i++) {
            if (modelNameList[i].name == modelName) {
                alert("数据类名称已存在！", 'error');
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            modelNameList.push({name: modelName});
            me.props.dispatch(setDomainAttr(domainObject));
        }
        me.props.dispatch(onChangeModelName(''));
    }
    // 删除模型
    onDeleteModelName(evt, modelName) {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        var me = this, index;
        if (!modelName) {
            return;
        }
        var domainAttribute = this.props.domainAttribute;
        var domainObject = {};
        // 深拷贝对象domainAttribute
        Object.assign( domainObject, domainAttribute);
        var modelNameList = domainObject.models;
        for (var i = 0; i < modelNameList.length; i++) {
            if (modelNameList[i].name == modelName) {
                index = i;
                break;
            }
        }
        modelNameList.splice(index, 1);
        me.props.dispatch(setDomainAttr(domainObject));
    }
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
DesignPage.propTypes = {
    showDomainCreate: React.PropTypes.func,
    hideEditDomain: React.PropTypes.func,
    onPlusModelName: React.PropTypes.func,
    onDeleteModelName: React.PropTypes.func,
    onChangeModelName: React.PropTypes.func,
    onChangeDomainName: React.PropTypes.func,
    modelName: React.PropTypes.string,
    onSaveDomain: React.PropTypes.func,
    requestDesignDomain: React.PropTypes.func,
    onClickDeleteDomain: React.PropTypes.func,
    onExportDomain: React.PropTypes.func,
    onUpdateDomain: React.PropTypes.func,
    onClickModel: React.PropTypes.func,
    updateDomain: React.PropTypes.func,
};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        showDomainCreate: (evt, domain) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showDomainCreate(true));
            dispatch(setDomainAttr(domain));
        },
        requestDesignDomain: () => {
            dispatch(requestDomainData(true));
        },
        hideEditDomain: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showDomainCreate(false));
        },
        onChangeModelName: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onChangeModelName(evt.target.value));
        },
        onSaveDomain: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onSaveDomain(true));
        },
        onClickDeleteDomain:(evt,domain)=> {
                Modal.confirm({
                    title: '你确定要删除域：'+domain.name+'？',
                    onOk() {
                        dispatch(onDeleteDomain(domain.id))
                    },
                    onCancel() {
                    }
                })
        },


        onExportDomain: (evt, id)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            window.location.href = 'md/design/domain/exportmetadata.do'+'?id='+id;
        },
        onUpdateDomain: (evt, domain)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showDomainCreate(true));
            dispatch(domainEdtiorSign(domain.name));
            var modelNameList = [];
            $.each(domain.models, function (i, model) {
                modelNameList.push({
                    id: model.id,
                    name: model.name
                });
            });
            var domainAttr = {
                id: domain.id,
                name: domain.name,
                models: modelNameList
            };
            dispatch(setDomainAttr(domainAttr));
        },
        onClickModel: (evt, model, domain)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setModelAttr(model));
            dispatch(setDomainAttr(domain));
        },
        domainEdtiorSign: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(domainEdtiorSign());
        },
        requestMonitor: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestMonitor(evt));
        },
    };

}


const mapStateToProps = createStructuredSelector({
    domainDataList: selectDomainDataList(),
    showEditDomain: selectShowEditDomain(),
    domainAttribute: selectDomainAttribute(),
    modelName: selectModelName(),
    modelData:selectClickModel(),
    domainSign:selectDomainEdtiorSign(),
    isMonitor:selectSetMonitor(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(DesignPage);