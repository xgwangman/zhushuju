import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';
import {SearchBox} from '../../../common/components/SearchBox';
import DomainElement from '../component/DomainElement';
import {requestDomainServiceList} from '../actions';
import {selectDomainServiceList} from '../selectors';
import {Link, router} from 'react-router';

export class DomainServerPage extends Component {
    constructor(props) {
        super(props);
       // this.props.requestDomainService();
    }

    render() {
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>服务管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="数据子集名称"/>
                </div>
                <div className="centerContent">
                    <Link to={encodeURI("service/task/taskEditFlow")}>编辑器</Link>
                    <DomainElement dataList={this.props.domainServiceList}>
                    </DomainElement>
                </div>
            </div>
        )
    }
}
/**
 *
 */
DomainServerPage.propTypes = {
    requestDomainService: React.PropTypes.func,
};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestDomainService: () => {
            dispatch(requestDomainServiceList(true));
        },
    };
}


const mapStateToProps = createStructuredSelector({
    domainServiceList: selectDomainServiceList(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(DomainServerPage);