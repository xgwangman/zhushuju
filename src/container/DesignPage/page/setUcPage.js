import React, {Component} from 'react';
import {Breadcrumb,Icon} from 'antd';
import {Link,hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';


import {SearchBox} from '../../../common/components/SearchBox';

export class SetUcPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item>设置UC矩阵</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="实体名称"/>
                </div>
                <div className="centerContent">
                    <p>
                        设置UC矩阵
                    </p>
                </div>
            </div>
        )
    }
}

SetUcPage.propTypes = {

};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,

    }
}
const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps, mapDispatchToProps)(SetUcPage);



