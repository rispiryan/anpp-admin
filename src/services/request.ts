import axios, { type AxiosRequestConfig } from "axios";

async function request({
  baseURL = process.env.REACT_APP_BASE_URL,
  responseType,
  headers,
  method,
  params,
  signal,
  data,
  url,
}: Partial<AxiosRequestConfig>) {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      ...headers,
      "x-access-token": token,
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
    if (err.response.status === 403) {
      window.location.replace("/auth/login");
      localStorage.setItem("token", "");
    }

    throw err;
  }
}

export default request;
