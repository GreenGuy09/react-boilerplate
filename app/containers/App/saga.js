import { take, call, put, fork, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { Auth } from 'aws-amplify';
import {
  userProfileLoaded,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  loadUserProfileFailure,
} from './actions';
import {
  LOAD_USER_PROFILE_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
} from './constants';
import { makeSelectEmail, makeSelectPassword } from '../LoginPage/selectors';

export function* login() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());

  try {
    yield Auth.signIn(email, password);
    yield loadUserProfile();
    yield put(push('/'));
  } catch (err) {
    alert(err.message);
    yield put(loginFailure(err));
  }
}

export function* loginFlow() {
  while (true) {
    yield take(LOGIN_REQUEST);
    yield call(login);
  }
}

export function* logout() {
  try {
    yield Auth.signOut();
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailure(err.message));
  }
}

export function* logoutFlow() {
  while (true) {
    yield take(LOGOUT_REQUEST);
    yield call(logout);
  }
}

export function* loadUserProfile() {
  try {
    const userSession = yield Auth.currentSession();
    const idToken = yield userSession.idToken.payload;
    yield put(userProfileLoaded(idToken));
    yield put(loginSuccess());
  } catch (err) {
    yield put(loadUserProfileFailure());
  }
}

export function* loadUserProfileFlow() {
  while (true) {
    yield take(LOAD_USER_PROFILE_REQUEST);
    yield call(loadUserProfile);
  }
}

export default function* root() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(loadUserProfileFlow);
}
