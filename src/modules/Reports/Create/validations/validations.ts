import * as Yup from "yup";

export const reportsSchema = Yup.object().shape({
  file: Yup.array().required("Field is mandatory").min(1, "At least one image is required"),
  fileName: Yup.string().required("Field is mandatory"),
});
