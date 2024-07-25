import type { IError } from "@modules/types";
import type { AxiosError } from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@modules/User/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { UserApi } from "@modules/User/UserApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { PASSWORD_REGEXP } from "../../../constants/regexps";

export interface IUserLoginForm {
  password: string;
  userName: string;
}

const schema = Yup.object().shape({
  password: Yup.string()
    .required("requiredfield")
    .test("wrongPassword", (value, context) => {
      if (!PASSWORD_REGEXP.test(value)) {
        return new Yup.ValidationError([
          context.createError({
            message: "wrongPassword",
          }),
        ]);
      }

      return true;
    }),
  userName: Yup.string().email("wrongEmail").required("requiredfield"),
});

export const useLoginForm = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const form = useForm<IUserLoginForm>({
    defaultValues: {
      password: "",
      userName: "",
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    shouldFocusError: true,
    mode: "onBlur",
  });

  const { mutate: loginMutation, isPending } = useMutation({
    onSuccess: ({ data: { token } }) => {
      login(token);
      navigate("/");
    },
    onError: (error: AxiosError<IError>) => {
      console.log(error);
    },
    mutationFn: UserApi.userService.login,
  });

  const onSubmit = (data: IUserLoginForm) => {
    loginMutation(data);
  };

  return { isPending, onSubmit, form };
};
