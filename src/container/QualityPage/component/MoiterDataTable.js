require("antd/dist/antd.css");
import {Table} from 'antd';
import React, {Component, PropTypes} from 'react';

export  default class MoiterDataTable extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        let attrList = this.props.moiterDataTable.result || [];
        const columns = [
            {title: '实体名称', dataIndex: 'entityName', width: 120, rowKey: 'entityName'},
            {title: '执行开始时间', dataIndex: 'startTime', width: 220, rowKey: 'startTime'},
            {title: '执行结束时间', dataIndex: 'endTime', width: 240, rowKey: 'endTime'},
            {title: '规则个数', dataIndex: 'ruleNum', width: 120, rowKey: 'ruleNum'},
            {title: '主数据数量', dataIndex: 'dateNum', rowKey: 'dateNum', width: 120},
            {title: '错误数据量', dataIndex: 'dateErrorNum', width: 120, rowKey: 'dateErrorNum',render: (text, record) => {
                return (<i className="red">{text}</i>)}},
            {title: '错误率', dataIndex: 'rate', width: 120, rowKey: 'rate',render: (text, record) => {
                return (<i className="red">{text}</i>)}}
        ]
        const  pagination={
            total: this.props.moiterDataTable.totalProperty,
            showTotal: (total, range) => `共${total}条记录`,
            defaultCurrent: 1,
            showQuickJumper: true,
            pageSize: 10,
        };
        return(
            <div>
                <Table rowKey="qualityReportPage"
                       columns={columns}
                       dataSource={attrList}
                       pagination={pagination}
                       onChange={(page)=>{
                           this.props.monitorTablePage({page: page.current, limit: page.pageSize,id:this.props.id})
                       }}
                      />
            </div>
        )
    }

}