/**
 * Created by Administrator on 2017-4-1.
 */
//提示框统一配置
import React, {Component, PropTypes} from 'react';
import Alert from 'react-s-alert';
import {Modal} from 'react-bootstrap'

export default alert = (message, type)=> {
    let options = {position: 'top', effect: 'stackslide', beep: false, timeout: 1000};
    Alert.closeAll();
    switch (type) {
        case 'success':
            Alert.success((<div className="text-center">{message}</div>), options);
            break;
        case 'error':
            options.position = 'top';
            options.timeout = 1500;
            Alert.error((<div className="text-center">{message}</div>), options);
            break;
        default:
            Alert.info(message, options);
    }
}
