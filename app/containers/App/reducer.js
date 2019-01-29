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

import { LOAD_USER_PROFILE, LOAD_USER_PROFILE_SUCCESS } from './constants';

// The initial state of the App
const initialState = fromJS({
  isLoading: false,
  error: false,
  userProfile: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_PROFILE:
      return state.set('isLoading', true);
    case LOAD_USER_PROFILE_SUCCESS:
      return state
        .set('isLoading', false)
        .set('userProfile', action.userProfile);
    default:
      return state;
  }
}

export default appReducer;
