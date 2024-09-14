import { watchCooperationSaga } from "@modules/cooperation/store/sagas";
import { call, all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([call(watchCooperationSaga)]);
}
