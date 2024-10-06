import { createAction } from "@reduxjs/toolkit";

import { type ICreateEducation, type IDeleteEducation, type IUpdateEducation, type INavigate } from "./types";
export const getEducationListAction = createAction("getEducationListAction");
export const deleteEducationAction = createAction<IDeleteEducation>("deleteEducationAction");
export const getEducationAction = createAction<string>("getEducationAction");
export const createEducationAction = createAction<{ data: ICreateEducation; navigate: INavigate }>(
  "createEducationAction",
);
export const updateEducationAction = createAction<{ data: IUpdateEducation; navigate: INavigate; id: string }>(
  "updateEducationAction",
);
