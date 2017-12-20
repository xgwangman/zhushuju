require("../../../../css/PageHeader.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';
import {Link, router} from 'react-router';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import AttrListTable from '../component/AttrListTable';
import {
    selectDomainData,
    selectModelData,
    selectEntityData,
    selectAttrList
} from '../selectors';
import {
    onRequestAttrList,
} from '../actions';

export class attrPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            searchValue:''
        }
        this.props.requestAttrList({entityId:this.props.params.entityId,page:1,limit:15,nameLike:''});
    }
    onPageChange=(page)=>{
        this.props.requestAttrList({entityId:this.props.params.entityId,page:page.current,limit:page.pageSize,nameLike:this.state.searchValue});
    };
    searchChange=(e)=>{
        this.setState({
            searchValue:e.target.value
        });
        this.props.requestAttrList({entityId:this.props.params.entityId,page:1,limit:15,nameLike:e.target.value});
    };
    render() {
        let {domainName,modelName,entityName,modelId}=this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link
                            to="/main">{domainName}({modelName})</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={encodeURI("/main/entity/"+domainName+'/'+modelName+'/'+modelId)}>{entityName}</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>属性管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="属性名称"
                               onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent">
                    <AttrListTable dataList={this.props.attrList}
                                   onPageChange={()=>this.onPageChange}
                    />
                </div>
            </div>
        );
    }
}
/**
 *
 */
attrPage.propTypes = {
    requestAttrList: React.PropTypes.func
};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestAttrList: (object) => {
            dispatch(onRequestAttrList(object));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    domainData: selectDomainData(),
    modelData: selectModelData(),
    entityData: selectEntityData(),
    attrList: selectAttrList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(attrPage);