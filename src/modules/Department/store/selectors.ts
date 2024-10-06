import { type RootState } from "../../../store/setupStore";

export const departmentLoadingSelector = (state: RootState) => state.department.loading;
export const departmentListSelector = (state: RootState) => state.department.departmentList;
export const departmentSelector = (state: RootState) => state.department.department;
