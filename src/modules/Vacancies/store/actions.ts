import { createAction } from "@reduxjs/toolkit";

import { type IUpdateVacancies, type ICreateVacancies, type IDeleteVacancies, type INavigate } from "./types";
export const getVacanciesListAction = createAction("getVacanciesListAction");
export const deleteVacanciesAction = createAction<IDeleteVacancies>("deleteVacanciesAction");
export const getVacanciesAction = createAction<string>("getVacanciesAction");
export const createVacanciesAction = createAction<{ data: ICreateVacancies; navigate: INavigate }>(
  "createVacanciesAction",
);
export const updateVacanciesAction = createAction<{ data: IUpdateVacancies; navigate: INavigate; id: string }>(
  "updateVacanciesAction",
);
