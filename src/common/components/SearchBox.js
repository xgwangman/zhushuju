import React, {Component} from 'react';
require("../../../css/PageHeader.css");

export class SearchBox extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="xp-search">
                <input type="text"
                       placeholder={this.props.placeholder}
                       onChange={this.props.onChange}
                >
                </input>
                <span className="pull-right"></span>
            </div>
        )
    }
}