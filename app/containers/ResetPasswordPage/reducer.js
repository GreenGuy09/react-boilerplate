import { fromJS } from 'immutable';

import {
  CHANGE_FIELD,
  CONFIRM_CODE,
  SEND_CODE,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  CODE_SENT_SUCCESS,
  CODE_SENT_ERROR,
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
    case SEND_CODE:
      return state.set('isSendingCode', true);
    case CODE_SENT_SUCCESS:
      return state.set('codeSent', true);
    case CODE_SENT_ERROR:
      return state.set('isSendingCode', false);
    case CONFIRM_CODE:
      return state.set('isConfirming', true);
    case PASSWORD_RESET_SUCCESS:
      return state.set('confirmed', true);
    case PASSWORD_RESET_ERROR:
      return state.set('isConfirming', false);
    default:
      return state;
  }
}

export default resetPasswordReducer;
