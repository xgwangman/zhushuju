/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import {
    fromJS
} from 'immutable';
import {
    combineReducers
} from 'redux-immutable';
import {
    LOCATION_CHANGE
} from 'react-router-redux';

import appReducer from './container/App/reducer';
import loginReducer from './container/LoginPage/reducer';
import integrationReducer from './container/IntegrationPage/reducer';
import domainReducer from './container/DomainPage/reducer';
import designReducer from './container/DesignPage/reducer';
import serviceReducer from './container/ServicePage/reducer';
import userMngReducer from './container/SysMngPage/UserMngPage/reducer';
import qualityReducer from './container/QualityPage/reducers';
import versionReducer from './container/VersionPage/reducers'


import {
    routerReducer
} from 'react-router-redux'
/*
 * routeReducer
 *合并创建immutable的reducer，创建immutable的状态树
 *
 */

// 初始化路由状态
const routeInitialState = fromJS({
    locationBeforeTransitions: null,
});

/**
 * 路由reducer
 */
function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return state.merge({
                locationBeforeTransitions: action.payload,
            });
        default:
            return state;
    }
}

/**
 * 创建
 */
export default function createReducer(asyncReducers) {
    return combineReducers({
        route: routeReducer,
        app: appReducer,
        login: loginReducer,
        domain: domainReducer,
        design: designReducer,
        integration: integrationReducer,
        service: serviceReducer,
        userMng: userMngReducer,
        quality: qualityReducer,
        version: versionReducer,
        ...asyncReducers,
    });
}