import {Table, Button, Switch, Icon, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import alert from '../../../common/utils/alert';


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
                render: (text, record) =>
                    <a onClick={(e)=> {
                        hashHistory.push(encodeURI('/design/entity/attr/'+record.id+'/'+this.props.domainName+'/'+this.props.modelName+'/'+this.props.modelId+'/'+record.name));
                    }}>{text}</a>,
            },
            {
                title: '表名称',
                dataIndex: 'code',
                width: 150,
                key: 'code',
            },
            {
                title: '数据量',
                dataIndex: 'memberNum',
                width: 150,
                key: 'memberNum',
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
                    if(record.attributeNum==0){
                        return (
                            <Switch checked={false} onChange={(e)=>{return  alert("实体没有属性，禁止启用",'error')}}/>
                        )
                    }
                    return (
                        <Switch defaultChecked={text} onChange={(checked)=>this.props.changeStatus(checked, record)}/>)
                }
            },
            {
                title: 'UC矩阵',
                dataIndex: 'uc',
                width: 150,
                key: 'uc',
                render: (text, record) =>
                    <div>
                    <Tooltip placement="top" title="查看">
                        <Icon className="look" style={{cursor: "pointer",color: "#08c"}}
                              />
                    </Tooltip>
                    <span className="ant-divider"/>
                        <Tooltip title="编辑">
                            <Icon type="edit" className="table-edit" />
                        </Tooltip>
                    </div>
            },
            {
                title: '版本',
                width: 150, key: 'version',
                render: (text, record) =>
                    <div>
                        <Tooltip title="历史版本">
                            <Icon type="desktop" className="table-desktop" onClick={(e)=> {
                                hashHistory.push(encodeURI('/design/entity/version/'+record.id+'/'+this.props.domainName+'/'+this.props.modelName+'/'+record.name+'/'+this.props.modelId)),
                                this.props.requestAllVersion(e,record)
                            }}/>
                        </Tooltip>
                    </div>
            },
            {
                title: '操作',
                width: 150, key: 'edit',
                render: (record, index) =>
                    <div>
                        <Tooltip title="编辑">
                            <Icon type="edit" className="table-edit" onClick={(e)=>this.props.UpdateEntity(e, record)}/>
                        </Tooltip>
                        <span className="ant-divider"/>
                        <Tooltip title="删除">
                            <Icon type="delete" className="table-dele" onClick={(e)=>{
                                record.modelId=this.props.modelId;
                                this.props.deleteEntity(e, record)}}/>
                        </Tooltip>
                    </div>
            },
        ];
       let pagination={
                current:this.props.current,
                pageSize: this.props.limit,
                total:entityList.totalProperty,
                showTotal:total => `共有 ${total} 条记录`,
                onChange:this.props.pageOnchange,
                showQuickJumper:true,
        }
        return (
            <Table rowKey="id"
                   columns={columns}
                   dataSource={entityList.dataLists}
                   pagination={pagination}
                   />
        )
    }
}

