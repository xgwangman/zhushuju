import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

export default class CountBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="xp-tools mar-tb ft-18">
                <b>待审批情况</b>
                <span>实体<i className="red ft-24">10</i>个</span>
                <span>实体版本<i className="red ft-24">5</i>个</span>
                <span>采集任务<i className="red ft-24">10</i>个</span>
            </div>
        )
    }
}