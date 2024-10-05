import { createAction } from "@reduxjs/toolkit";

import { type ICreateShopping, type IDeleteShopping, type IUpdateShopping, type INavigate } from "./types";
export const getShoppingListAction = createAction("getShoppingListAction");
export const deleteShoppingAction = createAction<IDeleteShopping>("deleteShoppingAction");
export const getShoppingAction = createAction<string>("getShoppingAction");
export const createShoppingAction = createAction<{ data: ICreateShopping; navigate: INavigate }>(
  "createShoppingAction",
);
export const updateShoppingAction = createAction<{ data: IUpdateShopping; navigate: INavigate; id: string }>(
  "updateShoppingListAction",
);
