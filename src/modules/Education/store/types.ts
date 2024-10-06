export type IEducationState = {
  education: IEducation | null;
  educationList: IEducation[];
  loading: boolean;
};
export type IEducation = {
  en_description: string;
  ru_description: string;
  ar_description: string;
  contentImages1: string;
  contentImages2: string;
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
  image: string;
  id: string;
};

export type ICreateEducation = {
  en_description?: string;
  ru_description?: string;
  contentImages1?: any[];
  contentImages2?: any[];
  ar_description: string;
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
  image: any[];
};

export type IUpdateEducation = {
  en_description?: string;
  ru_description?: string;
  ar_description?: string;
  contentImages1?: any[];
  contentImages2?: any[];
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
  image?: any[];
};

export type IDeleteEducation = {
  deletedImages: string;
  id: string;
};

export type INavigate = (to: string) => void;
