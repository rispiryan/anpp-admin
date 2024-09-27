import { watchCooperationSaga } from "@modules/cooperation/store/sagas";
import { watchVacanciesSaga } from "@modules/Vacancies/store/sagas";
import { watchAuthSaga } from "@modules/auth/store/sagas";
import { call, all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([call(watchCooperationSaga), call(watchAuthSaga), call(watchVacanciesSaga)]);
}
