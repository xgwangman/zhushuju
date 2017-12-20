import {Table, Spin, Button, Row, Col} from 'antd';
import React, {Component, PropTypes} from 'react';
import {Tooltip} from 'antd';
import reqwest from 'reqwest';

export default class CheckImportDataTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let attrList = this.props.uploadFilesData.result || [];
        let titles = attrList.titles;
        let showAll = this.props.showAllColumns;
        let columnsShow = this.props.columns || [];
        const params=this.props.params;
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
                total: this.props.uploadFilesData.totalProperty,
                showTotal: (total, range) => `共${total}条记录`,
                defaultCurrent: 1,
                showQuickJumper: true,
                pageSize: 12,
            };
            return (
                <div>
                    <Table rowKey="improtId"
                           columns={columns}
                           dataSource={attrList.values}
                           pagination={pagination}
                           // scroll={{x: 1500, y:600}}
                           onChange={(page)=>this.props.handleUploadPage({id: attrList.id, page: page.current,limit: page.pageSize})}
                           className="table tableMargin"/>
                    {(this.props.params.recordName == "undefined") ? (
                        <Row>
                            <Col span={6} offset={10}>
                                <Button key="submit" type="primary" size="large" style={{marginRight: "20px"}}
                                        onClick={(e)=>this.props.confirmImportData(attrList.id)}>确认</Button>
                                <Button key="cancel" type="primary" size="large"
                                        onClick={(e)=>this.props.handleCancel(attrList.id)}>取消</Button>
                            </Col>
                        </Row>
                    ) : null}

                </div>
            )
        } else {
            return null;
        }
    }
}