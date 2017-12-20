import { fromJS } from 'immutable';
import {
    IS_ADMIN,
} from './constants';
// The initial state of the App
const initialState = fromJS({
    isAuth:false,
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case IS_ADMIN:
            return state
                .set('isAuth', action.isAuth );
        default:
            return state;
    }
}

export default appReducer;
