require("../../../../css/DomainPageCss.css");
require("antd/dist/antd.css");
import React, {Component, PropTypes} from 'react';

export default class BasicInformation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let record = this.props.params;
        return (
            <div>
                <h1 style={{marginTop: '20px'}}>基本信息</h1>
                <hr id="informationShow" className="hr" style={{margin: '10 0 30 0'}}></hr>
                <p style={{fontSize: '14px', margin: '5 0 10 40'}}>名称： {record.srcName}</p>
                <p style={{fontSize: '14px', margin: '5 0 10 40'}}>类别： {record.srcType}</p>
                <p style={{fontSize: '14px', margin: '5 0 10 40'}}>注释： {record.srcRemark}</p>
            </div>
        )
    }
}