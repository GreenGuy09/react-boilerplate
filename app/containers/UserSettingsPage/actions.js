import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_OLD_PASSWORD,
  CHANGE_NEW_PASSWORD,
  CHANGE_CONFIRM_PASSWORD,
  CHANGE_PASSWORD_VALIDATED,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from './constants';

export function changePassword() {
  return {
    type: CHANGE_PASSWORD_REQUEST,
  };
}

export function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
}

export function changePasswordFailure(error) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    error,
  };
}

export function changeOldPassword(oldPassword) {
  return {
    type: CHANGE_OLD_PASSWORD,
    oldPassword,
  };
}

export function changeNewPassword(newPassword) {
  return {
    type: CHANGE_NEW_PASSWORD,
    newPassword,
  };
}

export function changeConfirmPassword(confirmPassword) {
  return {
    type: CHANGE_CONFIRM_PASSWORD,
    confirmPassword,
  };
}

export function changePasswordValidated() {
  return {
    type: CHANGE_PASSWORD_VALIDATED,
  };
}
