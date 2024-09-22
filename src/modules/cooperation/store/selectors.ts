import { type RootState } from "../../../store/setupStore";

export const cooperationLoadingSelector = (state: RootState) => state.cooperation.loading;
export const cooperationListSelector = (state: RootState) => state.cooperation.cooperationList;
export const cooperationSelector = (state: RootState) => state.cooperation.cooperation;
