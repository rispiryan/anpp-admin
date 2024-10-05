export type IShoppingState = {
  shopping: IShopping | null;
  shoppingList: IShopping[];
  loading: boolean;
};
export type IShopping = {
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

export type ICreateShopping = {
  en_description?: string;
  ru_description?: string;
  ar_description: string;
  en_title?: string;
  ru_title?: string;
  ar_title: string;
  link: string;
  image: any;
};

export type IUpdateShopping = {
  en_description?: string;
  ru_description?: string;
  ar_description?: string;
  en_title?: string;
  ru_title?: string;
  ar_title?: string;
  link?: string;
  image?: any;
};

export type IDeleteShopping = {
  image: any;
  id: string;
};

export type INavigate = (to: string) => void;
