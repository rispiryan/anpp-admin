import { type RoleType } from "../../../constants/userRoles";

export type IAuth = {
  user: IUser | null;
  loading: boolean;
};

export type IUser = {
  fullName: string;
  roles: IRoles[];
  email: string;
  id: number;
};

export type IRoles = {
  description: string;
  value: RoleType;
  id: number;
};

export type ILogin = {
  password: string;
  email: string;
};
