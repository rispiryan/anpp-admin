import { createSlice } from "@reduxjs/toolkit";

import { type IEmployeesState } from "./types";

const initialState: IEmployeesState = {
  employeesList: [],
  employees: null,
  loading: false,
};

const employeesStateSlice = createSlice({
  reducers: {
    getEmployeesListSuccessAction: (state: IEmployeesState, { payload }) => {
      state.employeesList = payload;
      state.employees = null;
    },
    getEmployeesSuccessAction: (state: IEmployeesState, { payload }) => {
      state.employees = payload;
    },
    setLoading: (state: IEmployeesState, { payload }) => {
      state.loading = payload;
    },
  },
  name: "employees",
  initialState,
});

export default employeesStateSlice;
