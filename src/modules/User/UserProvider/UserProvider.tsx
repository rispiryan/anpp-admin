import { type PropsWithChildren, useCallback, useEffect, useState, type FC } from "react";

import Loader from "@modules/common/components/Loader";
import { useQuery } from "@tanstack/react-query";
import { type IUser } from "@modules/User/types";
import { UserApi } from "@modules/User/UserApi";
import { useNavigate } from "react-router-dom";
import axios, { type AxiosError } from "axios";

import { APP_PATHS } from "../../../constants";
import UserContext from "./UserContext";

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const tokenFromLocalStorage = localStorage.getItem("authToken");
  const [token, setToken] = useState("");
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const { isFetching, data } = useQuery({
    queryKey: UserApi.getUser.queryKey(token),
    queryFn: UserApi.getUser.queryFn,
    enabled: !!token,
  });

  const removeCreds = useCallback(() => {
    localStorage.removeItem("authToken");
    setToken("");
    setUser(null);
    axios.defaults.headers.Authorization = null;
  }, []);

  const setCreds = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    axios.defaults.headers.Authorization = `Bearer ${newToken}`;
    axios.defaults.withCredentials = false;
  };

  const logout = useCallback(() => {
    removeCreds();
  }, [removeCreds]);

  const login = useCallback((newToken: string) => {
    setCreds(newToken);
  }, []);

  useEffect(() => {
    if (!!tokenFromLocalStorage && !token) {
      setCreds(tokenFromLocalStorage);
    }
  }, [token, tokenFromLocalStorage]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          removeCreds();
          navigate(APP_PATHS.login);
        }

        throw error;
      },
    );
  }, [removeCreds, navigate]);

  // This state is when page is refreshed and we have token in localstorage but not set in app
  const isInitialState = !!tokenFromLocalStorage && !token;
  // This state is when request is done but User data is not set
  const responsesFulfilled = token && !user;

  console.log(
    "isFetching || isInitialState || responsesFulfilled",
    !!(isFetching || isInitialState || responsesFulfilled),
  );

  return (
    <UserContext.Provider value={{ isAuthenticated: !!(token || tokenFromLocalStorage), logout, login, user }}>
      {isFetching || isInitialState || responsesFulfilled ? <Loader isLoading /> : <>{children}</>}
    </UserContext.Provider>
  );
};

export default UserProvider;
