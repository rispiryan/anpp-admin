import * as Yup from "yup";

export const departmentSchema = Yup.object().shape({
  deletedFiles: Yup.array().of(Yup.string().required("Each file must be a string")),
  ar_title: Yup.string().required("Field is mandatory"),
  slug: Yup.string().required("Field is mandatory"),
  contentImages1: Yup.array(),
  contentImages2: Yup.array(),
  attachedFiles: Yup.array(),
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
