/*
 * App Actions
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
  LOAD_USER_PROFILE_REQUEST,
  LOAD_USER_PROFILE_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './constants';

export function loadUserProfile() {
  return {
    type: LOAD_USER_PROFILE_REQUEST,
  };
}

export function userProfileLoaded(userProfile) {
  return {
    type: LOAD_USER_PROFILE_SUCCESS,
    userProfile,
  };
}

export function login() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function logout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
  };
}
