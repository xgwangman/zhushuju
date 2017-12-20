/**
 * Created by Administrator on 2017/5/12.
 */
import {Table} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import {Tooltip} from 'antd';


export default class VersionDataListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let attrList = this.props.dataList ? this.props.dataList.result : [];
        let titles = attrList.titles;
        let showAll = this.props.showAllColumns;
        let columnsShow = this.props.columns || [];
        const columns = [];
        let pagination={pageSize : 15, showQuickJumper:true , defaultCurrent : 1,
            total :this.props.dataList ? this.props.dataList.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`};
        if (titles) {
            if (showAll) {
                for (let i = 0; i < titles.length; i++) {
                    columns.push(
                        {
                            title: titles[i].name,
                            dataIndex: titles[i].id,
                            key: titles[i].id,
                            render: (text, record) => {
                                return (
                                    <a href="#"
                                       onClick={(e)=>this.props.clickToRequestApprovalRecord(e, titles[i].id, record)}>{text}</a>
                                )
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
            return (
                <Table rowKey="UUID" columns={columns} dataSource={attrList.values}
                       pagination={pagination}
                       scroll={{ x: '200%'}}
                       onChange={this.props.onPageChange()}
                       />
            )
        } else {
            return null;
        }

    }
}