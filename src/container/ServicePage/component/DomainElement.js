import React, {Component, PropTypes} from 'react';
import {browserHistory, hashHistory} from 'react-router';


export default class DomainElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let domainServerList = this.props.dataList;
        return (
            <div className="xp-list">
                <div className="row">
                    {
                        domainServerList ? (
                            (domainServerList || []).map(function (domain, i) {
                                return (
                                    <div className="col-md-4">
                                        <div className="xp-block ret">
                                            <h5>服务接口</h5>
                                            <hr className="hr-sh"></hr>
                                            <div className="row xp-data">
                                                <div className="col-xs-6 text-center">
                                                    <div className="media">
                                                        <div className="media-left media-middle text-nowrap">
                                                            <div className="upDsImage" onClick={(e)=> {
                                                                hashHistory.push(encodeURI('/service/dataSrc'));
                                                                this.props.requestUpDataSrc(e, app)
                                                            }}/>
                                                            <div className="xp-img-text">服务</div>
                                                        </div>
                                                        <div className="media-right media-middle text-nowrap"><h3
                                                            className="xp-impt">
                                                            <span>{domain.wsNum ? domain.wsNum : 0}</span>个</h3></div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-4 text-center">
                                                    <div className="media">
                                                        <p>运行中：{domain.runNum}</p>
                                                        <p>未启动：{domain.disableNum}</p>
                                                        <p>停止：{domain.stopNum}</p>
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