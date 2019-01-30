/**
 * LoginPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.get('login', initialState);

const makeSelectEmail = () =>
  createSelector(selectLogin, loginState => loginState.get('email'));

const makeSelectPassword = () =>
  createSelector(selectLogin, loginState => loginState.get('password'));

export { selectLogin, makeSelectEmail, makeSelectPassword };
