import cooperationSlice from "@modules/cooperation/store/cooperationSlice";
import authSlice from "@modules/auth/store/authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [cooperationSlice.name]: cooperationSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export default rootReducer;
