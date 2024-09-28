import { createAction } from "@reduxjs/toolkit";

import { type ICreateEmployees, type IDeleteEmployees, type IUpdateEmployees, type INavigate } from "./types";
export const getEmployeesListAction = createAction("getEmployeesListAction");
export const deleteEmployeesAction = createAction<IDeleteEmployees>("deleteEmployeesAction");
export const getEmployeesAction = createAction<string>("getEmployeesAction");
export const createEmployeesAction = createAction<{ data: ICreateEmployees; navigate: INavigate }>(
  "createEmployeesAction",
);
export const updateEmployeesAction = createAction<{ data: IUpdateEmployees; navigate: INavigate; id: string }>(
  "updateEmployeesAction",
);
