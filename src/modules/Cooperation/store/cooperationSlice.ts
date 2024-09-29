import { createSlice } from "@reduxjs/toolkit";

import { type ICooperationState } from "./types";

const initialState: ICooperationState = {
  cooperationList: [],
  cooperation: null,
  loading: false,
};

const cooperationSlice = createSlice({
  reducers: {
    getCooperationListSuccessAction: (state: ICooperationState, { payload }) => {
      state.cooperationList = payload;
      state.cooperation = null;
    },
    getCooperationSuccessAction: (state: ICooperationState, { payload }) => {
      state.cooperation = payload;
    },
    setLoading: (state: ICooperationState, { payload }) => {
      state.loading = payload;
    },
  },
  name: "cooperation",
  initialState,
});

export default cooperationSlice;
