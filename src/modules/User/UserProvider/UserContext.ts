import { createContext } from "react";

import { type IUser } from "@modules/User/types";

export interface IUserContext {
  login: (token: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
  user: IUser | null;
}

export default createContext<IUserContext>({
  isAuthenticated: false,
  logout: () => {},
  login: () => {},
  user: null,
});
