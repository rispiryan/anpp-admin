export type IVacanciesState = {
  vacancies: IVacancies | null;
  vacanciesList: IVacancies[];
  loading: boolean;
};
export type IVacancies = {
  en_description?: string;
  ru_description?: string;
  ar_description: string;
  createdAt: string;
  en_title: string;
  ru_title: string;
  ar_title: string;
  link: string;
  id: string;
};

export type ICreateVacancies = {
  ru_description?: string;
  en_description?: string;
  ar_description: string;
  en_title?: string;
  ru_title?: string;
  ar_title: string;
  link: string;
};

export type IUpdateVacancies = {
  ru_description?: string;
  en_description?: string;
  ar_description?: string;
  en_title?: string;
  ru_title?: string;
  ar_title?: string;
  link?: string;
};

export type IDeleteVacancies = {
  id: string;
};

export type INavigate = (to: string) => void;
