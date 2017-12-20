import {Table, Button, Switch, Icon, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import alert from '../../../common/utils/alert';


export default class MonitorTable extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let monitorList = this.props.dataList?this.props.dataList.result:[];
        const columns = [
            {title: '实体名称', dataIndex: 'ENTITYNAME', width: 100, key: 'ENTITYNAME'},
            {title: '实体表名称', dataIndex: 'TABLENAME', key: 'TABLENAME', width: 150,},
            {title: '数据子集', dataIndex: 'MODELNAME', width: 150, key: 'MODELNAME',},
            {title: '数据类', dataIndex: 'DOMAINNAME', width: 150, key: 'DOMAINNAME',},
            {title: '变动类型', dataIndex: 'STATUS', width: 150, key: 'STATUS',
                render: (text, record) =>{
                    if(text=="1"){
                        text="新增"
                    }
                    return(text)
                }
    },
            {title: '一键同步', width: 150, key: 'synch',
                render: (text, record) =>{
                    return (
                        <span>
                            <a onClick={(e)=>{
                                   this.props.requestSynch({moniId:record.moniId,modelID:record.modelID});
                                }}>同步</a>
                        </span>
                    )
                }
               },
            {title: '变动字段查看', width: 150, key: 'check',
                render: (text, record) =>{
                return (
                    <span>
                            <a onClick={(e)=>{
                                hashHistory.push(encodeURI('/moniFieldsPage/'+record.entityId+'/'+record.ENTITYNAME)),
                                this.props.requestCheck({entityId:record.entityId});
                                }}>查看</a>
                        </span>
                )
            }},
        ];
        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(monitorList&& monitorList.totalProperty)?monitorList.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };
        return (
            <Table rowKey="id"
                   columns={columns}
                   dataSource={monitorList.pageData}
                   pagination={pagination}
                   onChange={this.onChangePage}
            />
        )
    }
    //分页
    onChangePage=(page)=>{

    };
}

