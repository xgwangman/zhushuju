/*
 */
import {
    IS_ADMIN,

} from './constants';
export function changeIsAdmin(isAuth) {
  return {
    type: IS_ADMIN,
      isAuth,
  };
}

