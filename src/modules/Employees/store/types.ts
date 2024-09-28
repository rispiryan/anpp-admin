export type IEmployeesState = {
  employees: IEmployees | null;
  employeesList: IEmployees[];
  loading: boolean;
};
export type IEmployees = {
  en_fullName?: string;
  ru_fullName?: string;
  ar_fullName: string;
  en_content?: string;
  ru_content?: string;
  ar_content?: string;
  createdAt: string;
  en_rank?: string;
  ru_rank?: string;
  ar_rank: string;
  id: string;
  image: any;
};

export type ICreateEmployees = {
  en_fullName?: string;
  ru_fullName?: string;
  ar_fullName: string;
  en_content?: string;
  ru_content?: string;
  ar_content?: string;
  en_rank?: string;
  ru_rank?: string;
  ar_rank: string;
  image: any;
};

export type IUpdateEmployees = {
  en_fullName?: string;
  ru_fullName?: string;
  ar_fullName?: string;
  en_content?: string;
  ru_content?: string;
  ar_content?: string;
  createdAt?: string;
  en_rank?: string;
  ru_rank?: string;
  ar_rank?: string;
  image?: any;
};

export type IDeleteEmployees = {
  id: string;
};

export type INavigate = (to: string) => void;
