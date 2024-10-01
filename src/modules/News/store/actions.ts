import { createAction } from "@reduxjs/toolkit";

import { type ICreateNews, type IDeleteNews, type IUpdateNews, type INavigate } from "./types";
export const getNewsListAction = createAction("getNewsListAction");
export const deleteNewsAction = createAction<IDeleteNews>("deleteNewsAction");
export const getNewsAction = createAction<string>("getNewsAction");
export const createNewsAction = createAction<{ navigate: INavigate; data: ICreateNews }>("createNewsAction");
export const updateNewsAction = createAction<{ navigate: INavigate; data: IUpdateNews; id: string }>(
  "updateNewsAction",
);
