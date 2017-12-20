require("antd/dist/antd.css");
import {Table, Row, Col} from 'antd';
import React, {Component, PropTypes} from 'react';

export  default class EntityDataTable extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        let attrList = this.props.getEntityDataTable.result || [];
        const columns = [
            {title: '执行开始时间', dataIndex: 'startTime', width: '20%', rowKey: 'startTime'},
            {title: '执行结束时间', dataIndex: 'endTime', width: '20%', rowKey: 'endTime'},
            {title: '规则个数', dataIndex: 'ruleNum', width: '12%', rowKey: 'ruleNum'},
            {title: '实体个数', dataIndex: 'entityNum', width: '12%', rowKey: 'entityNum'},
            {title: '主数据数量', dataIndex: 'dateNum', width: '12%',rowKey: 'dateNum'},
            {title: '错误数据量', dataIndex: 'dateErrorNum', width: '12%', rowKey: 'dateErrorNum',render: (text, record) => {
                return (<i className="red">{text}</i>)}},
            {title: '错误率', dataIndex: 'rate', width: '12%', rowKey: 'rate',render: (text, record) => {
                return (<i className="red">{text}</i>)}}
        ]
        const  pagination={
            total: this.props.getEntityDataTable.totalProperty,
            showTotal: (total, range) => `共${total}条记录`,
            defaultCurrent: 1,
            showQuickJumper: true,
            pageSize: 6,

    };
        return(
            <div>
                <Table
                   rowKey="entityDataTable"
                   columns={columns}
                   dataSource={attrList}
                   pagination={pagination}
                   onChange={(page)=>this.props.getEntityTablePage({id: this.props.id, page: page.current, limit: page.pageSize})}
                   />
            </div>
        )
    }

}