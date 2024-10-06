export type IDepartmentState = {
  department: IDepartment | null;
  departmentList: IDepartment[];
  loading: boolean;
};
export type IDepartment = {
  contentImages1: string;
  contentImages2: string;
  attachedFiles: string;
  en_content1: string;
  ru_content1: string;
  ar_content1: string;
  en_content2: string;
  ru_content2: string;
  ar_content2: string;
  en_content3: string;
  ru_content3: string;
  ar_content3: string;
  createdAt: string;
  en_title: string;
  ru_title: string;
  ar_title: string;
  slug: string;
  id: string;
};

export type ICreateDepartment = {
  contentImages1?: any[];
  contentImages2?: any[];
  attachedFiles?: any[];
  en_content1?: string;
  ru_content1?: string;
  ar_content1?: string;
  en_content2?: string;
  ru_content2?: string;
  ar_content2?: string;
  en_content3?: string;
  ru_content3?: string;
  ar_content3?: string;
  en_title?: string;
  ru_title?: string;
  ar_title: string;
  slug: string;
};

export type IUpdateDepartment = {
  contentImages1?: any[];
  contentImages2?: any[];
  attachedFiles?: any[];
  en_content1?: string;
  ru_content1?: string;
  ar_content1?: string;
  en_content2?: string;
  ru_content2?: string;
  ar_content2?: string;
  en_content3?: string;
  ru_content3?: string;
  ar_content3?: string;
  en_title?: string;
  ru_title?: string;
  ar_title?: string;
  slug?: string;
};

export type IDeleteDepartment = {
  deletedImages: string;
  id: string;
};

export type INavigate = (to: string) => void;
