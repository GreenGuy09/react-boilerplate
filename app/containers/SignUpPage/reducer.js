/*
 * SignUpReducer
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
  USER_SIGN_UP,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_ERROR,
  CHANGE_CONFIRM_PASSWORD,
  CHANGE_CONFIRMATION_CODE,
  USER_CONFIRM_SIGN_UP,
  USER_CONFIRM_SIGN_UP_SUCCESS,
  USER_CONFIRM_SIGN_UP_ERROR,
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  email: '',
  password: '',
  confirmPassword: '',
  newUser: null,
  confirmationCode: '',
});

function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state.set('email', action.email);
    case CHANGE_PASSWORD:
      return state.set('password', action.password);
    case CHANGE_CONFIRM_PASSWORD:
      return state.set('confirmPassword', action.confirmPassword);
    case USER_SIGN_UP:
      return state.set('isLoading', true);
    case USER_SIGN_UP_SUCCESS:
      return state.set('isLoading', false).set('newUser', action.newUser);
    case USER_SIGN_UP_ERROR:
      return state
        .set('isLoading', false)
        .set('newUser', null)
        .set('error', action.message);
    case CHANGE_CONFIRMATION_CODE:
      return state.set('confirmationCode', action.confirmationCode);
    case USER_CONFIRM_SIGN_UP:
      return state.set('isLoading', false).set('newUser', null);
    case USER_CONFIRM_SIGN_UP_SUCCESS:
      return state.set('isLoading', false);
    case USER_CONFIRM_SIGN_UP_ERROR:
      return state.set('isLoading', false);
    default:
      return state;
  }
}

export default signUpReducer;
