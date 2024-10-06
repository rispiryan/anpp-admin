import { createSlice } from "@reduxjs/toolkit";

import { type IEducationState } from "./types";

const initialState: IEducationState = {
  educationList: [],
  education: null,
  loading: false,
};

const educationSlice = createSlice({
  reducers: {
    getEducationListSuccessAction: (state: IEducationState, { payload }) => {
      state.educationList = payload;
      state.education = null;
    },
    getEducationSuccessAction: (state: IEducationState, { payload }) => {
      state.education = payload;
    },
    setLoading: (state: IEducationState, { payload }) => {
      state.loading = payload;
    },
  },
  name: "education",
  initialState,
});

export default educationSlice;
