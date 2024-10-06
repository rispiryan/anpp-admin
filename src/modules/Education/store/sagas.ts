import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as educationService from "../educationService";
import { APP_PATHS } from "../../../constants";
import educationSlice from "./educationSlice";
import * as actions from "./actions";

function* getEducationSaga() {
  yield put(educationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(educationService.getEducation);
    yield put(educationSlice.actions.getEducationListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(educationSlice.actions.setLoading(false));
  }
}

function* getSingleEducationSaga({ payload }: ReturnType<typeof actions.getEducationAction>) {
  yield put(educationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(educationService.getSingleEducation, payload);
    yield put(educationSlice.actions.getEducationSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(educationSlice.actions.setLoading(false));
  }
}

function* deleteEducationSaga({ payload }: ReturnType<typeof actions.deleteEducationAction>) {
  yield put(educationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(educationService.deleteEducation, payload);
    yield put(educationSlice.actions.getEducationListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(educationSlice.actions.setLoading(false));
  }
}

function* createEducationSaga({ payload }: ReturnType<typeof actions.createEducationAction>) {
  yield put(educationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(educationService.createEducation, payload.data);
    yield put(educationSlice.actions.getEducationListSuccessAction(data));
    toast.success("Education was successfully created");
    payload.navigate(APP_PATHS.education);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(educationSlice.actions.setLoading(false));
  }
}

function* updateEducationSaga({ payload }: ReturnType<typeof actions.updateEducationAction>) {
  yield put(educationSlice.actions.setLoading(true));

  try {
    const { data } = yield call(educationService.updateEducation, payload.data, payload.id);
    yield put(educationSlice.actions.getEducationListSuccessAction(data));
    toast.success("Education was successfully updated");
    payload.navigate(APP_PATHS.education);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(educationSlice.actions.setLoading(false));
  }
}

export function* watchEducationSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getEducationListAction.type, getEducationSaga);
  yield takeLatest(actions.deleteEducationAction.type, deleteEducationSaga);
  yield takeLatest(actions.createEducationAction.type, createEducationSaga);
  yield takeLatest(actions.updateEducationAction.type, updateEducationSaga);
  yield takeLatest(actions.getEducationAction.type, getSingleEducationSaga);
}
