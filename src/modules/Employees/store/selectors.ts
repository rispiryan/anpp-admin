import { type RootState } from "../../../store/setupStore";

export const employeesLoadingSelector = (state: RootState) => state.employees.loading;
export const employeesListSelector = (state: RootState) => state.employees.employeesList;
export const employeesSelector = (state: RootState) => state.employees.employees;
