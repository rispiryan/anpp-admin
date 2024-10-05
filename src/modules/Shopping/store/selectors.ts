import { type RootState } from "../../../store/setupStore";

export const shoppingLoadingSelector = (state: RootState) => state.shopping.loading;
export const shoppingListSelector = (state: RootState) => state.shopping.shoppingList;
export const shoppingSelector = (state: RootState) => state.shopping.shopping;
