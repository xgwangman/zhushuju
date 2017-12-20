require("../../../../css/PageHeader.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';
import {Link, router,hashHistory} from 'react-router';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import VersionListTable from '../component/VersionListTable';
import {selectEntityVersionList} from '../selectors';
import {onRequestAllVersion} from '../actions';
export class versionPage extends Component {
    constructor(props) {
        super(props);
        this.props.onRequestAllVersion({page:1,limit:15,entityId:this.props.params.entityId,nameLike:''});
        this.state={
            searchValue:''
        }
    }
    domainName=this.props.params.domainName;
    modelName=this.props.params.modelName;
    modelId=this.props.params.modelId;

    searchChange=(e)=>{
        this.setState({
            searchValue:e.target.value
        });
        this.props.onRequestAllVersion({page:1,limit:15,entityId:this.props.params.entityId,nameLike:e.target.value});
    };
    render() {
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link
                            to="/design">{this.props.params.domainName}({this.props.params.modelName})</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a onClick={(e)=> {
                                hashHistory.push(encodeURI("/design/entitys/"+this.modelId+'/'+this.domainName+'/'+this.modelName));
                            }}>
                                {this.props.params.entityName}
                            </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>版本管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox
                        placeholder="版本名称"
                        onChange={this.searchChange}/>
                </div>
                <div className="centerContent ">
                    <VersionListTable
                        dataList={this.props.entityVersionList}
                        onRequestAllVersion={this.props.onRequestAllVersion}
                        nameLike={this.state.searchValue}
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
    entityVersionList: React.PropTypes.array,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        onRequestAllVersion: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onRequestAllVersion(evt));
        }
    };
}


const mapStateToProps = createStructuredSelector({
    entityVersionList: selectEntityVersionList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(versionPage);