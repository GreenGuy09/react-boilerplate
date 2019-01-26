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

const makeSelectIsLoading = () =>
  createSelector(selectLogin, loginState => loginState.get('isLoading'));

const makeSelectIsAuthenticated = () =>
  createSelector(selectLogin, loginState => loginState.get('isAuthenticated'));

const makeSelectIsAuthenticating = () =>
  createSelector(selectLogin, loginState => loginState.get('isAuthenticating'));

export {
  selectLogin,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectIsLoading,
  makeSelectIsAuthenticated,
  makeSelectIsAuthenticating,
};
