import React, {Component, PropTypes} from 'react';
import {browserHistory, hashHistory} from 'react-router';
import {Tooltip ,Icon} from 'antd';
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
                                    <div className="col-md-4" key={'designDomain' + i}>
                                        <div className="xp-block ret">
                                            <div className="xp-icon">
                                                <Tooltip title="导出">
                                                    <Icon type="export"  className="modal-edit"
                                                          onClick={(e)=>this.props.exportDomainStructure(e, domain.id)}/>
                                                </Tooltip>
                                                <Tooltip title="编辑">
                                                    <Icon type="edit" className="modal-edit"
                                                          onClick={(e)=>this.props.updateDomain(e, domain)}/>
                                                </Tooltip>
                                                <Tooltip title="删除">
                                                    <Icon type="delete" className="modal-dele"
                                                          onClick={(e)=>this.props.deleteDomain(e, domain)}/>
                                                </Tooltip>
                                            </div>
                                            <h5>{domain.name}</h5>
                                            <hr className="hr-sh"></hr>
                                            <p>
                                                <span className="space-1">实体个数： </span>
                                                <i className="green">{domain.entityNum}</i>
                                                <span className="space-1" style={{marginLeft: '20px'}}>启用实体个数： </span>
                                                <i className="green">{domain.entityEnableNum}</i>
                                            </p>
                                            <p>
                                                <span className="space-1">属性个数： </span>
                                                <i className="green">{domain.entityAttNum}</i>
                                                <span className="space-1" style={{marginLeft: '20px'}}>启用属性个数： </span>
                                                <i className="green">{domain.entityAttEnableNum}</i>
                                            </p>
                                            <hr className="hr-sh"/>
                                            <div style={{height: '70px'}}></div>
                                            <ul className="xp-img text-center clearfix">
                                                {
                                                    domain.models ? (
                                                        (domain.models || []).map(function (model, j) {
                                                            return (
                                                                <li key={' designModel' + j}>
                                                                    <a onClick={(e)=> {
                                                                        hashHistory.push(encodeURI('/design/entitys/'+model.id+'/'+domain.name+'/'+model.name));
                                                                        this.props.clickModel(e, model, domain);
                                                                    }}>
                                                                        <span
                                                                            className="glyphicon glyphicon-picture img-01"></span>
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







