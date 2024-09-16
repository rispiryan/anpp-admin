import { type IDeleteCooperation } from "@modules/cooperation/store/types";
import { createAction } from "@reduxjs/toolkit";
export const getCooperationListAction = createAction("getCooperationListAction");
export const deleteCooperationListAction = createAction<IDeleteCooperation>("deleteCooperationListAction");
