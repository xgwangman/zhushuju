import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Breadcrumb,Modal,Row,Col,Pagination,Button} from 'antd';
import {hashHistory} from 'react-router';
import {Link, router} from 'react-router';
import {SearchBox} from '../../../common/components/SearchBox';
import ShareTaskElement from '../component/ShareTaskElement';
import {requestTaskServiceList,changeServiceStatus,removeService,setConditionList} from '../actions';
import {getTaskList} from '../selectors';


export class shareDataPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            current:1,
            searchValue:''
        };
        this.props.requestTaskList({nameLike:'',page:1,limit:9});
        //清除lookShareDataPage中的筛选条件
        this.props.dispatch(setConditionList());
    }
    searchChange=(e)=>{
        if(e.target.value==""){
            this.props.requestTaskList({nameLike:'',page:1,limit:9});
        }else{
            this.props.requestTaskList({nameLike:e.target.value,page:1,limit:9})
        };
        this.setState({searchValue:e.target.value});
    };

    onChange=(page,pageSize)=>{
        this.setState({current:page});
        this.props.requestTaskList({page:page,limit:pageSize,nameLike:''});
    };
    render() {
        let showTotal=()=>{
            if (this.props.taskList && this.props.taskList.pageNum){
                return `共 ${this.props.taskList.pageNum} 条记录`
            }else return `共 ${0} 条记录`;
        };
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>共享任务管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="任务名称"
                               onChange={this.searchChange}
                     />
                </div>
                <div className="centerContent">
                    <button type="button" className="btn-css"
                            onClick={(e) => {hashHistory.push(encodeURI('/service/AddSreTask/add/add/add'));}}
                            size='large'
                    >
                        <span className="glyphicon glyphicon-plus" aria-hidden="true" ></span>添加
                    </button>
                    <ShareTaskElement dataList={this.props.taskList ? this.props.taskList.data:[]}
                                      chengeServiceStatus={this.props.changeServiceStatus}
                                      removeService={this.props.removeService}
                                      editService={this.props.editService}>
                    </ShareTaskElement>
                    <Row style={{textAlign:'right'}}>
                        <Pagination showQuickJumper={true} current={this.state.current} pageSize={9} total={this.props.taskList ? this.props.taskList.pageNum:0}
                                    onChange={this.onChange} showTotal={ showTotal}/>
                    </Row>
                </div>
            </div>
        )
    }

}
/**
 *
 */
shareDataPage.propTypes = {
    changeServiceStatus: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        changeServiceStatus: (statue, taskId) => {
            dispatch(changeServiceStatus(statue, taskId));
        },
        removeService: (taskId,taskName) => {
            Modal.confirm({
                title: '你确定要删除'+taskName+'服务吗？',
                onOk() {
                    dispatch(removeService(taskId));
                },
                onCancel() {
                }
            });
        },
        editService: (evt, task) => {
        },
        requestTaskList: (object) => {
            dispatch(requestTaskServiceList(object));
        },
    };
}

const mapStateToProps = createStructuredSelector({
    taskList:getTaskList()
});

export default connect(mapStateToProps, mapDispatchToProps)(shareDataPage);