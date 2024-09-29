import * as Yup from "yup";

export const cooperationSchema = Yup.object().shape({
  image: Yup.array().required("Field is mandatory").min(1, "At least one image is required"),
  link: Yup.string().required("Field is mandatory").url("Must be a valid URL"),
  ar_title: Yup.string().required("Field is mandatory"),
  en_title: Yup.string(),
  ru_title: Yup.string(),
});
