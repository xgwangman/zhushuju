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
    selectFieldList,
    selectTableAttr
} from '../selectors';
import {onRequestFieldList, getFieldPage} from '../actions';

export class FieldListPage extends Component {
    constructor(props) {
        super(props);
        const fildId=this.props.params.srcId;
        const tablesId=this.props.params.srcTableId;
        this.props.requestFieldList({dsId: fildId,tableId:tablesId,page:1,limit:9,nameLike:''});
    }
    state = {searchValue: ''};
    searchChange=(e)=>{
        this.setState({
            searchValue: e.target.value
        })
        this.props.requestFieldSearch({searchCont:e.target.value,dsId:this.props.params.srcId,tableId:this.props.params.srcTableId});
    };

    render() {
        let params = this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to={"/integration"}>集成管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/integration/dataSrc/"+ params.paramsId +'/'+ params.srcName)}>数据源管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/integration/dataSrc/tableList/"+ params.srcId + '/' + params.srcName + '/' +params.paramsId)}>表管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            表结构
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="请输入表名称"
                               onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">
                <BasicInformation
                                    data={this.props.tableAttr}
                                    params={this.props.params}
                />

                <h1 style={{marginTop: '50px'}}>表结构</h1>
                <hr className="hr" style={{margin: '10 0'}}></hr>
                <FieldListTable type="table"
                                dataList={this.props.fieldList}
                                requestFieldList={this.props.requestFieldList}
                                params={this.props.params}
                                nameLike={this.state.searchValue}
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
FieldListPage.propTypes = {
    requestFieldList: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestFieldList: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onRequestFieldList(evt));
        },
        requestFieldSearch: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            let fieldPage = {
                nameLike:evt.searchCont,
                dsId: evt.dsId,
                tableId: evt.tableId,
                page: 1,
                limit:9
            }
            dispatch(onRequestFieldList(fieldPage));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    appReqData: selectReqDataSrc(),
    dataSource: selectDataSourceAttr(),
    tableAttr: selectTableAttr(),
    fieldList: selectFieldList(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(FieldListPage);