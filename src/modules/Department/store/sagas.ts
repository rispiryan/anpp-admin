import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as departmentService from "../departmentService";
import departmentSlice from "./departmentSlice";
import { APP_PATHS } from "../../../constants";
import * as actions from "./actions";

function* getDepartmentSaga() {
  yield put(departmentSlice.actions.setLoading(true));

  try {
    const { data } = yield call(departmentService.getDepartment);
    yield put(departmentSlice.actions.getDepartmentListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(departmentSlice.actions.setLoading(false));
  }
}

function* getSingleDepartmentSaga({ payload }: ReturnType<typeof actions.getDepartmentAction>) {
  yield put(departmentSlice.actions.setLoading(true));

  try {
    const { data } = yield call(departmentService.getSingleDepartment, payload);
    yield put(departmentSlice.actions.getDepartmentSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(departmentSlice.actions.setLoading(false));
  }
}

function* deleteDepartmentSaga({ payload }: ReturnType<typeof actions.deleteDepartmentAction>) {
  yield put(departmentSlice.actions.setLoading(true));

  try {
    const { data } = yield call(departmentService.deleteDepartment, payload);
    yield put(departmentSlice.actions.getDepartmentListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(departmentSlice.actions.setLoading(false));
  }
}

function* createDepartmentSaga({ payload }: ReturnType<typeof actions.createDepartmentAction>) {
  yield put(departmentSlice.actions.setLoading(true));

  try {
    const { data } = yield call(departmentService.createDepartment, payload.data);
    yield put(departmentSlice.actions.getDepartmentListSuccessAction(data));
    toast.success("Department was successfully created");
    payload.navigate(APP_PATHS.department);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(departmentSlice.actions.setLoading(false));
  }
}

function* updateDepartmentSaga({ payload }: ReturnType<typeof actions.updateDepartmentAction>) {
  yield put(departmentSlice.actions.setLoading(true));

  try {
    const { data } = yield call(departmentService.updateDepartment, payload.data, payload.id);
    yield put(departmentSlice.actions.getDepartmentListSuccessAction(data));
    toast.success("Department was successfully updated");
    payload.navigate(APP_PATHS.department);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(departmentSlice.actions.setLoading(false));
  }
}

export function* watchDepartmentSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getDepartmentListAction.type, getDepartmentSaga);
  yield takeLatest(actions.deleteDepartmentAction.type, deleteDepartmentSaga);
  yield takeLatest(actions.createDepartmentAction.type, createDepartmentSaga);
  yield takeLatest(actions.updateDepartmentAction.type, updateDepartmentSaga);
  yield takeLatest(actions.getDepartmentAction.type, getSingleDepartmentSaga);
}
