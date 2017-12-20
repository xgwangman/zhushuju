import {Table, Switch} from 'antd';
import {hashHistory} from 'react-router';
import React, {Component, PropTypes} from 'react';


export default class FieldListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let fieldList = this.props.dataList || [];
        let {tableAttr, selectedFields} = this.props;
        const columns = [
            {title: '名称', dataIndex: 'columeName', key: 'columeName', width: '30%'},
            {title: '显示名称', dataIndex: 'name', key: 'name', width: '30%'},
            {title: '类型', dataIndex: 'javaType', key: 'javaType', width: '20%'},
            {title: '是否主键', dataIndex: 'jdbcIspk', key: 'jdbcIspk', width: '20%',
                render: text=> {
                    switch (text) {
                        case "false" :
                            return <i className="red">否</i>;
                        case "true" :
                            return <i className="green">是</i>;
                        default:
                            return <i className="red">否</i>;
                    }
                }
            }
        ];
        const rowSelection = {
            selectedRowKeys:this.props.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                let tableFields = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    let tableField = {
                        id: selectedRows[i].id,
                        name: selectedRows[i].columeName,
                        displayName: selectedRows[i].name,
                        javaType: selectedRows[i].javaType,
                        aliasName: selectedRows[i].columeName,
                        tableId: selectedRows[i].tableId,
                        tabelName: selectedRows[i].name,
                        length: selectedRows[i].jdbcLength,
                        isPK: selectedRows[i].jdbcIspk,
                    };
                    tableFields.push(tableField);
                }
                this.props.getSelectedRowKeys(selectedRowKeys);
                this.props.setTableFields(tableFields);
            },
        };
        return (
            <Table rowKey="id" bordered size="small" style={this.props.style}
                   className="table"
                   rowSelection={rowSelection} pagination={false}
                   columns={columns} dataSource={fieldList}/>
        )
    }
}