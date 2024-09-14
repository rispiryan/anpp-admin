import { createSlice } from "@reduxjs/toolkit";

import { type IAuth } from "./types";

const initialState: IAuth = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  reducers: {
    loginSuccessAction: (state: IAuth, { payload }) => {
      state.user = payload;
    },
    setLoading: (state: IAuth, { payload }) => {
      state.loading = payload;
    },
  },
  name: "authSlice",
  initialState,
});

export default authSlice;
