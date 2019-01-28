import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import {
  logoutFailed,
  userHasAuthenticated,
} from 'containers/LoginPage/actions';
import { Auth } from 'aws-amplify';
import { userProfileLoaded } from './actions';
import { LOAD_USER_PROFILE } from './constants';
import { USER_LOGOUT } from '../LoginPage/constants';

export function* loadUserProfile() {
  const userSession = yield Auth.currentSession();
  const idToken = yield userSession.idToken.payload;
  yield put(userProfileLoaded(idToken));
  yield put(userHasAuthenticated(true));
}

export function* logout() {
  try {
    yield Auth.signOut();
    yield put(userHasAuthenticated(false));
    yield put(push('/login'));
  } catch (err) {
    yield put(logoutFailed(err));
  }
}

export default function* global() {
  yield takeLatest(LOAD_USER_PROFILE, loadUserProfile);
  yield takeLatest(USER_LOGOUT, logout);
}
