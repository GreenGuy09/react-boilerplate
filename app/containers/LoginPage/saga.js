import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { USER_LOGIN, USER_LOGOUT } from 'containers/LoginPage/constants';
import {
  loginFailed,
  userHasAuthenticated,
  logoutFailed,
} from 'containers/LoginPage/actions';
import { Auth } from 'aws-amplify';

import {
  makeSelectEmail,
  makeSelectPassword,
} from 'containers/LoginPage/selectors';

/**
 * Login to Cognito
 */
export function* loginCognito() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());

  try {
    yield Auth.signIn(email, password);
    yield put(userHasAuthenticated(true));
    yield put(push('/'));
  } catch (err) {
    yield put(loginFailed(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(USER_LOGIN, loginCognito);
  yield takeLatest(USER_LOGOUT, logoutCognito);
}

export function* logoutCognito() {
  try {
    yield Auth.signOut();
    yield put(userHasAuthenticated(false));
    yield put(push('/login'));
  } catch (err) {
    yield put(logoutFailed(err));
  }
}
