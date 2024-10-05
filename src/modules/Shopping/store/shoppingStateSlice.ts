import { createSlice } from "@reduxjs/toolkit";

import { type IShoppingState } from "./types";

const initialState: IShoppingState = {
  shoppingList: [],
  loading: false,
  shopping: null,
};

const shoppingStateSlice = createSlice({
  reducers: {
    getShoppingListSuccessAction: (state: IShoppingState, { payload }) => {
      state.shoppingList = payload;
      state.shopping = null;
    },
    getShoppingSuccessAction: (state: IShoppingState, { payload }) => {
      state.shopping = payload;
    },
    setLoading: (state: IShoppingState, { payload }) => {
      state.loading = payload;
    },
  },
  name: "shopping",
  initialState,
});

export default shoppingStateSlice;
