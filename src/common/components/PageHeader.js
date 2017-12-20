import React, {Component} from 'react';
require("../../../css/DomainPageCss.css");
import {Link, browserHistory} from 'react-router';
import {SearchBox} from '../../common/components/SearchBox';
export class PageHeader extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {

        headerText: React.PropTypes.object
    };

    render() {
        let header = this.props.headerText ? this.props.headerText.header : '';
        let placeHolder = this.props.headerText ? this.props.headerText.placeHolder : null;
        if (placeHolder) {//如果配置有placeHolder则渲染SearchBox。
            return (
                <div className="xp-header ret">
                    <h4>{header}</h4>
                    <SearchBox placeholder={placeHolder}/>
                </div>
            )
        } else { //如果没有配置placeHolder则不渲染SearchBox。
            return (
                <div className="xp-header ret">
                    <h4>{header}</h4>
                </div>
            )
        }
    }
}