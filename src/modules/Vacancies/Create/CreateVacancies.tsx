import { useEffect } from "react";

import { createVacanciesAction, updateVacanciesAction, getVacanciesAction } from "@modules/Vacancies/store/actions";
import { vacanciesLoadingSelector, vacanciesSelector } from "@modules/Vacancies/store/selectors";
import { vacanciesSchema } from "@modules/Vacancies/Create/validations/validations";
import { type ICreateVacancies } from "@modules/Vacancies/store/types";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box } from "@mui/material";

import Input from "../../../components/shared/Input/Input";
import { convertDataForUpdate } from "../../../utils";

import styles from "./CreateVacancies.module.scss";

const CreateVacancies = () => {
  const loading = useSelector(vacanciesLoadingSelector);
  const vacancies = useSelector(vacanciesSelector);
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch();
  const {
    formState: { dirtyFields, errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      ar_description: "",
      en_description: "",
      ru_description: "",
      ar_title: "",
      en_title: "",
      ru_title: "",
      link: "",
    },
    resolver: yupResolver(vacanciesSchema),
  });

  const onSubmit = (data: ICreateVacancies) => {
    if (params.id) {
      dispatch(updateVacanciesAction({ data: convertDataForUpdate(data, dirtyFields), id: params.id, navigate }));
    } else {
      dispatch(createVacanciesAction({ navigate, data }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getVacanciesAction(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (vacancies) {
      const { en_description, ar_description, ru_description, en_title, ar_title, ru_title, link } = vacancies;
      setValue("en_title", en_title);
      setValue("ru_title", ru_title);
      setValue("ar_title", ar_title);
      setValue("en_description", en_description);
      setValue("ru_description", ru_description);
      setValue("ar_description", ar_description);
      setValue("link", link);
    }
  }, [vacancies, setValue]);

  return (
    <Box className={styles.create}>
      <h2>{`${vacancies?.id ? "Update" : "Create"} Vacancies`}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <Box className={styles.titles}>
          <Controller
            render={({ field }) => (
              <Input
                helperText={errors?.ar_description?.message}
                error={!!errors?.ar_description?.message}
                className={styles.input}
                label="Ar description"
                {...field}
              />
            )}
            name="ar_description"
            control={control}
          />
          <Controller
            render={({ field }) => <Input className={styles.input} label="En Description" {...field} />}
            name="en_description"
            control={control}
          />
          <Controller
            render={({ field }) => <Input className={styles.input} label="Ru Description" {...field} />}
            name="ru_description"
            control={control}
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
          {vacancies?.id ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateVacancies;
