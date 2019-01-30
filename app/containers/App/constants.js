/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_USER_PROFILE_REQUEST =
  'caregivers/App/LOAD_USER_PROFILE_REQUEST';
export const LOAD_USER_PROFILE_SUCCESS =
  'caregivers/App/LOAD_USER_PROFILE_SUCCESS';
export const LOAD_USER_PROFILE_FAILURE =
  'caregivers/App/LOAD_USER_PROFILE_FAILURE';

export const LOGIN_REQUEST = 'caregivers/Login/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'caregivers/Login/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'caregivers/Login/LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'caregivers/App/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'caregivers/App/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'caregivers/App/LOGOUT_FAILURE';
