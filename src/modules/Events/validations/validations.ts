import * as Yup from "yup";

export const eventsSchema = Yup.object().shape({
  image: Yup.array().required("Field is mandatory").min(1, "At least one image is required"),
  link: Yup.string().required("Field is mandatory").url("Must be a valid URL"),
  ar_description: Yup.string().required("Field is mandatory"),
  ar_title: Yup.string().required("Field is mandatory"),
  en_description: Yup.string(),
  ru_description: Yup.string(),
  en_title: Yup.string(),
  ru_title: Yup.string(),
});
