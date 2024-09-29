import { createAction } from "@reduxjs/toolkit";

import { type ICreateReports, type IDeleteReports, type IUpdateReports, type INavigate } from "./types";
export const getReportsListAction = createAction("getReportsListAction");
export const deleteReportsAction = createAction<IDeleteReports>("deleteReportsAction");
export const getReportsAction = createAction<string>("getReportsAction");
export const createReportsAction = createAction<{ data: ICreateReports; navigate: INavigate }>("createReportsAction");
export const updateReportsAction = createAction<{ data: IUpdateReports; navigate: INavigate; id: string }>(
  "updateReportsAction",
);
