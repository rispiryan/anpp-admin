import { type RootState } from "../../../store/setupStore";

export const newsLoadingSelector = (state: RootState) => state.news.loading;
export const newsListSelector = (state: RootState) => state.news.newsList;
export const newsSelector = (state: RootState) => state.news.news;
