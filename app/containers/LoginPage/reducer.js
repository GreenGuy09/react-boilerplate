/*
 * LoginReducer
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
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_HAS_AUTHENTICATED,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  isAuthenticated: false,
  isAuthenticating: true,
  isLoading: false,
  error: false,
  email: '',
  password: '',
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state.set('email', action.email);
    case CHANGE_PASSWORD:
      return state.set('password', action.password);
    case USER_LOGIN:
      return state.set('isLoading', true).set('isAuthenticating', true);
    case USER_HAS_AUTHENTICATED:
      return state
        .set('isLoading', false)
        .set('isAuthenticated', action.authenticated)
        .set('isAuthenticating', false);
    case USER_LOGIN_ERROR:
      return state.set('isLoading', false).set('isAuthenticated', false);
    case USER_LOGOUT:
      return state.set('isLoading', true);
    case USER_LOGOUT_SUCCESS:
      return state.set('isLoading', false).set('isAuthenticated', false);
    default:
      return state;
  }
}

export default loginReducer;
