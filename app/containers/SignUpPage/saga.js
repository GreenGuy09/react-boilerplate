import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { Auth } from 'aws-amplify';
import { USER_SIGN_UP, USER_CONFIRM_SIGN_UP } from './constants';

import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectConfirmationCode,
} from './selectors';
import { userHasSignedUp } from './actions';
import { userHasAuthenticated } from '../LoginPage/actions';

export function* signUpCognito() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const newUser = {
    username: email,
    password,
  };
  try {
    yield Auth.signUp(newUser);
    yield put(userHasSignedUp(newUser));
  } catch (e) {
    if (e.code === 'UsernameExistsException') {
      console.log('Username already exists.');
      yield put(userHasSignedUp(newUser));
    } else {
      console.log('An error occurred while signing up user.');
      yield put(push('/login'));
    }
  }
}

export function* confirmSignUpCognito() {
  const email = yield select(makeSelectEmail());
  const confirmationCode = yield select(makeSelectConfirmationCode());
  const password = yield select(makeSelectPassword());
  try {
    yield Auth.confirmSignUp(email, confirmationCode);
    // if we have an email and password, try to login
    if (email && password) {
      yield Auth.signIn(email, password);
      yield put(userHasAuthenticated(true));
      yield put(push('/'));
    } else {
      // route them to login page
      yield put(push('/login'));
    }
  } catch (e) {
    console.log('An error occurred while confirming sign up.');
    yield put(push('/login'));
  }
}

export default function* signUp() {
  yield takeLatest(USER_SIGN_UP, signUpCognito);
  yield takeLatest(USER_CONFIRM_SIGN_UP, confirmSignUpCognito);
}
