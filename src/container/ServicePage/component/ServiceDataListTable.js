import {Table} from 'antd';
import React, {Component, PropTypes} from 'react';
import '../../../../css/DomainPageCss.css';

export default class ServiceDataListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var titles;
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
                            key: titles[i].id,
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
                            });
                        }
                    });
                }
            }
            let pagination={
                pageSize : 15,
                showQuickJumper:true ,
                defaultCurrent : 1,
                total :(attrList&& attrList.totalProperty)?attrList.totalProperty:0,
                showTotal:total => `共 ${total} 条记录`
            };
            return (
                <Table rowKey="SSID"
                       columns={columns}
                       dataSource={attrList.result.values}
                       pagination={pagination}
                       onChange={this.onChangePage}
                       scroll={{ x: '150%'}}
                       className="md-data-ant-fixed-table table"
                />
            )
        } else {
            return null;
        }

    }
    //分页
    onChangePage=(page)=>{
        let taskId = this.props.taskId;
        this.props.requestShareData({
             taskId:taskId,
             page:page.current,
             limit:page.pageSize,
        });
    };
}