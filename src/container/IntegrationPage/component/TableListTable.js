require("../../../../css/DomainPageCss.css");
require("antd/dist/antd.css");
import {Table, Switch, Icon} from 'antd';
import {hashHistory} from 'react-router';
import React, {Component, PropTypes} from 'react';

export default class TableListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let attrList = this.props.dataList.result || [];
        let tableType = this.props.type;
        let params=this.props.params;
        const columns = [
            {title: '名称', dataIndex: 'name', key: 'name'},
            {
                title: '类别', dataIndex: 'type', key: 'type',
                render: text=> {
                    switch (text) {
                        case "TABLE" :
                            return "表";
                        case "VIEW" :
                            return "视图";
                    }
                }
            },
            {title: '中文名称', dataIndex: 'tableName', key: 'tableName'},
            {
                title: '字段', dataIndex: 'fieldNum', key: 'fieldNum',
                render: (text, record) => {
                    if (tableType == "table") {
                        return (<a href="#" onClick={(e)=> {
                            hashHistory.push(encodeURI('/integration/table/fieldList/'+ params.srcId +'/'+record.id +'/'+ record.name +'/'+ record.type +'/'+ params.paramsId));
                            this.props.clickFieldNum(e, record);
                        }
                        }>{text}</a>)
                    } else if (tableType == "synTable") {
                        return (<a href="#" onClick={(e)=> {
                            hashHistory.push(encodeURI('/integration/table/synFieldList/'+ params.srcId +'/'+record.id +'/'+ record.name +'/'+ record.type +'/'+ params.paramsId));
                            this.props.clickSynFieldNum(e, record);
                        }
                        }>{text}</a>)
                    }
                }
            }];
        const tableColumn = {
            title: '是否启用', dataIndex: 'status', key: 'status',
            render: (text, record) => {
                if (text == "1") {
                    text = true;
                } else if (text == "-1") {
                    text = false;
                } else {
                    text = false;
                }
                return (
                    <Switch defaultChecked={text} onChange={(checked)=> {
                        this.props.changeTableStatus(checked, record.id)
                        }}
                    />)
            }
        };
        const synTableColumn = {
            title: '变动情况', dataIndex: 'synStatus', key: 'synStatus',
            render: (text, record) => {
                if (text == "1") {
                    return <i className="green">新增</i>;
                } else if (text == "-1") {
                    return <i style={{fontcolor: 'gray'}}>删除</i>;
                } else if (text == "0") {
                    return <i className="red">变更</i>;
                }
            }
        };
        if (this.props.type == "table") {
            columns.push(tableColumn);
        } else if (this.props.type == "synTable") {
            columns.push(synTableColumn);
        }
        const  pagination={
            total: this.props.dataList.totalProperty,
            showTotal: (total, range) => `共${total}条记录`,
            defaultCurrent: 1,
            showQuickJumper: true,
            pageSize: 13,
        };
        return (
            <Table
                rowKey="id"
                columns={columns}
                dataSource={attrList}
                pagination={pagination}
                style={this.props.style}
                onChange= {(page)=>this.props.requestTablePage({id:this.props.params.srcId, page:page.current, limit:page.pageSize, nameLike: this.props.nameLike})}
                />
        )
    }
}