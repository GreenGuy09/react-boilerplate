/*
 * LoginConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_EMAIL = 'caregivers/Login/CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'caregivers/Login/CHANGE_PASSWORD';
export const USER_LOGIN = 'caregivers/Login/USER_LOGIN';
export const USER_HAS_AUTHENTICATED = 'caregivers/Login/USER_HAS_AUTHENTICATED';
export const USER_LOGIN_ERROR = 'caregivers/Login/USER_LOGIN_ERROR';
export const USER_LOGOUT = 'caregivers/Login/USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'caregivers/Login/USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_ERROR = 'caregivers/Login/USER_LOGOUT_ERROR';
