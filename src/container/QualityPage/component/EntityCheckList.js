/**
 * Created by Administrator on 2017/6/26.
 */
require("antd/dist/antd.css");
import {Table} from 'antd';
import React, {Component, PropTypes} from 'react';

export  default class EntityCheckList extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const params = this.props.params;
        let attrList = this.props.getEntityDataTable || [];
        const columns = [
            {title: '执行开始时间', dataIndex: 'startTime', width: 220, rowKey: 'startTime'},
            {title: '执行结束时间', dataIndex: 'endTime', width: 240, rowKey: 'endTime'},
            {title: '规则个数', dataIndex: 'ruleNum', width: 100, rowKey: 'ruleNum'},
            {title: '主数据数量', dataIndex: 'dateNum', rowKey: 'dateNum', width: 120},
            {title: '错误数据量', dataIndex: 'dateErrorNum', width: 150, rowKey: 'dateErrorNum',render: (text, record) => {
                return (<i className="red">{text}</i>)}},
            {title: '错误率', dataIndex: 'rate', width: 140, rowKey: 'rate',render: (text, record) => {
                return (<i className="red">{text}</i>)}}
        ]
        const  pagination={
            total: attrList.totalProperty,
            showTotal: (total, range) => `共${total}条记录`,
            defaultCurrent: 1,
            showQuickJumper: true,
            pageSize: 6,
        };
        return(
            <div>
                <Table
                    rowKey="entityQualityCheckPage"
                    columns={columns}
                    dataSource={attrList.result}
                    pagination={pagination}
                    onChange={(page)=>this.props.getEntityTablePage({id: params, page: page.current, limit:page.pageSize})}
                    className="table"/>
            </div>
        )
    }

}

