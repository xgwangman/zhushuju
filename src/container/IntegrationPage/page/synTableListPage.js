require("../../../../css/DomainPageCss.css");
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import TableListTable from '../component/TableListTable';
import {
    selectDataSourceAttr,
    selectReqDataSrc,
    selectSynTableList
} from '../selectors';
import {onRequestSynTableList, onRequestSynTableSearch, synTablesAction, setTableAttr} from '../actions';

export class SynTableListPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestSynTableList();
    }
    state = {searchValue: ''};
    searchChange=(e)=>{
        this.setState({
            searchValue: e.target.value
        })
            this.props.requestSynTableSearch(e.target.value);
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
                        <Breadcrumb.Item>同步表管理
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="请输入表名称"
                               onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">
                <button type="button" className="btn-css"
                        onClick={(e) => this.props.synTables()}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 一键同步
                </button>

                <TableListTable style={{marginTop: '0px'}} type="synTable" dataList={this.props.synTableList}
                                clickSynFieldNum={this.props.onClickSynFieldNum}
                >
                </TableListTable>
            </div>
            </div>
        )
    }
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
SynTableListPage.propTypes = {
    onChangeTableStatus: React.PropTypes.func,
    onClickFieldNum: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestSynTableList: (evt) => {
            dispatch(onRequestSynTableList(evt));
        },
        requestSynTableSearch: (evt) => {
            dispatch(onRequestSynTableSearch(evt));
        },
        onClickSynFieldNum: (evt, table) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setTableAttr(table));
        },
        synTables: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(synTablesAction(true));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    dataSource: selectDataSourceAttr(),
    appReqData: selectReqDataSrc(),
    synTableList: selectSynTableList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SynTableListPage);