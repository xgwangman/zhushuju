/**
 * Created by Administrator on 2017/6/20.
 */
import 'antd/dist/antd.css';
require("antd/dist/antd.css");
import {Table, Button, Switch, Icon, Tooltip,Popconfirm} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import moment from 'moment';

export  default class   RuleTable extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const data=this.props.ruleList|| [];
        const columns = [
            {key:'name',title: '名称', dataIndex: 'name'},
            {key:'modelName',title: '数据类名称', dataIndex: 'modelName'},
            {key:'entityName',title: '实体名称', dataIndex: 'entityName'},
            {key: 'attName', title: '属性名称', dataIndex: 'attName'},
            {key: 'ruleContext', title: '规则', dataIndex: 'ruleContext',
                render: (text, record, index) => {
                    let itemObj={},objArr='';
                    var textArr=JSON.parse(text)||[];
                    textArr.map(function (item,index) {
                        itemObj=JSON.parse(item);
                        if(itemObj.type.substring(0,6)=="plugin"&&itemObj.type!="plugin-null"&&itemObj.type!="plugin-unique"){
                            if(itemObj.name=="日期范围校验"){
                                itemObj.value.min =moment(itemObj.value.min).format("YYYY-MM-DD");
                                itemObj.value.max =moment(itemObj.value.max).format("YYYY-MM-DD");
                                objArr+=itemObj.name+'('+itemObj.value.min+'~' +itemObj.value.max+')'+'，';
                            }else if(itemObj.name=="长度校验"){
                                objArr+=itemObj.name+'('+itemObj.value.min+'~' +itemObj.value.max+')'+'，';
                            }else if(itemObj.name=="正则表达式"){
                                objArr+=itemObj.name+'('+itemObj.value.name+')'+'，';
                            }else{
                                objArr+=itemObj.name+'('+itemObj.value+')'+'，';
                            }
                        }else {
                            objArr+=itemObj.name+'，';
                        }
                    });
                    return (<span>{objArr}</span>);
                }
            },
            {key: 'remark', title: '描述', dataIndex: 'remark'},
            { key: 'status',
              title: '禁用/启用',
              dataIndex: 'status',
              render: (text, record, index) => {
                    if (text == "0"||text=="-1") {
                        text = false;
                    } else {
                        text = true;
                    }
                    return (<Switch defaultChecked={text} onChange={(e)=>this.props.onChangeStatusR(e, record)}/>)
              }
            },

            {
                key: 'edit',
                title: '操作',
                dataIndex: 'edit',
                width: 150,
                render: (text, record, index) =>
                    <div>
                        <Link to={encodeURI('addRulePage/'+this.props.domainId+'/'+this.props.domainName)}>
                             <Tooltip title="编辑">
                                <Icon type="edit" className="table-edit" onClick={(e) => this.props.onEdtiorRule(e,record)}/>
                            </Tooltip>
                        </Link>
                        <span className="ant-divider"/>

                        <Tooltip title="删除">
                            <Icon type="delete" className="table-dele"
                                  onClick={(e) => this.props.deleteRule(e,record)}/>
                        </Tooltip>
                    </div>
            },
        ];
        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(data&& data.totalProperty)?data.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };
        return(
            <Table columns={columns}
                   dataSource={data.result}
                   pagination={pagination}
                   onChange={this.onChangePage}
                   rowKey="id"
            />
        )
    }
    onChangePage=(page)=>{
        //通过if判断是查询列表还是规则列表
        const ruleLike=this.props.ruleLike;
        if(ruleLike==null){
            this.props.rulePageData({
                page:page.current,
                limit:page.pageSize,
            });
        }else{
            this.props.searchRulePageData({
                page:page.current,
                limit:page.pageSize,
            });
        }


    };
}
