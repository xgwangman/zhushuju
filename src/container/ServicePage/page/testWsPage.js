/**
 * Created by Administrator on 2017-7-28.
 */
import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Breadcrumb,Input,Button,Row,Col,Card,Table} from 'antd';
import AddandMinusRowTable from '../component/AddandMinusRowTable'
import {requestTestParams,beginTestWs} from '../actions'
import {getTestParamsData,getTestResultData} from '../selectors'
import {Link, router} from 'react-router';

export class TestWsPage extends Component {
    constructor(props) {
        super(props);
        this.props.loadTestParams(this.props.params.wsId);
        this.state={
            inputValue:'',userName:'',password:'',
            dataSource:[],
            flag:true
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({dataSource:nextProps.testParams});
    }
    handleInputChange=(e,i,key)=>{
        let value=e.target.value;
        let ds=[...this.state.dataSource];
        ds[i]['value']=value;
        this.setState({dataSource:ds})
    };
    onBaseInfo=(e,type)=>{
        if(type=='userName'){
            this.setState({userName:e.target.value})
        }else if(type=='password'){
            this.setState({password:e.target.value})
        }
    };
    onTestWs=()=>{
        let ds=[...this.state.dataSource],temp=[];
        ds.map(function (item,index) {
            temp.push({inName:item.inName,value:item.value})
        });
        this.props.beginTestWs({wsId:this.props.params.wsId,userName:this.state.userName,password:this.state.password,params:temp})
    };

    render() {
        const columns=[
            {title: '属性名称', dataIndex: 'attName',width: '30%'},
            {title: '输入名称', dataIndex: 'inName',width: '30%'},
            {title: '参数值',dataIndex: 'value',width: '40%',render:(text, record, index)=>{
               return <Input value={this.state.dataSource[index]?this.state.dataSource[index]['value']:text}
                             onChange={(e)=>this.handleInputChange(e,index,text)}/>
            }},
        ];
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link to="service">{this.props.params.taskName}</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={encodeURI('service/task/serverMgt/'+this.props.params.taskId+'/'+this.props.params.taskName)}>{this.props.params.wsName}</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>测试服务</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent">
                    <Row>
                    <span style={{fontSize:16,margin:5}}>测试URL: <b style={{color:'green'}}>
                        {this.props.params.wsUrl ? this.props.params.wsUrl.replace(/!/g,'/'):'' }
                        </b>
                    </span>
                    </Row>
                    <p style={{fontSize:16,margin:'20px 5px',fontWeight:'bold'}}>接口返回结构:</p>
                    <div style={{padding:'0 20'}}>
                        <Table rowKey='id' dataSource={this.state.dataSource } columns={columns} pagination={false} bordered={true}/>
                    </div>
                    <p style={{fontSize:16,margin:'20px 5px',fontWeight:'bold'}}>测试用户:</p>
                    <div >
                        <Row>
                            <Col span={2} style={{textAlign:'center',marginTop:3}}>用户名: </Col>
                            <Col span={6}><Input type='input' value={this.state.userName} onChange={(e)=>{this.onBaseInfo(e,'userName')}}/></Col>
                            <Col span={2} style={{textAlign:'center',marginTop:3}}>密码: </Col>
                            <Col span={6}><Input type='password' value={this.state.password} onChange={(e)=>{this.onBaseInfo(e,'password')}}/></Col>
                        </Row>
                    </div>
                    <p style={{marginRight:100,textAlign:'right'}}>
                        <Button type='primary' onClick={()=>{this.onTestWs()}}>测试</Button>
                    </p>
                    <p style={{fontSize:16,margin:'20px 5px',fontWeight:'bold'}}>测试结果:</p>
                    <div>
                        <Card style={{ width:'100%' }}>
                            {this.props.testResult}
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        loadTestParams:(id)=>dispatch(requestTestParams(id)),
        beginTestWs:(object)=>dispatch(beginTestWs(object)),
    };
}
const mapStateToProps = createStructuredSelector({
    testParams:getTestParamsData(),
    testResult:getTestResultData(),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestWsPage);
