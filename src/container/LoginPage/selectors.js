import {createSelector} from 'reselect';

const selectLogin = () => (state) => state.get('login');

const selectIsCheckRemember = () => createSelector(
  selectLogin(),
  (state) => state.get('checkRemember')
);

const selectIsSending = () => createSelector(
  selectLogin(),
  (state) => state.get('currentlySending')
);
const selectError = () => createSelector(
  selectLogin(),
  (state) => state.get('error')
);
const selectIsAdmin = () => createSelector(
  selectLogin(),
  (state) => state.get('isAuth')
);

export {
  selectIsCheckRemember,
  selectIsSending,
  selectError,
  selectIsAdmin,
};