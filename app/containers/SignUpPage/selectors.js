/**
 * LoginPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSignUp = state => state.get('signUp', initialState);

const makeSelectEmail = () =>
  createSelector(selectSignUp, signUpState => signUpState.get('email'));

const makeSelectPassword = () =>
  createSelector(selectSignUp, signUpState => signUpState.get('password'));

const makeSelectConfirmPassword = () =>
  createSelector(selectSignUp, signUpState =>
    signUpState.get('confirmPassword'),
  );

const makeSelectIsLoading = () =>
  createSelector(selectSignUp, signUpState => signUpState.get('isLoading'));

const makeSelectNewUser = () =>
  createSelector(selectSignUp, signUpState => signUpState.get('newUser'));

const makeSelectConfirmationCode = () =>
  createSelector(selectSignUp, signUpState =>
    signUpState.get('confirmationCode'),
  );

const makeSelectValidatedSignUp = () =>
  createSelector(selectSignUp, signUpState =>
    signUpState.get('validatedSignUp'),
  );

export {
  selectSignUp,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectConfirmPassword,
  makeSelectValidatedSignUp,
  makeSelectIsLoading,
  makeSelectNewUser,
  makeSelectConfirmationCode,
};
