import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import FieldListTable from '../component/FieldListTable';
import BasicInformation from '../component/BasicInformation';
import {
    selectDataSourceAttr,
    selectReqDataSrc,
    selectSynFieldList,
    selectTableAttr
} from '../selectors';
import {onRequestSynFieldList, synFieldsAction} from '../actions';

export class SynFieldListPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestSynFieldList({page:1,limit:9});
    }
    state = {searchValue: ''};
    searchChange=(e)=>{
        this.setState({
            searchValue: e.target.value
        })
            this.props.requestSynFieldSearch(e.target.value);
    };
    render() {
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/integration")}>集成管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/integration/dataSrc")}>{this.props.appReqData.appName}-数据源管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/integration/dataSrc/tableList")}>{this.props.dataSource.name}-表管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/integration/dataSrc/synTableList")}>{this.props.tableAttr.name}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            同步表结构
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <SearchBox placeholder="请输入表名称"
                               onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">
                <BasicInformation data={this.props.tableAttr}/>
                <h1 style={{marginTop: '50px'}}>表结构</h1>
                <hr className="hr" style={{margin: '10 0'}}></hr>
                <button type="button" className="btn-css"
                        onClick={(e) => this.props.synFields()}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 一键同步
                </button>
                <FieldListTable style={{marginTop: '0px'}} type="synTable"
                                dataList={this.props.synFieldList}
                                requestSynFieldList={this.props.requestSynFieldList}
                >
                </FieldListTable>
            </div>
            </div>
        )
    }
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
SynFieldListPage.propTypes = {
    requestSynFieldList: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestSynFieldList: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onRequestSynFieldList(evt));
        },
        requestSynFieldSearch: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            let fieldSearch = {
                nameLike:evt,
                page:1,
                limit:9
            }
            dispatch(requestSynFieldSearch(fieldSearch));
        },
        synFields: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(synFieldsAction(true));
        }
    };
}


const mapStateToProps = createStructuredSelector({
    appReqData: selectReqDataSrc(),
    dataSource: selectDataSourceAttr(),
    tableAttr: selectTableAttr(),
    synFieldList: selectSynFieldList(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(SynFieldListPage);