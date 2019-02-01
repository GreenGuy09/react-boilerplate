import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSettings = state => state.get('settings', initialState);

const makeSelectOldPassword = () =>
  createSelector(selectSettings, settingsState =>
    settingsState.get('oldPassword'),
  );

const makeSelectNewPassword = () =>
  createSelector(selectSettings, settingsState =>
    settingsState.get('newPassword'),
  );

const makeSelectConfirmPassword = () =>
  createSelector(selectSettings, settingsState =>
    settingsState.get('confirmPassword'),
  );

const makeSelectValidated = () =>
  createSelector(selectSettings, settingsState =>
    settingsState.get('validated'),
  );

export {
  selectSettings,
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectConfirmPassword,
  makeSelectValidated,
};
