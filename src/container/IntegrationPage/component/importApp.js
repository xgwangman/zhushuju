/**
 * Created by Administrator on 2017/8/7.
 */
import {Form, Modal, Input, Button, Row, Col, Icon, Upload} from 'antd';
import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import reqwest from 'reqwest';
const FormItem = Form.Item;

export class ImportApp extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        fileList: [],
        uploading: false,
        fileName: ''
    }
    handleUpload = () => {
        let importId = this.props.importAppId;
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
        });

        this.setState({
            uploading: true,
        });
        reqwest({
            url: 'ign/md/import/importEntityData.do'+ '?id=' + importId.id,
            method: 'post',
            processData: false,
            data: formData,
            success: (data) => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                if(data && data.resultCode == 1){
                    this.props.hide();
                    hashHistory.push(encodeURI('importMasterData/checkImportData/'+ data.result.id +'/'+ data.result.createName));
                    alert('上传文件成功！', 'success')
                }else{
                    alert(data.resultText, 'error');
                }
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                alert('请求失败！', 'error');
            }
        });
        // this.props.form.resetFields();
    }

    render () {
        const formItemLayout = {
            labelCol: {
                xs: {span: 20},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        const { uploading } = this.state;
        const props = {
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                this.setState({fileName: file.name})
                return false;
            },
        };

        return (
            <Modal key={this.props.modalKey} title="导入" visible={this.props.show}
                   style={{ top: 300 }}
                   onCancel={this.props.hide}
                   footer={[
                       <Button key="back" type="primary" size="large" onClick={this.props.hide}>取消</Button>,
                       <Button key="submit"
                               type='primary'
                               size="large"
                               disabled={this.state.fileList.length === 0}
                               loading={uploading}
                               onClick={this.handleUpload}
                       >上传
                       </Button>
                   ]}
            >
                <Form>
                    <FormItem {...formItemLayout} label="文件" style={{marginTop: 18}}>
                        <Row>
                            <Col span={20}>
                                <Input type="text" value={this.state.fileName}/>
                            </Col>
                            <Col span={3} offset={1}>
                                <Upload {...props}>
                                    <Button key="small" type="primary" size="small" style={{marginTop: "4px"}}>浏览</Button>
                                </Upload>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>

            </Modal>
        )
    }
}
const ImportAppForm = Form.create()(ImportApp);
export default ImportAppForm;