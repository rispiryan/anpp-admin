import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as cooperationService from "../cooperationService";
import cooperationSlice from "./cooperationSlice";
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

export function* watchCooperationSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getCooperationListAction.type, getCooperationSaga);
  yield takeLatest(actions.deleteCooperationListAction.type, deleteCooperationSaga);
}
