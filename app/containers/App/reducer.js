/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_USER_PROFILE_REQUEST,
  LOAD_USER_PROFILE_SUCCESS,
  LOAD_USER_PROFILE_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isAuthenticated: false,
  isAuthenticating: true,
  isLoading: false,
  error: null,
  userProfile: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isLoading', true).set('isAuthenticating', true);
    case LOGIN_SUCCESS:
      return state
        .set('isLoading', false)
        .set('isAuthenticated', true)
        .set('isAuthenticating', false);
    case LOGIN_FAILURE:
      return state
        .set('isLoading', false)
        .set('isAuthenticated', false)
        .set('isAuthenticating', false)
        .set('error', action.error);
    case LOGOUT_REQUEST:
      return state.set('isLoading', true);
    case LOGOUT_SUCCESS:
      return initialState;
    case LOGOUT_FAILURE:
      return state.set('isLoading', false).set('isAuthenticated', false);
    case LOAD_USER_PROFILE_REQUEST:
      return state.set('isLoading', true);
    case LOAD_USER_PROFILE_SUCCESS:
      return state
        .set('isLoading', false)
        .set('userProfile', action.userProfile);
    case LOAD_USER_PROFILE_FAILURE:
      return state.set('isLoading', false).set('userProfile', null);
    default:
      return state;
  }
}

export default appReducer;
