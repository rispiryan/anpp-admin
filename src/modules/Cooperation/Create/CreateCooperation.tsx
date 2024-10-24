import { useEffect } from "react";

import {
  updateCooperationListAction,
  createCooperationAction,
  getCooperationAction,
} from "@modules/Cooperation/store/actions";
import { cooperationLoadingSelector, cooperationSelector } from "@modules/Cooperation/store/selectors";
import { cooperationSchema } from "@modules/Cooperation/Create/validations/validations";
import { type ICreateCooperation } from "@modules/Cooperation/store/types";
import { Controller, useWatch, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@modules/common/components/Loader";
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

  const dispatch = useDispatch();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      ar_title: "",
      en_title: "",
      ru_title: "",
      link: "",
    },
    resolver: yupResolver(cooperationSchema),
  });
  const imageCover = useWatch({ name: "image", control });

  const onSubmit = (data: ICreateCooperation) => {
    if (params.id) {
      dispatch(updateCooperationListAction({ id: params.id, navigate, data }));
    } else {
      dispatch(createCooperationAction({ navigate, data }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getCooperationAction(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (cooperation) {
      const { en_title, ar_title, ru_title, image, link } = cooperation;
      setValue("image", [image]);
      setValue("en_title", en_title);
      setValue("ru_title", ru_title);
      setValue("ar_title", ar_title);
      setValue("link", link);
    }
  }, [cooperation, setValue]);

  return (
    <Box className={styles.createCooperation}>
      <Loader isLoading={loading} />
      <h2>{`${cooperation?.id ? "Update" : "Create"} Cooperation`}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ImageUploader
          setImageUrls={(value) => setValue("image", value)}
          hasErrorBlock={!!errors?.image?.message}
          message={errors?.image?.message}
          imageUrls={imageCover}
          isBig
        />
        <Box className={styles.titles}>
          <Controller
            render={({ field }) => (
              <Input
                helperText={errors?.ar_title?.message}
                error={!!errors?.ar_title?.message}
                className={styles.input}
                label="Ar Title"
                {...field}
              />
            )}
            control={control}
            name="ar_title"
          />
          <Controller
            render={({ field }) => <Input className={styles.input} label="En Title" {...field} />}
            control={control}
            name="en_title"
          />
          <Controller
            render={({ field }) => <Input className={styles.input} label="Ru Title" {...field} />}
            control={control}
            name="ru_title"
          />
        </Box>

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
          {cooperation?.id ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateCooperation;
