import { type ICreateCooperation, type IDeleteCooperation, type INavigate } from "@modules/cooperation/store/types";
import { createAction } from "@reduxjs/toolkit";
export const getCooperationListAction = createAction("getCooperationListAction");
export const deleteCooperationListAction = createAction<IDeleteCooperation>("deleteCooperationListAction");
export const createCooperationListAction = createAction<{ data: ICreateCooperation; navigate: INavigate }>(
  "createCooperationListAction",
);
