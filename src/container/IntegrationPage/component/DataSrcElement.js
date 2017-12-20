require("../../../../css/DomainPageCss.css");
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import {Tooltip, Badge, Modal,Icon} from 'antd';
const confirm = Modal.confirm;

export default class DataSrcElement extends Component {
    constructor(props) {
        super(props);
    }
    showConfirm =(e,dataSource)=> {
        let _this=this;
        confirm({
            title: '确定删除'+'"'+dataSource.name+'"'+'数据源吗?',
            onOk() {
                _this.props.deleteDataSource(e, dataSource.id);
            },
            onCancel() {},
        });
    }
    render() {
        let dataSrcList = this.props.dataList;
        let params = this.props.params;
        return (
            <div className="xp-list">
                <div className="row">
                    {
                        dataSrcList ? (
                            (dataSrcList || []).map(function (dataSource, i) {
                                return (
                                    <div className="col-md-6 col-lg-4" key={'designDomain' + i}>
                                        <div className="xp-block ret" style={{height: '290px'}}>
                                            <div className="xp-icon">
                                                <Tooltip title="编辑">
                                                    <Icon type="edit" className="modal-edit"
                                                          onClick={(e)=>{
                                                              hashHistory.push(encodeURI('/integration/editDataSource/'+dataSource.id +'/'+ dataSource.name +'/'+ params.intId +'/'+ params.intName));
                                                              this.props.updateDB(e, dataSource)}}/>
                                                </Tooltip>
                                                <Tooltip title="删除">
                                                    <Icon type="delete" className="modal-dele"
                                                          onClick={(e)=>this.showConfirm(e,dataSource)}/>
                                                </Tooltip>
                                            </div>
                                            <h5>
                                                {(dataSource.synNum > 0) ?
                                                    (<Tooltip title="表的变动个数">
                                                        <Badge className="dtsrcBadge"
                                                               count={dataSource.synNum}>
                                                            <a href="#"
                                                               onClick={(e)=> {
                                                                   hashHistory.push(encodeURI('/integration/dataSrc/synTableList'+ dataSource.id + '/' + dataSource.name + '/' +params.intId));
                                                                   this.props.onClickSynTableNum(e, dataSource)
                                                               }}>{dataSource.name}</a>
                                                        </Badge>
                                                    </Tooltip>)
                                                    :
                                                    (<Badge count={0}>
                                                        {dataSource.name}
                                                    </Badge>)}
                                            </h5>
                                            <hr className="hr-sh"></hr>
                                            <p>
                                                <span>数据库类别：{dataSource.dbType}</span>
                                            </p>
                                            <hr className="hr-sh"></hr>
                                            <p>
                                                <span>表实体：<a style={{fontSize: '18px'}} onClick={(e)=> {
                                                    hashHistory.push(encodeURI('/integration/dataSrc/tableList/'+ dataSource.id + '/' + dataSource.name + '/' +params.intId));
                                                    this.props.clickTableNum(e, dataSource);
                                                }}>
                                                    {dataSource.tableNum ? dataSource.tableNum : 0}  </a>个，
                                                    可用：{dataSource.enableTableNum ? dataSource.enableTableNum : 0}
                                                    个</span>
                                            </p>
                                            <hr className="hr-sh"></hr>
                                            <span>驱动：{dataSource.dbDriver}</span><br/>
                                            <span>URL：{dataSource.dbUrl}</span><br/>
                                            <span>用户：{dataSource.dbUser}</span><br/>
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