/**
 * Created by Administrator on 2017/6/26.
 */
require("antd/dist/antd.css");
import {Table, Button, Switch, Icon, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';

export  default class EntityCheckTable extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        let attrList = this.props.getEntityQualityTable || [];
        const params = this.props.params;
        const columns = [
            {title: '名称', dataIndex: 'name', width: 150, key: 'name'},
            {title: '属性', dataIndex: 'attributeNum', width: 150, key: 'attributeNum'},
            {title: '数据量', dataIndex: 'dataNum', width: 150, key: 'dataNum'},
            {title: '规则个数', dataIndex: 'ruleNum', width: 150, key: 'ruleNum'},
            {title: '质量数据', dataIndex: 'dataErrorNum', width: 150, key: 'dataErrorNum'},
            {
                title: '质量查看',
                width: 150,
                dataIndex: 'check',
                key: 'check',
                render: (text,record) =>
                    <div>
                        <Tooltip title="查看">
                            <a className="look" style={{display: "block",cursor: "pointer",color: "#108ee9"}} onClick={(e)=> {
                                hashHistory.push(encodeURI("quality/qualityEntity/entityQualityCheck/" + record.id + '/' + record.name +'/'+ params.entityId + '/'+ params.entityName))}}>
                            </a>
                        </Tooltip>
                    </div>
            },
        ];
        const  pagination={
            total: attrList.totalProperty,
            showTotal: (total, range) => `共${total}条记录`,
            defaultCurrent: 1,
            showQuickJumper: true,
            pageSize: 13,
        };
        return(
            <Table
                rowKey="entityCheckTable"
                columns={columns}
                dataSource={attrList.result}
                pagination={pagination}
                onChange={(page)=>{
                    this.props.getQualityEntityPage({page:page.current, limit:page.pageSize,
                        nameLike:this.props.nameLike,entityId:this.props.entityId})}}
                />
        )
    }

}
