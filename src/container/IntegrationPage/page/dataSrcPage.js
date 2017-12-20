require("../../../../css/DomainPageCss.css");
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import DataSrcElement from '../component/DataSrcElement';
import {
    selectAppDataList,
    selectShowAppEdit,
    selectAppAttr,
    selectDataSrcList,
    selectReqDataSrc,
    selectDataSourceAttr
} from '../selectors';
import {onRequestDataSrc, onRequestDataSearch, onDeleteDataSource, setDataSourceAttr, setReqAppData} from '../actions';

export class DataSrcPage extends Component {
    constructor(props) {
        super(props);
        const route = this.props.params;
        this.props.requestUpDataSrc({id: route.intId,name: route.intName});
        this.props.requestDataSrc();
    }
    state ={searchValue : ''};
    searchChange =(e)=> {
        this.setState ({
            searchValue : e.target.value
        });
         this.props.requestDataSearch(e.target.value);
    };
    render() {
        let currentdataSrcAttr = {
            id: '',
            name: '',
            remark: ''
        };
        const params = this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to={"/integration"}>集成管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            数据源管理
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder={"请输入数据源名称"}
                                onChange={this.searchChange}

                    />
                </div>
                <div className="centerContent ">
                <button type="button" className="btn-css" style={{margin:"10px 0 10px 0"}}
                        onClick={(e) => {
                            hashHistory.push(encodeURI('/integration/addDataSource/'+ params.intId +'/'+ params.intName));
                            this.props.setDataSourceAttr(e, currentdataSrcAttr)
                        }}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加数据源
                </button>
                <DataSrcElement dataList={this.props.dataSrcList}
                                updateDB= {this.props.onUpdateDB}
                                deleteDataSource={(e, id)=>this.props.onDeleteDataSource(e, id)}
                                onClickSynTableNum={this.props.onClickSynTableNum}
                                clickTableNum={this.props.onClickTableNum}
                                params={this.props.params}
                >
                </DataSrcElement>
                </div>
            </div>
        )
    }

}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
DataSrcPage.propTypes = {
    requestAppList: React.PropTypes.func,
    requestDataSrc: React.PropTypes.func,
    requestDataSearch:  React.PropTypes.func,
    onUpdateDB: React.PropTypes.func,
    onDeleteDataSource: React.PropTypes.func,
    setDataSourceAttr: React.PropTypes.func,
    requestUpDataSrc: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestDataSrc: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onRequestDataSrc(evt));
        },
        requestDataSearch: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onRequestDataSearch(evt));
        },
        setDataSourceAttr: (evt, dataSrc) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setDataSourceAttr(dataSrc));
        },
        onUpdateDB: (evt, dataSrc) => {
            console.log(dataSrc)
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setDataSourceAttr(dataSrc));
        },
        onDeleteDataSource: (evt, dataSrcId) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onDeleteDataSource(dataSrcId));
        },
        onClickSynTableNum: (evt, dataSrc) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setDataSourceAttr(dataSrc));
        },
        onClickTableNum: (evt, dataSrc) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setDataSourceAttr(dataSrc));
        },
        requestUpDataSrc: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setReqAppData({appId: evt.id, appName: evt.name, direct: "UP"}));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    appDataList: selectAppDataList(),
    showAppEdit: selectShowAppEdit(),
    appAttr: selectAppAttr(),
    appReqData: selectReqDataSrc(),
    dataSrcList: selectDataSrcList(),
    dataSourceAttr: selectDataSourceAttr(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(DataSrcPage);