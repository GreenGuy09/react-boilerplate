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

import { CHANGE_EMAIL, CHANGE_PASSWORD, LOGIN_VALIDATED } from './constants';
import { LOGIN_SUCCESS } from '../App/constants';

// The initial state of the App
export const initialState = fromJS({
  email: '',
  password: '',
  validated: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state.set('email', action.email);
    case CHANGE_PASSWORD:
      return state.set('password', action.password);
    case LOGIN_SUCCESS:
      return initialState;
    case LOGIN_VALIDATED:
      return state.set('validated', true);
    default:
      return state;
  }
}

export default loginReducer;
