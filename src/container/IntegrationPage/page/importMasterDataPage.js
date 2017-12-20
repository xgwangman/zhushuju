/**
 * Created by Administrator on 2017/8/4.
 */
import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button} from 'antd';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Link, hashHistory} from 'react-router';
import {SearchBox} from '../../../common/components/SearchBox';
import ImportEntityTable from '../component/ImportEntityTable';
import {ImportApp} from "../component/ImportApp";
import {
    setReqImportData,
    setReqImportSearch,
    setImportApp,
    showModelApp,
    setUploadFiles,
} from '../actions';
import {
    selectImportEntityData,
    selectShowModalApp,
    selectImportAppData,
    selectUploadFiles
} from '../selectors';

export class ImportMasterDataPage extends Component {
    constructor(props){
        super(props);
        this.props.requestImportEntityData({page: 1, limit: 13, nameLike:''})
    }
    state = {searchValue: ''};
    searchChange=(e)=>{
        this.setState({
            searchValue: e.target.value
        })
        this.props.requestImportEntitySearch(e.target.value);
    };

    render () {
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>主数据导入</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="请输入实体名称"
                               onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">

                <div>
                    <button type="button" className="btn-css"
                            onClick={(e)=>{
                                        hashHistory.push(encodeURI("importMasterData/checkHistoryImportData"))
                            }}>历史导入</button>
                </div>
                <div>
                    <ImportEntityTable
                                        getImportEntityData={this.props.getImportEntityData}
                                        importEntityData={this.props.requestImportEntityData}
                                        importAppData = {this.props.importAppData}
                                        downloadEntityData = {this.props.onDownloadEntityData}
                                        nameLike={this.state.searchValue}
                    />
                    <ImportApp
                                show={this.props.showModalApp}
                                hide={this.props.hideModalApp}
                                importAppId={this.props.importAppId}
                                uploadFilesTable = {this.props.onUploadFilesTable}
                                diffData= {this.props.diffData}
                    />
                </div>
                </div>
            </div>
        )
    }
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
ImportMasterDataPage.propTypes = {
    requestImportEntityData: React.PropTypes.func,
    requestImportEntitySearch: React.PropTypes.func,
    onDownloadEntityData: React.PropTypes.func,
    onUploadFilesTable: React.PropTypes.func,

};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestImportEntityData: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setReqImportData(evt));
        },
        requestImportEntitySearch: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            let importSearch = {
                nameLike: evt,
                page: 1,
                limit: 13
            }
            dispatch(setReqImportSearch(importSearch));
        },
        importAppData: (evt, record)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showModelApp(true));
            dispatch(setImportApp(record));
        },
        showModalCreate: (evt, app)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showModelApp(true));
            dispatch(setImportApp(app));
        },
        hideModalApp: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(showModelApp(false));
        },
        onDownloadEntityData: (evt,record)=> {
            window.location.href = 'ign/md/import/downEntityTemplate.do' + '?id=' + record.id;
        },
        onUploadFilesTable: (evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setUploadFiles(evt));
        },
    }
}

const mapStateToProps = createStructuredSelector({
    getImportEntityData: selectImportEntityData(),
    showModalApp: selectShowModalApp(),
    importAppId: selectImportAppData(),
    UploadFilesData: selectUploadFiles()
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportMasterDataPage);