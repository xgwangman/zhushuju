import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {SearchBox} from '../../../common/components/SearchBox';
import MonitorFieldTable from '../component/MonitorFieldTable';
import {
    selectSetMonitorDataList,
}from '../selectors'


export class MoniFieldsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/monitorPage">{this.props.params.entityName}</Link>
                            /监控字段明细
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent">
                    <MonitorFieldTable/>
                </div>
            </div>
        )
    }
}

MoniFieldsPage.propTypes = {

};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,

    }
}
const mapStateToProps = createStructuredSelector({
    dataList:selectSetMonitorDataList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoniFieldsPage);



