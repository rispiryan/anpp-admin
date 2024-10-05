import { createAction } from "@reduxjs/toolkit";

import { type ICreateEvents, type IDeleteEvents, type IUpdateEvents, type INavigate } from "./types";
export const getEventsListAction = createAction("getEventsListAction");
export const deleteEventsAction = createAction<IDeleteEvents>("deleteEventsAction");
export const getEventsAction = createAction<string>("getEventsAction");
export const createEventsAction = createAction<{ data: ICreateEvents; navigate: INavigate }>("createEventsAction");
export const updateEventsAction = createAction<{ data: IUpdateEvents; navigate: INavigate; id: string }>(
  "updateEventsListAction",
);
