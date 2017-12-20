import {Table, Spin} from 'antd';
import React, {Component, PropTypes} from 'react';
import {Tooltip} from 'antd';

export default class EntityCheckListTable extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let attrList = this.props.dataList || [];
        let titles = attrList.titles;
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
                            key: titles[i].id,
                            width: 150,
                            render: (text, record) => {
                                if (record[titles[i].id + 'MSG']) {
                                    return (
                                        <Tooltip title={record[titles[i].id + 'MSG']}><i className="red"> {text}</i></Tooltip>
                                    )
                                } else {
                                    return text;
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
                                key: title.id,
                                width: 150,
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
            const  pagination={
                total: attrList.totalProperty,
                showTotal: (total, range) => `共${total}条记录`,
                defaultCurrent: 1,
                showQuickJumper: true,
                pageSize: 10,
            };
            return (
                    <Table rowKey="versionID"
                           columns={columns}
                           dataSource={attrList.values}
                           pagination={pagination}
                           onChange={(page)=>this.props.getMemberDataPage({id: this.props.params,page: page.current,limit: page.pageSize})}
                           className="table"/>
            )
        } else {
            return null;
        }
    }
}