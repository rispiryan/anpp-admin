// @ts-ignore
import { type PreloadedState, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { enableMapSet } from "immer";

enableMapSet();
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const sagaMiddleware = createSagaMiddleware();

  const reduxStore = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== "production",
    reducer: rootReducer,
    preloadedState,
  });

  sagaMiddleware.run(rootSaga);

  return reduxStore;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
