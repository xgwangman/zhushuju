/**
 * selectors
 */

import {
  createSelector
} from 'reselect';

const selectNav = () => (state) => state.get('Nav');

const selectUsernameList = () => createSelector(
		selectNav(),
  (state) => state.get('userNameList')
);
const selectUsername = () => createSelector(
		selectNav(),
  (state) => state.get('userName')
);
const selectPassword = () => createSelector(
		selectNav(),
  (state) => state.get('password')
);
const selectUserId = () => createSelector(
		selectNav(),
  (state) => state.get('userId')
);
const selectError = () => createSelector(
		selectNav(),
  (state) => state.get('error')
);
const selectAUserName = () => createSelector(
		selectNav(),
  (state) => state.get('AuserName')
);
const selectAPassword = () => createSelector(
		selectNav(),
  (state) => state.get('Apassword')
);
const selectNewPassword = () => createSelector(
		selectNav(),
  (state) => state.get('newPassword')
);
const selectNewName = () => createSelector(
		selectNav(),
  (state) => state.get('newName')
);

export {
    selectUsernameList,
    selectUsername,
    selectPassword,
    selectUserId,
    selectError,
    selectAUserName,
    selectAPassword,
    selectNewPassword,
    selectNewName
};