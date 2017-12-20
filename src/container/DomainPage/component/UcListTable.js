require("../../../../css/DomainPageCss.css");
require("antd/dist/antd.css");
import {Table, Icon, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';


export default class UcListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
            let ucList = this.props.dataList || [];
            let columns= [
            {title: '属性名称', dataIndex: 'attributeName', width: 100, key: 'attributeName'},
            {title: '属性', dataIndex: 'attribute', key: 'attribute', width: 150,},
            {title: 'U(统计)', dataIndex: 'UNum', width: 150, key: 'UNum',},
            {title: 'C(统计)', dataIndex: 'CNum', width: 150, key: 'CNum',},
        ];
        if(ucList){
            for(let i=0;i<ucList.length;i++){
                columns.push({
                    title: ucList[i].title,
                    dataIndex: ucList[i].dataIndex,
                    key: ucList[i].key,
                    width:ucList[i].width,
                })
            }
        };


        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(ucList&& ucList.totalProperty)?ucList.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };

        return (
            <div>
                <Table  columns={columns}
                        dataSource={[]}
                        pagination={pagination}
                        onChange={this.onChangePage}
                        rowKey="id"
                />
            </div>
        )
    }
    //分页
    onChangePage=(page)=>{
        this.props.requestUcList({
            page:page.current,
            limit:page.pageSize,
        });

    };
}