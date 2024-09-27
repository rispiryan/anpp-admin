import { type RootState } from "../../../store/setupStore";

export const vacanciesLoadingSelector = (state: RootState) => state.vacancies.loading;
export const vacanciesListSelector = (state: RootState) => state.vacancies.vacanciesList;
export const vacanciesSelector = (state: RootState) => state.vacancies.vacancies;
