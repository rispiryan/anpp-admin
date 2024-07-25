import { useEffect } from "react";

import { useLoginForm } from "@modules/User/hooks/useLoginForm";
import Loader from "@modules/common/components/Loader";
import { useUser } from "@modules/User/hooks/useUser";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";

const Login = () => {
  const { user } = useUser();
  const { isPending, onSubmit, form } = useLoginForm();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  console.log("errors", errors);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [isPending]);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <Loader isLoading={isPending} />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>
            <p>Login</p>
          </div>
          <div className={styles.form}>
            <input
              // label="Mail"
              {...register("userName")}
              // error={t((errors["userName"]?.message as string) || "")}
            />
            <input
              {...register("password")}
              // error={t((errors["password"]?.message as string) || "")}
              // label={t("password")}
            />
          </div>
          <button onClick={handleSubmit(onSubmit)}>registration</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
