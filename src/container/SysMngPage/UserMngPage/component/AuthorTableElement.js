/**
 * Created by Administrator on 2017/5/8.
 */
import React, {Component} from 'react';
import {Table,Button} from 'antd';
export default class AuthorTableElement extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedRowKeys:[],
            selectedRows:[],
            isFlush:true
        }
    };
    componentDidUpdate(){
        var authorList=this.props.authorList,temp=[];
        if(authorList instanceof Array && authorList.length>0 && this.state.isFlush){
            authorList.map(function (item,index) {
                item.authFlag==1?temp.push(item.id):''
            });
            this.setState({selectedRowKeys:temp,isFlush:false});
        }
    };

    render(){
        var arrUrls=this.state.selectedRows;
        var data=this.props.authorList||[];
        const columns = [
            { key:'modelName', title: '模块', dataIndex: 'modelName', width:100},
            { key: 'name', title:'菜单名称', dataIndex: 'name', width:150},
            { key: 'url', title: 'URL', dataIndex: 'url', width: 150},
            { key: 'remark', title: '描述', dataIndex: 'remark', width: 150},
        ];
        var rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            selectedRows:this.state.selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selectedRowKeys:selectedRowKeys});
                this.setState({selectedRows:selectedRows});
                for(var i=0;i<selectedRows.length;i++){
                    selectedRows[i]=selectedRows[i].url;
                }
            },
        };
        return (
            <div className="xp-list">
                <div>
                    <button type="button" className="btn-css"
                                onClick={(e) => this.props.saveAuthor(e,arrUrls)}>
                            保存
                    </button>
                </div>
                <div>
                    <Table columns={columns} dataSource={data} rowSelection={rowSelection}
                           pagination={false} rowKey="id"
                    />
                </div>
            </div>
        )
    }
}