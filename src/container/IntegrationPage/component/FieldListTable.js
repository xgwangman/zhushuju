require("../../../../css/DomainPageCss.css");
require("antd/dist/antd.css");
import {Table, Switch} from 'antd';
import React, {Component, PropTypes} from 'react';

export default class FieldListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let fieldList = this.props.dataList.result || [];
        let type = this.props.type;
        const columns = [
            {title: '名称', dataIndex: 'columeName', key: 'columeName'},
            {title: '中文名称', dataIndex: 'name', key: 'name'},
            {
                title: '类型', dataIndex: 'javaType', key: 'javaType',
            },
            {
                title: '长度', dataIndex: 'jdbcLength', key: 'jdbcLength',
            },
            {
                title: '是否主键', dataIndex: 'jdbcIspk', key: 'jdbcIspk',
                render: text=> {
                    switch (text) {
                        case "false" :
                            return <i className="red">否</i>;
                        case "true" :
                            return <i className="green">是</i>;
                    }
                }
            },
            {
                title: '是否为空', dataIndex: 'jdbcIsNull', key: 'jdbcIsNull',
                render: text=> {
                    switch (text) {
                        case "false" :
                            return <i className="red">否</i>;
                        case "true" :
                            return <i className="green">是</i>;
                    }
                }
            },
        ];
        const synField = {
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
        if (type == "synTable") {
            columns.push(synField);
        }
        const  pagination={
            total: this.props.dataList.totalProperty,
            showTotal: (total, range) => `共${total}条记录`,
            defaultCurrent: 1,
            showQuickJumper: true,
            pageSize: 9,
        };
        return (
            <Table rowKey="id" columns={columns} dataSource={fieldList} pagination={pagination}
                   style={this.props.style}
                   onChange={(type == "table") ? (page)=>this.props.requestFieldList(
                       {dsId:this.props.params.srcId,tableId:this.props.params.srcTableId,page: page.current,limit: page.pageSize,nameLike: this.props.nameLike}) :
                       (page)=>this.props.requestSynFieldList(
                       {dsId:this.props.params.srcId,tableId:this.props.params.srcTableId,page: page.current,limit: page.pageSize,nameLike: this.props.nameLike})}
                   />
        )
    }
}