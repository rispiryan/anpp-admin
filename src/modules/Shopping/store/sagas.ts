import { type ForkEffect, takeLatest, put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import toast from "react-hot-toast";

import shoppingStateSlice from "./shoppingStateSlice";
import * as shoppingService from "../shoppingService";
import { APP_PATHS } from "../../../constants";
import * as actions from "./actions";

function* getShoppingSaga() {
  yield put(shoppingStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(shoppingService.getShopping);
    yield put(shoppingStateSlice.actions.getShoppingListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(shoppingStateSlice.actions.setLoading(false));
  }
}

function* getSingleShoppingSaga({ payload }: ReturnType<typeof actions.getShoppingAction>) {
  yield put(shoppingStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(shoppingService.getSingleShopping, payload);
    yield put(shoppingStateSlice.actions.getShoppingSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(shoppingStateSlice.actions.setLoading(false));
  }
}

function* deleteShoppingSaga({ payload }: ReturnType<typeof actions.deleteShoppingAction>) {
  yield put(shoppingStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(shoppingService.deleteShopping, payload);
    yield put(shoppingStateSlice.actions.getShoppingListSuccessAction(data));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(shoppingStateSlice.actions.setLoading(false));
  }
}

function* createShoppingSaga({ payload }: ReturnType<typeof actions.createShoppingAction>) {
  yield put(shoppingStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(shoppingService.createShopping, payload.data);
    yield put(shoppingStateSlice.actions.getShoppingListSuccessAction(data));
    toast.success("shopping was successfully created");
    payload.navigate(APP_PATHS.shopping);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(shoppingStateSlice.actions.setLoading(false));
  }
}

function* updateShoppingSaga({ payload }: ReturnType<typeof actions.updateShoppingAction>) {
  yield put(shoppingStateSlice.actions.setLoading(true));

  try {
    const { data } = yield call(shoppingService.updateShopping, payload.data, payload.id);
    yield put(shoppingStateSlice.actions.getShoppingListSuccessAction(data));
    toast.success("shopping was successfully updated");
    payload.navigate(APP_PATHS.shopping);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  } finally {
    yield put(shoppingStateSlice.actions.setLoading(false));
  }
}

export function* watchShoppingSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getShoppingListAction.type, getShoppingSaga);
  yield takeLatest(actions.deleteShoppingAction.type, deleteShoppingSaga);
  yield takeLatest(actions.createShoppingAction.type, createShoppingSaga);
  yield takeLatest(actions.updateShoppingAction.type, updateShoppingSaga);
  yield takeLatest(actions.getShoppingAction.type, getSingleShoppingSaga);
}
