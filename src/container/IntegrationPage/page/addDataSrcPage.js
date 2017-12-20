import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import AddDataSourceForm from '../component/AddDataSrc';
import {createStructuredSelector} from 'reselect';
import {selectReqDataSrc, selectDataSourceAttr} from '../selectors';
import {setDataSourceAttr, onSaveDataSource, onTestConnection} from '../actions';

export class addDataSrcPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const params = this.props.params;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to={"/integration"}>集成管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={encodeURI("/integration/dataSrc/"+ params.intId +'/'+ params.intName)}>数据源管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            添加数据源
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent ">
                <AddDataSourceForm dataAttr={this.props.dataSourceAttr}
                                       changeDataSrcData={this.onChangeDataSrcData.bind(this)}
                                       testConnect={this.props.testConnection}
                                       saveDataSource={this.props.onSaveDataSource}
                                       params={this.props.params}
                    >
                    </AddDataSourceForm>
                </div>
            </div>

        )
    }

    /**
     * 改变属性的属性后，将属性的属性值更新为最新，并更新state中的属性数据
     * @param evt
     * @param sign
     */
    onChangeDataSrcData(evt, sign) {
        var me = this;
        var dataSourceAttr = this.props.dataSourceAttr;
        var dataSrcObject = {};
        // 深拷贝对象dataSourceAttr
        $.extend(true, dataSrcObject, dataSourceAttr);
        dataSrcObject["appId"] = this.props.appReqData.appId;
        dataSrcObject["direct"] = this.props.appReqData.direct;
        switch (sign) {
            case "type" :
                dataSrcObject[sign] = evt;
                break;
            case "dbType" :
                dataSrcObject[sign] = evt;
                switch (evt) {
                    case "oracle" :
                        dataSrcObject["dbDriver"] = "oracle.jdbc.driver.OracleDriver";
                        dataSrcObject["dbUrl"] = "jdbc:oracle:thin:@127.0.0.1:1521:orcl";
                        break;
                    case "sqlserver2008" :
                        dataSrcObject["dbDriver"] = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
                        dataSrcObject["dbUrl"] = "jdbc:sqlserver://127.0.0.1:1433;DatabaseName=dbname";
                        break;
                    case "mysql5" :
                        dataSrcObject["dbDriver"] = "com.mysql.jdbc.Driver";
                        dataSrcObject["dbUrl"] = "jdbc:mysql://127.0.0.1:3306/dbaname";
                        break;
                }
                break;
            case "isSyn" :
                dataSrcObject[sign] = evt;
                break;
            default:
                dataSrcObject[sign] = evt.target.value;
        }
        me.props.dispatch(setDataSourceAttr(dataSrcObject));
    };
}
/**
 * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求。
 */
addDataSrcPage.propTypes = {
    requestAppList: React.PropTypes.func,
    showAppCreate: React.PropTypes.func,
    hideAppEdit: React.PropTypes.func,
    onSaveApp: React.PropTypes.func,
    onClickDeleteApp: React.PropTypes.func,
};
/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        onSaveDataSource: (evt,params) => {
            console.log(evt)
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            let datas = {
                paId: params,
                cont:evt
            }
            dispatch(onSaveDataSource(datas));
        },
        testConnection: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(onTestConnection(true));
        }
    };
}


const mapStateToProps = createStructuredSelector({
    appReqData: selectReqDataSrc(),
    dataSourceAttr: selectDataSourceAttr(),
});

export default connect(mapStateToProps, mapDispatchToProps)(addDataSrcPage);