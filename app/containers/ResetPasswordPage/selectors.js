import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectReset = state => state.get('reset', initialState);

const makeSelectCode = () =>
  createSelector(selectReset, resetState => resetState.get('code'));

const makeSelectEmail = () =>
  createSelector(selectReset, resetState => resetState.get('email'));

const makeSelectPassword = () =>
  createSelector(selectReset, resetState => resetState.get('password'));

const makeSelectCodeSent = () =>
  createSelector(selectReset, resetState => resetState.get('codeSent'));

const makeSelectConfirmed = () =>
  createSelector(selectReset, resetState => resetState.get('confirmed'));

const makeSelectIsConfirming = () =>
  createSelector(selectReset, resetState => resetState.get('isConfirming'));

const makeSelectIsSendingCode = () =>
  createSelector(selectReset, resetState => resetState.get('isSendingCode'));

export {
  selectReset,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectCode,
  makeSelectCodeSent,
  makeSelectConfirmed,
  makeSelectIsConfirming,
  makeSelectIsSendingCode,
};
