/**
 * selectors
 */

import { createSelector } from 'reselect';

const selectApp= () => (state) => state.get('app');

const selectIsAdmin = () => createSelector(
    selectApp(),
  (state) => state.get('isAuth')
);


const selectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectLocationState,
    selectIsAdmin,
};
