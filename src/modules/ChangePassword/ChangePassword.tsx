import { authLoadingSelector } from "@modules/auth/store/selectors";
import { changePasswordAction } from "@modules/auth/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Input from "../../components/shared/Input/Input";

import styles from "./ChangePassword.module.scss";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector(authLoadingSelector);
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = ({ password }: { password: string }) => {
    dispatch(changePasswordAction({ password, navigate }));
    reset();
  };

  return (
    <div className={styles.changePassword}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <p>Change Password</p>
        <Controller
          render={({ field }) => (
            <Input
              helperText={errors?.password?.message}
              error={!!errors?.password?.message}
              className={styles.input}
              label="Password"
              {...field}
            />
          )}
          rules={{ required: "Password is required" }}
          control={control}
          name="password"
        />
        <Button className={styles.button} variant="contained" disabled={loading} type="submit">
          submit
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
