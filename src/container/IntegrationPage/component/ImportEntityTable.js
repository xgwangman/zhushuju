/**
 * Created by Administrator on 2017/8/4.
 */
import {Table, Switch, Icon, Tooltip} from 'antd';
import React, {Component} from 'react';

export default class ImportEntityTable extends Component {
    constructor(props){
        super(props);
    }

    render () {
        let importData = this.props.getImportEntityData || [];
        const columns = [
            {title: '名称', dataIndex: 'name', key: 'name',width: '200px'},
            {title: '属性', key: 'attributeNum',
                render : (text,record) => {
                    return (
                        <span>
                            {text.attributeNum}
                        </span>
                    )
                }
            },
            {title: '数据量', key: 'dataNum',
                render : (text,record) => {
                    return (
                        <span>
                            {text.dataNum}
                        </span>
                    )
                }
            },
            {title: '变动数据',key: 'dataGatherNum',
                render : (text, record) => {
                    return (
                        <div>
                            <span>{text.dataGatherNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style={{color: '#FF0000'}}>{text.dataGatherErrorNum}</span>
                        </div>
                    )
                }
            },
            {title: '状态', dataIndex: 'status', key: 'status',
                render : (text, record) => {
                    if(text == 1){
                        text = true;
                    } else if (text == -1) {
                        text = false;
                    } else{
                        text = false;
                    }
                    return <Switch checked={text}/>
                }
            },
            {title: '下载模板', key: 'address', dataIndex: 'status',
                render : (text, record) => {
                    if(text == 1) {
                        return (
                            <Tooltip title="下载">
                                <Icon type="cloud-download-o" className='down-edit'
                                      onClick={(e)=>{this.props.downloadEntityData(e,record)}}
                                />
                            </Tooltip>
                        )
                    }else{
                        return (
                                <Icon type="cloud-download-o" className='downEdit'/>
                        )
                    }
                }
            },
            {title: '导入', key: 'add', dataIndex: 'status',
                render : (text, record) => {
                    if(text == 1){
                        return (
                            <Tooltip title="导入">
                                <Icon type="cloud-upload-o" className='upload-edit'
                                      onClick={(e)=>{this.props.importAppData(e,record)}}/>
                            </Tooltip>
                        )
                    }else{
                        return (
                            <Icon type="cloud-upload-o" className='uploadEdit'/>
                        )
                    }
                }
            }
        ]
        const pagination = {
            total: this.props.getImportEntityData.totalProperty,
            showTotal: (total, range) => `共${total}条记录`,
            defaultCurrent: 1,
            showQuickJumper: true,
            pageSize: 13,
        }
        return (
            <Table
                rowKey="importID"
                columns={columns}
                dataSource={importData.result}
                pagination={pagination}
                onChange={(page) => this.props.importEntityData({page: page.current, limit: page.pageSize, nameLike: this.props.nameLike})}
            />
        )
    }
}
