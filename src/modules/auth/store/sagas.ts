import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as authService from "./authService";
import * as actions from "./actions";
import authSlice from "./authSlice";

function* loginSaga({ payload }: ReturnType<typeof actions.loginAction>) {
  yield put(authSlice.actions.setLoading(true));

  try {
    const { data } = yield call(authService.login, payload);

    if (data.authToken) {
      localStorage.setItem("authToken", data.authToken);
    }

    yield put(authSlice.actions.loginSuccessAction(data.user));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(authSlice.actions.setLoading(false));
  }
}

function* getProfileSaga() {
  yield put(authSlice.actions.setLoading(true));

  try {
    const { data } = yield call(authService.getProfile);

    yield put(authSlice.actions.loginSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(authSlice.actions.setLoading(false));
  }
}

export function* watchAuthSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.loginAction.type, loginSaga);
  yield takeLatest(actions.getProfileAction.type, getProfileSaga);
}
