import { useEffect } from "react";

import {
  createCooperationListAction,
  updateCooperationListAction,
  getCooperationAction,
} from "@modules/cooperation/store/actions";
import { cooperationLoadingSelector, cooperationSelector } from "@modules/cooperation/store/selectors";
import { cooperationSchema } from "@modules/cooperation/Create/validations/validations";
import { type ICreateCooperation } from "@modules/cooperation/store/types";
import { Controller, useWatch, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box } from "@mui/material";

import ImageUploader from "../../../components/shared/ImageUploader";
import Input from "../../../components/shared/Input/Input";

import styles from "./CreateCooperation.module.scss";

const CreateCooperation = () => {
  const loading = useSelector(cooperationLoadingSelector);
  const cooperation = useSelector(cooperationSelector);
  const navigate = useNavigate();
  const params = useParams();
  console.log(params, 2332);
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
    if (params.id) {
      dispatch(updateCooperationListAction({ id: params.id, navigate, data }));
    } else {
      dispatch(createCooperationListAction({ navigate, data }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getCooperationAction(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (cooperation) {
      const { image, title, link } = cooperation;
      setValue("image", [image]);
      setValue("title", title);
      setValue("link", link);
    }
  }, [cooperation, setValue]);

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
