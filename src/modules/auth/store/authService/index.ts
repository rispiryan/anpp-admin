import { type ILogin } from "@modules/auth/store/types";

import request from "../../../../services/request";

const END_POINTS = {
  changePassword: "users/change-password",
  profile: "users/profile",
  logout: "auth/logout",
  login: "auth/login",
};

export function login(requestData: ILogin) {
  return request({
    url: `${END_POINTS.login}`,
    data: requestData,
    method: "POST",
  });
}

export function getProfile() {
  return request({
    url: `${END_POINTS.profile}`,
  });
}

export function changePassword(password: string) {
  return request({
    url: `${END_POINTS.changePassword}`,
    data: { password },
    method: "POST",
  });
}

export function logAut(token: string) {
  return request({
    url: `${END_POINTS.logout}`,
    data: { token },
    method: "POST",
  });
}
