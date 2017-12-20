import {Table, Spin} from 'antd';
import React, {Component, PropTypes} from 'react';

export default class EntityCheckListTable extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let attrList = this.props.versionData;
        let titles = attrList?attrList.result.titles:[];
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
                            render: (text, record) => {
                                return text;
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
                                    return text;
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
                pageSize: 15,
            };
            return (
                <Table rowKey="versionID"
                       columns={columns}
                       dataSource={attrList?attrList.result.values:[]}
                       pagination={pagination}
                       scroll={{x: '200%'}}
                       onChange={(page)=>this.props.filterVersionData({versionId:this.props.params.versionId,page: page.current,limit: page.pageSize})}
                       />
            )
        } else {
            return null;
        }
    }
}