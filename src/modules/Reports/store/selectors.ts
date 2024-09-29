import { type RootState } from "../../../store/setupStore";

export const reportsLoadingSelector = (state: RootState) => state.reports.loading;
export const reportsListSelector = (state: RootState) => state.reports.reportsList;
export const reportsSelector = (state: RootState) => state.reports.reports;
