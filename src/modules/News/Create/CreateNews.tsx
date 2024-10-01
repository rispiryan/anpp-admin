import { useEffect } from "react";

import { createNewsAction, updateNewsAction, getNewsAction } from "@modules/News/store/actions";
import { newsLoadingSelector, newsSelector } from "@modules/News/store/selectors";
import { newsSchema } from "@modules/News/Create/validations/validations";
import { Controller, useWatch, useForm } from "react-hook-form";
import { type ICreateNews } from "@modules/News/store/types";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box } from "@mui/material";

import ImageUploader from "../../../components/shared/ImageUploader";
import Input from "../../../components/shared/Input/Input";
import Quill from "../../../components/shared/Quill";

import styles from "./CreateNews.module.scss";

const CreateNews = () => {
  const loading = useSelector(newsLoadingSelector);
  const news = useSelector(newsSelector);
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

  const onSubmit = (data: ICreateNews) => {
    if (params.id) {
      dispatch(updateNewsAction({ id: params.id, navigate, data }));
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
      const { en_title, ar_title, ru_title, image } = news;
      setValue("image", [image]);
      setValue("en_title", en_title);
      setValue("ru_title", ru_title);
      setValue("ar_title", ar_title);
    }
  }, [news, setValue]);

  return (
    <Box className={styles.create}>
      <h2>{`${news?.id ? "Update" : "Create"} News`}</h2>
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
        <Box className={styles.titles}>
          <Controller
            render={({ field }) => (
              <Input
                helperText={errors?.ar_description?.message}
                error={!!errors?.ar_title?.message}
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
