/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

export loginSaga from './container/LoginPage/sagas';
export domainSaga from './container/DomainPage/sagas';
export designSaga from './container/DesignPage/sagas';
export serviceSaga from './container/ServicePage/sagas';
export integrationSaga from './container/IntegrationPage/sagas';
export userMngPageSaga from './container/SysMngPage/UserMngPage/sagas';
export qualityPageSaga from './container/QualityPage/sagas';
export versionPageSaga from './container/VersionPage/sagas'

