export type ICooperation = {
  cooperationList: { createdAt: string; title: string; image: string; link: string; id: string }[];
  loading: boolean;
};

export type ICreateCooperation = {
  title: string;
  link: string;
  image: any;
  id: string;
};

export type IDeleteCooperation = {
  image: any;
  id: string;
};
