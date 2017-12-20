import React, {Component} from 'react';
import {Breadcrumb,Icon} from 'antd';
import {Link,hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';


import {SearchBox} from '../../../common/components/SearchBox';

export class ucDataPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>查看UC矩阵信息</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="实体名称"/>
                </div>
                <div className="centerContent">
                    <p>
                        查看UC矩阵信息
                    </p>
                </div>
            </div>
        )
    }
}

ucDataPage.propTypes = {

};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,

    }
}
const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps, mapDispatchToProps)(ucDataPage);



