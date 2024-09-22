export type ICooperationState = {
  cooperation: ICooperation | null;
  cooperationList: ICooperation[];
  loading: boolean;
};
export type ICooperation = {
  createdAt: string;
  title: string;
  image: string;
  link: string;
  id: string;
};

export type ICreateCooperation = {
  title: string;
  link: string;
  image: any;
};

export type IUpdateCooperation = {
  title: string;
  link: string;
  image?: any;
};

export type IDeleteCooperation = {
  image: any;
  id: string;
};

export type INavigate = (to: string) => void;
