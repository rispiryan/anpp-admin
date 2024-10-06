import { type ICreateEducation, type IUpdateEducation, type IDeleteEducation } from "../store/types";
import request from "../../../services/request";

const END_POINTS = {
  create: "education/create",
  update: "education/update",
  delete: "education/delete",
  education: "education",
};

export function updateEducation(requestData: IUpdateEducation, id: string) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `${END_POINTS.update}/${id}`,
    data: { ...requestData },
    method: "PATCH",
  });
}

export function createEducation(requestData: ICreateEducation) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      ...requestData,
    },
    url: `${END_POINTS.create}`,
    method: "POST",
  });
}

export function getEducation() {
  return request({
    url: `${END_POINTS.education}`,
  });
}

export function getSingleEducation(id: string) {
  return request({
    url: `${END_POINTS.education}/${id}`,
  });
}

export function deleteEducation(data: IDeleteEducation) {
  return request({
    url: `${END_POINTS.delete}`,
    method: "DELETE",
    data,
  });
}
