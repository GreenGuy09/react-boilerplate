import {
  CHANGE_FIELD,
  CONFIRM_CODE_REQUEST,
  SEND_CODE_REQUEST,
  CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_FAILURE,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILURE,
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
    type: SEND_CODE_REQUEST,
  };
}

export function codeSentSuccess() {
  return {
    type: SEND_CODE_SUCCESS,
  };
}

export function codeSentError(message) {
  return {
    type: SEND_CODE_FAILURE,
    message,
  };
}

export function confirmCode() {
  return {
    type: CONFIRM_CODE_REQUEST,
  };
}

export function passwordResetSuccess() {
  return {
    type: CONFIRM_CODE_SUCCESS,
  };
}

export function passwordResetError(error) {
  return {
    type: CONFIRM_CODE_FAILURE,
    error,
  };
}
