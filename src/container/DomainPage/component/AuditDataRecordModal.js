require("../../../../css/DomainPageCss.css");
import React, {Component, PropTypes} from 'react';
import {Table, Modal, Button} from 'antd';

export default class AuditDataRecordModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let dataList = this.props.dataList || [];
        const columns = [
            {
                title: '标识', key: 'index',
                render: (text, record, index) => index
            },
            {
                title: '变动时间',
                dataIndex: 'chgTime',
                key: 'chgTime',
            },
            {
                title: '原值',
                dataIndex: 'oldValue',
                key: 'oldValue',
            },
            {
                title: '变动值',
                dataIndex: 'newValue',
                key: 'newValue',
            }];
        return (
            <Modal title="变动情况" visible={this.props.show}
                   onCancel={(e)=>this.props.hide(e)} footer={null}
            >
                <Table size="small" rowKey="id" columns={columns} dataSource={dataList}
                       pagination={{pageSize: 5}}
                       className="table" bordered/>
            </Modal>
        )
    }
}