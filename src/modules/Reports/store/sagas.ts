import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as reportsService from "../reportsService";
import { APP_PATHS } from "../../../constants";
import reportsSlice from "./reportsSlice";
import * as actions from "./actions";

function* getReportsSaga() {
  yield put(reportsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(reportsService.getReports);
    yield put(reportsSlice.actions.getReportsListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(reportsSlice.actions.setLoading(false));
  }
}

function* getSingleReportsSaga({ payload }: ReturnType<typeof actions.getReportsAction>) {
  yield put(reportsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(reportsService.getSingleReports, payload);
    yield put(reportsSlice.actions.getReportsSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(reportsSlice.actions.setLoading(false));
  }
}

function* deleteReportsSaga({ payload }: ReturnType<typeof actions.deleteReportsAction>) {
  yield put(reportsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(reportsService.deleteReports, payload);
    yield put(reportsSlice.actions.getReportsListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(reportsSlice.actions.setLoading(false));
  }
}

function* createReportsSaga({ payload }: ReturnType<typeof actions.createReportsAction>) {
  yield put(reportsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(reportsService.createReports, payload.data);
    yield put(reportsSlice.actions.getReportsListSuccessAction(data));
    toast.success("Reports was successfully created");
    payload.navigate(APP_PATHS.reports);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(reportsSlice.actions.setLoading(false));
  }
}

function* updateReportsSaga({ payload }: ReturnType<typeof actions.updateReportsAction>) {
  yield put(reportsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(reportsService.updateReports, payload.data, payload.id);
    yield put(reportsSlice.actions.getReportsListSuccessAction(data));
    toast.success("Reports was successfully updated");
    payload.navigate(APP_PATHS.reports);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(reportsSlice.actions.setLoading(false));
  }
}

export function* watchReportsSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getReportsListAction.type, getReportsSaga);
  yield takeLatest(actions.deleteReportsAction.type, deleteReportsSaga);
  yield takeLatest(actions.createReportsAction.type, createReportsSaga);
  yield takeLatest(actions.updateReportsAction.type, updateReportsSaga);
  yield takeLatest(actions.getReportsAction.type, getSingleReportsSaga);
}
