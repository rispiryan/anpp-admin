import { cooperationSchema } from "@modules/cooperation/Create/validations/validations";
import { cooperationLoadingSelector } from "@modules/cooperation/store/selectors";
import { createCooperationListAction } from "@modules/cooperation/store/actions";
import { type ICreateCooperation } from "@modules/cooperation/store/types";
import { Controller, useWatch, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

import ImageUploader from "../../../components/shared/ImageUploader";
import Input from "../../../components/shared/Input/Input";

import styles from "./CreateCooperation.module.scss";

const CreateCooperation = () => {
  const loading = useSelector(cooperationLoadingSelector);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      link: "",
    },
    resolver: yupResolver(cooperationSchema),
  });
  const imageCover = useWatch({ name: "image", control });

  const onSubmit = (data: ICreateCooperation) => {
    dispatch(createCooperationListAction({ navigate, data }));
  };

  return (
    <Box className={styles.createCooperation}>
      <h2>Create Cooperation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ImageUploader
          setImageUrls={(value) => setValue("image", value)}
          hasErrorBlock={!!errors?.image?.message}
          message={errors?.image?.message}
          imageUrls={imageCover}
          isBig
        />

        <Controller
          render={({ field }) => (
            <Input
              helperText={errors?.title?.message}
              error={!!errors?.title?.message}
              className={styles.input}
              label="Title"
              {...field}
            />
          )}
          control={control}
          name="title"
        />
        <Controller
          render={({ field }) => (
            <Input
              helperText={errors?.link?.message}
              error={!!errors?.link?.message}
              className={styles.input}
              label="Link"
              {...field}
            />
          )}
          control={control}
          name="link"
        />
        <Button className={styles.button} variant="contained" disabled={loading} type="submit">
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateCooperation;
