/**
 * LoadingButton.react.js
 *
 * Wraps the loading indicator in a tag with the .btn--loading class
 */

import React, { Component, } from 'react';

export default class LoadingButton extends Component {
    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary btnloading" data-loading-text="Loading...">请 稍 后. . .</button>
            </div>
        )
    }
}
