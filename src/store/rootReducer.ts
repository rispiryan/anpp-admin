import employeesStateSlice from "@modules/Employees/store/employeesStateSlice";
import cooperationSlice from "@modules/Cooperation/store/cooperationSlice";
import vacanciesSlice from "@modules/Vacancies/store/vacanciesSlice";
import reportsSlice from "@modules/Reports/store/reportsSlice";
import authSlice from "@modules/auth/store/authSlice";
import newsSlice from "@modules/News/store/newsSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [employeesStateSlice.name]: employeesStateSlice.reducer,
  [cooperationSlice.name]: cooperationSlice.reducer,
  [vacanciesSlice.name]: vacanciesSlice.reducer,
  [reportsSlice.name]: reportsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [newsSlice.name]: newsSlice.reducer,
});

export default rootReducer;
