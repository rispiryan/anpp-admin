import { useEffect } from "react";

import { createReportsAction, updateReportsAction, getReportsAction } from "@modules/Reports/store/actions";
import { reportsLoadingSelector, reportsSelector } from "@modules/Reports/store/selectors";
import { reportsSchema } from "@modules/Reports/Create/validations/validations";
import { type ICreateReports } from "@modules/Reports/store/types";
import { Controller, useWatch, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@modules/common/components/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box } from "@mui/material";

import ImageUploader from "../../../components/shared/ImageUploader";
import Input from "../../../components/shared/Input/Input";

import styles from "./CreateReports.module.scss";

const CreateReports = () => {
  const navigate = useNavigate();
  const params = useParams();
  const report = useSelector(reportsSelector);
  const loading = useSelector(reportsLoadingSelector);

  const dispatch = useDispatch();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      fileName: "",
    },
    resolver: yupResolver(reportsSchema),
  });
  const imageCover = useWatch({ name: "file", control });

  const onSubmit = (data: ICreateReports) => {
    if (params.id) {
      dispatch(updateReportsAction({ id: params.id, navigate, data }));
    } else {
      dispatch(createReportsAction({ navigate, data }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getReportsAction(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (report) {
      setValue("fileName", report.fileName);
      setValue("file", [report.file]);
    }
  }, [report, setValue]);

  return (
    <Box className={styles.create}>
      <Loader isLoading={loading} />
      <h2>{`${report?.id ? "Update" : "Create"} Reports`}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ImageUploader
          accept="application/pdf,application/vnd.ms-excel"
          setImageUrls={(value) => setValue("file", value)}
          hasErrorBlock={!!errors?.file?.message}
          message={errors?.file?.message}
          uploaderText="Upload pdf"
          imageUrls={imageCover}
          fileTypeText="pdf"
          isBig
        />
        <Box className={styles.titles}>
          <Controller
            render={({ field }) => (
              <Input
                helperText={errors?.fileName?.message}
                error={!!errors?.fileName?.message}
                className={styles.input}
                label="File Name"
                {...field}
              />
            )}
            control={control}
            name="fileName"
          />
        </Box>

        <Button className={styles.button} variant="contained" disabled={loading} type="submit">
          {report?.id ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateReports;
