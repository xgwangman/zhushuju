import {Table} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import {Tooltip} from 'antd';
import '../../../../css/DomainPageCss.css';

export default class EntityDataListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var titles;
        let dataType = this.props.dataType;
        let attrList = this.props.dataList;
        if(attrList!=null){
            titles = attrList.result.titles;
        };
        let showAll = this.props.showAllColumns;
        let columnsShow = this.props.columns || [];
        const columns = [];
        if (titles) {
            if (showAll) {
                for (let i = 0; i < titles.length; i++) {
                    columns.push(
                        {
                            title: titles[i].name,
                            dataIndex: titles[i].id,
                            width:150,
                            key: titles[i].id,
                            render: (text, record) => {
                                if (dataType == "data") {
                                    return (
                                        <a href="javascript:void(0)"
                                           onClick={(e)=>{e.preventDefault();this.props.clickToRequestApprovalRecord(this.props.entityId,titles[i].id,record.UUID)}}>{text}</a>
                                    )
                                } else if (dataType == "gatherData") {
                                    if (record[titles[i].id + 'MSG']) {
                                        return (
                                            <Tooltip title={record[titles[i].id + 'MSG']}><i
                                                className="red">{text}</i></Tooltip>
                                        )
                                    } else {
                                        return text;
                                    }
                                }
                            }
                        }
                    )
                }
            } else if (columnsShow) {
                for (let j = 0; j < columnsShow.length; j++) {
                    $.each(titles, function (i, title) {
                        if (title.name == columnsShow[j]) {
                            columns.push({
                                title: title.name,
                                dataIndex: title.id,
                                width:150,
                                key: title.id,
                                render: (text, record) => {
                                    if (record[titles[i].id + 'MSG']) {
                                        return (
                                            <Tooltip title={record[titles[i].id + 'MSG']}><i className="red"> {text}</i></Tooltip>
                                        )
                                    } else {
                                        return text;
                                    }
                                }
                            });
                        }
                    });
                }
            }
            const rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                },
                onSelect: (record, selected, selectedRows) => {
                    console.log(record, selected, selectedRows);
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    console.log(selected, selectedRows, changeRows);
                },
                getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
                }),
            };
            let pagination={
                pageSize : 15,
                showQuickJumper:true ,
                defaultCurrent : 1,
                total :(attrList&& attrList.totalProperty)?attrList.totalProperty:0,
                showTotal:total => `共 ${total} 条记录`
            };
            return (
                <Table rowKey="UUID"
                       columns={columns}
                       dataSource={attrList.result.values}
                       pagination={pagination}
                       onChange={this.props.onChangePage}
                       scroll={{ x: true}}
                       className="md-data-ant-fixed-table table"
                />
            )
        } else {
            return null;
        }
    }
}