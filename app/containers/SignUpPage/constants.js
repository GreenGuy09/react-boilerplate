/*
 * SignUpConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_EMAIL = 'caregivers/SignUpPage/CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'caregivers/SignUpPage/CHANGE_PASSWORD';
export const CHANGE_CONFIRM_PASSWORD =
  'caregivers/SignUpPage/CHANGE_CONFIRM_PASSWORD';
export const CHANGE_CONFIRMATION_CODE =
  'caregivers/SignUpPage/CHANGE_CONFIRMATION_CODE';

export const SIGN_UP_REQUEST = 'caregivers/SignUpPage/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'caregivers/SignUpPage/SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'caregivers/SignUpPage/SIGN_UP_ERROR';

export const CONFIRM_SIGN_UP_REQUEST =
  'caregivers/SignUpPage/CONFIRM_SIGN_UP_REQUEST';
export const CONFIRM_SIGN_UP_SUCCESS =
  'caregiver/SignUpPage/CONFIRM_SIGN_UP_SUCCESS';
export const CONFIRM_SIGN_UP_FAILURE =
  'caregiver/SignUpPage/CONFIRM_SIGN_UP_FAILURE';
