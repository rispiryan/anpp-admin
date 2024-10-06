import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import { APP_PATHS } from "../../../constants";
import * as newsService from "../newsService";
import * as actions from "./actions";
import newsSlice from "./newsSlice";

function* getNewsSaga() {
  yield put(newsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(newsService.getNews);
    yield put(newsSlice.actions.getNewsListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(newsSlice.actions.setLoading(false));
  }
}

function* getSingleNewsSaga({ payload }: ReturnType<typeof actions.getNewsAction>) {
  yield put(newsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(newsService.getSingleNews, payload);
    yield put(newsSlice.actions.getNewsSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(newsSlice.actions.setLoading(false));
  }
}

function* deleteNewsSaga({ payload }: ReturnType<typeof actions.deleteNewsAction>) {
  yield put(newsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(newsService.deleteNews, payload);
    yield put(newsSlice.actions.getNewsListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(newsSlice.actions.setLoading(false));
  }
}

function* createNewsSaga({ payload }: ReturnType<typeof actions.createNewsAction>) {
  yield put(newsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(newsService.createNews, payload.data);
    yield put(newsSlice.actions.getNewsListSuccessAction(data));
    toast.success("Education was successfully created");
    payload.navigate(APP_PATHS.news);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(newsSlice.actions.setLoading(false));
  }
}

function* updateNewsSaga({ payload }: ReturnType<typeof actions.updateNewsAction>) {
  yield put(newsSlice.actions.setLoading(true));

  try {
    const { data } = yield call(newsService.updateNews, payload.data, payload.id);
    yield put(newsSlice.actions.getNewsListSuccessAction(data));
    toast.success("Education was successfully updated");
    payload.navigate(APP_PATHS.news);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(newsSlice.actions.setLoading(false));
  }
}

export function* watchNewsSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getNewsListAction.type, getNewsSaga);
  yield takeLatest(actions.deleteNewsAction.type, deleteNewsSaga);
  yield takeLatest(actions.createNewsAction.type, createNewsSaga);
  yield takeLatest(actions.updateNewsAction.type, updateNewsSaga);
  yield takeLatest(actions.getNewsAction.type, getSingleNewsSaga);
}
