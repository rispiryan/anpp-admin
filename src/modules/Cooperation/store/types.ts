export type ICooperationState = {
  cooperation: ICooperation | null;
  cooperationList: ICooperation[];
  loading: boolean;
};
export type ICooperation = {
  createdAt: string;
  en_title: string;
  ru_title: string;
  ar_title: string;
  image: string;
  link: string;
  id: string;
};

export type ICreateCooperation = {
  en_title?: string;
  ru_title?: string;
  ar_title: string;
  link: string;
  image: any;
};

export type IUpdateCooperation = {
  en_title?: string;
  ru_title?: string;
  ar_title: string;
  link: string;
  image?: any;
};

export type IDeleteCooperation = {
  image: any;
  id: string;
};

export type INavigate = (to: string) => void;
