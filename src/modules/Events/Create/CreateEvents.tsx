import { useEffect } from "react";

import { createEventsAction, updateEventsAction, getEventsAction } from "@modules/Events/store/actions";
import { eventsLoadingSelector, eventsSelector } from "@modules/Events/store/selectors";
import { eventsSchema } from "@modules/Events/validations/validations";
import { type ICreateEvents } from "@modules/Events/store/types";
import { Controller, useWatch, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box } from "@mui/material";

import ImageUploader from "../../../components/shared/ImageUploader";
import Input from "../../../components/shared/Input/Input";
import { convertDataForUpdate } from "../../../utils";

import styles from "./CreateEvents.module.scss";

const CreateEvents = () => {
  const events = useSelector(eventsSelector);
  const params = useParams();
  const navigate = useNavigate();
  const loading = useSelector(eventsLoadingSelector);

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
    resolver: yupResolver(eventsSchema),
  });
  const imageCover = useWatch({ name: "image", control });

  const onSubmit = (data: ICreateEvents) => {
    if (params.id) {
      dispatch(
        updateEventsAction({
          data: convertDataForUpdate(data, { ...dirtyFields, image: false }),
          id: params.id,
          navigate,
        }),
      );
    } else {
      dispatch(createEventsAction({ navigate, data }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getEventsAction(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (events) {
      const { ar_description, en_description, ru_description, ar_title, en_title, ru_title, image, link } = events;
      setValue("image", [image]);
      setValue("ar_title", ar_title);
      setValue("en_title", en_title);
      setValue("ru_title", ru_title);
      setValue("ar_description", ar_description);
      setValue("en_description", en_description);
      setValue("ru_description", ru_description);
      setValue("link", link);
    }
  }, [events, setValue]);

  return (
    <Box className={styles.createEvents}>
      <h2>{`${events?.id ? "Update" : "Create"} Events`}</h2>
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
            render={({ field }) => <Input className={styles.input} label="En description" {...field} />}
            name="en_description"
            control={control}
          />
          <Controller
            render={({ field }) => <Input className={styles.input} label="Ru description" {...field} />}
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
          {events?.id ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateEvents;
