import { type RootState } from "../../../store/setupStore";

export const authLoadingSelector = (state: RootState) => state.authSlice.loading;
export const userSelector = (state: RootState) => state.authSlice.user;
