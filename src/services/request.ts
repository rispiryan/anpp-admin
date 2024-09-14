import axios, { type AxiosRequestConfig } from "axios";

import { API_BASE_URL, APP_PATHS } from "../constants";

async function request({
  baseURL = API_BASE_URL,
  responseType,
  headers,
  method,
  params,
  signal,
  data,
  url,
}: Partial<AxiosRequestConfig>) {
  const token = localStorage.getItem("authToken");

  const config = {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    url: `${baseURL}/${url ?? ""}`,
    responseType,
    method,
    params,
    signal,
    data,
  };

  try {
    return await axios(config);
  } catch (err: any) {
    if (err.response.status === 401) {
      window.location.replace(APP_PATHS.login);
      localStorage.setItem("authToken", "");
    }

    throw err;
  }
}

export default request;
