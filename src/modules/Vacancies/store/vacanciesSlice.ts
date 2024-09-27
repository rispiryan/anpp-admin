import { createSlice } from "@reduxjs/toolkit";

import { type IVacanciesState } from "./types";

const initialState: IVacanciesState = {
  vacanciesList: [],
  vacancies: null,
  loading: false,
};

const vacanciesSlice = createSlice({
  reducers: {
    getVacanciesListSuccessAction: (state: IVacanciesState, { payload }) => {
      state.vacanciesList = payload;
      state.vacancies = null;
    },
    getVacanciesSuccessAction: (state: IVacanciesState, { payload }) => {
      state.vacancies = payload;
    },
    setLoading: (state: IVacanciesState, { payload }) => {
      state.loading = payload;
    },
  },
  name: "vacancies",
  initialState,
});

export default vacanciesSlice;
