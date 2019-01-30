import { fromJS } from 'immutable';

import {
  CHANGE_FIELD,
  CONFIRM_CODE_REQUEST,
  SEND_CODE_REQUEST,
  CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_FAILURE,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILURE,
} from './constants';

export const initialState = fromJS({
  code: '',
  email: '',
  password: '',
  codeSent: false,
  confirmed: false,
  isConfirming: false,
  isSendingCode: false,
});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD:
      return state.set(action.field.id, action.field.value);
    case SEND_CODE_REQUEST:
      return state.set('isSendingCode', true);
    case SEND_CODE_SUCCESS:
      return state.set('codeSent', true);
    case SEND_CODE_FAILURE:
      return state.set('isSendingCode', false);
    case CONFIRM_CODE_REQUEST:
      return state.set('isConfirming', true);
    case CONFIRM_CODE_SUCCESS:
      return initialState;
    case CONFIRM_CODE_FAILURE:
      return state
        .set('isConfirming', false)
        .set('code', null)
        .set('email', null)
        .set('password', null)
        .set('confirmPassword', null);
    default:
      return state;
  }
}

export default resetPasswordReducer;
