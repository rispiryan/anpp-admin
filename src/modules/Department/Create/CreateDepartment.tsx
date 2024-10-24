import { useEffect, useMemo } from "react";

import {
  getDepartmentListAction,
  createDepartmentAction,
  updateDepartmentAction,
  getDepartmentAction,
} from "@modules/Department/store/actions";
import {
  departmentLoadingSelector,
  departmentListSelector,
  departmentSelector,
} from "@modules/Department/store/selectors";
import { departmentSchema } from "@modules/Department/Create/validations/validations";
import { FormControl, MenuItem, Button, Select, Box } from "@mui/material";
import { type ICreateDepartment } from "@modules/Department/store/types";
import { Controller, useWatch, useForm } from "react-hook-form";
import { departmentTypes } from "@modules/Department/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@modules/common/components/Loader";
import { yupResolver } from "@hookform/resolvers/yup";

import ImageUploader from "../../../components/shared/ImageUploader";
import Input from "../../../components/shared/Input/Input";
import { convertDataForUpdate } from "../../../utils";
import Quill from "../../../components/shared/Quill";

import styles from "./CreateDepartament.module.scss";

const CreateDepartment = () => {
  const loading = useSelector(departmentLoadingSelector);
  const department = useSelector(departmentSelector);
  const departmentList = useSelector(departmentListSelector);
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
      ar_content1: "",
      en_content1: "",
      ru_content1: "",
      ar_content2: "",
      en_content2: "",
      ru_content2: "",
      ar_content3: "",
      en_content3: "",
      ru_content3: "",
      ar_title: "",
      en_title: "",
      ru_title: "",
      slug: "",
    },
    resolver: yupResolver(departmentSchema),
  });
  const attachedFiles = useWatch({ name: "attachedFiles", control });
  const contentImages1 = useWatch({ name: "contentImages1", control });
  const contentImages2 = useWatch({ name: "contentImages2", control });
  const deletedFiles = useWatch({ name: "deletedFiles", control });

  const onSubmit = (data: ICreateDepartment) => {
    if (params.id) {
      dispatch(
        updateDepartmentAction({
          data: convertDataForUpdate(data, {
            ...dirtyFields,
            contentImages1: false,
            contentImages2: false,
            attachedFiles: false,
            deletedFiles: false,
          }),
          id: params.id,
          navigate,
        }),
      );
    } else {
      dispatch(createDepartmentAction({ navigate, data }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getDepartmentAction(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (department) {
      const {
        contentImages1,
        contentImages2,
        attachedFiles,
        en_content2,
        en_content1,
        ru_content1,
        ar_content1,
        ru_content2,
        ar_content2,
        en_content3,
        ru_content3,
        ar_content3,
        en_title,
        ar_title,
        ru_title,
        slug,
      } = department;
      setValue("attachedFiles", attachedFiles?.length ? [...attachedFiles.split(",")] : []);
      setValue("contentImages1", contentImages1?.length ? [...contentImages1.split(",")] : []);
      setValue("contentImages2", contentImages2?.length ? [...contentImages2.split(",")] : []);
      setValue("en_title", en_title);
      setValue("ru_title", ru_title);
      setValue("ar_title", ar_title);
      setValue("slug", slug);
      setValue("en_content1", en_content1);
      setValue("ru_content1", ru_content1);
      setValue("ar_content1", ar_content1);
      setValue("en_content2", en_content2);
      setValue("ru_content2", ru_content2);
      setValue("ar_content2", ar_content2);
      setValue("en_content3", en_content3);
      setValue("ru_content3", ru_content3);
      setValue("ar_content3", ar_content3);
    }
  }, [department, setValue]);

  const deleteFile = (file: string) => {
    setValue("deletedFiles", deletedFiles?.length ? [...deletedFiles, file] : [file]);
  };

  useEffect(() => {
    dispatch(getDepartmentListAction());
  }, [dispatch]);

  const typesOption = useMemo(() => {
    const option = departmentTypes.filter(
      (type) => !departmentList.some((department) => department.slug === type.value),
    );

    if (option.length) {
      setValue("slug", option[0].value);
    }

    return option;
  }, [departmentList]);

  return (
    <Box className={styles.create}>
      <Loader isLoading={loading} />
      <h2>{`${department?.id ? "Update" : "Create"} Department`}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          render={({ field }) => (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <div className={styles.selectWrap}>
                  <p>Select Department Type</p>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    className={styles.select}
                    id="demo-simple-select"
                  >
                    {typesOption.map((type) => (
                      <MenuItem className={styles.item} value={type.value} key={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </FormControl>
            </Box>
          )}
          control={control}
          name="slug"
        />
        {/*<Controller*/}
        {/*  render={({ field }) => (*/}
        {/*    <Input*/}
        {/*      helperText={errors?.slug?.message}*/}
        {/*      error={!!errors?.slug?.message}*/}
        {/*      className={styles.input}*/}
        {/*      label="Slug"*/}
        {/*      {...field}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*  control={control}*/}
        {/*  name="slug"*/}
        {/*/>*/}
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
            render={({ field }) => <Quill placeholder="Ar content 1" className={styles.input} {...field} />}
            name="ar_content1"
            control={control}
          />
          <Controller
            render={({ field }) => <Quill placeholder="En content 1" className={styles.input} {...field} />}
            name="en_content1"
            control={control}
          />
          <Controller
            render={({ field }) => <Quill placeholder="Ru content 1" className={styles.input} {...field} />}
            name="ru_content1"
            control={control}
          />
        </Box>
        <ImageUploader
          setImageUrls={(value) => setValue("contentImages1", value)}
          imageUrls={contentImages1}
          deleteImage={deleteFile}
          limit={3}
          multiple
        />
        <Box className={styles.titles}>
          <Controller
            render={({ field }) => <Quill placeholder="Ar content 2" className={styles.input} {...field} />}
            name="ar_content2"
            control={control}
          />
          <Controller
            render={({ field }) => <Quill placeholder="En content 2" className={styles.input} {...field} />}
            name="en_content2"
            control={control}
          />
          <Controller
            render={({ field }) => <Quill placeholder="Ru content 2" className={styles.input} {...field} />}
            name="ru_content2"
            control={control}
          />
        </Box>
        <ImageUploader
          setImageUrls={(value) => setValue("contentImages2", value)}
          imageUrls={contentImages2}
          deleteImage={deleteFile}
          limit={3}
          multiple
        />
        <Box className={styles.titles}>
          <Controller
            render={({ field }) => <Quill placeholder="Ar content 3" className={styles.input} {...field} />}
            name="ar_content3"
            control={control}
          />
          <Controller
            render={({ field }) => <Quill placeholder="En content 3" className={styles.input} {...field} />}
            name="en_content3"
            control={control}
          />
          <Controller
            render={({ field }) => <Quill placeholder="Ru content 3" className={styles.input} {...field} />}
            name="ru_content3"
            control={control}
          />
        </Box>
        <p>Attach file</p>
        <ImageUploader
          setImageUrls={(value) => setValue("attachedFiles", value)}
          accept="application/pdf,application/vnd.ms-excel"
          hasErrorBlock={!!errors?.attachedFiles?.message}
          message={errors?.attachedFiles?.message}
          imageUrls={attachedFiles}
          uploaderText="Upload pdf"
          deleteImage={deleteFile}
          fileTypeText="pdf"
          limit={4}
          multiple
        />

        <Button className={styles.button} variant="contained" disabled={loading} type="submit">
          {department?.id ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateDepartment;
