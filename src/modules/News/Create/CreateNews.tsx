import { useEffect } from "react";

import { createNewsAction, updateNewsAction, getNewsAction } from "@modules/News/store/actions";
import { newsLoadingSelector, newsSelector } from "@modules/News/store/selectors";
import { newsSchema } from "@modules/News/Create/validations/validations";
import { Controller, useWatch, useForm } from "react-hook-form";
import { type ICreateNews } from "@modules/News/store/types";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@modules/common/components/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box } from "@mui/material";

import ImageUploader from "../../../components/shared/ImageUploader";
import Input from "../../../components/shared/Input/Input";
import { convertDataForUpdate } from "../../../utils";
import Quill from "../../../components/shared/Quill";

import styles from "./CreateNews.module.scss";

const CreateNews = () => {
  const loading = useSelector(newsLoadingSelector);
  const news = useSelector(newsSelector);
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
    },
    resolver: yupResolver(newsSchema),
  });
  const imageCover = useWatch({ name: "image", control });
  const contentImages1 = useWatch({ name: "contentImages1", control });
  const contentImages2 = useWatch({ name: "contentImages2", control });
  const deletedFiles = useWatch({ name: "deletedFiles", control });

  const onSubmit = (data: ICreateNews) => {
    if (params.id) {
      dispatch(
        updateNewsAction({
          data: convertDataForUpdate(data, {
            ...dirtyFields,
            contentImages1: false,
            contentImages2: false,
            deletedFiles: false,
            image: false,
          }),
          id: params.id,
          navigate,
        }),
      );
    } else {
      dispatch(createNewsAction({ navigate, data }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getNewsAction(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (news) {
      const {
        en_description,
        ru_description,
        ar_description,
        contentImages1,
        contentImages2,
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
        image,
      } = news;
      setValue("image", [image]);
      setValue("contentImages1", contentImages1?.length ? [...contentImages1.split(",")] : []);
      setValue("contentImages2", contentImages2?.length ? [...contentImages2.split(",")] : []);
      setValue("en_title", en_title);
      setValue("ru_title", ru_title);
      setValue("ar_title", ar_title);
      setValue("en_description", en_description);
      setValue("ru_description", ru_description);
      setValue("ar_description", ar_description);
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
  }, [news, setValue]);

  const deleteFile = (file: string) => {
    setValue("deletedFiles", deletedFiles?.length ? [...deletedFiles, file] : [file]);
  };

  return (
    <Box className={styles.create}>
      <Loader isLoading={loading} />
      <h2>{`${news?.id ? "Update" : "Create"} News`}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ImageUploader
          setImageUrls={(value) => setValue("image", value)}
          hasErrorBlock={!!errors?.image?.message}
          message={errors?.image?.message}
          deleteImage={deleteFile}
          imageUrls={imageCover}
          limit={1}
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
        <Box className={styles.titles}>
          <Controller
            render={({ field }) => (
              <Input
                helperText={errors?.ar_description?.message}
                error={!!errors?.ar_description?.message}
                className={styles.input}
                label="Ar Description"
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

        <Button className={styles.button} variant="contained" disabled={loading} type="submit">
          {news?.id ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateNews;
