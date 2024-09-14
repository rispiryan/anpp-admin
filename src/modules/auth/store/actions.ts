import { type ILogin } from "@modules/auth/store/types";
import { createAction } from "@reduxjs/toolkit";
export const loginAction = createAction<ILogin>("authLoginAction");
