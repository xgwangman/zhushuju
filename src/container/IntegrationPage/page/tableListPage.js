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
    selectTableList
} from '../selectors';
import {onRequestTableList, requestTableSearch, requestTablePage, onChangeTableStatus, setTableAttr} from '../actions';

export class TableListPage extends Component {
    constructor(props) {
        super(props);
        const tableList = this.props.params;
        this.props.onRequestTableList({id: tableList.srcId, page: 1, limit:13, nameLike: ''});
    }
    state = {searchValue: ''};
    searchChange=(e)=>{
        this.setState({
            searchValue: e.target.value
        })
        this.props.onRequestTableSearch({dsId: this.props.params.srcId, cont: e.target.value});
    };

    render() {
        const params = this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/integration")}>集成管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/integration/dataSrc/"+ params.paramsId +'/'+ params.srcName)}>数据源管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            表管理
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <SearchBox placeholder="请输入表名称"
                               onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">
                <TableListTable type="table" dataList={this.props.tableList}
                                changeTableStatus={this.props.onChangeTableStatus}
                                clickFieldNum={this.props.onClickFieldNum}
                                requestTablePage={this.props.onRequestTablePage}
                                params={this.props.params}
                                nameLike={this.state.searchValue}
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
TableListPage.propTypes = {
    onChangeTableStatus: React.PropTypes.func,
    onClickFieldNum: React.PropTypes.func,
    onRequestTableList: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        onRequestTableList: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onRequestTableList(evt));
        },
        onRequestTablePage: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestTablePage(evt));
        },
        onRequestTableSearch: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            let tableList = {
                nameLike: evt.cont,
                id: evt.dsId,
                page:1,
                limit: 13
            }
            dispatch(requestTableSearch(tableList));
        },
        onChangeTableStatus: (checked, tableId) => {
            dispatch(onChangeTableStatus({status: checked, id: tableId}));
        },
        onClickFieldNum: (evt, table) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setTableAttr(table));
        },
    };
}

const mapStateToProps = createStructuredSelector({
    dataSource: selectDataSourceAttr(),
    appReqData: selectReqDataSrc(),
    tableList: selectTableList(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(TableListPage);