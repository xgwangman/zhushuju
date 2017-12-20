import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import {Tooltip, Popconfirm, Modal,Icon} from 'antd';
const confirm = Modal.confirm;

export default class AppElement extends Component {
    constructor(props) {
        super(props);
    }
    showConfirm =(e,app)=> {
        let _this=this;
        confirm({
            title: '确定删除'+'"'+app.name+'"'+'应用系统吗?',
            onOk() {
                _this.props.deleteApp(e, app.id);
            },
            onCancel() {},
        });
    }

    render() {
        let appDataList = this.props.dataList;
        return (
            <div className="xp-list">
                <div className="row">
                    {
                        appDataList ? (
                            (appDataList || []).map(function (app, i) {
                                return (
                                    <div className="col-md-6 col-lg-4" key={'designDomain' + i}>
                                        <div className="xp-block ret">
                                            <div className="xp-icon">

                                                <Tooltip title="编辑">
                                                    <Icon type="edit" className="modal-edit"
                                                          onClick={(e)=>this.props.updateApp(e, app)}/>
                                                </Tooltip>
                                                <Tooltip title="删除">
                                                    <Icon type="delete" className="modal-dele"
                                                          onClick={(e)=>this.showConfirm(e, app)}/>
                                                </Tooltip>
                                            </div>
                                            <h5>{app.name}</h5>
                                            <hr className="hr-sh"/>

                                            <div className="row xp-data">
                                                <div className="col-xs-6 text-center" style={{borderRight: "1px solid rgb(204, 204, 204)"}}>
                                                    <div className="media medStyle">
                                                        <div className="media-left media-middle text-nowrap">
                                                            <Tooltip title="数据采集到主数据平台">
                                                                <div className="upDsImage" onClick={(e)=> {
                                                                    hashHistory.push(encodeURI('/integration/dataSrc/'+ app.id +'/'+ app.name));
                                                                    this.props.requestUpDataSrc(e, app)
                                                                }}/>
                                                            </Tooltip>
                                                            <div className="xp-img-text">采集数据源</div>
                                                        </div>
                                                        <div className="media-right media-middle text-nowrap">
                                                            <h3 className="xp-impt">
                                                                <span>{app.upDsNum ? app.upDsNum : 0}</span>&nbsp;个
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 text-center">
                                                    <div className="media medStyle">
                                                        <div className="media-left media-middle text-nowrap">
                                                            <div className="xp-img-text">表实体</div>
                                                            <div className="xp-img-text">&nbsp;&nbsp;&nbsp;&nbsp;可用</div>
                                                        </div>
                                                        <div className="media-right media-middle text-nowrap">
                                                            <p className="xp-impt" style={{marginTop: "10px"}}>
                                                                <span style={{fontSize:'18px'}}>{app.tableNum ? app.tableNum : 0}</span>&nbsp;个
                                                            </p>
                                                            <p className="xp-impt" style={{marginTop: "10px"}}>
                                                                <span style={{fontSize:'18px'}}>{app.enableTableNum ? app.enableTableNum : 0}</span>&nbsp;个
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }.bind(this))
                        ) : null
                    }
                </div>
            </div>
        )
    }

}