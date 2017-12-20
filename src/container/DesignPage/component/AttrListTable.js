import {Table, Icon, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';


export default class AttrListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let attrList = this.props.dataList || {};
        const columns = [
            {title: '名称', dataIndex: 'name', width: 100, key: 'name'},
            {title: '列名称', dataIndex: 'code', width: 100, key: 'code'},

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
            {
                title: '操作', width: 150, key: 'edit',
                render: (record) =>
                    <div>
                        <Tooltip title="编辑">
                            <Icon type="edit" className="table-edit" onClick={(e)=>this.props.updateAttr(e, record)}/>
                        </Tooltip>
                        <span className="ant-divider"/>
                        <Tooltip title="删除">
                            <Icon type="delete" className="table-dele"
                                  onClick={(e)=>{
                                      record.entityId=this.props.entityId;
                                      this.props.deleteAttr(e, record)}}/>
                        </Tooltip>
                    </div>
            },
        ];
        let  pagination={
            current:this.props.current,
                pageSize: this.props.limit,
                total:attrList.totalProperty,
                showTotal:total => `共有 ${total} 条记录`,
                onChange:this.props.onChange,
                showQuickJumper:true,
                /*showSizeChanger:false,
                onShowSizeChange:this.props.ShowSizeChange,
                pageSizeOptions:['10','15','20']*/
        }
        return (
            <Table rowKey="id"
                   columns={columns}
                   dataSource={attrList.dataLists}
                   pagination={pagination}
                  />
        )
    }
}