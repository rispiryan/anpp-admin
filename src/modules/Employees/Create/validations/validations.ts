import * as Yup from "yup";

export const employeesSchema = Yup.object().shape({
  image: Yup.array().required("Field is mandatory").min(1, "At least one image is required"),
  ar_fullName: Yup.string().required("Field is mandatory"),
  ar_rank: Yup.string().required("Field is mandatory"),
  en_fullName: Yup.string(),
  ru_fullName: Yup.string(),
  ar_content: Yup.string(),
  en_content: Yup.string(),
  ru_content: Yup.string(),
  en_rank: Yup.string(),
  ru_rank: Yup.string(),
});
