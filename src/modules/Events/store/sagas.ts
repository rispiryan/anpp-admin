import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as eventsService from "../eventsService";
import eventsStateSlice from "./eventsStateSlice";
import { APP_PATHS } from "../../../constants";
import * as actions from "./actions";

function* getEventsSaga() {
  yield put(eventsStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(eventsService.getEvents);
    yield put(eventsStateSlice.actions.getEventsListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(eventsStateSlice.actions.setLoading(false));
  }
}

function* getSingleEventsSaga({ payload }: ReturnType<typeof actions.getEventsAction>) {
  yield put(eventsStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(eventsService.getSingleEvents, payload);
    yield put(eventsStateSlice.actions.getEventsSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(eventsStateSlice.actions.setLoading(false));
  }
}

function* deleteEventsSaga({ payload }: ReturnType<typeof actions.deleteEventsAction>) {
  yield put(eventsStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(eventsService.deleteEvents, payload);
    yield put(eventsStateSlice.actions.getEventsListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(eventsStateSlice.actions.setLoading(false));
  }
}

function* createEventsSaga({ payload }: ReturnType<typeof actions.createEventsAction>) {
  yield put(eventsStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(eventsService.createEvents, payload.data);
    yield put(eventsStateSlice.actions.getEventsListSuccessAction(data));
    toast.success("Events was successfully created");
    payload.navigate(APP_PATHS.events);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(eventsStateSlice.actions.setLoading(false));
  }
}

function* updateEventsSaga({ payload }: ReturnType<typeof actions.updateEventsAction>) {
  yield put(eventsStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(eventsService.updateEvents, payload.data, payload.id);
    yield put(eventsStateSlice.actions.getEventsListSuccessAction(data));
    toast.success("Events was successfully updated");
    payload.navigate(APP_PATHS.events);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(eventsStateSlice.actions.setLoading(false));
  }
}

export function* watchEventsSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getEventsListAction.type, getEventsSaga);
  yield takeLatest(actions.deleteEventsAction.type, deleteEventsSaga);
  yield takeLatest(actions.createEventsAction.type, createEventsSaga);
  yield takeLatest(actions.updateEventsAction.type, updateEventsSaga);
  yield takeLatest(actions.getEventsAction.type, getSingleEventsSaga);
}
