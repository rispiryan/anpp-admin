export type IReportsState = {
  reports: IReports | null;
  reportsList: IReports[];
  loading: boolean;
};
export type IReports = {
  createdAt: string;
  fileName: string;
  file: string;
  id: string;
};

export type ICreateReports = {
  fileName?: string;
  file: any;
};

export type IUpdateReports = {
  fileName?: string;
  file?: any;
};

export type IDeleteReports = {
  id: string;
  file: any;
};

export type INavigate = (to: string) => void;
