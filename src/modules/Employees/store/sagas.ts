import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as employeesService from "../employeesService";
import employeesStateSlice from "./employeesStateSlice";
import { APP_PATHS } from "../../../constants";
import * as actions from "./actions";

function* getEmployeesListSaga() {
  yield put(employeesStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(employeesService.getEmployees);

    yield put(employeesStateSlice.actions.getEmployeesListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(employeesStateSlice.actions.setLoading(false));
  }
}

function* getSingleEmployeesSaga({ payload }: ReturnType<typeof actions.getEmployeesAction>) {
  yield put(employeesStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(employeesService.getSingleEmployees, payload);
    yield put(employeesStateSlice.actions.getEmployeesSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(employeesStateSlice.actions.setLoading(false));
  }
}

function* deleteEmployeesSaga({ payload }: ReturnType<typeof actions.deleteEmployeesAction>) {
  yield put(employeesStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(employeesService.deleteEmployees, payload);
    yield put(employeesStateSlice.actions.getEmployeesListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(employeesStateSlice.actions.setLoading(false));
  }
}

function* createEmployeesSaga({ payload }: ReturnType<typeof actions.createEmployeesAction>) {
  yield put(employeesStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(employeesService.createEmployees, payload.data);
    yield put(employeesStateSlice.actions.getEmployeesListSuccessAction(data));
    toast.success("Employees was successfully created");
    payload.navigate(APP_PATHS.employees);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(employeesStateSlice.actions.setLoading(false));
  }
}

function* updateEmployeesSaga({ payload }: ReturnType<typeof actions.updateEmployeesAction>) {
  yield put(employeesStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(employeesService.updateEmployees, payload.data, payload.id);
    yield put(employeesStateSlice.actions.getEmployeesListSuccessAction(data));
    toast.success("Employees was successfully updated");
    payload.navigate(APP_PATHS.employees);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(employeesStateSlice.actions.setLoading(false));
  }
}

export function* watchEmployeesSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getEmployeesListAction.type, getEmployeesListSaga);
  yield takeLatest(actions.deleteEmployeesAction.type, deleteEmployeesSaga);
  yield takeLatest(actions.createEmployeesAction.type, createEmployeesSaga);
  yield takeLatest(actions.updateEmployeesAction.type, updateEmployeesSaga);
  yield takeLatest(actions.getEmployeesAction.type, getSingleEmployeesSaga);
}
