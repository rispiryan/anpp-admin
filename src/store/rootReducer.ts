import employeesStateSlice from "@modules/Employees/store/employeesStateSlice";
import shoppingStateSlice from "@modules/Shopping/store/shoppingStateSlice";
import cooperationSlice from "@modules/Cooperation/store/cooperationSlice";
import eventsStateSlice from "@modules/Events/store/eventsStateSlice";
import vacanciesSlice from "@modules/Vacancies/store/vacanciesSlice";
import reportsSlice from "@modules/Reports/store/reportsSlice";
import authSlice from "@modules/auth/store/authSlice";
import newsSlice from "@modules/News/store/newsSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [employeesStateSlice.name]: employeesStateSlice.reducer,
  [shoppingStateSlice.name]: shoppingStateSlice.reducer,
  [cooperationSlice.name]: cooperationSlice.reducer,
  [eventsStateSlice.name]: eventsStateSlice.reducer,
  [vacanciesSlice.name]: vacanciesSlice.reducer,
  [reportsSlice.name]: reportsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [newsSlice.name]: newsSlice.reducer,
});

export default rootReducer;
