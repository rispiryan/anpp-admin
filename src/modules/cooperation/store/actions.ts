import {
  type ICreateCooperation,
  type IDeleteCooperation,
  type IUpdateCooperation,
  type INavigate,
} from "@modules/cooperation/store/types";
import { createAction } from "@reduxjs/toolkit";
export const getCooperationListAction = createAction("getCooperationListAction");
export const deleteCooperationListAction = createAction<IDeleteCooperation>("deleteCooperationListAction");
export const getCooperationAction = createAction<string>("getCooperationAction");
export const createCooperationListAction = createAction<{ data: ICreateCooperation; navigate: INavigate }>(
  "createCooperationListAction",
);
export const updateCooperationListAction = createAction<{ data: IUpdateCooperation; navigate: INavigate; id: string }>(
  "updateCooperationListAction",
);
