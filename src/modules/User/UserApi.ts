import { type ILoginRequestBody, type ILoginResponse, type IUser } from "@modules/User/types";
import { usersQueryKeys } from "@modules/User/query-keys";
import { API_USERS } from "@modules/User/consts";
import axios from "axios";

const login = (data: ILoginRequestBody) => axios.post<ILoginResponse>(`${API_USERS}/signIn`, { ...data });

const userService = {
  login,
};

const getUserInfo = () => axios.get<IUser>(`${API_USERS}/profile`);

const getUser = {
  queryKey: usersQueryKeys.getUserInfo,
  queryFn: () => getUserInfo().then(({ data }) => data),
  fetch: getUserInfo,
};

export const UserApi = { userService, getUser };
