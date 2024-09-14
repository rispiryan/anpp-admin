import { type ILogin } from "@modules/auth/store/types";

import request from "../../../../services/request";

const END_POINTS = {
  login: "auth/login",
};

export function login(requestData: ILogin) {
  return request({
    url: `${END_POINTS.login}`,
    data: requestData,
    method: "POST",
  });
}
