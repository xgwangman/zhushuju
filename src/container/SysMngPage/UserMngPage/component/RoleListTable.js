/**
 * Created by Administrator on 2017/5/2.
 */
import {Table, Switch, Icon, Tooltip} from 'antd';
import React, {Component} from 'react';
import {hashHistory} from 'react-router';

export default class RoleListTable extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        var rolenu= new Array();
        function onChange(checked) {
            console.log(`switch to ${checked}`);
        }
        const columns = [
            { key:'code', title: '角色标识', dataIndex: 'code', width:100},
            { key: 'name', title: '角色名称', dataIndex: 'name', width:150},
            { key:'users',title: '查看人员', dataIndex: 'users', width:150,
                render:(text, record, index)=>
                    <Tooltip placement="top" title="查看人员">
                        <Icon className="look" onClick={(e)=>{
                                hashHistory.push(encodeURI('userPage/'+record.id+'/'+record.name)),
                                    this.props.checkdUserR(e,record)}}
                        />
                    </Tooltip>
            },
            { key: 'status', title: '禁用/启用', dataIndex: 'status', width: 150,
                render: (text, record, index) => {
                    if (text == "0") {
                        text = false;
                    } else {
                        text = true;
                    }
                    return (<Switch defaultChecked={text} onChange={(e)=>this.props.onChangeRoleStatusR(e, record)}/>)
                }
            },
            { key: 'accredit', title: '授权', dataIndex: 'accredit', width:150,
                render: (text, record, index) =>
                    <Tooltip placement="top" title="授权">
                        <Icon className="author" onClick={(e)=>{
                                hashHistory.push(encodeURI('roleAuthorPage/'+record.id+'/'+record.name)),
                                this.props.authorR(e,record)
                            }}/>
                    </Tooltip>
            },

            { key: 'edit', title: '操作', dataIndex: 'edit', width: 150,
                render: (text,record, index) =>
                    <div>
                        <Tooltip placement="top" title="编辑">
                            <Icon type="edit" className="table-edit"onClick={(e) => this.props.setRoleEditAttrR(e,record)}/>
                        </Tooltip>
                        <span className="ant-divider"/>
                        <Tooltip placement="top" title="删除">
                            <Icon type="delete" className="table-dele" onClick={(e) => this.props.onDeleteRole(e,record)}/>
                        </Tooltip>
                    </div>
            },
        ];
        const rowSelection = {
            onSelect: (record, selected, selectedRows) => {
                if(selectedRows!==null){
                    for(var i=0;i<selectedRows.length;i++){
                        rolenu[i]=selectedRows[i].id;
                    }
                }
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                if(selectedRows!==null){
                    for(var i=0;i<selectedRows.length;i++){
                        rolenu[i]=selectedRows[i].id;
                    }
                }
            },
            onChange:(selectedRowKeys, selectedRows) => {
                if (selectedRows !== null) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        rolenu[i]=selectedRows[i].id;
                    }
                }
                return (this.props.rowSelectT(rolenu))
            },
        };
        let ruleData=this.props.roleListR||[];
        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(ruleData&& ruleData.totalProperty)?ruleData.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };
        return(
            <Table
                columns={columns}
                dataSource={ruleData.result}
                rowSelection={rowSelection}
                pagination={pagination}
                onChange={this.onChangePageRule}
                rowKey="id"
        />)
    }
    //分页
    onChangePageRule=(page)=>{
        this.props.requestRoleList({
            nameLike:this.props.roleNameLike,
            page:page.current,
            limit:page.pageSize,
        });
    };
}