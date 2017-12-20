import {Table, Switch, Icon, Tooltip} from 'antd';
import React,{Component} from 'react';
import {hashHistory} from 'react-router';


export  default class UserListTable extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        var arrNu= new Array();
        const columns = [
            {key:'userNo',title: '账号', dataIndex: 'userNo', width: 100},
            {key: 'name', title: '用户名', dataIndex: 'name', width: 150},
            {key: 'roleName', title: '角色', dataIndex: 'roleName', width: 150},
            {key: 'status', title: '禁用/启用', dataIndex: 'status', width: 150,
                render: (text, record, index) => {
                    if (text == "0") {
                        text = false;
                    } else {
                        text = true;
                    }
                    return (<Switch defaultChecked={text} onChange={(e)=>this.props.onChangeStatusT(e, record)}/>)
                }
            },
            {key: 'author', title: '授权', dataIndex: 'author', width: 150,
                render:(text, record, index)=>

                         <Tooltip placement="top" title="授权">
                             <Icon className="author" onClick={(e)=>{
                                 hashHistory.push(encodeURI('authorPage/'+record.id+'/'+record.name+'/'+record.userNo)),
                                     this.props.authorU(e,record);
                                 console.log(encodeURI('authorPage/'+record.id+'/'+record.name+'/'+record.userNo))
                             }}/>
                         </Tooltip>

            },
            {key: 'restpwd', title: '重置密码', dataIndex: 'restpwd', width: 150,
                render: (text, record, index) =>

                        <Tooltip placement="top" title="重置密码">
                            <Icon className="resetPassword" onClick={(e) => this.props.onResetPasswordT(e,record)}/>
                        </Tooltip>
            },
            {key: 'edit', title: '操作', dataIndex: 'edit', width: 100,
                render: (text, record, index) =>
                    <div>
                            <Tooltip title="编辑">
                                <Icon type="edit" className="table-edit"
                                      onClick={(e) => this.props.onShowUserEditT(e,record)}/>
                            </Tooltip>
                        <span className="ant-divider"/>
                            <Tooltip title="删除">
                                <Icon type="delete" className="table-dele"
                                      onClick={(e) => this.props.onDeleteUser(e,record)}/>
                             </Tooltip>
                    </div>
            }];
        const data=this.props.userNameList || [];
        const rowSelection = {
            onSelect: (record, selected, selectedRows) => {
                if (selectedRows !== null) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        arrNu[i]=selectedRows[i].id;
                    }
                }
                return arrNu;
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                if (selectedRows !== null) {
                    for (var i = 0; i < selectedRows.length; i++) {
                        arrNu[i]=selectedRows[i].id;
                    }
                }
            },
             onChange:(selectedRowKeys, selectedRows) => {
                 if (selectedRows !== null) {
                     for (var i = 0; i < selectedRows.length; i++) {
                         arrNu[i]=selectedRows[i].id;
                     }
                 }
                 return (this.props.rowSelectT(arrNu))
             },
        };
        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(data&& data.totalProperty)?data.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };
        return(
            <div>
            <Table columns={columns}
                   dataSource={data.result}
                   rowSelection={rowSelection}
                   pagination={pagination}
                   onChange={this.onChangePage}
                   rowKey="id"
            />
            </div>
        )
    }
    //分页
    onChangePage=(page)=>{
        this.props.requestPageData({
            nameLike:this.props.userNameLike,
            page:page.current,
            limit:page.pageSize,
        });
    };
}
