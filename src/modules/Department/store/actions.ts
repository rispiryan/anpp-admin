import { createAction } from "@reduxjs/toolkit";

import { type ICreateDepartment, type IDeleteDepartment, type IUpdateDepartment, type INavigate } from "./types";
export const getDepartmentListAction = createAction("getDepartmentListAction");
export const deleteDepartmentAction = createAction<IDeleteDepartment>("deleteDepartmentAction");
export const getDepartmentAction = createAction<string>("getDepartmentAction");
export const createDepartmentAction = createAction<{ data: ICreateDepartment; navigate: INavigate }>(
  "createDepartmentAction",
);
export const updateDepartmentAction = createAction<{ data: IUpdateDepartment; navigate: INavigate; id: string }>(
  "updateDepartmentAction",
);
