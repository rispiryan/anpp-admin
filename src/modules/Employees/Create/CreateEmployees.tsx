import { useEffect } from "react";

import { createEmployeesAction, updateEmployeesAction, getEmployeesAction } from "@modules/Employees/store/actions";
import { employeesLoadingSelector, employeesSelector } from "@modules/Employees/store/selectors";
import { type ICreateEmployees, type IUpdateEmployees } from "@modules/Employees/store/types";
import { employeesSchema } from "@modules/Employees/Create/validations/validations";
import { Controller, useWatch, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box } from "@mui/material";

import ImageUploader from "../../../components/shared/ImageUploader";
import Input from "../../../components/shared/Input/Input";
import { convertDataForUpdate } from "../../../utils";
import Quill from "../../../components/shared/Quill";

import styles from "@modules/Vacancies/Create/CreateVacancies.module.scss";

const CreateEmployees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const employees = useSelector(employeesSelector);
  const loading = useSelector(employeesLoadingSelector);

  const {
    formState: { dirtyFields, errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      ar_fullName: "",
      en_fullName: "",
      ru_fullName: "",
      ar_content: "",
      en_content: "",
      ru_content: "",
      ar_rank: "",
      en_rank: "",
      ru_rank: "",
    },
    resolver: yupResolver(employeesSchema),
  });
  const imageCover = useWatch({ name: "image", control });

  const onSubmit = (data: ICreateEmployees) => {
    if (params.id) {
      dispatch(
        updateEmployeesAction({
          data: {
            ...convertDataForUpdate<IUpdateEmployees>(data, { ...dirtyFields, image: false }),
            image: imageCover,
          },
          id: params.id,
          navigate,
        }),
      );
    } else {
      dispatch(createEmployeesAction({ navigate, data }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getEmployeesAction(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (employees) {
      const {
        ar_fullName,
        en_fullName,
        ru_fullName,
        ar_content,
        en_content,
        ru_content,
        en_rank,
        ar_rank,
        ru_rank,
        image,
      } = employees;
      setValue("image", [image]);
      setValue("ar_rank", ar_rank);
      setValue("en_rank", en_rank);
      setValue("ru_rank", ru_rank);
      setValue("ar_fullName", ar_fullName);
      setValue("en_fullName", en_fullName);
      setValue("ru_fullName", ru_fullName);
      setValue("ar_content", ar_content);
      setValue("en_content", en_content);
      setValue("ru_content", ru_content);
    }
  }, [employees, setValue]);

  return (
    <Box className={styles.create}>
      <h2>{`${employees?.id ? "Update" : "Create"} Employees`}</h2>
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
                helperText={errors?.ar_fullName?.message}
                error={!!errors?.ar_fullName?.message}
                className={styles.input}
                label="Ar full name"
                {...field}
              />
            )}
            name="ar_fullName"
            control={control}
          />
          <Controller
            render={({ field }) => <Input className={styles.input} label="En full name" {...field} />}
            name="en_fullName"
            control={control}
          />
          <Controller
            render={({ field }) => <Input className={styles.input} label="Ru full name" {...field} />}
            name="ru_fullName"
            control={control}
          />
        </Box>
        <Box className={styles.titles}>
          <Controller
            render={({ field }) => (
              <Input
                helperText={errors?.ar_rank?.message}
                error={!!errors?.ar_rank?.message}
                className={styles.input}
                label="Ar rank"
                {...field}
              />
            )}
            control={control}
            name="ar_rank"
          />
          <Controller
            render={({ field }) => <Input className={styles.input} label="En rank" {...field} />}
            control={control}
            name="en_rank"
          />
          <Controller
            render={({ field }) => <Input className={styles.input} label="Ru rank" {...field} />}
            control={control}
            name="ru_rank"
          />
        </Box>
        <Box className={styles.titles}>
          <Controller
            render={({ field }) => <Quill className={styles.input} placeholder="Ar content" {...field} />}
            name="ar_content"
            control={control}
          />
          <Controller
            render={({ field }) => <Quill className={styles.input} placeholder="En content" {...field} />}
            name="en_content"
            control={control}
          />
          <Controller
            render={({ field }) => <Quill className={styles.input} placeholder="Ru content" {...field} />}
            name="ru_content"
            control={control}
          />
        </Box>
        <Button className={styles.button} variant="contained" disabled={loading} type="submit">
          {employees?.id ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateEmployees;
