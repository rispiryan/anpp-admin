import { createSlice } from "@reduxjs/toolkit";

import { type IDepartmentState } from "./types";

const initialState: IDepartmentState = {
  departmentList: [],
  department: null,
  loading: false,
};

const departmentSlice = createSlice({
  reducers: {
    getDepartmentListSuccessAction: (state: IDepartmentState, { payload }) => {
      state.departmentList = payload;
      state.department = null;
    },
    getDepartmentSuccessAction: (state: IDepartmentState, { payload }) => {
      state.department = payload;
    },
    setLoading: (state: IDepartmentState, { payload }) => {
      state.loading = payload;
    },
  },
  name: "department",
  initialState,
});

export default departmentSlice;
