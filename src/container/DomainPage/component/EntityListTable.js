require("../../../../css/DomainPageCss.css");
require("antd/dist/antd.css");
import {Table, Button, Switch, Icon, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';


export default class EntityListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let entityList = this.props.dataList || [];
        const columns = [
            {title: '名称', dataIndex: 'name', width: 100, key: 'name'},
            {
                title: '属性',
                dataIndex: 'attributeNum',
                key: 'attributeNum',
                width: 150,
                render: (text, record) =>{
                    if(record.status=='1' || record.status==1){
                        return  (<a href="javascript:void(0)" onClick={(e)=> {
                            hashHistory.push(encodeURI('/main/entity/attr/'+this.props.domainName+'/'+this.props.modelName+'/'+this.props.modelId+'/'+record.name+'/'+record.id));
                        }}>{text}</a>)
                    }else{
                        return <span style={{cursor:'pointer'}}>{text}</span>
                    }
                }
            },
            {
                title: '数据量',
                dataIndex: 'dataNum',
                width: 150,
                key: 'dataNum',
                render: (text, record) =>{
                    if(record.status=='1' || record.status==1){
                        return <a href="javascript:void(0)" onClick={(e)=> {
                            hashHistory.push(encodeURI('/main/entity/entityData/'+this.props.domainName+'/'+this.props.modelName+'/'+this.props.modelId+'/'+record.name+'/'+record.id+'/data'));
                        }}>{text}</a>
                    }else{
                        return <span style={{cursor:'pointer'}}>{text}</span>
                    }
                }
            },
            {
                title: '变动数据',
                dataIndex: 'dataGatherNum',
                width: 150,
                key: 'dataGatherNum',
                render: (text, record) => {
                    if (record.status == '1' || record.status == 1) {
                        return (
                            <span>
                                <a href="javascript:void(0)" onClick={(e) => {
                                    hashHistory.push(encodeURI('/main/entity/entityData/'+this.props.domainName+'/'+this.props.modelName+'/'+this.props.modelId+'/'+record.name+'/'+record.id+'/gatherData'));
                                }}>{text} <i className="red">{record.dataGatherErrorNum}</i></a>
                             </span>
                        )
                    } else {
                        return <span style={{cursor: 'pointer'}}>{text} &nbsp;&nbsp;<i>{record.dataGatherErrorNum}</i></span>
                    }
                }
            },
            {
                title: '采集任务',
                dataIndex: 'gatherTaskNum',
                key: 'gatherTaskNum',
                width: 150,
                render: (text, record) => {
                    return (
                        <span>
                            <a href="javascript:void(0)" onClick={(e)=> {
                                hashHistory.push(encodeURI('/main/entity/task/'+this.props.domainName+'/'+this.props.modelName+'/'+this.props.modelId+'/'+record.name+'/'+record.id+'/gather'));
                            }}>{text}</a>
                        </span>
                    )
                }
            },
           {
                title: 'UC矩阵',
                dataIndex: 'UC',
                width: 150, key: 'UC',
                render: (text, record, index) => {
                    return (
                         <span>
                            <a
                            onClick={(e)=>{
                                hashHistory.push('/ucPage/'+this.props.domainName+'/'+this.props.modelName+'/'+this.props.modelId+'/'+record.name+'/'+record.id)
                            }}>查看</a>
                        </span>
                        )
                }
            },

            {
                title: '状态',
                dataIndex: 'status',
                width: 150, key: 'status',
                render: (text, record, index) => {
                    if (text == "1") {
                        text = true;
                    } else {
                        text = false;
                    }
                    return (
                        <Switch defaultChecked={text} onChange={(checked)=>this.props.changeStatus(checked, record)}/>)
                }
            },
            {
                title: '版本',
                width: 150, key: 'version',
                render: (text, record) =>
                    <div>
                        <Tooltip title="历史版本">
                            <Icon type="desktop" className="table-desktop" onClick={(e)=> {
                                hashHistory.push(encodeURI('/main/entity/allVersion/'+this.props.domainName+'/'+this.props.modelName+'/'+this.props.modelId+'/'+record.name+'/'+record.id));
                            }}/>
                        </Tooltip>
                        <span className="ant-divider"/>
                        <Tooltip title="发布版本">
                            <Icon type="cloud-upload-o" className='upload-edit'
                                  onClick={(e)=> {this.props.addEntityVersion(e, record);}}
                            />
                        </Tooltip>
                    </div>
            },
        ];
        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(entityList&& entityList.totalProperty)?entityList.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };
        return (
            <div>
                <Table  columns={columns}
                        dataSource={entityList.result}
                        pagination={pagination}
                        onChange={this.onChangePage}
                        rowKey="id"
                />
            </div>
        )
    }
    //分页
    onChangePage=(page)=>{
        this.props.requestEntityList({
            page:page.current,
            limit:page.pageSize,
        });

    };
}