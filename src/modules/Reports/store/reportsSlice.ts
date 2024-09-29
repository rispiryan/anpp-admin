import { createSlice } from "@reduxjs/toolkit";

import { type IReportsState } from "./types";

const initialState: IReportsState = {
  reportsList: [],
  loading: false,
  reports: null,
};

const reportsSlice = createSlice({
  reducers: {
    getReportsListSuccessAction: (state: IReportsState, { payload }) => {
      state.reportsList = payload;
      state.reports = null;
    },
    getReportsSuccessAction: (state: IReportsState, { payload }) => {
      state.reports = payload;
    },
    setLoading: (state: IReportsState, { payload }) => {
      state.loading = payload;
    },
  },
  name: "reports",
  initialState,
});

export default reportsSlice;
