import * as Yup from "yup";

export const educationSchema = Yup.object().shape({
  image: Yup.array().required("Field is mandatory").min(1, "At least one image is required"),
  deletedFiles: Yup.array().of(Yup.string().required("Each file must be a string")),
  ar_description: Yup.string().required("Field is mandatory"),
  ar_title: Yup.string().required("Field is mandatory"),
  en_description: Yup.string(),
  ru_description: Yup.string(),
  contentImages1: Yup.array(),
  contentImages2: Yup.array(),
  ar_content1: Yup.string(),
  en_content1: Yup.string(),
  ru_content1: Yup.string(),
  ar_content2: Yup.string(),
  en_content2: Yup.string(),
  ru_content2: Yup.string(),
  ar_content3: Yup.string(),
  en_content3: Yup.string(),
  ru_content3: Yup.string(),
  en_title: Yup.string(),
  ru_title: Yup.string(),
});
