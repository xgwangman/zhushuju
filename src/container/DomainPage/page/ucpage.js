require("../../../../css/PageHeader.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';
import {Link, router} from 'react-router';
import {createStructuredSelector} from 'reselect';
const moment = require('moment');
const uuidV4 = require('uuid/v4');
import {SearchBox} from '../../../common/components/SearchBox';
import UcListTable from '../component/UcListTable';
import {
    selectUcDataList,
} from '../selectors';
import {
    requestUcList,
} from '../actions';

export class ucPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestUcList({entityId:this.props.params.entityId});
    }
    render() {
        let {domainName,modelName,entityName,modelId}=this.props.params;

        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/main/entity/"+domainName+'/'+modelName+'/'+modelId)}>{entityName}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>UC矩阵信息页面</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="实体名称"/>
                </div>
                <div className="centerContent">
                    <UcListTable
                        dataList={this.props.dataList}
                    />
                </div>
            </div>
        );

    }
}
/**
 *
 */
ucPage.propTypes = {

};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestUcList: (evt) => {
            dispatch(requestUcList(evt));
        },

    };
}


const mapStateToProps = createStructuredSelector({
    dataList:selectUcDataList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ucPage);