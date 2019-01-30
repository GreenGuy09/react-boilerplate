/*
 * SignUp Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_CONFIRM_PASSWORD,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  CHANGE_CONFIRMATION_CODE,
  CONFIRM_SIGN_UP_REQUEST,
  CONFIRM_SIGN_UP_SUCCESS,
  SIGN_UP_VALIDATED,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {email} email The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_EMAIL
 */
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {password} password The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_PASSWORD
 */
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {confirmPassword} confirmPassword The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_PASSWORD
 */
export function changeConfirmPassword(confirmPassword) {
  return {
    type: CHANGE_CONFIRM_PASSWORD,
    confirmPassword,
  };
}

export function signUp() {
  return {
    type: SIGN_UP_REQUEST,
  };
}

export function signUpSuccess(newUser) {
  return {
    type: SIGN_UP_SUCCESS,
    newUser,
  };
}

export function signUpError(message) {
  return {
    type: SIGN_UP_ERROR,
    message,
  };
}

export function changeConfirmationCode(confirmationCode) {
  return {
    type: CHANGE_CONFIRMATION_CODE,
    confirmationCode,
  };
}

export function confirmSignUp() {
  return {
    type: CONFIRM_SIGN_UP_REQUEST,
  };
}

export function confirmSignUpSuccess() {
  return {
    type: CONFIRM_SIGN_UP_SUCCESS,
  };
}

export function confirmSignUpError(message) {
  return {
    type: CONFIRM_SIGN_UP_SUCCESS,
    message,
  };
}

export function signUpValidated() {
  return {
    type: SIGN_UP_VALIDATED,
  };
}
