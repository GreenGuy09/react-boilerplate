import {
  CHANGE_FIELD,
  CONFIRM_CODE,
  SEND_CODE,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  CODE_SENT_SUCCESS,
  CODE_SENT_ERROR,
} from './constants';

export function changeField(id, value) {
  return {
    type: CHANGE_FIELD,
    field: {
      id,
      value,
    },
  };
}

export function sendCode() {
  return {
    type: SEND_CODE,
  };
}

export function codeSentSuccess() {
  return {
    type: CODE_SENT_SUCCESS,
  };
}

export function codeSentError(message) {
  return {
    type: CODE_SENT_ERROR,
    message,
  };
}

export function confirmCode() {
  return {
    type: CONFIRM_CODE,
  };
}

export function passwordResetSuccess() {
  return {
    type: PASSWORD_RESET_SUCCESS,
  };
}

export function passwordResetError(error) {
  return {
    type: PASSWORD_RESET_ERROR,
    error,
  };
}
