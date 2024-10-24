import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import { APP_PATHS } from "../../../constants";
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

function* changePasswordSaga({ payload }: ReturnType<typeof actions.changePasswordAction>) {
  yield put(authSlice.actions.setLoading(true));

  try {
    yield call(authService.changePassword, payload.password);
    toast.success("Password was successfully changed");
    payload.navigate(APP_PATHS.login);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(authSlice.actions.setLoading(false));
  }
}

function* logAutSaga({ payload }: ReturnType<typeof actions.logOutAction>) {
  try {
    yield call(authService.logAut, payload);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

export function* watchAuthSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.loginAction.type, loginSaga);
  yield takeLatest(actions.changePasswordAction.type, changePasswordSaga);
  yield takeLatest(actions.getProfileAction.type, getProfileSaga);
  yield takeLatest(actions.logOutAction.type, logAutSaga);
}
