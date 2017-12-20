require("../../../css/login/style.css");
require("../../../css/login/font-awesome.min-3.2.1.css");
import React, {Component, PropTypes} from 'react';
import {selectIsAdmin} from './selectors';
import {push} from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {NavBarComponent} from '../../common/components/NavBarComponent';
import {Navigation} from '../../common/components/Navigation';
export class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let path=this.props.routes[1].path;
        return (
            <div>
                <NavBarComponent path={path.split('/')[0]}></NavBarComponent>
                <div className="hm-right-box">
                    <div className="tab-content">{this.props.children}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isAdmin: selectIsAdmin(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);