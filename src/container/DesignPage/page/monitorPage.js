import React, {Component} from 'react';
import {Breadcrumb,Icon} from 'antd';
import {Link,hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import MonitorTable from '../component/MonitorTable'
import {SearchBox} from '../../../common/components/SearchBox';
import {
    requestMonitorList,requestSynch,requestCheck,
}from '../actions';
import {
    selectSetMonitorList,
}from '../selectors';

export class MonitorPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestMonitorList();
    }

    render() {

        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/design">监控明细</Link></Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent">
                    <MonitorTable
                        dataList={this.props.MonitorList}
                        requestSynch={this.props.requestSynch}
                        requestCheck={this.props.requestCheck}
                    />
                </div>
            </div>
        )
    }
}

MonitorPage.propTypes = {

};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestMonitorList:(evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestMonitorList(evt));
        },
        requestSynch:(evt)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(requestSynch(evt));
        },
        requestCheck:(evt)=> {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        dispatch(requestCheck(evt));
    },
    }
}
const mapStateToProps = createStructuredSelector({
    MonitorList:selectSetMonitorList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(MonitorPage);



