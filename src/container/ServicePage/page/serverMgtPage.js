/**
 * Created by Administrator on 2017-6-20.
 */
import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {hashHistory,Link, router} from 'react-router';
import {Breadcrumb,Button,Modal} from 'antd';
import ServiceItem from '../component/ServiceItem'
import {SearchBox} from '../../../common/components/SearchBox';
import {getWsList} from '../selectors'
import {requestServiceList,deleteWs,changeWsStatus} from '../actions'

export class ServerMgtPage extends Component {
    constructor(props) {
        super(props);
        this.state={searchValue:''}
    }
    searchChange=(e)=>{
        if(e.target.value==""){
        this.props.loadServiceList(this.props.params.taskId,e.target.value)
        }else{
            this.props.loadServiceList(this.props.params.taskId,e.target.value)
        };
        this.setState({searchValue:e.target.value})
    };

    componentWillMount(){
        this.props.loadServiceList(this.props.params.taskId,'');
    }
    onDeleteWs=(wsId,wsName)=>{
        this.props.deleteWs(wsId,wsName,this.props.params.taskId);
    };
    onChangeWsStatus=(type,wsId)=>{
        this.props.changeWsStatus(type,wsId,this.props.params.taskId);
    };
    render() {
        let wsList=this.props.wsList;
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="service">
                                {this.props.params.taskName}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>服务管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="服务名称"
                               onChange={this.searchChange}
                     />
                </div>
                <div className="centerContent">
                    <button type="button" className="btn-css"
                             onClick={()=>{
                                    hashHistory.push(encodeURI("service/add/baseInfo/"+this.props.params.taskId+'/'+this.props.params.taskName))
                    }}>
                        <i className="glyphicon-plus"/>添加
                    </button>
                    <div className="row">
                        {
                            (wsList instanceof Array && wsList.length>0) ?
                                wsList.map((item,index)=> {
                                    return <ServiceItem key={index} ws={item} deleteWs={(wsId,wsName)=>{this.onDeleteWs(wsId,wsName)}}
                                                        changeWsStatus={(type,wsId)=>this.onChangeWsStatus(type,wsId)}
                                                        taskName={this.props.params.taskName}
                                                        taskId={this.props.params.taskId}
                                    />
                                }):<div className="container-fluid text-center">
                                    <div style={{padding:'100px 0px'}}>
                                        该任务下还没有任何服务!!!
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        loadServiceList:(taskId,nameLike)=>{dispatch(requestServiceList(taskId,nameLike))},
        deleteWs:(wsId,wsName,taskId)=> {
            Modal.confirm({
                title: '你确定要删除 ' + wsName + ' 服务吗？',
                /*content: wsName,*/
                onOk() {
                    dispatch(deleteWs(wsId,taskId))
                },
                onCancel() {
                }
            })
        },
        changeWsStatus:(type,wsId,taskId)=>{
            dispatch(changeWsStatus(type,wsId,taskId))
        }
    }
}
const mapStateToProps = createStructuredSelector({
    wsList:getWsList()
});
export default connect(mapStateToProps, mapDispatchToProps)(ServerMgtPage);