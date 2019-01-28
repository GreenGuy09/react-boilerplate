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
  USER_SIGN_UP,
  USER_HAS_SIGNED_UP,
  USER_SIGN_UP_ERROR,
  CHANGE_CONFIRMATION_CODE,
  USER_CONFIRM_SIGN_UP,
  USER_HAS_CONFIRMED_SIGN_UP,
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
    type: USER_SIGN_UP,
  };
}

export function userHasSignedUp(newUser) {
  return {
    type: USER_HAS_SIGNED_UP,
    newUser,
  };
}

export function signUpError(message) {
  return {
    type: USER_SIGN_UP_ERROR,
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
    type: USER_CONFIRM_SIGN_UP,
  };
}

export function userHasConfirmedSignUp() {
  return {
    type: USER_HAS_CONFIRMED_SIGN_UP,
  };
}
