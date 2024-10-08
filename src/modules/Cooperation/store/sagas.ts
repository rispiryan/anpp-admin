import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as cooperationService from "../cooperationService";
import cooperationSlice from "./cooperationSlice";
import { APP_PATHS } from "../../../constants";
import * as actions from "./actions";

function* getCooperationSaga() {
  yield put(cooperationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(cooperationService.getCooperation);
    yield put(cooperationSlice.actions.getCooperationListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(cooperationSlice.actions.setLoading(false));
  }
}

function* getSingleCooperationSaga({ payload }: ReturnType<typeof actions.getCooperationAction>) {
  yield put(cooperationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(cooperationService.getSingleCooperation, payload);
    yield put(cooperationSlice.actions.getCooperationSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(cooperationSlice.actions.setLoading(false));
  }
}

function* deleteCooperationSaga({ payload }: ReturnType<typeof actions.deleteCooperationListAction>) {
  yield put(cooperationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(cooperationService.deleteCooperation, payload);
    yield put(cooperationSlice.actions.getCooperationListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(cooperationSlice.actions.setLoading(false));
  }
}

function* createCooperationSaga({ payload }: ReturnType<typeof actions.createCooperationAction>) {
  yield put(cooperationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(cooperationService.createCooperation, payload.data);
    yield put(cooperationSlice.actions.getCooperationListSuccessAction(data));
    toast.success("Cooperation was successfully created");
    payload.navigate(APP_PATHS.cooperation);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(cooperationSlice.actions.setLoading(false));
  }
}

function* updateCooperationSaga({ payload }: ReturnType<typeof actions.updateCooperationListAction>) {
  yield put(cooperationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(cooperationService.updateCooperation, payload.data, payload.id);
    yield put(cooperationSlice.actions.getCooperationListSuccessAction(data));
    toast.success("Cooperation was successfully updated");
    payload.navigate(APP_PATHS.cooperation);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(cooperationSlice.actions.setLoading(false));
  }
}

export function* watchCooperationSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getCooperationListAction.type, getCooperationSaga);
  yield takeLatest(actions.deleteCooperationListAction.type, deleteCooperationSaga);
  yield takeLatest(actions.createCooperationAction.type, createCooperationSaga);
  yield takeLatest(actions.updateCooperationListAction.type, updateCooperationSaga);
  yield takeLatest(actions.getCooperationAction.type, getSingleCooperationSaga);
}
