/*
 * Login Actions
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
  USER_LOGIN,
  USER_HAS_AUTHENTICATED,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_SUCCESS,
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

export function login() {
  return {
    type: USER_LOGIN,
  };
}

export function userHasAuthenticated(authenticated) {
  return {
    type: USER_HAS_AUTHENTICATED,
    authenticated,
  };
}

export function loginFailed(error) {
  return {
    type: USER_LOGIN_ERROR,
    error,
  };
}

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}

export function logoutSucceeded() {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
}

export function logoutFailed(error) {
  return {
    type: USER_LOGOUT_ERROR,
    error,
  };
}
