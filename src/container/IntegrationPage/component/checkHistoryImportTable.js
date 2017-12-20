/**
 * Created by Administrator on 2017/8/11.
 */
import {Table, Switch, Icon, Tooltip, Modal} from 'antd';
import React, {Component} from 'react';
import {hashHistory} from 'react-router';
const confirm = Modal.confirm;

export default class CheckHistoryImportTable extends Component {
    constructor(props){
        super(props);
    }
    showConfirm =(text)=> {
        let _this=this;
        confirm({
            title: '确定清除该项导入数据吗?',
            onOk() {
                _this.props.clearImportData(text);
            },
            onCancel() {},
        });
    }
    render () {
        let historyData = this.props.historyImportData || [];
        const columns = [
            {title: '实体名称', dataIndex: 'entityName', key: 'entityName',width: '200px'},
            {title: '导入时间', dataIndex: 'startTime', key: 'startTime'},
            {title: '导入数据量', dataIndex: 'dataNum', key: 'dataNum'},
            {title: '导入者', dataIndex: 'creatorName', key: 'creatorName'},
            {title: '导入结果', dataIndex: 'status', key: 'address',
                render : (text, record) => {
                    if(text == 1){
                        return <span>成功</span>
                    }else {
                        return <span style={{color: "#FF0000"}}>失败</span>
                    }
                }
            },
            {title: '导入查看', dataIndex: "id",  key: 'add',
                render : (text, record) => {
                    if(text !== null){
                        return (
                            <div>
                                <Tooltip title="清除">
                                    <Icon type="delete" className="table-dele" onClick={(e)=>this.showConfirm(text)}/>
                                </Tooltip>&nbsp;
                                <span className="ant-divider"></span>&nbsp;
                                <Tooltip title="查看">
                                    <Icon className="look"
                                            onClick={(e)=>{
                                                hashHistory.push(encodeURI('importMasterData/checkImportData/'+ record.id +'/'+ record.fileName))}}
                                    />
                                </Tooltip>
                            </div>
                        )
                    }else{
                        return null;
                    }
                }
            }
        ]
        const pagination = {
            total: historyData.totalProperty,
            showTotal: (total, range) => `共${total}条记录`,
            defaultCurrent: 1,
            showQuickJumper: true,
            pageSize: 13,
        }
        return (
            <Table
                rowKey="importHistoryID"
                columns={columns}
                dataSource={historyData.result}
                pagination={pagination}
                onChange={(page) => this.props.requestCheckHistoryPage({page: page.current, limit: page.pageSize})}
            />
        )
    }
}
