require("../../../../css/DomainPageCss.css");
import {Table, Button, Switch, Icon, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';


export default class AttrListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let attrList = this.props.dataList ? this.props.dataList.data : [];
        let pageNum=this.props.dataList ? this.props.dataList.pageNum : 0;
        let pagination={pageSize : 15,showQuickJumper:true , defaultCurrent : 1,
            total :pageNum,
            showTotal:total => `共 ${total} 条记录`};
        const columns = [
            {title: '名称', dataIndex: 'name', width: 100, key: 'name'},
            {
                title: '类型', dataIndex: 'attType', key: 'attType',
                width: 150, render: text=> {
                switch (text) {
                    case "TEXT" :
                        return "文本";
                    case "DATE" :
                        return "日期";
                    case "NUMBER" :
                        return "数值";
                    case "STREAM" :
                        return "流";
                    case "DOMAIN" :
                        return "基于数据子集";
                }
            }
            },
            {title: '长度', dataIndex: 'length', width: 150, key: 'length'},
            {title: '描述', dataIndex: 'remark', width: 150, key: 'remark'},
            {title: '显示顺序', dataIndex: 'displaySequence', width: 150, key: 'displaySequence'},
            {title: '来源', dataIndex: 'source', width: 150, key: 'source'},
            {title: '规则', dataIndex: 'ruleNum', width: 150, key: 'ruleNum'},
        ];

        return (
            <Table rowKey="id" columns={columns} dataSource={attrList} pagination={pagination}
                    onChange={this.props.onPageChange()}/>
        )
    }
}