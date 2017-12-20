// require("../../../../css/DomainPageCss.css");
import React, {Component, PropTypes} from 'react';
import {hashHistory,Link} from 'react-router';
import {Tooltip, Switch, Icon, Row, Col} from 'antd';

export default class QualityElement extends Component {
    constructor(props) {
        super(props);
    }
    qualityReport = (e,quality) =>{
        hashHistory.push(encodeURI('quality/qualityReport/' + quality.id+'/'+quality.name));
    }
    entityQuality = (e,quality) =>{      
        hashHistory.push(encodeURI('quality/qualityEntity/'+quality.id+'/'+quality.name));
    }

    render() {
        let qualityDataList = this.props.dataList;
        return (
            <div className="xp-list">
                <div className="row">
                    {
                        qualityDataList ? (
                            (qualityDataList || []).map(function (quality, i) {
                                return (
                                    <div className="col-md-6 col-lg-4" key={'designDomain' + i}>
                                        <div className="xp-block ret">
                                            <div className="xp-icon">
                                                <Tooltip title={quality.status == "1" ? "停用监控" : "启用监控"}>
                                                    <Switch defaultChecked={quality.status == "1" ? true : false}
                                                            onChange={(e)=>this.props.ChangeStatus(e, quality)}/>
                                                </Tooltip>
                                            </div>
                                            <h5>{quality.name}</h5>
                                            <hr className="hr-sh"/>
                                            <div className="row xp-data" style={{marginBottom: "0px"}}>
                                                <div className="col-xs-6 text-center">
                                                    <div className="media medStyle">
                                                        <div className="media-left media-middle text-nowrap">
                                                            <Tooltip placement="top" title="查看规则列表">
                                                                <div className="imgSrc" onClick={(e)=>{
                                                                    hashHistory.push(encodeURI("ruleDomainPage/"+quality.id+'/'+quality.name))}}>
                                                                </div>
                                                            </Tooltip>
                                                            <div className="xp-img-text">规则</div>
                                                        </div>
                                                        <div className="media-right media-middle text-nowrap">
                                                            <h3 className="xp-impt">
                                                                <span>
                                                                    {quality.ruleNum ? quality.ruleNum : 0}
                                                                </span>&nbsp;个
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 text-center" style={{borderLeft: "1px solid rgb(204, 204, 204)"}}>
                                                    <div className="media medStyle">
                                                        <div className="col-xs-6 text-nowrap">
                                                            <div className="xp-img-text" style={{marginTop: "0px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数据量</div>
                                                            <div className="xp-img-text" style={{marginTop: "8px"}}>&nbsp;&nbsp;&nbsp;异常数据量</div>
                                                            <div className="xp-img-text" style={{marginTop: "8px"}}>最近检测时间</div>
                                                        </div>
                                                        <div className="col-xs-6 text-nowrap">
                                                            <p className="xp-impt" style={{marginTop: "-3px"}}>
                                                                <span style={{cursor: "pointer",fontSize:'16px'}}
                                                                      onClick={(e)=> this.entityQuality(e, quality)}>
                                                                    {quality.dataNum ? quality.dataNum : 0}
                                                                </span>&nbsp;个
                                                            </p>
                                                            <p className="xp-impt" style={{marginTop: "1px"}}>
                                                                <span style={{cursor: "pointer",color:'#FF0000',fontSize:'16px'}}
                                                                      onClick={(e)=> this.entityQuality(e, quality)}>{quality.dataErrorNum ? quality.dataErrorNum : 0}</span>&nbsp;个
                                                            </p>
                                                            <p className="xp-impt" style={{marginTop: "4px"}}>
                                                                {(quality.lastCheckEndTime) ? (
                                                                    <Tooltip title={quality.lastCheckEndTime}>
                                                                       <span style={{fontSize:'14px',marginLeft: "5px"}}>
                                                                        {quality.lastCheckEndTime.slice(0,12)}
                                                                    </span>
                                                                    </Tooltip>) : (
                                                                    <span style={{fontSize:'14px', color: '#eeb57e',marginLeft: "5px"}}>
                                                                        未检测
                                                                    </span>)
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="hr-ss"/>
                                            <div>
                                                <Row>
                                                    <Col span={16}>
                                                        <h5>执行计划：&nbsp;&nbsp;&nbsp;
                                                            <span style={(quality.cronName !== '未设置') ? {color:'rgb(55, 195, 176)'}:{color:'#FF0000'}}>{(quality.cronName !== null) ? quality.cronName : 未设置}</span>
                                                        </h5>
                                                    </Col>
                                                    <Col span={4}>
                                                        <div className="media">
                                                            <div className="media-left media-middle text-nowrap">
                                                                <Tooltip placement="top" title="修改执行计划">
                                                                    <a className="imgSch" onClick={(e) => this.props.modifyExecutePlan(e, quality)}></a>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={4}>
                                                        <div className="media">
                                                            <div className="media-left media-middle text-nowrap ">
                                                                <Tooltip placement="top" title="查看质量报告">
                                                                    <a className="imgRep" onClick={(e) => this.qualityReport(e,quality)}></a>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
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