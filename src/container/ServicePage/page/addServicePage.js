/**
 * Created by Administrator on 2017-6-21.
 */
import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Form,Input,Table,Breadcrumb,Row,Col,Button,Icon,Select} from 'antd'
import EditableCell from '../component/EnitableCell'
import AddandMinusRowTable from '../component/AddandMinusRowTable'
import {requestTaskOutPutScheam,requestUserList,addService,requestWsDetail,updateService} from '../actions'
import {getUserList,getTaskOutputList,getWsDetail} from '../selectors'
import alert from '../../../common/utils/alert';
class AddServicePage extends Component{
    constructor(props){
        super(props);
        if(this.props.params.wsId){
            this.props.requestWsDetail(this.props.params.wsId)
        }
        this.props.requestTaskOutPutScheam(this.props.params.taskId);
        this.props.loadUserList();
        this.state={
            infoDataSource:[],
            userDataSource:[],
            taskResDs:[],
            taskReqDs:[],
            resDs:[],
            reqDs:[],
            initStatus:true,
            responseDataType:'json'
        }
    }
    componentDidUpdate(){
        if(this.state.initStatus && this.props.userList && this.props.userList instanceof Array && this.props.taskOutputList instanceof Array){
            let tempTaskResDs=[],tempTasReqDs=[],resDs=[],reqDs=[],tempUserDs=[];
            this.props.userList.map(function (item,index) {
                item.wsId='';
                item._id='user_'+item.id;
            });
            this.props.taskOutputList.map(function (item,index) {
                resDs.push({_id:'from_'+item.id,wsId:item.id,attId:item.id,attName:item.attName,outName:item.outName,source:item.source});
                reqDs.push({_id:'where_'+item.id,wsId:item.id,attId:item.id,attName:item.attName,inName:item.outName,source:item.source});
            });
            if(this.props.params.wsId && this.props.wsDetail){
                this.props.wsDetail.resList.map(function (item,index) {
                    item._id='from_'+item.attId;
                    item.source=item.attSource;
                    tempTaskResDs.push(item)
                });
                this.props.wsDetail.reqList.map(function (item,index) {
                    item._id='where_'+item.attId;
                    item.source=item.attSource;
                    tempTasReqDs.push(item)
                });
                this.props.wsDetail.authList.map(function (item,index) {
                    item._id='user_'+item.userId;
                    item.name=item.userName;//用户名
                    //item.name=item.userNo;//登录号
                    tempUserDs.push(item)
                });
            }else {
                this.props.taskOutputList.map(function (item,index) {
                    tempTaskResDs.push({_id:'from_'+item.id,wsId:item.id,attId:item.id,attName:item.attName,outName:item.outName,source:item.source});
                    tempTasReqDs.push({_id:'where_'+item.id,wsId:item.id,attId:item.id,attName:item.attName,inName:item.outName,source:item.source});
                });
            }
            if(this.props.params.wsId){
                this.setState({userDataSource:tempUserDs.length<=0?[]:tempUserDs,taskResDs:tempTaskResDs,taskReqDs:tempTasReqDs,resDs:resDs,reqDs:reqDs,initStatus:false})
            }else{
                this.setState({userDataSource:tempUserDs.length<=0?[]:tempUserDs,taskResDs:tempTaskResDs,taskReqDs:[],resDs:resDs,reqDs:reqDs,initStatus:false})
            }
        }
    }
    //单元格 编辑事件
    onCellChange = (index, key) => {
        return (value) => {
            const infoDataSource = [...this.state.infoDataSource];
            infoDataSource[index][key] = value;
            this.setState({ infoDataSource:infoDataSource });
        };
    };
    onSelectResponseType=(value)=>{
        this.setState({responseDataType:value})
    };
    //select change 处理
    onSelectChange = (value,index, key,type) => {
        let typeDateSource=[],dataSource=[];
        if(type=='user'){
            typeDateSource = [...this.state.userDataSource];
            for(let i=0;i<typeDateSource.length;i++){
                if(typeDateSource[i]._id==value) return;
            }
            dataSource = [...this.props.userList];
            dataSource.map(function (item,index) {
                if(item._id==value){
                    typeDateSource[key]=item
                }
            });
            this.setState({ userDataSource:typeDateSource });
        }else if(type=='from'){
            typeDateSource = [...this.state.taskResDs];
            for(let i=0;i<typeDateSource.length;i++){
                if(typeDateSource[i]._id==value) return;
            }
            dataSource = [...this.state.resDs];
            dataSource.map(function (item,index) {
                if(item._id==value){
                    typeDateSource[key]=item
                }
            });
            this.setState({ taskResDs:typeDateSource });
        }else if(type=='where'){
            typeDateSource = [...this.state.taskReqDs];
            for(let i=0;i<typeDateSource.length;i++){
                if(typeDateSource[i]._id==value) return;
            }
            dataSource = [...this.state.reqDs];
            dataSource.map(function (item,index) {
                if(item._id==value){
                    typeDateSource[key]=item
                }
            });
            this.setState({ taskReqDs:typeDateSource });
        }
    };
    // input输入框change 处理
    handleInputChange = (e,index,key,type) => {
        const value = e.target.value;
        if(type=='from'){
            let taskResDs = this.state.taskResDs;
            taskResDs[index][key]=value;
            this.setState({taskResDs:taskResDs});
        }else if(type=='where'){
            let taskReqDs =this.state.taskReqDs;
            taskReqDs[index][key]=value;
            this.setState({ taskReqDs:taskReqDs});
        }
    };
    //删除行数据
    onDelete = (e,index,type) => {
        e.preventDefault();
        let dataSource=[];
        if(type=='user'){
            dataSource = [...this.state.userDataSource];
            dataSource.splice(index, 1);
            this.setState({ userDataSource:dataSource });
        }else if(type=='from'){
            dataSource = [...this.state.taskResDs];
            dataSource.splice(index, 1);
            this.setState({ taskResDs:dataSource });
        }else if(type=='where'){
            dataSource = [...this.state.taskReqDs];
            dataSource.splice(index, 1);
            this.setState({ taskReqDs:dataSource });
        }
    };
    // 添加行数据
    addBaseInfo=(e,type)=>{
        e.preventDefault();
        let newData={};
        if(type=='user'){
            newData = {_id:'' ,name:'',userNo: '',op:'-'};
            this.setState({userDataSource: [...this.state.userDataSource, newData]})
        }else if(type=='from'){
            newData = {_id:'', outName: '',description:'',op:'-'};
            this.setState({taskResDs: [...this.state.taskResDs, newData]})
        }else if(type=='where'){
            newData = {_id:'', inName: '',description:'',op:'-'};
            this.setState({taskReqDs: [...this.state.taskReqDs, newData]})
        }
    };
    // select  选项
    infoSelect=(text, record, index,type)=>{
        let dataSource=[];
        if(type=='user'){
            dataSource = [...this.props.userList];
            return (<Select defaultValue={record._id} onSelect={(value)=>{this.onSelectChange(value, record, index,type)}}>
                {
                    dataSource.map(function (item,index) {
                        return (<Select.Option key={item._id} value={item._id}>{item.userNo}</Select.Option>)
                    })
                }
            </Select>)
        }else{
            if(type=='from'){
                dataSource= [...this.state.resDs];
            }else if(type=='where'){
                dataSource= [...this.state.reqDs];
            }else{
                return
            }
            return (<Select value={record._id} onSelect={(value)=>{this.onSelectChange(value, record, index,type)}}>
                {
                    dataSource.map(function (item,index) {
                        return (<Select.Option key={item._id} value={item._id}>{item.attName}</Select.Option>)
                    })
                }
            </Select>)
        }
    };
    render(){
        let FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {xs: { span: 24 }, sm: { span: 2 }},
            wrapperCol: {xs: { span: 24 }, sm: { span: 14 }},
        };
        const resColumns=[
            {title: '属性名称', dataIndex: 'attName',width: '20%',render:(text, record, index)=>this.infoSelect(text, record, index,'from')
            },
            {title: '输出名称',key:'outName', dataIndex: 'outName',width: '20%',render: (text, record, index) =>(
                    <Input value={this.state.taskResDs[index]?this.state.taskResDs[index]['outName']:text} type='input' maxLength="50" onChange={(e)=>this.handleInputChange(e,index,'outName','from')}/>)
            },
            {title: '描述', dataIndex: 'description',width: '20%',},
            {title: '删除',dataIndex: 'op',width: '20%',render:(text, record, index)=>{
                return (<a href="#" onClick={(e) => this.onDelete(e,index,'from')}><Icon type="minus-square-o" /></a>)
            }},
        ];
        const reqColumns=[
            {title: '属性名称', dataIndex: 'attName',width: '20%',render:(text, record, index)=>this.infoSelect(text, record, index,'where')
            },
            {title: '输出名称',key:'outName', dataIndex: 'inName',width: '20%',render: (text, record, index) =>(
                    <Input value={this.state.taskReqDs[index]?this.state.taskReqDs[index]['inName']:text} type='input' maxLength="50" onChange={(e)=>this.handleInputChange(e,index,'inName','where')}/>)
            },
            {title: '描述', dataIndex: 'description',width: '20%',},
            {title: '删除',dataIndex: 'op',width: '20%',render:(text, record, index)=>{
                return (<a href="#" onClick={(e) => this.onDelete(e,index,'where')}><Icon type="minus-square-o" /></a>)
            }},
        ];
        const userColumns=[
            {title: '用户名', dataIndex: 'name',width: '30%',render:(text, record, index)=>this.infoSelect(text, record, index,'user')
            },
            {title: '用户登录号', dataIndex: 'userNo',width: '30%'},
            {title: '删除',dataIndex: 'op',width: '40%',render:(text, record, index)=>{
                return (<a href="#" onClick={(e) => this.onDelete(e,index,'user')}><Icon type="minus-square-o" /></a>)
            }},
        ];
        return (
            <div>
            <div className="xp-header ret">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        <Link to="service">
                            {this.props.params.taskName}
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={encodeURI('service/task/serverMgt/'+this.props.params.taskId+'/'+this.props.params.taskName)}>
                            服务管理
                        </Link>
                        </Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.params.wsId?'修改服务':'添加服务'}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="centerContent">
                <Form onSubmit={(e)=> {
                    e.preventDefault();
                    this.props.form.validateFields((err, vals) => {
                        let userDs=[],reqDs=[],resDs=[];
                        if (!err) {
                            this.state.userDataSource.map(function (item,index) {
                                userDs.push({userId:item.id,wsId:item.wsId?item.wsId:''})
                            });
                            this.state.taskResDs.map(function (item,index) {
                                resDs.push({attId:item.attId,outName:item.outName,wsId:item.wsId?item.wsId:''})
                            });
                            this.state.taskReqDs.map(function (item,index) {
                                reqDs.push({attId:item.attId,inName:item.inName,wsId:item.wsId?item.wsId:''})
                            });
                            this.props.params.wsId?
                            this.props.updateService({
                                id:this.props.params.wsId,
                                taskId:this.props.params.taskId,
                                nameSpace:vals.nameSpace,
                                name:vals.name,
                                methodName:vals.methodName,
                                responseDataType:this.state.responseDataType,
                                authList:userDs,
                                resList:resDs,
                                reqList:reqDs,
                            },this.props.params.taskName)
                                :
                            this.props.addService({
                                taskId:this.props.params.taskId,
                                nameSpace:vals.nameSpace,
                                name:vals.name,
                                methodName:vals.methodName,
                                responseDataType:this.state.responseDataType,
                                authList:userDs,
                                resList:resDs,
                                reqList:reqDs,
                            },this.props.params.taskName)
                        }else {
                            alert('请检测必填信息是否输入完整！', 'error')
                        }
                        //this.props.form.resetFields();
                    });
                }} >
                    <FormItem {...formItemLayout} label="接口名称">
                        <Row>
                            <Col>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '接口名称不能为空' },{type:'string',message: '接口名称长度不能超过50',max:50}],
                                    initialValue : (this.props.params.wsId && this.props.wsDetail) ? this.props.wsDetail.name:''
                                })(
                                    <Input size="large" type='input' maxLength="51"/>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...formItemLayout} label="命名空间" extra="命名空间必须唯一">
                        <Row>
                            <Col>
                                {getFieldDecorator('nameSpace', {
                                    rules: [{ required: true, message: '命名空间不能为空'},{type:'string',message: '命名空间长度不能超过50',max:50}],
                                    initialValue : (this.props.params.wsId && this.props.wsDetail) ? this.props.wsDetail.nameSpace:''
                                })(
                                    <Input size="large" type='input' maxLength="51"/>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...formItemLayout} label="方法名称" extra="方法名称必须唯一">
                        <Row>
                            <Col>
                                {getFieldDecorator('methodName', {
                                    rules: [{ required: true, message: '方法名称不能为空' },{type:'string',message: '方法名称长度不能超过50',max:50}],
                                    initialValue : (this.props.params.wsId && this.props.wsDetail) ? this.props.wsDetail.methodName:''
                                })(
                                    <Input size="large" type='input' maxLength="51"/>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <Row>
                        <hr className="hr" style={{margin:10}}/>
                        <p>返回数据格式:</p>
                        <div style={{margin:10}}>
                            <Select defaultValue="json" onSelect={(value)=>{this.onSelectResponseType(value)}}>
                                <Select.Option value="xml">XML</Select.Option>
                                <Select.Option value="json">JSON</Select.Option>
                            </Select>
                        </div>
                        <p>接口返回结构:</p>
                        <div>
                            <AddandMinusRowTable tabKey='_id' infoDataSource={this.state.taskResDs} infoColumns={resColumns} addBaseInfo={(e)=>{this.addBaseInfo(e,'from')}}/>
                        </div>
                        <hr className="hr" style={{margin:10}}/>
                        <p>接口参数:</p>
                        <div>
                            <AddandMinusRowTable tabKey='_id' infoDataSource={this.state.taskReqDs} infoColumns={reqColumns} addBaseInfo={(e)=>{this.addBaseInfo(e,'where')}}/>
                        </div>
                        <hr className="hr" style={{margin:10}}/>
                        <p>接口权限:</p>
                        <div>
                            <AddandMinusRowTable tabKey='_id' infoDataSource={this.state.userDataSource} infoColumns={userColumns} addBaseInfo={(e)=>{this.addBaseInfo(e,'user')}}/>
                        </div>
                    </Row>
                    <div className="text-center">
                        <Button type="primary" htmlType="submit" style={{width:100}}>
                            提交
                        </Button>
                        <br/>
                        <br/>
                    </div>
                </Form>
            </div>
        </div>)
    }
}
AddServicePage= Form.create()(AddServicePage);
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestTaskOutPutScheam:(taskId)=>dispatch(requestTaskOutPutScheam(taskId)),
        loadUserList:()=>dispatch(requestUserList()),
        addService:(ws,taskName)=>dispatch(addService(ws,taskName)),
        updateService:(ws,taskName)=>dispatch(updateService(ws,taskName)),
        requestWsDetail:(wsId)=>dispatch(requestWsDetail(wsId)),
    };
}
const mapStateToProps = createStructuredSelector({
    userList:getUserList(),
    taskOutputList:getTaskOutputList(),
    wsDetail:getWsDetail(),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddServicePage);