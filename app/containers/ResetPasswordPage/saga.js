import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { Auth } from 'aws-amplify';
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectCode,
} from './selectors';
import { SEND_CODE, CONFIRM_CODE } from './constants';
import {
  codeSentSuccess,
  codeSentError,
  passwordResetSuccess,
  passwordResetError,
} from './actions';

export function* sendCode() {
  const email = yield select(makeSelectEmail());
  try {
    yield Auth.forgotPassword(email);
    yield put(codeSentSuccess());
  } catch (err) {
    // TODO: remove
    alert(err.message);
    yield put(codeSentError(err.message));
  }
}

export function* confirmCode() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const code = yield select(makeSelectCode());

  try {
    yield Auth.forgotPasswordSubmit(email, code, password);
    yield put(passwordResetSuccess());
    yield put(push('/login'));
  } catch (err) {
    // TODO: remove
    alert(err.message);
    yield put(passwordResetError(err));
  }
}

export default function* reset() {
  yield takeLatest(SEND_CODE, sendCode);
  yield takeLatest(CONFIRM_CODE, confirmCode);
}
