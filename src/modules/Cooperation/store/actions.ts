import {
  type ICreateCooperation,
  type IDeleteCooperation,
  type IUpdateCooperation,
  type INavigate,
} from "@modules/Cooperation/store/types";
import { createAction } from "@reduxjs/toolkit";
export const getCooperationListAction = createAction("getCooperationListAction");
export const deleteCooperationListAction = createAction<IDeleteCooperation>("deleteCooperationListAction");
export const getCooperationAction = createAction<string>("getCooperationAction");
export const createCooperationAction = createAction<{ data: ICreateCooperation; navigate: INavigate }>(
  "createCooperationAction",
);
export const updateCooperationListAction = createAction<{ data: IUpdateCooperation; navigate: INavigate; id: string }>(
  "updateCooperationListAction",
);
