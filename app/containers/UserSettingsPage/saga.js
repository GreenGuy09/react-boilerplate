import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { Auth } from 'aws-amplify';
import { makeSelectOldPassword, makeSelectNewPassword } from './selectors';
import { CHANGE_PASSWORD_REQUEST } from './constants';
import { changePasswordSuccess, changePasswordFailure } from './actions';

export function* changePassword() {
  const currentUser = yield Auth.currentAuthenticatedUser();
  const oldPassword = yield select(makeSelectOldPassword());
  const newPassword = yield select(makeSelectNewPassword());

  try {
    yield Auth.changePassword(currentUser, oldPassword, newPassword);
    yield put(changePasswordSuccess());
    yield put(push('/'));
  } catch (err) {
    alert(err.message);
    yield put(changePasswordFailure(err.message));
  }
}

export default function* settings() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}
