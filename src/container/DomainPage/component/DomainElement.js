require("../../../../css/DomainPageCss.css");
import React, {Component, PropTypes} from 'react';
import {browserHistory, hashHistory} from 'react-router';
import {Tooltip,Icon} from 'antd';

export default class DomainElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let domainDataList = this.props.dataList;
        return (
            <div className="xp-list">
                <div className="row">
                    {
                        domainDataList ? (
                            (domainDataList || []).map(function (domain, i) {
                                return (
                                    <div className="col-md-4" key={'domain' + i}>
                                        <div className="xp-block ret">
                                            <div className="xp-icon">
                                                <Tooltip title="导出">
                                                    <Icon type="export"  className="modal-edit"
                                                          onClick={(e)=>this.props.exportDomainStructure(e, domain.id)}/>
                                                </Tooltip>
                                            </div>
                                            <h5>{domain.name}</h5>
                                            <hr className="hr-sh"></hr>
                                            <p>
                                            <span className="space-1">主数据： </span>
                                            <i className="green">{domain.dataNum}</i>
                                            <span className="space-1" style={{marginLeft: '20px'}}>最新采集： </span>
                                            <i className="green">{domain.dataGatherNum}</i>
                                            <i className="red">{domain.dataGatherErrorNum}</i>
                                            </p>
                                            <hr className="hr-sh"/>
                                            <div style={{height: '70px'}}></div>
                                            <ul className="xp-img text-center clearfix">
                                                {
                                                    domain.models ? (
                                                        (domain.models || []).map(function (model, j) {
                                                            return (
                                                                <li key={'model' + j}>
                                                                    <a href="javascript:void(0)" onClick={(e)=> {
                                                                        hashHistory.push(encodeURI('/main/entity/'+domain.name+'/'+model.name+'/'+model.id));
                                                                        this.props.clickModel(e, model, domain);
                                                                    }}>
                                                                        <span
                                                                            className="glyphicon glyphicon-picture img-01">
                                                                        </span>
                                                                        <p title={model.name} >{model.name}</p>
                                                                    </a>
                                                                </li>
                                                            )
                                                        }.bind(this))
                                                    ) : null}
                                            </ul>  
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