/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectUserProfile = () =>
  createSelector(selectGlobal, globalState => globalState.get('userProfile'));

const makeSelectIsAuthenticated = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('isAuthenticated'),
  );

const makeSelectIsAuthenticating = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('isAuthenticating'),
  );

const makeSelectIsLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('isLoading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

export {
  selectGlobal,
  makeSelectUserProfile,
  makeSelectIsLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectIsAuthenticated,
  makeSelectIsAuthenticating,
};
