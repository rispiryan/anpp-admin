import * as Yup from "yup";

import { EMAIL_REGEXP } from "../../../constants/regexps";
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_REGEXP, "Please enter a valid email address")
    .required("Please enter a valid email address"),
  password: Yup.string().required("Please enter your password"),
});
