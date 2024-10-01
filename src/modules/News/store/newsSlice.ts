import { createSlice } from "@reduxjs/toolkit";

import { type INewsState } from "./types";

const initialState: INewsState = {
  loading: false,
  newsList: [],
  news: null,
};

const newsSlice = createSlice({
  reducers: {
    getNewsListSuccessAction: (state: INewsState, { payload }) => {
      state.newsList = payload;
      state.news = null;
    },
    getNewsSuccessAction: (state: INewsState, { payload }) => {
      state.news = payload;
    },
    setLoading: (state: INewsState, { payload }) => {
      state.loading = payload;
    },
  },
  name: "news",
  initialState,
});

export default newsSlice;
