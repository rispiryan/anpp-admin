import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as vacanciesService from "../vacanciesService";
import { APP_PATHS } from "../../../constants";
import vacanciesSlice from "./vacanciesSlice";
import * as actions from "./actions";

function* getVacanciesListSaga() {
  yield put(vacanciesSlice.actions.setLoading(true));

  try {
    const { data } = yield call(vacanciesService.getVqacancies);

    yield put(vacanciesSlice.actions.getVacanciesListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(vacanciesSlice.actions.setLoading(false));
  }
}

function* getSingleVacanciesSaga({ payload }: ReturnType<typeof actions.getVacanciesAction>) {
  yield put(vacanciesSlice.actions.setLoading(true));

  try {
    const { data } = yield call(vacanciesService.getSingleVacancies, payload);
    yield put(vacanciesSlice.actions.getVacanciesSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(vacanciesSlice.actions.setLoading(false));
  }
}

function* deleteVacanciesSaga({ payload }: ReturnType<typeof actions.deleteVacanciesAction>) {
  yield put(vacanciesSlice.actions.setLoading(true));

  try {
    const { data } = yield call(vacanciesService.deleteVacancies, payload);
    yield put(vacanciesSlice.actions.getVacanciesListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(vacanciesSlice.actions.setLoading(false));
  }
}

function* createCVacanciesSaga({ payload }: ReturnType<typeof actions.createVacanciesAction>) {
  yield put(vacanciesSlice.actions.setLoading(true));

  try {
    const { data } = yield call(vacanciesService.createVacancies, payload.data);
    yield put(vacanciesSlice.actions.getVacanciesListSuccessAction(data));
    toast.success("Vacancies was successfully created");
    payload.navigate(APP_PATHS.vacancies);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(vacanciesSlice.actions.setLoading(false));
  }
}

function* updateVacanciesSaga({ payload }: ReturnType<typeof actions.updateVacanciesAction>) {
  yield put(vacanciesSlice.actions.setLoading(true));

  try {
    const { data } = yield call(vacanciesService.updateVacancies, payload.data, payload.id);
    yield put(vacanciesSlice.actions.getVacanciesListSuccessAction(data));
    toast.success("Vacancies was successfully updated");
    payload.navigate(APP_PATHS.vacancies);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(vacanciesSlice.actions.setLoading(false));
  }
}

export function* watchVacanciesSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getVacanciesListAction.type, getVacanciesListSaga);
  yield takeLatest(actions.deleteVacanciesAction.type, deleteVacanciesSaga);
  yield takeLatest(actions.createVacanciesAction.type, createCVacanciesSaga);
  yield takeLatest(actions.updateVacanciesAction.type, updateVacanciesSaga);
  yield takeLatest(actions.getVacanciesAction.type, getSingleVacanciesSaga);
}
