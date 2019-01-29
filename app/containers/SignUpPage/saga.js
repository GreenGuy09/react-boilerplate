import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { Auth } from 'aws-amplify';
import { USER_SIGN_UP, USER_CONFIRM_SIGN_UP } from './constants';

import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectConfirmationCode,
} from './selectors';
import {
  signUpSuccess,
  signUpError,
  confirmSignUpSuccess,
  confirmSignUpError,
} from './actions';

export function* signUpCognito() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const newUser = {
    username: email,
    password,
  };
  try {
    yield Auth.signUp(newUser);
    yield put(signUpSuccess(newUser));
  } catch (err) {
    alert(err.message);
    yield put(signUpError(err.message));
  }
}

export function* confirmSignUpCognito() {
  const email = yield select(makeSelectEmail());
  const confirmationCode = yield select(makeSelectConfirmationCode());
  try {
    yield Auth.confirmSignUp(email, confirmationCode);
    yield put(confirmSignUpSuccess());
    // route them to login page
    yield put(push('/login'));
  } catch (err) {
    alert(err.message);
    yield put(confirmSignUpError(err.message));
  }
}

export default function* signUp() {
  yield takeLatest(USER_SIGN_UP, signUpCognito);
  yield takeLatest(USER_CONFIRM_SIGN_UP, confirmSignUpCognito);
}
