import { type IChangePassword, type ILogin } from "@modules/auth/store/types";
import { createAction } from "@reduxjs/toolkit";
export const loginAction = createAction<ILogin>("authLoginAction");
export const getProfileAction = createAction("getProfileAction");
export const changePasswordAction = createAction<IChangePassword>("changePasswordAction");
export const logOutAction = createAction<string>("logOutAction");
