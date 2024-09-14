import cooperationSlice from "@modules/cooperation/store/cooperationSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [cooperationSlice.name]: cooperationSlice.reducer,
});

export default rootReducer;
