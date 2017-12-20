require("bootstrap/dist/css/bootstrap.css");
require("../../../../css/PageHeader.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';
import {Link, router} from 'react-router';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import VersionListTable from '../component/VersionListTable';
import {
    selectDomainData,
    selectModelData,
    selectEntityData,
    selectVersionList,
} from '../selectors';
import {
    onRequestAllVersions,
    //^^^^^^^^^^^^^^^^^^
    checkVersion,
    requestVersionAttrList,
    getName,
} from '../actions';

export class versionPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestAllVersions({entityId:this.props.params.entityId,page:1,limit:15,nameLike:''});
    }
    onPageChange=(page)=>{
        this.props.requestAllVersions({entityId:this.props.params.entityId,page:page.current,limit:page.pageSize,nameLike:''});
    };
    render() {
        let {domainName,modelName,entityName,entityId,modelId}=this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link
                            to="/main">{domainName}({modelName})</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={encodeURI("/main/entity/"+domainName+'/'+modelName+'/'+modelId)}>{entityName}</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>版本管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="版本名称" onChange={(e)=>{this.props.requestAllVersions({entityId:entityId,page:1,limit:15,nameLike:e.target.value})}}/>
                </div>
                <div className="centerContent">
                    <VersionListTable
                        dataList={this.props.versionList}
                        domainName={domainName}
                        modelName={modelName}
                        entityName={entityName}
                        entityId={entityId}
                        modelId={modelId}
                        checkVersion={this.props.checkVersion}
                        onPageChange={()=>this.onPageChange}
                    />
                </div>
            </div>
        )
    }
}
/**
 *
 */
versionPage.propTypes = {
    checkVersion:React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestAllVersions: (object) => {
            dispatch(onRequestAllVersions(object));
        },
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        checkVersion:(evt,record)=>{
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(checkVersion(record.id));
            dispatch(requestVersionAttrList(true));
            dispatch(getName(record.name));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    domainData: selectDomainData(),
    modelData: selectModelData(),
    entityData: selectEntityData(),
    versionList: selectVersionList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(versionPage);