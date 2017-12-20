import {Table, Button, Switch, Icon, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';


export default class MonitorFieldTable extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let dataList = this.props.dataList || [];
        const columns = [
            {title: '名称', dataIndex: 'name', width: 100, key: 'name'},
            {title: '列名称', dataIndex: 'attributeNum', key: 'attributeNum', width: 150,},
            {title: '类型', dataIndex: 'code', width: 150, key: 'code',},
            {title: '长度', dataIndex: 'memberNum', width: 150, key: 'memberNum',},
            {title: '描述', dataIndex: 'status', width: 150, key: 'status',},
            {title: '变动类型', dataIndex: 'uc', width: 150, key: 'uc',},
            {title: '变动描述', width: 150, key: 'version',},
        ];
        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(dataList&& dataList.totalProperty)?dataList.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };
        return (
            <Table rowKey="id"
                   columns={columns}
                   dataSource={dataList.result}
                   pagination={pagination}
                   onChange={this.onChangePage}
            />
        )
    }
    //分页
    onChangePage=(page)=>{

    };
}

