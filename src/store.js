/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
// import { getAsyncInjectors } from './utils/asyncInjectors';

import {
  loginSaga,
    domainSaga,
    designSaga,
    serviceSaga,
    integrationSaga,
    userMngPageSaga,
    qualityPageSaga,
    versionPageSaga
} from './sagas';
const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => (noop) => noop);

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ];

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }
 //注入saga
  store.runSaga(loginSaga);
  store.runSaga(domainSaga);
  store.runSaga(designSaga);
  store.runSaga(serviceSaga);
  store.runSaga(integrationSaga);
  store.runSaga(userMngPageSaga);
  store.runSaga(qualityPageSaga);
  store.runSaga(versionPageSaga);
  return store;
}