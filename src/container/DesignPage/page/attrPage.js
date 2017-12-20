require("../../../../css/PageHeader.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb,Modal} from 'antd';
import {Link, router,hashHistory} from 'react-router';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import AttrListTable from '../component/AttrListTable';
import AddAttribute from '../component/AddAttribute';
import {selectAttrList, selectShowAttrModal, selectEntityName,selectAttributeData,
        selectAllModelList, selectSelectedEntity, selectSelectedAttrs
} from '../selectors';
import {showAttrCreate, onSaveAttribute, setAttributeData, onDeleteAttr,
        onRequestAttrData, searchAttrList,requestAllModels,onSelectThisModel,onSelectThisEntity
} from '../actions';

export class attrPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            defaultLimit:15,
            searchValue:'',
            current:1
        }
        this.props.requestAttrList({
            entityId:this.props.params.entityId,
            limit:this.state.defaultLimit,
            page:1,
            nameLike:this.state.searchValue
        })
    }
    searchValueChange=(e)=>{
        this.setState({
            searchValue:e.target.value
        });
        let searchRequestData={
            entityId:this.props.params.entityId,
            nameLike:e.target.value,
            limit:this.state.defaultLimit,
            page:1,
        };
        this.props.requestAttrList(searchRequestData);
    };
    onPageChange=(page,pageSize)=>{
        this.setState({
            current:page,
        });
        let searchRequestData = {
            page:page,
            limit:pageSize,
            nameLike:this.state.searchValue,
            entityId:this.props.params.entityId,
        };
        this.props.requestAttrList(searchRequestData)
    };
    entityId=this.props.params.entityId;
    render() {
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link to="/design">
                            {this.props.params.domainName}({this.props.params.modelName})
                        </Link></Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a onClick={(e)=> {
                                hashHistory.push(encodeURI("/design/entitys/"+this.props.params.modelId+'/'+this.props.params.domainName+'/'+this.props.params.modelName));
                            }}>
                            {this.props.params.entityName}
                            </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>属性管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="属性名称"
                               onChange={this.searchValueChange}
                    />
                </div>
                <div  className="centerContent ">
                    <button type="button" className="btn-css"
                            onClick={(e) => this.props.showAttrCreate(e)}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加属性
                    </button>
                    <AttrListTable dataList={this.props.attributeList}
                                   deleteAttr={this.props.onDeleteAttr}
                                   updateAttr={this.props.onUpdateAttr}
                                   requestAttrList={this.props.requestAttrList}
                                   limit={this.state.defaultLimit}
                                   current={this.state.current}
                                   onChange={this.onPageChange}
                                   entityId={this.entityId}
                    />
                    <AddAttribute show={this.props.showEditAttr}
                                  attributeData={this.props.attributeAttr}
                                  modelDataList={this.props.modelDataList}
                                  selectEntityList={this.props.selectEntityList}
                                  selectAttrList={this.props.selectAttrList}
                                  hide={this.props.hideEditAttr}
                                  onSaveAttr={this.onSaveAttribute.bind(this)}
                                  onSelectThisModel={this.props.onSelectThisModel}
                                  onSelectThisEntity={this.props.onSelectThisEntity}
                    />
                </div>
            </div>
        );
    }
    //add属性
    onSaveAttribute(evt){
        evt.entityId=this.props.params.entityId;
        this.props.dispatch(onSaveAttribute(evt));
    }
}
/**
 *
 */
attrPage.propTypes = {
    showAttrCreate: React.PropTypes.func,
    hideEditAttr: React.PropTypes.func,
    onUpdateAttr: React.PropTypes.func,
    onClickAttrType: React.PropTypes.func,
    onSaveAttribute: React.PropTypes.func,
    onDeleteAttr: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestAttrList: (pagination) => {
            dispatch(onRequestAttrData(pagination));
        },
        showAttrCreate: (evt) => {
            dispatch(showAttrCreate(true));
            dispatch(requestAllModels(true));
        },
        onSelectThisModel: (evt) => {
            dispatch(onSelectThisModel(evt));
        },
        onSelectThisEntity:(evt)=>{
            dispatch(onSelectThisEntity(evt));
        },
        hideEditAttr: (evt) => {
            dispatch(showAttrCreate(false));
            dispatch(setAttributeData(""));
        },
        //delete属性
        onDeleteAttr(evt, record){
            Modal.confirm({
                title: '你确定要删除属性'+record.name+'？',
                onOk() {
                    dispatch(onDeleteAttr(record));
                },
                onCancel() {
                }
            })

        },
        onUpdateAttr: (evt, record)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showAttrCreate(true));
            dispatch(setAttributeData(record));
        },
        onChangeSelectedModel: (evt, record)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        }
    };
}


const mapStateToProps = createStructuredSelector({
    attributeAttr: selectAttributeData(),
    showEditAttr: selectShowAttrModal(),
    entityName: selectEntityName(),
    attributeList: selectAttrList(),
    modelDataList: selectAllModelList(),
    selectEntityList: selectSelectedEntity(),
    selectAttrList: selectSelectedAttrs(),
});

export default connect(mapStateToProps, mapDispatchToProps)(attrPage);