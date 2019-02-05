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
  LOGIN_WITH_FACEBOOK_REQUEST,
  LOGOUT_REQUEST,
} from './constants';
import { makeSelectEmail, makeSelectPassword } from '../LoginPage/selectors';
import { makeSelectFacebookData } from './selectors';

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
    const user = yield Auth.currentAuthenticatedUser();
    user.isAws = false;
    if (!user.email && user.attributes) {
      user.email = user.attributes.email;
      user.isAws = true;
    }
    yield put(userProfileLoaded(user));
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

function getFacebookUser(...params) {
  return new Promise(async resolve => {
    const fb = window.FB;

    const callback = response => {
      const user = {
        name: response.name,
        email: response.email,
      };

      resolve(user);
    };

    params.push(callback);

    fb.api(...params);
  });
}

export function* getAWSCredentials() {
  try {
    const data = yield select(makeSelectFacebookData());
    const date = new Date();
    const { accessToken, expiresIn } = data;
    // eslint-disable-next-line camelcase
    const expires_at = expiresIn * 1000 + date.getTime();
    if (!accessToken) {
      return;
    }

    const user = yield getFacebookUser('/me?fields=name,email');

    yield Auth.federatedSignIn(
      'facebook',
      { token: accessToken, expires_at },
      user,
    );
    yield loadUserProfile();
    yield put(loginSuccess());
    yield put(push('/'));
  } catch (e) {
    alert(e);
  }
}

export function* loginWithFacebookFlow() {
  while (true) {
    yield take(LOGIN_WITH_FACEBOOK_REQUEST);
    yield call(getAWSCredentials);
  }
}

export default function* root() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(loadUserProfileFlow);
  yield fork(loginWithFacebookFlow);
}
