import cooperationSlice from "@modules/cooperation/store/cooperationSlice";
import vacanciesSlice from "@modules/Vacancies/store/vacanciesSlice";
import authSlice from "@modules/auth/store/authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [cooperationSlice.name]: cooperationSlice.reducer,
  [vacanciesSlice.name]: vacanciesSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export default rootReducer;
