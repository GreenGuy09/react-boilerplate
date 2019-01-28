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
export const USER_SIGN_UP = 'caregivers/SignUpPage/USER_SIGN_UP';
export const USER_HAS_SIGNED_UP = 'caregivers/SignUpPage/USER_HAS_SIGNED_UP';
export const USER_SIGN_UP_ERROR = 'caregivers/SignUpPage/USER_SIGN_UP_ERROR';
export const CHANGE_CONFIRMATION_CODE =
  'caregivers/SignUpPage/CHANGE_CONFIRMATION_CODE';
export const USER_CONFIRM_SIGN_UP =
  'caregivers/SignUpPage/USER_CONFIRM_SIGN_UP';
export const USER_HAS_CONFIRMED_SIGN_UP =
  'caregiver/SignUpPage/USER_HAS_CONFIRMED_SIGN_UP';
