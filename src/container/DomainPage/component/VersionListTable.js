import {Table,Tooltip,Icon} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';


export default class VersionListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {domainName,modelName,entityName,entityId,modelId}=this.props;
        let versionList = this.props.dataList ? this.props.dataList.data : [];
        let pageNum=this.props.dataList ? this.props.dataList.pageNum : 0;
        let pagination={pageSize : 15,showQuickJumper:true , defaultCurrent : 1,
                        total :pageNum,
                        showTotal:total => `共 ${total} 条记录`};
        const columns = [
            {title: '版本号', dataIndex: 'name', width: 100, key: 'name'},
            {
                title: '版本时间', dataIndex: 'createTime', width: 150, key: 'createTime'
            },
            {title: '发布人', dataIndex: 'creatorName', width: 150, key: 'creatorName'},
            {title: '描述', dataIndex: 'remark', width: 150, key: 'remark'},
            {title: '查看', dataIndex: 'check', width: 150, key: 'check',
                render: (text, record) =>
                    <div>
                        <Tooltip title="查看">
                            <Icon className="look" onClick={(e)=> {
                                hashHistory.push(encodeURI('version/'+domainName+'/'+modelName+'/'+modelId+'/'+entityName+'/'+entityId+'/'+record.name+'/'+record.id));
                            }}/>
                        </Tooltip>
                    </div>
            },
        ];

        return (
            <Table rowKey="id" columns={columns} dataSource={versionList} pagination={pagination}
                   onChange={this.props.onPageChange()}/>
        )
    }
}