require("../../../../css/DomainPageCss.css");
require("antd/dist/antd.css");
import {Table} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';


export default class VersionListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let versionList = this.props.dataList||[];
        const columns = [
            {title: '版本号', dataIndex: 'name', width: 100, key: 'name'},
            {title: '版本时间', dataIndex: 'createTime', width: 150, key: 'createTime'},
            {title: '实体', dataIndex: 'entityName', width: 150, key: 'entityName'},
            {title: '发布人', dataIndex: 'creator', width: 150, key: 'creator'},
            {title: '描述', dataIndex: 'remark', width: 150, key: 'remark'},
        ];
        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(versionList&& versionList.totalProperty)?versionList.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };
        return (
            <Table rowKey="id" columns={columns} dataSource={versionList.result}
                   pagination={pagination} onChange={this.onChangePage}
                   />
        )
    }
    //分页
    onChangePage=(page)=>{
        this.props.onRequestAllVersion({
            nameLike:this.props.nameLike,
            page:page.current,
            limit:page.pageSize,
        });
    };
}