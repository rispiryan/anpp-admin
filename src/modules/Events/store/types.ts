export type IEventsState = {
  events: IEvents | null;
  eventsList: IEvents[];
  loading: boolean;
};
export type IEvents = {
  en_description: string;
  ru_description: string;
  ar_description: string;
  createdAt: string;
  en_title: string;
  ru_title: string;
  ar_title: string;
  image: string;
  link: string;
  id: string;
};

export type ICreateEvents = {
  en_description?: string;
  ru_description?: string;
  ar_description: string;
  en_title?: string;
  ru_title?: string;
  ar_title: string;
  link: string;
  image: any;
};

export type IUpdateEvents = {
  en_description?: string;
  ru_description?: string;
  ar_description?: string;
  en_title?: string;
  ru_title?: string;
  ar_title?: string;
  link?: string;
  image?: any;
};

export type IDeleteEvents = {
  image: any;
  id: string;
};

export type INavigate = (to: string) => void;
