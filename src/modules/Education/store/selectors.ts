import { type RootState } from "../../../store/setupStore";

export const educationLoadingSelector = (state: RootState) => state.education.loading;
export const educationListSelector = (state: RootState) => state.education.educationList;
export const educationSelector = (state: RootState) => state.education.education;
