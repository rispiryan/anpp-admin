import { watchCooperationSaga } from "@modules/Cooperation/store/sagas";
import { watchDepartmentSaga } from "@modules/Department/store/sagas";
import { watchVacanciesSaga } from "@modules/Vacancies/store/sagas";
import { watchEmployeesSaga } from "@modules/Employees/store/sagas";
import { watchShoppingSaga } from "@modules/Shopping/store/sagas";
import { watchReportsSaga } from "@modules/Reports/store/sagas";
import { watchEventsSaga } from "@modules/Events/store/sagas";
import { watchAuthSaga } from "@modules/auth/store/sagas";
import { watchNewsSaga } from "@modules/News/store/sagas";
import { call, all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    call(watchCooperationSaga),
    call(watchAuthSaga),
    call(watchVacanciesSaga),
    call(watchEmployeesSaga),
    call(watchReportsSaga),
    call(watchNewsSaga),
    call(watchEventsSaga),
    call(watchShoppingSaga),
    call(watchDepartmentSaga),
  ]);
}
