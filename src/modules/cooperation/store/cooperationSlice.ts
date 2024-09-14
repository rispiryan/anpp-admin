import { createSlice } from "@reduxjs/toolkit";

import { type ICooperation } from "./types";

const initialState: ICooperation = {
  cooperationList: [],
  loading: false,
};

const cooperationSlice = createSlice({
  reducers: {
    getCooperationListSuccessAction: (state: ICooperation, { payload }) => {
      state.cooperationList = payload;
    },
    setLoading: (state: ICooperation, { payload }) => {
      state.loading = payload;
    },
  },
  name: "cooperation",
  initialState,
});

export default cooperationSlice;
