import { createSlice } from "@reduxjs/toolkit";

import { type IEventsState } from "./types";

const initialState: IEventsState = {
  eventsList: [],
  loading: false,
  events: null,
};

const eventsStateSlice = createSlice({
  reducers: {
    getEventsListSuccessAction: (state: IEventsState, { payload }) => {
      state.eventsList = payload;
      state.events = null;
    },
    getEventsSuccessAction: (state: IEventsState, { payload }) => {
      state.events = payload;
    },
    setLoading: (state: IEventsState, { payload }) => {
      state.loading = payload;
    },
  },
  name: "events",
  initialState,
});

export default eventsStateSlice;
