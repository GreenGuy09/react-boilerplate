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
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  CHANGE_CONFIRM_PASSWORD,
  CHANGE_CONFIRMATION_CODE,
  CONFIRM_SIGN_UP_REQUEST,
  CONFIRM_SIGN_UP_SUCCESS,
  CONFIRM_SIGN_UP_FAILURE,
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
    case SIGN_UP_REQUEST:
      return state.set('isLoading', true);
    case SIGN_UP_SUCCESS:
      return state.set('isLoading', false).set('newUser', action.newUser);
    case SIGN_UP_ERROR:
      return state
        .set('isLoading', false)
        .set('newUser', null)
        .set('error', action.message)
        .set('email', '')
        .set('password', '')
        .set('confirmPassword', '');
    case CHANGE_CONFIRMATION_CODE:
      return state.set('confirmationCode', action.confirmationCode);
    case CONFIRM_SIGN_UP_REQUEST:
      return state.set('isLoading', true).set('newUser', null);
    case CONFIRM_SIGN_UP_SUCCESS:
      return state
        .set('isLoading', false)
        .set('email', '')
        .set('password', '')
        .set('confirmPassword', '');
    case CONFIRM_SIGN_UP_FAILURE:
      return state
        .set('isLoading', false)
        .set('email', null)
        .set('password', null);
    default:
      return state;
  }
}

export default signUpReducer;
