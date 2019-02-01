import { fromJS } from 'immutable';

import {
  CHANGE_OLD_PASSWORD,
  CHANGE_NEW_PASSWORD,
  CHANGE_CONFIRM_PASSWORD,
  CHANGE_PASSWORD_VALIDATED,
} from './constants';

export const initialState = fromJS({
  validated: false,
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_OLD_PASSWORD:
      return state.set('oldPassword', action.oldPassword);
    case CHANGE_NEW_PASSWORD:
      return state.set('newPassword', action.newPassword);
    case CHANGE_CONFIRM_PASSWORD:
      return state.set('confirmPassword', action.confirmPassword);
    case CHANGE_PASSWORD_VALIDATED:
      return state.set('validated', true);
    default:
      return state;
  }
}

export default changePasswordReducer;
