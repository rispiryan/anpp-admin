import { useEffect } from "react";

import { authLoadingSelector, userSelector } from "@modules/auth/store/selectors";
import { loginSchema } from "@modules/auth/validations/validations";
import { loginAction } from "@modules/auth/store/actions";
import { type ILogin } from "@modules/auth/store/types";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

import Input from "../../../../components/shared/Input";
import { APP_PATHS } from "../../../../constants";

import styles from "./Login.module.scss";

const Login = () => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const loading = useSelector(authLoadingSelector);

  const dispatch = useDispatch();
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: ILogin) => {
    dispatch(loginAction(data));
  };

  useEffect(() => {
    if (user) {
      navigate(APP_PATHS.home);
    }
  }, [navigate, user]);

  return (
    <Box className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          render={({ field }) => (
            <Input
              helperText={errors?.email?.message}
              error={!!errors?.email?.message}
              placeholder="Enter your email"
              className={styles.input}
              label="Email"
              {...field}
            />
          )}
          control={control}
          name="email"
        />
        <Controller
          render={({ field }) => (
            <Input
              helperText={errors?.password?.message}
              error={!!errors?.password?.message}
              placeholder="Enter your password"
              className={styles.input}
              label="Password"
              type="password"
              {...field}
            />
          )}
          control={control}
          name="password"
        />

        <Button className={styles.button} variant="contained" disabled={loading} type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
