/**
 * Created by Administrator on 2017/8/11.
 */
import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button} from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Link, hashHistory} from 'react-router';
import {SearchBox} from '../../../common/components/SearchBox';
import CheckHistoryImportTable from '../component/CheckHistoryImportTable';
import {setCheckHistory,setClearImport,setCheckHistorySearch} from '../actions';
import {selectCheckHistoryData} from '../selectors';

export class CheckHistoryImportPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestCheckHistoryImport({page:1, limit:13, nameLike: ''});
    }
    state = {searchValue: ''};
    searchChange=(e)=>{
        this.setState({
            searchValue: e.target.value
        })
        this.props.requestCheckHistorySearch(e.target.value);
    };
    render () {
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/importMasterData"}>主数据导入</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>历史导入数据</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="请输入实体名称"
                                onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">
                <CheckHistoryImportTable
                                            historyImportData={this.props.historyImportData}
                                            clearImportData={this.props.onClearImportData}
                                            requestCheckHistoryPage={this.props.requestCheckHistoryImport}
                />
                </div>
            </div>
        )
    }

}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
CheckHistoryImportPage.propTypes = {
    requestCheckHistoryImport: React.PropTypes.func,
    onClearImportData: React.PropTypes.func,
    requestCheckHistorySearch: React.PropTypes.func,

};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestCheckHistoryImport: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setCheckHistory(evt));
        },
        onClearImportData: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setClearImport(evt));
        },
        requestCheckHistorySearch: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            let checkSearch = {
                page: 1,
                limit: 12,
                nameLike: evt
            }
            dispatch(setCheckHistorySearch(checkSearch));
        },

    }
}

const mapStateToProps = createStructuredSelector({
    historyImportData: selectCheckHistoryData()
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckHistoryImportPage);